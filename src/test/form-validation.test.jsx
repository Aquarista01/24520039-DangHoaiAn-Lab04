import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SimpleForm from '../components/form/SimpleForm.jsx';

const ageMessage =
  'Enter a positive whole number within the safe integer range.';

describe('InputField validation and accessibility', () => {
  it('starts empty with feedback hidden and custom validation enabled', () => {
    render(<SimpleForm />);

    const form = screen.getByRole('form', { name: 'Profile form' });
    expect(form).toHaveAttribute('novalidate');

    for (const label of ['Full name', 'Email', 'Age']) {
      const input = screen.getByLabelText(label);
      expect(input).toHaveValue('');
      expect(input).toBeRequired();
      expect(input).toHaveAttribute('aria-invalid', 'false');
      expect(input).not.toHaveAttribute('aria-describedby');
    }

    expect(
      screen.queryByText('Full name is required.'),
    ).not.toBeInTheDocument();
  });

  it('gives every field a unique stable ID linked to its label', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    const inputs = ['Full name', 'Email', 'Age'].map(
      (label) => screen.getByLabelText(label),
    );

    const ids = inputs.map((input) => input.id);

    expect(ids.every(Boolean)).toBe(true);
    expect(new Set(ids).size).toBe(3);

    for (const input of inputs) {
      expect(input.labels).toHaveLength(1);
      expect(input.labels[0].htmlFor).toBe(input.id);
    }

    await user.type(inputs[0], 'An');

    expect(inputs.map((input) => input.id)).toEqual(ids);
  });

  it('shows required errors and connects their IDs after invalid submit', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    await user.click(
      screen.getByRole('button', { name: 'Submit profile' }),
    );

    const cases = [
      ['Full name', 'Full name is required.'],
      ['Email', 'Email is required.'],
      ['Age', 'Age is required.'],
    ];

    for (const [label, message] of cases) {
      const input = screen.getByLabelText(label);
      const error = screen.getByText(message);

      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', error.id);
      expect(document.getElementById(error.id)).toBe(error);
    }

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please correct the highlighted fields before submitting.',
    );
  });

  it('rejects whitespace names and clears an email error when corrected', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    await user.type(screen.getByLabelText('Full name'), '   ');
    await user.tab();

    expect(
      screen.getByText('Full name is required.'),
    ).toBeInTheDocument();

    const email = screen.getByLabelText('Email');

    await user.type(email, 'invalid-email');
    await user.tab();

    expect(
      screen.getByText('Enter a valid email address.'),
    ).toBeInTheDocument();

    await user.clear(email);
    await user.type(email, 'an@example.com');

    expect(email).toHaveValue('an@example.com');
    expect(email).toHaveAttribute('aria-invalid', 'false');
    expect(email).not.toHaveAttribute('aria-describedby');

    expect(
      screen.queryByText('Enter a valid email address.'),
    ).not.toBeInTheDocument();
  });

  it('keeps invalid age text editable and accepts a positive integer', () => {
    render(<SimpleForm />);
    const age = screen.getByLabelText('Age');

    for (const value of ['abc', '0', '-2', '1.5', '2e1']) {
      fireEvent.change(age, { target: { value } });
      fireEvent.blur(age);

      expect(age).toHaveValue(value);
      expect(age).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByText(ageMessage)).toBeInTheDocument();
    }

    fireEvent.change(age, { target: { value: '' } });

    expect(
      screen.getByText('Age is required.'),
    ).toBeInTheDocument();

    fireEvent.change(age, { target: { value: '21' } });

    expect(age).toHaveValue('21');
    expect(age).toHaveAttribute('aria-invalid', 'false');
    expect(age).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByText(ageMessage)).not.toBeInTheDocument();
  });
});
