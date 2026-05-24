import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public languageService: LanguageService) {}

  currentLanguage = this.languageService.currentLanguage;

  /**
   * Scroll to the top of the page.
   */
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  /**
   * Opens a link in a new tab.
   * @param url - The URL to open.
   */
  openLink(url: string) {
    window.open(url, '_blank');
  }
}
