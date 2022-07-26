import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XunibiBianComponent } from './xunibi-bian.component';

describe('XunibiBianComponent', () => {
  let component: XunibiBianComponent;
  let fixture: ComponentFixture<XunibiBianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XunibiBianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XunibiBianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
