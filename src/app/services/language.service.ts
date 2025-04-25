import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public currentLanguage: string;

  constructor() {
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
  }

  public setLanguage(language: string): void {
    this.currentLanguage = language;
    localStorage.setItem('currentLanguage', language); 
  }
}
