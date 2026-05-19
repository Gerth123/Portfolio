import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss',
})
export class MySkillsComponent {
  skills: { src: string; alt: string; name: string }[] = [
    { src: '../../assets/icons/typescript.svg', alt: 'TypeScript', name: 'TypeScript' },
    { src: '../../assets/icons/angular.svg', alt: 'Angular', name: 'Angular' },
    { src: '../../assets/icons/shopware_6.svg', alt: 'Shopware 6', name: 'Shopware 6' },
    { src: '../../assets/icons/rest_api.svg', alt: 'REST API', name: 'REST APIs' },
    { src: '../../assets/icons/git.svg', alt: 'Git', name: 'Git' },
    { src: '../../assets/icons/linux.svg', alt: 'Linux', name: 'Linux' },
    { src: '../../assets/icons/kotlin.svg', alt: 'Kotlin', name: 'Kotlin' },
    { src: '../../assets/icons/redis.svg', alt: 'Redis', name: 'Redis / RQ' },
    { src: '../../assets/icons/javascript.svg', alt: 'JavaScript', name: 'JavaScript' },
  ];

  public translations: any = {
    en: {
      headline: 'Engineering stack',
      shortDescription: 'My profile combines full-stack web development, productive e-commerce work and AI-supported engineering workflows. I focus on maintainable implementation, clear APIs, reliable production changes and fast technical learning when a product needs it.',
      secondHeadline: 'Useful in teams that value',
      secondHeadlineSpan: 'structured delivery',
      secondText: 'I am especially interested in modern web platforms, e-commerce systems and AI-first products where clean processes, code quality and business context matter.',
      getInTouch: 'Get in touch',
      continuallyLearning: 'Continually learning',
    },
    de: {
      headline: 'Engineering Stack',
      shortDescription: 'Mein Profil verbindet Full-Stack-Webentwicklung, produktive E-Commerce-Arbeit und KI-gestützte Entwicklungsworkflows. Mein Fokus liegt auf wartbarer Umsetzung, klaren APIs, zuverlässigen Produktionsänderungen und schnellem technischen Lernen, wenn ein Produkt es braucht.',
      secondHeadline: 'Stark in Teams mit',
      secondHeadlineSpan: 'strukturierter Umsetzung',
      secondText: 'Besonders spannend sind für mich moderne Webplattformen, E-Commerce-Systeme und AI-first Produkte, bei denen klare Prozesse, Codequalität und Business-Kontext zählen.',
      getInTouch: 'Kontakt aufnehmen',
      continuallyLearning: 'Kontinuierliche Weiterbildung',
    },
  };

  public skillCategories = [
    {
      title: { en: 'Productive e-commerce', de: 'Produktiver E-Commerce' },
      items: ['Shopware 6', 'PHP / Symfony', 'Plugin development', 'Technical SEO'],
    },
    {
      title: { en: 'Full-stack delivery', de: 'Full-Stack Delivery' },
      items: ['Python', 'Django / DRF', 'Angular', 'TypeScript', 'REST APIs'],
    },
    {
      title: { en: 'AI-assisted workflows', de: 'KI-gestützte Workflows' },
      items: ['Claude Code', 'Codex', 'Agentic Coding', 'RAG pipelines', 'LLM APIs'],
    },
  ];

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
  ];

  public currentLanguage: 'en' | 'de' = 'en';
  isHovered: boolean = false;

  constructor(private languageService: LanguageService, private router: Router) {}

  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  }

  getCategoryTitle(category: { title: { en: string; de: string } }): string {
    return category.title[this.languageService.currentLanguage as 'en' | 'de'];
  }

  getCurrentSkillHighlights() {
    return this.skillHighlights;
  }

  getCurrentSkillLabel(skill: { label: { en: string; de: string } }): string {
    const language = this.languageService.currentLanguage as 'en' | 'de';
    return skill.label[language];
  }

  showSpecialInterest() {
    this.isHovered = true;
  }

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
