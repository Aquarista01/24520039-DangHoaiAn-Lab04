import { lazy } from 'react';
import { MemoryRouter } from 'react-router';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App.jsx';
import { featuredPerson } from '../data/featuredPerson.js';

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

function renderDetailRoute(Detail) {
  return render(
    <MemoryRouter initialEntries={['/person']}>
      <App Detail={Detail} />
    </MemoryRouter>,
  );
}

describe('Exercise 1.1 contract', () => {
  it('renders accessible loading while the detail module is pending', () => {
    const deferred = createDeferredModule();
    const PendingDetail = lazy(() => deferred.promise);

    const { container } = renderDetailRoute(PendingDetail);

    const region = screen.getByRole('region', {
      name: 'Person detail',
    });

    expect(region).toHaveAttribute('aria-busy', 'true');

    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Loading person detail.');
    expect(container.querySelectorAll('[aria-live]')).toHaveLength(1);
    expect(status.closest('[aria-busy="true"]')).toBeNull();

    expect(region.querySelector('.person-layout')).toHaveAttribute(
      'aria-hidden',
      'true',
    );

    expect(
      screen.queryByRole('heading', {
        name: featuredPerson.name,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('navigation', {
        name: 'Primary',
      }),
    ).toBeInTheDocument();
  });

  it('replaces the skeleton with the real module and clears busy state', async () => {
    const deferred = createDeferredModule();
    const PendingDetail = lazy(() => deferred.promise);

    renderDetailRoute(PendingDetail);

    expect(screen.getByRole('status')).toHaveTextContent(
      'Loading person detail.',
    );

    const detailModule = await import('../pages/PersonDetail.jsx');

    await act(async () => {
      deferred.resolve(detailModule);
      await deferred.promise;
    });

    expect(
      await screen.findByRole('heading', {
        name: featuredPerson.name,
      }),
    ).toBeInTheDocument();

    const region = screen.getByRole('region', {
      name: 'Person detail',
    });

    expect(region).toHaveAttribute('aria-busy', 'false');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    expect(
      within(region).getByText(featuredPerson.role),
    ).toBeInTheDocument();

    for (const fact of featuredPerson.facts) {
      expect(
        within(region).getByText(fact.label).closest('dt'),
      ).toBeInTheDocument();

      expect(
        within(region).getByText(fact.value).closest('dd'),
      ).toBeInTheDocument();
    }

    const avatar = within(region).getByRole('img', {
      name: featuredPerson.avatarAlt,
    });

    expect(avatar).toHaveAttribute('width', '96');
    expect(avatar).toHaveAttribute('height', '96');
  });

  it('navigates through the real lazy route and preserves navigation', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', {
        name: 'Performance & resiliency',
      }),
    ).toBeInTheDocument();

    const navigation = screen.getByRole('navigation', {
      name: 'Primary',
    });

    await user.click(
      within(navigation).getByRole('link', {
        name: 'Person detail',
      }),
    );

    expect(
      await screen.findByRole('heading', {
        name: featuredPerson.name,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('navigation', {
        name: 'Primary',
      }),
    ).toBe(navigation);

    expect(
      within(navigation).getByRole('link', {
        name: 'Person detail',
      }),
    ).toHaveAttribute('aria-current', 'page');

    await user.click(
      within(navigation).getByRole('link', {
        name: 'Home',
      }),
    );

    expect(
      await screen.findByRole('heading', {
        name: 'Performance & resiliency',
      }),
    ).toBeInTheDocument();
  });
});
