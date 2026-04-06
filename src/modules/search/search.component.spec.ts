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
});
