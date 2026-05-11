import React, { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/test';
import { RootCmp, type RootCmpProps } from './root';

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
      alert('Кнопка нажата! Ведьма призвана! 🧙‍♀️');
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    await userEvent.click(button);
  },
};

function RenderWithClickCallbackTracking(args: RootCmpProps) {
  const clickCallbackCountRef = useRef(0);
  const [callbackCount, setCallbackCount] = React.useState(0);

  const handleCallback = () => {
    clickCallbackCountRef.current += 1;
    setCallbackCount(clickCallbackCountRef.current);
    // eslint-disable-next-line no-console
    console.log(
      `🔔 onButtonClick вызван! Всего вызовов: ${clickCallbackCountRef.current}`
    );
  };

  return (
    <div>
      <RootCmp {...args} onButtonClick={handleCallback} />
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#e0e0e0',
          borderRadius: '8px',
        }}
      >
        <strong>📊 Callback вызван раз: {callbackCount}</strong>
      </div>
    </div>
  );
}

export const WithClickCallbackTracking: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
  },
  render: RenderWithClickCallbackTracking,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
  },
};

function RenderWithAutoClick(args: RootCmpProps) {
  const clickCountRef = useRef(0);
  const [autoClickCount, setAutoClickCount] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      clickCountRef.current += 1;
      setAutoClickCount(clickCountRef.current);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <RootCmp {...args} />
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#e0f7fa',
          borderRadius: '8px',
        }}
      >
        <strong>🤖 Авто-кликов: {autoClickCount}</strong>
      </div>
    </div>
  );
}

export const WithAutoClick: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
  },
  render: RenderWithAutoClick,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
  },
};

function RenderWithWitchLimit(args: RootCmpProps) {
  const clickCountRef = useRef(0);
  const [resetKey, setResetKey] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      clickCountRef.current += 1;
      if (clickCountRef.current > args.maxWitches!) {
        setResetKey((prev) => prev + 1);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [args.maxWitches]);

  return <RootCmp key={resetKey} {...args} />;
}

export const WithWitchLimit: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
    maxWitches: 5,
  },
  render: RenderWithWitchLimit,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    for (let i = 0; i < 6; i++) {
      await userEvent.click(button);
    }
  },
};

function RenderWithSecretMessage(args: RootCmpProps) {
  const clickCountRef = useRef(0);
  const [resetKey, setResetKey] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      clickCountRef.current += 1;
      if (clickCountRef.current > 5) {
        setResetKey((prev) => prev + 1);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return <RootCmp key={resetKey} {...args} />;
}

export const WithSecretMessage: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
    showSecretMessage: true,
  },
  render: RenderWithSecretMessage,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    for (let i = 0; i < 6; i++) {
      await userEvent.click(button);
    }
  },
};

function RenderWithCelebration(args: RootCmpProps) {
  const clickCountRef = useRef(0);
  const [resetKey, setResetKey] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      clickCountRef.current += 1;
      if (clickCountRef.current >= 5) {
        setResetKey((prev) => prev + 1);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return <RootCmp key={resetKey} {...args} />;
}

export const WithCelebrationMode: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
    celebrationMode: true,
  },
  render: RenderWithCelebration,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    for (let i = 0; i < 5; i++) {
      await userEvent.click(button);
    }
  },
};

function RenderWithAllFeatures(args: RootCmpProps) {
  const clickCountRef = useRef(0);
  const [resetKey, setResetKey] = React.useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      clickCountRef.current += 1;
      if (clickCountRef.current >= 10) {
        setResetKey((prev) => prev + 1);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return <RootCmp key={resetKey} {...args} />;
}

export const WithAllFeatures: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'dark',
    showSecretMessage: true,
    maxWitches: 8,
    celebrationMode: true,
  },
  render: RenderWithAllFeatures,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');
    for (let i = 0; i < 10; i++) {
      await userEvent.click(button);
    }
  },
};

export const DarkBackground: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'dark',
  },
};

export const FullyCustomized: Story = {
  args: {
    variant: 'primary',
    backgroundColor: 'light',
    title: '🎉 Супер компонент',
    subtitle: 'Нажми на кнопку и случится магия!',
    buttonText: 'Призвать ведьму 🧙‍♀️',
  },
};
