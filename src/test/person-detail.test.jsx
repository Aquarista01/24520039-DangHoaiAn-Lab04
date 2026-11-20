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

  return { promise, resolve };
}

function renderDetail(Detail) {
  return render(
    <MemoryRouter initialEntries={['/people/24520039']}>
      <App Detail={Detail} />
    </MemoryRouter>,
  );
}

describe('Lazy person detail regression', () => {
  it('exposes one polite loading status and hides decorations', () => {
    const deferred = createDeferredModule();
    const PendingDetail = lazy(() => deferred.promise);
    const { container } = renderDetail(PendingDetail);

    const region = screen.getByRole('region', {
      name: 'Person detail',
    });

    expect(region).toHaveAttribute('aria-busy', 'true');

    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Loading person detail.');
    expect(status.closest('[aria-busy="true"]')).toBeNull();
    expect(container.querySelectorAll('[aria-live]')).toHaveLength(1);

    expect(region.querySelector('.person-layout')).toHaveAttribute(
      'aria-hidden',
      'true',
    );

    expect(
      screen.queryByRole('heading', { name: featuredPerson.name }),
    ).not.toBeInTheDocument();
  });

  it('replaces the skeleton with the real profile and clears busy state', async () => {
    const deferred = createDeferredModule();
    const PendingDetail = lazy(() => deferred.promise);

    renderDetail(PendingDetail);

    expect(screen.getByRole('status')).toBeInTheDocument();

    const detailModule = await import('../pages/PersonDetail.jsx');

    await act(async () => {
      deferred.resolve(detailModule);
      await deferred.promise;
    });

    expect(
      await screen.findByRole('heading', { name: featuredPerson.name }),
    ).toBeInTheDocument();

    const region = screen.getByRole('region', {
      name: 'Person detail',
    });

    expect(region).toHaveAttribute('aria-busy', 'false');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    const list = region.querySelector('dl');
    expect(list).toBeInTheDocument();

    for (const fact of featuredPerson.facts) {
      const term = within(list).getByText(fact.label).closest('dt');
      expect(term).toBeInTheDocument();
      expect(term.nextElementSibling).toHaveTextContent(fact.value);
    }

    const image = within(region).getByRole('img', {
      name: featuredPerson.avatarAlt,
    });

    expect(image).toHaveAttribute('width', '96');
    expect(image).toHaveAttribute('height', '96');
  });

  it('opens the real lazy page while preserving navigation', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const primary = screen.getByRole('navigation', { name: 'Primary' });

    await user.click(
      within(primary).getByRole('link', { name: 'People' }),
    );

    const directory = screen.getByRole('navigation', { name: 'People' });

    await user.click(
      within(directory).getByRole('link', { name: featuredPerson.name }),
    );

    expect(
      await screen.findByRole('heading', { name: featuredPerson.name }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('navigation', { name: 'Primary' }),
    ).toBe(primary);

    expect(
      screen.getByRole('navigation', { name: 'People' }),
    ).toBe(directory);

    await user.click(
      within(primary).getByRole('link', { name: 'Home' }),
    );

    expect(
      await screen.findByRole('heading', {
        name: 'Performance & resiliency',
      }),
    ).toBeInTheDocument();
  });
});
