import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  public translations: any = {
    en: {
      firstSpan: 'Selected projects that show how I structure interfaces, handle data and turn requirements into usable web applications.',
      joinText: 'Kanban-style task manager with authentication, task states, drag and drop interactions, user assignment and Firebase-backed data handling. The project strengthened my work with application logic, state changes and reusable UI structures.',
      elPolloLocoText: 'Browser game built with object-oriented JavaScript, collision handling, keyboard controls and canvas-based rendering. It sharpened my understanding of clean game loops, component responsibilities and interactive frontend logic.',
      dabubbleText: 'Slack-inspired chat application focused on responsive UI, channel and direct-message flows, Firebase integration and structured component logic. The project reflects practical experience with real-time communication patterns and modern Angular development.',
      videoflixText: 'Full-stack streaming platform with a Django REST Framework backend and Angular frontend. My main focus was the Python/Django API layer, authentication, media data structures and user flows such as favorites and Continue Watching with stored video progress.',
      liveTest: 'Live test',
    },
    de: {
      firstSpan: 'Ausgewählte Projekte, die zeigen, wie ich Interfaces strukturiere, Daten verarbeite und Anforderungen in nutzbare Webanwendungen übersetze.',
      joinText: 'Kanban-orientierter Task-Manager mit Authentifizierung, Aufgabenstatus, Drag-and-Drop-Interaktionen, Benutzerzuweisung und Firebase-gestützter Datenhaltung. Das Projekt hat meine Arbeit mit Applikationslogik, Zustandsänderungen und wiederverwendbaren UI-Strukturen vertieft.',
      elPolloLocoText: 'Browsergame mit objektorientiertem JavaScript, Collision Detection, Tastatursteuerung und Canvas-Rendering. Das Projekt hat mein Verständnis für saubere Game-Loops, klare Komponentenverantwortung und interaktive Frontend-Logik geschärft.',
      dabubbleText: 'Slack-inspirierte Chat-Anwendung mit Fokus auf responsive UI, Channel- und Direktnachrichten-Flows, Firebase-Integration und strukturierter Komponentenlogik. Das Projekt zeigt praktische Erfahrung mit Echtzeitkommunikation und moderner Angular-Entwicklung.',
      videoflixText: 'Full-Stack-Streaming-Plattform mit Django-REST-Framework-Backend und Angular-Frontend. Mein Schwerpunkt lag auf der Python/Django-API, Authentifizierung, Medien-Datenstrukturen und User-Flows wie Favoriten und Continue Watching mit gespeichertem Videofortschritt.',
      liveTest: 'Live-Test',
    }
  };

  public currentLanguage: 'en' | 'de' = 'en';

  constructor(private languageService: LanguageService) {}

  /**
   * Retrieves the translation for the given field based on the current language.
   *
   * @param {string} field - The key of the translation to retrieve.
   * @returns {string} The translation for the given field.
   */
  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  };
}
