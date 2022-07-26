import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpBankCardComponent } from './up-bank-card.component';

describe('UpBankCardComponent', () => {
  let component: UpBankCardComponent;
  let fixture: ComponentFixture<UpBankCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpBankCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpBankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
