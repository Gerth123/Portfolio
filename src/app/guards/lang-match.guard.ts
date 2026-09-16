import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { SUPPORTED_LANGUAGES } from '../services/language.service';

/**
 * Restricts the `:lang` parent route to actual supported language segments,
 * so unrelated first path segments don't get silently swallowed as a language.
 */
export const langMatchGuard: CanMatchFn = (_route: Route, segments: UrlSegment[]) => {
  return SUPPORTED_LANGUAGES.includes(segments[0]?.path);
};
