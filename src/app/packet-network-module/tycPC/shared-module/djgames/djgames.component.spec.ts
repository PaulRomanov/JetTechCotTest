import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjGamesComponent } from './djgames.component';

describe('DjGamesComponent', () => {
  let component: DjGamesComponent;
  let fixture: ComponentFixture<DjGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
