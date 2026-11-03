'use client';

import { OPEN_COMMAND_EVENT } from './CommandPalette';
import styles from './Navbar.module.css';

/** Opens the command palette: "⌘K" on desktop, "Menu" on phones. */
export default function CommandButton() {
  return (
    <button
      type="button"
      className={styles.command}
      onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_EVENT))}
      aria-label="Open command menu"
      aria-keyshortcuts="Meta+K Control+K"
    >
      <span className={styles.commandDesktop} aria-hidden="true">
        <span className="kbd">⌘K</span>
      </span>
      <span className={styles.commandMobile} aria-hidden="true">
        Menu
      </span>
    </button>
  );
}
