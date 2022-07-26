import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetBankingQuickComponent } from './internet-banking-quick.component';

describe('InternetBankingQuickComponent', () => {
  let component: InternetBankingQuickComponent;
  let fixture: ComponentFixture<InternetBankingQuickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternetBankingQuickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetBankingQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
