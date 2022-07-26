import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysPaymentComponent } from './companys-payment.component';

describe('CompanysPaymentComponent', () => {
  let component: CompanysPaymentComponent;
  let fixture: ComponentFixture<CompanysPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
