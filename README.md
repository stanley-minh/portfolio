# Portfolio · Stanley Coute (Phước Lan)

Portfolio de développeur web full-stack en formation : parcours, projets et contact.
Thème « Rồng Mai » : un dragon de métal qui se couvre de lotus, en rouge et or.

## Stack

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

## Structure

Voir [docs/architecture.md](docs/architecture.md).

## À compléter

- `public/cv.pdf` : le CV téléchargeable
- `src/data/site.ts` : les deux textes entre crochets de l'étude de cas
- `src/pages/CaseStudy.tsx` : une capture d'écran du projet
