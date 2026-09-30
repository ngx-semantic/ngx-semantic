import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SuiTableAttachment, SuiTableDirective } from './table.directive';
import { SuiTableModule } from './table.module';
import { SuiWidth } from 'ngx-semantic/core/enums';

@Component({
  standalone: true,
  imports: [SuiTableModule],
  template: `
    <table sui-table
           [suiWidth]="width"
           [suiAttached]="attached"
           [suiSortable]="sortable"
           [suiCelled]="celled"></table>`
})
class TestHostComponent {
  width: SuiWidth = null;
  attached: SuiTableAttachment = null;
  sortable = false;
  celled = false;
}

describe('SuiTableDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiTableDirective)).nativeElement;
  });

  it('should create', () => {
    expect(host).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className).toBe('ui table');
  });

  it('should include the column count in the class', () => {
    host.width = 'five';
    fixture.detectChanges();
    expect(el.className).toContain('five column');
  });

  it('should apply attached, sortable and celled classes', () => {
    host.attached = 'top attached';
    host.sortable = true;
    host.celled = true;
    fixture.detectChanges();
    expect(el.className).toContain('top attached');
    expect(el.classList).toContain('sortable');
    expect(el.classList).toContain('celled');
  });
});
