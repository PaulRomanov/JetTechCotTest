import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeRebateComponent } from './realtime-rebate.component';

describe('RealtimeRebateComponent', () => {
  let component: RealtimeRebateComponent;
  let fixture: ComponentFixture<RealtimeRebateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeRebateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeRebateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
