import React, { useEffect, useState } from 'react';
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
  args: {
    variant: 'default',
  },
};

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
  },
};

export const SecondaryVariant: Story = {
  args: {
    variant: 'secondary',
  },
};

export const CustomTexts: Story = {
  args: {
    title: 'Добро пожаловать!',
    subtitle:
      'Это пример компонента с настраиваемым текстом. Вы можете изменить любой текст через пропсы.',
    buttonText: 'Начать работу',
  },
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
    variant: 'primary',
  },
};

export const WithClickHandler: Story = {
  args: {
    variant: 'primary',
    onButtonClick: () => {
      // eslint-disable-next-line no-alert
      alert('Кнопка нажата! Ведьма призвана! 🧙‍♀️');
    },
  },
};

// История для покрытия лейбла слева
export const WithLeftCornerLabel: Story = {
  args: {
    cornerLabel: 'LEFT',
    cornerLabelPosition: 'left',
  },
};

// История для покрытия лейбла справа
export const WithRightCornerLabel: Story = {
  args: {
    cornerLabel: 'RIGHT',
    cornerLabelPosition: 'right',
  },
};

// История для покрытия секретного сообщения (нужно 6+ кликов)
export const WithSecretMessage: Story = {
  args: {
    showSecretMessage: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    // Кликаем 6 раз чтобы показать секретное сообщение
    for (let i = 0; i < 6; i++) {
      await userEvent.click(button);
    }
  },
};

// История для покрытия лимита ведьм
export const WithWitchLimit: Story = {
  args: {
    maxWitches: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    // Кликаем 6 раз чтобы достичь лимита
    for (let i = 0; i < 6; i++) {
      await userEvent.click(button);
    }
  },
};

// История для покрытия celebration mode
export const WithCelebrationMode: Story = {
  args: {
    celebrationMode: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    // Кликаем 5 раз чтобы сработало празднование
    for (let i = 0; i < 5; i++) {
      await userEvent.click(button);
    }
  },
};

// История для покрытия activityLog (нужно подождать 1+ секунду)
export const WithActivityLog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    // Кликаем один раз
    await userEvent.click(button);

    // Ждём 1.5 секунды чтобы setInterval сработал
    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });
  },
};

// История для покрытия onButtonClick callback
export const WithClickCallback: Story = {
  args: {
    onButtonClick: () => {
      console.log('Callback вызван!');
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    // Кликаем
    await userEvent.click(button);
  },
};
