import styles from './AnimatedBackground.module.css';

export default function AnimatedBackground() {
  return (
    <div className={styles.background}>
      <div className={styles.noise} />
      <div className={styles.grid} />
      <div className={styles.floatingPoints}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles.point}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>
      <div className={styles.cornerDecorations}>
        <div className={styles.topLeft}>
          {[...Array(3)].map((_, i) => (
            <div key={`tl-${i}`} className={styles.line} style={{ transform: `rotate(${45 + i * 15}deg)` }} />
          ))}
        </div>
        <div className={styles.topRight}>
          {[...Array(3)].map((_, i) => (
            <div key={`tr-${i}`} className={styles.line} style={{ transform: `rotate(${-45 - i * 15}deg)` }} />
          ))}
        </div>
        <div className={styles.bottomLeft}>
          {[...Array(3)].map((_, i) => (
            <div key={`bl-${i}`} className={styles.line} style={{ transform: `rotate(${-45 + i * 15}deg)` }} />
          ))}
        </div>
        <div className={styles.bottomRight}>
          {[...Array(3)].map((_, i) => (
            <div key={`br-${i}`} className={styles.line} style={{ transform: `rotate(${45 - i * 15}deg)` }} />
          ))}
        </div>
      </div>
    </div>
  );
} 