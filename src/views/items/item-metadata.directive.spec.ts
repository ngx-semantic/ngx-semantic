import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiItemMetadataDirective} from './item-metadata.directive';
import {SuiItemsModule} from './items.module';

@Component({
  standalone: true,
  imports: [SuiItemsModule],
  template: `<div suiItemMeta></div>`
})
class TestHostComponent {}

describe('SuiItemMetadataDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiItemMetadataDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
  });
});
