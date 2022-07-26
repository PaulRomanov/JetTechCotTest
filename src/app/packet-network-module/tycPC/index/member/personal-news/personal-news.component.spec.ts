import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalNewsComponent } from './personal-news.component';

describe('PersonalNewsComponent', () => {
  let component: PersonalNewsComponent;
  let fixture: ComponentFixture<PersonalNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
