import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjbottomComponent } from './djbottom.component';

describe('DjbottomComponent', () => {
  let component: DjbottomComponent;
  let fixture: ComponentFixture<DjbottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjbottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjbottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
