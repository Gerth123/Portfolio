import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';
import { LanguageService } from '../services/language.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, NgClass],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  public translations: any = {
    en: {
      rotateText: 'I am',
      subtitle: 'Frontend Developer',
      buttonText: "Let's talk!",
    },
    de: {
      rotateText: 'Ich bin',
      subtitle: 'Frontend-Entwickler',
      buttonText: 'Reden wir!',
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
 
  /**
   * Returns the current language from the language service.
   *
   * @returns {string} The current language ('en' or 'de').
   */
    getCurrentLanguage() {
      return this.languageService.currentLanguage;
    }
}
