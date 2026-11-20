import PersonLayout from '../components/PersonLayout.jsx';

export default function PersonDetail({ person }) {
  return (
    <section
      className="person-panel"
      aria-label="Person detail"
      aria-busy="false"
    >
      <PersonLayout
        avatar={
          <img
            className="avatar"
            src={person.avatarSrc}
            alt={person.avatarAlt}
            width="96"
            height="96"
          />
        }
        heading={
          <h1>
            <span className="text-slot">
              {person.name}
            </span>
          </h1>
        }
        role={
          <p className="person-role">
            <span className="text-slot">
              {person.role}
            </span>
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
                <span className="text-slot">
                  {fact.label}
                </span>
              </dt>

              <dd>
                <span className="text-slot">
                  {fact.value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </PersonLayout>
    </section>
  );
}
