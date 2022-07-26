import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XunibiHuobiComponent } from './xunibi-huobi.component';

describe('XunibiHuobiComponent', () => {
  let component: XunibiHuobiComponent;
  let fixture: ComponentFixture<XunibiHuobiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XunibiHuobiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XunibiHuobiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
