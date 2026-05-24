import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
      headline: 'Engineering stack',
      shortDescription:
        'My profile combines full-stack web development, productive e-commerce work and AI-supported engineering workflows. I focus on maintainable implementation, clear APIs and reliable production changes.',
      secondHeadline: 'Useful in teams that value',
      secondHeadlineSpan: 'structured delivery',
      secondText:
        'I work best where code quality, pragmatic delivery and business context matter.',
      getInTouch: 'Get in touch',
      supportingTools: 'Supporting tools',
    },
    de: {
      headline: 'Engineering Stack',
      shortDescription:
        'Mein Profil verbindet Full-Stack-Webentwicklung, produktive E-Commerce-Arbeit und KI-gestützte Entwicklungsworkflows. Mein Fokus liegt auf wartbarer Umsetzung, klaren APIs und zuverlässigen Produktionsänderungen.',
      secondHeadline: 'Stark in Teams mit',
      secondHeadlineSpan: 'strukturierter Umsetzung',
      secondText:
        'Ich arbeite besonders stark dort, wo Codequalität, pragmatische Umsetzung und Business-Kontext zusammenkommen.',
      getInTouch: 'Kontakt aufnehmen',
      supportingTools: 'Ergänzende Tools',
    },
  };

  public skillCategories: SkillCategory[] = [
    {
      icon: '../../assets/icons/angular.svg',
      title: {
        en: 'Full-stack web development',
        de: 'Full-Stack Webentwicklung',
      },
      text: {
        en: 'Modern application development with structured frontend logic, clear APIs and maintainable backend services.',
        de: 'Moderne Anwendungsentwicklung mit strukturierter Frontend-Logik, klaren APIs und wartbaren Backend-Services.',
      },
      items: ['Angular', 'TypeScript', 'Python', 'Django / DRF', 'REST APIs'],
    },
    {
      icon: '../../assets/icons/shopware_6.svg',
      title: {
        en: 'Productive e-commerce systems',
        de: 'Produktive E-Commerce-Systeme',
      },
      text: {
        en: 'Work on real Shopware 6 environments, plugin adjustments and technical improvements close to business needs.',
        de: 'Arbeit an realen Shopware-6-Umgebungen, Plugin-Anpassungen und technischen Verbesserungen nah am Business.',
      },
      items: ['Shopware 6', 'PHP / Symfony', 'Plugin development', 'Technical SEO'],
    },
    {
      icon: '../../assets/icons/ai_assisted_coding.svg',
      title: {
        en: 'AI-augmented engineering',
        de: 'AI-Augmented Engineering',
      },
      text: {
        en: 'Daily use of coding agents, structured prompting and AI-supported workflows for faster technical execution.',
        de: 'Täglicher Einsatz von Coding Agents, strukturiertem Prompting und KI-gestützten Workflows für schnellere technische Umsetzung.',
      },
      items: ['Claude Code', 'Codex', 'Agentic Coding', 'RAG workflows', 'LLM APIs'],
    },
  ];

  public supportingTools = ['Git', 'Linux', 'Redis / RQ', 'Kotlin', 'Bootstrap 5', 'SCSS'];

  constructor(private languageService: LanguageService, private router: Router) {}

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
