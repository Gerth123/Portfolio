---
name: portfolio-design
description: Reuse the Robin Gerth portfolio frontend design system for UI work. Use when creating, refactoring, or reviewing portfolio-like frontend components, sections, pages, cards, buttons, forms, navigation, responsive layouts, or CSS so the result matches robin-gerth.de.
---

# Portfolio Design Skill

## Kurzbeschreibung

Dieses Design ist dunkel, technisch und persoenlich. Es kombiniert einen tiefen Navy-Hintergrund mit klaren Poppins-Groteskformen, leuchtendem Gruen fuer Aktionen und Violett als praegnanten Akzent. Flaechen bleiben ruhig und glasig; Bewegung ist kurz, direkt und funktional.

## Design-Prinzipien

1. Verwende `#141d2f` als Basis und arbeite mit transparenten White-Overlays fuer Cards, Borders und Controls.
2. Nutze `#70e61c` fuer Primaeraktionen, aktive Zustaende, Linien und positive Rueckmeldung.
3. Nutze `#9747ff` fuer Rollen-/Projekt-Akzente, Form-Borders im Ruhezustand und Hover-Zustaende von Primaerbuttons.
4. Setze Cyan `#62dff5` nur punktuell fuer sekundäre Highlights, Credential-Details und technische Hinweise ein.
5. Baue Sektionen mit grosszuegigem vertikalem Abstand: `clamp(3.75rem, 6.5vw, 6rem)` oder kompakt `clamp(3rem, 5.5vw, 4.75rem)`.
6. Verwende Poppins mit klarer Gewichtung: 400 fuer normale Titelteile, 500/600 fuer Navigation und Buttons, 700 fuer Section-Headings.
7. Halte Cards bei `0.75rem` Radius, `1px` hell-transparentem Border und subtilen schwarzen Schatten.
8. Nutze `0.2s ease` bis `0.22s ease` fuer Hover-Motion; hebe Elemente nur leicht an.

## Token-Referenz

| Token | Wert | Verwendung |
|---|---:|---|
| `color.bg` | `#141d2f` | Seitenhintergrund, Header/Footer, Legacy-Seiten |
| `color.bgSoft` | `#1b273d` | Profilkreis, weichere Hintergrundflaechen |
| `color.bgElevated` | `#202d46` | erhoehte dunkle Flaechen |
| `color.bgEnd` | `#101827` | Verlauf-Ende im Body und Button-Text auf Gruen |
| `color.text` | `#ffffff` / `#fff` | primaerer Text |
| `color.textMuted` | `rgba(255, 255, 255, 0.76)` | Copy, Placeholder, dezente Texte |
| `color.textSoft` | `rgba(255, 255, 255, 0.9)` | weicher heller Text |
| `color.purple` | `#9747ff` | Akzent, Rolle, Projekt-Titel, Form-Border |
| `color.green` | `#70e61c` | Primaerbutton, Links, Fokus, Erfolg |
| `color.cyan` | `#62dff5` | sekundäre technische Akzente |
| `color.card` | `rgba(255, 255, 255, 0.052)` | Card-Flaeche |
| `color.cardQuiet` | `rgba(255, 255, 255, 0.035)` | ruhige Card-Flaeche, Pagination |
| `color.cardBorder` | `rgba(255, 255, 255, 0.12)` | Card- und Pill-Border |
| `color.dangerBorder` | `#ff5b6e` | Input-Fehlerborder |
| `color.dangerText` | `#ff6b7a` | Fehlermeldung |
| `color.disabled` | `#6c757d` | deaktivierter Send-Button |
| `font.familySans` | `"Poppins", system-ui, -apple-system, "Segoe UI", sans-serif` | globale Sans-Schrift |
| `font.weight.regular` | `400` | Fliesstext, Hero-Role |
| `font.weight.medium` | `500` | Navigation, Footer |
| `font.weight.semibold` | `600` | Buttons, Tags, Links |
| `font.weight.bold` | `700` | Section- und Card-Titel |
| `font.weight.extrabold` | `800` | Hero-Name, einzelne Badges; im Code genutzt, aber nicht als `@font-face` registriert |
| `type.sectionTitle` | `clamp(2.35rem, 6vw, 4.75rem)` | Haupttitel von Sektionen |
| `type.heroTitle` | `clamp(3.4rem, 6.1vw, 5.35rem)` | Hero-H1 Desktop |
| `type.heroRole` | `clamp(2rem, 3.75vw, 3.25rem)` | Hero-Rolle |
| `type.kicker` | `0.82rem / 700 / 0.08em` | uppercase Section-Kicker |
| `space.section` | `clamp(3.75rem, 6.5vw, 6rem)` | Standard-Section-Padding |
| `space.sectionSm` | `clamp(3rem, 5.5vw, 4.75rem)` | kompakte Section |
| `size.header` | `88px`, mobil `72px` | Fixed Header und Scroll-Padding |
| `radius.base` | `0.625rem` | Bootstrap-Basisradius |
| `radius.card` | `0.75rem` | Cards, Preview-Tiles |
| `radius.pill` | `999px` | Pills, Eyebrows, Lines, Dots |
| `shadow.card` | `0 1rem 3rem rgba(0, 0, 0, 0.16)` | Standard-Card |
| `shadow.button` | `0 0.75rem 1.5rem rgba(0, 0, 0, 0.18)` | Primaerbutton |
| `motion.fast` | `0.2s ease` | Standard-Hover |
| `motion.medium` | `0.22s ease` | Card-/Dot-Hover |

Lade bei konkreter Umsetzung zusaetzlich `tokens.json`, `tokens.css` und `components.md`.

## Komponenten-Patterns

### Sections

Do: Verwende `.section-shell`, Bootstrap-Container (`.container-xxl`) und `.section-title`. Nutze Accent-Lines statt dekorativer Trennkarten.

Don't: Keine hellen Seitenhintergruende, keine Marketing-Hero-Cards, keine zufaelligen neuen Breakpoints fuer Standardsektionen.

### Buttons

Do: Primaerbuttons sind gruen mit dunklem Text und wechseln auf Violett mit weissem Text. Outline-Buttons haben gruenen Border und werden auf Hover gruen gefuellt.

Don't: Keine neuen Buttonfarben ausserhalb Gruen/Violett/Dunkel. Keine grossen Schatten ausser `shadow.button`.

### Cards

Do: Nutze transparente dunkle Cards mit `cardBorder`, `radius.card`, kurzer Hover-Anhebung und optionalem gruenem Border-Hover.

Don't: Keine vollflaechig bunten Cards. Keine verschachtelten Card-in-Card-Layouts.

### Forms

Do: Inputs haben violetten Border, dunklen transparenten Hintergrund, gruenen Focus-Border und gruene Focus-Ringe.

Don't: Fehler nicht nur ueber Icon anzeigen; nutze `dangerText` und `dangerBorder`.

### Navigation

Do: Header ist fixed, leicht transparent, mit Blur, 88px hoch auf Desktop und 72px auf Tablet/Mobile. Nav-Hover wird gruen.

Don't: Keine farbigen Header-Hintergruende, keine grossen Header-Schatten.

## Hinweise fuer KI-Tools

Wenn du UI fuer dieses Portfolio baust:

- Verwende zuerst die Tokens aus `tokens.css` oder `tokens.json`.
- Bevorzuge vorhandene Klassenmuster: `section-shell`, `section-title`, `portfolio-card`, `portfolio-eyebrow`, `tech-pill`, `btn-portfolio`, `btn-outline-portfolio`.
- Nutze Bootstrap-kompatibles Markup, aber ueberschreibe die visuelle Sprache mit den Portfolio-Tokens.
- Verwende Flex und Grid wie im Code: Grid fuer Card-Stacks, Preview-Flaechen und Hero-Text; Flex fuer Navigation, Buttons und Card-Bodies.
- Halte Responsive-Verhalten an Bootstrap-Grenzen: `575.98px`, `767.98px`, `991.98px`, `1199.98px`, `1399.98px`, plus Spezialfaelle nur fuer Hero/Legacy.
- Vermeide neue Farben. Wenn ein neuer Zustand noetig ist, waehle eine vorhandene Opazitaetsvariante von Weiss, Gruen, Violett oder Cyan.
- Nutze `prefers-reduced-motion` fuer Animationen und reduziere auf praktisch keine Dauer.

## Bekannte Inkonsistenzen

- `font-weight: 800` wird in Hero und Badges verwendet, aber `@font-face` bindet nur Poppins 300, 400, 500, 600 und 700 ein. Konsolidierung: Poppins 800 registrieren oder Gewicht auf 700 senken.
- Legal- und Privacy-Seiten verwenden feste `px`-Typografie (`80px`, `70px`, `50px`, `30px`, `20px`, `18px`, `16px`) und eigene Breakpoints. Konsolidierung: auf `section-shell`, `section-title`, Container und `clamp()`-Skala umstellen.
- Farben erscheinen teils als Hex, teils als `rgb(20, 29, 47)` / `rgb(112, 230, 28)` / `white`. Konsolidierung: immer Tokens verwenden.
