import { lazy } from 'react';
import { MemoryRouter, useLocation } from 'react-router';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App.jsx';
import { featuredPerson } from '../data/featuredPerson.js';

function LocationProbe() {
  const location = useLocation();
  return <p data-testid="current-path">{location.pathname}</p>;
}

function renderApp(path = '/', Detail) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App Detail={Detail} />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe('Shared layout routing regression', () => {
  it('renders Home inside the single main', () => {
    renderApp();

    const main = screen.getByRole('main');
    const primary = screen.getByRole('navigation', { name: 'Primary' });

    expect(screen.getAllByRole('main')).toHaveLength(1);

    expect(
      within(main).getByRole('heading', {
        name: 'Performance & resiliency',
      }),
    ).toBeInTheDocument();

    expect(
      within(primary).getByRole('link', { name: 'Home' }),
    ).toHaveAttribute('aria-current', 'page');

    expect(screen.getByTestId('current-path')).toHaveTextContent(/^\/$/);
  });

  it('navigates to About without replacing the shared layout', async () => {
    const user = userEvent.setup();
    renderApp();

    const main = screen.getByRole('main');
    const primary = screen.getByRole('navigation', { name: 'Primary' });

    await user.click(
      within(primary).getByRole('link', { name: 'About' }),
    );

    expect(
      await within(main).findByRole('heading', { name: 'About this lab' }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('current-path')).toHaveTextContent(
      /^\/about$/,
    );

    expect(screen.getByRole('main')).toBe(main);
    expect(
      screen.getByRole('navigation', { name: 'Primary' }),
    ).toBe(primary);

    const about = within(primary).getByRole('link', { name: 'About' });

    expect(about).toHaveAttribute('aria-current', 'page');
    expect(about).toHaveClass('nav-link--active');

    expect(
      within(primary).getByRole('link', { name: 'Home' }),
    ).not.toHaveAttribute('aria-current');
  });

  it('supports direct About entry with one active primary link', () => {
    renderApp('/about');

    const primary = screen.getByRole('navigation', { name: 'Primary' });

    expect(
      screen.getByRole('heading', { name: 'About this lab' }),
    ).toBeInTheDocument();

    expect(
      primary.querySelectorAll('[aria-current="page"]'),
    ).toHaveLength(1);

    expect(
      within(primary).getByRole('link', { name: 'People' }),
    ).not.toHaveAttribute('aria-current');

    expect(screen.getAllByRole('main')).toHaveLength(1);
  });

  it('preserves both navigation regions while detail is pending', async () => {
    let resolveModule;
    const promise = new Promise((resolve) => {
      resolveModule = resolve;
    });
    const PendingDetail = lazy(() => promise);

    renderApp('/people/24520039', PendingDetail);

    const main = screen.getByRole('main');
    const primary = screen.getByRole('navigation', { name: 'Primary' });
    const directory = screen.getByRole('navigation', { name: 'People' });

    expect(screen.getByRole('status')).toHaveTextContent(
      'Loading person detail.',
    );

    expect(
      within(primary).getByRole('link', { name: 'People' }),
    ).toHaveAttribute('aria-current', 'page');

    const detailModule = await import('../pages/PersonDetail.jsx');

    await act(async () => {
      resolveModule(detailModule);
      await promise;
    });

    expect(
      await screen.findByRole('heading', { name: featuredPerson.name }),
    ).toBeInTheDocument();

    expect(screen.getByRole('main')).toBe(main);
    expect(
      screen.getByRole('navigation', { name: 'Primary' }),
    ).toBe(primary);
    expect(
      screen.getByRole('navigation', { name: 'People' }),
    ).toBe(directory);
  });
});
