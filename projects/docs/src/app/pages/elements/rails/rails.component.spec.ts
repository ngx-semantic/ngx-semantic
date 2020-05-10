import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailsComponent } from './rails.component';

describe('RailsComponent', () => {
  let component: RailsComponent;
  let fixture: ComponentFixture<RailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
