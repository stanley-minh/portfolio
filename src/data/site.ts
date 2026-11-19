/**
 * Contenu du site hors parcours : identité, contact et projet.
 * Les textes entre crochets [ ] sont à compléter.
 */

/** L'identité affichée sur le site. Un seul endroit à modifier. */
export const IDENTITY = {
  /** Nom officiel : celui du CV et de LinkedIn, que le recruteur doit retrouver. */
  name: 'Stanley Coute',
  /** Prénom vietnamien, avec ses accents (à lire en vietnamien : lang="vi"). */
  alias: 'Phước Lan',
} as const;

export const CONTACT = {
  email: 'stanleybullet.pro@gmail.com',
  github: 'https://github.com/stanley-minh',
  linkedin: 'https://www.linkedin.com/in/stancte',
  /** Dépose ton CV dans `public/cv.pdf` : Vite le servira à cette adresse. */
  cv: '/cv.pdf',
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
    learned: string;
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
    need: "Le CCR Toulouse, une église, avait besoin d'un outil de gestion pour suivre ses dépenses et voir, pour chaque personne, si les paiements avaient été effectués ou non. [Comment c'était géré avant : cahier, tableur, messages ?]",
    choices: [
      "React pour l'interface.",
      'Version 1 : Symfony et API Platform.',
      'Version 2 : PHP MVC natif, sans framework, servi par Nginx.',
      'Docker pour un environnement identique en local et en ligne.',
    ],
    learned: '[Trois apprentissages concrets.]',
  },
};
