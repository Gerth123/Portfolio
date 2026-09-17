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
      quickCheckHeadline: 'Where can your business save time?',
      quickCheckText:
        'In a short conversation we look at your recurring processes and work out where automation pays off.',
      quickCheckNote: 'about 30 minutes, free of charge',
      quickCheckCta: 'Request a quick check',
    },
    de: {
      headline: 'Beratung & Automatisierung',
      shortDescription:
        'Neben meiner Haupttätigkeit als Full-Stack-Entwickler unterstütze ich zusätzlich kleine und mittlere Unternehmen bei Automatisierung, individueller Softwareentwicklung und dem kontrollierten Einsatz von KI.',
      quickCheckHeadline: 'Wo lässt sich in Ihrem Betrieb Zeit sparen?',
      quickCheckText:
        'In einem kurzen Gespräch schauen wir uns Ihre wiederkehrenden Prozesse an und klären, wo sich Automatisierung lohnt.',
      quickCheckNote: 'ca. 30 Minuten, kostenlos',
      quickCheckCta: 'Kurz-Check anfragen',
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
        en: 'I take on recurring work such as reporting, content maintenance or customer enquiries as an ongoing, automated service.',
        de: 'Ich übernehme wiederkehrende Aufgaben wie Reporting, Content-Pflege oder Kundenanfragen als laufenden, automatisierten Service.',
      },
    },
    {
      icon: '../../assets/icons/ai_assisted_coding.svg',
      title: {
        en: 'Web app implementation',
        de: 'Web-App-Implementierung',
      },
      text: {
        en: 'I build custom web applications and internal tools, from the initial requirement through to productive operation.',
        de: 'Ich setze individuelle Web-Anwendungen und interne Tools um, von der Anforderung bis zum produktiven Betrieb.',
      },
    },
    {
      icon: '../../assets/icons/agentic_coding.svg',
      title: {
        en: 'Agentic coding workshops',
        de: 'Agentic Coding Workshops',
      },
      text: {
        en: 'I show development teams how to integrate AI coding agents into existing workflows in a controlled way.',
        de: 'Ich zeige Entwicklerteams, wie sie KI-Coding-Agenten kontrolliert in bestehende Workflows einbinden.',
      },
    },
    {
      icon: '../../assets/icons/rest_api.svg',
      title: {
        en: 'Software & API audits',
        de: 'Software- & API-Audits',
      },
      text: {
        en: 'I review existing systems, interfaces and automations for weaknesses and unused potential.',
        de: 'Ich prüfe bestehende Systeme, Schnittstellen und Automatisierungen auf Schwachstellen und ungenutztes Potenzial.',
      },
    },
    {
      icon: '../../assets/icons/automations.svg',
      title: {
        en: 'MVP development',
        de: 'MVP-Entwicklung',
      },
      text: {
        en: 'I turn a business idea into a lean prototype that lets you test your assumptions quickly.',
        de: 'Ich baue aus einer Geschäftsidee einen schlanken Prototyp, mit dem sich Annahmen schnell testen lassen.',
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
