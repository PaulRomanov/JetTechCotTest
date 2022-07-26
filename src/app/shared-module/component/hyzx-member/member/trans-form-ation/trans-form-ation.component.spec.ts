import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransFormAtionComponent } from './trans-form-ation.component';

describe('TransFormAtionComponent', () => {
  let component: TransFormAtionComponent;
  let fixture: ComponentFixture<TransFormAtionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransFormAtionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransFormAtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
