import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiPopupDirective, type SuiPopupPlacement } from './popup.directive';
import { SuiPopupModule } from './popup.module';

@Component({
  standalone: true,
  imports: [SuiPopupModule],
  template: `
    <button
      type="button"
      sui-popup
      [suiPopupTrigger]="trigger"
      [suiPopupPlacement]="placement"
      [suiPopupWidth]="width"
      [suiPopupSize]="size"
      [suiPopupTitle]="title"
      [suiPopupInverted]="inverted"
      [suiPopupFluid]="fluid"
      [suiPopupFlowing]="flowing"
      [suiPopupBasic]="basic">
      Anchor
    </button>
    <span id="outside">outside</span>
  `
})
class PopupHostComponent {
  @Input() trigger: 'click' | 'hover' = 'click';
  @Input() placement: SuiPopupPlacement = 'top left';
  @Input() width: 'wide' | 'very wide' | null = null;
  @Input() size: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive' | null = null;
  @Input() title: string | null = null;
  @Input() inverted = false;
  @Input() fluid = false;
  @Input() flowing = false;
  @Input() basic = false;
}

describe('SuiPopupDirective', () => {
  let fixture: ComponentFixture<PopupHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupHostComponent);
    fixture.componentRef.setInput('trigger', 'click');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('opens popup on click when trigger is click', () => {
    const btn = fixture.debugElement.query(By.directive(SuiPopupDirective)).nativeElement as HTMLElement;
    btn.click();
    fixture.detectChanges();
    expect(document.querySelector('.cdk-overlay-container .popup')).toBeTruthy();
  });

  it('closes popup when clicking outside', () => {
    const btn = fixture.debugElement.query(By.directive(SuiPopupDirective)).nativeElement as HTMLElement;
    btn.click();
    fixture.detectChanges();
    const outside = fixture.debugElement.query(By.css('#outside')).nativeElement as HTMLElement;
    outside.click();
    fixture.detectChanges();
    expect(document.querySelector('.cdk-overlay-container .popup')).toBeFalsy();
  });

  it('does not re-attach when opening twice', () => {
    const btn = fixture.debugElement.query(By.directive(SuiPopupDirective)).nativeElement as HTMLElement;
    btn.click();
    fixture.detectChanges();
    btn.click();
    fixture.detectChanges();
    expect(document.querySelectorAll('.cdk-overlay-container .popup').length).toBe(1);
  });

  it('opens on hover and closes after delay on leave', fakeAsync(() => {
    fixture.componentRef.setInput('trigger', 'hover');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(SuiPopupDirective)).nativeElement as HTMLElement;
    btn.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    fixture.detectChanges();
    expect(document.querySelector('.cdk-overlay-container .popup')).toBeTruthy();
    btn.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
    tick(200);
    fixture.detectChanges();
    expect(document.querySelector('.cdk-overlay-container .popup')).toBeFalsy();
  }));

  it('disposes overlay on destroy', () => {
    const btn = fixture.debugElement.query(By.directive(SuiPopupDirective)).nativeElement as HTMLElement;
    btn.click();
    fixture.detectChanges();
    expect(document.querySelector('.cdk-overlay-container')).toBeTruthy();
    fixture.destroy();
    expect(document.querySelector('.cdk-overlay-container .popup')).toBeFalsy();
  });

  const placements: SuiPopupPlacement[] = [
    'top left',
    'top center',
    'top right',
    'right center',
    'left center',
    'bottom left',
    'bottom center',
    'bottom right'
  ];

  it('supports all standard placements', () => {
    const outside = fixture.debugElement.query(By.css('#outside')).nativeElement as HTMLElement;
    for (const placement of placements) {
      fixture.componentRef.setInput('placement', placement);
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.directive(SuiPopupDirective)).nativeElement as HTMLElement;
      btn.click();
      fixture.detectChanges();
      expect(document.querySelector('.cdk-overlay-container .popup')).withContext(placement).toBeTruthy();
      outside.click();
      fixture.detectChanges();
    }
  });

  it('passes inputs through to popup component', () => {
    fixture.componentRef.setInput('title', 'T');
    fixture.componentRef.setInput('width', 'wide');
    fixture.componentRef.setInput('size', 'large');
    fixture.componentRef.setInput('inverted', true);
    fixture.componentRef.setInput('fluid', true);
    fixture.componentRef.setInput('flowing', true);
    fixture.componentRef.setInput('basic', true);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(SuiPopupDirective)).nativeElement as HTMLElement;
    btn.click();
    fixture.detectChanges();
    const header = document.querySelector('.cdk-overlay-container .header');
    expect(header?.textContent).toContain('T');
  });
});
