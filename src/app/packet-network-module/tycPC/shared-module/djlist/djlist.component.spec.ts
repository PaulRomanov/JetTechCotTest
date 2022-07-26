import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjlistComponent } from './djlist.component';

describe('DjlistComponent', () => {
  let component: DjlistComponent;
  let fixture: ComponentFixture<DjlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
