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
        'My technical profile combines backend development, Vue and Angular frontends, Shopware 6 systems and selected Android components. I prefer dependable interfaces and changes that can be operated reliably.',
      secondHeadline: 'My',
      secondHeadlineSpan: 'working style',
      secondText:
        'I work well in teams that value pragmatic decisions and software that remains understandable over time.',
      getInTouch: 'Contact',
      supportingTools: 'Supporting tools',
    },
    de: {
      headline: 'Fähigkeiten',
      shortDescription:
        'Mein technisches Profil verbindet Backend-Entwicklung, Vue- und Angular-Frontends, Shopware-6-Systeme und ausgewählte Android-Komponenten. Wichtig sind mir belastbare Schnittstellen und Änderungen, die zuverlässig betrieben werden können.',
      secondHeadline: 'Meine',
      secondHeadlineSpan: 'Arbeitsweise',
      secondText:
        'Ich arbeite gut in Teams, in denen pragmatische Entscheidungen und langfristig verständliche Software wichtig sind.',
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
        en: 'Application development with frontend logic, REST APIs and backend services.',
        de: 'Anwendungsentwicklung mit Frontend-Logik, REST-Schnittstellen und Backend-Services.',
      },
      items: ['Python', 'Django', 'Django REST Framework', 'Vue', 'Angular', 'TypeScript'],
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
        en: 'Use of Linux, Git and AI-assisted development tools for research, code analysis and refactoring.',
        de: 'Einsatz von Linux, Git und KI-gestützten Entwicklungswerkzeugen für Recherche, Codeanalyse und Refactoring.',
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
