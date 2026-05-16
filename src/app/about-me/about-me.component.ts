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
      shortDescription: "I'm Robin, a full-stack developer near Basel with hands-on experience in productive e-commerce systems. At ABC Design I work on Shopware 6 webshops and plugins, REST-based features and selected Android app updates in Kotlin.",
      location: 'Open for roles in Switzerland, especially Basel, Zurich and Aargau, as a cross-border commuter, hybrid teammate or remote developer.',
      interest: 'I combine classic software development with AI-assisted coding, automation and structured learning. My focus is practical: understand the business need, ship maintainable solutions and keep improving the workflow.',
      puzzle: 'I enjoy translating complex requirements into clear technical steps. Whether it is a Shopware plugin, an API integration or a frontend feature, I work analytically, communicate openly and learn quickly when a new stack is needed.',
    },
    de: {
      headline: 'Über mich',
      shortDescription: 'Ich bin Robin, Full-Stack-Entwickler aus der Nähe von Basel mit Praxiserfahrung in produktiven E-Commerce-Systemen. Bei ABC Design arbeite ich an Shopware-6-Webshops, Plugin-Entwicklung, REST-basierten Features und ausgewählten Android-App-Updates in Kotlin.',
      location: 'Offen für Positionen in der Schweiz, besonders Basel, Zürich und Aargau, als Grenzgänger, hybrid oder remote.',
      interest: 'Ich verbinde klassische Softwareentwicklung mit KI-gestütztem Coding, Automatisierung und kontinuierlicher Weiterbildung. Mein Fokus ist praxisnah: Anforderungen verstehen, wartbare Lösungen liefern und Entwicklungsprozesse gezielt verbessern.',
      puzzle: 'Ich übersetze komplexe Anforderungen gerne in klare technische Schritte. Ob Shopware-Plugin, API-Integration oder Frontend-Feature: Ich arbeite analytisch, kommuniziere transparent und lerne schnell, wenn ein neuer Stack gefragt ist.',
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
