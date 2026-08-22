/* ProgressBar — GlobeTrotter Component */
import styles from './ProgressBar.module.css';

const ProgressBar = ({ value = 0, max = 100, variant = 'primary', size = 'md', label, showPercent = false }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={styles.container}>
      {(label || showPercent) && (
        <div className={styles.meta}>
          {label && <span className={styles.label}>{label}</span>}
          {showPercent && <span className={styles.pct}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`${styles.track} ${styles[`track-${size}`]}`}>
        <div
          className={`${styles.fill} ${styles[`fill-${variant}`]}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
