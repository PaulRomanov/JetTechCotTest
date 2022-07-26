import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePermisComponent } from './game-permis.component';

describe('GamePermisComponent', () => {
  let component: GamePermisComponent;
  let fixture: ComponentFixture<GamePermisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePermisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePermisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
