import { useCallback, useEffect, useRef } from 'react';
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
    async (to: Route) => {
      if (isTransitioning.current || to === route) return;
      isTransitioning.current = true;
      try {
        if (!reduced && shutterRef.current) {
          await shutterRef.current.close(SIGN[to]);
          navigate(to);
          await shutterRef.current.open();
        } else {
          navigate(to);
        }
      } finally {
        isTransitioning.current = false;
      }
    },
    [route, navigate, reduced],
  );

  // À chaque changement de page (clic OU bouton Précédent du navigateur) :
  // retour en haut, et le focus va sur le titre pour que le lecteur d'écran
  // annonce la nouvelle page.
  // On compare avec la route précédente : l'effet se relance aussi quand
  // `lenis` arrive (juste après le chargement), et là il ne doit rien faire.
  const previousRoute = useRef(route);
  useEffect(() => {
    if (previousRoute.current === route) return;
    previousRoute.current = route;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    document.getElementById('page-title')?.focus({ preventScroll: true });
    document.title =
      route === 'home'
        ? 'Stanley Coute (Phước Lan) · Développeur web full-stack'
        : 'Expense Tracker · Étude de cas · Stanley Coute';
  }, [route, lenis]);

  return (
    <>
      {/* Défilement doux, coupé si le visiteur préfère moins d'animations. */}
      {!reduced && <ReactLenis root options={{ lerp: 0.12 }} />}
      <LotusSymbols />
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <Header
        isHome={route === 'home'}
        theme={theme}
        onToggleTheme={toggleTheme}
        onGoHome={() => go('home')}
      />
      {route === 'home' ? (
        <Home onOpenCase={() => go('expense-tracker')} />
      ) : (
        <CaseStudy onBack={() => go('home')} />
      )}
      <Footer />
      <Shutter ref={shutterRef} />
    </>
  );
}
