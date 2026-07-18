import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LanguageService } from '../services/language.service';

/**
 * Syncs LanguageService (and everything reading from it) to the `:lang` route
 * param before the route's components render, so the URL is the source of
 * truth for the active language rather than only localStorage.
 */
export const langResolver: ResolveFn<string> = (route) => {
  const languageService = inject(LanguageService);
  const lang = route.paramMap.get('lang') ?? 'en';
  languageService.setLanguage(lang);
  return lang;
};
