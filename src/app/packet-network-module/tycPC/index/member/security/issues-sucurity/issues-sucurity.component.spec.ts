import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesSucurityComponent } from './issues-sucurity.component';

describe('IssuesSucurityComponent', () => {
  let component: IssuesSucurityComponent;
  let fixture: ComponentFixture<IssuesSucurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesSucurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesSucurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
