import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessCardComponent } from './chess-card.component';

describe('ChessCardComponent', () => {
  let component: ChessCardComponent;
  let fixture: ComponentFixture<ChessCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
