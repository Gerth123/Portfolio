import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public currentLanguage: string;
  public readonly languageChanges = new Subject<string>();

  constructor() {
    // Versuche, die Sprache aus dem localStorage zu laden
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
  }

  // Methode zum Setzen der Sprache
  public setLanguage(language: string): void {
    if (this.currentLanguage === language) {
      return;
    }

    this.currentLanguage = language;
    localStorage.setItem('currentLanguage', language); // Speichern der Sprache im localStorage
    this.languageChanges.next(language);
  }
}
