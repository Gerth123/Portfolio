import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs';

export const SUPPORTED_LANGUAGES = ['de', 'en'];

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public currentLanguage: string;
  public readonly languageChanges = new Subject<string>();
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Versuche, die Sprache aus dem localStorage zu laden (nur im Browser verfügbar)
    this.currentLanguage = (this.isBrowser && localStorage.getItem('currentLanguage')) || 'en';
  }

  // Methode zum Setzen der Sprache
  public setLanguage(language: string): void {
    if (this.currentLanguage === language) {
      return;
    }

    this.currentLanguage = language;

    if (this.isBrowser) {
      localStorage.setItem('currentLanguage', language); // Speichern der Sprache im localStorage
    }

    this.languageChanges.next(language);
  }

  /** Language for un-prefixed URLs: an earlier explicit choice, else the browser preference, else English. */
  public resolvePreferredLanguage(): string {
    if (!this.isBrowser) {
      return 'en';
    }

    const stored = localStorage.getItem('currentLanguage');

    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      return stored;
    }

    const browserTags = navigator.languages?.length ? navigator.languages : [navigator.language];
    const match = browserTags.map((tag) => tag?.slice(0, 2).toLowerCase()).find((tag) => SUPPORTED_LANGUAGES.includes(tag));

    return match ?? 'en';
  }

  /**
   * Builds a routerLink command array prefixed with the current language,
   * e.g. link() -> ['/', 'en'], link('legal-notice') -> ['/', 'en', 'legal-notice'].
   */
  public link(...segments: string[]): string[] {
    return ['/', this.currentLanguage, ...segments];
  }
}
