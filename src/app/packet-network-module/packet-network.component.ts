import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NativeWebsocketImplService} from '../core-module/websocket/native-websocket-impl.service';
import jQ from 'jquery';
import {GlobalMethodsService} from '../core-module/common-methods/global-methods.service';
import {GlobalService} from '../core-module/common-util/global-service';
@Component({
  selector: 'app-packet-network',
  templateUrl: './packet-network.component.html',
  styleUrls: ['./packet-network.component.scss']
})
export class PacketNetworkComponent implements OnInit {
  win_height_padded;

  // connect = window['connect'];
  // disconnect = window['disconnect'];
  // randomString = window['randomString'];
  constructor(
    private $router: Router,
    // private $socket: NativeWebsocketImplService,
    private $GlobalMethodsService: GlobalMethodsService,
    public $GlobalService: GlobalService,
  ) {
    // 客服的调用移到此处 之前在这里调用 $GlobalMethodsService 偶尔报错
    this.$GlobalMethodsService.loadkf();
  }

  ngOnInit() {
    // 初始化启动websoket连接 (解决方法报错)
   // setTimeout(() => {
   //   this.connect = window['connect'];
   //   this.disconnect = window['disconnect'];
   //   this.randomString = window['randomString'];
   //   if (sessionStorage.getItem('userToken')) {
   //     this.connect(sessionStorage.getItem('userToken'), this.$GlobalService.globalQueryModel.companyId);
   //   } else if (sessionStorage.getItem('swToken')) {
   //     this.connect(sessionStorage.getItem('swToken'), this.$GlobalService.globalQueryModel.companyId);
   //   } else {
   //     this.connect(this.randomString(32), this.$GlobalService.globalQueryModel.companyId);
   //   }
   // }, 100);

    jQ(window).on('scroll', this.revealOnScroll);
     this.win_height_padded = jQ(window).height() * 1.1;
  }
  revealOnScroll() {
    const win_height_padded = this.win_height_padded = jQ(window).height() * 1.1;
    const scrolled = jQ(window).scrollTop();
    jQ('.revealOnScroll:not(.animated)').each(function() {
      const $this = jQ(this),
        offsetTop = $this.offset().top;
      if (scrolled + win_height_padded > offsetTop) {
        if ($this.data('timeout')) {
         setTimeout(() => {
              $this.addClass('animated ' + $this.data('animation'));
            },
            parseInt($this.data('timeout'), 10));
        } else {
          $this.addClass('animated ' + $this.data('animation'));
        }
      }
    });
  }

}
