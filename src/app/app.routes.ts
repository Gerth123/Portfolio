import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { langMatchGuard } from './guards/lang-match.guard';
import { langResolver } from './resolvers/lang.resolver';

export const routes: Routes = [
  {
    path: ':lang',
    canMatch: [langMatchGuard],
    resolve: { lang: langResolver },
    children: [
      { path: '', component: MainContentComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
    ],
  },
  // Legacy un-prefixed URLs (from before language-prefixed routing) redirect to the English version.
  { path: 'privacy-policy', redirectTo: 'en/privacy-policy', pathMatch: 'full' },
  { path: 'legal-notice', redirectTo: 'en/legal-notice', pathMatch: 'full' },
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  { path: '**', redirectTo: 'en' },
];
