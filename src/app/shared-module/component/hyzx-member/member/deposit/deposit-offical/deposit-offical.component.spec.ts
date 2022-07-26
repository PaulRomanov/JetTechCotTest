import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositOfficalComponent } from './deposit-offical.component';

describe('DepositOfficalComponent', () => {
  let component: DepositOfficalComponent;
  let fixture: ComponentFixture<DepositOfficalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositOfficalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositOfficalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
