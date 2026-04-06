import { formatValidationPrompt } from './form-validation.prompt';

describe('formatValidationPrompt', () => {
  it('uses custom function prompt', () => {
    const msg = formatValidationPrompt(
      'empty',
      'Email',
      'email',
      '',
      v => `Custom: ${v}`,
      ''
    );
    expect(msg).toBe('Custom: ');
  });

  it('uses custom string template with placeholders', () => {
    const msg = formatValidationPrompt(
      'empty',
      'Name',
      'name',
      'x',
      '{name} ({identifier}) = {value}',
      ''
    );
    expect(msg).toBe('Name (name) = x');
  });

  it('uses default template for unknown rule types', () => {
    const msg = formatValidationPrompt(
      'unknownRule',
      'F',
      'f',
      '',
      undefined,
      ''
    );
    expect(msg).toBe('Please enter a valid value');
  });

  it('substitutes ruleValue in default email template', () => {
    const msg = formatValidationPrompt('email', 'E', 'e', 'bad', undefined, '');
    expect(msg).toContain('E');
    expect(msg).toContain('e-mail');
  });
});
