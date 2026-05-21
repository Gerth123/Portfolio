import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

type Language = 'en' | 'de';

interface Credential {
  title: string;
  issuer: string;
  period: Record<Language, string>;
  type: Record<Language, string>;
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
      issuer: 'Everlast',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'Certificate', de: 'Zertifikat' },
      fileUrl: 'https://zertifizierung.kiberatung.de/verify/b403695d-73c9-4473-a3f4-559cf4ceacd4',
      description: {
        en: 'Structured AI training with focus on practical use cases, process thinking and responsible integration of AI workflows into business contexts.',
        de: 'Strukturierte KI-Weiterbildung mit Fokus auf praktische Use Cases, Prozessdenken und verantwortungsvolle Integration von KI-Workflows in Business-Kontexte.',
      },
      tags: ['AI strategy', 'Process design', 'Automation'],
    },
    {
      title: 'Claude Code Masterclass',
      issuer: 'Everlast',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'Certificate', de: 'Zertifikat' },
      fileUrl: 'https://zertifizierung.kiberatung.de/verify/85b5f273-309f-42cc-9109-b645ea10a779',
      description: {
        en: 'Advanced workflow training for coding-agent usage, context preparation, prompt structure and reliable implementation loops.',
        de: 'Fortgeschrittenes Workflow-Training für Coding-Agent-Nutzung, Kontextvorbereitung, Prompt-Struktur und zuverlässige Implementierungszyklen.',
      },
      tags: ['Claude Code', 'Agent workflows', 'Prompt engineering'],
    },
    {
      title: 'Agentic Coding Masterclass',
      issuer: 'Everlast',
      period: { en: 'In progress', de: 'In Arbeit' },
      type: { en: 'Training', de: 'Weiterbildung' },
      description: {
        en: 'Current specialization in agentic coding workflows, task decomposition, review loops and AI-supported software delivery.',
        de: 'Aktuelle Spezialisierung auf Agentic-Coding-Workflows, Aufgabenzerlegung, Review-Schleifen und KI-gestützte Softwareauslieferung.',
      },
      tags: ['Agentic coding', 'Codex', 'Delivery workflows'],
    },
    {
      title: 'Frontend Development',
      issuer: 'Developer Akademie',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'Certificate', de: 'Zertifikat' },
      fileUrl: '../../assets/certificates/Frontend%20Zertifikat%20Robin%20Gerth.pdf',
      fileType: 'PDF',
      description: {
        en: 'Frontend training focused on responsive interfaces, Angular, TypeScript, reusable components and project-based UI implementation.',
        de: 'Frontend-Weiterbildung mit Fokus auf responsive Interfaces, Angular, TypeScript, wiederverwendbare Komponenten und projektbasierte UI-Umsetzung.',
      },
      tags: ['Angular', 'TypeScript', 'Responsive UI'],
    },
    {
      title: 'Backend Development',
      issuer: 'Developer Akademie',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'Certificate', de: 'Zertifikat' },
      fileUrl: '../../assets/certificates/Backend%20Zertifikat%20Robin%20Gerth.pdf',
      fileType: 'PDF',
      description: {
        en: 'Backend training focused on Python, Django, Django REST Framework, API design, authentication and data-driven application logic.',
        de: 'Backend-Weiterbildung mit Fokus auf Python, Django, Django REST Framework, API-Design, Authentifizierung und datengetriebene Anwendungslogik.',
      },
      tags: ['Python', 'Django / DRF', 'REST APIs'],
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
