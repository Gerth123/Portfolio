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
  en: 'Full-stack developer (Vue, Angular, Django, Shopware 6). I help small and medium-sized businesses save time with AI automation.',
  de: 'Full-Stack-Entwickler (Vue, Angular, Django, Shopware 6). Ich helfe kleinen und mittleren Unternehmen, mit KI-Automatisierung Zeit zu sparen.',
};

const SKILLS = [
  'Python',
  'Django',
  'Django REST Framework',
  'Vue',
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
        'I take on recurring work such as reporting, content maintenance or customer enquiries as an ongoing, automated service.',
    },
    {
      name: 'Web app implementation',
      description:
        'I build custom web applications and internal tools, from the initial requirement through to productive operation.',
    },
    {
      name: 'Agentic coding workshops',
      description:
        'I show development teams how to integrate AI coding agents into existing workflows in a controlled way.',
    },
    {
      name: 'Software & API audits',
      description: 'I review existing systems, interfaces and automations for weaknesses and unused potential.',
    },
    {
      name: 'MVP development',
      description:
        'I turn a business idea into a lean prototype that lets you test your assumptions quickly.',
    },
  ],
  de: [
    {
      name: 'Service-as-a-Software',
      description:
        'Ich übernehme wiederkehrende Aufgaben wie Reporting, Content-Pflege oder Kundenanfragen als laufenden, automatisierten Service.',
    },
    {
      name: 'Web-App-Implementierung',
      description:
        'Ich setze individuelle Web-Anwendungen und interne Tools um, von der Anforderung bis zum produktiven Betrieb.',
    },
    {
      name: 'Agentic Coding Workshops',
      description:
        'Ich zeige Entwicklerteams, wie sie KI-Coding-Agenten kontrolliert in bestehende Workflows einbinden.',
    },
    {
      name: 'Software- & API-Audits',
      description: 'Ich prüfe bestehende Systeme, Schnittstellen und Automatisierungen auf Schwachstellen und ungenutztes Potenzial.',
    },
    {
      name: 'MVP-Entwicklung',
      description:
        'Ich baue aus einer Geschäftsidee einen schlanken Prototyp, mit dem sich Annahmen schnell testen lassen.',
    },
  ],
};

export function getPageTitle(locale: Locale): string {
  return `Robin Gerth – ${JOB_TITLE[locale]} (Vue, Angular, Django, Shopware 6)`;
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
