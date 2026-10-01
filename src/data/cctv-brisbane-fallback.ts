import type { MasterCctvContent } from '../lib/content-schema';

/**
 * Production-Ready Master Fallback Content for Brisbane CCTV & Security Camera Page
 * 
 * Used when:
 * 1. Central API is unreachable during build
 * 2. Specific Google Sheet fields are blank (fallback merge)
 * 3. Local offline development
 */
export const BRISBANE_CCTV_FALLBACK: MasterCctvContent = {
  site: {
    suburb: 'Brisbane',
    slug: 'cctv-security-camera-brisbane',
    region: 'Greater Brisbane & South East Queensland',
    phone: '(07) 3155 2002',
    phoneHref: 'tel:+61731552002',
    email: 'help@rebootyourcomputer.com.au',
    abn: '89 428 738 602',
  },

  seo: {
    title: 'CCTV & Security Camera Installation Brisbane | Reboot Computer Repairs',
    description:
      'Commercial-grade hardwired 4K CCTV camera systems, secure Cat6 data cabling, and 24/7 mobile surveillance for Brisbane homes and businesses. Licensed ACMA cabler, $0 call-out fee.',
    ogImage: '/cctv-slide2.jpg',
    canonicalUrl: 'https://www.rebootyourcomputer.com.au/services/cctv-security-camera-brisbane/',
  },

  hero: {
    badgeText: 'LICENSED ACMA CABLER • $0 CALL-OUT FEE • 5-YR WARRANTY',
    awardText: '5.0 ★ Word of Mouth Award Winner 2026',
    heading: 'CCTV & Security Camera Installation in Brisbane',
    description:
      'Commercial-grade hardwired 4K PoE security camera systems, clean Cat6 cabling, and 24/7 mobile monitoring for Brisbane homes and businesses. Crystal-clear day/night vision with smart AI human and vehicle detection.',
    bullet1: '100% Solid Copper Cat6 Data Cabling (No Wireless Dropouts)',
    bullet2: 'AI Human & Vehicle Detection with Active Deterrence Strobe/Siren',
    bullet3: 'Zero Monthly Cloud Subscription Fees (Local NVR Storage)',
    bullet4: '$0 Call-Out Fees Across All Brisbane Suburbs',
    ctaQuote: 'Instant Security Quote',
    ctaPricing: 'View Packages From $1,699',
    imageUrl: '/3-brands-in-a-single-shot.png',
    metric1Value: '15+ Yrs',
    metric1Label: 'Field Experience',
    metric2Value: '100%',
    metric2Label: '5-Star WOM Reviews',
    metric3Value: 'Open ACMA',
    metric3Label: 'Master Cabler',
  },

  trust: {
    badge1Title: 'ACMA Master Cabler',
    badge1Sub: 'Open Registration Licensed',
    badge2Title: 'Zero Call-Out Fees',
    badge2Sub: 'Across All Brisbane Suburbs',
    badge3Title: 'No Monthly Cloud Fees',
    badge3Sub: '100% Secure Local Storage',
    badge4Title: '5-Yr Workmanship Terms',
    badge4Sub: 'Plus 3-Yr Hardware Replacement',
  },

  cabler: {
    badge: 'ACMA CABLER • LICENSED QLD SECURITY • SAVE UP TO 50%',
    heading: "You Don't Need an Electrician for IP Camera Systems.",
    description:
      'IP security cameras run on low-voltage 48V Power-over-Ethernet (PoE), not 240V mains power. As a licensed ACMA Master Cabler and computer technician, I handle the clean in-roof Cat6 cabling, firewall configuration, NVR recorder setup, and smartphone app setup – often at half the rate charged by general electricians.',
    bullet1: 'Licensed ACMA Open Master Cabler & QLD Security Provider',
    bullet2: 'Complete Network Router, Firewall & Multi-Device App Configuration',
    bullet3: '100% Solid Copper Cat6 / Cat6A Low-Voltage PoE Cabling',
    bullet4: 'Flat $150/hr Transparent Rate • Zero Call-Out Fees Across Brisbane',
    imageUrl: '/cctv-slide2.jpg',
    ctaQuote: 'Request a Cabling Quote',
    ctaCall: 'Call (07) 3155 2002',
  },

  awards: {
    heading: 'Recent Word of Mouth (WOM) Service Awards',
    badgeYear1: '2026',
    badgeYear2: '2025',
    ratingValue: '5.0',
    reviewsCount: '50+',
    tagline: 'Top Rated Computer & Security Services in South East Queensland',
  },

  services: {
    heading: 'Complete Security & Network Services',
    intro:
      'From single 4K turret upgrades to enterprise multi-building NVR arrays, every installation is engineered for reliability, zero cloud subscriptions, and clean concealed cabling.',
    card1Title: 'Residential CCTV Systems',
    card1Desc:
      'Hardwired 4K AI turret cameras for front entryways, perimeter fences, driveways, and backyards. Clean concealed cabling with no dangling wires.',
    card2Title: 'Commercial CCTV & Loss Prevention',
    card2Desc:
      'Multi-camera NVR surveillance systems for retail shops, medical clinics, offices, and warehouses with multi-screen live feeds and employee access controls.',
    card3Title: 'Firewalls & Subnet Isolation',
    card3Desc:
      'VLAN segmentation and firewall rules that isolate your security cameras from your private business network and home computers for total cybersecurity.',
    card4Title: 'Structured Cat6 Data Cabling',
    card4Desc:
      'ACMA-certified internal in-wall, in-ceiling, and conduit data cabling, patch panels, server racks, and high-speed multi-gigabit PoE switch integration.',
    card5Title: 'Active Deterrence AI Turrets',
    card5Desc:
      'Smart motion-triggered red/blue police strobe lights, 110dB sirens, and two-way voice communication that scares off intruders before break-ins occur.',
    card6Title: 'Repairs, Passwords & NVR Upgrades',
    card6Desc:
      'Fixing offline cameras, damaged cabling, forgotten NVR passwords, failed hard drives, blurry lenses, and upgrading old analogue coax systems.',
  },

  deterrence: {
    badge: 'PROACTIVE CRIME PREVENTION',
    heading: 'The Best Crime Is The One That Never Happens.',
    subheading: 'Why Traditional CCTV Fails vs Active Deterrence',
    description:
      'Most security cameras only record crimes so you can watch what was stolen the next morning. Our Dahua TiOC and Hikvision AcuSense systems actively confront trespassers the second they step onto your boundary.',
    feat1Title: 'Red & Blue Warning Flashes',
    feat1Desc:
      'High-intensity flashing police-style LEDs illuminate the intruder immediately upon boundary crossing.',
    feat2Title: 'Built-In 110dB Siren',
    feat2Desc:
      'Customisable voice warnings or piercing sirens trigger automatically to startle and deter intruders instantly.',
    feat3Title: 'Human & Vehicle Filter',
    feat3Desc:
      'Advanced deep-learning AI ignores swaying trees, rain, insects, and pets, eliminating 99% of false alarms.',
    feat4Title: '2-Way Speaker & Mic',
    feat4Desc:
      'Listen in and speak directly through the camera in real time from your mobile phone anywhere in the world.',
    imageUrl: '/dahua-tioc-cameras.png',
  },

  mobile_app: {
    badge: '24/7 SMARTPHONE ACCESS',
    heading: 'Interactive Smartphone CCTV Monitoring',
    subheading: 'Total Perimeter Awareness Right from Your Pocket',
    feat1Title: 'Smart AI Human & Vehicle Alerts',
    feat1Desc:
      'Instant push notifications with high-resolution snapshots when someone enters your driveway or doorway.',
    feat2Title: 'Live 4K Multi-Screen Feeds & Playback',
    feat2Desc:
      'Smooth multi-camera live grid with intuitive timeline scrubbing to review events in seconds.',
    feat3Title: 'Seamless Multi-Device Family Access',
    feat3Desc:
      'Secure encrypted accounts for family members, tenants, or business managers with custom permission levels.',
    ctaQuote: 'Get Free App Setup',
    ctaCall: 'Call (07) 3155 2002',
  },

  inclusions: {
    badge: 'COMMERCIAL-GRADE STANDARD',
    heading: 'What Is Included in Every Installation?',
    subheading: 'No Hidden Extras. No Shortcuts. Just Turnkey Commercial-Grade Security.',
    inc1Title: '100% Solid Copper Cat6',
    inc1Desc:
      'Zero cheap Copper Clad Aluminium (CCA). Only pure solid copper cables for maximum data bandwidth and PoE power stability.',
    inc2Title: 'Metal Deep Base Junction Boxes',
    inc2Desc:
      'All cable terminations and RJ45 connectors are fully sealed inside weatherproof aluminium bases to prevent moisture corrosion.',
    inc3Title: 'Concealed Roof & Wall Cabling',
    inc3Desc:
      'Cables run hidden inside ceiling cavities and wall cavities wherever possible. Heavy-duty conduit used for exposed external runs.',
    inc4Title: 'Surveillance-Grade NVR Hard Drive',
    inc4Desc:
      'Dedicated Western Digital Purple or Seagate SkyHawk drives rated for continuous 24/7 write cycles and years of reliability.',
    inc5Title: 'Multi-Device App & Remote Setup',
    inc5Desc:
      'Complete setup on all your family or staff phones, tablets, and computers, including motion alert zones and sensitivity tuning.',
    inc6Title: '5-Year Workmanship Warranty',
    inc6Desc:
      'Complete peace of mind. If any cabling, mounting, or termination fails due to our installation, we fix it at zero cost.',
  },

  comparison: {
    badge: 'SYSTEM COMPARISON',
    heading: 'Which Security System Suits Your Property?',
    subheading:
      'Understanding the difference between commercial hardwired PoE, wireless battery units, and legacy coax systems.',
    col1Title: 'Hardwired 4K PoE',
    col1Badge: 'Recommended',
    col1Desc:
      'Commercial-grade reliability, 24/7 continuous local recording, zero battery recharges, un-jammable physical Cat6 cables, zero monthly fees.',
    col2Title: 'Wireless Battery Cams',
    col2Badge: 'High Maintenance',
    col2Desc:
      'Prone to WiFi jamming, constant battery recharging, delayed motion capture, compressed video, and ongoing monthly cloud subscription fees.',
    col3Title: 'Analogue-to-IP Upgrade',
    col3Badge: 'Retrofit',
    col3Desc:
      'Upgrade old low-resolution coax systems to crisp 4K IP cameras using existing pathways or new Cat6 lines with modern NVR recorders.',
  },

  pricing: {
    badge: 'TRANSPARENT FIXED PRICING',
    heading: 'Fixed-Price CCTV Installation Packages',
    intro:
      'Transparent turnkey pricing across Brisbane. No hidden call-out fees, no travel surcharges, and no surprise add-ons.',
    tier1Name: 'BYO Installation',
    tier1Price: 'From $150/hr',
    tier1Desc:
      'Professional installation and cabling for cameras and NVR hardware you have already purchased (Swann, Reolink, Dahua, Hikvision, etc.).',
    tier2Name: '4-Camera 4K PoE System',
    tier2Price: '$2,299 Installed',
    tier2Badge: 'Most Popular',
    tier2Desc:
      '4x 4K Ultra HD PoE Turret Cameras, 4-Channel PoE NVR with 2TB Surveillance Hard Drive, Cat6 cabling, app setup, and 5-yr workmanship warranty.',
    tier3Name: 'Active Deterrence Pro',
    tier3Price: '$2,899 Installed',
    tier3Badge: 'Maximum Security',
    tier3Desc:
      '4x 4K TiOC AI Cameras with Red/Blue Strobes, 110dB Siren, 2-Way Audio, 8-Channel NVR with 4TB HDD, Cat6 cabling, app setup, and 5-yr warranty.',
  },

  process: {
    badge: 'HOW WE WORK',
    heading: 'How Our Security Installation Works',
    step1Title: 'Property Consultation',
    step1Desc:
      'We evaluate your floor plan, blind spots, entry points, and lighting conditions to recommend optimal camera placements.',
    step2Title: 'Hidden Cat6 Cabling',
    step2Desc:
      'We run solid copper Cat6 cabling through roof cavities and wall drops, terminating into tidy patch plates or server cabinets.',
    step3Title: 'Mounting & Precision Setup',
    step3Desc:
      'Cameras are securely mounted in weatherproof metal bases, angled precisely, and focused for sharp boundary coverage.',
    step4Title: 'Phone App & Handover',
    step4Desc:
      'We configure your phone apps, set up motion notification zones, test night vision, and train you on footage export.',
  },

  case_studies: {
    badge: 'RECENT INSTALLATIONS',
    heading: 'Recent Security Installations in Brisbane',
    subheading:
      'Real examples of clean, high-performance camera systems installed across Brisbane homes and businesses.',
    case1Title: 'Two-Storey Brick Home 6-Camera PoE Retrofit',
    case1Suburb: 'Stretton, Brisbane South',
    case1Desc:
      'Installed 6x 4K AI turrets on a complex two-storey rendered brick home with hidden internal cavity drops and zero visible external conduit.',
    case2Title: 'Medical Clinic Secure Network & Surveillance',
    case2Suburb: 'Brisbane North',
    case2Desc:
      'Deployed an 8-camera NVR system with dedicated reception monitoring screen, VLAN network isolation, and staff mobile app access.',
    case3Title: 'High-Bay Warehouse & Loading Dock Security',
    case3Suburb: 'Rocklea, Brisbane Industrial',
    case3Desc:
      'Installed long-range varifocal 4K cameras monitoring vehicle registration plates, loading bays, and perimeter access gates.',
  },

  installer: {
    badge: 'LICENSED & EXPERIENCED',
    heading: 'Meet Your Licensed Lead Installer',
    name: 'Richard',
    role: 'Master Cabler & Security Specialist',
    bio:
      'With over 15 years of experience in computer networking, structured cabling, and commercial surveillance systems, Richard delivers immaculate installations designed to protect what matters most.',
    credential1: 'Licensed ACMA Open Master Cabler (T08499)',
    credential2: 'QLD Security Provider Class 1 & 2 Licensed',
    credential3: 'Certified Structured Cat6 / Fibre Data Installer',
    credential4: '15+ Years Computer Systems & Networking Specialist',
    imageUrl: '/Richard.png',
  },

  reviews: {
    badge: 'VERIFIED REVIEWS',
    heading: 'Why Choose Reboot Security?',
    subheading: 'What Local Property Owners Say',
    rev1Author: 'Mark T.',
    rev1Suburb: 'Sunnybank Hills',
    rev1Rating: 5,
    rev1Text:
      'Richard did an incredible job installing our 4K Dahua TiOC system. Every cable is completely hidden in the ceiling cavity. The app setup was flawless and the picture quality day and night is unbelievable.',
    rev2Author: 'Sarah L.',
    rev2Suburb: 'Carindale',
    rev2Rating: 5,
    rev2Text:
      'Electricians quoted us double the price and wanted to run ugly conduit all over our facade. Richard installed Cat6 internally with zero mess. Highly recommended!',
    rev3Author: 'David P.',
    rev3Suburb: 'Indooroopilly',
    rev3Rating: 5,
    rev3Text:
      'Prompt, professional, and extremely knowledgeable. Configured our firewall and segregated the camera network from our home computers for security. Top tier service.',
    rev4Author: 'Elena R.',
    rev4Suburb: 'Chermside',
    rev4Rating: 5,
    rev4Text:
      'Five stars all the way. The active deterrence red/blue flashing lights have completely stopped people snooping around our driveway at night. Thank you!',
  },

  suburbs: {
    badge: 'SERVICE COVERAGE',
    heading: 'Security & CCTV Installation Across Brisbane',
    intro:
      'We provide $0 call-out fees and prompt on-site service across all Greater Brisbane regions:',
    innerBrisbane: [
      'Brisbane City',
      'Fortitude Valley',
      'New Farm',
      'Paddington',
      'South Brisbane',
      'West End',
      'Kangaroo Point',
      'Spring Hill',
    ],
    southBrisbane: [
      'Sunnybank',
      'Sunnybank Hills',
      'Stretton',
      'Calamvale',
      'Runcorn',
      'Underwood',
      'Kuraby',
      'Eight Mile Plains',
      'Mount Gravatt',
      'Carindale',
    ],
    northBrisbane: [
      'Chermside',
      'Aspley',
      'Stafford',
      'Kedron',
      'Lutwyche',
      'Nundah',
      'North Lakes',
      'Strathpine',
    ],
    eastBrisbane: [
      'Wynnum',
      'Manly',
      'Capalaba',
      'Cleveland',
      'Cannon Hill',
      'Morningside',
      'Bulimba',
      'Carina',
    ],
    westBrisbane: [
      'Indooroopilly',
      'Toowong',
      'Kenmore',
      'Chapel Hill',
      'Jindalee',
      'Oxley',
      'Forest Lake',
    ],
    loganSurrounds: [
      'Logan Central',
      'Springwood',
      'Daisy Hill',
      'Rochedale South',
      'Browns Plains',
      'Beenleigh',
    ],
  },

  faqs: {
    badge: 'SECURITY FAQS',
    heading: 'Frequently Asked Security Questions',
    subheading: 'Everything you need to know about professional CCTV installation in Brisbane.',
    faq1Q: 'Do I need an electrician or a licensed security cabler to install CCTV?',
    faq1A:
      'In Australia, hardwired IP security camera systems use low-voltage Power-over-Ethernet (PoE) and telecommunications cabling. Under ACMA regulations, installers must hold an Open Cabler Registration with appropriate endorsements, plus a QLD Security Provider licence for security camera installation. You do not need a general electrician, and licensed cablers typically provide superior network configuration at lower rates.',
    faq2Q: 'Why is hardwired PoE better than wireless or battery cameras?',
    faq2A:
      'Wireless battery cameras rely on Wi-Fi signals that can be jammed, compressed video feeds, delayed motion triggers, and frequent battery recharging. Hardwired Cat6 PoE cameras receive power and send uninterrupted high-bandwidth 4K video over a single solid copper cable directly to a local NVR with zero latency, zero signal dropouts, and 24/7 continuous recording.',
    faq3Q: 'Are there any monthly cloud storage fees?',
    faq3A:
      'No. All footage is stored securely on your local Network Video Recorder (NVR) hard drive inside your home or business. You own the hardware and the footage completely. Remote mobile app viewing is 100% free with zero ongoing subscription costs.',
    faq4Q: 'Can I view live and recorded footage on my smartphone when away from home?',
    faq4A:
      'Yes. We configure encrypted remote access on your iOS and Android devices, allowing you to view live multi-camera feeds, playback recorded motion events, receive push alerts, and speak through two-way audio cameras from anywhere in the world with an internet connection.',
    faq5Q: 'How are cables run in a two-storey house or multi-level building?',
    faq5A:
      'We specialise in concealed cabling. We utilise internal wall cavities, roof crawlspaces, service risers, and dropped ceilings to route Cat6 cabling invisibly. Where internal cavity access is physically impossible, we use neatly colour-matched UV-stabilised external conduit.',
    faq6Q: 'What camera brands do you recommend and install?',
    faq6A:
      'We primarily install Dahua (including TiOC active deterrence turrets), Hikvision (AcuSense AI cameras), and Uniview. We can also install and cable client-supplied hardware (BYO) from brands like Swann, Reolink, and others.',
    faq7Q: 'How long does a typical 4-camera installation take?',
    faq7A:
      'A standard single-storey residential 4-camera installation typically takes 4 to 6 hours, including clean roof cabling, camera mounting, NVR setup, network firewall configuration, and phone app training. Two-storey homes may take 6 to 8 hours.',
    faq8Q: 'What happens if the internet goes down?',
    faq8A:
      'Your cameras and NVR will continue recording 24/7 locally without interruption because the system is completely hardwired to your local network. Only remote smartphone access will be paused until your home NBN internet connection is restored.',
    faq9Q: 'What warranty is included with the installation?',
    faq9A:
      'Every system comes with a 5-year workmanship warranty on all cabling, mounting, and terminations, plus the standard 3-year manufacturer replacement warranty on cameras and NVR hardware.',
  },

  quote_form: {
    badge: 'FREE ONSITE / DESKTOP QUOTE',
    heading: 'Request a Security Quote',
    subheading:
      'Get a transparent, fixed-price quote tailored to your property. No obligation, no spam.',
    ctaButtonText: 'Submit Quote Request',
    successHeading: 'Quote Request Received!',
    successBody:
      'Thank you for reaching out. Our licensed technician will review your property details and contact you shortly with a tailored quote.',
  },

  trust_banner: {
    badge: 'HONEST VALUE',
    heading: 'Pay 1/2 the cost of electrician we are certified to do the same job',
    description:
      'Why pay inflated electrician rates for low-voltage PoE data cabling? As a licensed ACMA Master Cabler and IT technician, we deliver cleaner cabling, superior network integration, and lower rates.',
    ctaQuote: 'Get a Quote',
    ctaPricing: 'View Packages',
  },

  footer: {
    aboutHeading: 'Reboot Security & Cabling',
    aboutText:
      'Commercial-grade hardwired CCTV camera installations, Cat6 structured cabling, and network security solutions across Greater Brisbane.',
    hoursHeading: 'Operating Hours',
    hoursText: 'Open 7 AM to 10 PM every day, including weekends and public holidays.',
    coverageHeading: 'Service Coverage',
    coverageText:
      'Servicing Brisbane CBD, South Brisbane, North Brisbane, East Brisbane, Western Suburbs, Logan, and surrounding SEQ regions with $0 call-out fees.',
    copyright: '© 2026 Reboot Computer Repairs. All rights reserved. Licensed ACMA Cabler.',
  },
};
