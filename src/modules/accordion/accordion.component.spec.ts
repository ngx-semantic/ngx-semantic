import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiAccordionModule } from './accordion.module';
import { SuiAccordionComponent } from './accordion.component';
import { SuiAccordionPanelComponent } from './accordion-panel.component';

@Component({
  standalone: true,
  imports: [SuiAccordionModule],
  template: `
    <sui-accordion [suiCloseOthers]="true" [suiStyled]="true" [suiInverted]="true">
      <sui-accordion-panel suiTitle="First"></sui-accordion-panel>
      <sui-accordion-panel suiTitle="Second"></sui-accordion-panel>
    </sui-accordion>
  `
})
class TwoPanelHost {}

@Component({
  standalone: true,
  imports: [SuiAccordionModule],
  template: `
    <sui-accordion [suiCloseOthers]="false">
      <sui-accordion-panel suiTitle="A"></sui-accordion-panel>
      <sui-accordion-panel suiTitle="B"></sui-accordion-panel>
    </sui-accordion>
  `
})
class IndependentPanelsHost {}

describe('SuiAccordionComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('single accordion', () => {
    let fixture: ComponentFixture<SuiAccordionComponent>;
    let component: SuiAccordionComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SuiAccordionModule]
      }).compileComponents();

      fixture = TestBed.createComponent(SuiAccordionComponent);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('suiStyled', true);
      fixture.componentRef.setInput('suiFluid', true);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should apply accordion classes on wrapper', () => {
      const div = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
      expect(div.className).toContain('ui');
      expect(div.className).toContain('accordion');
      expect(div.className).toContain('styled');
      expect(div.className).toContain('fluid');
    });
  });

  describe('close others', () => {
    let fixture: ComponentFixture<TwoPanelHost>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TwoPanelHost]
      }).compileComponents();

      fixture = TestBed.createComponent(TwoPanelHost);
      fixture.detectChanges();
    });

    it('should close other panels when one opens', async () => {
      const panels = fixture.debugElement
        .queryAll(By.directive(SuiAccordionPanelComponent))
        .map((d) => d.componentInstance as SuiAccordionPanelComponent);
      const titles = fixture.debugElement.queryAll(By.css('sui-accordion-panel .title'));

      titles[0].nativeElement.click();
      await Promise.resolve();
      fixture.detectChanges();
      expect(panels[0].isOpen).toBe(true);

      titles[1].nativeElement.click();
      await Promise.resolve();
      fixture.detectChanges();

      expect(panels[1].isOpen).toBe(true);
      expect(panels[0].isOpen).toBe(false);
    });

    it('should destroy without error', () => {
      const acc = fixture.debugElement.query(By.directive(SuiAccordionComponent))
        .componentInstance as SuiAccordionComponent;
      expect(() => acc.ngOnDestroy()).not.toThrow();
    });
  });

  describe('suiCloseOthers false', () => {
    let fixture: ComponentFixture<IndependentPanelsHost>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [IndependentPanelsHost]
      }).compileComponents();

      fixture = TestBed.createComponent(IndependentPanelsHost);
      fixture.detectChanges();
    });

    it('should allow multiple panels open', async () => {
      const panels = fixture.debugElement
        .queryAll(By.directive(SuiAccordionPanelComponent))
        .map((d) => d.componentInstance as SuiAccordionPanelComponent);
      const titles = fixture.debugElement.queryAll(By.css('sui-accordion-panel .title'));

      titles[0].nativeElement.click();
      titles[1].nativeElement.click();
      await Promise.resolve();
      fixture.detectChanges();

      expect(panels[0].isOpen).toBe(true);
      expect(panels[1].isOpen).toBe(true);
    });
  });
});
