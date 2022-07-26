import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjPokerComponent } from './dj-poker.component';

describe('DjPokerComponent', () => {
  let component: DjPokerComponent;
  let fixture: ComponentFixture<DjPokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjPokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjPokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
