import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBankCardComponent } from './history-bank-card.component';

describe('HistoryBankCardComponent', () => {
  let component: HistoryBankCardComponent;
  let fixture: ComponentFixture<HistoryBankCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBankCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
