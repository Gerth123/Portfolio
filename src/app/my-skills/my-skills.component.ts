import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss',
})
export class MySkillsComponent {
  skills: { src: string; alt: string; name: string }[] = [
    { src: '../../assets/icons/html.svg', alt: 'HTML', name: 'HTML' },
    { src: '../../assets/icons/css.svg', alt: 'CSS', name: 'CSS' },
    {
      src: '../../assets/icons/javascript.svg',
      alt: 'JavaScript',
      name: 'JavaScript',
    },
    {
      src: '../../assets/icons/typescript.svg',
      alt: 'TypeScript',
      name: 'TypeScript',
    },
    { src: '../../assets/icons/angular.svg', alt: 'Angular', name: 'Angular' },
    {
      src: '../../assets/icons/firebase.svg',
      alt: 'Firebase',
      name: 'Firebase',
    },
    { src: '../../assets/icons/git.svg', alt: 'Git', name: 'Git' },
    {
      src: '../../assets/icons/rest_api.svg',
      alt: 'Rest Api',
      name: 'Rest Api',
    },
    { src: '../../assets/icons/scrum.svg', alt: 'Scrum', name: 'Scrum' },
    {
      src: '../../assets/icons/material_design.svg',
      alt: 'Material Design',
      name: 'Material Design',
    },
  ];

  public translations: any = {
    en: {
      headline: 'My Skills',
      shortDescription:
        'I have hands-on experience developing applications using a variety of frontend and backend technologies. My focus is on creating scalable, maintainable, and user-friendly solutions.',
      secondHeadline: 'Looking for',
      secondHeadlineSpan: 'another skill',
      secondText:
        'Feel free to reach out. I am always eager to expand my knowledge and take on new challenges in different tech stacks.',
      getInTouch: 'Get in touch',
      continuallyLearning: 'Continually learning',
      materialDesign: 'Material Design',
    },
    de: {
      headline: 'Fähigkeiten',
      shortDescription:
        'Ich habe praktische Erfahrung in der Entwicklung von Anwendungen mit verschiedenen Frontend- und Backend-Technologien. Mein Fokus liegt auf skalierbaren, wartbaren und benutzerfreundlichen Lösungen.',
      secondHeadline: 'Suchen Sie nach',
      secondHeadlineSpan: 'einer anderen Fähigkeit',
      secondText:
        'Kontaktieren Sie mich gerne. Ich bin stets offen dafür, mein Wissen zu erweitern und neue Herausforderungen mit unterschiedlichen Technologien anzunehmen.',
      getInTouch: 'Kontakt aufnehmen',
      continuallyLearning: 'Kontinuierliche Weiterbildung',
      materialDesign: 'Material Design',
    },
  };

  public currentLanguage: 'en' | 'de' = 'en';

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}
  /**
   * Retrieves the translation for the given field based on the current language.
   *
   * @param {string} field - The key of the translation to retrieve.
   * @returns {string} The translation for the given field.
   */
  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  }

  isHovered: boolean = false;

  /**
   * Sets the isHovered flag to true, in order to show the text
   * "I'm continually learning" and change the image of the
   * "continually learning" skill to a different one.
   */
  showSpecialInterest() {
    this.isHovered = true;
  }

  /**
   * Sets the isHovered flag to false, in order to hide the text
   * "I'm continually learning" and change the image of the
   * "continually learning" skill to the default one.
   */
  hideSpecialInterest() {
    this.isHovered = false;
  }

  async handleScroll(fragment: string) {
    const element = document.getElementById(fragment);
    const scrollHeightPixels = this.getElementHeightById(fragment); // Das wird in Pixeln zurückgegeben
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
