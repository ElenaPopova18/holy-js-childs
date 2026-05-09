import React, { useEffect, useState } from 'react';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _onButtonClick = onButtonClick;
  const [clickCount, setClickCount] = useState(0);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [witches, setWitches] = useState<string[]>([]);

  // Логгируем активность пользователя каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      setActivityLog((prev) => [
        ...prev.slice(-4),
        `${timestamp} — кликов: ${clickCount}`,
      ]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    setClickCount(clickCount + 1);
    setWitches((prev) => [...prev, '🧙‍♀️']);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>

      <div className={styles.statsBlock}>
        <div className={styles.statsRow}>
          <span>Всего кликов:</span>
          <strong>{clickCount}</strong>
        </div>
        <div className={styles.statsRow}>
          <span>Ведьм в команде:</span>
          <strong>{witches.length}</strong>
        </div>
      </div>

      <div className={styles.logBlock}>
        <div className={styles.logTitle}>
          📋 Активность (лог каждую секунду):
        </div>
        {activityLog.length === 0 ? (
          <p className={styles.logEmpty}>Кликни на кнопку — появится лог</p>
        ) : (
          activityLog.map((log, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <p key={idx} className={styles.logEntry}>
              [{log}]
            </p>
          ))
        )}
      </div>

      <div className={styles.witchesBlock}>
        {witches.length > 0 ? (
          witches.join(' ')
        ) : (
          <span className={styles.witchesEmpty}>
            Нажми на кнопку, чтобы призвать ведьму!
          </span>
        )}
      </div>

      <button
        type="button"
        className={(() => {
          if (variant === 'secondary') return styles.buttonSecondary;
          if (variant === 'primary') return styles.buttonPrimary;
          return styles.buttonDefault;
        })()}
        onClick={handleClick}
        disabled={disabled}
      >
        {buttonText} {witches.length > 0 && `(${witches.length})`}
      </button>
    </div>
  );
}
