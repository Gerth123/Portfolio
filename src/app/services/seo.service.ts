import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  url: string;
  locale: 'en' | 'de';
  image?: string;
  type?: string;
}

const SITE_NAME = 'Robin Gerth';
const DEFAULT_IMAGE = 'https://robin-gerth.de/assets/logo/robin_curly_bracket.png';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Sets title, meta description, Open Graph, Twitter Card and canonical tag for the current view.
   */
  updateTags(config: SeoConfig): void {
    const { title, description, url, locale, image = DEFAULT_IMAGE, type = 'website' } = config;

    this.titleService.setTitle(title);
    this.document.documentElement.lang = locale;

    this.setTag('name', 'description', description);
    this.setTag('property', 'og:site_name', SITE_NAME);
    this.setTag('property', 'og:title', title);
    this.setTag('property', 'og:description', description);
    this.setTag('property', 'og:url', url);
    this.setTag('property', 'og:type', type);
    this.setTag('property', 'og:image', image);
    this.setTag('property', 'og:locale', locale === 'de' ? 'de_DE' : 'en_US');
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', title);
    this.setTag('name', 'twitter:description', description);
    this.setTag('name', 'twitter:image', image);

    this.setCanonical(url);
  }

  setCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  /**
   * Replaces all `<link rel="alternate" hreflang>` tags with the given set,
   * e.g. [{ hreflang: 'en', href: '.../en' }, { hreflang: 'de', href: '.../de' }, { hreflang: 'x-default', href: '.../en' }].
   */
  setHreflangAlternates(alternates: { hreflang: string; href: string }[]): void {
    this.document.querySelectorAll("link[rel='alternate'][hreflang]").forEach((el) => el.remove());

    alternates.forEach(({ hreflang, href }) => {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      this.document.head.appendChild(link);
    });
  }

  /**
   * Injects or replaces a JSON-LD script tag identified by `id`.
   */
  setJsonLd(id: string, data: unknown): void {
    this.removeJsonLd(id);

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  removeJsonLd(id: string): void {
    this.document.getElementById(id)?.remove();
  }

  private setTag(attr: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attr]: key, content } as { name?: string; property?: string; content: string });
  }
}
