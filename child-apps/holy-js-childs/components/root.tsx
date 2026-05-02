import React from 'react';

export interface RootCmpProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary';
  disabled?: boolean;
}

const variantStyles: Record<string, string> = {
  default: 'background-color: #f0f0f0; border-color: #ccc;',
  primary: 'background-color: #007bff; border-color: #007bff; color: white;',
  secondary: 'background-color: #6c757d; border-color: #6c757d; color: white;',
};

export const RootCmp: React.FC<RootCmpProps> = ({
  title = 'Привет!',
  subtitle = 'Ведьмы от мира тестирования рады видеть вас на нашем воркшопе 🧚‍',
  buttonText = 'Нажми меня',
  onButtonClick,
  variant = 'default',
  disabled = false,
}) => {
  const containerStyle: React.CSSProperties = {
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#333',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.5',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: variant === 'default' ? '#f0f0f0' : variant === 'primary' ? '#007bff' : '#6c757d',
    borderColor: variant === 'default' ? '#ccc' : variant === 'primary' ? '#007bff' : '#6c757d',
    color: variant === 'default' ? '#333' : 'white',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{title}</h2>
      <p style={subtitleStyle}>{subtitle}</p>
      <button
        style={buttonStyle}
        onClick={onButtonClick}
        disabled={disabled}
        onMouseEnter={(e) => {
          if (!disabled) {
            (e.currentTarget as HTMLElement).style.opacity = '0.8';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            (e.currentTarget as HTMLElement).style.opacity = '1';
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};
