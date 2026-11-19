<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.svg">
  <img alt="Stanley Coute, alias Phước Lan · Développeur web full-stack en formation" src=".github/assets/banner-light.svg">
</picture>

<p align="center">
  <a href="https://stanley-minh.github.io/portfolio/"><img alt="Voir le site" src="https://img.shields.io/badge/Voir_le_site-B3261E?style=for-the-badge&logo=githubpages&logoColor=FFD873"></a>
  <a href="https://github.com/stanley-minh/portfolio/actions/workflows/deploy.yml"><img alt="Statut du déploiement" src="https://img.shields.io/github/actions/workflow/status/stanley-minh/portfolio/deploy.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=FFD873&label=D%C3%A9ploiement&color=2E3238"></a>
</p>

# Portfolio · Stanley Coute (Phước Lan)

Portfolio de développeur web full-stack en formation : parcours, projets et contact.
Thème « Rồng Mai » : un dragon de métal qui se couvre de lotus, en rouge et or.

**En ligne : https://stanley-minh.github.io/portfolio/**

## Stack

<p>
  <img alt="React 19" src="https://img.shields.io/badge/React_19-B3261E?style=for-the-badge&logo=react&logoColor=FFD873">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-B3261E?style=for-the-badge&logo=typescript&logoColor=FFD873">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-B3261E?style=for-the-badge&logo=vite&logoColor=FFD873">
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-B3261E?style=for-the-badge&logo=gsap&logoColor=FFD873">
</p>


- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [GSAP](https://gsap.com) pour l'animation d'entrée et la transition entre pages
- [Lenis](https://lenis.darkroom.engineering) pour le défilement doux
- Polices auto-hébergées avec [Fontsource](https://fontsource.org) (Archivo, Be Vietnam Pro)

## Lancer le projet

Prérequis : Node.js 20.19+ ou 22.12+.

```bash
npm install      # installe les dépendances
npm run dev      # serveur de développement sur http://localhost:5173
npm run build    # vérification TypeScript puis build de production dans dist/
npm run preview  # sert le build pour le tester
npm run lint     # analyse du code (oxlint)
```

## Accessibilité

- Lisible au clavier : lien « Aller au contenu », focus visible, focus déplacé sur le titre à chaque changement de page.
- Contrastes conformes WCAG AA, en thème clair comme en thème sombre.
- Les statuts du parcours sont donnés par une forme et un mot, jamais par la couleur seule.
- Le réglage système « réduire les animations » coupe le défilement doux, l'animation d'entrée et le rideau.

## Déploiement

Chaque push sur `main` lance [le workflow GitHub Actions](.github/workflows/deploy.yml) :
`npm ci` → lint → build → publication sur GitHub Pages. Si une étape échoue, rien n'est publié.

Le site est servi sous `/portfolio/` : c'est la valeur de `base` dans [vite.config.ts](vite.config.ts).
Les chemins vers `public/` passent donc par `import.meta.env.BASE_URL`, jamais par un `/` absolu.

## Bannière des README

[.github/assets/](.github/assets/) contient la bannière en deux variantes (soleil le jour, lune la nuit),
avec les tracés et les couleurs du hero. GitHub choisit la bonne grâce à la balise `<picture>`.

## Aperçu social

Quand on partage le lien du site (LinkedIn, Slack, Discord…), l'aperçu vient des balises Open Graph
(`og:*`) de [index.html](index.html) et de l'image `public/og-image.png` (1200×630).

Sa source est [.github/assets/og-image.svg](.github/assets/og-image.svg). Après une modification :

```bash
./scripts/export-og-image.sh   # macOS uniquement : SVG → PNG 1200×630
```

LinkedIn garde l'ancien aperçu en cache : le rafraîchir avec le [Post Inspector](https://www.linkedin.com/post-inspector/).

## Structure

Voir [docs/architecture.md](docs/architecture.md).

## À compléter

- `src/pages/CaseStudy.tsx` : une capture d'écran du projet, quand l'application sera en ligne
