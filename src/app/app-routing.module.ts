import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { environment } from 'src/environments/environment';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `/${environment.rootUrl}/index/noviceguide`},
  // { path: '**', redirectTo: 'packet/ly'},
  { path: '', loadChildren: './packet-network-module/packet-network.module#PacketNetworkModule'},
  { path: '**', redirectTo: `/${environment.rootUrl}/index/noviceguide`}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

