import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiCardMetaDirective} from './card-meta.directive';
import {SuiCardModule} from './card.module';

@Component({
  standalone: true,
  imports: [SuiCardModule],
  template: `<div suiCardMeta></div>`
})
class TestHostComponent {}

describe('SuiCardMetaDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiCardMetaDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
  });
});
