import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { spreadMoneyComponent } from './spread-money.component';

describe('HistoricalNewsComponent', () => {
  let component: spreadMoneyComponent;
  let fixture: ComponentFixture<spreadMoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ spreadMoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(spreadMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
