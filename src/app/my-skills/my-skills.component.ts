import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

type Language = 'en' | 'de';

type SkillCategory = {
  icon: string;
  title: Record<Language, string>;
  text: Record<Language, string>;
  items: string[];
};

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss',
})
export class MySkillsComponent {
  public translations: Record<Language, Record<string, string>> = {
    en: {
      headline: 'Skills',
      shortDescription:
        'My technical profile combines backend development, Angular frontends, Shopware 6 systems and selected Android components. I prefer clear interfaces, maintainable code and changes that can be operated reliably.',
      secondHeadline: 'Working style for',
      secondHeadlineSpan: 'business software',
      secondText:
        'I work well in teams that value clear structure, pragmatic decisions and software that remains understandable over time.',
      getInTouch: 'Contact',
      supportingTools: 'Supporting tools',
    },
    de: {
      headline: 'Fähigkeiten',
      shortDescription:
        'Mein technisches Profil verbindet Backend-Entwicklung, Angular-Frontends, Shopware-6-Systeme und ausgewählte Android-Komponenten. Wichtig sind mir klare Schnittstellen, wartbarer Code und Änderungen, die zuverlässig betrieben werden können.',
      secondHeadline: 'Arbeitsweise für',
      secondHeadlineSpan: 'Unternehmenssoftware',
      secondText:
        'Ich arbeite gut in Teams, in denen klare Strukturen, pragmatische Entscheidungen und langfristig verständliche Software wichtig sind.',
      getInTouch: 'Kontakt',
      supportingTools: 'Weitere Werkzeuge',
    },
  };

  public skillCategories: SkillCategory[] = [
    {
      icon: '../../assets/icons/angular.svg',
      title: {
        en: 'Backend and frontend',
        de: 'Backend und Frontend',
      },
      text: {
        en: 'Application development with structured frontend logic, REST APIs and maintainable backend services.',
        de: 'Anwendungsentwicklung mit strukturierter Frontend-Logik, REST-Schnittstellen und wartbaren Backend-Services.',
      },
      items: ['Python', 'Django', 'Django REST Framework', 'Angular', 'TypeScript'],
    },
    {
      icon: '../../assets/icons/shopware_6.svg',
      title: {
        en: 'E-commerce and business systems',
        de: 'E-Commerce und Unternehmenssysteme',
      },
      text: {
        en: 'Work on productive Shopware 6 environments, PHP / Symfony-based extensions and technical improvements close to operational needs.',
        de: 'Arbeit an produktiven Shopware-6-Umgebungen, PHP-/Symfony-basierten Erweiterungen und technischen Verbesserungen nah am Betrieb.',
      },
      items: ['Shopware 6', 'PHP', 'Symfony', 'Plugin adjustments', 'Technical SEO'],
    },
    {
      icon: '../../assets/icons/ai_assisted_coding.svg',
      title: {
        en: 'Tools and delivery',
        de: 'Werkzeuge und Umsetzung',
      },
      text: {
        en: 'Use of Linux, Git and AI-assisted development tools for research, code analysis, refactoring and structured implementation.',
        de: 'Einsatz von Linux, Git und KI-gestützten Entwicklungswerkzeugen für Recherche, Codeanalyse, Refactoring und strukturierte Umsetzung.',
      },
      items: ['REST APIs', 'Linux', 'Git', 'Kotlin', 'Redis / RQ', 'AI-assisted development'],
    },
  ];

  public supportingTools = ['Bootstrap 5', 'SCSS', 'JavaScript', 'HTML', 'Firebase', 'Android'];

  constructor(private languageService: LanguageService) {}

  getCurrentText(field: string): string {
    return this.translations[this.getCurrentLanguage()][field];
  }

  getCategoryTitle(category: SkillCategory): string {
    return category.title[this.getCurrentLanguage()];
  }

  getCategoryText(category: SkillCategory): string {
    return category.text[this.getCurrentLanguage()];
  }

  getCurrentLanguage(): Language {
    return this.languageService.currentLanguage as Language;
  }

  handleScroll(fragment: string): void {
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }
}
