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
        'Alongside my main role as a full-stack developer, I additionally support small and medium-sized businesses with the introduction of AI and automation, as well as the technical development of their online shops.',
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
        'Neben meiner Haupttätigkeit als Full-Stack-Entwickler unterstütze ich zusätzlich kleine und mittlere Unternehmen bei der Einführung von KI und Automatisierung sowie bei der technischen Weiterentwicklung ihrer Onlineshops.',
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
      icon: '../../assets/icons/prompt_engineering.svg',
      title: {
        en: 'AI feasibility workshops',
        de: 'KI-Machbarkeits-Workshops',
      },
      text: {
        en: 'Structured feasibility workshops for small and medium-sized businesses that clarify where AI and automation projects are realistic and what effort they involve.',
        de: 'Strukturierte Machbarkeits-Workshops für kleine und mittlere Unternehmen, die klären, wo sich KI- und Automatisierungsprojekte realistisch umsetzen lassen und welcher Aufwand damit verbunden ist.',
      },
    },
    {
      icon: '../../assets/icons/ki_workflows.svg',
      title: {
        en: 'AI-assisted automation',
        de: 'KI-gestützte Automatisierung',
      },
      text: {
        en: 'Implementation of AI-assisted automations such as n8n-based RAG chatbots and workflow automation that reliably take over recurring tasks.',
        de: 'Umsetzung KI-gestützter Automatisierungen wie n8n-basierter RAG-Chatbots und Workflow-Automatisierungen, die wiederkehrende Aufgaben zuverlässig übernehmen.',
      },
    },
    {
      icon: '../../assets/icons/shopware_6.svg',
      title: {
        en: 'Shopware consulting',
        de: 'Shopware-Beratung',
      },
      text: {
        en: 'Support for Shopware 6 operators with conversion optimization and technical development of their shop.',
        de: 'Unterstützung für Shopware-6-Betreiber bei Conversion-Optimierung und technischer Weiterentwicklung ihres Shops.',
      },
    },
    {
      icon: '../../assets/icons/automations.svg',
      title: {
        en: 'SEO/GEO audits',
        de: 'SEO/GEO-Audits',
      },
      text: {
        en: 'SEO and GEO audits (Search Engine + Generative Engine Optimization) for online shops and SMEs, with concrete, prioritized optimization potential.',
        de: 'SEO- und GEO-Audits (Search Engine + Generative Engine Optimization) für Onlineshops und KMUs mit konkreten, priorisierten Optimierungspotenzialen.',
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
