import type { Meta, StoryObj } from '@storybook/react';
import { BigConfMf } from './root';

const meta = {
  title: 'ChildApp/BigConfMf',
  component: BigConfMf,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'color',
      description: 'Фон микрофронтонта',
    },
    'panel.color.style': {
      control: 'select',
      options: ['outline', 'color', 'shadow', 'custom'],
      description: 'Стиль оформления панели',
    },
    'panel.color.background': {
      control: 'color',
      description: 'Фон панели',
    },
    'panel.size': {
      control: 'select',
      options: ['s', 'm', 'l'],
      description: 'Размер панели',
    },
    'panel.imagePosition': {
      control: 'select',
      options: ['left', 'right'],
      description: 'Позиция изображения',
    },
    'panel.title.text': {
      control: 'text',
      description: 'Текст заголовка',
    },
    'panel.title.size': {
      control: 'select',
      options: ['s', 'l'],
      description: 'Размер заголовка',
    },
    'panel.title.htmlTag': {
      control: 'select',
      options: ['div', 'b', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML тег заголовка',
    },
    'panel.description.text': {
      control: 'text',
      description: 'Текст описания',
    },
    'panel.description.htmlTag': {
      control: 'select',
      options: ['div', 'b', 'strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML тег описания',
    },
    'panel.image.alt': {
      control: 'text',
      description: 'Альтернативный текст изображения',
    },
    'panel.image.title': {
      control: 'text',
      description: 'Заголовок изображения',
    },
    'panel.image.image.src': {
      control: 'text',
      description: 'URL изображения',
    },
    'panel.image.imageAlign': {
      control: 'select',
      options: ['top', 'center', 'bottom'],
      description: 'Выравнивание изображения',
    },
    'panel.button.active': {
      control: 'boolean',
      description: 'Активность кнопки',
    },
    'panel.button.text': {
      control: 'text',
      description: 'Текст кнопки',
    },
    'panel.button.color.style': {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'outlineDark', 'outlineLight', 'textLink', 'custom'],
      description: 'Стиль кнопки',
    },
    'panel.button.color.backgroundColor': {
      control: 'color',
      description: 'Фон кнопки',
    },
    'panel.button.onClick.action': {
      control: 'select',
      options: ['goToLink', 'goToBlock', 'showBlock', 'crossSale', 'callFormEvent'],
      description: 'Действие кнопки',
    },
    'panel.button.onClick.url': {
      control: 'text',
      description: 'URL для перехода',
    },
    'panel.button.onClick.targetBlank': {
      control: 'boolean',
      description: 'Открыть в новой вкладке',
    },
    'panel.href': {
      control: 'text',
      description: 'Ссылка панели',
    },
  },
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
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/1000px-RWS_Tarot_04_Emperor.jpg', condition: '2x' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/1500px-RWS_Tarot_04_Emperor.jpg', condition: '3x' },
          ],
          webpSrcset: [
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/500px-RWS_Tarot_04_Emperor.jpg', condition: '1x' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/1000px-RWS_Tarot_04_Emperor.jpg', condition: '2x' },
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
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {(['primary', 'secondary', 'outline', 'outlineDark', 'outlineLight', 'textLink', 'custom'] as const).map((style) => (
        <BigConfMf
          key={style}
          panel={{
            color: { style: 'shadow' },
            size: 's',
            imagePosition: 'left',
            title: { text: `Кнопка: ${style}`, size: 's', htmlTag: 'h4' },
            description: { text: `Стиль кнопки: ${style}`, htmlTag: 'div' },
            image: { alt: '', title: '', image: { src: '' }, imageAlign: 'center' },
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
