/* Card — GlobeTrotter Component */
import styles from './Card.module.css';

const Card = ({ children, className = '', hover = false, onClick, padding = 'md' }) => {
  return (
    <div
      className={`${styles.card} ${hover ? styles['card-hover'] : ''} ${onClick ? styles.clickable : ''} ${styles[`pad-${padding}`]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '' }) => (
  <div className={`${styles.header} ${className}`}>{children}</div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`${styles.body} ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`${styles.footer} ${className}`}>{children}</div>
);

export default Card;
