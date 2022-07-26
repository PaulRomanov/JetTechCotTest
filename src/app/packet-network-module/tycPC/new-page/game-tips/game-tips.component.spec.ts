import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTipsComponent } from './game-tips.component';

describe('GameTipsComponent', () => {
  let component: GameTipsComponent;
  let fixture: ComponentFixture<GameTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
