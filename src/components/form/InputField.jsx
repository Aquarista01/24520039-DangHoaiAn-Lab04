import { useId } from 'react';
import { useFormContext } from './FormContext.js';

export default function InputField({
  name,
  label,
  type = 'text',
  required = false,
  autoComplete,
  inputMode,
  placeholder,
}) {
  const generatedId = useId();

  const {
    values,
    errors,
    touched,
    submitted,
    setFieldValue,
    setFieldTouched,
  } = useFormContext();

  if (!Object.hasOwn(values, name)) {
    throw new Error(`Unknown form field "${name}".`);
  }

  const inputId = `${name}-${generatedId}`;
  const errorId = `${inputId}-error`;

  const showError = Boolean(
    errors[name] && (touched[name] || submitted),
  );

  return (
    <div className="form-field">
      <label className="form-label" htmlFor={inputId}>
        {label}
        {required && (
          <span className="form-required" aria-hidden="true" />
        )}
      </label>

      <input
        className="form-input"
        id={inputId}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        value={values[name]}
        onChange={(event) => {
          setFieldValue(name, event.target.value);
        }}
        onBlur={() => {
          setFieldTouched(name);
        }}
        aria-invalid={showError}
        aria-describedby={showError ? errorId : undefined}
      />

      {showError && (
        <p className="form-field-error" id={errorId}>
          {errors[name]}
        </p>
      )}
    </div>
  );
}
