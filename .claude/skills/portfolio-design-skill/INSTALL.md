# Installation

Fuehre die Befehle aus dem Projekt-Root aus:

```powershell
cd "C:\Users\robin\Developer_Akademie\Dev\Frontend\Modul 15\Portfolio"
```

## Claude Code

Skill als Claude-Code-Skill kopieren:

```powershell
New-Item -ItemType Directory -Force .claude\skills\portfolio-design
Copy-Item -Recurse -Force portfolio-design-skill\* .claude\skills\portfolio-design\
```

Optional in `CLAUDE.md` referenzieren:

```powershell
Add-Content CLAUDE.md "`nUse the portfolio design skill from .claude/skills/portfolio-design when creating or editing portfolio UI."
```

## Cursor

Als Cursor-Regel ablegen:

```powershell
New-Item -ItemType Directory -Force .cursor\rules
Copy-Item -Force portfolio-design-skill\SKILL.md .cursor\rules\portfolio-design.mdc
Copy-Item -Force portfolio-design-skill\tokens.json .cursor\rules\portfolio-design.tokens.json
Copy-Item -Force portfolio-design-skill\components.md .cursor\rules\portfolio-design.components.md
```

Alternative fuer klassische `.cursorrules`:

```powershell
Add-Content .cursorrules "`nUse portfolio-design-skill/SKILL.md, portfolio-design-skill/tokens.json and portfolio-design-skill/components.md for all portfolio UI work."
```

## Codex

Als lokaler Codex-Skill kopieren:

```powershell
New-Item -ItemType Directory -Force .codex\skills\portfolio-design
Copy-Item -Recurse -Force portfolio-design-skill\* .codex\skills\portfolio-design\
```

Optional in `AGENTS.md` referenzieren:

```powershell
Add-Content AGENTS.md "`nFor portfolio UI work, use portfolio-design-skill/SKILL.md and its tokens/components files."
```

## Windsurf

In `.windsurfrules` referenzieren:

```powershell
Add-Content .windsurfrules "`nFor portfolio UI work, follow portfolio-design-skill/SKILL.md, portfolio-design-skill/tokens.json, portfolio-design-skill/tokens.css and portfolio-design-skill/components.md."
```

## Unix/macOS Copy-Varianten

```bash
mkdir -p .claude/skills/portfolio-design .codex/skills/portfolio-design .cursor/rules
cp -R portfolio-design-skill/. .claude/skills/portfolio-design/
cp -R portfolio-design-skill/. .codex/skills/portfolio-design/
cp portfolio-design-skill/SKILL.md .cursor/rules/portfolio-design.mdc
cp portfolio-design-skill/tokens.json .cursor/rules/portfolio-design.tokens.json
cp portfolio-design-skill/components.md .cursor/rules/portfolio-design.components.md
printf '\nFor portfolio UI work, follow portfolio-design-skill/SKILL.md and its token files.\n' >> .windsurfrules
```
