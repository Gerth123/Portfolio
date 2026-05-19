import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  public translations: any = {
    en: {
      headline: 'About me',
      shortDescription: 'I am Robin, a full-stack developer working on productive e-commerce systems at ABC Design. My daily work connects Shopware 6, plugin customization, REST-based features, selected Kotlin app updates and AI-assisted delivery workflows.',
      location: 'Production-oriented development with clear ownership, traceable decisions and a practical eye for maintainability.',
      interest: 'AI-assisted engineering is part of my normal workflow: I use coding agents, prompt structure and automation to move faster without losing technical control.',
      puzzle: 'I translate business requirements into concrete technical steps, from Shopware plugin changes and API integrations to frontend features and technical SEO improvements.',
    },
    de: {
      headline: 'Über mich',
      shortDescription: 'Ich bin Robin, Full-Stack-Entwickler mit Praxiserfahrung in produktiven E-Commerce-Systemen bei ABC Design. Meine tägliche Arbeit verbindet Shopware 6, Plugin-Anpassungen, REST-basierte Features, ausgewählte Kotlin-App-Updates und KI-gestützte Delivery-Workflows.',
      location: 'Produktionsnahe Entwicklung mit klarer Verantwortung, nachvollziehbaren Entscheidungen und Blick für Wartbarkeit.',
      interest: 'AI-assisted Engineering ist Teil meines normalen Workflows: Ich nutze Coding Agents, Prompt-Struktur und Automatisierung, um schneller zu liefern, ohne technische Kontrolle zu verlieren.',
      puzzle: 'Ich übersetze Business-Anforderungen in konkrete technische Schritte, von Shopware-Plugin-Änderungen und API-Integrationen bis zu Frontend-Features und Technical SEO.',
    },
  };

  public workSignals = [
    {
      value: 'Shopware 6',
      label: {
        en: 'Productive e-commerce systems and plugin work',
        de: 'Produktive E-Commerce-Systeme und Plugin-Arbeit',
      },
    },
    {
      value: 'AI-first',
      label: {
        en: 'Claude Code, Codex, agentic coding and automation',
        de: 'Claude Code, Codex, Agentic Coding und Automatisierung',
      },
    },
    {
      value: 'Full stack',
      label: {
        en: 'Django / DRF, Angular, APIs, Kotlin and Linux workflows',
        de: 'Django / DRF, Angular, APIs, Kotlin und Linux-Workflows',
      },
    },
  ];

  public currentLanguage: 'en' | 'de' = 'en';

  constructor(private languageService: LanguageService) {}

  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  }

  getSignalLabel(signal: { label: { en: string; de: string } }): string {
    return signal.label[this.languageService.currentLanguage as 'en' | 'de'];
  }
}
