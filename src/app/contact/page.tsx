import styles from './page.module.css';

export default function Contact() {
  return (
    <div className={styles.page}>
      <section className={`${styles.hero} grain`}>
        <p className={styles.wayfinding}>CONTACT / 05</p>
        <h1 className={styles.title}>
          Say
          <br />
          hello.
        </h1>
        <p className={styles.lede}>
          Based in Melbourne. Open to collaborations, AI builds, data problems,
          and sharp conversations.
        </p>
      </section>

      <section className={styles.grid}>
        <a
          href="mailto:saivanamalisimhambhatla@gmail.com"
          className={`${styles.block} ${styles.email} grain`}
        >
          <span className={styles.label}>Email</span>
          <span className={styles.value}>
            saivanamalisimhambhatla@gmail.com
          </span>
          <span className={styles.arrow}>→</span>
        </a>

        <a href="tel:+61489196006" className={`${styles.block} ${styles.phone} grain`}>
          <span className={styles.label}>Phone</span>
          <span className={styles.value}>+61 0489 196 006</span>
          <span className={styles.arrow}>→</span>
        </a>

        <div className={`${styles.block} ${styles.place} grain`}>
          <span className={styles.label}>Location</span>
          <span className={styles.value}>Melbourne, Australia</span>
        </div>

        <a
          href="https://www.linkedin.com/in/van-sims"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.block} ${styles.social} grain`}
        >
          <span className={styles.label}>LinkedIn</span>
          <span className={styles.value}>van-sims</span>
          <span className={styles.arrow}>→</span>
        </a>
      </section>
    </div>
  );
}
