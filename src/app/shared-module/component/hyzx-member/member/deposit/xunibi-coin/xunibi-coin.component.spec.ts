import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XunibiCoinComponent } from './xunibi-coin.component';

describe('XunibiCoinComponent', () => {
  let component: XunibiCoinComponent;
  let fixture: ComponentFixture<XunibiCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XunibiCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XunibiCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
