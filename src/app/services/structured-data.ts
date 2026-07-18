export type Locale = 'en' | 'de';

const JOB_TITLE: Record<Locale, string> = {
  en: 'Full-Stack Developer',
  de: 'Full-Stack-Entwickler',
};

const DESCRIPTION: Record<Locale, string> = {
  en: 'Full-stack developer specializing in Angular, Django REST Framework, Shopware 6 and REST APIs. Also offers AI feasibility workshops, AI-assisted automation, Shopware consulting and SEO/GEO audits for small and medium-sized businesses.',
  de: 'Full-Stack-Entwickler mit Fokus auf Angular, Django REST Framework, Shopware 6 und REST-APIs. Bietet zusätzlich KI-Machbarkeits-Workshops, KI-gestützte Automatisierung, Shopware-Beratung und SEO/GEO-Audits für kleine und mittlere Unternehmen an.',
};

const SKILLS = [
  'Python',
  'Django',
  'Django REST Framework',
  'Angular',
  'TypeScript',
  'Shopware 6',
  'PHP',
  'Symfony',
  'Kotlin',
  'REST APIs',
  'Linux',
  'Git',
];

// Kept in sync with the offer texts in consulting.component.ts.
const OFFERS: Record<Locale, { name: string; description: string }[]> = {
  en: [
    {
      name: 'AI feasibility workshops',
      description:
        'Structured feasibility workshops for small and medium-sized businesses that clarify where AI and automation projects are realistic and what effort they involve.',
    },
    {
      name: 'AI-assisted automation',
      description:
        'Implementation of AI-assisted automations such as n8n-based RAG chatbots and workflow automation that reliably take over recurring tasks.',
    },
    {
      name: 'Shopware consulting',
      description: 'Support for Shopware 6 operators with conversion optimization and technical development of their shop.',
    },
    {
      name: 'SEO/GEO audits',
      description:
        'SEO and GEO audits (Search Engine + Generative Engine Optimization) for online shops and SMEs, with concrete, prioritized optimization potential.',
    },
  ],
  de: [
    {
      name: 'KI-Machbarkeits-Workshops',
      description:
        'Strukturierte Machbarkeits-Workshops für kleine und mittlere Unternehmen, die klären, wo sich KI- und Automatisierungsprojekte realistisch umsetzen lassen und welcher Aufwand damit verbunden ist.',
    },
    {
      name: 'KI-gestützte Automatisierung',
      description:
        'Umsetzung KI-gestützter Automatisierungen wie n8n-basierter RAG-Chatbots und Workflow-Automatisierungen, die wiederkehrende Aufgaben zuverlässig übernehmen.',
    },
    {
      name: 'Shopware-Beratung',
      description: 'Unterstützung für Shopware-6-Betreiber bei Conversion-Optimierung und technischer Weiterentwicklung ihres Shops.',
    },
    {
      name: 'SEO/GEO-Audits',
      description:
        'SEO- und GEO-Audits (Search Engine + Generative Engine Optimization) für Onlineshops und KMUs mit konkreten, priorisierten Optimierungspotenzialen.',
    },
  ],
};

export function getPageTitle(locale: Locale): string {
  return `Robin Gerth – ${JOB_TITLE[locale]} (Angular, Django, Shopware 6)`;
}

export function getPageDescription(locale: Locale): string {
  return DESCRIPTION[locale];
}

/**
 * Person + ProfilePage JSON-LD for the homepage. Deliberately omits the postal
 * address disclosed on the legal notice page to avoid amplifying a home
 * address in search/AI snippets beyond the legally required disclosure.
 */
export function buildPersonSchema(locale: Locale) {
  const person = {
    '@type': 'Person',
    name: 'Robin Gerth',
    url: 'https://robin-gerth.de/',
    email: 'mailto:kontakt@robin-gerth.de',
    jobTitle: JOB_TITLE[locale],
    description: DESCRIPTION[locale],
    knowsAbout: SKILLS,
    sameAs: ['https://github.com/Gerth123', 'https://linkedin.com/in/robin-gerth-47100031b/'],
    makesOffer: OFFERS[locale].map((offer) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: offer.name,
        description: offer.description,
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    inLanguage: locale,
    mainEntity: person,
  };
}
