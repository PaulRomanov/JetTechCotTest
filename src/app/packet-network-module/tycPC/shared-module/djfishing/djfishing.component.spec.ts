import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjfishingComponent } from './djfishing.component';

describe('DjfishingComponent', () => {
  let component: DjfishingComponent;
  let fixture: ComponentFixture<DjfishingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjfishingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjfishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
