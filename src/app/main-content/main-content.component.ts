import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { ConsultingComponent } from '../consulting/consulting.component';
import { CredentialsComponent } from '../credentials/credentials.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.components';
import { LanguageService } from '../services/language.service';
import { SeoService } from '../services/seo.service';
import {
  buildHreflangAlternates,
  buildLocalizedUrl,
  buildPersonSchema,
  getPageDescription,
  getPageTitle,
  Locale,
} from '../services/structured-data';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [LandingPageComponent, AboutMeComponent, MySkillsComponent, ConsultingComponent, CredentialsComponent, ProjectsComponent, ContactComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit, OnDestroy {
  private languageSubscription?: Subscription;

  constructor(private languageService: LanguageService, private seoService: SeoService) {}

  ngOnInit(): void {
    this.applySeo();
    this.languageSubscription = this.languageService.languageChanges.subscribe(() => this.applySeo());
  }

  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
    this.seoService.removeJsonLd('person-schema');
  }

  private applySeo(): void {
    const locale = this.languageService.currentLanguage as Locale;

    this.seoService.updateTags({
      title: getPageTitle(locale),
      description: getPageDescription(locale),
      url: buildLocalizedUrl(locale),
      locale,
      type: 'profile',
    });

    this.seoService.setHreflangAlternates(buildHreflangAlternates());
    this.seoService.setJsonLd('person-schema', buildPersonSchema(locale));
  }
}
