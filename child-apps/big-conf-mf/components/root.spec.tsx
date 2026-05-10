/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BigConfMf } from './root';

describe('BigConfMf', () => {
  it('должен рендерить сообщение, когда панель не настроена', () => {
    render(<BigConfMf />);
    expect(screen.getByText('Панель не настроена')).toBeInTheDocument();
  });

  it('должен рендерить заголовок и описание', () => {
    render(
      <BigConfMf
        panel={{
          color: { style: 'outline' },
          size: 'm',
          imagePosition: 'left',
          title: {
            text: 'Тестовый заголовок',
            size: 'l',
            htmlTag: 'h2',
          },
          description: {
            text: 'Тестовое описание',
            htmlTag: 'div',
          },
          image: {
            alt: '',
            title: '',
            image: { src: '' },
            imageAlign: 'center',
          },
          button: {
            active: true,
            text: 'Кнопка',
            color: { style: 'primary' },
          },
        }}
      />
    );
    expect(screen.getByText('Тестовый заголовок')).toBeInTheDocument();
    expect(screen.getByText('Тестовое описание')).toBeInTheDocument();
  });

  it('должен рендерить кнопку с правильным текстом', () => {
    render(
      <BigConfMf
        panel={{
          color: { style: 'outline' },
          size: 'm',
          imagePosition: 'left',
          title: { text: 'Title', size: 'l', htmlTag: 'h2' },
          description: { text: 'Description', htmlTag: 'div' },
          image: { alt: '', title: '', image: { src: '' }, imageAlign: 'center' },
          button: {
            active: true,
            text: 'Нажми меня',
            color: { style: 'primary' },
          },
        }}
      />
    );
    expect(screen.getByRole('button', { name: 'Нажми меня' })).toBeInTheDocument();
  });

  it('должен рендерить неактивную кнопку когда active: false', () => {
    render(
      <BigConfMf
        panel={{
          color: { style: 'outline' },
          size: 'm',
          imagePosition: 'left',
          title: { text: 'Title', size: 'l', htmlTag: 'h2' },
          description: { text: 'Description', htmlTag: 'div' },
          image: { alt: '', title: '', image: { src: '' }, imageAlign: 'center' },
          button: {
            active: false,
            text: 'Неактивная',
            color: { style: 'primary' },
          },
        }}
      />
    );
    expect(screen.getByRole('button', { name: 'Неактивная' })).toBeDisabled();
  });

  it('должен рендерить изображение с правильным alt текстом', () => {
    render(
      <BigConfMf
        panel={{
          color: { style: 'outline' },
          size: 'm',
          imagePosition: 'left',
          title: { text: 'Title', size: 'l', htmlTag: 'h2' },
          description: { text: 'Description', htmlTag: 'div' },
          image: {
            alt: 'Тестовое изображение',
            title: 'Test Image',
            image: { src: 'https://example.com/image.jpg' },
            imageAlign: 'center',
          },
          button: {
            active: true,
            text: 'Кнопка',
            color: { style: 'primary' },
          },
        }}
      />
    );
    expect(screen.getByAltText('Тестовое изображение')).toBeInTheDocument();
  });

  it('должен применять фон контейнера из props.background', () => {
    const { container } = render(
      <BigConfMf
        background="#ff0000"
        panel={{
          color: { style: 'outline' },
          size: 'm',
          imagePosition: 'left',
          title: { text: 'Title', size: 'l', htmlTag: 'h2' },
          description: { text: 'Description', htmlTag: 'div' },
          image: { alt: '', title: '', image: { src: '' }, imageAlign: 'center' },
          button: {
            active: true,
            text: 'Кнопка',
            color: { style: 'primary' },
          },
        }}
      />
    );
    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  it('должен применять фон панели из panel.color.background', () => {
    const { container } = render(
      <BigConfMf
        panel={{
          color: { style: 'color', background: '#00ff00' },
          size: 'm',
          imagePosition: 'left',
          title: { text: 'Title', size: 'l', htmlTag: 'h2' },
          description: { text: 'Description', htmlTag: 'div' },
          image: { alt: '', title: '', image: { src: '' }, imageAlign: 'center' },
          button: {
            active: true,
            text: 'Кнопка',
            color: { style: 'primary' },
          },
        }}
      />
    );
    const panelElement = container.querySelector('[class*="panel"]');
    expect(panelElement).toHaveStyle('background-color: rgb(0, 255, 0)');
  });
});
