import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjchessCardComponent } from './djchess-card.component';

describe('DjchessCardComponent', () => {
  let component: DjchessCardComponent;
  let fixture: ComponentFixture<DjchessCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjchessCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjchessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
