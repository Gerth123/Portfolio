import { isPlatformBrowser, NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, NgZone, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/language.service';

// Gap kept between the wave's edge and the contact button on desktop.
const DESKTOP_WAVE_BUTTON_CLEARANCE = 16;

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
  @ViewChild('heroProfile') heroProfile?: ElementRef<HTMLElement>;
  @ViewChild('heroWave') heroWave?: ElementRef<HTMLElement>;
  @ViewChild('heroButton') heroButton?: ElementRef<HTMLElement>;

  public translations: any = {
    en: {
      rotateText: 'I am',
      subtitle: 'Full-Stack Developer',
      smePitch: 'I help small and medium-sized businesses save time with AI automation.',
      buttonText: 'Contact',
      scrollHint: 'Scroll down',
    },
    de: {
      rotateText: 'Ich bin',
      subtitle: 'Full-Stack-Entwickler',
      smePitch: 'Ich helfe kleinen und mittleren Unternehmen, mit KI-Automatisierung Zeit zu sparen.',
      buttonText: 'Kontakt',
      scrollHint: 'Nach unten scrollen',
    },
  };

  public currentLanguage: 'en' | 'de' = 'en';

  private resizeObserver?: ResizeObserver;
  private mutationObserver?: MutationObserver;
  private languageChangeSubscription?: Subscription;
  private rafId = 0;
  private readonly isBrowser: boolean;

  constructor(
    private languageService: LanguageService,
    private readonly zone: NgZone,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => this.scheduleHeroFit());

      [
        this.heroTextGroup?.nativeElement,
        this.heroTitleStack?.nativeElement,
        this.heroName?.nativeElement,
        this.heroProfile?.nativeElement,
        this.heroWave?.nativeElement,
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
    if (this.isBrowser) {
      window.removeEventListener('resize', this.scheduleHeroFit);
    }

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

  handleScroll(fragment: string): void {
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }

  private readonly scheduleHeroFit = (): void => {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      this.fitHeroText();
    });
  };

  private fitHeroText(): void {
    const sideLabel = this.heroSideLabel?.nativeElement;
    const titleStack = this.heroTitleStack?.nativeElement;
    const name = this.heroName?.nativeElement;
    const role = this.heroRole?.nativeElement;

    if (!sideLabel || !titleStack || !name || !role) {
      return;
    }

    const fitBounds = this.getHeroFitBounds();

    this.fitFontSizeToWidth({
      element: role,
      targetElement: name,
      minPx: 1,
      maxPx: this.getMaxRoleFontSize(name),
    });

    this.fitFontSizeToHeight({
      element: sideLabel,
      targetElement: titleStack,
      minPx: fitBounds.sideLabelMinPx,
      maxPx: fitBounds.sideLabelMaxPx,
    });

    this.fitHeroWave();
  }

  private fitHeroWave(): void {
    const wave = this.heroWave?.nativeElement;

    if (!wave) {
      return;
    }

    if (window.matchMedia('(max-width: 575.98px)').matches) {
      this.alignWaveAboveHeroText();
      return;
    }

    if (window.matchMedia('(min-width: 992px)').matches) {
      this.alignWaveBelowContactButton();
      return;
    }

    // Tablet widths keep the position from the stylesheet.
    wave.style.top = '';
    wave.style.bottom = '';
  }

  /** Mobile: the wave sits just above the stacked hero text. */
  private alignWaveAboveHeroText(): void {
    const wave = this.heroWave?.nativeElement;
    const textGroup = this.heroTextGroup?.nativeElement;

    if (!wave || !textGroup) {
      return;
    }

    const waveRect = wave.getBoundingClientRect();
    const textRect = textGroup.getBoundingClientRect();

    if (!waveRect.width || !waveRect.height || !textRect.width || !textRect.height) {
      return;
    }

    // The edge drops towards the left, so its lowest point over the text is the worst case.
    const lowestCurveOffset = Math.max(
      ...this.getWaveCurveOffsets(waveRect, [textRect.left, textRect.left + textRect.width * 0.5, textRect.right])
    );

    this.placeWaveCurveAt(wave, textRect.top - this.getMobileWaveTextClearance(), lowestCurveOffset);
  }

  /** Desktop: the wave's edge clears the contact button instead of cutting through it. */
  private alignWaveBelowContactButton(): void {
    const wave = this.heroWave?.nativeElement;
    const button = this.heroButton?.nativeElement;

    if (!wave || !button) {
      return;
    }

    const waveRect = wave.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    if (!waveRect.width || !waveRect.height || !buttonRect.width || !buttonRect.height) {
      return;
    }

    // The edge rises towards the right, so its highest point over the button is the worst case.
    const highestCurveOffset = Math.min(
      ...this.getWaveCurveOffsets(waveRect, [buttonRect.left, buttonRect.left + buttonRect.width * 0.5, buttonRect.right])
    );

    this.placeWaveCurveAt(wave, buttonRect.bottom + DESKTOP_WAVE_BUTTON_CLEARANCE, highestCurveOffset);
  }

  /** Curve offsets from the wave's own top edge, for the given screen x positions. */
  private getWaveCurveOffsets(waveRect: DOMRect, screenXs: number[]): number[] {
    const scale = waveRect.width / 1442;

    return screenXs.map((screenX) => {
      const svgX = this.clamp((screenX - waveRect.left) / scale, 0, 1442);
      return this.getWaveCurveY(svgX) * scale;
    });
  }

  /** Moves the wave so the given point on its curve lands at a target screen y. */
  private placeWaveCurveAt(wave: HTMLElement, targetScreenY: number, curveOffset: number): void {
    const containingBlock = wave.offsetParent as HTMLElement | null;
    const containingBlockTop = containingBlock?.getBoundingClientRect().top ?? 0;

    wave.style.top = `${Math.round(targetScreenY - curveOffset - containingBlockTop)}px`;
    wave.style.bottom = 'auto';
  }

  private getMobileWaveTextClearance(): number {
    const width = window.innerWidth;

    if (width <= 340) {
      return 12;
    }

    if (width <= 390) {
      return 14;
    }

    return 16;
  }

  private getWaveCurveY(x: number): number {
    if (x <= 569.5) {
      return this.getCubicBezierYAtX(
        x,
        { x: 0, y: 421.5 },
        { x: 236, y: 441.5 },
        { x: 353.4, y: 434.372 },
        { x: 569.5, y: 385 }
      );
    }

    return this.getCubicBezierYAtX(
      x,
      { x: 569.5, y: 385 },
      { x: 984, y: 290.3 },
      { x: 1281.7, y: 152.1 },
      { x: 1442, y: 0 }
    );
  }

  private getCubicBezierYAtX(
    targetX: number,
    p0: { x: number; y: number },
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number }
  ): number {
    let low = 0;
    let high = 1;

    for (let i = 0; i < 22; i++) {
      const mid = (low + high) / 2;
      const x = this.getCubicBezierValue(mid, p0.x, p1.x, p2.x, p3.x);

      if (x < targetX) {
        low = mid;
      } else {
        high = mid;
      }
    }

    const t = (low + high) / 2;
    return this.getCubicBezierValue(t, p0.y, p1.y, p2.y, p3.y);
  }

  private getCubicBezierValue(t: number, p0: number, p1: number, p2: number, p3: number): number {
    const oneMinusT = 1 - t;

    return (
      oneMinusT ** 3 * p0 +
      3 * oneMinusT ** 2 * t * p1 +
      3 * oneMinusT * t ** 2 * p2 +
      t ** 3 * p3
    );
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  private getHeroFitBounds(): {
    sideLabelMinPx: number;
    sideLabelMaxPx: number;
  } {
    const width = window.innerWidth;

    if (width <= 575.98) {
      return { sideLabelMinPx: 12, sideLabelMaxPx: 42 };
    }

    if (width <= 991.98) {
      return { sideLabelMinPx: 18, sideLabelMaxPx: 58 };
    }

    if (width <= 1199.98) {
      return { sideLabelMinPx: 22, sideLabelMaxPx: 68 };
    }

    if (width <= 1599.98) {
      return { sideLabelMinPx: 24, sideLabelMaxPx: 76 };
    }

    return { sideLabelMinPx: 28, sideLabelMaxPx: 86 };
  }

  private getMaxRoleFontSize(name: HTMLElement): number {
    const nameFontSize = Number.parseFloat(getComputedStyle(name).fontSize);

    if (!Number.isFinite(nameFontSize)) {
      return 90;
    }

    return Math.max(48, nameFontSize * 1.15);
  }

  private fitFontSizeToWidth(options: {
    element: HTMLElement;
    targetElement: HTMLElement;
    minPx: number;
    maxPx: number;
  }): void {
    const { element, targetElement, minPx, maxPx } = options;
    const targetWidth = targetElement.getBoundingClientRect().width;

    if (!targetWidth) {
      return;
    }

    let low = minPx;
    let high = maxPx;

    for (let i = 0; i < 20; i++) {
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
    const lowDiff = Math.abs(targetWidth - element.getBoundingClientRect().width);

    element.style.fontSize = `${high}px`;
    const highDiff = Math.abs(targetWidth - element.getBoundingClientRect().width);

    element.style.fontSize = `${highDiff < lowDiff ? high : low}px`;
  }

  private fitFontSizeToHeight(options: {
    element: HTMLElement;
    targetElement: HTMLElement;
    minPx: number;
    maxPx: number;
  }): void {
    const { element, targetElement, minPx, maxPx } = options;
    const targetHeight = targetElement.getBoundingClientRect().height;

    if (!targetHeight) {
      return;
    }

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
