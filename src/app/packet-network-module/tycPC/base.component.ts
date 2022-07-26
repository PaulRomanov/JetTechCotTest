import {AfterViewInit, Component, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import {NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GlobalMethodsService} from '../../core-module/common-methods/global-methods.service';
import {GlobalService} from '../../core-module/common-util/global-service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  styles: [`
    :host ::ng-deep .ui-toast .ui-toast-message {
      background: rgba(0, 0, 0, .5);
      color: #ffffff;
      width: 550px;
      border-radius: 5px;
    }

    :host ::ng-deep .ui-toast .ui-toast-message-text-content {
      padding: 0;
      margin: 0;
    }

    :host ::ng-deep .ui-toast .ui-toast .ui-toast-message-content {
      padding: 0;
    }

    :host ::ng-deep .ui-toast .ui-toast-message-content {
      text-align: center;
      font-size: 18px;
    }

    :host ::ng-deep .ui-toast-detail {
      font-size: 18px;
    }

    :host ::ng-deep .ui-toast .ui-toast-close-icon {
      display: none;
    }
  `],
})
export class BaseComponent implements OnInit, AfterViewInit {
  styleName = '';
  title = null;
  companyId: any = environment.companyId;

  constructor(
    private $router: Router,
    private $title: Title,
    private $GlobalMethodsService: GlobalMethodsService,
    public $GlobalService: GlobalService,
  ) {
    this.styleName = `angular-${environment.rootUrl}-pc`;
    const isHttps = new RegExp('https');
    // this.companyId = 31466;
    // if (isHttps.test(window.parent.location.href)) {
    //   // 线上环境
    //   // this.companyId = 1227207;
    //   this.companyId = 31466;
    // } else {
    //   // 测试环境
    //   this.companyId = 37699;
    // }
    sessionStorage.setItem('companyId', this.companyId);
    // 网站名称
    this.title = '诚信安全，超凡体验';
    this.$GlobalService.globalJavaResData.title = this.title;
    this.$title.setTitle(this.$GlobalService.globalJavaResData.title);
  }

  ngOnInit() {
    // 拿到全局的cdn
    this.$GlobalMethodsService.getValidkeyCdn();
    // 监听路由变化
    this.$router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { // 当导航成功结束时执行
        document.documentElement.scrollTop = 0;
      }
    });
    this.$GlobalMethodsService.getCustomerQQ('QQ');
    this.$GlobalMethodsService.getCustomerQQ('MOBILE');
    this.$GlobalMethodsService.getSubAgentReferCode();
  }

  /**
   * 设置网站图标
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      const link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = `${this.$GlobalService.globalJavaResData.cdnValidKey2}/tyc/img/favicon.jpg`;
      document.getElementsByTagName('head')[0].appendChild(link);
    }, 500);
  }

}
