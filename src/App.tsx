import { useCallback, useEffect, useRef, type MouseEvent } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LotusSymbols } from './components/LotusSymbols';
import { Shutter, type ShutterHandle } from './components/Shutter';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useRoute, type Route } from './hooks/useRoute';
import { useTheme } from './hooks/useTheme';
import { CaseStudy } from './pages/CaseStudy';
import { Home } from './pages/Home';

/** Inscription vietnamienne sur le papier du rideau, selon la destination. */
const SIGN: Record<Route, string> = {
  home: 'Trang chủ', // page d'accueil
  'expense-tracker': 'Dự án 01', // projet 01
};

/** Titre de l'onglet pour chaque page (celui de l'accueil est aussi dans index.html). */
const TITLE: Record<Route, string> = {
  home: 'Stanley Coute (Phước Lan) · Développeur web full-stack',
  'expense-tracker': 'Expense Tracker · Étude de cas · Stanley Coute',
};

/**
 * La section de l'accueil visée par l'adresse (#projets), s'il y en a une.
 * Les routes (#/projets/…) ne sont pas des sections.
 */
function sectionFromHash(): HTMLElement | null {
  const { hash } = window.location;
  if (hash.length < 2 || hash.startsWith('#/')) return null;
  return document.getElementById(decodeURIComponent(hash.slice(1)));
}

export default function App() {
  const { route, navigate } = useRoute();
  const { theme, toggleTheme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const lenis = useLenis(); // undefined si Lenis n'est pas actif (mouvement réduit)
  const shutterRef = useRef<ShutterHandle>(null);
  const isTransitioning = useRef(false);

  /**
   * Change de page avec le rideau :
   * 1. le rideau descend et couvre l'écran ;
   * 2. on change de route derrière lui (le visiteur ne voit pas le saut) ;
   * 3. le rideau remonte sur la nouvelle page.
   * Avec le mouvement réduit, on change de page directement.
   */
  const go = useCallback(
    async (to: Route, section?: string) => {
      if (isTransitioning.current || to === route) return;
      isTransitioning.current = true;
      try {
        if (!reduced && shutterRef.current) {
          await shutterRef.current.close(SIGN[to]);
          navigate(to, section);
          await shutterRef.current.open();
        } else {
          navigate(to, section);
        }
      } finally {
        isTransitioning.current = false;
      }
    },
    [route, navigate, reduced],
  );

  // Le titre de l'onglet suit la page, Y COMPRIS au premier affichage
  // (lien partagé vers l'étude de cas, page rechargée) : pas de garde ici.
  useEffect(() => {
    document.title = TITLE[route];
  }, [route]);

  // À chaque changement de page (clic OU bouton Précédent du navigateur) :
  // - si l'adresse vise une section (#projets), on y va et le focus revient
  //   sur le lien qui avait ouvert la page quittée ;
  // - sinon, retour en haut et focus sur le titre, que le lecteur d'écran annonce.
  // On compare avec la route précédente : l'effet se relance aussi quand
  // `lenis` arrive (juste après le chargement), et là il ne doit rien faire.
  const previousRoute = useRef(route);
  useEffect(() => {
    if (previousRoute.current === route) return;
    previousRoute.current = route;
    const section = sectionFromHash();
    if (section) {
      // Lenis comme scrollIntoView tiennent compte de scroll-margin-top (global.css) :
      // la section arrive sous l'en-tête collant, pas dessous.
      if (lenis) lenis.scrollTo(section, { immediate: true, force: true });
      else section.scrollIntoView();
      section.querySelector<HTMLElement>('[data-return-focus]')?.focus({ preventScroll: true });
    } else {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
      document.getElementById('page-title')?.focus({ preventScroll: true });
    }
  }, [route, lenis]);

  // « Aller au contenu » : on donne le focus à <main> SANS changer l'adresse.
  // Avec un simple href="#contenu", le mini-routeur lirait #contenu comme
  // la page d'accueil et ferait quitter l'étude de cas.
  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById('contenu');
    if (!main) return;
    event.preventDefault();
    main.focus(); // <main tabIndex={-1}> : focusable par script, pas au Tab
  };

  return (
    <>
      {/* Défilement doux, coupé si le visiteur préfère moins d'animations. */}
      {!reduced && <ReactLenis root options={{ lerp: 0.12 }} />}
      <LotusSymbols />
      <a href="#contenu" className="skip-link" onClick={skipToContent}>
        Aller au contenu
      </a>
      <Header
        isHome={route === 'home'}
        theme={theme}
        onToggleTheme={toggleTheme}
        onGoHome={() => go('home')}
        onBack={() => go('home', 'projets')}
      />
      {route === 'home' ? (
        <Home onOpenCase={() => go('expense-tracker')} />
      ) : (
        <CaseStudy onBack={() => go('home', 'projets')} />
      )}
      <Footer />
      <Shutter ref={shutterRef} />
    </>
  );
}
