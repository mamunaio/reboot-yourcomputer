interface Env {
  RESEND_API_KEY?: string;
  NOTIFICATION_EMAIL_TO?: string;
  NOTIFICATION_EMAIL_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  GOOGLE_SHEETS_SECRET?: string;
}

const ALLOWED_ORIGINS = [
  "https://www.rebootyourcomputer.com.au",
  "https://rebootyourcomputer.com.au",
  "http://localhost:4321",
  "http://127.0.0.1:4321",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:8788",
  "http://127.0.0.1:8788",
];

interface EnquiryPayload {
  formType: "contact" | "cctv-quote" | "data-ethernet";
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  suburb?: string;
  propertyType?: string;
  serviceType?: string;
  cameraCount?: string;
  buildingStoreys?: string;
  botcheck?: string;
  turnstileToken?: string;
}

function escapeHtml(str: unknown): string {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeSheetValue(val: unknown): string {
  if (val == null) return "";
  const str = String(val).trim();
  if (!str) return "";
  if (str.startsWith("=") || str.startsWith("+") || str.startsWith("-") || str.startsWith("@")) {
    return "'" + str;
  }
  return str;
}

async function logToGoogleSheets(
  env: Env,
  payload: Partial<EnquiryPayload>,
  fields: {
    name: string;
    phone: string;
    email: string;
    suburb: string;
    propertyType: string;
    serviceType: string;
    cameraCount: string;
    buildingStoreys: string;
    message: string;
  }
): Promise<void> {
  const webhookUrl = env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  const secret = env.GOOGLE_SHEETS_SECRET?.trim();

  if (!webhookUrl || !secret) {
    return;
  }

  const timestamp = new Date().toISOString();
  const formType = payload.formType || "contact";

  const row = [
    timestamp,
    formType,
    sanitizeSheetValue(fields.name),
    sanitizeSheetValue(fields.phone),
    sanitizeSheetValue(fields.email),
    sanitizeSheetValue(fields.suburb),
    sanitizeSheetValue(fields.serviceType),
    sanitizeSheetValue(fields.propertyType),
    sanitizeSheetValue(fields.cameraCount),
    sanitizeSheetValue(fields.buildingStoreys),
    sanitizeSheetValue(fields.message),
  ];

  const bodyData = {
    timestamp,
    formType,
    name: sanitizeSheetValue(fields.name),
    phone: sanitizeSheetValue(fields.phone),
    email: sanitizeSheetValue(fields.email),
    suburb: sanitizeSheetValue(fields.suburb),
    serviceType: sanitizeSheetValue(fields.serviceType),
    propertyType: sanitizeSheetValue(fields.propertyType),
    cameraCount: sanitizeSheetValue(fields.cameraCount),
    buildingStoreys: sanitizeSheetValue(fields.buildingStoreys),
    message: sanitizeSheetValue(fields.message),
    row,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(webhookUrl, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "X-Google-Sheets-Secret": secret,
      },
      body: JSON.stringify(bodyData),
    }).finally(() => clearTimeout(timeoutId));

    if (!res.ok) {
      console.error(`[GoogleSheets] Logging returned non-2xx status: ${res.status} for formType: ${formType}`);
    }
  } catch {
    console.error(`[GoogleSheets] Failed to log lead for formType: ${formType}`);
  }
}

function createJsonResponse(data: unknown, status: number, origin: string | null): Response {
  const headers: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
  };
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  return new Response(JSON.stringify(data), { status, headers });
}

export async function onRequestOptions(context: { request: Request }): Promise<Response> {
  const { request } = context;
  const origin = request.headers.get("Origin");

  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized origin" }), {
      status: 403,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  const corsHeaders: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    corsHeaders["Access-Control-Allow-Origin"] = origin;
    corsHeaders["Vary"] = "Origin";
  }

  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  const origin = request.headers.get("Origin");

  // 1. Origin check
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized origin" }), {
      status: 403,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  // 2. Content-Type check
  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return createJsonResponse(
      {
        success: false,
        error: "Invalid content type",
      },
      400,
      origin
    );
  }

  // 3. JSON parse
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createJsonResponse(
      {
        success: false,
        error: "Invalid JSON",
      },
      400,
      origin
    );
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return createJsonResponse(
      {
        success: false,
        error: "Invalid request payload",
      },
      400,
      origin
    );
  }

  const payload = body as Partial<EnquiryPayload>;

  // 4. Honeypot check
  if (payload.botcheck && String(payload.botcheck).trim() !== "") {
    return createJsonResponse(
      {
        success: false,
        error: "Submission rejected",
      },
      400,
      origin
    );
  }

  // 5. Form type validation
  const allowedFormTypes = ["contact", "cctv-quote", "data-ethernet"];
  if (!payload.formType || typeof payload.formType !== "string" || !allowedFormTypes.includes(payload.formType)) {
    return createJsonResponse(
      {
        success: false,
        error: "Invalid form type",
      },
      400,
      origin
    );
  }

  // Field validation
  const fields: string[] = [];

  // name (required)
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  if (!name || name.length > 100) {
    fields.push("name");
  }

  // phone (optional, max 40 chars)
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  if (phone && phone.length > 40) {
    fields.push("phone");
  }

  // email (optional, valid format, max 120 chars)
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 120 || !emailRegex.test(email)) {
      fields.push("email");
    }
  }

  // At least one of phone or email must be provided
  if (!phone && !email) {
    if (!fields.includes("phone")) fields.push("phone");
    if (!fields.includes("email")) fields.push("email");
  }

  // message
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  if (message && message.length > 4000) {
    fields.push("message");
  }

  // suburb
  const suburb = typeof payload.suburb === "string" ? payload.suburb.trim() : "";
  if (suburb && suburb.length > 100) {
    fields.push("suburb");
  }

  // propertyType
  const propertyType = typeof payload.propertyType === "string" ? payload.propertyType.trim() : "";
  if (propertyType && propertyType.length > 100) {
    fields.push("propertyType");
  }

  // serviceType
  const serviceType = typeof payload.serviceType === "string" ? payload.serviceType.trim() : "";
  if (serviceType && serviceType.length > 100) {
    fields.push("serviceType");
  }

  // cameraCount
  const cameraCount = typeof payload.cameraCount === "string" ? payload.cameraCount.trim() : "";
  if (cameraCount && cameraCount.length > 100) {
    fields.push("cameraCount");
  }

  // buildingStoreys
  const buildingStoreys = typeof payload.buildingStoreys === "string" ? payload.buildingStoreys.trim() : "";
  if (buildingStoreys && buildingStoreys.length > 100) {
    fields.push("buildingStoreys");
  }

  if (fields.length > 0) {
    return createJsonResponse(
      {
        success: false,
        error: "Validation failed",
        fields,
      },
      400,
      origin
    );
  }

  // 6. Turnstile Verification
  const turnstileSecret = env.TURNSTILE_SECRET_KEY?.trim();
  const turnstileToken = typeof payload.turnstileToken === "string" ? payload.turnstileToken.trim() : "";

  if (turnstileSecret && turnstileSecret !== "" && turnstileToken && turnstileToken !== "") {
    try {
      const turnstileFormData = new FormData();
      turnstileFormData.append("secret", turnstileSecret);
      turnstileFormData.append("response", turnstileToken);
      const clientIp = request.headers.get("CF-Connecting-IP");
      if (clientIp) {
        turnstileFormData.append("remoteip", clientIp);
      }

      const turnstileRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: turnstileFormData,
      });

      const turnstileResult = (await turnstileRes.json().catch(() => ({ success: false }))) as { success?: boolean };
      if (!turnstileResult || !turnstileResult.success) {
        return createJsonResponse(
          {
            success: false,
            error: "Submission rejected",
          },
          400,
          origin
        );
      }
    } catch {
      return createJsonResponse(
        {
          success: false,
          error: "Submission rejected",
        },
        400,
        origin
      );
    }
  }

  // 7. Email Dispatch / Local Mock Mode
  const resendApiKey = env.RESEND_API_KEY?.trim();
  const toEmail = env.NOTIFICATION_EMAIL_TO?.trim() || "robert@zoorepairs.com.au";
  const fromEmail = env.NOTIFICATION_EMAIL_FROM?.trim() || "Reboot Your Computer <hello@rebootyourcomputer.com.au>";

  // Mock mode check
  if (!resendApiKey || resendApiKey === "mock") {
    await logToGoogleSheets(env, payload, {
      name,
      phone,
      email,
      suburb,
      propertyType,
      serviceType,
      cameraCount,
      buildingStoreys,
      message,
    });

    return createJsonResponse(
      {
        success: true,
        message: "Thank you! Your enquiry has been received and our technician will be in touch shortly.",
      },
      200,
      origin
    );
  }

  // Construct Email Subject and HTML Content
  let subject = "[New Enquiry] " + name;
  if (payload.formType === "cctv-quote") {
    subject = "[New CCTV Quote Request] " + name + (suburb ? " (" + suburb + ")" : "");
  } else if (payload.formType === "data-ethernet") {
    subject = "[New Data & Ethernet Enquiry] " + name;
  } else if (payload.formType === "contact") {
    subject = "[New Contact Enquiry] " + name;
  }

  const htmlBody = [
    "<!DOCTYPE html>",
    "<html>",
    "<head>",
    "  <meta charset=\"utf-8\">",
    "  <style>",
    "    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px; }",
    "    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }",
    "    .header { background: #dc2626; color: #ffffff; padding: 20px 24px; }",
    "    .header h2 { margin: 0; font-size: 20px; font-weight: 700; }",
    "    .content { padding: 24px; }",
    "    .table { width: 100%; border-collapse: collapse; margin-top: 16px; }",
    "    .table th, .table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 14px; }",
    "    .table th { width: 35%; color: #64748b; font-weight: 600; background: #f8fafc; }",
    "    .table td { color: #0f172a; font-weight: 500; }",
    "    .message-box { margin-top: 20px; padding: 16px; background: #f1f5f9; border-radius: 8px; font-size: 14px; white-space: pre-wrap; color: #334155; }",
    "    .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }",
    "  </style>",
    "</head>",
    "<body>",
    "  <div class=\"container\">",
    "    <div class=\"header\">",
    "      <h2>" + escapeHtml(subject) + "</h2>",
    "    </div>",
    "    <div class=\"content\">",
    "      <table class=\"table\">",
    "        <tr><th>Form Type</th><td>" + escapeHtml(payload.formType) + "</td></tr>",
    "        <tr><th>Full Name</th><td>" + escapeHtml(name) + "</td></tr>",
    "        <tr><th>Phone</th><td>" + (phone ? "<a href=\"tel:" + escapeHtml(phone) + "\">" + escapeHtml(phone) + "</a>" : "<em>Not provided</em>") + "</td></tr>",
    "        <tr><th>Email</th><td>" + (email ? "<a href=\"mailto:" + escapeHtml(email) + "\">" + escapeHtml(email) + "</a>" : "<em>Not provided</em>") + "</td></tr>",
    (suburb ? "        <tr><th>Suburb</th><td>" + escapeHtml(suburb) + "</td></tr>" : ""),
    (propertyType ? "        <tr><th>Property Type</th><td>" + escapeHtml(propertyType) + "</td></tr>" : ""),
    (serviceType ? "        <tr><th>Service Required</th><td>" + escapeHtml(serviceType) + "</td></tr>" : ""),
    (cameraCount ? "        <tr><th>Estimated Cameras</th><td>" + escapeHtml(cameraCount) + "</td></tr>" : ""),
    (buildingStoreys ? "        <tr><th>Building Layout</th><td>" + escapeHtml(buildingStoreys) + "</td></tr>" : ""),
    "      </table>",
    (message ? "      <div class=\"message-box\"><strong>Message / Project Details:</strong><br>" + escapeHtml(message) + "</div>" : ""),
    "    </div>",
    "    <div class=\"footer\">",
    "      Sent from Reboot Your Computer (rebootyourcomputer.com.au)",
    "    </div>",
    "  </div>",
    "</body>",
    "</html>"
  ].filter(Boolean).join("\n");

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + resendApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email ? email : undefined,
        subject,
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      return createJsonResponse(
        {
          success: false,
          error: "Unable to process your enquiry",
        },
        500,
        origin
      );
    }

    // Attempt Google Sheets lead logging after email success
    await logToGoogleSheets(env, payload, {
      name,
      phone,
      email,
      suburb,
      propertyType,
      serviceType,
      cameraCount,
      buildingStoreys,
      message,
    });

    return createJsonResponse(
      {
        success: true,
        message: "Thank you! Your enquiry has been received and our technician will be in touch shortly.",
      },
      200,
      origin
    );
  } catch {
    return createJsonResponse(
      {
        success: false,
        error: "Unable to process your enquiry",
      },
      500,
      origin
    );
  }
}
