import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiSelectModule } from './select.module';
import { SuiSelectComponent } from './select.component';
import { SuiSelectMenuDirective } from './select-menu.directive';

describe('SuiSelectComponent', () => {
  let fixture: ComponentFixture<SuiSelectComponent>;
  let component: SuiSelectComponent;
  let host: HTMLElement;

  const baseOptions = [
    { value: 1, text: 'One' },
    { value: 2, text: 'Two' },
    { value: 3, text: 'Three' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiSelectModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiSelectComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('suiOptions', baseOptions);
    fixture.componentRef.setInput('suiPlaceholder', 'Pick');
    fixture.detectChanges();
  });

  function menuDir(): SuiSelectMenuDirective {
    return fixture.debugElement.query(By.directive(SuiSelectMenuDirective))
      .injector.get(SuiSelectMenuDirective);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply dropdown classes', () => {
    expect(host.className).toContain('ui');
    expect(host.className).toContain('dropdown');
  });

  it('should apply optional state classes', () => {
    fixture.componentRef.setInput('suiFluid', true);
    fixture.componentRef.setInput('suiCompact', true);
    fixture.componentRef.setInput('suiSearch', true);
    fixture.componentRef.setInput('suiLoading', true);
    fixture.componentRef.setInput('suiInline', true);
    fixture.componentRef.setInput('suiScrolling', true);
    fixture.componentRef.setInput('suiMultiple', true);
    fixture.componentRef.setInput('suiError', true);
    fixture.detectChanges();
    expect(host.className).toContain('fluid');
    expect(host.className).toContain('compact');
    expect(host.className).toContain('search');
    expect(host.className).toContain('loading');
    expect(host.className).toContain('inline');
    expect(host.className).toContain('scrolling');
    expect(host.className).toContain('multiple');
    expect(host.className).toContain('error');
  });

  it('should expose tabindex 0 on host', () => {
    expect(component.tabIndex).toBe(0);
  });

  it('should emit selection when an item is clicked', () => {
    let emitted: unknown;
    component.suiSelectionChanged.subscribe((v) => (emitted = v));

    const item = fixture.debugElement.query(By.css('[suiSelectMenuItem]'));
    expect(item).toBeTruthy();
    item.triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();

    expect(emitted).toBe(1);
    expect(component.selectedOption?.text).toBe('One');
  });

  it('should not open when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(menuDir().suiIsOpen).toBe(false);
    host.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(menuDir().suiIsOpen).toBe(false);
  });

  it('should toggle menu open state on click', () => {
    expect(menuDir().suiIsOpen).toBe(false);
    host.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(menuDir().suiIsOpen).toBe(true);
    expect(host.className).toContain('active');
    host.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(menuDir().suiIsOpen).toBe(false);
  });

  it('should add multiple selections and stop propagation', () => {
    fixture.componentRef.setInput('suiMultiple', true);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('[suiSelectMenuItem]'));
    const ev = new Event('click', { bubbles: true });
    spyOn(ev, 'stopPropagation');

    items[0].triggerEventHandler('click', ev);
    items[1].triggerEventHandler('click', ev);
    fixture.detectChanges();

    expect(component.selectedOptions.map((o) => o.text)).toEqual(['One', 'Two']);
    expect(ev.stopPropagation).toHaveBeenCalled();
  });

  it('should remove a multiple selection via delete icon', () => {
    fixture.componentRef.setInput('suiMultiple', true);
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('[suiSelectMenuItem]'));
    items[0].triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();

    let emitted: unknown;
    component.suiSelectionChanged.subscribe((v) => (emitted = v));

    const del = fixture.debugElement.query(By.css('a.label .delete.icon'));
    expect(del).toBeTruthy();
    const ev = new Event('click', { bubbles: true });
    spyOn(ev, 'stopPropagation');
    del.triggerEventHandler('click', ev);
    fixture.detectChanges();

    expect(component.selectedOptions.length).toBe(0);
    expect(emitted).toEqual([]);
    expect(ev.stopPropagation).toHaveBeenCalled();
  });

  it('removeSelection should no-op when not multiple', () => {
    const opt = baseOptions[0];
    const ev = new Event('click');
    component.removeSelection(opt, ev);
    expect(component.selectedOption).toBeUndefined();
  });

  it('should filter options when search is enabled', async () => {
    fixture.componentRef.setInput('suiSearch', true);
    fixture.detectChanges();

    component.searchTerm = 'tw';
    component.onSearch();
    await Promise.resolve();
    fixture.detectChanges();

    expect(component.filteredOptions.length).toBe(1);
    expect(component.filteredOptions[0].text).toBe('Two');
    expect(component.isFilteredText).toBe(true);
    expect(menuDir().suiIsOpen).toBe(true);
  });

  it('should show no results message when search has no matches', async () => {
    fixture.componentRef.setInput('suiSearch', true);
    fixture.detectChanges();

    component.searchTerm = 'zzz';
    component.onSearch();
    await Promise.resolve();
    fixture.detectChanges();

    expect(component.hasNoSearchResults()).toBe(true);
    const msg = fixture.debugElement.query(By.css('.message'));
    expect(msg).toBeTruthy();
    expect(msg.nativeElement.textContent).toContain('No results found');
  });

  it('hasNoSearchResults should be false without search', () => {
    expect(component.hasNoSearchResults()).toBe(false);
  });

  it('isActive should reflect single and multiple selection', () => {
    component.selectedOption = baseOptions[1];
    expect(component.isActive(baseOptions[1])).toBe(true);
    expect(component.isActive(baseOptions[0])).toBe(false);

    fixture.componentRef.setInput('suiMultiple', true);
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('[suiSelectMenuItem]'));
    items[1].triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();
    expect(component.isActive(baseOptions[1])).toBe(true);
  });

  it('writeValue should set selected option from form control', () => {
    let emitted: unknown;
    component.suiSelectionChanged.subscribe((v) => (emitted = v));

    component.writeValue(3);
    fixture.detectChanges();

    expect(component.selectedOption?.text).toBe('Three');
    expect(emitted).toBe(3);
  });

  it('registerOnChange should wire CVA callback', () => {
    const fn = jasmine.createSpy('onChange');
    component.registerOnChange(fn);

    const item = fixture.debugElement.query(By.css('[suiSelectMenuItem]'));
    item.triggerEventHandler('click', new Event('click'));
    expect(fn).toHaveBeenCalledWith(1);
  });

  it('setDisabledState should update disabled flag', () => {
    component.setDisabledState?.(true);
    expect(component.disabled).toBe(true);
  });

  it('should render image and flag on option when present', () => {
    fixture.componentRef.setInput('suiOptions', [
      {
        value: 'x',
        text: 'FlagImg',
        flag: 'us',
        image: { src: 'https://example.com/a.png', avatar: true }
      }
    ]);
    fixture.detectChanges();

    const imgs = fixture.debugElement.queryAll(By.css('img.ui.mini.image'));
    expect(imgs.length).toBeGreaterThan(0);
    expect(fixture.nativeElement.querySelector('.flag.us')).toBeTruthy();
  });
});
