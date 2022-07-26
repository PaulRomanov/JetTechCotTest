import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineDepositComponent } from './online-deposit.component';

describe('OnlineDepositComponent', () => {
  let component: OnlineDepositComponent;
  let fixture: ComponentFixture<OnlineDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
