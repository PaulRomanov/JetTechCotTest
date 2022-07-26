import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadMoneyRewardComponent } from './spread-money-reward.component';

describe('SpreadMoneyRewardComponent', () => {
  let component: SpreadMoneyRewardComponent;
  let fixture: ComponentFixture<SpreadMoneyRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadMoneyRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadMoneyRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
