import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractInvestmentComponent } from './attract-investment.component';

describe('AttractInvestmentComponent', () => {
  let component: AttractInvestmentComponent;
  let fixture: ComponentFixture<AttractInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
