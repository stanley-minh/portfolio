import { ALTERNANCE, IDENTITY } from '../data/site';
import { DragonBranch } from './DragonBranch';
import { ArrowDownIcon, MailIcon } from './Icons';
import styles from './Hero.module.css';

/**
 * Le haut de page : salutation, nom, présentation, accroche, deux actions.
 * Le texte reste à gauche, lisible tout de suite ; la branche-dragon à
 * droite n'est que décorative.
 */
export function Hero() {
  return (
    <section id="haut" className={`on-red ${styles.hero}`} aria-labelledby="page-title">
      <div className={`wrap ${styles.grid}`}>
        <p className={styles.hello}>
          <span lang="vi" className={styles.helloVi}>
            Xin chào
          </span>
          , je me présente
        </p>
        <div>
          <h1 id="page-title" tabIndex={-1} className={styles.name}>
            {IDENTITY.name}
          </h1>
          <p className={styles.alias}>
            <span className={styles.aliasTag}>alias</span>{' '}
            <span lang="vi" className={styles.aliasName}>
              {IDENTITY.alias}
            </span>
          </p>
          <p className={styles.lead}>
            Développeur web <span className="nowrap">full-stack</span> en formation, je conçois des applications web, du{' '}
            <span className="nowrap">front-end</span> au <span className="nowrap">back-end</span>.
          </p>
          {/* Ce qu'un recruteur cherche en premier : quoi, où, quand, à quel rythme. */}
          <p className={styles.availability}>
            <span className={styles.availabilityDot} aria-hidden="true" />
            <span>
              {/* L'espace après <strong> sépare les deux phrases pour les lecteurs d'écran. */}
              <strong className={styles.availabilityTitle}>Je cherche une alternance {ALTERNANCE.diploma}</strong>{' '}
              À {ALTERNANCE.city}, {ALTERNANCE.start}, au rythme de {ALTERNANCE.rhythm}.
            </span>
          </p>
          <p className={styles.hook}>
            Martiniquais d'origine vietnamienne, j'ai écrit ma première ligne de code à Toulouse, en octobre 2025. Depuis, je
            construis des applications utiles à mon entourage, comme mon suivi de dépenses.
          </p>
          <div className={styles.actions}>
            <a href="#parcours" className={`btn ${styles.primary}`}>
              Lire mon parcours
              <ArrowDownIcon />
            </a>
            <a href="#contact" className={`btn ${styles.secondary}`}>
              <MailIcon />
              Me contacter
            </a>
          </div>
        </div>
        <div className={styles.branch}>
          <DragonBranch />
        </div>
      </div>
    </section>
  );
}
