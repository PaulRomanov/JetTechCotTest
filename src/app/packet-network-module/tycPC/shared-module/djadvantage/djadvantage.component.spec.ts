import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjadvantageComponent } from './djadvantage.component';

describe('DjadvantageComponent', () => {
  let component: DjadvantageComponent;
  let fixture: ComponentFixture<DjadvantageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjadvantageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjadvantageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
