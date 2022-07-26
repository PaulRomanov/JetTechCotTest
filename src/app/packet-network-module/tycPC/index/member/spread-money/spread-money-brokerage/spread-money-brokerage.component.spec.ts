import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadMoneyBrokerageComponent } from './spread-money-brokerage.component';

describe('SpreadMoneyBrokerageComponent', () => {
  let component: SpreadMoneyBrokerageComponent;
  let fixture: ComponentFixture<SpreadMoneyBrokerageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadMoneyBrokerageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadMoneyBrokerageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
