import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import SimpleForm from '../components/form/SimpleForm.jsx';
import ShowData from '../components/form/ShowData.jsx';

async function fillValidForm(user) {
  await user.type(
    screen.getByLabelText('Full name'),
    '  Đặng   Hoài An  ',
  );
  await user.type(
    screen.getByLabelText('Email'),
    'an@example.com',
  );
  await user.type(screen.getByLabelText('Age'), '021');
}

function getInspector() {
  return screen.getByRole('region', {
    name: 'Last valid submission',
  });
}

function expectField(region, label, value) {
  const term = within(region).getByText(label).closest('dt');

  expect(term).toBeInTheDocument();
  expect(term.nextElementSibling.tagName).toBe('DD');
  expect(term.nextElementSibling).toHaveTextContent(value);
}

describe('Valid submit and ShowData', () => {
  it('does not create output for an empty invalid submit', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);

    await user.click(
      screen.getByRole('button', { name: 'Submit profile' }),
    );

    expect(
      screen.queryByRole('region', {
        name: 'Last valid submission',
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText('Full name is required.'),
    ).toBeInTheDocument();
  });

  it('shows normalized data while retaining raw editable input', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);
    await fillValidForm(user);

    await user.click(
      screen.getByRole('button', { name: 'Submit profile' }),
    );

    const inspector = getInspector();

    expect(inspector.querySelector('dl')).toBeInTheDocument();
    expectField(inspector, 'Full name', 'Đặng Hoài An');
    expectField(inspector, 'Email', 'an@example.com');
    expectField(inspector, 'Age', '21');

    expect(screen.getByLabelText('Full name')).toHaveValue(
      '  Đặng   Hoài An  ',
    );
    expect(screen.getByLabelText('Age')).toHaveValue('021');

    expect(screen.getByRole('status')).toHaveTextContent(
      'Submission 1 saved successfully.',
    );
  });

  it('updates the inspector only after the next valid submit', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);
    await fillValidForm(user);

    const submit = screen.getByRole('button', {
      name: 'Submit profile',
    });

    await user.click(submit);

    await user.clear(screen.getByLabelText('Full name'));
    await user.type(screen.getByLabelText('Full name'), 'Alex Morgan');
    await user.clear(screen.getByLabelText('Age'));
    await user.type(screen.getByLabelText('Age'), '30');

    expectField(getInspector(), 'Full name', 'Đặng Hoài An');
    expectField(getInspector(), 'Age', '21');

    await user.click(submit);

    expectField(getInspector(), 'Full name', 'Alex Morgan');
    expectField(getInspector(), 'Age', '30');

    expect(screen.getByRole('status')).toHaveTextContent(
      'Submission 2 saved successfully.',
    );
  });

  it('preserves the previous snapshot after an invalid submit', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);
    await fillValidForm(user);

    const submit = screen.getByRole('button', {
      name: 'Submit profile',
    });

    await user.click(submit);
    await user.clear(screen.getByLabelText('Age'));
    await user.type(screen.getByLabelText('Age'), 'abc');
    await user.click(submit);

    expectField(getInspector(), 'Age', '21');

    expect(screen.getByRole('status')).toHaveTextContent(
      'Submission 1 saved successfully.',
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('announces another valid submit even when values are unchanged', async () => {
    const user = userEvent.setup();
    render(<SimpleForm />);
    await fillValidForm(user);

    const submit = screen.getByRole('button', {
      name: 'Submit profile',
    });

    await user.click(submit);
    await user.click(submit);

    expect(screen.getByRole('status')).toHaveTextContent(
      'Submission 2 saved successfully.',
    );
  });

  it('renders zero and an explicit empty-string marker semantically', () => {
    render(
      <ShowData
        data={{ age: 0, notes: '' }}
        submissionNumber={1}
      />,
    );

    const inspector = getInspector();

    expectField(inspector, 'Age', '0');
    expectField(inspector, 'notes', '(empty)');
    expect(inspector.querySelector('pre')).toBeNull();
  });
});
