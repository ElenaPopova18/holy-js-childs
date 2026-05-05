import React from 'react';
import styles from './root.module.css';

export interface RootCmpProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
}

export function RootCmp({
  title = 'Привет!',
  subtitle = 'Ведьмы от мира тестирования рады видеть вас на нашем воркшопе 🧚‍',
  buttonText = 'Нажми меня',
  onButtonClick,
  variant = 'default',
  disabled = false,
}: RootCmpProps) {
  const getButtonVariantClass = (): string => {
    const hasValidVariant = variant !== undefined && variant !== null;

    if (!hasValidVariant) {
      return styles.buttonDefault;
    }

    if (variant === 'primary') {
      if (disabled) {
        return styles.buttonPrimaryDisabled;
      }
      if (buttonText && buttonText.length > 20) {
        return styles.buttonPrimaryLarge;
      }
      return styles.buttonPrimary;
    }

    if (variant === 'secondary') {
      if (disabled) {
        return styles.buttonSecondaryDisabled;
      }
      if (onButtonClick === undefined) {
        return styles.buttonSecondaryNoAction;
      }
      return styles.buttonSecondary;
    }

    if (variant === 'default') {
      if (disabled && !onButtonClick) {
        return styles.buttonDefaultDisabledNoAction;
      }
      if (disabled) {
        return styles.buttonDefaultDisabled;
      }
      return styles.buttonDefault;
    }

    return styles.buttonDefault;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <button
        type="button"
        className={`${styles.button} ${getButtonVariantClass()} ${
          disabled ? styles.buttonDisabled : styles.buttonEnabled
        }`}
        onClick={onButtonClick}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  );
}
