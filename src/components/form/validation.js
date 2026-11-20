export function validateForm(values) {
  const errors = {};

  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const ageText = values.age.trim();

  if (fullName === '') {
    errors.fullName = 'Full name is required.';
  }

  if (email === '') {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (ageText === '') {
    errors.age = 'Age is required.';
  } else {
    const age = Number(ageText);

    if (
      !/^[0-9]+$/.test(ageText)
      || !Number.isSafeInteger(age)
      || age <= 0
    ) {
      errors.age =
        'Enter a positive whole number within the safe integer range.';
    }
  }

  return errors;
}

export function normalizeForm(values) {
  const errors = validateForm(values);

  if (Object.keys(errors).length > 0) {
    throw new Error('Cannot normalize an invalid form.');
  }

  return {
    fullName: values.fullName.trim().replace(/\s+/g, ' '),
    email: values.email.trim(),
    age: Number(values.age.trim()),
  };
}
