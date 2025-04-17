import styles from './page.module.css';

export default function MyStory() {
  return (
    <main className={styles.page}>
      <div className={styles.background}>
        <div className={styles.noise} />
        <div className={styles.grid} />
      </div>

      <section className={styles.section}>
        <div className={styles.card}>
          <h1 className={styles.title}>My Story</h1>
          <div className={styles.content}>
            <p>
              Hey! I'm Simon Van Meervenne, a Full Stack Developer and Music Producer with a passion for 
              creating digital experiences that blend technology and creativity.
            </p>
            <p>
              Based in Belgium, I bring a unique perspective to everything I create. When I'm not crafting 
              web experiences or writing code, you'll find me in my studio producing music or exploring 
              new technologies.
            </p>
            <p>
              I believe in the power of technology to create meaningful experiences, whether that's through 
              innovative web applications, immersive user interfaces, or the perfect musical composition.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span>→</span> Interests & Expertise
          </h2>
          <div className={styles.interestsGrid}>
            {[
              'Full Stack Development',
              'UI/UX Design',
              'Music Production',
              'Electronic Music',
              'Creative Coding',
              'Web3 Technologies',
              'AI & Machine Learning',
              'Open Source',
              'Sound Design',
            ].map((interest) => (
              <div key={interest} className={styles.interestTag}>
                {interest}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            <span>→</span> Journey So Far
          </h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <span className={styles.timelineYear}>2024</span>
              <p>Exploring the intersection of AI and creative development</p>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.timelineYear}>2023</span>
              <p>Launched several successful web applications and released new music</p>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.timelineYear}>2022</span>
              <p>Started focusing on full-stack development and modern web technologies</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 