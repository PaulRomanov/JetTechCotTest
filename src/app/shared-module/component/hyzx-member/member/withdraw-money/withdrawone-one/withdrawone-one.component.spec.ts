import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawoneOneComponent } from './withdrawone-one.component';

describe('WithdrawoneOneComponent', () => {
  let component: WithdrawoneOneComponent;
  let fixture: ComponentFixture<WithdrawoneOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawoneOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawoneOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
