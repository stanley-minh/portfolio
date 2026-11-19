import type { MouseEvent } from 'react';
import { EXPENSE_TRACKER as project } from '../data/site';
import { ArrowRightIcon, CodeIcon } from './Icons';
import styles from './Projects.module.css';

interface ProjectsProps {
  /** Ouvre l'étude de cas avec la transition du rideau. */
  onOpenCase: () => void;
}

export function Projects({ onOpenCase }: ProjectsProps) {
  // C'est un vrai lien (on peut l'ouvrir dans un nouvel onglet ou le copier).
  // Le clic normal est intercepté pour jouer la transition.
  const handleOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    onOpenCase();
  };

  return (
    <section id="projets" className={styles.section} aria-labelledby="projets-title">
      <div className="wrap">
        <h2 id="projets-title" className={styles.title}>
          Projets
        </h2>

        <article className={styles.card} aria-labelledby="projet-expense">
          <div>
            <h3 id="projet-expense" className={styles.name}>
              {project.title}
            </h3>
            <p className={styles.tagline}>{project.tagline}</p>
            <p className={styles.summary}>{project.summary}</p>
            <ul className="chips" aria-label="Technologies">
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className={styles.actions}>
              <a href={`#/projets/${project.slug}`} className="btn btn--red" onClick={handleOpen}>
                Lire l'étude de cas
                <ArrowRightIcon />
              </a>
              <a href={project.repo} className="btn btn--ghost">
                <CodeIcon />
                Voir le code sur GitHub
              </a>
            </div>
          </div>

          <dl className={styles.facts}>
            <div>
              <dt>Le besoin</dt>
              <dd>{project.need}</dd>
            </div>
            <div>
              <dt>Mon rôle</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Ce que ça montre</dt>
              <dd>{project.shows}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
