import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../core-module/common-util/result';

@Component({
  selector: 'app-app-download',
  templateUrl: './app-download.component.html',
  styleUrls: ['./app-download.component.scss']
})
export class AppDownloadComponent implements OnInit {
  isQuanzhangApp = true;
  isKefuApp = false;
  isAnimation = true;
  appDownUrl = '';
  appDownUrl2 = '';
  constructor(
    public $GlobalService: GlobalService,
    public $CommonDataService: CommonDataService,
    public $GlobalMethodsService: GlobalMethodsService
  ) {
  }

  ngOnInit() {
    this.getAppDownQrCode();
    this.getAppDownQrCode2();
  }

  toggleApp(type) {
    if (type === 0) {
      this.isQuanzhangApp = true;
      this.isKefuApp = false;
      this.isAnimation = true;
    } else {
      this.isQuanzhangApp = false;
      this.isKefuApp = true;
      this.isAnimation = true;
    }

  }

  getAppDownQrCode() {
    this.$GlobalService.globalQueryModel.userconfig.usertype = 'SUBAGENT';
    this.$GlobalService.globalQueryModel.userconfig.keygroup = 'APPDOWNLOAD';
    this.$GlobalService.globalQueryModel.userconfig.keyname = 'ANDROID';
    this.$CommonDataService.userconfig().then((res: Result) => {
      this.appDownUrl = res.data[0].keyvalue + '?channelCode=' + this.$GlobalService.globalQueryModel.createUser.referCode;
    });
  }

  getAppDownQrCode2() {
    this.$GlobalService.globalQueryModel.userconfig.usertype = 'SUBAGENT';
    this.$GlobalService.globalQueryModel.userconfig.keygroup = 'APPDOWNLOAD';
    this.$GlobalService.globalQueryModel.userconfig.keyname = 'IOS';
    this.$CommonDataService.userconfig().then((res: Result) => {
      this.appDownUrl2 = res.data[0].keyvalue + '?channelCode=' + this.$GlobalService.globalQueryModel.createUser.referCode;
    });
  }

}
