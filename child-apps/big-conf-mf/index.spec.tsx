/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BigConfMf } from './components/root';

describe('big-conf-mf child-app', () => {
  it('должен рендерить BigConfMf компонент', () => {
    render(<BigConfMf />);
    expect(screen.getByText('Панель не настроена')).toBeInTheDocument();
  });
});
