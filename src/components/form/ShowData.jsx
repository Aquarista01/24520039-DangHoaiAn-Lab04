import { useId } from 'react';
import { formFields } from './formSchema.js';

const fieldLabels = Object.fromEntries(
  formFields.map((field) => [field.name, field.label]),
);

export default function ShowData({
  data = null,
  submissionNumber = 1,
}) {
  const headingId = useId();

  return (
    <>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {data !== null
          ? `Submission ${submissionNumber} saved successfully.`
          : ''}
      </p>

      {data !== null && (
        <section
          className="home-panel"
          aria-labelledby={headingId}
        >
          <h2 id={headingId}>
            Last valid submission
          </h2>

          <p>
            These values are the last valid submitted snapshot.
            Editing the form does not update this result.
          </p>

          <dl className="person-facts">
            {Object.entries(data).map(([name, value]) => (
              <div className="fact-row" key={name}>
                <dt>{fieldLabels[name] ?? name}</dt>
                <dd>
                  {value === '' ? '(empty)' : String(value)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </>
  );
}
