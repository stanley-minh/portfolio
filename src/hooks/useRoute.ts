import { useCallback, useSyncExternalStore } from 'react';

/** Les deux « pages » du site. */
export type Route = 'home' | 'expense-tracker';

const ROUTE_HASH: Record<Route, string> = {
  home: '',
  'expense-tracker': '#/projets/expense-tracker',
};

/**
 * Lit la route dans l'URL.
 * Les routes commencent par « #/ » ; les ancres simples (#parcours, #contact)
 * restent des ancres de la page d'accueil.
 */
function readRoute(): Route {
  return window.location.hash.startsWith(ROUTE_HASH['expense-tracker']) ? 'expense-tracker' : 'home';
}

// pushState ne déclenche aucun événement : on prévient nous-mêmes les abonnés.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener('popstate', onChange); // boutons Précédent / Suivant
  window.addEventListener('hashchange', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('popstate', onChange);
    window.removeEventListener('hashchange', onChange);
  };
}

/**
 * Mini-routeur par hash, sans dépendance.
 *
 * Pourquoi un hash (#/projets/…) plutôt qu'un vrai chemin (/projets/…) ?
 * Le site reste un simple dossier de fichiers statiques : n'importe quel
 * hébergeur (GitHub Pages, Netlify…) le sert sans configuration, et
 * l'adresse de l'étude de cas peut quand même être partagée.
 * Quand le site grandira, React Router prendra le relais.
 */
export function useRoute() {
  const route = useSyncExternalStore(subscribe, readRoute, () => 'home' as Route);

  /**
   * Change de page sans recharger.
   * @param to la page visée
   * @param section sur l'accueil, l'id de la section où arriver (ex. « projets ») :
   *   l'adresse devient …/portfolio/#projets, que readRoute() lit bien comme l'accueil.
   */
  const navigate = useCallback((to: Route, section?: string) => {
    const home = window.location.pathname + window.location.search + (section ? `#${section}` : '');
    const url = ROUTE_HASH[to] || home;
    window.history.pushState(null, '', url);
    listeners.forEach((notify) => notify());
  }, []);

  return { route, navigate };
}
