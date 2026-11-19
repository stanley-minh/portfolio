import { IDENTITY } from '../data/site';
import styles from './Footer.module.css';

// Calculée une fois au chargement : un composant doit rendre le même résultat à chaque rendu.
const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={`on-red ${styles.footer}`}>
      <div className={`wrap ${styles.inner}`}>
        <p>Le métal, la terre et le lotus.</p>
        <p>© {YEAR} {IDENTITY.name}</p>
      </div>
    </footer>
  );
}
