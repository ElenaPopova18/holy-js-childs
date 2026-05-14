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
    render(<RootCmp targetBlank />);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('target', '_blank');
  });

  it('должен показывать секретное сообщение после 5 кликов (пример выносимой логики)', () => {
    // Этот тест демонстрирует логику, которую можно вынести в чистую функцию
    // shouldShowSecretMessage(showSecretMessage: boolean, clickCount: number): boolean
    // return showSecretMessage && clickCount > 5;

    render(<RootCmp showSecretMessage />);

    // Изначально секретное сообщение не видно (0 кликов)
    expect(
      screen.queryByText(/Секретное сообщение:/)
    ).not.toBeInTheDocument();

    // Делаем 5 кликов — сообщение всё ещё не должно появиться
    const button = screen.getByRole('button');
    for (let i = 0; i < 5; i++) {
      fireEvent.click(button);
    }
    expect(
      screen.queryByText(/Секретное сообщение:/)
    ).not.toBeInTheDocument();

    // Делаем 6-й клик — сообщение должно появиться
    fireEvent.click(button);
    expect(
      screen.getByText(/🎉 Секретное сообщение: Ты настоящий мастер призыва ведьм!/)
    ).toBeInTheDocument();
  });

  it('должен показывать блок поздравлений только на кратных 5 кликах (пример выносимой логики)', () => {
    // Этот тест демонстрирует логику, которую можно вынести в чистую функцию
    // shouldShowCelebration(celebrationMode: boolean, clickCount: number): boolean
    // return celebrationMode && clickCount > 0 && clickCount % 5 === 0;

    render(<RootCmp celebrationMode />);

    // Изначально поздравлений нет (0 кликов)
    expect(
      screen.queryByText(/Поздравляем с/)
    ).not.toBeInTheDocument();

    const button = screen.getByRole('button');

    // 1 клик — поздравления нет
    fireEvent.click(button);
    expect(
      screen.queryByText(/Поздравляем с/)
    ).not.toBeInTheDocument();

    // 2 клика — поздравления нет
    fireEvent.click(button);
    expect(
      screen.queryByText(/Поздравляем с/)
    ).not.toBeInTheDocument();

    // 5 кликов — должно появиться поздравление
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(
      screen.getByText(/🎊🎈🎁 Поздравляем с 5 кликами! 🎁🎈🎊/)
    ).toBeInTheDocument();

    // 6 кликов — поздравление должно исчезнуть
    fireEvent.click(button);
    expect(
      screen.queryByText(/🎊🎈🎁 Поздравляем с 5 кликами! 🎁🎈🎊/)
    ).not.toBeInTheDocument();

    // 10 кликов — поздравление должно появиться снова
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(
      screen.getByText(/🎊🎈🎁 Поздравляем с 10 кликами! 🎁🎈🎊/)
    ).toBeInTheDocument();
  });
});
