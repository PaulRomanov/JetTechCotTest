import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadMoneyRecordComponent } from './spread-money-record.component';

describe('SpreadMoneyRecordComponent', () => {
  let component: SpreadMoneyRecordComponent;
  let fixture: ComponentFixture<SpreadMoneyRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadMoneyRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadMoneyRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
