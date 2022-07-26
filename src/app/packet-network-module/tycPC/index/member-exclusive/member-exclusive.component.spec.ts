import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberExclusiveComponent } from './member-exclusive.component';

describe('IndexComponent', () => {
  let component: MemberExclusiveComponent;
  let fixture: ComponentFixture<MemberExclusiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberExclusiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberExclusiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
