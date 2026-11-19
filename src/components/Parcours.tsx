import { useRef } from 'react';
import { STATUS_LABEL, STEPS, type Step, type StepStatus } from '../data/parcours';
import { useActiveStep } from '../hooks/useActiveStep';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { LotusIcon, type LotusId } from './LotusSymbols';
import { TetCalendar } from './TetCalendar';
import styles from './Parcours.module.css';

/** Chaque statut a sa propre forme de lotus. */
const MARKER: Record<StepStatus, LotusId> = {
  done: 'lotus',
  now: 'lotus-opening',
  objective: 'lotus-bud',
};

/** La même courbe en S pour chaque étape : mises bout à bout, elles forment le corps du dragon. */
const S_CURVE = 'M20,0 C36,25 36,25 20,50 C4,75 4,75 20,100';

/**
 * Le parcours, lisible de haut en bas comme une simple liste.
 * Autour, deux aides visuelles (masquées aux lecteurs d'écran, qui ont déjà
 * tout dans le texte) :
 *  - la perle dorée descend le long du rail pendant la lecture ;
 *  - le calendrier de Tết, collant, affiche l'étape en cours de lecture.
 */
export function Parcours() {
  const listRef = useRef<HTMLOListElement>(null);
  const pearlRef = useRef<HTMLDivElement>(null);
  const active = useActiveStep(listRef);

  // On écrit directement une variable CSS : aucun re-rendu React pendant le scroll.
  useScrollProgress(listRef, (progress) => {
    pearlRef.current?.style.setProperty('--progress', String(progress));
  });

  return (
    <section id="parcours" className={styles.section} aria-labelledby="parcours-title">
      <div className="wrap">
        <h2 id="parcours-title" className={styles.title}>
          Parcours
        </h2>
        <p className={styles.intro}>
          De la Martinique au développement web, et la suite. Chaque lotus ouvert est une étape franchie, chaque bourgeon
          un objectif.
        </p>

        <ul className={styles.legend} aria-label="Légende">
          <li>
            <LotusIcon id="lotus" size={32} />
            Lotus ouvert&nbsp;: terminé
          </li>
          <li>
            <LotusIcon id="lotus-opening" size={32} />
            Lotus qui s'ouvre&nbsp;: en cours
          </li>
          <li>
            <LotusIcon id="lotus-bud" size={32} />
            Bourgeon&nbsp;: objectif
          </li>
        </ul>

        <div className={styles.layout}>
          <div className={styles.rail}>
            <div ref={pearlRef} className={styles.pearl} aria-hidden="true" />
            <ol ref={listRef} className={styles.steps}>
              {STEPS.map((step, index) => (
                <StepItem key={step.title} step={step} index={index} />
              ))}
            </ol>
          </div>
          <TetCalendar step={STEPS[active]} number={active + 1} />
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, index }: { step: Step; index: number }) {
  const isObjective = step.status === 'objective';
  return (
    <li data-step={index} className={styles.step}>
      <div className={styles.marker} aria-hidden="true">
        <svg viewBox="0 0 40 100" preserveAspectRatio="none" className={styles.segment}>
          {isObjective ? (
            // Objectif : le chemin n'est pas encore tracé, il est en pointillé.
            <path d={S_CURVE} className={styles.dashed} vectorEffect="non-scaling-stroke" />
          ) : (
            <>
              <path d={S_CURVE} className={styles.steel} vectorEffect="non-scaling-stroke" />
              <path d={S_CURVE} className={styles.scales} vectorEffect="non-scaling-stroke" />
            </>
          )}
        </svg>
        <span className={styles.badge}>
          <LotusIcon id={MARKER[step.status]} size={48} />
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.date}>{step.date}</span>
          <span className={`${styles.status} ${styles[step.status]}`}>{STATUS_LABEL[step.status]}</span>
        </div>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.place}>{step.place}</p>
        <p className={styles.text}>{step.text}</p>
        {step.skills.length > 0 && (
          <ul className="chips" aria-label="Compétences travaillées">
            {step.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
