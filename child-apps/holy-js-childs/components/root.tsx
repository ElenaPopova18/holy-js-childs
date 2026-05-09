import React from 'react';
import styles from './root.module.css';
import { ButtonManager, getButtonVariantClass } from './root.utils';

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
  const buttonManager = new ButtonManager();
  buttonManager.scheduleClick('Button clicked!');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <button
        type="button"
        className={`${styles.button} ${getButtonVariantClass(variant, disabled, buttonText, onButtonClick)} ${
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
