'use client';

interface ScrollIndicatorProps {
  styles: {
    [key: string]: string;
  };
}

export default function ScrollIndicator({ styles }: ScrollIndicatorProps) {
  const handleScroll = () => {
    const sections = document.querySelectorAll(`.${styles.section}`);
    if (sections.length > 1) {
      const exploringSection = sections[1];
      const navHeight = 80; // Approximate navbar height
      const targetPosition = exploringSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button 
      className={styles.scrollIndicator}
      onClick={handleScroll}
      aria-label="Scroll to next section"
    >
      <div className={styles.mouse}>
        <div className={styles.wheel} />
      </div>
      <div className={styles.arrows}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
} 