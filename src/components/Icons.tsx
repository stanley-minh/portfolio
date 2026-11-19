import type { ReactNode } from 'react';

/**
 * Les icônes des boutons, au même endroit pour tout le site.
 *
 * - Elles sont décoratives (`aria-hidden`) : le texte du bouton porte le sens.
 * - Elles prennent la couleur du texte (`currentColor`) : elles suivent donc
 *   automatiquement le thème clair/sombre et l'état de survol, sans CSS en plus.
 * - Leur taille est en `em` (classe globale `.icon`) : elles suivent la taille du texte.
 */

interface IconProps {
  children: ReactNode;
  /** Mouvement au survol du bouton parent (voir `.icon--*` dans global.css). */
  motion?: 'forward' | 'back' | 'down';
}

function Icon({ children, motion }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={motion ? `icon icon--${motion}` : 'icon'}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** Soleil : affiché en thème sombre, pour proposer de repasser au jour. */
export function SunIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Icon>
  );
}

/** Lune : affichée en thème clair, pour proposer de passer à la nuit. */
export function MoonIcon() {
  return (
    <Icon>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </Icon>
  );
}

export function DownloadIcon() {
  return (
    <Icon motion="down">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </Icon>
  );
}

export function MailIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Icon>
  );
}

/** Code source (lien vers un dépôt). */
export function CodeIcon() {
  return (
    <Icon>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
    </Icon>
  );
}

/** Profil professionnel (LinkedIn). */
export function ProfileIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.6-1.4 1.7-2 3-2s2.4.6 3 2M14 10h4M14 14h3" />
    </Icon>
  );
}

export function ArrowRightIcon() {
  return (
    <Icon motion="forward">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}

export function ArrowLeftIcon() {
  return (
    <Icon motion="back">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </Icon>
  );
}

export function ArrowDownIcon() {
  return (
    <Icon motion="down">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Icon>
  );
}
