import { Link } from 'react-router';

export default function NotFound() {
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
