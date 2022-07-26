import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {PacketNetworkComponent} from './packet-network.component';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './packet-network.routes';
import {SharedModule} from '../shared-module/shared-module.module';



@NgModule({
  declarations: [
    PacketNetworkComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ]
})
export class PacketNetworkModule { }
