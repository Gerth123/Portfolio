import { Component } from '@angular/core';
import { ShadowsComponent } from '../shadows/shadows.component';
import { LegalNoticeGermanComponent } from '../legal-notice-german/legal-notice-german.component';
import { LanguageService } from '../services/language.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { buildHreflangAlternates, buildLocalizedUrl, Locale } from '../services/structured-data';

const PAGE_PATH = 'legal-notice';

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
      url: buildLocalizedUrl(locale, PAGE_PATH),
      locale,
    });

    this.seoService.setHreflangAlternates(buildHreflangAlternates(PAGE_PATH));
  }

  /**
   * Syncs the `language` property with the LanguageService's current value
   * (which already resolves the browser's stored preference, falling back to 'en').
   */
  checkLanguage() {
    this.language = this.languageService.currentLanguage;
  }
}
