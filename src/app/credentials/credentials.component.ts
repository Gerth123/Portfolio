import { NgClass, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { LanguageService } from '../services/language.service';

type Language = 'en' | 'de';

interface CredentialLink {
  label: Record<Language, string>;
  url: string;
  hideOnMobile?: boolean;
}

interface Credential {
  title: string;
  issuer: string;
  period: Record<Language, string>;
  type: Record<Language, string>;
  description: Record<Language, string>;
  tags: string[];
  links?: CredentialLink[];
  fileType?: 'PDF' | 'IMG';
  previewImage?: string;
}

@Component({
  selector: 'app-credentials',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './credentials.component.html',
  styleUrl: './credentials.component.scss',
})
export class CredentialsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('credentialsTrack') credentialsTrack?: ElementRef<HTMLElement>;

  public activeCredentialIndex = 0;
  public visibleCredentialIndexes: number[] = [0];
  public canScrollPrevious = false;
  public canScrollNext = true;
  public isDragging = false;

  private dragStartX = 0;
  private dragStartScrollLeft = 0;
  private dragPointerId: number | null = null;
  private dragMoved = false;
  private suppressClick = false;
  private resizeObserver?: ResizeObserver;

  public translations = {
    en: {
      headline: 'Credentials',
      intro:
        'A curated overview of completed training, current learning tracks and credentials that support my work in AI-assisted engineering, full-stack development and modern delivery workflows.',
      evidenceAvailable: 'Evidence available on request',
      openDocument: 'Open document',
      previous: 'Previous credential',
      next: 'Next credential',
      goToCredential: 'Go to credential',
      sliderProgress: 'Shown credentials',
    },
    de: {
      headline: 'Qualifikationen',
      intro:
        'Eine kuratierte Übersicht abgeschlossener Weiterbildungen, aktueller Lernpfade und Qualifikationen, die meine Arbeit in AI-assisted Engineering, Full-Stack-Entwicklung und modernen Delivery-Workflows unterstützen.',
      evidenceAvailable: 'Nachweis auf Anfrage',
      openDocument: 'Nachweis öffnen',
      previous: 'Vorheriger Nachweis',
      next: 'Nächster Nachweis',
      goToCredential: 'Zu Nachweis wechseln',
      sliderProgress: 'Angezeigte Nachweise',
    },
  };

  public credentials: Credential[] = [
    {
      title: 'Claude Code Masterclass',
      issuer: 'Everlast',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'Certificate', de: 'Zertifikat' },
      fileType: 'PDF',
      links: [
        {
          label: { en: 'PDF', de: 'PDF' },
          url: '../../assets/certificates/Zertifikat_Claude_Code_Masterclass.pdf',
        },
        {
          label: { en: 'Verify', de: 'Bestätigung' },
          url: 'https://zertifizierung.kiberatung.de/verify/85b5f273-309f-42cc-9109-b645ea10a779',
          hideOnMobile: true,
        },
        {
          label: { en: 'Website', de: 'Webseite' },
          url: 'https://kilernen.de/',
        },
      ],
      description: {
        en: 'Advanced workflow training for coding-agent usage, context preparation, prompt structure and reliable implementation loops.',
        de: 'Fortgeschrittenes Workflow-Training für Coding-Agent-Nutzung, Kontextvorbereitung, Prompt-Struktur und zuverlässige Implementierungszyklen.',
      },
      tags: ['Claude Code', 'Agent workflows', 'Prompt engineering'],
    },
    {
      title: 'KI-Manager Weiterbildung',
      issuer: 'Everlast',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'Certificate', de: 'Zertifikat' },
      fileType: 'PDF',
      links: [
        {
          label: { en: 'PDF', de: 'PDF' },
          url: '../../assets/certificates/Zertifikat_KI_Manager.pdf',
        },
        {
          label: { en: 'Verify', de: 'Bestätigung' },
          url: 'https://zertifizierung.kiberatung.de/verify/b403695d-73c9-4473-a3f4-559cf4ceacd4',
          hideOnMobile: true,
        },
        {
          label: { en: 'Website', de: 'Webseite' },
          url: 'https://kilernen.de/',
        },
      ],
      description: {
        en: 'Structured AI training with focus on practical use cases, process thinking and responsible integration of AI workflows into business contexts.',
        de: 'Strukturierte KI-Weiterbildung mit Fokus auf praktische Use Cases, Prozessdenken und verantwortungsvolle Integration von KI-Workflows in Business-Kontexte.',
      },
      tags: ['AI strategy', 'Process design', 'Automation'],
    },
    {
      title: 'Agentic Coding Masterclass',
      issuer: 'Everlast',
      period: { en: 'In progress', de: 'In Arbeit' },
      type: { en: 'Training', de: 'Weiterbildung' },
      links: [
        {
          label: { en: 'Website', de: 'Webseite' },
          url: 'https://kilernen.de/',
        },
      ],
      description: {
        en: 'Current specialization in agentic coding workflows, task decomposition, review loops and AI-supported software delivery.',
        de: 'Aktuelle Spezialisierung auf Agentic-Coding-Workflows, Aufgabenzerlegung, Review-Schleifen und KI-gestützte Softwareauslieferung.',
      },
      tags: ['Agentic coding', 'Codex', 'Delivery workflows'],
    },
    {
      title: 'Backend Development',
      issuer: 'Developer Akademie',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'Certificate', de: 'Zertifikat' },
      fileType: 'PDF',
      links: [
        {
          label: { en: 'PDF', de: 'PDF' },
          url: '../../assets/certificates/Backend%20Zertifikat%20Robin%20Gerth.pdf',
        },
        {
          label: { en: 'Website', de: 'Webseite' },
          url: 'https://developerakademie.com/',
        },
      ],
      description: {
        en: 'Backend training focused on Python, Django, Django REST Framework, API design, authentication and data-driven application logic.',
        de: 'Backend-Weiterbildung mit Fokus auf Python, Django, Django REST Framework, API-Design, Authentifizierung und datengetriebene Anwendungslogik.',
      },
      tags: ['Python', 'Django / DRF', 'REST APIs'],
    },
    {
      title: 'Frontend Development',
      issuer: 'Developer Akademie',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'Certificate', de: 'Zertifikat' },
      fileType: 'PDF',
      links: [
        {
          label: { en: 'PDF', de: 'PDF' },
          url: '../../assets/certificates/Frontend%20Zertifikat%20Robin%20Gerth.pdf',
        },
        {
          label: { en: 'Website', de: 'Webseite' },
          url: 'https://developerakademie.com/',
        },
      ],
      description: {
        en: 'Frontend training focused on responsive interfaces, Angular, TypeScript, reusable components and project-based UI implementation.',
        de: 'Frontend-Weiterbildung mit Fokus auf responsive Interfaces, Angular, TypeScript, wiederverwendbare Komponenten und projektbasierte UI-Umsetzung.',
      },
      tags: ['Angular', 'TypeScript', 'Responsive UI'],
    },
    {
      title: 'Fitness-Trainer-B-Lizenz',
      issuer: 'Online-Trainer-Lizenz',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'License', de: 'Lizenz' },
      fileType: 'PDF',
      links: [
        {
          label: { en: 'PDF', de: 'PDF' },
          url: '../../assets/certificates/Fitnesstrainer-B-Lizenz.pdf',
        },
        {
          label: { en: 'Website', de: 'Webseite' },
          url: 'https://www.online-trainer-lizenz.de/',
        },
      ],
      description: {
        en: 'Professional B-license with focus on training fundamentals, exercise planning and health-oriented coaching.',
        de: 'Fachliche B-Lizenz mit Fokus auf Trainingsgrundlagen, Übungsplanung und gesundheitsorientiertes Coaching.',
      },
      tags: ['Training science', 'Coaching', 'Health'],
    },
    {
      title: 'Ernährungsberater-Lizenz',
      issuer: 'Online-Trainer-Lizenz',
      period: { en: 'Completed', de: 'Abgeschlossen' },
      type: { en: 'License', de: 'Lizenz' },
      fileType: 'PDF',
      links: [
        {
          label: { en: 'PDF', de: 'PDF' },
          url: '../../assets/certificates/Ern%C3%A4hrungsberater-Lizenz.pdf',
        },
        {
          label: { en: 'Website', de: 'Webseite' },
          url: 'https://www.online-trainer-lizenz.de/',
        },
      ],
      description: {
        en: 'Additional license around nutrition fundamentals, everyday advisory contexts and health-oriented habit support.',
        de: 'Ergänzende Lizenz zu Ernährungsgrundlagen, Beratungskontexten im Alltag und gesundheitsorientierter Unterstützung.',
      },
      tags: ['Nutrition', 'Advisory', 'Health'],
    },
  ];

  constructor(private languageService: LanguageService) {}

  ngAfterViewInit(): void {
    this.refreshSliderState();

    const track = this.credentialsTrack?.nativeElement;

    if (track && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.refreshSliderState());
      this.resizeObserver.observe(track);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.refreshSliderState();
  }

  getCurrentText(field: keyof typeof this.translations.en): string {
    const language = this.languageService.currentLanguage as Language;
    return this.translations[language][field];
  }

  getCurrentLanguage(): Language {
    return this.languageService.currentLanguage as Language;
  }

  trackCredential(index: number): number {
    return index;
  }

  scrollCredentials(direction: -1 | 1): void {
    const track = this.credentialsTrack?.nativeElement;

    if (!track) {
      return;
    }

    const card = track.querySelector<HTMLElement>('.credential-slide');
    const gap = this.getTrackGap(track);
    const cardWidth = card?.offsetWidth ?? track.clientWidth;

    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: 'smooth',
    });
  }

  goToCredential(index: number): void {
    const track = this.credentialsTrack?.nativeElement;
    const slide = track?.querySelectorAll<HTMLElement>('.credential-slide')[index];

    slide?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });

    this.activeCredentialIndex = index;
    this.updateVisibleCredentials();
  }

  isCredentialVisible(index: number): boolean {
    return this.visibleCredentialIndexes.includes(index);
  }

  isCredentialInProgress(credential: Credential): boolean {
    return credential.period.en === 'In progress';
  }

  updateActiveCredential(): void {
    const track = this.credentialsTrack?.nativeElement;

    if (!track) {
      return;
    }

    const slides = Array.from(track.querySelectorAll<HTMLElement>('.credential-slide'));
    const trackLeft = track.getBoundingClientRect().left;
    const nextIndex = slides.reduce((closestIndex, slide, index) => {
      const currentDistance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
      const closestDistance = Math.abs(slides[closestIndex].getBoundingClientRect().left - trackLeft);
      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);

    this.activeCredentialIndex = nextIndex;
    this.updateVisibleCredentials();
    this.updateControlVisibility(track);
  }

  onTrackPointerDown(event: PointerEvent): void {
    const track = this.credentialsTrack?.nativeElement;

    if (!track || event.button !== 0 || this.isInteractiveTarget(event.target)) {
      return;
    }

    this.dragPointerId = event.pointerId;
    this.dragStartX = event.clientX;
    this.dragStartScrollLeft = track.scrollLeft;
    this.dragMoved = false;
    this.isDragging = true;
    track.setPointerCapture(event.pointerId);
  }

  onTrackPointerMove(event: PointerEvent): void {
    const track = this.credentialsTrack?.nativeElement;

    if (!track || this.dragPointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - this.dragStartX;

    if (Math.abs(deltaX) > 4) {
      this.dragMoved = true;
      this.suppressClick = true;
    }

    track.scrollLeft = this.dragStartScrollLeft - deltaX;
  }

  onTrackPointerUp(event: PointerEvent): void {
    this.finishDragging(event);
  }

  onTrackPointerCancel(event: PointerEvent): void {
    this.finishDragging(event, false);
  }

  onTrackPointerLeave(event: PointerEvent): void {
    if (this.dragPointerId === event.pointerId && event.buttons === 0) {
      this.finishDragging(event);
    }
  }

  handleTrackClick(event: MouseEvent): void {
    if (!this.suppressClick) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.suppressClick = false;
  }

  onTrackKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.scrollCredentials(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.scrollCredentials(1);
    }
  }

  private getTrackGap(track: HTMLElement): number {
    const gap = window.getComputedStyle(track).columnGap;
    return Number.parseFloat(gap) || 0;
  }

  private finishDragging(event: PointerEvent, snap = true): void {
    const track = this.credentialsTrack?.nativeElement;

    if (!track || this.dragPointerId !== event.pointerId) {
      return;
    }

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    this.dragPointerId = null;
    this.isDragging = false;

    if (snap && this.dragMoved) {
      this.snapToNearestSlide();
    }

    window.setTimeout(() => {
      this.suppressClick = false;
    }, 0);
  }

  private snapToNearestSlide(): void {
    const track = this.credentialsTrack?.nativeElement;

    if (!track) {
      return;
    }

    const slides = Array.from(track.querySelectorAll<HTMLElement>('.credential-slide'));

    if (!slides.length) {
      return;
    }

    const closestSlide = slides.reduce((closest, slide) => {
      const currentDistance = Math.abs(slide.offsetLeft - track.scrollLeft);
      const closestDistance = Math.abs(closest.offsetLeft - track.scrollLeft);
      return currentDistance < closestDistance ? slide : closest;
    }, slides[0]);

    closestSlide.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  private refreshSliderState(): void {
    window.requestAnimationFrame(() => {
      const track = this.credentialsTrack?.nativeElement;

      if (!track) {
        return;
      }

      this.updateActiveCredential();
    });
  }

  private updateVisibleCredentials(): void {
    const track = this.credentialsTrack?.nativeElement;

    if (!track) {
      this.visibleCredentialIndexes = [this.activeCredentialIndex];
      return;
    }

    const visibleCount = this.getVisibleSlideCount(track);
    const lastStartIndex = Math.max(0, this.credentials.length - visibleCount);
    const startIndex = Math.min(this.activeCredentialIndex, lastStartIndex);

    this.visibleCredentialIndexes = Array.from({ length: visibleCount }, (_, index) => startIndex + index).filter(
      (index) => index < this.credentials.length,
    );
  }

  private updateControlVisibility(track: HTMLElement): void {
    const maxScroll = this.getMaxScroll(track);
    const scrollTolerance = 2;

    this.canScrollPrevious = track.scrollLeft > scrollTolerance;
    this.canScrollNext = track.scrollLeft < maxScroll - scrollTolerance;
  }

  private getMaxScroll(track: HTMLElement): number {
    return Math.max(0, track.scrollWidth - track.clientWidth);
  }

  private getVisibleSlideCount(track: HTMLElement): number {
    const card = track.querySelector<HTMLElement>('.credential-slide');
    const gap = this.getTrackGap(track);
    const cardWidth = card?.offsetWidth ?? track.clientWidth;
    const slideDistance = Math.max(cardWidth + gap, 1);

    return Math.max(1, Math.min(this.credentials.length, Math.round(track.clientWidth / slideDistance)));
  }

  private isInteractiveTarget(target: EventTarget | null): boolean {
    return target instanceof HTMLElement && !!target.closest('a, button, input, textarea, select, [role="button"]');
  }
}
