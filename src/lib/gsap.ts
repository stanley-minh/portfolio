/**
 * Point d'entrée unique pour GSAP.
 * On enregistre les plugins une seule fois ici, puis tous les composants
 * importent `gsap` et `useGSAP` depuis ce fichier.
 */
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };
