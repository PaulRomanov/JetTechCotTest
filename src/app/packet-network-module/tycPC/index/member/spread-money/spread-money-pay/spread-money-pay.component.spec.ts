import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadMoneyPayComponent } from './spread-money-pay.component';

describe('SpreadMoneyPayComponent', () => {
  let component: SpreadMoneyPayComponent;
  let fixture: ComponentFixture<SpreadMoneyPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadMoneyPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadMoneyPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
