import { Component } from '@angular/core';
import { ShadowsComponent } from '../shadows/shadows.component';
import { LegalNoticeGermanComponent } from '../legal-notice-german/legal-notice-german.component';
import { LanguageService } from '../services/language.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [ShadowsComponent, LegalNoticeGermanComponent, CommonModule, RouterLink],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent {
  language: string = 'en';

  /**
   * The constructor for the component.
   * It first checks the language from the languageService and stores it in the
   * language variable. Then it sets an interval that checks every 100ms if the
   * language in the languageService has changed and updates the language variable
   * if it has.
   */
  constructor(private languageService: LanguageService) {
    this.checkLanguage();
    setInterval(() => {
      this.language = this.languageService.currentLanguage;
    }, 100);
  }

  /**
   * Checks the current language in localStorage and sets the `language` property
   * of the component accordingly. If no language is stored, it defaults to 'en'.
   */
  checkLanguage() {
    const storedLanguage = localStorage.getItem('currentLanguage');
    if (storedLanguage) {
        this.language = this.languageService.currentLanguage;
    } else {
        this.language = 'en';
    }
  }
}
