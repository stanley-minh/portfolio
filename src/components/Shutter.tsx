import { useImperativeHandle, useRef, useState, type Ref } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { IDENTITY } from '../data/site';
import { LotusIcon } from './LotusSymbols';
import styles from './Shutter.module.css';

/** Ce que le parent peut commander au rideau. */
export interface ShutterHandle {
  /** Baisse le rideau ; la promesse se résout quand il couvre tout l'écran. */
  close: (sign: string) => Promise<void>;
  /** Remonte le rideau ; la promesse se résout quand il a disparu. */
  open: () => Promise<void>;
}

/**
 * Le rideau de fer des boutiques de Saigon, avec son papier rouge de Tết.
 * Il cache le changement de page : il descend, la page change derrière,
 * il remonte.
 *
 * React 19 : `ref` est une prop comme une autre (plus besoin de forwardRef).
 * `useImperativeHandle` choisit ce que cette ref expose : ici, deux méthodes.
 */
export function Shutter({ ref }: { ref: Ref<ShutterHandle> }) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [sign, setSign] = useState('');

  // contextSafe : les animations créées plus tard (au clic) sont quand même
  // rangées dans le contexte GSAP du composant, et nettoyées au démontage.
  const { contextSafe } = useGSAP(
    () => {
      // Le CSS range déjà le rideau en haut avec translateY(-100%), pour qu'il soit
      // caché avant même que JavaScript démarre. Mais GSAP lirait ce décalage
      // comme des pixels (y: -900px) : on le remplace par un pourcentage propre.
      gsap.set(panel.current, { y: 0, yPercent: -100 });
    },
    { scope: root },
  );

  useImperativeHandle(
    ref,
    () => ({
      close: contextSafe(async (text: string) => {
        setSign(text);
        gsap.set(root.current, { pointerEvents: 'auto' }); // bloque les clics pendant la transition
        await gsap.fromTo(panel.current, { yPercent: -100 }, { yPercent: 0, duration: 0.46, ease: 'power2.in' });
      }),
      open: contextSafe(async () => {
        await gsap.to(panel.current, { yPercent: -100, duration: 0.48, delay: 0.3, ease: 'power2.out' });
        gsap.set(root.current, { pointerEvents: 'none' });
      }),
    }),
    [contextSafe],
  );

  return (
    <div ref={root} className={styles.root} aria-hidden="true">
      <div ref={panel} className={styles.panel}>
        <div className={styles.paper}>
          <div className={styles.paperContent}>
            <LotusIcon id="lotus-red" size={64} />
            <p lang="vi" className={`display ${styles.name}`}>
              {IDENTITY.alias}
            </p>
            <p lang="vi" className={styles.sign}>
              {sign}
            </p>
          </div>
        </div>
        <div className={styles.bar} />
        <div className={styles.handle} />
      </div>
    </div>
  );
}
