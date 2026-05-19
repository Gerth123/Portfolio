import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';

type Language = 'en' | 'de';

interface CaseStudy {
  title: string;
  kicker: Record<Language, string>;
  stack: string[];
  text: Record<Language, string>;
  focus: Record<Language, string[]>;
  image?: string;
  imageAlt?: string;
  imageClass?: string;
  mediaClass?: string;
  visualType?: 'ai';
  liveHref?: string;
  codeHref?: string;
  codeLabel?: string;
  reverse?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, NgClass],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  public translations: any = {
    en: {
      firstSpan: 'Selected case studies that show how I structure interfaces, handle data, solve technical constraints and translate requirements into usable software.',
      liveTest: 'Open project',
      caseStudy: 'Case study',
    },
    de: {
      firstSpan: 'Ausgewählte Case Studies, die zeigen, wie ich Interfaces strukturiere, Daten verarbeite, technische Einschränkungen löse und Anforderungen in nutzbare Software übersetze.',
      liveTest: 'Projekt öffnen',
      caseStudy: 'Case Study',
    },
  };

  public caseStudies: CaseStudy[] = [
    {
      title: 'Join',
      kicker: {
        en: 'Task workflow application',
        de: 'Task-Workflow-Anwendung',
      },
      stack: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      text: {
        en: 'Kanban-style task manager with authentication, task states, drag and drop interactions, user assignment and Firebase-backed data handling.',
        de: 'Kanban-orientierter Task-Manager mit Authentifizierung, Aufgabenstatus, Drag-and-Drop-Interaktionen, Benutzerzuweisung und Firebase-gestützter Datenhaltung.',
      },
      focus: {
        en: ['State transitions across task columns', 'Reusable UI structures', 'User and task data handling'],
        de: ['Statuswechsel über Task-Spalten hinweg', 'Wiederverwendbare UI-Strukturen', 'Benutzer- und Aufgabendaten'],
      },
      image: '../../assets/img/imac_join.png',
      imageAlt: 'Join task manager preview',
      liveHref: 'https://robin-gerth.de/Join/login.html',
      codeHref: 'https://github.com/Gerth123/Join',
      codeLabel: 'GitHub',
    },
    {
      title: 'DaBubble',
      kicker: {
        en: 'Realtime communication UI',
        de: 'Realtime-Communication-UI',
      },
      stack: ['Angular', 'TypeScript', 'Firebase'],
      text: {
        en: 'Slack-inspired chat application focused on responsive UI, channel and direct-message flows, Firebase integration and structured Angular component logic.',
        de: 'Slack-inspirierte Chat-Anwendung mit Fokus auf responsive UI, Channel- und Direktnachrichten-Flows, Firebase-Integration und strukturierter Angular-Komponentenlogik.',
      },
      focus: {
        en: ['Component-driven frontend structure', 'Realtime communication patterns', 'Responsive app navigation'],
        de: ['Komponentenbasierte Frontend-Struktur', 'Realtime-Kommunikationsmuster', 'Responsive App-Navigation'],
      },
      image: '../../assets/img/iphone_6s_dabubble.png',
      imageAlt: 'DaBubble chat app preview',
      imageClass: 'phone-preview',
      liveHref: 'https://robin-gerth.de/DaBubble/',
      codeHref: 'https://github.com/Gerth123/DaBubble',
      codeLabel: 'GitHub',
      reverse: true,
    },
    {
      title: 'AI / RAG Workflows',
      kicker: {
        en: 'Internal engineering systems',
        de: 'Interne Engineering-Systeme',
      },
      stack: ['Python', 'LLM APIs', 'RAG', 'Automation', 'Prompt Engineering'],
      text: {
        en: 'Internal AI experiments and workflows for structured prompting, retrieval-augmented context, coding-agent usage and repeatable automation patterns.',
        de: 'Interne KI-Experimente und Workflows für strukturiertes Prompting, retrieval-augmented Context, Coding-Agent-Nutzung und wiederholbare Automatisierungsmuster.',
      },
      focus: {
        en: ['Context preparation for coding agents', 'RAG pipeline thinking', 'Practical AI workflow design'],
        de: ['Kontextvorbereitung für Coding Agents', 'RAG-Pipeline-Denken', 'Praxisnahes KI-Workflow-Design'],
      },
      visualType: 'ai',
    },
    {
      title: 'Videoflix',
      kicker: {
        en: 'Full-stack media platform',
        de: 'Full-Stack-Media-Plattform',
      },
      stack: ['Python', 'Django / DRF', 'Angular'],
      text: {
        en: 'Full-stack streaming platform with a Django REST Framework backend and Angular frontend. My main focus was the API layer, authentication, media structures and video progress flows.',
        de: 'Full-Stack-Streaming-Plattform mit Django-REST-Framework-Backend und Angular-Frontend. Mein Schwerpunkt lag auf API-Layer, Authentifizierung, Medienstrukturen und Videofortschritt-Flows.',
      },
      focus: {
        en: ['REST API design', 'Authentication and user flows', 'Persisted media progress'],
        de: ['REST-API-Design', 'Authentifizierung und User-Flows', 'Gespeicherter Medienfortschritt'],
      },
      image: '../../assets/img/videoflix_laptop.png',
      imageAlt: 'Videoflix streaming platform preview',
      imageClass: 'videoflix-preview',
      mediaClass: 'project-media--videoflix',
      liveHref: 'https://robin-gerth.de/Videoflix/',
      codeHref: 'https://gitlab.com/videoflix-49808/videoflix',
      codeLabel: 'GitLab',
      reverse: true,
    },
    {
      title: 'El Pollo Loco',
      kicker: {
        en: 'Interactive frontend logic',
        de: 'Interaktive Frontend-Logik',
      },
      stack: ['JavaScript', 'Canvas', 'OOP'],
      text: {
        en: 'Browser game built with object-oriented JavaScript, collision handling, keyboard controls and canvas rendering.',
        de: 'Browsergame mit objektorientiertem JavaScript, Collision Handling, Tastatursteuerung und Canvas-Rendering.',
      },
      focus: {
        en: ['Game loop and rendering model', 'Collision and input logic', 'Responsibility-oriented JavaScript'],
        de: ['Game Loop und Rendering-Modell', 'Collision- und Input-Logik', 'Verantwortungsorientiertes JavaScript'],
      },
      image: '../../assets/img/el_pollo_loco_laptop.svg',
      imageAlt: 'El Pollo Loco browser game preview',
      imageClass: 'el-pollo-loco-img',
      mediaClass: 'project-media--el-pollo',
      liveHref: 'https://robin-gerth.de/el_pollo_loco/index.html',
      codeHref: 'https://github.com/Gerth123/El-Pollo-Loco',
      codeLabel: 'GitHub',
    },
  ];

  constructor(private languageService: LanguageService) {}

  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  }

  getCurrentLanguage(): Language {
    return this.languageService.currentLanguage as Language;
  }
}
