/* Badge — GlobeTrotter Component */
import styles from './Badge.module.css';

const Badge = ({ children, variant = 'default', size = 'sm', dot = false, className = '' }) => {
  return (
    <span className={`${styles.badge} ${styles[`badge-${variant}`]} ${styles[`badge-${size}`]} ${className}`}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
};

export default Badge;
