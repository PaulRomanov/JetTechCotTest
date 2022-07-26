import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjvideoComponent } from './djvideo.component';

describe('DjvideoComponent', () => {
  let component: DjvideoComponent;
  let fixture: ComponentFixture<DjvideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjvideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
