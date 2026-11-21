/**
 * Contenu du site hors parcours : identité, contact et projet.
 */

/** L'identité affichée sur le site. Un seul endroit à modifier. */
export const IDENTITY = {
  /** Nom officiel : celui du CV et de LinkedIn, que le recruteur doit retrouver. */
  name: 'Stanley Coute',
  /** Prénom vietnamien, avec ses accents (à lire en vietnamien : lang="vi"). */
  alias: 'Phước Lan',
} as const;

/**
 * La recherche d'alternance. Reprise par le Hero, le Parcours et le Contact :
 * quand la situation change, on ne modifie que cet objet
 * (et le bloc <noscript> d'index.html, qui ne peut pas l'importer).
 */
export const ALTERNANCE = {
  diploma: 'DWWM',
  city: 'Toulouse',
  start: 'dès maintenant',
  rhythm: '4 jours en entreprise et 1 jour en formation',
} as const;

export const CONTACT = {
  email: 'stanleybullet.pro@gmail.com',
  github: 'https://github.com/stanley-minh',
  linkedin: 'https://www.linkedin.com/in/stancte',
  /**
   * `public/cv.pdf`, préfixé par la `base` de Vite (`/portfolio/` en ligne).
   * Un chemin absolu `/cv.pdf` donnerait une 404 sur GitHub Pages.
   */
  cv: `${import.meta.env.BASE_URL}cv.pdf`,
} as const;

/** Affiche une URL sans « https:// » ni « www. », plus lisible dans un texte. */
export function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  stack: string[];
  repo: string;
  need: string;
  role: string;
  shows: string;
  /** Contenu de l'étude de cas */
  caseStudy: {
    need: string;
    choices: string[];
    /** Un apprentissage par entrée, affiché en liste comme les choix techniques. */
    learned: string[];
    /** Où en est le projet : un résultat honnête vaut mieux que pas de résultat. */
    status: string;
  };
}

export const EXPENSE_TRACKER: Project = {
  slug: 'expense-tracker',
  title: 'Expense Tracker',
  tagline: 'Suivi des dépenses et des paiements pour le CCR Toulouse.',
  summary:
    'React côté interface. Une première version en Symfony et API Platform, puis une réécriture du back-end en PHP MVC natif, servie par Nginx sous Docker.',
  stack: ['React', 'PHP MVC', 'Docker', 'Nginx'],
  repo: 'https://github.com/stanley-minh/Expense-Tracker',
  need: 'Le CCR Toulouse, une église, devait suivre ses dépenses et savoir qui avait payé ou non.',
  role: 'Tout le projet, seul : recueil du besoin, conception, front-end, back-end et base de données.',
  shows: 'Faire évoluer une application existante, de Symfony à du PHP sans framework.',
  caseStudy: {
    need: "Le CCR Toulouse, une église, avait besoin d'un outil de gestion pour suivre ses dépenses et voir, pour chaque personne, si les paiements avaient été effectués ou non. Jusque-là, tout était suivi dans un tableur.",
    choices: [
      "React 19 et TypeScript pour l'interface, avec des appels à l'API typés et des classes d'erreur dédiées.",
      'Version 1 : Symfony, API Platform et une authentification par jeton JWT.',
      "Version 2 : back-end réécrit en PHP 8.5 natif, en MVC, sans framework ni Composer, pour comprendre ce qui se passe sous le capot d'un framework.",
      "Une session PHP dans un cookie HttpOnly à la place du JWT : aucun jeton n'est stocké côté JavaScript, une faille XSS ne peut donc pas le voler.",
      "Les parts de chacun ne sont jamais stockées : l'interface les recalcule à partir du montant et du nombre de participants, elles restent donc toujours justes.",
      'Docker Compose (Nginx, PHP-FPM, MySQL 9.7 LTS) : le même environnement sur chaque machine, lancé en une seule commande.',
    ],
    learned: [
      "Ce que fait un framework à ma place : en réécrivant le back-end sans Symfony, j'ai codé moi-même le contrôleur frontal, le routeur et l'autoloader PSR-4.",
      "Sécuriser une authentification : mots de passe hachés avec bcrypt (72 octets au maximum) et, à la connexion, la même réponse dans le même délai, que l'e-mail existe ou non, pour qu'on ne puisse pas deviner quels comptes existent.",
      "Manipuler de l'argent sans erreur d'arrondi : montants stockés en centimes, et partage au centime près par division euclidienne (42,50 € entre 4 personnes : 10,63 + 10,63 + 10,62 + 10,62).",
    ],
    status:
      "Un prototype qui fonctionne de bout en bout (comptes, saisie, récapitulatif, validation des paiements), mais pas encore utilisé par l'église. Il tourne pour l'instant en local, sous Docker. Prochaine étape, le mettre en ligne pour que l'église l'essaie.",
  },
};
