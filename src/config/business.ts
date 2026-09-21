// Single source of truth for business facts.
//
// The phone number deliberately lives here and nowhere else. It is rendered as
// visible text on the contact page only, but it also has to appear in the
// homepage meta description (verbatim from the page that currently ranks) and
// in the LocalBusiness schema, where Google reads it. Changing it here changes
// it everywhere.
//
// Pricing, hours and service area are the real values from the live site —
// see SEO-BASELINE.md. Do not replace them with guesses.

export const business = {
  name: 'Reboot Computer Repairs',
  site: 'https://www.rebootyourcomputer.com.au',

  phone: '(07) 3155 2002',
  phoneHref: 'tel:+61731552002',
  phoneNote: 'Number diverts straight to a technician’s mobile.',

  // Public-facing address shown on the site.
  email: 'hello@rebootyourcomputer.com.au',

  // Where contact-form submissions are delivered. Not shown on the site.
  formRecipient: 'robert@zoorepairs.com.au',

  // Forms POST directly to Web3Forms (api.web3forms.com/submit) — no
  // Cloudflare Worker or Pages Function in between. Web3Forms' free plan
  // requires the request to come straight from a real browser (it rejects
  // server-to-server calls with a 403 "use our API in client side"), so
  // there's no way to run our own server-side Turnstile check in front of
  // it without paying for Pro; spam protection on the free plan is
  // Web3Forms' own honeypot field instead. If real spam shows up, Web3Forms
  // Pro adds native Turnstile support and this can be revisited then.
  //
  // The access key below is meant to be public — Web3Forms' own docs embed
  // it as a plain hidden input, since the browser has to send it directly.
  // Rotate it at web3forms.com if it's ever abused.
  formAction: 'https://api.web3forms.com/submit',
  web3formsAccessKey: 'b4b2b342-e926-4810-9ff1-29c81faaaeb6',

  hours: {
    opens: '07:00',
    closes: '22:00',
    summary: 'Open 7 AM to 10 PM every day, including public holidays.',
  },

  areasServed: ['Brisbane', 'Logan', 'Ipswich', 'Moreton Bay', 'Redland Bay'],

  // Rates raised from $120/hr to $150/hr on 2026-08-17, with the after-first-hour
  // increment scaled from $25 to $37.50 per 15 minutes to match.
  rates: {
    workshop: { price: '$150', unit: 'per hour' },
    onsite: { price: '$150', unit: 'first hour, then $37.50 per 15 minutes' },
    remote: { price: '$37.50', unit: 'per 15 minutes' },
  },
} as const;
