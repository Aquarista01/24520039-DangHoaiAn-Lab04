import PersonLayout from './PersonLayout.jsx';
import PersonNotFound from './PersonNotFound.jsx';
import { getProfileFields } from '../data/people.js';

function SkeletonText({ children }) {
  return (
    <span className="text-slot skeleton-text">
      <span className="skeleton-sizing">
        {children}
      </span>
    </span>
  );
}

export default function PersonDetailSkeleton({ person }) {
  if (!person) {
    return <PersonNotFound pending />;
  }

  const fields = getProfileFields(person);

  return (
    <>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Loading person detail.
      </p>

      <section
        className="person-panel"
        aria-label="Person detail"
        aria-busy="true"
      >
        <PersonLayout
          hidden
          avatar={
            <div className="avatar skeleton-block" />
          }
          heading={
            <h1>
              <SkeletonText>
                {person.name}
              </SkeletonText>
            </h1>
          }
          role={
            <p className="person-role">
              <SkeletonText>
                {person.role}
              </SkeletonText>
            </p>
          }
        >
          <dl className="person-facts">
            {fields.map((field) => (
              <div
                className="fact-row"
                key={field.label}
              >
                <dt>
                  <SkeletonText>
                    {field.label}
                  </SkeletonText>
                </dt>

                <dd>
                  <SkeletonText>
                    {field.value}
                  </SkeletonText>
                </dd>
              </div>
            ))}
          </dl>
        </PersonLayout>
      </section>
    </>
  );
}
