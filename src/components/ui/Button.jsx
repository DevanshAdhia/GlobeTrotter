/* ============================================================
   Button — GlobeTrotter Component
   ============================================================ */
import { forwardRef } from 'react';
import styles from './Button.module.css';

const Button = forwardRef(({
  children,
  variant = 'primary',   // primary | secondary | ghost | danger | outline
  size = 'md',           // sm | md | lg
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  as: Tag = 'button',
  className = '',
  ...props
}, ref) => {
  const classes = [
    styles.btn,
    styles[`btn-${variant}`],
    styles[`btn-${size}`],
    fullWidth ? styles['btn-full'] : '',
    loading   ? styles['btn-loading'] : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true" />
      )}
      {!loading && leftIcon && (
        <span className={styles.icon}>{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className={styles.icon}>{rightIcon}</span>
      )}
    </Tag>
  );
});

Button.displayName = 'Button';
export default Button;
