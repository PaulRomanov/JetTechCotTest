import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavourableConComponent } from './favourable-con.component';

describe('FavourableConComponent', () => {
  let component: FavourableConComponent;
  let fixture: ComponentFixture<FavourableConComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavourableConComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavourableConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
