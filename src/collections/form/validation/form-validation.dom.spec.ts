import {
  escapeAttrSelector,
  findSemanticField,
  inferFieldName,
  readControlValue,
  resolveFieldElement
} from './form-validation.dom';

describe('form-validation.dom', () => {
  describe('resolveFieldElement', () => {
    it('returns null for empty identifier', () => {
      const root = document.createElement('form');
      expect(resolveFieldElement(root, '')).toBeNull();
    });

    it('resolves by id', () => {
      const root = document.createElement('form');
      const input = document.createElement('input');
      input.id = 'email';
      root.appendChild(input);
      expect(resolveFieldElement(root, 'email')).toBe(input);
    });

    it('resolves by name', () => {
      const root = document.createElement('form');
      const input = document.createElement('input');
      input.name = 'user';
      root.appendChild(input);
      expect(resolveFieldElement(root, 'user')).toBe(input);
    });

    it('resolves by data-validate', () => {
      const root = document.createElement('form');
      const input = document.createElement('input');
      input.setAttribute('data-validate', 'token');
      root.appendChild(input);
      expect(resolveFieldElement(root, 'token')).toBe(input);
    });
  });

  describe('escapeAttrSelector', () => {
    it('escapes backslashes and quotes', () => {
      expect(escapeAttrSelector('a\\b"c')).toBe('a\\\\b\\"c');
    });
  });

  describe('readControlValue', () => {
    it('reads checkbox checked state', () => {
      const el = document.createElement('input');
      el.type = 'checkbox';
      el.checked = true;
      expect(readControlValue(el)).toBe(true);
    });

    it('reads text input value', () => {
      const el = document.createElement('input');
      el.type = 'text';
      el.value = 'hello';
      expect(readControlValue(el)).toBe('hello');
    });

    it('reads select multiple', () => {
      const sel = document.createElement('select');
      sel.multiple = true;
      const o1 = document.createElement('option');
      o1.value = 'a';
      o1.selected = true;
      const o2 = document.createElement('option');
      o2.value = 'b';
      o2.selected = true;
      sel.append(o1, o2);
      expect(readControlValue(sel)).toEqual(['a', 'b']);
    });

    it('reads textarea', () => {
      const ta = document.createElement('textarea');
      ta.value = 'x';
      expect(readControlValue(ta)).toBe('x');
    });
  });

  describe('findSemanticField', () => {
    it('returns closest .field ancestor', () => {
      const field = document.createElement('div');
      field.className = 'field';
      const wrap = document.createElement('div');
      const input = document.createElement('input');
      wrap.appendChild(input);
      field.appendChild(wrap);
      expect(findSemanticField(input)).toBe(field);
    });
  });

  describe('inferFieldName', () => {
    it('uses label[for] text when present', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);
      const input = document.createElement('input');
      input.id = 'sui-dom-infer-label-test';
      const label = document.createElement('label');
      label.setAttribute('for', 'sui-dom-infer-label-test');
      label.textContent = 'Email address';
      root.append(label, input);
      expect(inferFieldName(input, 'sui-dom-infer-label-test')).toBe('Email address');
      document.body.removeChild(root);
    });

    it('falls back to aria-label', () => {
      const input = document.createElement('input');
      input.setAttribute('aria-label', 'Search');
      expect(inferFieldName(input, 'q')).toBe('Search');
    });

    it('falls back to placeholder', () => {
      const input = document.createElement('input');
      input.setAttribute('placeholder', 'Type here');
      expect(inferFieldName(input, 'x')).toBe('Type here');
    });

    it('falls back to identifier', () => {
      const input = document.createElement('input');
      expect(inferFieldName(input, 'fallback')).toBe('fallback');
    });
  });
});
