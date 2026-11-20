import { Link } from 'react-router';

export default function Home() {
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
