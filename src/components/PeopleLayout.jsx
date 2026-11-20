import { NavLink, Outlet } from 'react-router';
import './PeopleLayout.css';

export default function PeopleLayout({ people }) {
  return (
    <section
      className="people-layout"
      aria-label="People directory"
    >
      <aside className="people-sidebar">
        <h2>People</h2>

        <nav
          className="people-nav"
          aria-label="People"
        >
          <ul className="people-list">
            {people.map((person) => (
              <li key={person.id}>
                <NavLink
                  to={`/people/${encodeURIComponent(person.id)}`}
                  end
                  aria-label={person.name}
                  className={({ isActive }) =>
                    isActive
                      ? 'person-link person-link--active'
                      : 'person-link'
                  }
                >
                  <span className="person-link__name">
                    {person.name}
                  </span>

                  <span className="person-link__role">
                    {person.role}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="people-detail">
        <Outlet />
      </div>
    </section>
  );
}
