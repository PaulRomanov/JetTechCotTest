import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalNewsComponent } from './historical-news.component';

describe('HistoricalNewsComponent', () => {
  let component: HistoricalNewsComponent;
  let fixture: ComponentFixture<HistoricalNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
