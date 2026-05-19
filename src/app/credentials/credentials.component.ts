import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

type Language = 'en' | 'de';

interface Credential {
  title: string;
  issuer: string;
  period: string;
  type: string;
  description: Record<Language, string>;
  tags: string[];
  fileUrl?: string;
  fileType?: 'PDF' | 'IMG';
  previewImage?: string;
}

@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.scss',
})
export class CredentialsComponent {
  public translations = {
    en: {
      kicker: 'Credentials',
      headline: 'Certificates and licenses',
      intro: 'A curated overview of completed training, current learning tracks and credentials that support my work in AI-assisted engineering, full-stack development and modern delivery workflows.',
      evidenceAvailable: 'Evidence available on request',
      openDocument: 'Open document',
    },
    de: {
      kicker: 'Nachweise',
      headline: 'Zertifikate und Lizenzen',
      intro: 'Eine kuratierte Übersicht abgeschlossener Weiterbildungen, aktueller Lernpfade und Nachweise, die meine Arbeit in AI-assisted Engineering, Full-Stack-Entwicklung und modernen Delivery-Workflows unterstützen.',
      evidenceAvailable: 'Nachweis auf Anfrage',
      openDocument: 'Nachweis öffnen',
    },
  };

  public credentials: Credential[] = [
    {
      title: 'KI-Manager Weiterbildung',
      issuer: 'Professional training',
      period: 'Completed',
      type: 'Certificate',
      description: {
        en: 'Structured AI training with focus on practical use cases, process thinking and responsible integration of AI workflows into business contexts.',
        de: 'Strukturierte KI-Weiterbildung mit Fokus auf praktische Use Cases, Prozessdenken und verantwortungsvolle Integration von KI-Workflows in Business-Kontexte.',
      },
      tags: ['AI strategy', 'Process design', 'Automation'],
    },
    {
      title: 'Claude Code Masterclass',
      issuer: 'AI-assisted development',
      period: 'Completed',
      type: 'Certificate',
      description: {
        en: 'Advanced workflow training for coding-agent usage, context preparation, prompt structure and reliable implementation loops.',
        de: 'Fortgeschrittenes Workflow-Training für Coding-Agent-Nutzung, Kontextvorbereitung, Prompt-Struktur und zuverlässige Implementierungszyklen.',
      },
      tags: ['Claude Code', 'Agent workflows', 'Prompt engineering'],
    },
    {
      title: 'Agentic Coding Masterclass',
      issuer: 'AI engineering track',
      period: 'In progress',
      type: 'Training',
      description: {
        en: 'Current specialization in agentic coding workflows, task decomposition, review loops and AI-supported software delivery.',
        de: 'Aktuelle Spezialisierung auf Agentic-Coding-Workflows, Aufgabenzerlegung, Review-Schleifen und KI-gestützte Softwareauslieferung.',
      },
      tags: ['Agentic coding', 'Codex', 'Delivery workflows'],
    },
    {
      title: 'Frontend and Backend Training',
      issuer: 'Developer Akademie',
      period: 'Completed',
      type: 'Certificate',
      description: {
        en: 'Full-stack training foundation covering modern frontend development, backend APIs, application architecture and project-based implementation.',
        de: 'Full-Stack-Grundlage mit moderner Frontend-Entwicklung, Backend-APIs, Anwendungsarchitektur und projektbasierter Umsetzung.',
      },
      tags: ['Angular', 'Django / DRF', 'REST APIs'],
    },
  ];

  constructor(private languageService: LanguageService) {}

  getCurrentText(field: keyof typeof this.translations.en): string {
    const language = this.languageService.currentLanguage as Language;
    return this.translations[language][field];
  }

  getCurrentLanguage(): Language {
    return this.languageService.currentLanguage as Language;
  }
}
