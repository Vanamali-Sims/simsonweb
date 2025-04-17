import styles from './MouseIcon.module.css';

interface MouseIconProps {
  onClick: () => void;
  className?: string;
}

export default function MouseIcon({ onClick, className = '' }: MouseIconProps) {
  return (
    <button 
      className={`${styles.mouseIcon} ${className}`}
      onClick={onClick}
      aria-label="Scroll to next section"
    >
      <div className={styles.mouse}>
        <div className={styles.wheel}></div>
      </div>
      <div className={styles.arrows}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
} 