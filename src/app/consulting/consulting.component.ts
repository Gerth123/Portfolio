import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

type Language = 'en' | 'de';

type ConsultingOffer = {
  icon: string;
  title: Record<Language, string>;
  text: Record<Language, string>;
};

@Component({
  selector: 'app-consulting',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './consulting.component.html',
  styleUrl: './consulting.component.scss',
})
export class ConsultingComponent {
  public translations: Record<Language, Record<string, string>> = {
    en: {
      headline: 'Consulting & Automation',
      shortDescription:
        'Alongside my main role as a full-stack developer, I additionally support small and medium-sized businesses with automation, custom software development and the controlled use of AI.',
      ctaText: 'Send an inquiry',
      quickCheckKicker: 'Free quick check',
      quickCheckHeadline: 'Where can your business save the most time?',
      quickCheckText:
        'In a short conversation we look at your recurring processes together, and I tell you honestly where AI and automation pay off for your business — and where they do not.',
      quickCheckNote: 'About 30 minutes · no obligation · free of charge',
      quickCheckCta: 'Request a free quick check',
    },
    de: {
      headline: 'Beratung & Automatisierung',
      shortDescription:
        'Neben meiner Haupttätigkeit als Full-Stack-Entwickler unterstütze ich zusätzlich kleine und mittlere Unternehmen bei Automatisierung, individueller Softwareentwicklung und dem kontrollierten Einsatz von KI.',
      ctaText: 'Anfrage stellen',
      quickCheckKicker: 'Kostenloser Kurz-Check',
      quickCheckHeadline: 'Wo lässt sich in Ihrem Betrieb am schnellsten Zeit sparen?',
      quickCheckText:
        'In einem kurzen Gespräch schauen wir gemeinsam auf Ihre wiederkehrenden Abläufe, und ich sage Ihnen ehrlich, wo sich KI und Automatisierung für Ihren Betrieb lohnen — und wo nicht.',
      quickCheckNote: 'Ca. 30 Minuten · unverbindlich · kostenlos',
      quickCheckCta: 'Kostenlosen Kurz-Check anfragen',
    },
  };

  public offers: ConsultingOffer[] = [
    {
      icon: '../../assets/icons/ki_workflows.svg',
      title: {
        en: 'Service as a Software',
        de: 'Service-as-a-Software',
      },
      text: {
        en: 'Recurring work such as reporting, content maintenance or customer enquiries is taken over as an automated, predictable service instead of being billed as a one-off project.',
        de: 'Laufende Aufgaben wie Reporting, Content-Pflege oder Kundenanfragen werden als automatisierter, planbarer Service übernommen, statt als einmaliges Projekt abgerechnet.',
      },
    },
    {
      icon: '../../assets/icons/ai_assisted_coding.svg',
      title: {
        en: 'Web app implementation',
        de: 'Web-App-Implementierung',
      },
      text: {
        en: 'Custom web applications and internal tools are implemented in a structured way, from the initial requirement through to productive operation.',
        de: 'Individuelle Web-Anwendungen und interne Tools werden von der Anforderung bis zum produktiven Betrieb strukturiert umgesetzt.',
      },
    },
    {
      icon: '../../assets/icons/agentic_coding.svg',
      title: {
        en: 'Agentic coding workshops',
        de: 'Agentic Coding Workshops',
      },
      text: {
        en: 'Hands-on workshops show development teams how to integrate AI coding agents into existing workflows in a controlled and productive way.',
        de: 'Praxisnahe Workshops zeigen Entwicklerteams, wie sie KI-Coding-Agenten kontrolliert und produktiv in bestehende Workflows einbinden.',
      },
    },
    {
      icon: '../../assets/icons/rest_api.svg',
      title: {
        en: 'Software & API audits',
        de: 'Software- & API-Audits',
      },
      text: {
        en: 'Existing systems, interfaces and automations are reviewed for weaknesses, risks and unused potential.',
        de: 'Bestehende Systeme, Schnittstellen und Automatisierungen werden auf Schwachstellen, Risiken und ungenutztes Potenzial geprüft.',
      },
    },
    {
      icon: '../../assets/icons/automations.svg',
      title: {
        en: 'MVP development',
        de: 'MVP-Entwicklung',
      },
      text: {
        en: 'Business ideas are built as a lean, working prototype so assumptions can be tested quickly and at manageable effort.',
        de: 'Geschäftsideen werden als schlanker, funktionsfähiger Prototyp umgesetzt, um Annahmen schnell und mit überschaubarem Aufwand zu testen.',
      },
    },
  ];

  constructor(private languageService: LanguageService) {}

  getCurrentText(field: string): string {
    return this.translations[this.getCurrentLanguage()][field];
  }

  getOfferTitle(offer: ConsultingOffer): string {
    return offer.title[this.getCurrentLanguage()];
  }

  getOfferText(offer: ConsultingOffer): string {
    return offer.text[this.getCurrentLanguage()];
  }

  getCurrentLanguage(): Language {
    return this.languageService.currentLanguage as Language;
  }

  handleScroll(fragment: string): void {
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }
}
