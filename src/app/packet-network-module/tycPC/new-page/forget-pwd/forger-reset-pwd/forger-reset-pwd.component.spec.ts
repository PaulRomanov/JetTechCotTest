import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YxForgerResetPwdComponent } from './forger-reset-pwd.component';

describe('YxForgerResetPwdComponent', () => {
  let component: YxForgerResetPwdComponent;
  let fixture: ComponentFixture<YxForgerResetPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YxForgerResetPwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YxForgerResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
