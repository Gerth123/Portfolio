import { Component } from '@angular/core';
import { ShadowsComponent } from '../shadows/shadows.component';
import { LegalNoticeGermanComponent } from '../legal-notice-german/legal-notice-german.component';
import { LanguageService } from '../services/language.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { Locale } from '../services/structured-data';

const PAGE_URL = 'https://robin-gerth.de/#/legal-notice';

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Legal Notice – Robin Gerth',
    description: 'Legal notice and contact details for Robin Gerth, provider of robin-gerth.de.',
  },
  de: {
    title: 'Impressum – Robin Gerth',
    description: 'Impressum und Kontaktangaben von Robin Gerth, Betreiber von robin-gerth.de.',
  },
};

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [ShadowsComponent, LegalNoticeGermanComponent, CommonModule, RouterLink],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent {
  language: string = 'en';

  constructor(private languageService: LanguageService, private seoService: SeoService) {
    this.checkLanguage();
    this.applySeo();
    this.languageService.languageChanges.subscribe((language) => {
      this.language = language;
      this.applySeo();
    });
  }

  private applySeo(): void {
    const locale = this.languageService.currentLanguage as Locale;

    this.seoService.updateTags({
      title: META[locale].title,
      description: META[locale].description,
      url: PAGE_URL,
      locale,
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
