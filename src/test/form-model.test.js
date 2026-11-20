import { describe, expect, it } from 'vitest';
import { createInitialValues } from '../components/form/formSchema.js';
import {
  normalizeForm,
  validateForm,
} from '../components/form/validation.js';

const validValues = {
  fullName: 'Đặng Hoài An',
  email: 'an@example.com',
  age: '21',
};

describe('Form validation model', () => {
  it('requires all initially empty fields', () => {
    expect(validateForm(createInitialValues())).toEqual({
      fullName: 'Full name is required.',
      email: 'Email is required.',
      age: 'Age is required.',
    });
  });

  it.each([
    ['fullName', '   '],
    ['email', 'invalid-email'],
    ['email', 'a@@example.com'],
    ['age', ''],
    ['age', 'abc'],
    ['age', '0'],
    ['age', '-1'],
    ['age', '1.5'],
    ['age', '2e1'],
    ['age', '9007199254740992'],
  ])('rejects invalid %s value %j', (field, value) => {
    const values = Object.assign(
      {},
      validValues,
      { [field]: value },
    );

    expect(validateForm(values)[field]).toBeTruthy();
  });

  it('accepts valid string input without modifying it', () => {
    const values = Object.assign({}, validValues, { age: '021' });

    expect(validateForm(values)).toEqual({});
    expect(values.age).toBe('021');
  });

  it('normalizes valid data and converts age to a number', () => {
    const result = normalizeForm({
      fullName: '  Đặng   Hoài An  ',
      email: ' an@example.com ',
      age: ' 021 ',
    });

    expect(result).toEqual({
      fullName: 'Đặng Hoài An',
      email: 'an@example.com',
      age: 21,
    });

    expect(typeof result.age).toBe('number');
    expect(Number.isNaN(result.age)).toBe(false);
  });

  it('refuses to normalize invalid data', () => {
    expect(() => {
      normalizeForm(Object.assign({}, validValues, { age: 'abc' }));
    }).toThrow('Cannot normalize an invalid form.');
  });
});
