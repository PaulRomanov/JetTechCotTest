import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZmHeaderComponent } from './zm-header.component';

describe('ZmHeaderComponent', () => {
  let component: ZmHeaderComponent;
  let fixture: ComponentFixture<ZmHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZmHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
