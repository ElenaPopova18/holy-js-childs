/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import childApp from './index';
import { BigConfMf } from './components/root';

describe('big-conf-mf child-app', () => {
  it('должен экспортировать корректный child-app с именем big-conf-mf', () => {
    expect(childApp.name).toBe('big-conf-mf');
    expect(childApp.render).toBe(BigConfMf);
    expect(childApp.providers).toEqual([]);
  });

  it('должен рендерить BigConfMf компонент', () => {
    const TestComponent = childApp.render;
    render(<TestComponent />);
    expect(screen.getByText('Панель не настроена')).toBeInTheDocument();
  });
});
