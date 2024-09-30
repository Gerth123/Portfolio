import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public currentLanguage: string;

  constructor() {
    // Versuche, die Sprache aus dem localStorage zu laden
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
  }

  // Methode zum Setzen der Sprache
  public setLanguage(language: string): void {
    this.currentLanguage = language;
    localStorage.setItem('currentLanguage', language); // Speichern der Sprache im localStorage
  }
}
