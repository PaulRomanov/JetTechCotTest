import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettingsComponent } from './bettings.component';

describe('BettingsComponent', () => {
  let component: BettingsComponent;
  let fixture: ComponentFixture<BettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
