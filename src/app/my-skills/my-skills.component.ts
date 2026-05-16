import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink],
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
      alt: 'REST API',
      name: 'REST API',
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
      headline: 'My skills',
      shortDescription:
        'My current profile combines full-stack web development, e-commerce practice and AI-supported engineering workflows. I work with production requirements, APIs, maintainable code and a strong willingness to learn what the product needs next.',
      secondHeadline: 'Need a developer with',
      secondHeadlineSpan: 'growth mindset',
      secondText:
        'I am especially interested in teams that build modern web platforms, e-commerce solutions or AI-first products with clean processes and high technical standards.',
      getInTouch: 'Get in touch',
      continuallyLearning: 'Continually learning',
      materialDesign: 'Material Design',
    },
    de: {
      headline: 'Fähigkeiten',
      shortDescription:
        'Mein Profil verbindet Full-Stack-Webentwicklung, E-Commerce-Praxis und KI-gestützte Entwicklungsworkflows. Ich arbeite mit realen Anforderungen, APIs, wartbarem Code und der Bereitschaft, schnell das zu lernen, was ein Produkt als Nächstes braucht.',
      secondHeadline: 'Gesucht wird ein Entwickler mit',
      secondHeadlineSpan: 'Wachstumsdenken',
      secondText:
        'Besonders spannend finde ich Teams, die moderne Webplattformen, E-Commerce-Lösungen oder AI-first Produkte mit klaren Prozessen und hohem technischen Anspruch entwickeln.',
      getInTouch: 'Kontakt aufnehmen',
      continuallyLearning: 'Kontinuierliche Weiterbildung',
    },
  };

  public skillHighlights: {
    icon: string;
    alt: string;
    label: { en: string; de: string };
  }[] = [
    {
      icon: '../../assets/icons/ai_assisted_coding.svg',
      alt: 'AI-assisted coding',
      label: { en: 'AI-assisted coding', de: 'KI-gestütztes Coding' },
    },
    {
      icon: '../../assets/icons/claude_code.svg',
      alt: 'Claude Code',
      label: { en: 'Claude Code', de: 'Claude Code' },
    },
    {
      icon: '../../assets/icons/codex.svg',
      alt: 'Codex',
      label: { en: 'Codex', de: 'Codex' },
    },
    {
      icon: '../../assets/icons/agentic_coding.svg',
      alt: 'Agentic Coding',
      label: { en: 'Agentic coding', de: 'Agentic Coding' },
    },
    {
      icon: '../../assets/icons/ki_workflows.svg',
      alt: 'AI workflows',
      label: { en: 'AI workflows', de: 'KI-Workflows' },
    },
    {
      icon: '../../assets/icons/prompt_engineering.svg',
      alt: 'Prompt engineering',
      label: { en: 'Prompt engineering', de: 'Prompt Engineering' },
    },
    {
      icon: '../../assets/icons/automations.svg',
      alt: 'Automations',
      label: { en: 'Automations', de: 'Automatisierungen' },
    },
    {
      icon: '../../assets/icons/shopware_6.svg',
      alt: 'Shopware 6',
      label: { en: 'Shopware 6', de: 'Shopware 6' },
    },
    {
      icon: '../../assets/icons/kotlin.svg',
      alt: 'Kotlin',
      label: { en: 'Kotlin', de: 'Kotlin' },
    },
    {
      icon: '../../assets/icons/redis.svg',
      alt: 'Redis',
      label: { en: 'Redis', de: 'Redis' },
    },
    {
      icon: '../../assets/icons/linux.svg',
      alt: 'Linux',
      label: { en: 'Linux', de: 'Linux' },
    },
  ];

  public currentLanguage: 'en' | 'de' = 'en';

  constructor(private languageService: LanguageService, private router: Router) {}

  /**
   * Retrieves the translation for the given field based on the current language.
   *
   * @param {string} field - The key of the translation to retrieve.
   * @returns {string} The translation for the given field.
   */
  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  }

  getCurrentSkillHighlights() {
    return this.skillHighlights;
  }

  getCurrentSkillLabel(skill: {
    label: { en: string; de: string };
  }): string {
    const language = this.languageService.currentLanguage as 'en' | 'de';
    return skill.label[language];
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
    const scrollHeightPixels = this.getElementHeightById(fragment);
    const currentUrl = this.router.url;

    if (currentUrl.includes(`#${fragment}`) && scrollHeightPixels !== null) {
      window.scrollTo({ top: scrollHeightPixels, behavior: 'smooth' });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getElementHeightById(elementId: string): number | null {
    const element = document.getElementById(elementId);

    if (element) {
      const elementRect = element.getBoundingClientRect();
      return elementRect.top + window.pageYOffset;
    }

    return null;
  }
}
