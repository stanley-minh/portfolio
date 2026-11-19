import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Polices auto-hébergées (Fontsource) : aucune requête vers Google, donc
// pas d'adresse IP du visiteur transmise à un tiers (RGPD).
import '@fontsource-variable/archivo/wdth.css'; // graisse ET largeur variables (font-stretch 62 à 125 %)
import '@fontsource/be-vietnam-pro/400.css';
import '@fontsource/be-vietnam-pro/500.css';
import '@fontsource/be-vietnam-pro/400-italic.css';

// Styles de Lenis (défilement doux), puis nos tokens, puis nos styles globaux.
// L'ordre compte : chaque fichier peut s'appuyer sur le précédent.
import 'lenis/dist/lenis.css';
import './styles/tokens.css';
import './styles/global.css';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
