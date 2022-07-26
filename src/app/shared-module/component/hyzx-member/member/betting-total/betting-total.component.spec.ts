import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingTotalComponent } from './betting-total.component';

describe('BettingTotalComponent', () => {
  let component: BettingTotalComponent;
  let fixture: ComponentFixture<BettingTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
