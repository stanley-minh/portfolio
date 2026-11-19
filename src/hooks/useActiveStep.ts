import { useEffect, useState, type RefObject } from 'react';

/**
 * Renvoie l'index de l'étape actuellement au milieu de l'écran.
 *
 * Chaque étape porte un attribut `data-step="0"`, `data-step="1"`…
 * Un IntersectionObserver surveille une fine bande horizontale au centre
 * de l'écran : `rootMargin: '-45% 0px -45% 0px'` rogne 45 % en haut et
 * 45 % en bas, il reste donc 10 % au milieu. L'étape qui traverse cette
 * bande devient l'étape active.
 *
 * Pourquoi pas un écouteur de scroll ? L'observer est appelé par le
 * navigateur seulement quand une étape entre ou sort de la bande, au lieu
 * de dizaines de fois par seconde.
 *
 * @param listRef La liste qui contient les éléments `[data-step]`.
 * @param enabled Permet de couper l'observation (page étude de cas, par exemple).
 */
export function useActiveStep(listRef: RefObject<HTMLElement | null>, enabled = true): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!enabled || !list) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step));
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );

    list.querySelectorAll('[data-step]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [listRef, enabled]);

  return active;
}
