import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})

export class AboutMeComponent {
  public translations: any = {
    en: {
      headline: 'About me',
      shortDescription: "Hi, I'm a german speaking Frontend Developer based near Basel. Motivated by the limitless oportunities within IT, I am excited about crafting visually captivating and intuitive websites and applications.",
      location: "Flexible in terms of working environments, I can work effectively both on-site in Bad Säckingen and remotely. I am open to moving to another location also. ",
      interest: "I am passionate about technology and I am always looking for new challenges to improve my knowledge and skills.",
      puzzle: "In my profession, programming isn't just about writing code; it's a creative form of problem solving. I take pride in my ability to distill complex technical challenges into simple, user-friendly solution. This way, I help you achieve your goals and bring your visions to life.",
    },
    de: {
      headline: 'Über mich',
      shortDescription: "Hallo, ich bin ein deutschsprachiger Frontend-Entwickler aus der Nähe von Basel. Motiviert durch die grenzenlosen Möglichkeiten in der IT, begeistere ich mich für visuell die Entwicklung fesselnder und intuitiver Webseiten und Anwendungen.",
      location: "Ich bin offen und kann sowohl vor Ort. als auch aus der Ferne effektiv arbeiten. Ebenso bin ich offen für einen Umzug an einen anderen Standort. ",
      interest: "Ich habe eine Leidenschaft für Technik und bin immer auf der Suche nach neuen Herausforderungen, um meine Kenntnisse und Fähigkeiten zu verbessern.",
      puzzle: "Beim Programmieren geht es nicht nur um das Schreiben von Code; es ist eine kreative Form der Problemlösung. Ich bin stolz auf meine Fähigkeit, komplexe technische Herausforderungen in einfache, benutzerfreundliche Lösungen umzuwandeln. Auf diese Weise helfe ich Ihnen gerne, Ihre Ziele zu erreichen und Ihre Visionen zum Leben zu erwecken.",
    }
  };

  public currentLanguage: 'en' | 'de' = 'en'; 

  constructor(private languageService: LanguageService) {}
    /**
     * Gets the translation for the given field based on the current language.
     * @param field The field to get the translation for.
     * @returns The translated text.
     */
    getCurrentText(field: string): string {
      return this.translations[this.languageService.currentLanguage][field];
    };
 
}
