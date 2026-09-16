# AWS Cloudscape Component Gallery

A small, self-contained React + Vite demo built on the [AWS Cloudscape Design
System](https://cloudscape.design) (`@cloudscape-design/components`).

## Purpose

This is a single-page reference app used as a UI-testing target for automated
resolver/tracker tooling. It exercises a broad set of real Cloudscape
components — with correct, semantic ARIA markup, live interactive state, and
no placeholder/gibberish content — grouped into clearly labeled sections:

- **Shell**: `TopNavigation`, `AppLayout` (with side navigation), `ContentLayout`
- **Notifications**: `Flashbar`, `Alert`
- **Form controls**: `Input`, `Select`, `Checkbox`, `RadioGroup`, `Toggle`, `Slider`
- **Actions & overlays**: `Button`, `ButtonDropdown`, `Modal`
- **Organize content**: `Tabs`, `ExpandableSection`
- **Data**: `Table` (multi-select, custom cell renderers, header actions)

## Local development

```bash
npm install
npm run dev
```

This starts the Vite dev server (default: http://localhost:5173).

To produce a production build:

```bash
npm run build
npm run preview
```

## Deployment

This repo includes `.github/workflows/deploy.yml`, which builds the app and
deploys `dist/` to GitHub Pages on every push to `main` using
`actions/upload-pages-artifact` and `actions/deploy-pages`.

**Before the workflow will work**, set the repository's Pages source to
**GitHub Actions**: repository **Settings → Pages → Build and deployment →
Source → GitHub Actions**.

`vite.config.js` sets `base: './'` so the built assets resolve correctly when
served from a GitHub Pages project subpath (e.g.
`https://<user>.github.io/<repo>/`).
