import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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


export const FullyCustomized: Story = {
  args: {
    variant: 'primary',
    title: '🎉 Супер компонент',
    subtitle: 'Нажми на кнопку и случится магия!',
    buttonText: 'Призвать ведьму 🧙‍♀️',
  },
};
