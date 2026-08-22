/* Input — GlobeTrotter Component */
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({
  label,
  id,
  error,
  hint,
  leftIcon,
  rightElement,
  size = 'md',
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`${styles.group} ${className}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {props.required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={`${styles.wrapper} ${error ? styles['wrapper-error'] : ''} ${styles[`size-${size}`]}`}>
        {leftIcon && <span className={styles['left-icon']}>{leftIcon}</span>}
        <input
          ref={ref}
          id={id}
          className={styles.input}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {rightElement && <span className={styles['right-el']}>{rightElement}</span>}
      </div>
      {error && <p id={`${id}-error`} className={styles.error} role="alert">{error}</p>}
      {hint && !error && <p id={`${id}-hint`} className={styles.hint}>{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
