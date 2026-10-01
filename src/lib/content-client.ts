import type { MasterCctvContent, ContentApiResponse } from './content-schema.ts';
import { BRISBANE_CCTV_FALLBACK } from '../data/cctv-brisbane-fallback.ts';

/**
 * Default local Central API URL (matches robert-content-api default port)
 */
export const DEFAULT_CONTENT_API_URL = 'http://127.0.0.1:8787';
const FETCH_TIMEOUT_MS = 5000;

/**
 * Resolves the Central Content API base URL from the environment or default.
 */
export function getContentApiBaseUrl(): string {
  if (typeof process !== 'undefined' && process.env?.CONTENT_API_URL) {
    return process.env.CONTENT_API_URL.replace(/\/+$/, '');
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.CONTENT_API_URL) {
    return String((import.meta as any).env.CONTENT_API_URL).replace(/\/+$/, '');
  }
  return DEFAULT_CONTENT_API_URL;
}

/**
 * Converts snake_case string to camelCase
 */
function toCamelCase(str: string): string {
  return str.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Normalizes section keys and maps snake_case field names to camelCase.
 */
function normalizeSection(rawSection: unknown): Record<string, any> {
  if (!rawSection || typeof rawSection !== 'object') return {};
  const normalized: Record<string, any> = {};

  for (const [key, val] of Object.entries(rawSection as Record<string, any>)) {
    if (val !== undefined && val !== null && val !== '') {
      const camelKey = toCamelCase(key);
      normalized[camelKey] = val;
      normalized[key] = val;
    }
  }

  return normalized;
}

/**
 * Deep merges API-provided content on top of fallback data.
 * 
 * Rules:
 * 1. API section exists + field exists -> API value wins.
 * 2. API section missing -> fallback section remains intact.
 * 3. API field missing (or empty) -> fallback field remains intact.
 * 4. Nested structures, arrays, and scalars are safely preserved.
 */
export function deepMergeContent(
  fallback: MasterCctvContent,
  rawApiContent: unknown
): MasterCctvContent {
  if (!rawApiContent || typeof rawApiContent !== 'object') {
    return { ...fallback };
  }

  const apiObj = rawApiContent as Record<string, any>;
  const merged: Record<string, any> = {};

  for (const [sectionKey, fallbackSection] of Object.entries(fallback)) {
    // Check both exact sectionKey and normalized snake_case key (e.g. mobile_app / mobileApp)
    const snakeSectionKey = sectionKey.replace(/([A-Z])/g, '_$1').toLowerCase();
    const rawApiSection = apiObj[sectionKey] ?? apiObj[snakeSectionKey];

    if (!rawApiSection || typeof rawApiSection !== 'object') {
      merged[sectionKey] = Array.isArray(fallbackSection) ? [...fallbackSection] : { ...fallbackSection };
      continue;
    }

    const normApi = normalizeSection(rawApiSection);
    const mergedSection: Record<string, any> = Array.isArray(fallbackSection)
      ? [...fallbackSection]
      : { ...fallbackSection };

    if (!Array.isArray(fallbackSection) && typeof fallbackSection === 'object') {
      for (const [fieldKey, fallbackVal] of Object.entries(fallbackSection)) {
        const camelKey = toCamelCase(fieldKey);
        const snakeKey = fieldKey.replace(/([A-Z])/g, '_$1').toLowerCase();

        if (normApi[fieldKey] !== undefined && normApi[fieldKey] !== null && normApi[fieldKey] !== '') {
          mergedSection[fieldKey] = normApi[fieldKey];
        } else if (normApi[camelKey] !== undefined && normApi[camelKey] !== null && normApi[camelKey] !== '') {
          mergedSection[fieldKey] = normApi[camelKey];
        } else if (normApi[snakeKey] !== undefined && normApi[snakeKey] !== null && normApi[snakeKey] !== '') {
          mergedSection[fieldKey] = normApi[snakeKey];
        } else {
          mergedSection[fieldKey] = fallbackVal;
        }
      }
    }

    merged[sectionKey] = mergedSection;
  }

  return merged as MasterCctvContent;
}

/**
 * Fetches suburb / location content from the Central API with resilient fallback merging.
 * 
 * Never throws a fatal build error on network failure, timeout, 404, or malformed responses.
 */
export async function getBrisbaneCctvContent(
  slug = 'brisbane',
  customApiUrl?: string
): Promise<MasterCctvContent> {
  const baseUrl = (customApiUrl || getContentApiBaseUrl()).replace(/\/+$/, '');
  const url = `${baseUrl}/api/content/${encodeURIComponent(slug)}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    }).finally(() => clearTimeout(timeoutId));

    if (!res.ok) {
      console.warn(`[ContentClient] API returned HTTP ${res.status} for ${url}. Using merged fallback.`);
      return { ...BRISBANE_CCTV_FALLBACK };
    }

    const json = (await res.json()) as ContentApiResponse;

    if (json && json.status === 'success' && json.content) {
      return deepMergeContent(BRISBANE_CCTV_FALLBACK, json.content);
    }

    console.warn(`[ContentClient] API response for '${slug}' was not 'success' (${json?.message || 'Incomplete payload'}). Using merged fallback.`);
    return deepMergeContent(BRISBANE_CCTV_FALLBACK, json?.content || {});
  } catch (err: any) {
    const isTimeout = err?.name === 'AbortError' || err?.message?.includes('aborted');
    const reason = isTimeout ? `Timeout (${FETCH_TIMEOUT_MS}ms)` : err?.message || 'Network error';
    console.warn(`[ContentClient] Failed to fetch content for '${slug}' from ${url} (${reason}). Using master fallback.`);
    return { ...BRISBANE_CCTV_FALLBACK };
  }
}

/**
 * Named alias to support fetchContent(apiBaseUrl, slug) signature across projects.
 */
export async function fetchContent(apiBaseUrl: string, slug = 'brisbane'): Promise<MasterCctvContent> {
  return getBrisbaneCctvContent(slug, apiBaseUrl);
}
