import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesTermsComponent } from './rules-terms.component';

describe('RulesTermsComponent', () => {
  let component: RulesTermsComponent;
  let fixture: ComponentFixture<RulesTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
