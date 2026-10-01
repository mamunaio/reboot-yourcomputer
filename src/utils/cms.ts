import { SERVICES_FALLBACK } from '../data/services-fallback';
import { DATA_ETHERNET_FALLBACK } from '../data/data-ethernet-fallback';

export const CMS_ORIGIN = 'https://zoorepairs-payload-cms-production.up.railway.app';
const FETCH_TIMEOUT_MS = 5000;

export interface ServiceItem {
  title: string;
  description: string;
  link?: string;
}

export interface ServicesPageData {
  heading: string;
  intro: string;
  items: ServiceItem[];
  ctaHeading: string;
  ctaSub: string;
}

export interface DataEthernetPageData {
  eyebrow: string;
  headline: string;
  highlightedText: string;
  subheading: string;
  ctaText: string;
  infoHeading: string;
  infoBody: string;
  comparisonHeading: string;
  comparisonRows: Array<{
    feature: string;
    goodOption: string;
    badOption: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    icon: string | null;
  }>;
  trustFeatures: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  ctaHeading: string;
  ctaSubheading: string;
  serviceOptions: string[];
}

function resolveIconUrl(icon: unknown): string | null {
  if (!icon) return null;
  if (typeof icon === 'string') {
    return icon.startsWith('http') ? icon : `${CMS_ORIGIN}${icon}`;
  }
  if (typeof icon === 'object' && icon !== null && 'url' in icon) {
    const url = (icon as { url?: string }).url;
    if (typeof url === 'string' && url.length > 0) {
      return url.startsWith('http') ? url : `${CMS_ORIGIN}${url}`;
    }
  }
  return null;
}

function resolveServiceLink(title: string): string | undefined {
  const titleLower = (title || '').toLowerCase();
  if (titleLower.includes('security') || titleLower.includes('camera')) {
    return '/services/cctv-security-camera-brisbane/';
  }
  if (titleLower.includes('ethernet') || titleLower.includes('data cabling')) {
    return '/data-ethernet-installation/';
  }
  return undefined;
}

export async function fetchLandingPageDoc(slug: string, depth = 0): Promise<Record<string, any> | null> {
  try {
    const url = `${CMS_ORIGIN}/api/landing-pages?where%5Bslug%5D%5Bequals%5D=${encodeURIComponent(slug)}&depth=${depth}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    }).finally(() => clearTimeout(timeoutId));

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as { docs?: Array<Record<string, any>> };
    if (data && Array.isArray(data.docs) && data.docs.length > 0) {
      return data.docs[0];
    }
    return null;
  } catch {
    // Fail safely and return null so build uses static fallback
    return null;
  }
}

export async function getServicesPageData(): Promise<ServicesPageData> {
  const defaultData: ServicesPageData = {
    heading: 'Our Services',
    intro: 'Expert computer repair for every issue. Fast diagnosis, transparent pricing, same-day service.',
    items: SERVICES_FALLBACK,
    ctaHeading: 'Need Help? Contact Us Today',
    ctaSub: 'Call for a free quote or to book your repair appointment.',
  };

  const doc = await fetchLandingPageDoc('reboot-your-computer/services', 0);
  if (!doc) {
    return defaultData;
  }

  const items: ServiceItem[] =
    doc.servicesList?.items && Array.isArray(doc.servicesList.items) && doc.servicesList.items.length > 0
      ? doc.servicesList.items.map((s: { title?: string; description?: string }) => ({
          title: s.title || '',
          description: s.description || '',
          link: resolveServiceLink(s.title || ''),
        }))
      : SERVICES_FALLBACK;

  return {
    heading: doc.servicesList?.heading || defaultData.heading,
    intro: doc.servicesList?.intro || defaultData.intro,
    items,
    ctaHeading: doc.cta?.heading || defaultData.ctaHeading,
    ctaSub: doc.cta?.subheading || defaultData.ctaSub,
  };
}

export async function getDataEthernetPageData(): Promise<DataEthernetPageData> {
  const doc = await fetchLandingPageDoc('reboot-your-computer/data-ethernet-installation', 1);
  if (!doc) {
    return DATA_ETHERNET_FALLBACK;
  }

  const comparisonRows =
    doc.comparisonTable?.rows && Array.isArray(doc.comparisonTable.rows)
      ? doc.comparisonTable.rows.map((r: any) => ({
          feature: r.feature || '',
          goodOption: r.goodOption || '',
          badOption: r.badOption || '',
        }))
      : DATA_ETHERNET_FALLBACK.comparisonRows;

  const projects =
    doc.projects && Array.isArray(doc.projects)
      ? doc.projects.map((p: any) => ({
          title: p.title || '',
          description: p.description || '',
          icon: resolveIconUrl(p.icon),
        }))
      : DATA_ETHERNET_FALLBACK.projects;

  const trustFeatures =
    doc.trustFeatures && Array.isArray(doc.trustFeatures)
      ? doc.trustFeatures.map((f: any) => ({
          title: f.title || '',
          description: f.description || '',
        }))
      : DATA_ETHERNET_FALLBACK.trustFeatures;

  const faqs =
    doc.faqs && Array.isArray(doc.faqs)
      ? doc.faqs.map((f: any) => ({
          question: f.question || '',
          answer: f.answer || '',
        }))
      : DATA_ETHERNET_FALLBACK.faqs;

  const serviceOptions =
    doc.contactForm?.serviceOptions && Array.isArray(doc.contactForm.serviceOptions)
      ? doc.contactForm.serviceOptions.map((o: any) => (typeof o === 'string' ? o : o.label || ''))
      : DATA_ETHERNET_FALLBACK.serviceOptions;

  return {
    eyebrow: doc.hero?.eyebrow || DATA_ETHERNET_FALLBACK.eyebrow,
    headline: doc.hero?.headline || DATA_ETHERNET_FALLBACK.headline,
    highlightedText: doc.hero?.highlightedText || DATA_ETHERNET_FALLBACK.highlightedText,
    subheading: doc.hero?.subheading || DATA_ETHERNET_FALLBACK.subheading,
    ctaText: doc.hero?.ctaText || DATA_ETHERNET_FALLBACK.ctaText,
    infoHeading: doc.infoSection?.heading || DATA_ETHERNET_FALLBACK.infoHeading,
    infoBody: doc.infoSection?.body || DATA_ETHERNET_FALLBACK.infoBody,
    comparisonHeading: doc.comparisonTable?.heading || DATA_ETHERNET_FALLBACK.comparisonHeading,
    comparisonRows,
    projects,
    trustFeatures,
    faqs,
    ctaHeading: doc.cta?.heading || DATA_ETHERNET_FALLBACK.ctaHeading,
    ctaSubheading: doc.cta?.subheading || DATA_ETHERNET_FALLBACK.ctaSubheading,
    serviceOptions,
  };
}
