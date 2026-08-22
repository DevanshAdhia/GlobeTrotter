/* EmptyState — GlobeTrotter Component */
import Button from './Button';
import styles from './EmptyState.module.css';

const EmptyState = ({
  icon,
  title,
  description,
  action,
  actionLabel,
  size = 'md',
}) => {
  return (
    <div className={`${styles.container} ${styles[`size-${size}`]}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      {action && actionLabel && (
        <Button onClick={action} variant="primary" className={styles.btn}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
