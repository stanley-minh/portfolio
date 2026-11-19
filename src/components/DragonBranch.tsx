import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './Hero.module.css';

/** Le corps du dragon : une seule courbe de Bézier, qui entre par le haut à droite et s'enroule. */
const BODY =
  'M820,-14 C760,-4 700,10 600,20 C500,30 450,90 455,165 C460,245 545,265 540,345 C535,425 440,460 360,435 C285,410 270,330 330,300 C375,278 410,320 385,350';

/** Les petites branches qui portent certains lotus. */
const TWIGS =
  'M470,110 C455,92 438,82 418,80 M505,250 C525,236 545,232 566,236 M518,402 C545,410 565,425 578,445 M430,445 C428,470 420,490 405,505 M300,370 C270,380 250,395 238,415';

/** Position, rotation et taille de chaque lotus ouvert. */
const LOTUSES = [
  { x: 418, y: 80, r: 20, s: 2.6 },
  { x: 455, y: 165, r: -10, s: 3 },
  { x: 566, y: 236, r: 35, s: 2.4 },
  { x: 540, y: 345, r: 5, s: 3 },
  { x: 578, y: 445, r: -25, s: 2.2 },
  { x: 405, y: 505, r: 15, s: 2.6 },
  { x: 360, y: 435, r: 40, s: 2.8 },
  { x: 238, y: 415, r: -15, s: 2.4 },
  { x: 560, y: 24, r: 0, s: 2.2 },
];

const BUDS = [
  { x: 500, y: 40, s: 2 },
  { x: 470, y: 220, s: 1.9 },
  { x: 505, y: 395, s: 1.9 },
  { x: 320, y: 395, s: 1.8 },
];

/**
 * Le reflet qui traverse les fleurs : une bande de lumière diagonale.
 * Le dégradé va de (x1, y1) à (x1 + WIDTH, y1 + SLOPE) ; on fait glisser x1 et x2
 * de FROM (avant la première fleur, à gauche) à TO (après la dernière, à droite).
 * Hors de cette zone, le dégradé est transparent : au repos, on ne voit rien.
 */
const LIGHT = { from: -140, to: 640, width: 220, y1: -40, slope: 120 } as const;
/** Zone qui couvre toutes les fleurs (unités du viewBox). */
const AREA = { x: 100, y: -60, width: 620, height: 660 } as const;

/** Les lotus et les bourgeons. `bloom` les rend animables à l'éclosion. */
function Flowers({ bloom }: { bloom: boolean }) {
  return (
    <>
      {LOTUSES.map(({ x, y, r, s }) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <g data-bloom={bloom || undefined}>
            <use href="#lotus-red" transform={`rotate(${r}) scale(${s})`} />
          </g>
        </g>
      ))}
      {BUDS.map(({ x, y, s }) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <g data-bloom={bloom || undefined}>
            <use href="#lotus-bud-red" transform={`scale(${s})`} />
          </g>
        </g>
      ))}
    </>
  );
}

/**
 * La branche-dragon du haut de page, purement décorative (aria-hidden).
 *
 * Animation d'entrée (une seule fois, au chargement) :
 *  1. le corps se dessine, grâce à un masque dont on anime `stroke-dashoffset` ;
 *  2. les lotus éclosent les uns après les autres ;
 *  3. la perle apparaît ;
 *  4. puis, en boucle, un reflet d'or traverse les fleurs toutes les 7 s
 *     (même rythme que le reflet de « Phước Lan » dans le Hero).
 * Si le visiteur a demandé moins d'animations, tout est affiché d'emblée, sans reflet.
 */
export function DragonBranch() {
  const root = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const reveal = root.current?.querySelector<SVGPathElement>('[data-reveal]');
      const light = root.current?.querySelector<SVGLinearGradientElement>('[data-light]');
      if (!reveal || !light) return;

      // Astuce du « tracé qui se dessine » : un trait pointillé dont le tiret
      // ET le trou font la longueur totale du chemin. Décalé d'une longueur,
      // on ne voit que le trou ; ramené à 0, on voit tout le tiret.
      const length = reveal.getTotalLength();
      gsap.set(reveal, { strokeDasharray: length, strokeDashoffset: length });

      gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .to(reveal, { strokeDashoffset: 0, duration: 1.6, ease: 'power1.inOut' })
        .from('[data-twig]', { opacity: 0, duration: 0.4 }, '-=0.4')
        .from(
          '[data-bloom]',
          { scale: 0, rotation: -60, transformOrigin: '50% 50%', duration: 0.6, stagger: 0.07, ease: 'back.out(1.8)' },
          '-=0.8',
        )
        .from('[data-pearl]', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%', duration: 0.7 }, '-=0.4')
        // Le reflet : on anime les ATTRIBUTS x1/x2 du dégradé (plugin attr de GSAP).
        // 2,2 s de passage + 4,8 s de pause = un cycle de 7 s.
        .fromTo(
          light,
          { attr: { x1: LIGHT.from, x2: LIGHT.from + LIGHT.width } },
          {
            attr: { x1: LIGHT.to, x2: LIGHT.to + LIGHT.width },
            duration: 2.2,
            ease: 'sine.inOut',
            repeat: -1,
            repeatDelay: 4.8,
          },
        );
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <svg ref={root} viewBox="0 0 600 560" className={styles.branchSvg} aria-hidden="true" focusable="false">
      <defs>
        <mask id="dragon-reveal" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1100" height="800">
          <path data-reveal d={BODY} fill="none" stroke="#fff" strokeWidth="40" strokeLinecap="round" />
        </mask>

        {/* La perle : un volume (reflet décalé en haut à gauche) et un halo qui s'efface vers l'extérieur. */}
        <radialGradient id="pearl-body" cx="0.38" cy="0.36" r="0.75">
          <stop offset="0" className={styles.pearlStop} style={{ stopColor: 'var(--pearl-shine)' }} />
          <stop offset="0.4" className={styles.pearlStop} style={{ stopColor: 'var(--pearl-core)' }} />
          <stop offset="1" className={styles.pearlStop} style={{ stopColor: 'var(--pearl-edge)' }} />
        </radialGradient>
        <radialGradient id="pearl-halo">
          <stop offset="0.3" className={styles.pearlStop} style={{ stopColor: 'var(--pearl-glow)' }} />
          <stop offset="1" className={styles.pearlStop} style={{ stopColor: 'var(--pearl-glow)' }} stopOpacity="0" />
        </radialGradient>

        {/* Profondeur : une ombre douce, rouge sombre, décale les fleurs du fond. */}
        <filter id="lotus-shadow" filterUnits="userSpaceOnUse" {...AREA}>
          <feDropShadow dx="2" dy="5" stdDeviation="4" style={{ floodColor: 'var(--do-sau)' }} floodOpacity="0.65" />
        </filter>

        {/* La bande de lumière (transparent → reflet doré → transparent). */}
        <linearGradient
          id="flower-light"
          data-light
          gradientUnits="userSpaceOnUse"
          x1={LIGHT.from}
          y1={LIGHT.y1}
          x2={LIGHT.from + LIGHT.width}
          y2={LIGHT.y1 + LIGHT.slope}
        >
          <stop offset="0" style={{ stopColor: 'var(--ngoc-reflet)' }} stopOpacity="0" />
          <stop offset="0.5" style={{ stopColor: 'var(--ngoc-reflet)' }} stopOpacity="0.75" />
          <stop offset="1" style={{ stopColor: 'var(--ngoc-reflet)' }} stopOpacity="0" />
        </linearGradient>

        {/* Transforme n'importe quelle forme en silhouette blanche (on garde seulement sa transparence). */}
        <filter id="to-white" filterUnits="userSpaceOnUse" {...AREA}>
          <feFlood floodColor="#fff" />
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>

        {/* Masque = silhouette des fleurs : la lumière ne s'affiche QUE sur elles. */}
        <mask id="flowers-silhouette" maskUnits="userSpaceOnUse" {...AREA}>
          <g filter="url(#to-white)">
            <Flowers bloom={false} />
          </g>
        </mask>
      </defs>

      {/*
        La perle que le dragon salue. Ses couleurs viennent des tokens --pearl-*
        (tokens.css) : soleil d'or en thème clair, lune pâle en thème sombre.
        GSAP anime <g data-pearl> à l'entrée ; les animations CSS en boucle sont
        posées sur les enfants, pour ne pas se battre pour le même `transform`.
      */}
      <g data-pearl>
        <g className={styles.pearlFloat}>
          <circle cx="196" cy="300" r="78" fill="url(#pearl-halo)" className={styles.pearlHalo} />
          <circle cx="196" cy="300" r="40" fill="none" strokeWidth="2" strokeDasharray="4 6" className={styles.pearlRing} />
          <circle cx="196" cy="300" r="28" strokeWidth="2" fill="url(#pearl-body)" className={styles.pearlBody} />
          <circle cx="186" cy="290" r="6" className={styles.pearlShine} />
          <path
            d="M150,262 C160,250 172,248 180,252 M240,262 C232,250 220,248 212,252 M168,348 C178,356 214,356 224,348"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            className={styles.pearlRays}
          />
        </g>
      </g>

      {/* Le corps : un trait d'acier, puis des écailles d'argent en pointillé */}
      <g mask="url(#dragon-reveal)">
        <path d={BODY} fill="none" strokeWidth="16" strokeLinecap="round" style={{ stroke: 'var(--thep)' }} />
        <path d={BODY} fill="none" strokeWidth="7" strokeLinecap="round" strokeDasharray="7 6" style={{ stroke: 'var(--bac)' }} />
      </g>
      <path data-twig d={TWIGS} fill="none" strokeWidth="4" strokeLinecap="round" style={{ stroke: 'var(--thep)' }} />

      {/* Les fleurs, avec leur ombre portée. */}
      <g filter="url(#lotus-shadow)">
        <Flowers bloom />
      </g>

      {/* Le reflet : un rectangle rempli par la bande de lumière, découpé par la silhouette des fleurs. */}
      <rect {...AREA} fill="url(#flower-light)" mask="url(#flowers-silhouette)" />
    </svg>
  );
}
