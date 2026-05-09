import React, { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/test';
import { RootCmp } from './root';

const meta = {
  title: 'ChildApp/RootCmp',
  component: RootCmp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
      description: 'Вариант оформления кнопки',
    },
    backgroundColor: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Фон компонента (светлый/тёмный)',
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
  args: {
    variant: 'default',
    backgroundColor: 'light',
  },
};

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
  },
};

export const SecondaryVariant: Story = {
  args: {
    variant: 'secondary',
    backgroundColor: 'light',
  },
};

export const CustomTexts: Story = {
  args: {
    title: 'Добро пожаловать!',
    subtitle:
      'Это пример компонента с настраиваемым текстом. Вы можете изменить любой текст через пропсы.',
    buttonText: 'Начать работу',
    backgroundColor: 'light',
  },
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
    variant: 'primary',
    backgroundColor: 'light',
  },
};

export const WithClickHandler: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
    onButtonClick: () => {
      // eslint-disable-next-line no-alert
      alert('Кнопка нажата! 🎉');
    },
  },
};

export const WithWitchLimit: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
    maxWitches: 5,
  },
  render: function Render(args) {
    const clickCountRef = useRef(0);
    const [displayCount, setDisplayCount] = React.useState(0);

    const handleClick = () => {
      clickCountRef.current += 1;
      setDisplayCount(clickCountRef.current);
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        clickCountRef.current = 0;
        setDisplayCount(0);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div>
        <RootCmp {...args} onButtonClick={handleClick} />
        <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Кликов сделано: {displayCount} (сброс через 3 сек)
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    // Кликаем 6 раз чтобы достичь лимита (5 ведьм) и превысить его
    for (let i = 0; i < 6; i++) {
      await userEvent.click(button);
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    }
  },
};

export const WithSecretMessage: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
    showSecretMessage: true,
  },
  render: function Render(args) {
    const clickCountRef = useRef(0);
    const [displayCount, setDisplayCount] = React.useState(0);

    const handleClick = () => {
      clickCountRef.current += 1;
      setDisplayCount(clickCountRef.current);
    };

    return (
      <div>
        <RootCmp {...args} onButtonClick={handleClick} />
        <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Кликов: {displayCount} (нужно 6+ для секретного сообщения)
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    // Кликаем 6 раз чтобы показать секретное сообщение
    for (let i = 0; i < 6; i++) {
      await userEvent.click(button);
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    }
  },
};

export const WithCelebrationMode: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
    celebrationMode: true,
  },
  render: function Render(args) {
    const clickCountRef = useRef(0);
    const [displayCount, setDisplayCount] = React.useState(0);

    const handleClick = () => {
      clickCountRef.current += 1;
      setDisplayCount(clickCountRef.current);
    };

    return (
      <div>
        <RootCmp {...args} onButtonClick={handleClick} />
        <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Кликов: {displayCount} (поздравление на 5, 10, 15...)
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    // Кликаем 5 раз чтобы показать поздравление
    for (let i = 0; i < 5; i++) {
      await userEvent.click(button);
      await new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    }
  },
};

export const WithAllFeatures: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'dark',
    showSecretMessage: true,
    maxWitches: 3,
    celebrationMode: true,
    buttonText: 'Призвать ведьму!',
  },
  render: function Render(args) {
    const clickCountRef = useRef(0);
    const [displayCount, setDisplayCount] = React.useState(0);

    const handleClick = () => {
      clickCountRef.current += 1;
      setDisplayCount(clickCountRef.current);
    };

    return (
      <div>
        <RootCmp {...args} onButtonClick={handleClick} />
        <p style={{ marginTop: '10px', fontSize: '12px', color: '#fff' }}>
          Кликов: {displayCount}
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    // Кликаем 10 раз чтобы покрыть все фичи
    for (let i = 0; i < 10; i++) {
      await userEvent.click(button);
      await new Promise((resolve) => {
        setTimeout(resolve, 150);
      });
    }
  },
};
