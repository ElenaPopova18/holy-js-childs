import React, { useEffect, useState } from 'react';
import styles from './root.module.css';
import { ButtonManager, getButtonVariantClass } from './root.utils';

export interface RootCmpProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
  cornerLabel?: string;
  cornerLabelPosition?: 'left' | 'right';
  showSecretMessage?: boolean;
  maxWitches?: number;
  celebrationMode?: boolean;
}

export function RootCmp({
  title = 'Привет!!!',
  subtitle = 'Ведьмы от мира тестирования рады видеть вас на нашем воркшопе 🧚‍',
  buttonText = 'Нажми меня',
  onButtonClick,
  variant = 'default',
  disabled = false,
  cornerLabel,
  cornerLabelPosition,
  showSecretMessage = false,
  maxWitches = 10,
  celebrationMode = false,
}: RootCmpProps) {
  // // ОШИБКА ССР: обращение к window в теле компонента вызовет падение сервера
  // if (typeof window === 'undefined') {
  //   throw new Error('SSR ERROR: window is not available on server! This is intentional for demo purposes.');
  // }
  //const screenWidth = window.innerWidth;
  const [clickCount, setClickCount] = useState(0);
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [witches, setWitches] = useState<string[]>([]);

  // Вычисляем класс лейбла только когда лейбл передан
  // Это нужно чтобы обе ветки (left/right) были не покрыты в coverage
  // когда нет сторисов с cornerLabel
  const getCornerLabelClass = () => {
    if (cornerLabelPosition === 'right') {
      return styles.cornerLabelRight;
    }
    return styles.cornerLabelLeft;
  };

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
    if (witches.length < maxWitches) {
      setWitches((prev) => [...prev, '🧙‍♀️']);
    }
    onButtonClick?.();
  };

  return (
    <div className={styles.container}>
      {cornerLabel && (
        <div className={`${styles.cornerLabel} ${getCornerLabelClass()}`}>
          {cornerLabel}
        </div>
      )}
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
          <>
            <div className={styles.witchesRow}>{witches.join(' ')}</div>
            {witches.length >= maxWitches && (
              <p className={styles.witchesLimit}>
                ✨ Достигнут лимит ведьм! ({maxWitches})
              </p>
            )}
          </>
        ) : (
          <span className={styles.witchesEmpty}>
            Нажми на кнопку, чтобы призвать ведьму!
          </span>
        )}
      </div>

      {showSecretMessage && clickCount > 5 && (
        <div className={styles.secretMessage}>
          🎉 Секретное сообщение: Ты настоящий мастер призыва ведьм!
        </div>
      )}

      {celebrationMode && clickCount > 0 && clickCount % 5 === 0 && (
        <div className={styles.celebrationBlock}>
          🎊🎈🎁 Поздравляем с {clickCount} кликами! 🎁🎈🎊
        </div>
      )}

      {(() => {
        // ButtonManager используется для обработки кликов
        const buttonManager = new ButtonManager();
        const handleManagerClick = () => {
          buttonManager.scheduleClick(`Witch summon #${clickCount + 1}`);
        };

        return (
          <button
            type="button"
            className={getButtonVariantClass(
              variant,
              disabled,
              buttonText,
              onButtonClick
            )}
            onClick={() => {
              handleManagerClick();
              handleClick();
            }}
            disabled={disabled}
          >
            {buttonText} {witches.length > 0 && `(${witches.length})`}
          </button>
        );
      })()}
    </div>
  );
}
