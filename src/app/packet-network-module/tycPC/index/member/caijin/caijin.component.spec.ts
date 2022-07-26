import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaijinComponent } from './caijin.component';

describe('CaijinComponent', () => {
  let component: CaijinComponent;
  let fixture: ComponentFixture<CaijinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaijinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaijinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
