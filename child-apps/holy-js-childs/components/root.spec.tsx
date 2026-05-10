/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RootCmp } from './root';

describe('RootCmp', () => {
  it('должен рендериться с заголовком Привет', () => {
    render(<RootCmp />);
    expect(screen.getByText('Привет!')).toBeInTheDocument();
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

  it('должен использовать variant primary', () => {
    const { container } = render(<RootCmp variant="primary" />);
    const button = container.querySelector('button');
    expect(button).toBeInTheDocument();
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

  it('должен использовать тёмный фон при backgroundColor="dark"', () => {
    const { container } = render(<RootCmp backgroundColor="dark" />);
    const div = container.firstChild as HTMLElement;
    expect(div).toBeInTheDocument();
  });
});
