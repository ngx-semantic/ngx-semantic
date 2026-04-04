import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiAccordionModule} from './accordion.module';
import {SuiAccordionPanelComponent} from './accordion-panel.component';

describe('SuiAccordionPanelComponent', () => {
  let fixture: ComponentFixture<SuiAccordionPanelComponent>;
  let component: SuiAccordionPanelComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiAccordionModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiAccordionPanelComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('suiTitle', 'Section');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle open state when title is clicked', () => {
    expect(component.isOpen).toBe(false);
    const title = fixture.debugElement.query(By.css('.title'));
    title.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isOpen).toBe(true);
    title.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.title'));
    title.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isOpen).toBe(false);
  });
});
