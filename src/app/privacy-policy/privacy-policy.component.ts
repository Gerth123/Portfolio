import { Component } from '@angular/core';
import { ShadowsComponent } from '../shadows/shadows.component';
import { PrivacyPolicyGermanComponent } from '../privacy-policy-german/privacy-policy-german.component';
import { LanguageService } from '../services/language.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [ShadowsComponent, PrivacyPolicyGermanComponent, NgIf],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  language: string = 'en';
  constructor(private languageService: LanguageService) {
    setInterval(() => {
      this.language = this.languageService.currentLanguage;
    }, 1000);
  }
}
