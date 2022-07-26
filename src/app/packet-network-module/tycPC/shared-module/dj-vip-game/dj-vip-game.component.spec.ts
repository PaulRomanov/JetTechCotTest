import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjVipGameComponent } from './dj-vip-game.component';

describe('DjVipGameComponent', () => {
  let component: DjVipGameComponent;
  let fixture: ComponentFixture<DjVipGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjVipGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjVipGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
