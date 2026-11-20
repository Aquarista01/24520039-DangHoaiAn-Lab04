import { Link } from 'react-router';

export default function About() {
  return (
    <section className="home-panel">
      <p className="eyebrow">
        EXERCISE 1.2.1
      </p>

      <h1>
        About this lab
      </h1>

      <p>
        This learning project focuses on clear navigation,
        accessible content and stable page layouts.
      </p>

      <p>
        Use the shared navigation to visit Home or open
        the sample profile.
      </p>

      <Link
        className="button-link"
        to="/"
      >
        Return home
      </Link>
    </section>
  );
}
