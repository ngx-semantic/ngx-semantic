import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SuiModalModule} from './modal.module';
import {SuiModalComponent} from './modal.component';

describe('SuiModalComponent', () => {
  let fixture: ComponentFixture<SuiModalComponent>;
  let component: SuiModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiModalModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should append modal container to document body when visible becomes true', () => {
    component.visible = true;
    fixture.detectChanges();
    expect(document.body.querySelector('.ui.dimmer.modals.page')).toBeTruthy();
  });

  it('should remove visible and active classes from container when hidden', () => {
    component.visible = true;
    fixture.detectChanges();
    const el = document.body.querySelector('.ui.dimmer.modals.page') as HTMLElement;
    expect(el.classList.contains('visible')).toBe(true);
    expect(el.classList.contains('active')).toBe(true);
    component.visible = false;
    fixture.detectChanges();
    expect(el.classList.contains('visible')).toBe(false);
    expect(el.classList.contains('active')).toBe(false);
  });

  it('close icon should set visible to false when suiClosable and not basic', () => {
    fixture.componentRef.setInput('suiClosable', true);
    fixture.componentRef.setInput('suiBasic', false);
    component.visible = true;
    fixture.detectChanges();

    const closeIcon = document.body.querySelector('.modal i[sui-icon]');
    expect(closeIcon).toBeTruthy();
    (closeIcon as HTMLElement).click();
    fixture.detectChanges();
    expect(component.visible).toBe(false);
  });
});
