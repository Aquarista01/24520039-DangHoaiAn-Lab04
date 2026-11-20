import { NavLink, Outlet } from 'react-router';
import './Layout.css';

export default function Layout() {
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
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? 'nav-link nav-link--active'
                  : 'nav-link'
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link nav-link--active'
                  : 'nav-link'
              }
            >
              About
            </NavLink>

            <NavLink
              to="/person"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link nav-link--active'
                  : 'nav-link'
              }
            >
              Person detail
            </NavLink>
          </nav>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
        >
          <Outlet />
        </main>

        <footer className="site-footer">
          Đặng Hoài An · 24520039
        </footer>
      </div>
    </>
  );
}
