import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroTextGroup') heroTextGroup?: ElementRef<HTMLElement>;
  @ViewChild('heroSideLabel') heroSideLabel?: ElementRef<HTMLElement>;
  @ViewChild('heroTitleStack') heroTitleStack?: ElementRef<HTMLElement>;
  @ViewChild('heroName') heroName?: ElementRef<HTMLElement>;
  @ViewChild('heroRole') heroRole?: ElementRef<HTMLElement>;

  public translations: any = {
    en: {
      rotateText: 'I am',
      subtitle: 'Fullstack Developer',
      buttonText: "Let's talk!",
    },
    de: {
      rotateText: 'Ich bin',
      subtitle: 'Fullstack-Entwickler',
      buttonText: 'Reden wir!',
    },
  };

  public currentLanguage: 'en' | 'de' = 'en';

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private languageChangeSubscription?: Subscription;
  private rafId = 0;

  constructor(private languageService: LanguageService, private router: Router, private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => this.scheduleHeroFit());

      [
        this.heroTextGroup?.nativeElement,
        this.heroTitleStack?.nativeElement,
        this.heroName?.nativeElement,
      ]
        .filter(Boolean)
        .forEach((element) => this.resizeObserver?.observe(element as HTMLElement));

      this.mutationObserver = new MutationObserver(() => this.scheduleHeroFit());

      [this.heroSideLabel?.nativeElement, this.heroRole?.nativeElement]
        .filter(Boolean)
        .forEach((element) => {
          this.mutationObserver?.observe(element as HTMLElement, {
            childList: true,
            characterData: true,
            subtree: true,
          });
        });

      window.addEventListener('resize', this.scheduleHeroFit, { passive: true });

      if ('fonts' in document) {
        document.fonts.ready.then(() => this.scheduleHeroFit());
      }

      this.scheduleHeroFit();
    });

    this.languageChangeSubscription = this.languageService.languageChanges.subscribe(() => {
      this.zone.runOutsideAngular(() => this.scheduleHeroFit());
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.scheduleHeroFit);
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    this.languageChangeSubscription?.unsubscribe();

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

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

  private readonly scheduleHeroFit = (): void => {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      this.fitMobileHeroText();
    });
  };

  private fitMobileHeroText(): void {
    const sideLabel = this.heroSideLabel?.nativeElement;
    const titleStack = this.heroTitleStack?.nativeElement;
    const name = this.heroName?.nativeElement;
    const role = this.heroRole?.nativeElement;

    if (!sideLabel || !titleStack || !name || !role) {
      return;
    }

    const isMobile = window.matchMedia('(max-width: 575.98px)').matches;

    if (!isMobile) {
      sideLabel.style.fontSize = '';
      role.style.fontSize = '';
      return;
    }

    this.fitFontSizeToWidth({
      element: role,
      targetElement: name,
      minPx: 18,
      maxPx: 44,
    });

    this.fitFontSizeToHeight({
      element: sideLabel,
      targetElement: titleStack,
      minPx: 12,
      maxPx: 42,
    });
  }

  private fitFontSizeToWidth(options: {
    element: HTMLElement;
    targetElement: HTMLElement;
    minPx: number;
    maxPx: number;
  }): void {
    const { element, targetElement, minPx, maxPx } = options;
    const targetWidth = targetElement.getBoundingClientRect().width;
    let low = minPx;
    let high = maxPx;

    for (let i = 0; i < 16; i++) {
      const mid = (low + high) / 2;
      element.style.fontSize = `${mid}px`;
      const width = element.getBoundingClientRect().width;

      if (width < targetWidth) {
        low = mid;
      } else {
        high = mid;
      }
    }

    element.style.fontSize = `${low}px`;
  }

  private fitFontSizeToHeight(options: {
    element: HTMLElement;
    targetElement: HTMLElement;
    minPx: number;
    maxPx: number;
  }): void {
    const { element, targetElement, minPx, maxPx } = options;
    const targetHeight = targetElement.getBoundingClientRect().height;
    let low = minPx;
    let high = maxPx;

    for (let i = 0; i < 16; i++) {
      const mid = (low + high) / 2;
      element.style.fontSize = `${mid}px`;
      const height = element.getBoundingClientRect().height;

      if (height < targetHeight) {
        low = mid;
      } else {
        high = mid;
      }
    }

    element.style.fontSize = `${low}px`;
  }
}
