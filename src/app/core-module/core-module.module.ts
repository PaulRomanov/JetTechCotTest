import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NoopInterceptor} from './initerceptor/noop-interceptor';
import {NativeWebsocketImplService} from './websocket/native-websocket-impl.service';
import {CommonProxyService} from './common-util/common-proxy.service';
import { Utils } from './common-util/utils-service';
import {ParametersPipe} from './pipe/parameters.pipe';
import {GlobalService} from './common-util/global-service';
import {CommonDataService} from './common-util/common-data.service';
import {GlobalMethodsService} from './common-methods/global-methods.service';
import {EventBusService} from './event-bus/event-bus';
import {HoverClassActiveDirective} from './directive/hoverClassActive-directive';
import {ClickClassActiveDirective} from './directive/clickClassActive-directive';
import {LhLoadingDirective} from './directive/lh-loading-directive';
import {MessageService} from 'primeng/api';
import {OnlyNumberDirective } from './directive/only-number.directive';
import {SafePipe} from './pipe/safe.pipe';
import {BgUrlPipe} from './pipe/bgUrl.pipe';
// 服务
const SERVICE_PROVIDERS = [
  CommonProxyService,
  GlobalService,
  CommonDataService,
  GlobalMethodsService,
  MessageService,
  EventBusService,
  Utils
];
// 指令和管道
const COMMON_PIPE_AND_DIRECTIVE = [
  ParametersPipe,
  HoverClassActiveDirective,
  ClickClassActiveDirective,
  LhLoadingDirective,
  OnlyNumberDirective,
  SafePipe,
  BgUrlPipe
]

@NgModule({
  declarations: [
    ...COMMON_PIPE_AND_DIRECTIVE
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    ...COMMON_PIPE_AND_DIRECTIVE
  ],
  providers: [
    // 拦截器
    {provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true},
    // 公共服务
    ...SERVICE_PROVIDERS,
    // NativeWebsocketImplService
  ]
})

export class CoreModule {

}
