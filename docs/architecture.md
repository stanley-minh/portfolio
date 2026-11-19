# Architecture du portfolio « Rồng Mai »

Vite + React 19 + TypeScript. GSAP pour les deux animations orchestrées, Lenis pour le défilement doux. Pas de routeur externe : un mini-routeur par hash suffit pour deux pages.

## Arborescence

```
index.html                  Thème appliqué avant le premier affichage (script inline)
public/
  favicon.svg               Rosace de lotus
  cv.pdf                    À ajouter : le lien « Télécharger le CV » pointe ici
src/
  main.tsx                  Polices, styles globaux, montage de <App />
  App.tsx                   Routes, thème, transition du rideau, Lenis
  styles/
    tokens.css              Couleurs (primitives puis rôles), polices, mesures
    global.css              Reset, liens, focus, boutons, utilitaires
  data/
    parcours.ts             Les étapes du parcours (contenu uniquement)
    site.ts                 Contact et projet Expense Tracker (contenu uniquement)
  hooks/
    usePrefersReducedMotion.ts   Le réglage « réduire les animations » du système
    useTheme.ts                  Thème clair / sombre, mémorisé
    useRoute.ts                  Mini-routeur : accueil ou étude de cas
    useActiveStep.ts             Étape au milieu de l'écran (IntersectionObserver)
    useScrollProgress.ts         Progression de lecture 0 → 1 (la perle)
  lib/
    gsap.ts                 Enregistrement unique des plugins GSAP
  components/
    LotusSymbols.tsx        Les motifs de lotus (définis une fois, réutilisés)
    Header.tsx              En-tête collant
    Hero.tsx                Haut de page
    DragonBranch.tsx        Branche-dragon + animation d'entrée (GSAP)
    Parcours.tsx            Liste des étapes, rail, perle
    TetCalendar.tsx         Calendrier de Tết collant
    Projects.tsx            Carte du projet
    Contact.tsx             Enveloppe lì xì et liens
    Footer.tsx              Pied de page
    Shutter.tsx             Rideau de fer entre deux pages (GSAP)
  pages/
    Home.tsx                Accueil
    CaseStudy.tsx           Étude de cas Expense Tracker
```

## Principes

- **Contenu séparé de l'affichage** : on modifie un texte dans `data/`, jamais dans un composant.
- **Deux niveaux de tokens** : les composants utilisent des rôles (`--heading`, `--link`…), jamais une couleur brute. Le thème sombre ne fait que réaffecter ces rôles.
- **Accessibilité** : un statut est toujours dit par une forme ET un mot ; liens soulignés ; focus visible ; décor en `aria-hidden` ; focus déplacé sur le titre à chaque changement de page ; mouvement réduit respecté (pas de Lenis, pas d'intro, pas de rideau).
- **Performance du scroll** : l'étape active passe par un IntersectionObserver ; la perle écrit une variable CSS sans re-rendu React.

## Scripts

| Commande          | Effet                                        |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Serveur de développement                     |
| `npm run build`   | Vérification TypeScript puis build de prod   |
| `npm run preview` | Sert le build pour le tester avant mise en ligne |
| `npm run lint`    | Analyse du code                              |

## À compléter

- `public/cv.pdf`
- `src/data/site.ts` : `[Comment c'était géré avant…]` et `[Trois apprentissages concrets.]`
- `src/pages/CaseStudy.tsx` : remplacer l'encadré par une vraie capture d'écran
