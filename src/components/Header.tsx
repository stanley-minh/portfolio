import type { MouseEvent } from 'react';
import type { Theme } from '../hooks/useTheme';
import { CONTACT, IDENTITY } from '../data/site';
import { ArrowLeftIcon, DownloadIcon, MoonIcon, SunIcon } from './Icons';
import { LotusIcon } from './LotusSymbols';
import styles from './Header.module.css';

interface HeaderProps {
  isHome: boolean;
  theme: Theme;
  onToggleTheme: () => void;
  /** Le nom : retour en haut de l'accueil. */
  onGoHome: () => void;
  /** Le bouton « Retour aux projets » de l'étude de cas : retour à la section Projets. */
  onBack: () => void;
}

/**
 * En-tête collant : nom, ancres de la page d'accueil, bouton de thème, CV.
 *
 * Le bouton de thème annonce l'ACTION (« Thème sombre » = passer en sombre).
 * On n'ajoute pas `aria-pressed` : avec un libellé qui change, le lecteur
 * d'écran entendrait deux informations contradictoires.
 */
export function Header({ isHome, theme, onToggleTheme, onGoHome, onBack }: HeaderProps) {
  // Sur l'étude de cas, le nom ramène à l'accueil avec la transition.
  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isHome) return; // sur l'accueil, l'ancre #haut fait déjà le travail
    event.preventDefault();
    onGoHome();
  };

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <a href="#haut" lang="vi" className={`display ${styles.brand}`} onClick={handleBrandClick}>
          <span className={styles.brandIcon}>
            <LotusIcon id="lotus" size={34} />
          </span>
          {IDENTITY.alias}
        </a>
        <nav aria-label="Navigation principale" className={styles.nav}>
          {isHome ? (
            <ul className={styles.links}>
              <li><a href="#parcours">Parcours</a></li>
              <li><a href="#projets">Projets</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          ) : (
            <button type="button" className={`btn btn--outline ${styles.iconBtn}`} onClick={onBack}>
              <ArrowLeftIcon />
              <span className={styles.label}>Retour aux projets</span>
            </button>
          )}
          <button type="button" className={`btn btn--ghost ${styles.theme} ${styles.iconBtn}`} onClick={onToggleTheme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            <span className={styles.label}>{theme === 'dark' ? 'Thème clair' : 'Thème sombre'}</span>
          </button>
          <a href={CONTACT.cv} className={`btn btn--dark ${styles.iconBtn}`} download>
            <DownloadIcon />
            <span className={styles.label}>Télécharger le CV</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

