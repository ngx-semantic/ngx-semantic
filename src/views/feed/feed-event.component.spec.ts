import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiFeedModule} from './feed.module';

@Component({
  standalone: true,
  imports: [SuiFeedModule],
  template: `
    <div suiFeedEvent [suiLabelIcon]="icon" [suiLabelImageUrl]="imageUrl">
      <span class="inner">Body</span>
    </div>
  `
})
class HostFeedEventComponent {
  @Input() icon: string | null = null;
  @Input() imageUrl: string | null = null;
}

describe('SuiFeedEventComponent', () => {
  let fixture: ComponentFixture<HostFeedEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostFeedEventComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostFeedEventComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should apply event class on host', () => {
    const el = fixture.debugElement.query(By.css('[suiFeedEvent]')).nativeElement as HTMLElement;
    expect(el.classList.contains('event')).toBe(true);
  });

  it('should render label when suiLabelIcon is set', () => {
    fixture.componentRef.setInput('icon', 'user');
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.label'));
    expect(label).toBeTruthy();
    expect(label.query(By.css('i.icon'))).toBeTruthy();
  });

  it('should render label image when suiLabelImageUrl is set', () => {
    fixture.componentRef.setInput('imageUrl', 'https://example.com/a.png');
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.label img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.getAttribute('src')).toBe('https://example.com/a.png');
  });

  it('should project content', () => {
    expect(fixture.debugElement.query(By.css('.inner'))).toBeTruthy();
  });
});
