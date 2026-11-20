import { useState } from 'react';
import { FormContext } from './FormContext.js';
import { createInitialValues, formFields } from './formSchema.js';
import { validateForm } from './validation.js';
import InputField from './InputField.jsx';
import './Form.css';

export default function SimpleForm({ children }) {
  const [values, setValues] = useState(createInitialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validateForm(values);
  const isValid = Object.keys(errors).length === 0;

  function setFieldValue(name, value) {
    setValues((previous) => Object.assign(
      {},
      previous,
      { [name]: value },
    ));
  }

  function setFieldTouched(name) {
    setTouched((previous) => Object.assign(
      {},
      previous,
      { [name]: true },
    ));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  const context = {
    values,
    errors,
    isValid,
    touched,
    submitted,
    setFieldValue,
    setFieldTouched,
  };

  return (
    <FormContext value={context}>
      <section className="home-panel form-page">
        <h1>Profile form</h1>
        <p>All fields are required.</p>

        <form
          className="form-body"
          aria-label="Profile form"
          noValidate
          onSubmit={handleSubmit}
        >
          {children ?? (
            <div className="form-fields">
              {formFields.map((field) => (
                <InputField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  inputMode={field.inputMode}
                />
              ))}
            </div>
          )}

          <p className="form-validity">
            {isValid
              ? 'All fields are valid.'
              : 'Complete all required fields.'}
          </p>

          {submitted && !isValid && (
            <p className="form-error-summary" role="alert">
              Please correct the highlighted fields before submitting.
            </p>
          )}

          <button className="form-submit" type="submit">
            Submit profile
          </button>
        </form>
      </section>
    </FormContext>
  );
}
