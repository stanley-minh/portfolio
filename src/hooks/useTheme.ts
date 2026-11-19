import { useCallback, useState } from 'react';

export type Theme = 'light' | 'dark';

/** Le petit script de `index.html` a déjà posé `data-theme` : on part de là. */
function readInitialTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * Gère le thème clair/sombre.
 *
 * Le thème est posé sur `<html data-theme="…">` : toutes les variables CSS
 * sémantiques (voir `tokens.css`) changent d'un coup, sans re-rendu React
 * des composants. Le choix est mémorisé dans `localStorage`.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch {
        // Navigation privée stricte : on garde le thème pour cette visite seulement.
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
