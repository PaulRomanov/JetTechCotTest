import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadLessonComponent } from './spread-lesson.component';

describe('SpreadLessonComponent', () => {
  let component: SpreadLessonComponent;
  let fixture: ComponentFixture<SpreadLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
