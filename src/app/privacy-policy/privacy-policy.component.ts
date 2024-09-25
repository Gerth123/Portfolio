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

  /**
   * @description
   * The constructor for the privacy policy component.
   * It observes the current language of the language service and updates the
   * language variable of the component every second.
   * @param languageService The language service.
   */
  constructor(private languageService: LanguageService) {
    setInterval(() => {
      this.language = this.languageService.currentLanguage;
    }, 1000);
  }
}
