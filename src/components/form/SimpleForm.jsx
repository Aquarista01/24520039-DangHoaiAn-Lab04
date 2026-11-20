import { useState } from 'react';
import { FormContext, useFormContext } from './FormContext.js';
import { createInitialValues, formFields } from './formSchema.js';

function DraftFields() {
  const { values, setFieldValue } = useFormContext();

  return (
    <div>
      {formFields.map((field) => (
        <div key={field.name}>
          <label>
            {field.label}
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              inputMode={field.inputMode}
              required={field.required}
              value={values[field.name]}
              onChange={(event) => {
                setFieldValue(field.name, event.target.value);
              }}
            />
          </label>
        </div>
      ))}
    </div>
  );
}

export default function SimpleForm({ children }) {
  const [values, setValues] = useState(createInitialValues);

  function setFieldValue(name, value) {
    setValues((previous) => Object.assign(
      {},
      previous,
      { [name]: value },
    ));
  }

  const context = {
    values,
    setFieldValue,
  };

  return (
    <FormContext value={context}>
      <section className="home-panel">
        <h1>Profile form</h1>
        <p>Enter your details. All fields are required.</p>
        {children ?? <DraftFields />}
      </section>
    </FormContext>
  );
}
