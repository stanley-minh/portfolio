/**
 * Exporte la bannière LinkedIn (1584×396) en PNG, en français et en anglais.
 *
 * Source : .github/assets/linkedin-banner.svg (version française).
 * Sortie : .github/assets/linkedin-banner-fr.png et linkedin-banner-en.png
 *
 * macOS uniquement : le rendu passe par Quick Look (qlmanage, moteur WebKit) et sips,
 * fournis avec le système. Quick Look rend une page de 1024 px de large ; avec une vignette
 * de 2048 px (facteur ×2), une image affichée à 792×198 sort à 1584×396, puis sips recadre au centre.
 *
 * Usage : node scripts/export-linkedin-banner.mjs
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const WIDTH = 1584;
const HEIGHT = 396;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assets = join(root, '.github', 'assets');
const source = readFileSync(join(assets, 'linkedin-banner.svg'), 'utf8');

/** Textes traduits, repérés dans le SVG par l'attribut data-i18n. */
const LANGS = {
  fr: { role: 'Développeur web full-stack en formation', cta: "En recherche d'alternance" },
  en: { role: 'Full-stack web developer in training', cta: 'Looking for an apprenticeship' },
};

/** Largeur approximative en Helvetica Bold (unités d'em), comme pour les badges du profil. */
const EM = {
  A: 0.72, B: 0.72, C: 0.72, D: 0.72, E: 0.67, F: 0.61, G: 0.78, H: 0.72, I: 0.28, J: 0.56, K: 0.72, L: 0.61, M: 0.83,
  N: 0.72, O: 0.78, P: 0.67, Q: 0.78, R: 0.72, S: 0.67, T: 0.61, U: 0.72, V: 0.67, W: 0.94, X: 0.67, Y: 0.67, Z: 0.61,
  a: 0.56, b: 0.61, c: 0.56, d: 0.61, e: 0.56, f: 0.33, g: 0.61, h: 0.61, i: 0.28, j: 0.28, k: 0.56, l: 0.28, m: 0.89,
  n: 0.61, o: 0.61, p: 0.61, q: 0.61, r: 0.39, s: 0.56, t: 0.33, u: 0.61, v: 0.56, w: 0.78, x: 0.56, y: 0.56, z: 0.5,
  ' ': 0.28, "'": 0.24, '.': 0.28, '-': 0.33,
};
const textWidth = (text, size) => Math.round([...text].reduce((sum, ch) => sum + (EM[ch] ?? 0.56), 0) * size);

/** Remplace le texte d'un élément data-i18n="key" ; pour la pastille, fixe aussi sa largeur. */
function translate(svg, { role, cta }) {
  const ctaWidth = textWidth(cta, 21);
  return svg
    .replace(/(data-i18n="role">)[^<]*/, `$1${role}`)
    .replace(/(data-i18n="cta")>[^<]*/, `$1 textLength="${ctaWidth}" lengthAdjust="spacing">${cta}`)
    .replace('width="PILLW"', `width="${ctaWidth + 44}"`) // 22 px de marge de chaque côté
    .replace(/(<title id="title">)[^<]*/, `$1Phước Lan · ${role} · ${cta}`);
}

const work = mkdtempSync(join(tmpdir(), 'linkedin-banner-'));
try {
  for (const [lang, texts] of Object.entries(LANGS)) {
    writeFileSync(join(work, `${lang}.svg`), translate(source, texts));
    writeFileSync(
      join(work, `${lang}.html`),
      `<!doctype html><html><head><meta charset="utf-8"></head>
<body style="margin:0;width:1024px;height:1024px;display:flex;align-items:center;justify-content:center">
<img src="${lang}.svg" style="width:${WIDTH / 2}px;height:${HEIGHT / 2}px;display:block"></body></html>`,
    );
    execFileSync('qlmanage', ['-t', '-s', '2048', '-o', work, join(work, `${lang}.html`)], { stdio: 'ignore' });
    const out = join(assets, `linkedin-banner-${lang}.png`);
    execFileSync('sips', ['-c', String(HEIGHT), String(WIDTH), join(work, `${lang}.html.png`), '--out', out], { stdio: 'ignore' });

    const info = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', out], { encoding: 'utf8' });
    const [w, h] = [...info.matchAll(/pixel\w+: (\d+)/g)].map((m) => Number(m[1]));
    if (w !== WIDTH || h !== HEIGHT) throw new Error(`${out} : ${w}×${h} au lieu de ${WIDTH}×${HEIGHT}`);
    console.log(`.github/assets/linkedin-banner-${lang}.png (${w}×${h})`);
  }
} finally {
  rmSync(work, { recursive: true, force: true }); // nettoie le dossier temporaire, même en cas d'erreur
}
