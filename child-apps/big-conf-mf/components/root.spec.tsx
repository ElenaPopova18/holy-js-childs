/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BigConfMf } from './root';

// Тестовые константы
const TEST_TITLE = 'Тестовый заголовок';
const TEST_DESCRIPTION = 'Тестовое описание';
const TEST_BUTTON_TEXT = 'Нажми меня';
const TEST_BUTTON_INACTIVE = 'Неактивная';
const TEST_IMAGE_ALT = 'Тестовое изображение';
const TEST_IMAGE_SRC = 'https://example.com/image.jpg';
const TEST_LINK_URL = 'https://example.com';
const TEST_PANEL_LINK = 'https://panel-link.com';
const TEST_BLOCK_ID = '#block';
const TEST_EVENT_NAME = 'formSubmit';
const TEST_LINK_TITLE = 'Link Title';
const TEST_BACKGROUND_COLOR = '#ff0000';
const TEST_PANEL_BACKGROUND_COLOR = '#00ff00';
const TEST_BUTTON_BACKGROUND_COLOR = 'purple';

const basePanel = {
  color: { style: 'outline' as const },
  size: 'm' as const,
  imagePosition: 'left' as const,
  title: { text: 'Title', size: 'l' as const, htmlTag: 'h2' as const },
  description: { text: 'Description', htmlTag: 'div' as const },
  image: {
    alt: '',
    title: '',
    image: { src: '' },
    imageAlign: 'center' as const,
  },
  button: {
    active: true,
    text: 'Кнопка',
    color: { style: 'primary' as const },
  },
};

describe('BigConfMf', () => {
  describe('Базовый рендеринг', () => {
    it('должен рендерить сообщение, когда панель не настроена', () => {
      render(<BigConfMf />);
      expect(screen.getByText('Панель не настроена')).toBeInTheDocument();
    });

    it('Блок должен рендерить заголовок и описание', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            title: { text: TEST_TITLE, size: 'l', htmlTag: 'h2' },
            description: { text: TEST_DESCRIPTION, htmlTag: 'div' },
          }}
        />
      );
      expect(screen.getByText(TEST_TITLE)).toBeInTheDocument();
      expect(screen.getByText(TEST_DESCRIPTION)).toBeInTheDocument();
    });

    it('должен рендерить кнопку с правильным текстом', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: TEST_BUTTON_TEXT,
              color: { style: 'primary' },
            },
          }}
        />
      );
      expect(
        screen.getByRole('button', { name: TEST_BUTTON_TEXT })
      ).toBeInTheDocument();
    });

    it('должен рендерить неактивную кнопку когда active: false', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: false,
              text: TEST_BUTTON_INACTIVE,
              color: { style: 'primary' },
            },
          }}
        />
      );
      expect(
        screen.getByRole('button', { name: TEST_BUTTON_INACTIVE })
      ).toBeDisabled();
    });

    it('должен рендерить изображение с правильным alt текстом', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            image: {
              alt: TEST_IMAGE_ALT,
              title: 'Test Image',
              image: { src: TEST_IMAGE_SRC },
              imageAlign: 'center',
            },
          }}
        />
      );
      expect(screen.getByAltText(TEST_IMAGE_ALT)).toBeInTheDocument();
    });
  });

  describe('Фоны', () => {
    it('должен применять фон контейнера из props.background', () => {
      const { container } = render(
        <BigConfMf background={TEST_BACKGROUND_COLOR} panel={basePanel} />
      );
      const containerElement = container.firstChild as HTMLElement;
      expect(containerElement).toHaveStyle(
        `background-color: ${TEST_BACKGROUND_COLOR}`
      );
    });

    it('должен применять фон панели из panel.color.background', () => {
      const { container } = render(
        <BigConfMf
          panel={{
            ...basePanel,
            color: { style: 'color', background: TEST_PANEL_BACKGROUND_COLOR },
          }}
        />
      );
      const panelElement = container.querySelector('[class*="panel"]');
      expect(panelElement).toHaveStyle(
        `background-color: ${TEST_PANEL_BACKGROUND_COLOR}`
      );
    });

    it('должен применять кастомный фон кнопки из button.color.backgroundColor', () => {
      const { container } = render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Кнопка',
              color: {
                style: 'custom',
                backgroundColor: TEST_BUTTON_BACKGROUND_COLOR,
              },
            },
          }}
        />
      );
      const buttonElement = container.querySelector('button');
      expect(buttonElement).toHaveStyle(
        `background-color: ${TEST_BUTTON_BACKGROUND_COLOR}`
      );
    });
  });

  describe('Стили панели', () => {
    it.each([
      ['outline', 'panelOutline'],
      ['color', 'panelColor'],
      ['shadow', 'panelShadow'],
      ['custom', 'panelCustom'],
    ] as const)('должен применять стиль панели %s', (style, expectedClass) => {
      const { container } = render(
        <BigConfMf
          panel={{
            ...basePanel,
            color: { style },
          }}
        />
      );
      const panelElement = container.querySelector('[class*="panel"]');
      expect(panelElement?.className).toContain(expectedClass);
    });
  });

  describe('Размеры панели', () => {
    it.each(['s', 'm', 'l'] as const)(
      'должен применять размер панели %s',
      (size) => {
        const { container } = render(
          <BigConfMf
            panel={{
              ...basePanel,
              size,
            }}
          />
        );
        const panelElement = container.querySelector('[class*="panel"]');
        expect(panelElement?.className).toContain(`panel${size.toUpperCase()}`);
      }
    );
  });

  describe('Позиции изображения', () => {
    it.each(['left', 'right'] as const)(
      'должен применять позицию изображения %s',
      (position) => {
        const { container } = render(
          <BigConfMf
            panel={{
              ...basePanel,
              imagePosition: position,
            }}
          />
        );
        const panelElement = container.querySelector('[class*="panel"]');
        expect(panelElement?.className).toContain(
          `image${position.charAt(0).toUpperCase() + position.slice(1)}`
        );
      }
    );
  });

  describe('Размеры заголовка', () => {
    it.each(['s', 'l'] as const)(
      'должен применять размер заголовка %s',
      (size) => {
        const { container } = render(
          <BigConfMf
            panel={{
              ...basePanel,
              title: { text: 'Title', size, htmlTag: 'h2' },
            }}
          />
        );
        const titleElement = container.querySelector('.title > *');
        expect(titleElement?.className).toContain(`title${size.toUpperCase()}`);
      }
    );
  });

  describe('HTML теги заголовка', () => {
    it.each([
      'div',
      'b',
      'strong',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ] as const)('должен рендерить заголовок как тег %s', (tag) => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            title: { text: 'Title', size: 'l', htmlTag: tag },
          }}
        />
      );
      expect(screen.getByText('Title').tagName).toBe(tag.toUpperCase());
    });
  });

  describe('HTML теги описания', () => {
    it.each([
      'div',
      'b',
      'strong',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ] as const)('должен рендерить описание как тег %s', (tag) => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            description: { text: 'Description', htmlTag: tag },
          }}
        />
      );
      expect(screen.getByText('Description').tagName).toBe(tag.toUpperCase());
    });
  });

  describe('Выравнивание изображения', () => {
    it.each(['top', 'center', 'bottom'] as const)(
      'должен применять выравнивание изображения %s',
      (align) => {
        const { container } = render(
          <BigConfMf
            panel={{
              ...basePanel,
              image: {
                alt: 'Image',
                title: '',
                image: { src: 'https://example.com/img.jpg' },
                imageAlign: align,
              },
            }}
          />
        );
        const imageContainer = container.querySelector(
          '[class*="imageContainer"]'
        );
        expect(imageContainer?.className).toContain(
          `image${align.charAt(0).toUpperCase() + align.slice(1)}`
        );
      }
    );
  });

  describe('Стили кнопок', () => {
    it.each([
      'primary',
      'secondary',
      'outline',
      'outlineDark',
      'outlineLight',
      'textLink',
      'custom',
    ] as const)('должен применять стиль кнопки %s', (style) => {
      const { container } = render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: { active: true, text: 'Button', color: { style } },
          }}
        />
      );
      const buttonElement = container.querySelector('button');
      expect(buttonElement?.className).toContain(
        `button${style.charAt(0).toUpperCase() + style.slice(1)}`
      );
    });
  });

  describe('srcset и webpSrcset', () => {
    it('должен рендерить picture с srcset и webpSrcset', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            image: {
              alt: 'Image',
              title: 'Title',
              image: {
                src: 'https://example.com/image.jpg',
                srcset: [
                  { src: 'https://example.com/image-2x.jpg', condition: '2x' },
                  { src: 'https://example.com/image-3x.jpg', condition: '3x' },
                ],
                webpSrcset: [
                  { src: 'https://example.com/image-1x.webp', condition: '1x' },
                  { src: 'https://example.com/image-2x.webp', condition: '2x' },
                  { src: 'https://example.com/image-3x.webp', condition: '3x' },
                ],
              },
              imageAlign: 'center',
            },
          }}
        />
      );
      const webpSource = document.querySelector('source[type="image/webp"]');
      const pngSource = document.querySelector('source[type="image/png"]');

      expect(webpSource).toHaveAttribute(
        'srcset',
        'https://example.com/image-1x.webp 1x, https://example.com/image-2x.webp 2x, https://example.com/image-3x.webp 3x'
      );
      expect(pngSource).toHaveAttribute(
        'srcset',
        'https://example.com/image-2x.jpg 2x, https://example.com/image-3x.jpg 3x'
      );
    });
  });

  describe('Обработчики кликов кнопки', () => {
    beforeEach(() => {
      global.window.open = jest.fn();
      global.document.querySelector = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('должен открывать ссылку при действии goToLink', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Link',
              color: { style: 'primary' },
              onClick: { action: 'goToLink', url: TEST_LINK_URL },
              htmlTag: 'a',
            },
          }}
        />
      );
      fireEvent.click(screen.getByRole('link', { name: 'Link' }));
      expect(window.open).toHaveBeenCalledWith(TEST_LINK_URL, '_self');
    });

    it('должен открывать ссылку в новой вкладке при targetBlank', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Link',
              color: { style: 'primary' },
              onClick: {
                action: 'goToLink',
                url: TEST_LINK_URL,
                targetBlank: true,
              },
              htmlTag: 'a',
            },
          }}
        />
      );
      fireEvent.click(screen.getByRole('link', { name: 'Link' }));
      expect(window.open).toHaveBeenCalledWith(TEST_LINK_URL, '_blank');
    });

    it('должен скроллить к блоку при действии goToBlock', () => {
      const mockElement = { scrollIntoView: jest.fn() };
      (document.querySelector as jest.Mock).mockReturnValue(mockElement);

      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Scroll',
              color: { style: 'primary' },
              onClick: { action: 'goToBlock', url: TEST_BLOCK_ID },
              htmlTag: 'button',
            },
          }}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Scroll' }));
      expect(document.querySelector).toHaveBeenCalledWith(TEST_BLOCK_ID);
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      });
    });

    it.skip('должен показывать блок при действии showBlock', () => {
      const mockElement = { scrollIntoView: jest.fn() };
      (document.querySelector as jest.Mock).mockReturnValue(mockElement);

      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Show',
              color: { style: 'primary' },
              onClick: { action: 'showBlock', url: TEST_BLOCK_ID },
              htmlTag: 'button',
            },
          }}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Show' }));
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      });
    });

    it('должен вызывать событие формы при действии callFormEvent', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Form',
              color: { style: 'primary' },
              onClick: { action: 'callFormEvent', eventName: TEST_EVENT_NAME },
              htmlTag: 'button',
            },
          }}
        />
      );
      fireEvent.click(screen.getByRole('button', { name: 'Form' }));
      expect(consoleSpy).toHaveBeenCalledWith(
        'Form event triggered:',
        TEST_EVENT_NAME
      );
      consoleSpy.mockRestore();
    });

    it('должен открывать crossSale ссылку', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'CrossSale',
              color: { style: 'primary' },
              onClick: { action: 'crossSale', url: 'https://cross.sale' },
              htmlTag: 'a',
            },
          }}
        />
      );
      fireEvent.click(screen.getByRole('link', { name: 'CrossSale' }));
    });
  });

  describe('Атрибуты ссылок', () => {
    it('должен добавлять rel="nofollow noindex" при nofollow и noindex', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Link',
              color: { style: 'primary' },
              onClick: {
                action: 'goToLink',
                url: TEST_LINK_URL,
                nofollow: true,
                noindex: true,
              },
            },
          }}
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('rel', 'nofollow noindex');
    });

    it('должен добавлять target="_blank" при targetBlank', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Link',
              color: { style: 'primary' },
              onClick: {
                action: 'goToLink',
                url: TEST_LINK_URL,
                targetBlank: true,
              },
            },
          }}
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('должен добавлять title атрибут', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Link',
              color: { style: 'primary' },
              onClick: {
                action: 'goToLink',
                url: TEST_LINK_URL,
                title: TEST_LINK_TITLE,
              },
            },
          }}
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('title', TEST_LINK_TITLE);
    });

    it('должен рендерить как ссылку при наличии href в панели', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            href: TEST_PANEL_LINK,
            button: {
              active: true,
              text: 'Panel Link',
              color: { style: 'primary' },
            },
          }}
        />
      );
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', TEST_PANEL_LINK);
    });
  });

  describe('HTML теги кнопки', () => {
    it('должен рендерить кнопку как тег button по умолчанию', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Button',
              color: { style: 'primary' },
            },
          }}
        />
      );
      expect(screen.getByRole('button').tagName).toBe('BUTTON');
    });

    it('', () => {
      render(
        <BigConfMf
          panel={{
            ...basePanel,
            button: {
              active: true,
              text: 'Link',
              color: { style: 'primary' },
              onClick: { action: 'goToLink', url: 'https://example.com' },
              htmlTag: 'a',
            },
          }}
        />
      );
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });
});
