import { lazy } from 'react';
import { MemoryRouter, useLocation } from 'react-router';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App.jsx';
import { featuredPerson } from '../data/featuredPerson.js';

function LocationProbe() {
  const location = useLocation();

  return (
    <p data-testid="current-path">
      {location.pathname}
    </p>
  );
}

function renderApp(initialPath = '/', Detail) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App Detail={Detail} />
      <LocationProbe />
    </MemoryRouter>,
  );
}

function createDeferredModule() {
  let resolve;

  const promise = new Promise((resolvePromise) => {
    resolve = resolvePromise;
  });

  return {
    promise,
    resolve,
  };
}

describe('Exercise 1.2.1 nested routing contract', () => {
  it('renders Home inside the shared main and marks Home active', () => {
    renderApp();

    const main = screen.getByRole('main');
    const navigation = screen.getByRole('navigation', {
      name: 'Primary',
    });

    expect(screen.getAllByRole('main')).toHaveLength(1);

    expect(
      within(main).getByRole('heading', {
        name: 'Performance & resiliency',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('current-path'),
    ).toHaveTextContent(/^\/$/);

    const homeLink = within(navigation).getByRole('link', {
      name: 'Home',
    });

    expect(homeLink).toHaveAttribute('aria-current', 'page');
    expect(homeLink).toHaveClass('nav-link--active');

    expect(
      within(navigation).getByRole('link', {
        name: 'About',
      }),
    ).not.toHaveAttribute('aria-current');
  });

  it('changes the URL and child content while preserving the layout', async () => {
    const user = userEvent.setup();

    renderApp();

    const navigation = screen.getByRole('navigation', {
      name: 'Primary',
    });

    const main = screen.getByRole('main');

    await user.click(
      within(navigation).getByRole('link', {
        name: 'About',
      }),
    );

    expect(
      await within(main).findByRole('heading', {
        name: 'About this lab',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('current-path'),
    ).toHaveTextContent(/^\/about$/);

    expect(
      screen.getByRole('navigation', {
        name: 'Primary',
      }),
    ).toBe(navigation);

    expect(screen.getByRole('main')).toBe(main);
    expect(screen.getAllByRole('main')).toHaveLength(1);

    const aboutLink = within(navigation).getByRole('link', {
      name: 'About',
    });

    const homeLink = within(navigation).getByRole('link', {
      name: 'Home',
    });

    expect(aboutLink).toHaveAttribute('aria-current', 'page');
    expect(aboutLink).toHaveClass('nav-link--active');
    expect(homeLink).not.toHaveAttribute('aria-current');
    expect(homeLink).not.toHaveClass('nav-link--active');

    expect(
      navigation.querySelectorAll('[aria-current="page"]'),
    ).toHaveLength(1);

    await user.click(homeLink);

    expect(
      await within(main).findByRole('heading', {
        name: 'Performance & resiliency',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('current-path'),
    ).toHaveTextContent(/^\/$/);
  });

  it('supports direct entry to About with the correct active link', () => {
    renderApp('/about');

    const main = screen.getByRole('main');
    const navigation = screen.getByRole('navigation', {
      name: 'Primary',
    });

    expect(
      within(main).getByRole('heading', {
        name: 'About this lab',
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole('main')).toHaveLength(1);

    const aboutLink = within(navigation).getByRole('link', {
      name: 'About',
    });

    expect(aboutLink).toHaveAttribute('aria-current', 'page');
    expect(aboutLink).toHaveClass('nav-link--active');

    expect(
      within(navigation).getByRole('link', {
        name: 'Home',
      }),
    ).not.toHaveAttribute('aria-current');

    expect(
      within(navigation).getByRole('link', {
        name: 'Person detail',
      }),
    ).not.toHaveAttribute('aria-current');
  });

  it('preserves the shared layout while the detail module loads', async () => {
    const user = userEvent.setup();
    const deferred = createDeferredModule();
    const PendingDetail = lazy(() => deferred.promise);

    renderApp('/', PendingDetail);

    const navigation = screen.getByRole('navigation', {
      name: 'Primary',
    });

    const main = screen.getByRole('main');

    await user.click(
      within(navigation).getByRole('link', {
        name: 'Person detail',
      }),
    );

    expect(
      await screen.findByRole('status'),
    ).toHaveTextContent('Loading person detail.');

    expect(
      screen.getByRole('region', {
        name: 'Person detail',
      }),
    ).toHaveAttribute('aria-busy', 'true');

    expect(
      screen.getByRole('navigation', {
        name: 'Primary',
      }),
    ).toBe(navigation);

    expect(screen.getByRole('main')).toBe(main);

    expect(
      within(navigation).getByRole('link', {
        name: 'About',
      }),
    ).toBeInTheDocument();

    const personLink = within(navigation).getByRole('link', {
      name: 'Person detail',
    });

    expect(personLink).toHaveAttribute('aria-current', 'page');
    expect(personLink).toHaveClass('nav-link--active');

    expect(
      within(navigation).getByRole('link', {
        name: 'Home',
      }),
    ).not.toHaveAttribute('aria-current');

    expect(
      screen.getByTestId('current-path'),
    ).toHaveTextContent(/^\/person$/);

    const detailModule = await import('../pages/PersonDetail.jsx');

    await act(async () => {
      deferred.resolve(detailModule);
      await deferred.promise;
    });

    expect(
      await within(main).findByRole('heading', {
        name: featuredPerson.name,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('region', {
        name: 'Person detail',
      }),
    ).toHaveAttribute('aria-busy', 'false');

    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    expect(
      screen.getByRole('navigation', {
        name: 'Primary',
      }),
    ).toBe(navigation);

    expect(screen.getByRole('main')).toBe(main);
  });
});
