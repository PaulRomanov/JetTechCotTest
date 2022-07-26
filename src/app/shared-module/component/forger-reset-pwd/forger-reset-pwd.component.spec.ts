import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgerResetPwdComponent } from './forger-reset-pwd.component';

describe('ForgerResetPwdComponent', () => {
  let component: ForgerResetPwdComponent;
  let fixture: ComponentFixture<ForgerResetPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgerResetPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgerResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
