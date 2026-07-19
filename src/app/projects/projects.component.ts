import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';

type Language = 'en' | 'de';

interface CaseStudy {
  title: string | Record<Language, string>;
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
  codeLinks?: { href: string; label: string }[];
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
      headline: 'Case studies',
      firstSpan:
        'Selected work with a focus on practical implementation, clear application logic and maintainable technical structures.',
      liveTest: 'Open project',
      caseStudy: 'Project',
    },
    de: {
      headline: 'Projekte',
      firstSpan:
        'Ausgewählte Arbeiten mit Fokus auf praktische Umsetzung, nachvollziehbare Anwendungslogik und wartbare technische Strukturen.',
      liveTest: 'Projekt öffnen',
      caseStudy: 'Projekt',
    },
  };

  public caseStudies: CaseStudy[] = [
    {
      title: {
        en: 'Internal knowledge management & RAG chatbot',
        de: 'Internes Wissensmanagement & RAG-Chatbot',
      },
      kicker: {
        en: 'Internal AI automation',
        de: 'Interne KI-Automatisierung',
      },
      stack: ['n8n', 'Qdrant', 'Microsoft Teams', 'Entra ID', 'RAG'],
      text: {
        en: 'Built an internal RAG-based chatbot for Microsoft Teams to make distributed company knowledge accessible. The focus is on hybrid search, reranking and a clean indexing pipeline, so employees find answers directly in their usual work context instead of searching scattered documents and emails.',
        de: 'Aufbau eines internen RAG-basierten Chatbots für Microsoft Teams zur Erschließung verteilten Unternehmenswissens. Der Fokus liegt auf Hybrid Search, Reranking und einer sauberen Indexierungs-Pipeline, damit Mitarbeiter Antworten direkt im gewohnten Arbeitskontext finden statt in verstreuten Dokumenten und E-Mails zu suchen.',
      },
      focus: {
        en: ['Hybrid search (semantic + lexical) with reranking', 'Microsoft Teams integration incl. Entra ID permissions', 'n8n-based indexing pipeline for company documents'],
        de: ['Hybrid Search (semantisch + lexikalisch) mit Reranking', 'Anbindung an Microsoft Teams inkl. Entra-ID-Berechtigungen', 'n8n-basierte Indexierungs-Pipeline für Unternehmensdokumente'],
      },
      visualType: 'ai',
    },
    {
      title: 'Join',
      kicker: {
        en: 'Kanban task tool',
        de: 'Kanban-Tool',
      },
      stack: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
      text: {
        en: 'Kanban-style task tool with user management, task states, drag-and-drop logic and structured data handling. The focus is on clear UI structure and understandable application logic.',
        de: 'Kanban-orientiertes Task-Tool mit Benutzerverwaltung, Aufgabenstatus, Drag-and-Drop-Logik und strukturierter Datenhaltung. Der Fokus liegt auf klarer UI-Struktur und nachvollziehbarer Anwendungslogik.',
      },
      focus: {
        en: ['Task states and workflow logic', 'User and task data handling', 'Reusable UI structures'],
        de: ['Aufgabenstatus und Workflow-Logik', 'Benutzer- und Aufgabendaten', 'Wiederverwendbare UI-Strukturen'],
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
        en: 'Messenger application',
        de: 'Messenger-Anwendung',
      },
      stack: ['Angular', 'TypeScript', 'Firebase'],
      text: {
        en: 'Messenger application with channels, direct messages, responsive frontend implementation and Firebase integration. The focus is on component structure, user flows and real-time communication.',
        de: 'Messenger-Anwendung mit Channels, Direktnachrichten, responsiver Frontend-Umsetzung und Firebase-Anbindung. Der Fokus liegt auf Komponentenstruktur, Benutzerführung und Echtzeitkommunikation.',
      },
      focus: {
        en: ['Component-based frontend structure', 'Channel and direct-message flows', 'Responsive app navigation'],
        de: ['Komponentenbasierte Frontend-Struktur', 'Channel- und Direktnachrichten-Flows', 'Responsive App-Navigation'],
      },
      image: '../../assets/img/iphone_6s_dabubble.png',
      imageAlt: 'DaBubble chat app preview',
      imageClass: 'phone-preview',
      liveHref: 'https://robin-gerth.de/angular-projects/dabubble/',
      codeHref: 'https://github.com/Gerth123/DaBubble',
      codeLabel: 'GitHub',
      reverse: true,
    },
    {
      title: 'Videoflix',
      kicker: {
        en: 'Full-stack media platform',
        de: 'Full-Stack-Media-Plattform',
      },
      stack: ['Python', 'Django / DRF', 'Angular'],
      text: {
        en: 'Full-stack streaming platform with a Django REST Framework backend and Angular frontend. The main focus is API structure, authentication, media data and video progress flows.',
        de: 'Full-Stack-Streaming-Plattform mit Django-REST-Framework-Backend und Angular-Frontend. Der Schwerpunkt liegt auf API-Struktur, Authentifizierung, Mediendaten und Videofortschritt.',
      },
      focus: {
        en: ['REST API design', 'Authentication and user flows', 'Persisted media progress'],
        de: ['REST-API-Design', 'Authentifizierung und User-Flows', 'Gespeicherter Medienfortschritt'],
      },
      image: '../../assets/img/videoflix_laptop.png',
      imageAlt: 'Videoflix streaming platform preview',
      imageClass: 'videoflix-preview',
      mediaClass: 'project-media--videoflix',
      codeLinks: [
        {
          href: 'https://github.com/Gerth123/Videoflix-Backend',
          label: 'GitHub Backend',
        },
        {
          href: 'https://github.com/Gerth123/Videoflix-Frontend',
          label: 'GitHub Frontend',
        },
      ],
      reverse: true,
    },
    {
      title: 'El Pollo Loco',
      kicker: {
        en: 'Browser game',
        de: 'Browsergame',
      },
      stack: ['JavaScript', 'Canvas', 'OOP'],
      text: {
        en: 'Browser game built with object-oriented JavaScript, canvas rendering, keyboard input and collision logic. The technical focus is clean game logic and structured state handling.',
        de: 'Browsergame mit objektorientiertem JavaScript, Canvas-Rendering, Tastatursteuerung und Kollisionslogik. Der technische Fokus liegt auf sauberer Spiellogik und strukturierter Zustandsverwaltung.',
      },
      focus: {
        en: ['Game loop and rendering model', 'Collision and input logic', 'Responsibility-oriented JavaScript'],
        de: ['Game Loop und Rendering-Modell', 'Kollisions- und Eingabelogik', 'Verantwortungsorientiertes JavaScript'],
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

  getTitle(project: CaseStudy): string {
    return typeof project.title === 'string' ? project.title : project.title[this.getCurrentLanguage()];
  }
}
