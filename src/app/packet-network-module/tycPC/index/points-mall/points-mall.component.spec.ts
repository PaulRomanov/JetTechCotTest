import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsMallComponent } from './points-mall.component';

describe('PointsMallComponent', () => {
  let component: PointsMallComponent;
  let fixture: ComponentFixture<PointsMallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsMallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsMallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
