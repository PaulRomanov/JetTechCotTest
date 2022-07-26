import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MallIndexComponent } from './mall-index.component';

describe('MallIndexComponent', () => {
  let component: MallIndexComponent;
  let fixture: ComponentFixture<MallIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MallIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MallIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
