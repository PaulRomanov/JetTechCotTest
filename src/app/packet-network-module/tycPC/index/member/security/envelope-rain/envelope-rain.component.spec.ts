import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvelopeRainComponent } from './envelope-rain.component';

describe('EnvelopeRainComponent', () => {
  let component: EnvelopeRainComponent;
  let fixture: ComponentFixture<EnvelopeRainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvelopeRainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvelopeRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
