import { CONTACT, prettyUrl } from '../data/site';
import { CodeIcon, DownloadIcon, MailIcon, ProfileIcon } from './Icons';
import { LotusIcon } from './LotusSymbols';
import styles from './Contact.module.css';

/**
 * Contact : la carte sort d'une enveloppe rouge de Tết (bao lì xì).
 * L'enveloppe est décorative (aria-hidden) ; les liens, eux, restent
 * toujours visibles, sans clic ni animation à déclencher.
 */
export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={`wrap ${styles.pair}`}>
        <div>
          <h2 id="contact-title" className={styles.title}>
            Me contacter
          </h2>
          <p className={styles.text}>
            Je recherche une entreprise pour préparer le titre DWWM en alternance. N'hésitez pas à me contacter.
          </p>
        </div>

        <div className={styles.envelope}>
          <div className={styles.flap} aria-hidden="true" />
          <div className={styles.back} aria-hidden="true" />
          <div className={styles.card}>
            <ul className={styles.links}>
              <li>
                <a href={`mailto:${CONTACT.email}`} className={`btn btn--ghost ${styles.link} ${styles.email}`}>
                  <MailIcon />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.github} className={`btn btn--ghost ${styles.link}`}>
                  <CodeIcon />
                  {prettyUrl(CONTACT.github)}
                </a>
              </li>
              <li>
                <a href={CONTACT.linkedin} className={`btn btn--ghost ${styles.link}`}>
                  <ProfileIcon />
                  {prettyUrl(CONTACT.linkedin)}
                </a>
              </li>
              {/* L'action principale de la carte : bouton plein, comme dans l'en-tête. */}
              <li>
                <a href={CONTACT.cv} className={`btn btn--dark ${styles.link} ${styles.cv}`} download>
                  <DownloadIcon />
                  Télécharger le CV (PDF)
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.pocket} aria-hidden="true">
            <LotusIcon id="lotus-red" size={64} />
          </div>
        </div>
      </div>
    </section>
  );
}
