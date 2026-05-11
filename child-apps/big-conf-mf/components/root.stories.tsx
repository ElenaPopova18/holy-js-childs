import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BigConfMf } from './root';

const meta = {
  title: 'ChildApp/BigConfMf',
  component: BigConfMf,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => (
      <div style={{ marginBottom: '24px' }}>
        {context.parameters.testDescription && (
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            🧪 <strong>Проверка:</strong> {context.parameters.testDescription}
          </div>
        )}
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BigConfMf>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    background: '#f5f5f5',
    panel: {
      color: {
        style: 'outline',
      },
      size: 'm',
      imagePosition: 'left',
      title: {
        text: 'Добро пожаловать!',
        size: 'l',
        htmlTag: 'h2',
      },
      description: {
        text: 'Это пример панели с настраиваемыми параметрами. Вы можете изменить любой параметр через панель управления Storybook.',
        htmlTag: 'div',
      },
      image: {
        alt: 'Император Таро',
        title: 'Император',
        image: {
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/500px-RWS_Tarot_04_Emperor.jpg',
        },
        imageAlign: 'center',
      },
      button: {
        active: true,
        text: 'Нажми меня',
        color: {
          style: 'primary',
        },
        onClick: {
          action: 'goToLink',
          url: 'https://example.com',
          targetBlank: true,
        },
      },
    },
  },
};

export const ShadowPanel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Панель с тенью (shadow style), белым фоном, позицией изображения справа и кнопкой secondary стиля.',
      },
    },
    testDescription:
      'Панель с тенью (shadow style), белым фоном, позицией изображения справа и кнопкой secondary стиля.',
  },
  args: {
    background: '#e8e8e8',
    panel: {
      color: {
        style: 'shadow',
        background: '#ffffff',
      },
      size: 'l',
      imagePosition: 'right',
      title: {
        text: 'Панель с тенью',
        size: 'l',
        htmlTag: 'h1',
      },
      description: {
        text: 'Эта панель использует стиль shadow с белым фоном и тенью.',
        htmlTag: 'div',
      },
      image: {
        alt: 'Император Таро',
        title: 'Император',
        image: {
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/500px-RWS_Tarot_04_Emperor.jpg',
        },
        imageAlign: 'top',
      },
      button: {
        active: true,
        text: 'Узнать больше',
        color: {
          style: 'secondary',
        },
        onClick: {
          action: 'goToBlock',
          url: '#section',
        },
      },
    },
  },
};

export const CustomPanel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Кастомный стиль панели с пунктирной границей, изображением с srcset и webpSrcset для разных разрешений, кнопка custom стиля.',
      },
    },
    testDescription:
      'Кастомный стиль панели с пунктирной границей, изображением с srcset и webpSrcset для разных разрешений, кнопка custom стиля.',
  },
  args: {
    background: '#f0f0ff',
    panel: {
      color: {
        style: 'custom',
      },
      size: 'm',
      imagePosition: 'left',
      title: {
        text: 'Кастомная панель',
        size: 's',
        htmlTag: 'h3',
      },
      description: {
        text: 'Панель с кастомным оформлением (пунктирная граница).',
        htmlTag: 'div',
      },
      image: {
        alt: 'Император Таро',
        title: 'Император',
        image: {
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/500px-RWS_Tarot_04_Emperor.jpg',
          srcset: [
            {
              src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/1000px-RWS_Tarot_04_Emperor.jpg',
              condition: '2x',
            },
            {
              src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/1500px-RWS_Tarot_04_Emperor.jpg',
              condition: '3x',
            },
          ],
          webpSrcset: [
            {
              src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/500px-RWS_Tarot_04_Emperor.jpg',
              condition: '1x',
            },
            {
              src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/1000px-RWS_Tarot_04_Emperor.jpg',
              condition: '2x',
            },
          ],
        },
        imageAlign: 'center',
      },
      button: {
        active: true,
        text: 'Действие',
        color: {
          style: 'custom',
          backgroundColor: '#6f42c1',
        },
        onClick: {
          action: 'callFormEvent',
          eventName: 'customAction',
        },
      },
    },
  },
};

export const TextLinkButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Кнопка в стиле текстовой ссылки (textLink) с атрибутами nofollow и targetBlank для внешних ссылок.',
      },
    },
    testDescription:
      'Кнопка в стиле текстовой ссылки (textLink) с атрибутами nofollow и targetBlank для внешних ссылок.',
  },
  args: {
    panel: {
      color: {
        style: 'color',
        background: '#f0fff0',
      },
      size: 's',
      imagePosition: 'left',
      title: {
        text: 'Панель с текстовой ссылкой',
        size: 's',
        htmlTag: 'h4',
      },
      description: {
        text: 'Кнопка в стиле текстовой ссылки.',
        htmlTag: 'div',
      },
      image: {
        alt: '',
        title: '',
        image: {
          src: '',
        },
        imageAlign: 'center',
      },
      button: {
        active: true,
        text: 'Читать далее →',
        color: {
          style: 'textLink',
        },
        onClick: {
          action: 'goToLink',
          url: 'https://example.com/article',
          targetBlank: true,
          nofollow: true,
        },
      },
    },
  },
};

export const OutlineDarkButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Тёмная тема фона (#1a1a2e) с кнопкой outlineDark стиля, изображение расположено снизу.',
      },
    },
    testDescription:
      'Тёмная тема фона (#1a1a2e) с кнопкой outlineDark стиля, изображение расположено снизу.',
  },
  args: {
    background: '#1a1a2e',
    panel: {
      color: {
        style: 'outline',
      },
      size: 'm',
      imagePosition: 'right',
      title: {
        text: 'Тёмная тема',
        size: 'l',
        htmlTag: 'h2',
      },
      description: {
        text: 'Панель с тёмным фоном и кнопкой outlineDark.',
        htmlTag: 'div',
      },
      image: {
        alt: 'Император Таро',
        title: 'Император',
        image: {
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/500px-RWS_Tarot_04_Emperor.jpg',
        },
        imageAlign: 'bottom',
      },
      button: {
        active: true,
        text: 'Связаться',
        color: {
          style: 'outlineDark',
        },
        onClick: {
          action: 'showBlock',
          url: '#contact',
        },
      },
    },
  },
};

export const DisabledButton: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Неактивная кнопка (active: false) — проверяет отображение disabled состояния.',
      },
    },
    testDescription:
      'Неактивная кнопка (active: false) — проверяет отображение disabled состояния.',
  },
  args: {
    panel: {
      color: {
        style: 'shadow',
      },
      size: 'm',
      imagePosition: 'left',
      title: {
        text: 'Неактивная кнопка',
        size: 'l',
        htmlTag: 'h2',
      },
      description: {
        text: 'Кнопка в неактивном состоянии.',
        htmlTag: 'div',
      },
      image: {
        alt: '',
        title: '',
        image: {
          src: '',
        },
        imageAlign: 'center',
      },
      button: {
        active: false,
        text: 'Недоступно',
        color: {
          style: 'primary',
        },
      },
    },
  },
};

export const NoImage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Панель без изображения (пустой src) — проверяет отображение только с заголовком, описанием и кнопкой.',
      },
    },
    testDescription:
      'Панель без изображения (пустой src) — проверяет отображение только с заголовком, описанием и кнопкой.',
  },
  args: {
    background: '#fff8e1',
    panel: {
      color: {
        style: 'color',
        background: '#fff3cd',
      },
      size: 'm',
      imagePosition: 'left',
      title: {
        text: 'Панель без изображения',
        size: 'l',
        htmlTag: 'h2',
      },
      description: {
        text: 'Эта панель отображается без изображения, только с заголовком, описанием и кнопкой.',
        htmlTag: 'div',
      },
      image: {
        alt: '',
        title: '',
        image: {
          src: '',
        },
        imageAlign: 'center',
      },
      button: {
        active: true,
        text: 'Продолжить',
        color: {
          style: 'outline',
        },
        onClick: {
          action: 'goToLink',
          url: '#next',
        },
      },
    },
  },
};

export const AllButtonStyles: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Все 7 стилей кнопок (primary, secondary, outline, outlineDark, outlineLight, textLink, custom) в одном списке для сравнения визуальных оформлений.',
      },
    },
    testDescription:
      'Все 7 стилей кнопок (primary, secondary, outline, outlineDark, outlineLight, textLink, custom) в одном списке для сравнения визуальных оформлений.',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {(
        [
          'primary',
          'secondary',
          'outline',
          'outlineDark',
          'outlineLight',
          'textLink',
          'custom',
        ] as const
      ).map((style) => (
        <BigConfMf
          key={style}
          panel={{
            color: { style: 'shadow' },
            size: 's',
            imagePosition: 'left',
            title: { text: `Кнопка: ${style}`, size: 's', htmlTag: 'h4' },
            description: { text: `Стиль кнопки: ${style}`, htmlTag: 'div' },
            image: {
              alt: '',
              title: '',
              image: { src: '' },
              imageAlign: 'center',
            },
            button: {
              active: true,
              text: `Кнопка ${style}`,
              color: { style },
              onClick: { action: 'goToLink', url: '#' },
            },
          }}
        />
      ))}
    </div>
  ),
};
