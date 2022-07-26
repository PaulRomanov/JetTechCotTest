import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalPasswordComponent } from './withdrawal-password.component';

describe('WithdrawalPasswordComponent', () => {
  let component: WithdrawalPasswordComponent;
  let fixture: ComponentFixture<WithdrawalPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawalPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
