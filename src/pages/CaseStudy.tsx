import type { MouseEvent } from 'react';
import { EXPENSE_TRACKER as project } from '../data/site';
import { ArrowLeftIcon, CodeIcon } from '../components/Icons';
import styles from './CaseStudy.module.css';

interface CaseStudyProps {
  onBack: () => void;
}

/** L'étude de cas Expense Tracker. Le contenu est dans `data/site.ts`. */
export function CaseStudy({ onBack }: CaseStudyProps) {
  const handleBack = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onBack();
  };

  return (
    <main id="contenu" tabIndex={-1} className={styles.main}>
      <article className={`wrap ${styles.article}`}>
        <p className={styles.kicker}>Étude de cas</p>
        <h1 id="page-title" tabIndex={-1} className={styles.title}>
          {project.title}
        </h1>
        <p className={styles.tagline}>{project.tagline}</p>

        <h2 className={styles.h2}>Le besoin</h2>
        <p className={styles.p}>{project.caseStudy.need}</p>

        <h2 className={styles.h2}>Choix techniques</h2>
        <ul className={styles.list}>
          {project.caseStudy.choices.map((choice) => (
            <li key={choice}>{choice}</li>
          ))}
        </ul>

        <h2 className={styles.h2}>Ce que j'ai appris</h2>
        <ul className={styles.list}>
          {project.caseStudy.learned.map((lesson) => (
            <li key={lesson}>{lesson}</li>
          ))}
        </ul>

        <div className={styles.footer}>
          <a href={import.meta.env.BASE_URL} className="btn btn--outline" onClick={handleBack}>
            <ArrowLeftIcon />
            Retour à l'accueil
          </a>
          <a href={project.repo} className="btn btn--ghost">
            <CodeIcon />
            Voir le code sur GitHub
          </a>
        </div>
      </article>
    </main>
  );
}
