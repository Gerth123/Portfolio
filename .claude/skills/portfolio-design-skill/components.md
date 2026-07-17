# Komponenten-Rezepte

Die Beispiele sind tool-agnostisch. In Angular, React, Vue oder HTML bleiben Tokens, Klassen und Struktur gleich.

## Section

Nutze `section-shell` als Standardrahmen. Der Inhalt sitzt in `.container-xxl`, danach in Bootstrap-artigen Rows/Cols oder CSS Grid.

```html
<section class="section-shell">
  <div class="container-xxl">
    <div class="d-flex align-items-center gap-3 mb-4">
      <span class="accent-line accent-line--green"></span>
      <h2 class="section-title">Section headline</h2>
    </div>
    <p class="section-copy">Short supporting copy with muted contrast.</p>
  </div>
</section>
```

## Buttons

Primaerbutton:

```html
<a class="btn btn-portfolio" href="#contact">Let us talk</a>
```

Outline-Button:

```html
<a class="btn btn-outline-portfolio" href="/project">View project</a>
```

Do:

- `min-height: 3.25rem`, `padding-inline: 1.5rem`, `font-weight: 600`.
- Primaer: Gruen mit dunklem Text, Hover Violett mit Weiss.
- Outline: Weiss mit gruenem Border, Hover Gruen mit dunklem Text.

Don't:

- Keine neuen Buttonfarben.
- Keine harten Scale-Animationen; leichte Hover-Anhebung reicht.

## Cards

Standardcard:

```html
<article class="portfolio-card card">
  <div class="card-body">
    <span class="portfolio-eyebrow">Case study</span>
    <h3>Project title</h3>
    <p class="section-copy">Compact text with muted white tone.</p>
    <div class="d-flex flex-wrap gap-2">
      <span class="tech-pill">Angular</span>
      <span class="tech-pill">SCSS</span>
    </div>
  </div>
</article>
```

Do:

- Radius `0.75rem`.
- Border `1px solid var(--portfolio-card-border)`.
- Background `var(--portfolio-card)`.
- Shadow `var(--portfolio-shadow-card)`.
- Hover: Border gruenlich, Shadow leicht staerker, `translateY(-0.15rem)` bis `-0.18rem`.

Don't:

- Keine deckend hellen Card-Flaechen.
- Keine verschachtelten Cards als Seitenstruktur.

## Tags und Eyebrows

```html
<span class="portfolio-eyebrow">Portfolio</span>
<span class="tech-pill">TypeScript</span>
```

Eyebrows sind kleine gruene Akzent-Pills. Tech-Pills sind neutraler: transparenter Border, kleine Schrift, `999px` Radius.

## Forms

```html
<form class="contact-form portfolio-card card">
  <div class="card-body">
    <input class="form-control" placeholder="Your name" />
    <textarea class="form-control" placeholder="Message"></textarea>
    <p class="invalid-feedback-like visible">This field is required.</p>
    <button class="btn btn-portfolio" type="submit">Send message</button>
  </div>
</form>
```

Do:

- Inputs: `1.5px` violetter Border, dunkler transparenter Hintergrund.
- Hover/Focus: gruener Border, dunklerer Hintergrund, gruener Focus-Ring.
- Fehler: `#ff5b6e` fuer Border, `#ff6b7a` fuer Text.

Don't:

- Keine nativen hellen Inputs.
- Keine roten Vollflaechen fuer Fehler.

## Navigation

Header:

```html
<header class="site-header navbar navbar-dark fixed-top">
  <div class="container-xxl">
    <a class="navbar-brand" href="/">
      <img src="logo.svg" alt="Robin Gerth" />
    </a>
    <nav class="navbar-nav">
      <a class="nav-link" href="#projects">Projects</a>
    </nav>
  </div>
</header>
```

Do:

- Hintergrund `rgba(20, 29, 47, 0.92)` mit `backdrop-filter: blur(14px)`.
- Desktop-Hoehe `88px`, unter `1199.98px` `72px`.
- Nav-Hover `var(--portfolio-green)`.

## Motion

Standard:

```css
.interactive {
  transition: transform var(--portfolio-motion-fast), border-color var(--portfolio-motion-fast);
}

.interactive:hover {
  transform: translateY(-0.15rem);
  border-color: var(--portfolio-green-border-hover);
}
```

Reduced Motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```
