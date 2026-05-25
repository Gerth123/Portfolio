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
      shortDescription:
        'I am a full-stack developer with hands-on experience in productive business systems. My current work includes Shopware 6, backend logic, REST APIs, Angular frontends and selected Kotlin adjustments for Android.',
      location:
        'I focus on clear, maintainable implementation and technical decisions that remain understandable during ongoing operation.',
      interest:
        'I work in a structured way, clarify requirements carefully and keep effort, value and risk visible throughout implementation.',
      puzzle:
        'AI-assisted development tools support research, code analysis and refactoring, but the work remains driven by engineering judgement and technical control.',
    },
    de: {
      headline: 'Über mich',
      shortDescription:
        'Ich bin Full-Stack-Entwickler mit praktischer Erfahrung in produktiven Unternehmenssystemen. In meiner aktuellen Arbeit beschäftige ich mich unter anderem mit Shopware 6, Backend-Logik, REST-Schnittstellen, Angular-Frontends und ausgewählten Kotlin-Anpassungen für Android.',
      location:
        'Mein Schwerpunkt liegt auf klarer, wartbarer Umsetzung und technischen Entscheidungen, die im laufenden Betrieb nachvollziehbar bleiben.',
      interest:
        'Ich arbeite strukturiert, kläre Anforderungen sorgfältig und behalte Aufwand, Nutzen und Risiken während der Umsetzung im Blick.',
      puzzle:
        'KI-gestützte Entwicklungswerkzeuge nutze ich unterstützend für Recherche, Codeanalyse und Refactoring. Die technische Verantwortung bleibt dabei klar beim Entwickler.',
    },
  };

  public workSignals = [
    {
      value: 'Shopware 6',
      label: {
        en: 'Productive e-commerce systems and technical extensions',
        de: 'Produktive E-Commerce-Systeme und technische Erweiterungen',
      },
    },
    {
      value: 'Structured',
      label: {
        en: 'Clear requirements, traceable decisions and maintainable delivery',
        de: 'Klare Anforderungen, nachvollziehbare Entscheidungen und wartbare Umsetzung',
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
