/**
 * Master Content Schema for Reboot Your Computer Suburb / Location Pages
 * 
 * Compatible with Central API 4-column schema:
 * section_id | field | type | value
 * 
 * Supported Central API scalar types:
 * - text
 * - richtext
 * - seo
 * - slug
 * - number
 * - boolean
 */

export interface SiteSection {
  suburb: string;
  slug: string;
  region?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  abn?: string;
}

export interface SeoSection {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface HeroSection {
  badgeText?: string;
  awardText?: string;
  heading: string;
  description: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  bullet4: string;
  ctaQuote?: string;
  ctaPricing?: string;
  imageUrl?: string;
  metric1Value?: string;
  metric1Label?: string;
  metric2Value?: string;
  metric2Label?: string;
  metric3Value?: string;
  metric3Label?: string;
}

export interface TrustSection {
  badge1Title: string;
  badge1Sub: string;
  badge2Title: string;
  badge2Sub: string;
  badge3Title: string;
  badge3Sub: string;
  badge4Title: string;
  badge4Sub: string;
}

export interface CablerSection {
  badge?: string;
  heading: string;
  description: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
  bullet4: string;
  imageUrl?: string;
  ctaQuote?: string;
  ctaCall?: string;
}

export interface AwardsSection {
  heading?: string;
  badgeYear1?: string;
  badgeYear2?: string;
  ratingValue?: string;
  reviewsCount?: string;
  tagline?: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  points?: string[];
  icon?: string;
}

export interface ServicesSection {
  heading: string;
  intro: string;
  card1Title: string;
  card1Desc: string;
  card2Title: string;
  card2Desc: string;
  card3Title: string;
  card3Desc: string;
  card4Title: string;
  card4Desc: string;
  card5Title: string;
  card5Desc: string;
  card6Title: string;
  card6Desc: string;
  items?: ServiceCard[];
}

export interface DeterrenceSection {
  badge?: string;
  heading: string;
  subheading?: string;
  description?: string;
  feat1Title: string;
  feat1Desc: string;
  feat2Title: string;
  feat2Desc: string;
  feat3Title: string;
  feat3Desc: string;
  feat4Title: string;
  feat4Desc: string;
  imageUrl?: string;
}

export interface MobileAppSection {
  badge?: string;
  heading: string;
  subheading?: string;
  feat1Title: string;
  feat1Desc: string;
  feat2Title: string;
  feat2Desc: string;
  feat3Title: string;
  feat3Desc: string;
  ctaQuote?: string;
  ctaCall?: string;
}

export interface InclusionsSection {
  badge?: string;
  heading: string;
  subheading?: string;
  inc1Title: string;
  inc1Desc: string;
  inc2Title: string;
  inc2Desc: string;
  inc3Title: string;
  inc3Desc: string;
  inc4Title: string;
  inc4Desc: string;
  inc5Title: string;
  inc5Desc: string;
  inc6Title: string;
  inc6Desc: string;
}

export interface ComparisonSection {
  badge?: string;
  heading: string;
  subheading?: string;
  col1Title: string;
  col1Badge: string;
  col1Desc: string;
  col2Title: string;
  col2Badge: string;
  col2Desc: string;
  col3Title: string;
  col3Badge: string;
  col3Desc: string;
}

export interface PricingSection {
  badge?: string;
  heading: string;
  intro: string;
  tier1Name: string;
  tier1Price: string;
  tier1Desc: string;
  tier2Name: string;
  tier2Price: string;
  tier2Badge: string;
  tier2Desc: string;
  tier3Name: string;
  tier3Price: string;
  tier3Badge: string;
  tier3Desc: string;
}

export interface ProcessSection {
  badge?: string;
  heading: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
}

export interface CaseStudyItem {
  title: string;
  suburb: string;
  description: string;
  points?: string[];
}

export interface CaseStudiesSection {
  badge?: string;
  heading: string;
  subheading?: string;
  case1Title: string;
  case1Suburb: string;
  case1Desc: string;
  case2Title: string;
  case2Suburb: string;
  case2Desc: string;
  case3Title: string;
  case3Suburb: string;
  case3Desc: string;
  items?: CaseStudyItem[];
}

export interface InstallerSection {
  badge?: string;
  heading: string;
  name: string;
  role: string;
  bio: string;
  credential1: string;
  credential2: string;
  credential3: string;
  credential4: string;
  imageUrl?: string;
}

export interface ReviewItem {
  author: string;
  suburb: string;
  rating: number;
  text: string;
}

export interface ReviewsSection {
  badge?: string;
  heading: string;
  subheading?: string;
  rev1Author: string;
  rev1Suburb: string;
  rev1Rating: number;
  rev1Text: string;
  rev2Author: string;
  rev2Suburb: string;
  rev2Rating: number;
  rev2Text: string;
  rev3Author: string;
  rev3Suburb: string;
  rev3Rating: number;
  rev3Text: string;
  rev4Author: string;
  rev4Suburb: string;
  rev4Rating: number;
  rev4Text: string;
  items?: ReviewItem[];
}

export interface SuburbsSection {
  badge?: string;
  heading: string;
  intro?: string;
  innerBrisbane?: string[];
  southBrisbane?: string[];
  northBrisbane?: string[];
  eastBrisbane?: string[];
  westBrisbane?: string[];
  loganSurrounds?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqsSection {
  badge?: string;
  heading: string;
  subheading?: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  faq4Q: string;
  faq4A: string;
  faq5Q: string;
  faq5A: string;
  faq6Q: string;
  faq6A: string;
  faq7Q: string;
  faq7A: string;
  faq8Q: string;
  faq8A: string;
  faq9Q: string;
  faq9A: string;
  items?: FaqItem[];
}

export interface QuoteFormSection {
  badge?: string;
  heading: string;
  subheading?: string;
  ctaButtonText?: string;
  successHeading?: string;
  successBody?: string;
}

export interface TrustBannerSection {
  badge?: string;
  heading: string;
  description: string;
  ctaQuote?: string;
  ctaPricing?: string;
}

export interface FooterSection {
  aboutHeading?: string;
  aboutText?: string;
  hoursHeading?: string;
  hoursText?: string;
  coverageHeading?: string;
  coverageText?: string;
  copyright?: string;
}

/**
 * Master Suburb CCTV Page Content Data Structure
 */
export interface MasterCctvContent {
  site: SiteSection;
  seo: SeoSection;
  hero: HeroSection;
  trust: TrustSection;
  cabler: CablerSection;
  awards: AwardsSection;
  services: ServicesSection;
  deterrence: DeterrenceSection;
  mobile_app: MobileAppSection;
  inclusions: InclusionsSection;
  comparison: ComparisonSection;
  pricing: PricingSection;
  process: ProcessSection;
  case_studies: CaseStudiesSection;
  installer: InstallerSection;
  reviews: ReviewsSection;
  suburbs: SuburbsSection;
  faqs: FaqsSection;
  quote_form: QuoteFormSection;
  trust_banner: TrustBannerSection;
  footer: FooterSection;
}

/**
 * Central API Response Wrapper
 */
export interface ContentApiResponse {
  status: 'success' | 'error';
  slug: string;
  message?: string;
  content: MasterCctvContent;
}
