# Design Direction

Owner's brief (2026-11-09), in their words:
> "I don't have any specific design, but I don't want common ones, or AI slop. I want only dark themed design. Make it very professional and interactive and easy to understand and read and navigate."

## Hard requirements

1. **Dark theme only.** No light mode and no theme toggle. Design every surface, state and component for dark.
2. **Not common, not AI slop.** It must not look like a template or a generic AI-generated portfolio.
3. **Professional.** It should suit a Full Stack AI Engineer applying to serious companies. Polished and restrained, never gimmicky.
4. **Interactive.** Motion and feedback that feel alive: the Tubes Cursor hero, the Shiny Button CTAs, hover and scroll states.
5. **Easy to read.** High contrast, comfortable type sizes, short line lengths.
6. **Easy to navigate.** A visitor should find projects, experience and contact within seconds.

## What these requirements mean in practice (build checklist)

### Avoid (the usual "AI portfolio" tells)
- Purple/blue gradients on every heading and card
- Generic glassmorphism card grids where every section looks the same
- "Hi, I'm Usman 👋" emoji-heavy copy, buzzword filler ("passionate", "cutting-edge", "seamless")
- Centered-everything layouts with identical section rhythm
- Skill bars / percentage meters ("Python 90%"); they mean nothing
- Stock icon soup next to every skill
- Too many competing animations; motion should have a purpose

### Do
- **One accent color system.** The Tubes Cursor (`#5e72e4 #8965e0 #f5365c` + lights) and the Shiny Button (`blue` / `#8484ff`) currently use different palettes. At build time, choose one palette with the `ui-ux-pro-max` and `design-system` skills and apply it to both components.
- **Strong typographic hierarchy.** The type system should do the "not generic" work. Pick a distinctive display face with a highly readable body face (the `frontend-design` skill). The Tubes Cursor's Montserrat and the Shiny Button's Inter are both very common, so consider replacing them.
- **Lead with real proof.** Use concrete numbers from the CV (90% factual consistency, <5% hallucination, 500+ docs) and real project detail, not adjectives.
- **Readability:** body text 16–18px, line length ≤ ~70ch, body text contrast ≥ WCAG AA (aim for AAA), muted text still ≥ 4.5:1.
- **Navigation:** sticky top nav with section links and an active-section indicator; smooth scroll; skip-to-content link; mobile menu; keyboard-accessible; visible focus states.
- **Interaction with restraint:** the hero is the "wow" moment, the rest is calm, with subtle reveals and hover states. Respect `prefers-reduced-motion`.
- **Run the checks:** use `design-taste-frontend` while building, then `web-design-guidelines` for the final review.

## Planned sections (draft, confirm at build)

1. **Hero:** Tubes Cursor background, name, role, one-line value statement, CTAs (Shiny Button)
2. **Impact strip:** key numbers from the CV
3. **About:** short summary
4. **Experience:** Devsinc, Hull Technologies (timeline)
5. **Projects:** 3 projects with stack, problem, outcome
6. **Skills:** grouped by category (no skill bars)
7. **Education & Certifications**
8. **Contact:** email, LinkedIn, GitHub (**no phone number**)

## Components to use

| Component | Where | Doc |
|---|---|---|
| Tubes Cursor | Hero background | [components/tubes-cursor.md](components/tubes-cursor.md) |
| Shiny Button | **All buttons / CTAs** | [components/shiny-button.md](components/shiny-button.md) |
