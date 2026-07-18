import { Component } from '@angular/core';
import { ShadowsComponent } from '../shadows/shadows.component';
import { PrivacyPolicyGermanComponent } from '../privacy-policy-german/privacy-policy-german.component';
import { LanguageService } from '../services/language.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { Locale } from '../services/structured-data';

const PAGE_URL = 'https://robin-gerth.de/#/privacy-policy';

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Privacy Policy – Robin Gerth',
    description: 'Privacy policy for robin-gerth.de, covering data collection, cookies and contact form processing.',
  },
  de: {
    title: 'Datenschutzerklärung – Robin Gerth',
    description: 'Datenschutzerklärung für robin-gerth.de zu Datenerhebung, Cookies und der Verarbeitung von Kontaktformular-Anfragen.',
  },
};

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [ShadowsComponent, PrivacyPolicyGermanComponent, NgIf, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
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
