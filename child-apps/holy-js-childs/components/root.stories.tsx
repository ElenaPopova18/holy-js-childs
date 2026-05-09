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
    onButtonClick: {
      action: 'clicked',
      description: 'Обработчик клика по кнопке',
    },
  },
} satisfies Meta<typeof RootCmp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
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
      alert('Кнопка нажата! 🎉');
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
      }}
    >
      <RootCmp variant="default" title="Default" buttonText="Default Button" />
      <RootCmp variant="primary" title="Primary" buttonText="Primary Button" />
      <RootCmp
        variant="secondary"
        title="Secondary"
        buttonText="Secondary Button"
      />
    </div>
  ),
};

export const FullyCustomized: Story = {
  args: {
    title: 'Полностью кастомный компонент',
    subtitle:
      'Этот компонент демонстрирует все возможности настройки: текст, стиль кнопки и обработчик клика.',
    buttonText: 'Попробовать сейчас',
    variant: 'primary',
    onButtonClick: () => {
      // eslint-disable-next-line no-console
      console.log('Custom action triggered!');
    },
  },
};
