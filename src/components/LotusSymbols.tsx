/**
 * Le lotus vu de dessus (« Sen tròn »), dessiné une seule fois puis
 * réutilisé partout avec `<use href="#lotus" />`.
 * Chaque motif tient dans un carré de -14 à 14 (viewBox="-14 -14 28 28").
 *
 * Trois états, trois FORMES différentes (pas seulement trois couleurs) :
 *  - lotus         : rosace complète, étape terminée
 *  - lotus-opening : seulement l'anneau intérieur, vide, étape en cours
 *  - lotus-bud     : bourgeon fermé, objectif
 *  - lotus-red / lotus-bud-red : variantes contrastées pour le fond rouge
 *
 * Attention : en SVG, `var(--x)` ne marche pas de façon fiable dans un
 * attribut (fill="var(--x)"). On passe donc par `style`, qui est du CSS.
 */

/** Pétale extérieur, pointe vers le haut. Répété tous les 45° (360 / 8). */
const OUTER_PETAL = 'M0,-2 C-3.3,-5 -3.5,-10 0,-13.5 C3.5,-10 3.3,-5 0,-2 Z';
/** Pétale intérieur, plus court, décalé de 22,5° pour tomber entre deux pétales extérieurs. */
const INNER_PETAL = 'M0,-1 C-2.4,-3.5 -2.6,-7.5 0,-10 C2.6,-7.5 2.4,-3.5 0,-1 Z';
const BUD = 'M0,-11 C4.6,-5.5 4.6,1.5 0,5 C-4.6,1.5 -4.6,-5.5 0,-11 Z';
const BUD_TIP = 'M0,-11 C2.2,-8.6 3,-6.6 3.3,-4.8 C1.2,-5.7 -1.2,-5.7 -3.3,-4.8 C-3,-6.6 -2.2,-8.6 0,-11 Z';

/** Les 8 angles : 0, 45, 90… 315. */
const ANGLES = Array.from({ length: 8 }, (_, i) => i * 45);

interface RingProps {
  path: string;
  offset: number;
  fill: string;
  stroke: string;
  width: number;
}

/** Un anneau de 8 pétales identiques, tournés autour du centre. */
function PetalRing({ path, offset, fill, stroke, width }: RingProps) {
  return (
    <>
      {ANGLES.map((angle) => (
        <path key={angle} d={path} transform={`rotate(${angle + offset})`} strokeWidth={width} style={{ fill, stroke }} />
      ))}
    </>
  );
}

/** Le cœur : la graine du lotus (đài sen), avec ses cinq alvéoles. */
function SeedPod() {
  return (
    <>
      <circle r="3.4" strokeWidth={0.7} style={{ fill: 'url(#seed-depth)', stroke: 'var(--vang-dat)' }} />
      {[
        [0, 0],
        [1.7, 0],
        [-1.7, 0],
        [0, 1.7],
        [0, -1.7],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="0.6" style={{ fill: 'var(--vang-dat)' }} />
      ))}
    </>
  );
}

function Bud({ fill, tip, stroke, tipStroke, stem }: { fill: string; tip: string; stroke: string; tipStroke: string; stem: string }) {
  return (
    <g transform="scale(0.77)">
      <path d={BUD} strokeWidth={0.9} style={{ fill, stroke }} />
      <path d={BUD_TIP} strokeWidth={0.7} style={{ fill: tip, stroke: tipStroke }} />
      <path d="M0,5 L0,10" fill="none" strokeWidth={1.2} style={{ stroke: stem }} />
    </g>
  );
}

export function LotusSymbols() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/*
          Relief des fleurs. Les dégradés sont en `objectBoundingBox` (le défaut) :
          ils se calent sur la boîte de CHAQUE pétale, dans son propre repère, donc
          ils tournent avec lui. y=1 → base du pétale (dans l'ombre), y=0 → pointe (dans la lumière).
        */}
        <linearGradient id="petal-red-depth" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--do-sau)' }} />
          <stop offset="0.55" style={{ stopColor: 'var(--do-nep)' }} />
          <stop offset="1" style={{ stopColor: 'var(--do-tham)' }} />
        </linearGradient>
        <linearGradient id="petal-gold-depth" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--vang-dat)' }} />
          <stop offset="0.5" style={{ stopColor: 'var(--vang-mai)' }} />
          <stop offset="1" style={{ stopColor: 'var(--ngoc)' }} />
        </linearGradient>
        {/* Le cœur bombé : un point de lumière décalé en haut à gauche. */}
        <radialGradient id="seed-depth" cx="0.38" cy="0.35" r="0.7">
          <stop offset="0" style={{ stopColor: 'var(--ngoc-reflet)' }} />
          <stop offset="0.45" style={{ stopColor: 'var(--ngoc)' }} />
          <stop offset="1" style={{ stopColor: 'var(--vang-mai)' }} />
        </radialGradient>
        {/* Le bourgeon est arrondi : dégradé de gauche à droite, comme un volume cylindrique. */}
        <linearGradient id="bud-gold-depth" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: 'var(--vang-dat)' }} />
          <stop offset="0.4" style={{ stopColor: 'var(--ngoc)' }} />
          <stop offset="0.75" style={{ stopColor: 'var(--vang-mai)' }} />
          <stop offset="1" style={{ stopColor: 'var(--vang-dat)' }} />
        </linearGradient>
        {/* Petite ombre portée : l'anneau intérieur et le cœur « flottent » au-dessus des pétales extérieurs. */}
        <filter id="petal-lift" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0.5" stdDeviation="0.6" style={{ floodColor: 'var(--do-sau)' }} floodOpacity="0.7" />
        </filter>

        <g id="lotus">
          <PetalRing path={OUTER_PETAL} offset={0} fill="var(--do-li-xi)" stroke="var(--mark)" width={0.7} />
          <PetalRing path={INNER_PETAL} offset={22.5} fill="var(--vang-mai)" stroke="var(--mark)" width={0.7} />
          <SeedPod />
        </g>
        <g id="lotus-opening">
          <PetalRing path={INNER_PETAL} offset={22.5} fill="var(--bg)" stroke="var(--mark)" width={1.2} />
          <circle r="3" style={{ fill: 'var(--vang-dat)' }} />
        </g>
        <g id="lotus-bud">
          <Bud fill="var(--vang-mai)" tip="var(--do-li-xi)" stroke="var(--mark)" tipStroke="var(--mark)" stem="var(--mark)" />
        </g>
        {/* Sur le rouge : pétales rouge foncé bordés d'or pour rester visibles. */}
        <g id="lotus-red">
          <PetalRing path={OUTER_PETAL} offset={0} fill="url(#petal-red-depth)" stroke="var(--ngoc)" width={0.7} />
          <g filter="url(#petal-lift)">
            <PetalRing path={INNER_PETAL} offset={22.5} fill="url(#petal-gold-depth)" stroke="var(--nau-dam)" width={0.7} />
          </g>
          <g filter="url(#petal-lift)">
            <SeedPod />
          </g>
        </g>
        <g id="lotus-bud-red">
          <Bud fill="url(#bud-gold-depth)" tip="var(--do-nep)" stroke="var(--nau-dam)" tipStroke="var(--ngoc)" stem="var(--bac)" />
        </g>
      </defs>
    </svg>
  );
}

export type LotusId = 'lotus' | 'lotus-opening' | 'lotus-bud' | 'lotus-red';

/**
 * Un lotus isolé (marqueurs du parcours, légende, sceau de l'enveloppe).
 * Le bourgeon est entouré d'un cercle pointillé : un objectif, pas encore atteint.
 */
export function LotusIcon({ id, size }: { id: LotusId; size: number }) {
  return (
    <svg viewBox="-14 -14 28 28" width={size} height={size} aria-hidden="true" focusable="false">
      {id === 'lotus-bud' ? (
        <>
          <circle r="12.5" fill="none" strokeWidth={1.1} strokeDasharray="2.5 2.5" style={{ stroke: 'var(--mark)' }} />
          <use href="#lotus-bud" transform="scale(1.3)" />
        </>
      ) : (
        <use href={`#${id}`} />
      )}
    </svg>
  );
}
