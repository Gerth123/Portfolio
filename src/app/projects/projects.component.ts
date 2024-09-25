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
     firstSpan: 'Explore a selection of my work here - Interact with projects to see my skills in action.',
     joinText: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
     elPolloLocoText: 'A simple Jump-and-Run game based on an object-oriented approach. Help pepe to collect bottles and coins, while defeating chickens and finally the endboss at the end.',
     pokedexText: 'A simple library based on the PokeAPI. Search for pokemons and learn more about them.',
     liveTest: 'Live test',
    },
    de: {
      firstSpan: 'Entdecken Sie hier eine Auswahl meiner Projekte - Interagieren Sie mit diesen, um meine Fähigkeiten in Aktion zu sehen.',
      joinText: 'Ein Aufgabenmanager nach dem Vorbild des Kanban-Systems. Erstellen und organisieren Sie Aufgaben mit Hilfe von Drag-and-Drop-Funktionen, weisen Sie Benutzer und Kategorien zu.',
      elPolloLocoText: 'Ein einfaches Jump-and-Run-Spiel, das auf einem objektorientierten Ansatz basiert. Hilf Pepe, Flaschen und Münzen zu sammeln, während du Hühner und den Endboss am Ende besiegst.',
      pokedexText: 'Eine einfache Bibliothek basierend auf der PokeAPI. Suchen Sie nach Pokemons und erfahren Sie mehr über sie.',
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
