import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonBankCardsComponent } from './common-bank-cards.component';

describe('CommonBankCardsComponent', () => {
  let component: CommonBankCardsComponent;
  let fixture: ComponentFixture<CommonBankCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonBankCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonBankCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
