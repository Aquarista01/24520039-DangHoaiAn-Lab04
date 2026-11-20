import { MemoryRouter, useLocation } from 'react-router';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App.jsx';
import { featuredPerson } from '../data/featuredPerson.js';

function LocationProbe() {
  const location = useLocation();
  return <p data-testid="current-path">{location.pathname}</p>;
}

function renderApp(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe('Exercise 1.2.2 master-detail contract', () => {
  it('shows the directory and selection prompt at /people', () => {
    renderApp('/people');

    const directory = screen.getByRole('navigation', { name: 'People' });

    expect(
      screen.getByRole('heading', {
        name: 'Select a person to view their details',
      }),
    ).toBeInTheDocument();

    expect(within(directory).getAllByRole('link')).toHaveLength(3);

    expect(
      within(directory).getByRole('link', { name: featuredPerson.name }),
    ).toHaveAttribute('href', '/people/24520039');

    expect(
      directory.querySelector('[aria-current="page"]'),
    ).toBeNull();

    expect(screen.getAllByRole('main')).toHaveLength(1);
  });

  it('updates the URL, profile and active link when changing people', async () => {
    const user = userEvent.setup();
    renderApp('/people');

    const main = screen.getByRole('main');
    const primary = screen.getByRole('navigation', { name: 'Primary' });
    const directory = screen.getByRole('navigation', { name: 'People' });

    const first = within(directory).getByRole('link', {
      name: featuredPerson.name,
    });

    const second = within(directory).getByRole('link', {
      name: 'Alex Morgan',
    });

    await user.click(first);

    expect(
      await screen.findByRole('heading', { name: featuredPerson.name }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('current-path')).toHaveTextContent(
      /^\/people\/24520039$/,
    );

    expect(first).toHaveAttribute('aria-current', 'page');

    await user.click(second);

    expect(
      await screen.findByRole('heading', { name: 'Alex Morgan' }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('current-path')).toHaveTextContent(
      /^\/people\/alex-morgan$/,
    );

    expect(second).toHaveAttribute('aria-current', 'page');
    expect(second).toHaveClass('person-link--active');
    expect(first).not.toHaveAttribute('aria-current');
    expect(first).not.toHaveClass('person-link--active');

    expect(
      directory.querySelectorAll('[aria-current="page"]'),
    ).toHaveLength(1);

    expect(screen.getByRole('main')).toBe(main);
    expect(
      screen.getByRole('navigation', { name: 'Primary' }),
    ).toBe(primary);
    expect(
      screen.getByRole('navigation', { name: 'People' }),
    ).toBe(directory);
  });

  it('shows a missing-person state and returns to the directory', async () => {
    const user = userEvent.setup();
    renderApp('/people/unknown-id');

    expect(
      await screen.findByRole('heading', {
        name: '404: Person Not Found',
      }),
    ).toBeInTheDocument();

    const directory = screen.getByRole('navigation', { name: 'People' });

    expect(
      directory.querySelector('[aria-current="page"]'),
    ).toBeNull();

    await user.click(
      screen.getByRole('link', { name: 'Back to people' }),
    );

    expect(
      await screen.findByRole('heading', {
        name: 'Select a person to view their details',
      }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('current-path')).toHaveTextContent(
      /^\/people$/,
    );
  });

  it('renders semantic name and role metadata for a direct detail URL', async () => {
    renderApp('/people/24520039');

    expect(
      await screen.findByRole('heading', { name: featuredPerson.name }),
    ).toBeInTheDocument();

    const region = screen.getByRole('region', { name: 'Person detail' });
    const list = region.querySelector('dl');

    expect(list).toBeInTheDocument();

    const nameTerm = within(list).getByText('Name').closest('dt');
    const roleTerm = within(list).getByText('Role').closest('dt');

    expect(nameTerm).toBeInTheDocument();
    expect(roleTerm).toBeInTheDocument();

    expect(nameTerm.nextElementSibling.tagName).toBe('DD');
    expect(roleTerm.nextElementSibling.tagName).toBe('DD');

    expect(nameTerm.nextElementSibling).toHaveTextContent(
      featuredPerson.name,
    );

    expect(roleTerm.nextElementSibling).toHaveTextContent(
      featuredPerson.role,
    );
  });

  it('redirects the legacy /person URL to the canonical detail URL', async () => {
    renderApp('/person');

    expect(
      await screen.findByRole('heading', { name: featuredPerson.name }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('current-path')).toHaveTextContent(
      /^\/people\/24520039$/,
    );
  });

  it('distinguishes an unmatched URL from a missing person', () => {
    renderApp('/missing-route');

    expect(
      screen.getByRole('heading', { name: 'Page not found' }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: '404: Person Not Found' }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('navigation', { name: 'People' }),
    ).not.toBeInTheDocument();
  });
});
