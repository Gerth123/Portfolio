import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  public translations: any = {
    en: {
     firstSpan: 'Explore a selection of my work here - Interact with projects to see my skills in action.',
     joinText: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
     elPolloLocoText: 'A simple Jump-and-Run game based on an object-oriented approach. Help pepe to collect bottles and coins, while defeating chickens and finally the endboss at the end.',
     dabubbleText: 'A lightweight Slack/Discord clone with real-time communication, channels, and Firebase integration for secure authentication and reliable synchronization. Ideal for teams and communities.',
     liveTest: 'Live test',
     videoflixText: 'A personal Netflix-style streaming platform. Users can register and log in to stream protected videos. Built with Angular and the Django REST Framework.'
    },
    de: {
      firstSpan: 'Entdecken Sie hier eine Auswahl meiner Projekte - Interagieren Sie mit diesen, um meine Fähigkeiten in Aktion zu sehen.',
      joinText: 'Ein Aufgabenmanager nach dem Vorbild des Kanban-Systems. Erstellen und organisieren Sie Aufgaben mit Hilfe von Drag-and-Drop-Funktionen, weisen Sie Benutzer und Kategorien zu.',
      elPolloLocoText: 'Ein einfaches Jump-and-Run-Spiel, das auf einem objektorientierten Ansatz basiert. Hilf Pepe, Flaschen und Münzen zu sammeln, während du Hühner und den Endboss am Ende besiegst.',
      dabubbleText: 'Ein schlanker Slack-/Discord-Klon mit Echtzeitkommunikation, Kanälen und Firebase-Integration für sichere Authentifizierung und zuverlässige Synchronisation. Ideal für Teams und Communitys.',
      liveTest: 'Live-Test',
      videoflixText: 'Eine eigene Streaming-Plattform im Netflix-Stil. Nutzer können sich registrieren und anmelden, um geschützte Videos zu streamen. Entwickelt mit Angular und dem Django REST Framework.'
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
