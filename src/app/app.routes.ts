import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { langMatchGuard } from './guards/lang-match.guard';
import { preferredLangGuard } from './guards/preferred-lang.guard';
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
  // Un-prefixed URLs (incl. legacy ones from before language-prefixed routing) pick up the visitor's language.
  { path: '', pathMatch: 'full', canActivate: [preferredLangGuard], component: MainContentComponent },
  { path: 'privacy-policy', pathMatch: 'full', canActivate: [preferredLangGuard], component: PrivacyPolicyComponent },
  { path: 'legal-notice', pathMatch: 'full', canActivate: [preferredLangGuard], component: LegalNoticeComponent },
  { path: '**', canActivate: [preferredLangGuard], component: MainContentComponent },
];
