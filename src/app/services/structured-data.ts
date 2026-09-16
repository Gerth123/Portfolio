export type Locale = 'en' | 'de';

const BASE_URL = 'https://robin-gerth.de';

/** Builds a language-prefixed absolute URL, e.g. buildLocalizedUrl('de', 'legal-notice') -> https://robin-gerth.de/de/legal-notice */
export function buildLocalizedUrl(locale: Locale, path = ''): string {
  return path ? `${BASE_URL}/${locale}/${path}` : `${BASE_URL}/${locale}`;
}

/** hreflang alternates for a given path, including an x-default pointing at the English version. */
export function buildHreflangAlternates(path = ''): { hreflang: string; href: string }[] {
  return [
    { hreflang: 'en', href: buildLocalizedUrl('en', path) },
    { hreflang: 'de', href: buildLocalizedUrl('de', path) },
    { hreflang: 'x-default', href: buildLocalizedUrl('en', path) },
  ];
}

const JOB_TITLE: Record<Locale, string> = {
  en: 'Full-Stack Developer',
  de: 'Full-Stack-Entwickler',
};

const DESCRIPTION: Record<Locale, string> = {
  en: 'Full-stack developer specializing in Angular, Django REST Framework, Shopware 6 and REST APIs. Also offers service as a software, web app implementation, agentic coding workshops, software & API audits and MVP development for small and medium-sized businesses.',
  de: 'Full-Stack-Entwickler mit Fokus auf Angular, Django REST Framework, Shopware 6 und REST-APIs. Bietet zusätzlich Service-as-a-Software, Web-App-Implementierung, Agentic Coding Workshops, Software- & API-Audits und MVP-Entwicklung für kleine und mittlere Unternehmen an.',
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
      name: 'Service as a Software',
      description:
        'Recurring work such as reporting, content maintenance or customer enquiries is taken over as an automated, predictable service instead of being billed as a one-off project.',
    },
    {
      name: 'Web app implementation',
      description:
        'Custom web applications and internal tools are implemented in a structured way, from the initial requirement through to productive operation.',
    },
    {
      name: 'Agentic coding workshops',
      description:
        'Hands-on workshops show development teams how to integrate AI coding agents into existing workflows in a controlled and productive way.',
    },
    {
      name: 'Software & API audits',
      description: 'Existing systems, interfaces and automations are reviewed for weaknesses, risks and unused potential.',
    },
    {
      name: 'MVP development',
      description:
        'Business ideas are built as a lean, working prototype so assumptions can be tested quickly and at manageable effort.',
    },
  ],
  de: [
    {
      name: 'Service-as-a-Software',
      description:
        'Laufende Aufgaben wie Reporting, Content-Pflege oder Kundenanfragen werden als automatisierter, planbarer Service übernommen, statt als einmaliges Projekt abgerechnet.',
    },
    {
      name: 'Web-App-Implementierung',
      description:
        'Individuelle Web-Anwendungen und interne Tools werden von der Anforderung bis zum produktiven Betrieb strukturiert umgesetzt.',
    },
    {
      name: 'Agentic Coding Workshops',
      description:
        'Praxisnahe Workshops zeigen Entwicklerteams, wie sie KI-Coding-Agenten kontrolliert und produktiv in bestehende Workflows einbinden.',
    },
    {
      name: 'Software- & API-Audits',
      description: 'Bestehende Systeme, Schnittstellen und Automatisierungen werden auf Schwachstellen, Risiken und ungenutztes Potenzial geprüft.',
    },
    {
      name: 'MVP-Entwicklung',
      description:
        'Geschäftsideen werden als schlanker, funktionsfähiger Prototyp umgesetzt, um Annahmen schnell und mit überschaubarem Aufwand zu testen.',
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
    url: buildLocalizedUrl(locale),
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
