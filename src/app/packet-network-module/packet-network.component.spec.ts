import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketNetworkComponent } from './packet-network.component';

describe('PacketNetworkComponent', () => {
  let component: PacketNetworkComponent;
  let fixture: ComponentFixture<PacketNetworkComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ PacketNetworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
