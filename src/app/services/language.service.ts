import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public currentLanguage: string = 'en';
  constructor() {
  }
}
