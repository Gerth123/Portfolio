import { Component } from '@angular/core';
import { ShadowsComponent } from '../shadows/shadows.component';
import { PrivacyPolicyGermanComponent } from '../privacy-policy-german/privacy-policy-german.component';
import { LanguageService } from '../services/language.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [ShadowsComponent, PrivacyPolicyGermanComponent, NgIf, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  language: string = 'en';


  /**
   * Checks the current language and sets the `language` property accordingly.
   * Then, every 100ms, it checks if the language has changed and updates the
   * `language` property if it has.
   * @param languageService The service that holds the current language.
   */
  constructor(private languageService: LanguageService) {
    this.checkLanguage();
    setInterval(() => {
      this.language = this.languageService.currentLanguage;
    }, 100);
  }

  /**
   * Checks the current language in localStorage and sets the `language` property
   * of the component accordingly. If no language is stored, it defaults to 'en'.
   */
  checkLanguage() {
    const storedLanguage = localStorage.getItem('currentLanguage');
    if (storedLanguage) {
      this.language = this.languageService.currentLanguage;
    } else {
      this.language = 'en';
    }
  }
}
