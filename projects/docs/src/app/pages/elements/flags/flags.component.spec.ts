import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagsComponent } from './flags.component';

describe('FlagsComponent', () => {
  let component: FlagsComponent;
  let fixture: ComponentFixture<FlagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
