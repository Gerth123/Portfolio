import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public responsiveMenuOpen: boolean = false;
  languageService;

  constructor(public languageServiceComponent: LanguageService, private router: Router) {
    this.languageService = languageServiceComponent;
  }
  public translations: any = {
    en: {
      aboutMe: 'About me',
      skills: 'Skills',
      consulting: 'Consulting',
      credentials: 'Credentials',
      caseStudies: 'Case studies',
      contact: 'Contact',
    },
    de: {
      aboutMe: 'Über mich',
      skills: 'Fähigkeiten',
      consulting: 'Beratung',
      credentials: 'Qualifikationen',
      caseStudies: 'Projekte',
      contact: 'Kontakt',
    },
  };

  public currentLanguage: 'en' | 'de' = 'en';
  /**
   * Retrieves the translation for the given field based on the current language.
   *
   * @param {string} field - The key of the translation to retrieve.
   * @returns {string} The translation for the given field.
   */
  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  }

  /**
   * Toggles the responsive menu on or off
   * @param none
   * @returns none
   */
  toggleMenu() {
    let responsiveMenu: any = document.getElementById('responsiveMenu');
    if (responsiveMenu.classList.contains('d-none')) {
      this.fixClasses(responsiveMenu);
      this.changeCloseButton();
      setTimeout(() => {
        responsiveMenu.style.zIndex = 99;
      }, 490);
      this.responsiveMenuOpen = true;
      this.setBodyScrollLock(true);
    } else {
      this.closeMenu();
    }
  }

  /**
   * Locks or unlocks page scrolling on <body> and <html> while the responsive menu is open.
   */
  setBodyScrollLock(locked: boolean) {
    document.body.style.overflow = locked ? 'hidden' : '';
    document.documentElement.style.overflow = locked ? 'hidden' : '';
  }

  /**
   * Fixes the classes of the responsive menu so that it appears on the screen. It removes the 'd-none' class, adds the 'slideInResponsive' class, and removes the 'slideOutResponsive' class.
   * @param {any} responsiveMenu - The responsive menu HTML element
   * @returns none
   */
  fixClasses(responsiveMenu: any) {
    responsiveMenu.classList.remove('d-none');
    responsiveMenu.classList.add('slideInResponsive');
    responsiveMenu.classList.remove('slideOutResponsive');
  }

  /**
   * Closes the responsive menu, and sets some styles to make it work well
   * @param none
   * @returns none
   */
  closeMenu() {
    let responsiveLogo: any = document.getElementById('logoResponsive');
    let responsiveMenu: any = document.getElementById('responsiveMenu');
    if (responsiveMenu) {
      responsiveMenu.classList.add('slideOutResponsive');
      responsiveLogo?.classList.remove('d-none');
      responsiveMenu.style.zIndex = 101;
      this.changeCloseButton();
      this.timeoutCloseMenu(responsiveMenu);
      this.responsiveMenuOpen = false;
      this.setBodyScrollLock(false);
    }
  }

  /**
   * After 490 milliseconds, this function adds 'd-none' class and removes 'slideInResponsive' class from the responsive menu.
   * This is needed because the animation of the responsive menu is not finished yet.
   * @param {any} responsiveMenu - The responsive menu HTML element
   * @returns none
   */
  timeoutCloseMenu(responsiveMenu: any) {
    setTimeout(() => {
      responsiveMenu.classList.add('d-none');
      responsiveMenu.classList.remove('slideInResponsive');
    }, 490);
  }

  /**
   * Checks if the close icon is a responsive menu or a close icon,
   * and calls the corresponding function to change the close icon
   * @param none
   * @returns none
   */
  changeCloseButton() {
    let closeIcon: any = document.getElementById('closeIcon');
    if (
      closeIcon &&
      closeIcon.src.includes('responsive_menu_close_final.svg')
    ) {
      this.changeToResponsiveMenu(closeIcon);
    }

    if (closeIcon && closeIcon.src.includes('closed_menu.svg')) {
      this.changeToCloseIcon(closeIcon);
    }
  }

  /**
   * Changes the close icon to a responsive menu icon.
   * The close icon is first set to the medium responsive menu icon.
   * Then, after 100 milliseconds, it is set to the transition responsive menu icon.
   * Finally, after 200 milliseconds, it is set to the closed menu icon.
   * @param {any} closeIcon - The close icon HTML element
   * @returns none
   */
  changeToResponsiveMenu(closeIcon: any) {
    closeIcon.src = '../../../assets/icons/responsive_menu_medium.svg';
    setTimeout(() => {
      closeIcon.src = '../../../assets/icons/responsive_menu_transition.svg';
    }, 100);
    setTimeout(() => {
      closeIcon.src = '../../../assets/icons/closed_menu.svg';
    }, 200);
  }

  /**
   * Changes the close icon to a responsive menu icon.
   * The close icon is first set to the transition responsive menu icon.
   * Then, after 100 milliseconds, it is set to the medium responsive menu icon.
   * Finally, after 200 milliseconds, it is set to the responsive menu close icon.
   * @param {any} closeIcon - The close icon HTML element
   * @returns none
   */
  changeToCloseIcon(closeIcon: any) {
    closeIcon.src = '../../../assets/icons/responsive_menu_transition.svg';
    setTimeout(() => {
      closeIcon.src = '../../../assets/icons/responsive_menu_medium.svg';
    }, 100);
    setTimeout(() => {
      closeIcon.src = '../../../assets/icons/responsive_menu_close_final.svg';
    }, 200);
  }

  checkLanguage() {
    return this.languageService.currentLanguage;
  }

  /**
   * Navigates to the same route/fragment under the other language prefix
   * (the URL is the source of truth for the active language; the lang
   * route resolver picks it up and syncs LanguageService from there).
   */
  changeLanguage(language: 'de' | 'en') {
    if (this.languageService.currentLanguage === language) {
      return;
    }

    const urlTree = this.router.parseUrl(this.router.url);
    const segments = urlTree.root.children['primary']?.segments ?? [];
    const pathAfterLang = segments.slice(1).map((segment) => segment.path);
    const fragment = urlTree.fragment ?? undefined;

    this.router.navigate(['/', language, ...pathAfterLang], { fragment });
  }

  async handleScroll(fragment: string) {
    const element = document.getElementById(fragment);
    const scrollHeightPixels = this.getElementHeightById(fragment);  // Das wird in Pixeln zurückgegeben
    const currentUrl = this.router.url;
  
    // Prüfen, ob das Fragment bereits in der URL vorhanden ist
    if (currentUrl.includes(`#${fragment}`) && scrollHeightPixels !== null) {
      // Scrollen zu der berechneten Höhe
      window.scrollTo({ top: scrollHeightPixels, behavior: 'smooth' });
    } else if (element) {
      // Wenn das Fragment nicht in der URL ist, scrolle zu dem Element
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Höhe eines Elements ermitteln
  getElementHeightById(elementId: string): number | null {
    const element = document.getElementById(elementId);
    
    if (element) {
      const elementRect = element.getBoundingClientRect();
      return elementRect.top + window.pageYOffset; // Höhe des Elements relativ zum Dokument
    }
    
    return null; // Wenn das Element nicht gefunden wird
  }
  
}
