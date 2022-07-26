import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBankCardComponent } from './new-bank-card.component';

describe('NewBankCardComponent', () => {
  let component: NewBankCardComponent;
  let fixture: ComponentFixture<NewBankCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBankCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
