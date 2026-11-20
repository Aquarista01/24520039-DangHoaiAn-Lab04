export function createInitialValues() {
  return {
    fullName: '',
    email: '',
    age: '',
  };
}

export const formFields = [
  {
    name: 'fullName',
    label: 'Full name',
    type: 'text',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'age',
    label: 'Age',
    type: 'text',
    autoComplete: 'off',
    inputMode: 'numeric',
    required: true,
  },
];
