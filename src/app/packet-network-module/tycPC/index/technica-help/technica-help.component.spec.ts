import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicaHelpComponent } from './technica-help.component';

describe('TechnicaHelpComponent', () => {
  let component: TechnicaHelpComponent;
  let fixture: ComponentFixture<TechnicaHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicaHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicaHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
