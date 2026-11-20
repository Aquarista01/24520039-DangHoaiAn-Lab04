import { MemoryRouter } from 'react-router';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App.jsx';
import SimpleForm from '../components/form/SimpleForm.jsx';
import { useFormContext } from '../components/form/FormContext.js';

function ContextProbe() {
  const { values, setFieldValue } = useFormContext();

  return (
    <div>
      <label>
        Context name
        <input
          name="fullName"
          value={values.fullName}
          onChange={(event) => {
            setFieldValue('fullName', event.target.value);
          }}
        />
      </label>

      <p data-testid="context-name">{values.fullName}</p>
      <p data-testid="context-email">{values.email}</p>

      <button
        type="button"
        onClick={() => {
          setFieldValue('fullName', 'Đặng Hoài An');
          setFieldValue('email', 'an@example.com');
        }}
      >
        Update two fields
      </button>
    </div>
  );
}

describe('Form Context contract', () => {
  it('provides empty initial string values', () => {
    render(
      <SimpleForm>
        <ContextProbe />
      </SimpleForm>,
    );

    expect(screen.getByLabelText('Context name')).toHaveValue('');
    expect(screen.getByTestId('context-email')).toBeEmptyDOMElement();
  });

  it('updates Context values and preserves batched field changes', async () => {
    const user = userEvent.setup();

    render(
      <SimpleForm>
        <ContextProbe />
      </SimpleForm>,
    );

    await user.type(screen.getByLabelText('Context name'), 'An');

    expect(screen.getByTestId('context-name')).toHaveTextContent('An');

    await user.click(
      screen.getByRole('button', { name: 'Update two fields' }),
    );

    expect(screen.getByTestId('context-name')).toHaveTextContent(
      'Đặng Hoài An',
    );
    expect(screen.getByTestId('context-email')).toHaveTextContent(
      'an@example.com',
    );
  });

  it('reports a clear error outside the provider', () => {
    expect(() => {
      renderHook(() => useFormContext());
    }).toThrow('useFormContext must be used within SimpleForm.');
  });

  it('integrates the form page into the existing shared layout', () => {
    render(
      <MemoryRouter initialEntries={['/form']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Profile form' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Form' }),
    ).toHaveAttribute('aria-current', 'page');

    expect(screen.getAllByRole('main')).toHaveLength(1);
  });
});
