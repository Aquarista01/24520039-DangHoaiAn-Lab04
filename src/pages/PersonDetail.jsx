import { useParams } from 'react-router';
import PersonLayout from '../components/PersonLayout.jsx';
import PersonNotFound from '../components/PersonNotFound.jsx';
import { getProfileFields } from '../data/people.js';

export default function PersonDetail({ people }) {
  const { id } = useParams();

  const person = people.find(
    (person) => person.id === id,
  );

  if (!person) {
    return <PersonNotFound />;
  }

  const fields = getProfileFields(person);

  const avatarSrc = person.avatarSrc ?? '/profile-avatar.svg';

  const avatarAlt = person.avatarAlt
    ?? `Profile illustration for ${person.name}`;

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
            src={avatarSrc}
            alt={avatarAlt}
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
          {fields.map((field) => (
            <div
              className="fact-row"
              key={field.label}
            >
              <dt>
                <span className="text-slot">
                  {field.label}
                </span>
              </dt>

              <dd>
                <span className="text-slot">
                  {field.value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </PersonLayout>
    </section>
  );
}
