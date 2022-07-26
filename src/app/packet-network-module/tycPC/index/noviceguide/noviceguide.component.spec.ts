import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviceguideComponent } from './noviceguide.component';

describe('NoviceguideComponent', () => {
  let component: NoviceguideComponent;
  let fixture: ComponentFixture<NoviceguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoviceguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviceguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
