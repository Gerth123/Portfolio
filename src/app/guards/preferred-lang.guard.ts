import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

// Un-prefixed paths that have a language-prefixed equivalent; anything else goes to the homepage.
const PREFIXABLE_PATHS = ['', 'privacy-policy', 'legal-notice'];

/**
 * Redirects un-prefixed URLs to the visitor's language: an earlier explicit
 * choice, otherwise the browser preference, otherwise English.
 */
export const preferredLangGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const language = inject(LanguageService).resolvePreferredLanguage();
  const urlTree = router.parseUrl(state.url);
  const path = (urlTree.root.children['primary']?.segments ?? []).map((segment) => segment.path).join('/');
  const segments = PREFIXABLE_PATHS.includes(path) && path ? [path] : [];

  return router.createUrlTree(['/', language, ...segments], {
    queryParams: urlTree.queryParams,
    fragment: urlTree.fragment ?? undefined,
  });
};
