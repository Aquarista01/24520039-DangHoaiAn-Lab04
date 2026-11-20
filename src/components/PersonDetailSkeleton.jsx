import PersonLayout from './PersonLayout.jsx';

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
            {person.facts.map((fact) => (
              <div
                className="fact-row"
                key={fact.label}
              >
                <dt>
                  <SkeletonText>
                    {fact.label}
                  </SkeletonText>
                </dt>

                <dd>
                  <SkeletonText>
                    {fact.value}
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
