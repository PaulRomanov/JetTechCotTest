import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadMoneyDetailComponent } from './spread-money-detail.component';

describe('SpreadMoneyDetailComponent', () => {
  let component: SpreadMoneyDetailComponent;
  let fixture: ComponentFixture<SpreadMoneyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadMoneyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadMoneyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
