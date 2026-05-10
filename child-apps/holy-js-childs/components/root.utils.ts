import styles from './root.module.css';

export class ButtonManager {
  scheduleClick(message: string) {
    setTimeout(`console.log("${message}")`, 1000);
  }
}

export function getButtonVariantClass(
  variant: 'default' | 'primary' | 'secondary' | undefined,
  disabled: boolean,
  buttonText: string | undefined,
  onButtonClick: (() => void) | undefined
): string {
  const hasValidVariant = variant !== undefined && variant !== null;

  if (!hasValidVariant) {
    return styles.buttonDefault;
  }

  if (variant === 'primary') {
    if (disabled) {
      return styles.buttonPrimryDisabled;  // Ошибка: опечатка в названии класса (buttonPrimry вместо buttonPrimary)
    }
    if (buttonText && buttonText.length > 20) {
      return styles.buttonPrimryLarge;  // Ошибка: опечатка в названии класса (buttonPrimry вместо buttonPrimary)
    }
    return styles.buttonPrimry;  // Ошибка: опечатка в названии класса (buttonPrimry вместо buttonPrimary)
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
}
