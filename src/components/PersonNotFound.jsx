import { Link } from 'react-router';

export default function PersonNotFound({
  pending = false,
}) {
  const textClass = pending
    ? 'text-slot skeleton-text'
    : 'text-slot';

  const sizingClass = pending
    ? 'skeleton-sizing'
    : undefined;

  return (
    <>
      {pending && (
        <p
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          Loading person detail.
        </p>
      )}

      <section
        className="home-panel"
        aria-label="Person detail"
        aria-busy={pending}
      >
        <h1 aria-hidden={pending || undefined}>
          <span className={textClass}>
            <span className={sizingClass}>
              404: Person Not Found
            </span>
          </span>
        </h1>

        <p aria-hidden={pending || undefined}>
          <span className={textClass}>
            <span className={sizingClass}>
              The requested profile is not in this directory.
            </span>
          </span>
        </p>

        {pending ? (
          <span
            className="text-slot skeleton-text"
            aria-hidden="true"
          >
            <span className="skeleton-sizing">
              Back to people
            </span>
          </span>
        ) : (
          <Link to="/people">
            Back to people
          </Link>
        )}
      </section>
    </>
  );
}
