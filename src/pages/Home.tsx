import { Contact } from '../components/Contact';
import { Hero } from '../components/Hero';
import { Parcours } from '../components/Parcours';
import { Projects } from '../components/Projects';

interface HomeProps {
  onOpenCase: () => void;
}

/** La page d'accueil : on la lit de haut en bas, dans cet ordre. */
export function Home({ onOpenCase }: HomeProps) {
  return (
    <main id="contenu" tabIndex={-1} style={{ outline: 'none' }}>
      <Hero />
      <Parcours />
      <Projects onOpenCase={onOpenCase} />
      <Contact />
    </main>
  );
}
