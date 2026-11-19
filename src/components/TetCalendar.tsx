import type { Step } from '../data/parcours';
import { STATUS_LABEL } from '../data/parcours';
import styles from './TetCalendar.module.css';

interface TetCalendarProps {
  step: Step;
  /** Numéro de l'étape, affiché en grand (1, 2, 3…). */
  number: number;
}

/**
 * Le calendrier à effeuiller de Tết (lịch bloc), collant à droite du parcours.
 * Il répète l'étape en cours de lecture : c'est une aide visuelle, donc
 * aria-hidden (le lecteur d'écran a déjà l'information dans la liste).
 *
 * L'effet « page qui tourne » sans état React : la feuille porte une `key`.
 * Quand l'étape change, React détruit l'ancienne feuille et en crée une
 * nouvelle, qui joue son animation CSS d'entrée.
 */
export function TetCalendar({ step, number }: TetCalendarProps) {
  return (
    <aside className={styles.calendar} aria-hidden="true">
      <div className={styles.block}>
        <div className={styles.rings}>
          <span />
          <span />
        </div>
        <div key={number} className={styles.sheet}>
          <div className={styles.top}>
            <span lang="vi">Hành trình</span>
            <span>{step.date}</span>
          </div>
          <div className={`display ${styles.number}`}>{number}</div>
          <div className={styles.title}>{step.title}</div>
          <div className={styles.status}>{STATUS_LABEL[step.status]}</div>
          <div lang="vi" className={styles.vi}>
            {step.vi}
          </div>
        </div>
      </div>
    </aside>
  );
}
