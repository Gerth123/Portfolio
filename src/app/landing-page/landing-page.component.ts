import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  public translations: any = {
    en: {
      rotateText: 'AI-augmented software development',
      subtitle: 'Full-Stack Developer for E-Commerce and Business Systems',
      heroClaim: 'I build maintainable web applications, Shopware 6 extensions and API-driven workflows with a pragmatic AI-first engineering approach.',
      buttonText: "Let's talk",
      secondaryButtonText: 'View case studies',
      metricRole: 'Current role',
      metricRoleText: 'Full-stack developer at ABC Design',
      metricSystems: 'Production systems',
      metricSystemsText: 'Shopware 6 webshops, plugins and Android updates',
      metricWorkflow: 'AI workflows',
      metricWorkflowText: 'Claude Code, Codex, RAG and automation patterns',
    },
    de: {
      rotateText: 'AI-augmented Softwareentwicklung',
      subtitle: 'Full-Stack-Entwickler für E-Commerce und Business-Systeme',
      heroClaim: 'Ich entwickle wartbare Webanwendungen, Shopware-6-Erweiterungen und API-basierte Workflows mit einem praxisnahen AI-first Engineering-Ansatz.',
      buttonText: 'Kontakt aufnehmen',
      secondaryButtonText: 'Case Studies ansehen',
      metricRole: 'Aktuelle Rolle',
      metricRoleText: 'Full-Stack-Entwickler bei ABC Design',
      metricSystems: 'Produktionssysteme',
      metricSystemsText: 'Shopware-6-Webshops, Plugins und Android-Updates',
      metricWorkflow: 'KI-Workflows',
      metricWorkflowText: 'Claude Code, Codex, RAG und Automatisierungsmuster',
    },
  };

  public currentLanguage: 'en' | 'de' = 'en';

  constructor(private languageService: LanguageService, private router: Router) {}

  getCurrentText(field: string): string {
    return this.translations[this.languageService.currentLanguage][field];
  }

  getCurrentLanguage() {
    return this.languageService.currentLanguage;
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
