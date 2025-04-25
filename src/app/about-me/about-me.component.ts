import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  public translations: any = {
    en: {
      headline: 'About me',
      shortDescription:
        "Hi, I'm a German-speaking Fullstack Developer based near Basel. Fascinated by the endless possibilities of the IT world, I enjoy designing and developing visually appealing and intuitive web applications from frontend to backend.",
      location:
        'I am flexible when it comes to work environments – I can work both on-site in Bad Säckingen and remotely. I am also open to relocating if required.',
      interest:
        "Technology is more than a profession for me – it's a passion. I'm always looking for opportunities to grow, learn new tools, and take on exciting challenges.",
      puzzle:
        "For me, programming is not just about code – it's about solving problems creatively. I take pride in turning complex technical requirements into elegant, user-friendly solutions. This way, I help you achieve your goals and bring your ideas to life.",
    },
    de: {
      headline: 'Über mich',
      shortDescription:
        'Hallo, ich bin ein deutschsprachiger Fullstack-Entwickler aus der Nähe von Basel. Begeistert von den unendlichen Möglichkeiten der IT-Welt, entwickle ich gerne moderne und intuitive Webanwendungen – vom Frontend bis zum Backend.',
      location:
        'Ich bin flexibel in Bezug auf den Arbeitsort – sowohl vor Ort in Bad Säckingen als auch remote einsetzbar. Ein Umzug an einen anderen Standort ist für mich ebenfalls denkbar.',
      interest:
        'Technologie ist für mich mehr als nur ein Beruf – sie ist meine Leidenschaft. Ich suche ständig nach Möglichkeiten, mich weiterzuentwickeln, neue Werkzeuge zu erlernen und spannende Herausforderungen anzunehmen.',
      puzzle:
        'Programmieren bedeutet für mich nicht nur Code zu schreiben – es ist kreative Problemlösung. Ich bin stolz darauf, komplexe Anforderungen in benutzerfreundliche und effektive Lösungen umzusetzen. So helfe ich Ihnen, Ihre Ziele zu erreichen und Ihre Ideen Wirklichkeit werden zu lassen.',
    },
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
  }
}
