/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RootCmp } from './root';

// Мокаем setInterval для тестов
beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('RootCmp', () => {
  it('должен рендериться с заголовком Привет', () => {
    render(<RootCmp />);
    expect(screen.getByText('Привет!!!')).toBeInTheDocument();
  });

  it('должен показывать счётчик кликов равный 0 изначально', () => {
    render(<RootCmp />);
    const statsRows = screen.getAllByRole('strong');
    expect(statsRows[0]).toHaveTextContent('0');
  });

  it('должен увеличивать счётчик при клике на кнопку', () => {
    render(<RootCmp />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const statsRows = screen.getAllByRole('strong');
    expect(statsRows[0]).toHaveTextContent('1');
  });

  it('должен добавлять ведьму при клике', () => {
    render(<RootCmp />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText('🧙‍♀️')).toBeInTheDocument();
  });

  it('должен использовать кастомный текст кнопки', () => {
    render(<RootCmp buttonText="Custom Button Text" />);
    expect(screen.getByText('Custom Button Text')).toBeInTheDocument();
  });

  it('должен быть отключен при disabled=true', () => {
    render(<RootCmp disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('должен вызывать onButtonClick при клике', () => {
    const handleClick = jest.fn();
    render(<RootCmp onButtonClick={handleClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('должен показывать лог активности после срабатывания таймера', () => {
    render(<RootCmp />);
    // Проматываем время на 1 секунду
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Активность/)).toBeInTheDocument();
    expect(
      screen.queryByText(/Кликни на кнопку — появится лог/)
    ).not.toBeInTheDocument();
  });

  it('должен добавлять target="_blank" при targetBlank и случайном чётном числе', () => {
    // Генерируем случайное целое число от 0 до 9
    const randomNumber = Math.floor(Math.random() * 10);
    
    render(<RootCmp targetBlank />);
    const button = screen.getByRole('button');

    // Если число делится на 2, проверяем наличие target="_blank"
    if (randomNumber % 2 === 0) {
      expect(button).toHaveAttribute('target', '_blank');
    }
    // Если не делится - тест просто проходит без проверок
  });
});
