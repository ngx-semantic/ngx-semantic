import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiSearchModule } from './search.module';
import { SuiSearchComponent } from './search.component';

describe('SuiSearchComponent', () => {
  let fixture: ComponentFixture<SuiSearchComponent>;
  let component: SuiSearchComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiSearchModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiSearchComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('suiOptions', [
      { title: 'Alpha', value: 1 },
      { title: 'Beta', value: 2 }
    ]);
    fixture.componentRef.setInput('suiSearchDelay', 200);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply search classes', () => {
    const root = fixture.debugElement.query(By.css('.ui.search')).nativeElement as HTMLElement;
    expect(root.className).toContain('ui');
    expect(root.className).toContain('search');
  });

  it('should filter local options after delay', fakeAsync(() => {
    component.searchTerm = 'al';
    component.onSearch();
    tick(200);
    fixture.detectChanges();
    expect(component.filteredOptions.length).toBe(1);
    expect(component.filteredOptions[0].title).toBe('Alpha');
    expect(component.isOpen).toBe(true);
  }));

  it('should emit selected option when a result is clicked', fakeAsync(() => {
    component.searchTerm = 'be';
    component.onSearch();
    tick(200);
    fixture.detectChanges();

    let selected = null as unknown;
    component.suiResultSelected.subscribe((o) => selected = o);

    const result = fixture.debugElement.query(By.css('a.result'));
    expect(result).toBeTruthy();
    result.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(selected).toEqual(jasmine.objectContaining({ title: 'Beta', value: 2 }));
    expect(component.searchTerm).toBe('Beta');
    expect(component.isOpen).toBe(false);
  }));

  it('should ignore host click handling when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    host.dispatchEvent(new Event('click'));
    expect(component).toBeTruthy();
  });

  it('onFocus should set focus styling', () => {
    component.onFocus();
    fixture.detectChanges();
    const root = fixture.debugElement.query(By.css('.ui.search')).nativeElement as HTMLElement;
    expect(root.className).toContain('focus');
  });

  it('onUnfocus should close results and clear focus', () => {
    component.isOpen = true;
    component.onFocus();
    component.onUnfocus();
    expect(component.isOpen).toBe(false);
    fixture.detectChanges();
    const root = fixture.debugElement.query(By.css('.ui.search')).nativeElement as HTMLElement;
    expect(root.className).not.toContain('focus');
  });

  it('onPageClick should close when click was outside', () => {
    component.isOpen = true;
    component.onPageClick();
    expect(component.isOpen).toBe(false);
  });

  it('onClick then onPageClick should keep open until outside cycle completes', () => {
    component.isOpen = true;
    component.onClick();
    component.onPageClick();
    expect(component.isOpen).toBe(true);
    component.onPageClick();
    expect(component.isOpen).toBe(false);
  });

  it('should render category groups when options have categories', fakeAsync(() => {
    fixture.componentRef.setInput('suiOptions', [
      { title: 'A1', value: 1, category: 'Cat' },
      { title: 'A2', value: 2, category: 'Cat' },
      { title: 'B1', value: 3, category: 'Other' }
    ]);
    fixture.detectChanges();

    component.searchTerm = 'a';
    component.onSearch();
    tick(200);
    fixture.detectChanges();

    const cats = fixture.debugElement.queryAll(By.css('.category .name'));
    expect(cats.length).toBeGreaterThan(0);
    expect(component.hasCategories).toBe(true);
  }));

  it('should use async lookup when suiOptionsLookup is set', fakeAsync(() => {
    const lookup = jasmine.createSpy('lookup').and.returnValue(
      Promise.resolve([{ title: 'Remote', value: 99 }])
    );

    fixture.componentRef.setInput('suiOptionsLookup', lookup);
    fixture.detectChanges();

    component.searchTerm = 'r';
    component.onSearch();
    tick(200);
    fixture.detectChanges();

    expect(lookup).toHaveBeenCalledWith('r');
    expect(component.filteredOptions.length).toBe(1);
    expect(component.filteredOptions[0].title).toBe('Remote');
  }));

  it('should clear results when lookup rejects', fakeAsync(() => {
    spyOn(console, 'error');
    const lookup = jasmine
      .createSpy('lookup')
      .and.returnValue(Promise.reject(new Error('network')));

    fixture.componentRef.setInput('suiOptionsLookup', lookup);
    fixture.detectChanges();

    component.searchTerm = 'x';
    component.onSearch();
    tick(200);
    fixture.detectChanges();

    expect(component.filteredOptions.length).toBe(0);
    expect(console.error).toHaveBeenCalled();
  }));

  it('suiShowIcon should use non-simple template with icon', () => {
    fixture.componentRef.setInput('suiShowIcon', true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div[sui-input]'))).toBeTruthy();
    expect(component.isSimple).toBe(false);
  });

  it('suiLoading should force non-simple layout', () => {
    fixture.componentRef.setInput('suiShowIcon', false);
    fixture.componentRef.setInput('suiLoading', true);
    fixture.detectChanges();
    expect(component.isSimple).toBe(false);
  });

  it('should apply alignment and fluid classes', () => {
    fixture.componentRef.setInput('suiAlignment', 'right');
    fixture.componentRef.setInput('suiFluid', true);
    fixture.detectChanges();
    const root = fixture.debugElement.query(By.css('.ui.search')).nativeElement as HTMLElement;
    expect(root.className).toContain('right');
    expect(root.className).toContain('fluid');
  });
});
