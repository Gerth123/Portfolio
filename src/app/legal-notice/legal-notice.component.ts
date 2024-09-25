import { Component } from '@angular/core';
import { ShadowsComponent } from '../shadows/shadows.component';
import { LegalNoticeGermanComponent } from '../legal-notice-german/legal-notice-german.component';
import { LanguageService } from '../services/language.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [ShadowsComponent, LegalNoticeGermanComponent, CommonModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent {
  language: string = 'en';

  constructor(private languageService: LanguageService) {
    setInterval(() => {
      this.language = this.languageService.currentLanguage;
    }, 1000);
  }
}
