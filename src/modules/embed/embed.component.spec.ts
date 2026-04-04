import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SuiEmbedModule} from './embed.module';
import {SuiEmbedComponent} from './embed.component';

describe('SuiEmbedComponent', () => {
  let fixture: ComponentFixture<SuiEmbedComponent>;
  let component: SuiEmbedComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiEmbedModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SuiEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply embed classes', () => {
    const root = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
    expect(root.className).toContain('ui');
    expect(root.className).toContain('embed');
  });

  it('playVideo should activate and set youtube url when suiSource is youtube', () => {
    fixture.componentRef.setInput('suiSource', 'youtube');
    fixture.componentRef.setInput('suiId', 'abc123');
    fixture.detectChanges();
    component.playVideo();
    fixture.detectChanges();
    expect(component.isPLaying).toBe(true);
    expect(component.videoUrl).toContain('youtube.com/embed/abc123');
  });

  it('should use suiSourceUrl when provided', () => {
    fixture.componentRef.setInput('suiSourceUrl', 'https://example.com/video');
    fixture.detectChanges();
    component.playVideo();
    fixture.detectChanges();
    expect(component.videoUrl).toBe('https://example.com/video');
    expect(component.isPLaying).toBe(true);
  });
});
