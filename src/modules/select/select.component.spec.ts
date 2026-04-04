import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiSelectModule} from './select.module';
import {SuiSelectComponent} from './select.component';

describe('SuiSelectComponent', () => {
  let fixture: ComponentFixture<SuiSelectComponent>;
  let component: SuiSelectComponent;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiSelectModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiSelectComponent);
    component = fixture.componentInstance;
    host = fixture.nativeElement as HTMLElement;
    fixture.componentRef.setInput('suiOptions', [
      {value: 1, text: 'One'},
      {value: 2, text: 'Two'}
    ]);
    fixture.componentRef.setInput('suiPlaceholder', 'Pick');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply dropdown classes', () => {
    expect(host.className).toContain('ui');
    expect(host.className).toContain('dropdown');
  });

  it('should emit selection when an item is clicked', () => {
    let emitted: unknown;
    component.suiSelectionChanged.subscribe((v) => emitted = v);

    const item = fixture.debugElement.query(By.css('[suiSelectMenuItem]'));
    expect(item).toBeTruthy();
    item.triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();

    expect(emitted).toBe(1);
    expect(component.selectedOption?.text).toBe('One');
  });
});
