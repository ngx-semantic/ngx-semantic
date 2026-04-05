import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiShapeSideComponent} from './shape-side.component';

@Component({
  standalone: true,
  imports: [SuiShapeSideComponent],
  template: `<sui-shape-side><span>content</span></sui-shape-side>`
})
class HostSideComponent {}

describe('SuiShapeSideComponent', () => {
  let fixture: ComponentFixture<HostSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostSideComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostSideComponent);
    fixture.detectChanges();
  });

  it('should create and render a .side element', () => {
    const side = fixture.debugElement.query(By.css('.side'));
    expect(side).toBeTruthy();
    expect(side.nativeElement.textContent?.trim()).toContain('content');
  });

  it('clearInlineStyles should empty ngStyle map', () => {
    const cmp = fixture.debugElement.query(By.directive(SuiShapeSideComponent))
      .componentInstance as SuiShapeSideComponent;
    cmp.inlineStyles = {transform: 'rotate(1deg)'};
    cmp.clearInlineStyles();
    expect(Object.keys(cmp.inlineStyles).length).toBe(0);
  });
});
