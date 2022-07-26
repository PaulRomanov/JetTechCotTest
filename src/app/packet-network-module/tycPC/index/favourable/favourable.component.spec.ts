import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavourableComponent } from './favourable.component';

describe('FavourableComponent', () => {
  let component: FavourableComponent;
  let fixture: ComponentFixture<FavourableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavourableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavourableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
