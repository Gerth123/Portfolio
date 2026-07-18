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

  constructor(private languageService: LanguageService) {
    this.checkLanguage();
    this.languageService.languageChanges.subscribe((language) => {
      this.language = language;
    });
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
