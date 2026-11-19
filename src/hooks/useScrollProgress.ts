import { useEffect, useEffectEvent, type RefObject } from 'react';

/**
 * Calcule la progression de lecture d'un élément, entre 0 et 1,
 * et la transmet à `onProgress` à chaque image.
 *
 * Le calcul (la « perle qui suit la lecture ») :
 *
 *   progression = (milieu de l'écran − haut de l'élément) / hauteur de l'élément
 *
 *   - quand le haut de l'élément arrive au milieu de l'écran → 0
 *   - quand le bas de l'élément arrive au milieu de l'écran  → 1
 *   - on borne entre 0 et 1 avec Math.min / Math.max.
 *
 * Deux optimisations par rapport à la version naïve (un setState à chaque
 * événement scroll) :
 *  1. requestAnimationFrame : au plus un calcul par image affichée,
 *     même si le navigateur envoie plusieurs événements scroll entre deux images.
 *  2. Pas de setState : `onProgress` écrit directement dans le style de la
 *     perle. React ne re-rend donc pas tout le parcours 60 fois par seconde.
 *
 * @param targetRef  L'élément dont on mesure la lecture (la liste des étapes).
 * @param onProgress Appelée avec la progression (0 à 1).
 */
export function useScrollProgress(
  targetRef: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
): void {
  // useEffectEvent : l'effet appelle toujours la DERNIÈRE version de
  // onProgress, sans avoir à se réabonner au scroll quand elle change.
  const emit = useEffectEvent(onProgress);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const middle = window.innerHeight / 2;
      const raw = (middle - rect.top) / Math.max(1, rect.height);
      emit(Math.min(1, Math.max(0, raw)));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [targetRef]);
}
