import { lazy, Suspense } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
} from 'react-router';
import PersonDetailSkeleton from './components/PersonDetailSkeleton.jsx';
import { featuredPerson } from './data/featuredPerson.js';

const LazyPersonDetail = lazy(
  () => import('./pages/PersonDetail.jsx'),
);

function Home() {
  return (
    <section className="home-panel">
      <p className="eyebrow">
        EXERCISE 1.1
      </p>

      <h1>
        Performance &amp; resiliency
      </h1>

      <p>
        Explore a profile page with on-demand JavaScript
        loading and an accessible skeleton.
      </p>

      <Link
        className="button-link"
        to="/person"
      >
        View sample profile
      </Link>
    </section>
  );
}

function NotFound() {
  return (
    <section className="home-panel">
      <h1>
        Page not found
      </h1>

      <Link to="/">
        Return home
      </Link>
    </section>
  );
}

export default function App({
  Detail = LazyPersonDetail,
}) {
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
      >
        Skip to main content
      </a>

      <div className="app-shell">
        <header className="site-header">
          <p className="brand">
            Lab 04

            <span>
              Web Application Development
            </span>
          </p>

          <nav aria-label="Primary">
            <NavLink
              className="nav-link"
              to="/"
              end
            >
              Home
            </NavLink>

            <NavLink
              className="nav-link"
              to="/person"
            >
              Person detail
            </NavLink>
          </nav>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
        >
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/person"
              element={
                <Suspense
                  fallback={
                    <PersonDetailSkeleton
                      person={featuredPerson}
                    />
                  }
                >
                  <Detail person={featuredPerson} />
                </Suspense>
              }
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </main>

        <footer className="site-footer">
          Đặng Hoài An · 24520039
        </footer>
      </div>
    </>
  );
}
