import { CanMatchFn, Route, UrlSegment } from '@angular/router';

const SUPPORTED_LANGUAGES = ['de', 'en'];

/**
 * Restricts the `:lang` parent route to actual supported language segments,
 * so unrelated first path segments don't get silently swallowed as a language.
 */
export const langMatchGuard: CanMatchFn = (_route: Route, segments: UrlSegment[]) => {
  return SUPPORTED_LANGUAGES.includes(segments[0]?.path);
};
