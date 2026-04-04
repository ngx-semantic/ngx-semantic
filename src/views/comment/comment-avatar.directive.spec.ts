import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiCommentAvatarDirective} from './comment-avatar.directive';
import {SuiCommentModule} from './comment.module';

@Component({
  standalone: true,
  imports: [SuiCommentModule],
  template: `<div suiCommentAvatar></div>`
})
class TestHostComponent {}

describe('SuiCommentAvatarDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.directive(SuiCommentAvatarDirective)).nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply host classes', () => {
    expect(el.className.trim().length).toBeGreaterThan(0);
  });
});
