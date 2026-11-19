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
  onGoHome: () => void;
}

/**
 * En-tête collant : nom, ancres de la page d'accueil, bouton de thème, CV.
 *
 * Le bouton de thème annonce l'ACTION (« Thème sombre » = passer en sombre).
 * On n'ajoute pas `aria-pressed` : avec un libellé qui change, le lecteur
 * d'écran entendrait deux informations contradictoires.
 */
export function Header({ isHome, theme, onToggleTheme, onGoHome }: HeaderProps) {
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
            <button type="button" className="btn btn--outline" onClick={onGoHome}>
              <ArrowLeftIcon />
              Retour à l'accueil
            </button>
          )}
          <button type="button" className={`btn btn--ghost ${styles.theme}`} onClick={onToggleTheme}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            {theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
          </button>
          <a href={CONTACT.cv} className={`btn btn--dark ${styles.cv}`} download>
            <DownloadIcon />
            Télécharger le CV
          </a>
        </nav>
      </div>
    </header>
  );
}

