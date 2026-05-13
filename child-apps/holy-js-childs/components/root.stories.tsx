import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RootCmp } from './root';

const meta = {
  title: 'ChildApp/RootCmp',
  component: RootCmp,
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
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Вариант оформления кнопки',
    },
    title: {
      control: 'text',
      description: 'Заголовок компонента',
    },
    subtitle: {
      control: 'text',
      description: 'Подзаголовок компонента',
    },
    buttonText: {
      control: 'text',
      description: 'Текст кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние кнопки',
    },
    cornerLabel: {
      control: 'text',
      description: 'Текст лейбла в углу',
    },
    cornerLabelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция лейбла (слева/справа)',
    },
    showSecretMessage: {
      control: 'boolean',
      description: 'Показывать секретное сообщение после 5 кликов',
    },
    maxWitches: {
      control: 'number',
      description: 'Максимальное количество ведьм',
    },
    celebrationMode: {
      control: 'boolean',
      description: 'Режим празднования каждые 5 кликов',
    },
    onButtonClick: {
      action: 'clicked',
      description: 'Обработчик клика по кнопке',
    },
  },
} satisfies Meta<typeof RootCmp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Базовый вариант компонента с кнопкой default стиля.',
      },
    },
    testDescription: 'Базовый вариант компонента с кнопкой default стиля.',
  },
  args: {
    variant: 'default',
  },
};

export const PrimaryVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Кнопка синего цвета (primary стиль).',
      },
    },
    testDescription: 'Кнопка синего цвета (primary стиль).',
  },
  args: {
    variant: 'primary',
  },
};

export const SecondaryVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Кнопка серого цвета (secondary стиль).',
      },
    },
    testDescription: 'Кнопка серого цвета (secondary стиль).',
  },
  args: {
    variant: 'secondary',
  },
};

export const CustomTexts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Компонент с кастомными заголовком, подзаголовком и текстом кнопки.',
      },
    },
    testDescription: 'Компонент с кастомными заголовком, подзаголовком и текстом кнопки.',
  },
  args: {
    title: 'Добро пожаловать!',
    subtitle:
      'Это пример компонента с настраиваемым текстом. Вы можете изменить любой текст через пропсы.',
    buttonText: 'Начать работу',
  },
};

export const DisabledButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Неактивная кнопка (disabled: true) — проверяет отображение disabled состояния.',
      },
    },
    testDescription: 'Неактивная кнопка (disabled: true) — проверяет отображение disabled состояния.',
  },
  args: {
    disabled: true,
    variant: 'primary',
  },
};

export const WithClickHandler: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Кнопка с обработчиком клика, который вызывает alert.',
      },
    },
    testDescription: 'Кнопка с обработчиком клика, который вызывает alert.',
  },
  args: {
    variant: 'primary',
    onButtonClick: () => {

      alert('Кнопка нажата! Ведьма призвана! 🧙‍♀️');
    },
  },
};

export const FullyCustomized: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Полностью кастомизированный компонент с эмодзи и праздничным настроением.',
      },
    },
    testDescription: 'Полностью кастомизированный компонент с эмодзи и праздничным настроением.',
  },
  args: {
    variant: 'primary',
    title: '🎉 Супер компонент',
    subtitle: 'Нажми на кнопку и случится магия!',
    buttonText: 'Призвать ведьму 🧙‍♀️',
  },
};

export const SecretMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Компонент с секретным сообщением, которое появляется после 5 кликов.',
      },
    },
    testDescription: 'Секретное сообщение появляется после 5 кликов.',
  },
  args: {
    variant: 'primary',
    showSecretMessage: true,
    title: '🔮 Тайное заклинание',
    subtitle: 'Кликни 5 раз и узнаешь секрет!',
  },
};
