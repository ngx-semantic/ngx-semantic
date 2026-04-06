/** Resolve control like Semantic UI: id, then name, then data-validate. */
export function resolveFieldElement(root: HTMLElement, identifier: string): HTMLElement | null {
  if (!identifier) {
    return null;
  }
  const byId = root.querySelector(`#${escapeCssId(identifier)}`);
  if (byId instanceof HTMLElement) {
    return byId;
  }
  const byName = root.querySelector(`[name="${escapeAttrSelector(identifier)}"]`);
  if (byName instanceof HTMLElement) {
    return byName;
  }
  const byMeta = root.querySelector(`[data-validate="${escapeAttrSelector(identifier)}"]`);
  return byMeta instanceof HTMLElement ? byMeta : null;
}

function escapeCssId(id: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(id);
  }
  return id.replace(/([^a-zA-Z0-9_-])/g, '\\$1');
}

export function escapeAttrSelector(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

export function readControlValue(el: HTMLElement): unknown {
  if (el instanceof HTMLInputElement) {
    if (el.type === 'checkbox') {
      return el.checked;
    }
    if (el.type === 'radio') {
      const form = el.form ?? el.closest('form');
      if (form) {
        const checked = form.querySelector<HTMLInputElement>(
          `input[type="radio"][name="${escapeAttrSelector(el.name)}"]:checked`
        );
        return checked ? checked.value : '';
      }
      return el.checked ? el.value : '';
    }
    return el.value;
  }
  if (el instanceof HTMLSelectElement) {
    if (el.multiple) {
      return Array.from(el.selectedOptions).map(o => o.value);
    }
    return el.value;
  }
  if (el instanceof HTMLTextAreaElement) {
    return el.value;
  }
  return '';
}

export function findSemanticField(el: HTMLElement): HTMLElement | null {
  return el.closest('.field');
}

/** Label text for prompts: label[for=id], aria-label, placeholder. */
export function inferFieldName(el: HTMLElement, identifier: string): string {
  if (el.id) {
    const label = el.ownerDocument?.querySelector(`label[for="${escapeAttrSelector(el.id)}"]`);
    if (label?.textContent?.trim()) {
      return label.textContent.trim();
    }
  }
  const aria = el.getAttribute('aria-label');
  if (aria) {
    return aria;
  }
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    const ph = el.getAttribute('placeholder');
    if (ph) {
      return ph;
    }
  }
  return identifier;
}
