import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysWycxkComponent } from './companys-wycxk.component';

describe('CompanysWycxkComponent', () => {
  let component: CompanysWycxkComponent;
  let fixture: ComponentFixture<CompanysWycxkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysWycxkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysWycxkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
