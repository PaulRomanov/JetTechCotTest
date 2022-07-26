import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowHuobiComponent } from './know-huobi.component';

describe('KnowHuobiComponent', () => {
  let component: KnowHuobiComponent;
  let fixture: ComponentFixture<KnowHuobiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowHuobiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowHuobiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});