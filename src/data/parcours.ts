/**
 * Les étapes du parcours, dans l'ordre chronologique.
 * Le composant <Parcours> se contente d'afficher ce tableau :
 * pour modifier le contenu, on ne touche qu'à ce fichier.
 */
import { ALTERNANCE } from './site';

/** Statut d'une étape. Il est toujours dit par une forme ET un mot, jamais par la couleur seule. */
export type StepStatus = 'done' | 'now' | 'objective';

export interface Step {
  /** Année ou repère temporel affiché au-dessus du titre. */
  date: string;
  title: string;
  /** Lieu, école ou précision sous le titre. */
  place: string;
  text: string;
  status: StepStatus;
  /** Compétences travaillées pendant l'étape (peut être vide). */
  skills: string[];
  /** Légende vietnamienne du calendrier de Tết. */
  vi: string;
}

export const STATUS_LABEL: Record<StepStatus, string> = {
  done: 'Terminé',
  now: 'En cours',
  objective: 'Objectif',
};

export const STEPS: Step[] = [
  {
    date: '2025',
    title: 'De la Martinique à Toulouse',
    place: 'Point de départ',
    text: 'Martiniquais d’origine vietnamienne. En octobre 2025, à Toulouse, je découvre le code.',
    status: 'done',
    skills: [],
    vi: 'Khởi đầu',
  },
  {
    date: '2026',
    title: 'CS50, Harvard (en ligne)',
    place: 'Formation en ligne',
    text: 'Les fondamentaux de l’algorithmique et de la programmation, en C, en Python et en SQL.',
    status: 'now',
    skills: ['Algorithmique', 'C', 'Python', 'SQL'],
    vi: 'Học lập trình',
  },
  {
    date: 'Sept.–oct. 2026',
    title: 'Stage développeur web',
    place: 'OPTIQUAL Lab',
    text: 'Ma première expérience en équipe, avec des pull requests vers la branche de recette. Dans la liste des prestataires, j’ai remplacé la distance par un indicateur de disponibilité, et j’ai construit le formulaire de candidature en 5 étapes.',
    status: 'done',
    skills: ['Next.js', 'React', 'TypeScript', 'Symfony', 'Docker'],
    vi: 'Thực tập', // stage
  },
  {
    date: '2026',
    title: 'Titre professionnel DWWM, en alternance',
    place: 'Studi',
    text: `Développeur web et web mobile, niveau bac+2. Je recherche une entreprise d’accueil à ${ALTERNANCE.city}, ${ALTERNANCE.start}, au rythme de ${ALTERNANCE.rhythm}.`,
    status: 'now',
    skills: ['React', 'Node.js', 'PHP', 'SQL'],
    vi: 'Đang học',
  },
  {
    date: 'Ensuite',
    title: 'Bachelor Concepteur Développeur & IA',
    place: 'Studi, bac+3',
    text: 'Approfondir la conception logicielle et l’intelligence artificielle.',
    status: 'objective',
    skills: ['Architecture logicielle', 'IA'],
    vi: 'Bước tiếp theo',
  },
  {
    date: 'Dans environ deux ans',
    title: 'Cycle ingénieur',
    place: 'Après le bachelor',
    text: 'Devenir ingénieur en informatique spécialisé en IA, pour intégrer l’intelligence artificielle dans les outils et les systèmes d’information des entreprises.',
    status: 'objective',
    skills: [],
    vi: 'Mục tiêu',
  },
];
