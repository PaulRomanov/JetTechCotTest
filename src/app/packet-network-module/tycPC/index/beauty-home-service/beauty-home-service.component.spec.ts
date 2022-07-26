import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyHomeServiceComponent } from './beauty-home-service.component';

describe('BeautyHomeServiceComponent', () => {
  let component: BeautyHomeServiceComponent;
  let fixture: ComponentFixture<BeautyHomeServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautyHomeServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautyHomeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
