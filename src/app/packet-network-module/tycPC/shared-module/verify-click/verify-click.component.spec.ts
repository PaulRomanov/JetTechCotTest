import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyClickComponent } from './verify-click.component';

describe('ZmHeaderComponent', () => {
  let component: VerifyClickComponent;
  let fixture: ComponentFixture<VerifyClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
