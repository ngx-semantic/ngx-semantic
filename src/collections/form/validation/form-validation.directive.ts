/**
 * Semantic UI [Form Validation](https://semantic-ui.com/behaviors/form.html) — native Angular (no jQuery).
 * Use on the same `<form>` as `[sui-form]` (via `SuiFormModule`); add `suiFormValidation` and `suiFields`
 * matching Semantic’s `fields` object.
 *
 * When the host `<form>` uses **`NgForm`** (template-driven) or **`[formGroup]`** (reactive), rule failures are
 * written to matching `AbstractControl` errors under `suiFormValidation` so `form.valid` /
 * `control.invalid` align with Semantic rules alongside built-in validators.
 */

import { Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges, inject } from '@angular/core';
import {FormGroupDirective, NgForm} from '@angular/forms';
import type {AbstractControl, FormGroup} from '@angular/forms';
import {InputBoolean} from 'ngx-semantic/core/util';
import {Subject, fromEvent, merge} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';

import type {
  SuiFormNormalizedField,
  SuiFormRuleContext,
  SuiFormValidationFieldsInput
} from './form-validation.model';
import {
  escapeAttrSelector,
  findSemanticField,
  inferFieldName,
  readControlValue,
  resolveFieldElement
} from './form-validation.dom';
import {normalizeFields} from './form-validation.normalize';
import {formatValidationPrompt} from './form-validation.prompt';
import {patchSuiFormValidationControlError} from './form-validation.control-errors';
import {evaluateRule, parseRuleType} from './form-validation.rules';

function isEmptyValue(v: unknown): boolean {
  if (v === null || v === undefined) {
    return true;
  }
  if (typeof v === 'boolean') {
    return !v;
  }
  if (Array.isArray(v)) {
    return v.length === 0;
  }
  return String(v).trim() === '';
}

@Directive({
  standalone: true,
  selector: 'form[suiFormValidation]',
  exportAs: 'suiFormValidation'
})
export class SuiFormValidationDirective implements OnChanges, OnDestroy {
  private readonly el = inject<ElementRef<HTMLFormElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly zone = inject(NgZone);
  private readonly ngForm = inject(NgForm, { optional: true, host: true });
  private readonly formGroupDir = inject(FormGroupDirective, { optional: true, host: true });

  /** Validation field definitions (shorthand or longhand), matching Semantic UI `fields`. */
  @Input() public suiFields: SuiFormValidationFieldsInput | null = null;
  /** `submit`, `blur`, or `change` — when to validate fields. */
  @Input() public suiOn: 'submit' | 'blur' | 'change' = 'submit';
  @Input() @InputBoolean() public suiInline = false;
  @Input() @InputBoolean() public suiRevalidate = true;
  /** Debounce (ms) for `change` / revalidation; `true` uses 300ms; `false` disables. */
  @Input() public suiDelay: number | boolean = true;
  @Input() @InputBoolean() public suiKeyboardShortcuts = true;
  /** When using `NgForm` / `FormGroup`, mark all controls touched after a failed submit (shows native errors). */
  @Input() @InputBoolean() public suiMarkControlsTouchedOnInvalid = true;

  @Output() public readonly suiOnSuccess = new EventEmitter<Event>();
  @Output() public readonly suiOnFailure = new EventEmitter<{errors: string[]; fields: string[]}>();

  private readonly destroy$ = new Subject<void>();
  private readonly host: HTMLFormElement;
  private normalized: SuiFormNormalizedField[] = [];
  private defaultValues = new Map<string, string>();
  private teardownFieldSubs: (() => void) | null = null;

  constructor() {
    const el = this.el;

    this.host = el.nativeElement;
  }

  /** Reactive `[formGroup]` or template-driven `NgForm` on this host, if any. */
  public getAngularForm(): FormGroup | null {
    if (this.formGroupDir?.form) {
      return this.formGroupDir.form;
    }
    if (this.ngForm?.form) {
      return this.ngForm.form;
    }
    return null;
  }

  /** Control whose name matches `suiFields` identifier (flat `FormGroup` only). */
  public resolveControl(identifier: string): AbstractControl | null {
    const g = this.getAngularForm();
    const c = g?.get(identifier);
    return c ?? null;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['suiFields']) {
      this.normalized = this.suiFields ? normalizeFields(this.suiFields) : [];
    }
    if (changes['suiFields'] || changes['suiOn'] || changes['suiDelay'] || changes['suiRevalidate']) {
      this.bindFieldTriggers();
    }
  }

  public ngOnDestroy(): void {
    this.teardownFieldSubs?.();
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('submit', ['$event'])
  protected onHostSubmit(event: Event): void {
    if (!this.normalized.length) {
      return;
    }
    this.cacheDefaultsOnce();
    const r = this.runValidationWithUi();
    const form = this.getAngularForm();
    const ok = r.valid && (!form || form.valid);
    if (!ok) {
      if (this.suiMarkControlsTouchedOnInvalid && form) {
        form.markAllAsTouched();
      }
      event.preventDefault();
      event.stopPropagation();
      const errorsOut =
        r.errors.length > 0
          ? r.errors
          : form && !form.valid
            ? ['This form has validation errors.']
            : r.errors;
      this.suiOnFailure.emit({errors: errorsOut, fields: r.fieldIds});
      return;
    }
    this.suiOnSuccess.emit(event);
  }

  @HostListener('keydown', ['$event'])
  protected onHostKeydown(ev: KeyboardEvent): void {
    if (!this.suiKeyboardShortcuts) {
      return;
    }
    if (!this.host.contains(ev.target as Node)) {
      return;
    }
    if (ev.key === 'Escape') {
      (ev.target as HTMLElement)?.blur?.();
    }
  }

  /** Validate the whole form, update UI, emit success/failure. */
  public validateForm(): boolean {
    this.cacheDefaultsOnce();
    const r = this.runValidationWithUi();
    const form = this.getAngularForm();
    const ok = r.valid && (!form || form.valid);
    if (!ok) {
      if (this.suiMarkControlsTouchedOnInvalid && form) {
        form.markAllAsTouched();
      }
      const errorsOut =
        r.errors.length > 0
          ? r.errors
          : form && !form.valid
            ? ['This form has validation errors.']
            : r.errors;
      this.suiOnFailure.emit({errors: errorsOut, fields: r.fieldIds});
    } else {
      this.suiOnSuccess.emit(new Event('semantic-form-valid'));
    }
    return ok;
  }

  private runValidationWithUi(): {valid: boolean; errors: string[]; fieldIds: string[]} {
    const errors: string[] = [];
    const fieldIds: string[] = [];
    this.clearFormLevelMessage();
    this.clearAllFieldUi();
    for (const f of this.normalized) {
      const msg = this.evaluateFieldMessage(f);
      const ctrl = this.resolveControl(f.identifier);
      if (msg) {
        errors.push(msg);
        fieldIds.push(f.identifier);
        this.applyFieldError(f.identifier, msg);
        if (ctrl) {
          patchSuiFormValidationControlError(ctrl, msg);
        }
      }
    }
    this.renderFormLevelErrors(errors);
    return {valid: errors.length === 0, errors, fieldIds};
  }

  /** Validate one field by identifier (updates UI and `AbstractControl` errors when bound). */
  public validateField(identifier: string): boolean {
    const field = this.normalized.find(
      x => x.identifier === identifier || x.key === identifier
    );
    if (!field) {
      return true;
    }
    this.clearFieldUi(field.identifier);
    const msg = this.evaluateFieldMessage(field);
    const ctrl = this.resolveControl(field.identifier);
    if (msg) {
      if (ctrl) {
        patchSuiFormValidationControlError(ctrl, msg);
      }
      this.applyFieldError(field.identifier, msg);
      return false;
    }
    return true;
  }

  /** Whether the form (or one field) passes rules; does not update UI (Semantic `is valid`). */
  public isValid(identifier?: string): boolean {
    if (identifier) {
      const field = this.normalized.find(
        x => x.identifier === identifier || x.key === identifier
      );
      return field ? this.evaluateFieldMessage(field) === null : true;
    }
    return this.normalized.every(f => this.evaluateFieldMessage(f) === null);
  }

  public getFieldElement(identifier: string): HTMLElement | null {
    return resolveFieldElement(this.host, identifier);
  }

  public getValue(identifier: string): unknown {
    const ctrl = this.resolveControl(identifier);
    if (ctrl) {
      return ctrl.value;
    }
    const el = this.getFieldElement(identifier);
    return el ? readControlValue(el) : undefined;
  }

  public getValues(identifiers?: string[]): Record<string, unknown> {
    const ids =
      identifiers ??
      this.normalized.map(f => f.identifier);
    const out: Record<string, unknown> = {};
    for (const id of ids) {
      const ctrl = this.resolveControl(id);
      if (ctrl) {
        out[id] = ctrl.value;
        continue;
      }
      const el = resolveFieldElement(this.host, id);
      if (!el) {
        continue;
      }
      const name =
        el.getAttribute('name') ?? el.getAttribute('id') ?? el.getAttribute('data-validate') ?? id;
      out[name] = readControlValue(el);
    }
    return out;
  }

  public setValue(identifier: string, value: unknown): void {
    const ctrl = this.resolveControl(identifier);
    if (ctrl) {
      ctrl.setValue(value);
      return;
    }
    const el = resolveFieldElement(this.host, identifier);
    if (!el) {
      return;
    }
    this.writeControlValue(el, value);
  }

  public setValues(values: Record<string, unknown>): void {
    for (const k of Object.keys(values)) {
      this.setValue(k, values[k]);
    }
  }

  /** Restore values cached at first validation init (Semantic `reset`). */
  public reset(): void {
    const fields = this.host.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input, select, textarea'
    );
    fields.forEach(control => {
      const key = control.name || control.id;
      if (!key) {
        return;
      }
      if (this.defaultValues.has(key)) {
        this.writeControlValue(control as HTMLElement, this.defaultValues.get(key));
      }
    });
  }

  /** Clear all field values (Semantic `clear`). */
  public clear(): void {
    this.host.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input, select, textarea'
    ).forEach(control => {
      if (control instanceof HTMLInputElement) {
        if (control.type === 'checkbox' || control.type === 'radio') {
          control.checked = false;
        } else {
          control.value = '';
        }
      } else if (control instanceof HTMLSelectElement) {
        if (control.multiple) {
          Array.from(control.options).forEach(o => (o.selected = false));
        } else {
          control.selectedIndex = 0;
        }
      } else {
        control.value = '';
      }
    });
  }

  private debounceMs(): number {
    if (this.suiDelay === false) {
      return 0;
    }
    if (this.suiDelay === true) {
      return 300;
    }
    return Math.max(0, this.suiDelay);
  }

  private ctx(): SuiFormRuleContext {
    return {
      getFieldValue: id => {
        const c = this.resolveControl(id);
        if (c) {
          return c.value;
        }
        const el = resolveFieldElement(this.host, id);
        return el ? readControlValue(el) : '';
      },
      getFieldElement: id => resolveFieldElement(this.host, id)
    };
  }

  private evaluateFieldMessage(field: SuiFormNormalizedField): string | null {
    const ctx = this.ctx();
    if (field.depends) {
      const dep = ctx.getFieldValue(field.depends);
      if (isEmptyValue(dep)) {
        return null;
      }
    }
    const ctrl = this.resolveControl(field.identifier);
    const el = resolveFieldElement(this.host, field.identifier);
    const value = ctrl ? ctrl.value : el ? readControlValue(el) : undefined;
    if (field.optional && isEmptyValue(value)) {
      return null;
    }
    const fieldName = el ? inferFieldName(el, field.identifier) : field.identifier;
    for (const rule of field.rules) {
      if (!evaluateRule(rule, value, field.identifier, ctx)) {
        const {bracket} = parseRuleType(rule.type);
        return formatValidationPrompt(
          rule.type,
          fieldName,
          field.identifier,
          value,
          rule.prompt,
          bracket ?? ''
        );
      }
    }
    return null;
  }

  private cacheDefaultsOnce(): void {
    if (this.defaultValues.size) {
      return;
    }
    this.host.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input, select, textarea'
    ).forEach(control => {
      const key = control.name || control.id;
      if (!key) {
        return;
      }
      if (control instanceof HTMLInputElement && (control.type === 'checkbox' || control.type === 'radio')) {
        this.defaultValues.set(key, control.checked ? '1' : '');
      } else {
        this.defaultValues.set(key, control.value);
      }
    });
  }

  private bindFieldTriggers(): void {
    this.teardownFieldSubs?.();
    this.teardownFieldSubs = null;
    if (!this.normalized.length || this.suiOn === 'submit') {
      return;
    }
    const sub = new Subject<void>();
    const stop = () => {
      sub.next();
      sub.complete();
    };
    this.teardownFieldSubs = stop;
    const ms = this.debounceMs();

    this.zone.runOutsideAngular(() => {
      for (const f of this.normalized) {
        const el = resolveFieldElement(this.host, f.identifier);
        if (!el) {
          continue;
        }
        const ev =
          this.suiOn === 'blur'
            ? fromEvent(el, 'blur')
            : merge(fromEvent(el, 'input'), fromEvent(el, 'change'));
        const piped =
          ms > 0 ? ev.pipe(debounceTime(ms)) : ev;
        piped.pipe(takeUntil(sub), takeUntil(this.destroy$)).subscribe(() => {
          this.zone.run(() => {
            this.validateField(f.identifier);
          });
        });
      }
    });

    if (this.suiRevalidate && this.suiOn === 'blur') {
      this.zone.runOutsideAngular(() => {
        for (const f of this.normalized) {
          const el = resolveFieldElement(this.host, f.identifier);
          if (!el) {
            continue;
          }
          const piped =
            ms > 0
              ? fromEvent(el, 'input').pipe(debounceTime(ms))
              : fromEvent(el, 'input');
          piped.pipe(takeUntil(sub), takeUntil(this.destroy$)).subscribe(() => {
            const group = findSemanticField(el);
            if (group?.classList.contains('error')) {
              this.zone.run(() => this.validateField(f.identifier));
            }
          });
        }
      });
    }
  }

  private clearAllFieldUi(): void {
    for (const f of this.normalized) {
      this.clearFieldUi(f.identifier);
    }
  }

  private clearFieldUi(identifier: string): void {
    const ctrl = this.resolveControl(identifier);
    if (ctrl) {
      patchSuiFormValidationControlError(ctrl, null);
    }
    const el = resolveFieldElement(this.host, identifier);
    const group = el ? findSemanticField(el) : null;
    if (group) {
      this.renderer.removeClass(group, 'error');
      const prompt = group.querySelector<HTMLElement>('.prompt');
      if (prompt) {
        this.renderer.setProperty(prompt, 'textContent', '');
        if (this.suiInline) {
          this.renderer.removeStyle(prompt, 'display');
        } else {
          this.renderer.setStyle(prompt, 'display', 'none');
        }
      }
    }
  }

  private applyFieldError(identifier: string, message: string): void {
    const el = resolveFieldElement(this.host, identifier);
    const group = el ? findSemanticField(el) : null;
    if (!group) {
      return;
    }
    this.renderer.addClass(group, 'error');
    if (!this.suiInline) {
      return;
    }
    let prompt = group.querySelector<HTMLElement>('.prompt');
    if (!prompt) {
      prompt = this.renderer.createElement('div');
      this.renderer.addClass(prompt, 'ui');
      this.renderer.addClass(prompt, 'basic');
      this.renderer.addClass(prompt, 'red');
      this.renderer.addClass(prompt, 'pointing');
      this.renderer.addClass(prompt, 'label');
      this.renderer.addClass(prompt, 'prompt');
      this.renderer.setAttribute(prompt, 'role', 'alert');
      this.renderer.appendChild(group, prompt);
    }
    this.renderer.setProperty(prompt, 'textContent', message);
    this.renderer.removeStyle(prompt, 'display');
  }

  private renderFormLevelErrors(messages: string[]): void {
    const block = this.host.querySelector<HTMLElement>('.ui.error.message, .error.message');
    if (!block || !messages.length) {
      return;
    }
    const ul = this.renderer.createElement('ul');
    ul.className = 'list';
    for (const m of messages) {
      const li = this.renderer.createElement('li');
      li.textContent = m;
      ul.appendChild(li);
    }
    block.innerHTML = '';
    block.appendChild(ul);
    this.renderer.removeClass(block, 'hidden');
  }

  private clearFormLevelMessage(): void {
    const block = this.host.querySelector<HTMLElement>('.ui.error.message, .error.message');
    if (block) {
      block.innerHTML = '';
    }
  }

  private writeControlValue(el: HTMLElement, value: unknown): void {
    if (el instanceof HTMLInputElement) {
      if (el.type === 'checkbox') {
        el.checked = Boolean(value);
        return;
      }
      if (el.type === 'radio') {
        const form = el.form ?? this.host;
        const name = el.name;
        const str = String(value ?? '');
        form
          .querySelectorAll<HTMLInputElement>(
            `input[type="radio"][name="${escapeAttrSelector(name)}"]`
          )
          .forEach(r => {
            r.checked = r.value === str;
          });
        return;
      }
      el.value = value === null || value === undefined ? '' : String(value);
      return;
    }
    if (el instanceof HTMLSelectElement) {
      if (el.multiple && Array.isArray(value)) {
        const set = new Set(value.map(String));
        Array.from(el.options).forEach(o => {
          o.selected = set.has(o.value);
        });
      } else {
        el.value = String(value ?? '');
      }
      return;
    }
    if (el instanceof HTMLTextAreaElement) {
      el.value = value === null || value === undefined ? '' : String(value);
    }
  }
}
