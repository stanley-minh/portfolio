import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

/**
 * Indique si le visiteur a demandé à son système de réduire les animations
 * (réglage d'accessibilité macOS, Windows, iOS, Android).
 *
 * `useSyncExternalStore` est le hook prévu par React pour lire une source
 * extérieure (ici une media query) et se mettre à jour quand elle change.
 *
 * @returns `true` si les animations doivent être coupées.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false, // rendu côté serveur : on suppose « non »
  );
}
