import {Routes} from '@angular/router';
import {PacketNetworkComponent} from './packet-network.component';
import { environment } from 'src/environments/environment';
export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    component: PacketNetworkComponent,
    children: [
      { path: `${environment.rootUrl}`, loadChildren: `./${environment.rootUrl}PC/base.module#BaseModule`},
      // { path: 'xh', loadChildren: './xh-heaven-earth/xh-heaven-earth.module#XhHeavenEarthModule'}
    ]
  }
];

