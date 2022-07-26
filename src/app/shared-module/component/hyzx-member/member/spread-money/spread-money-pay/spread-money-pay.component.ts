import { Component, OnInit, AfterViewInit } from '@angular/core';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {Result} from '../../../../../../core-module/common-util/result';
import {CommonProxyService} from '../../../../../../core-module/common-util/common-proxy.service';

@Component({
  selector: 'app-spread-money-pay',
  templateUrl: './spread-money-pay.component.html',
  styleUrls: ['./spread-money-pay.component.scss']
})
export class SpreadMoneyPayComponent implements OnInit, AfterViewInit {
  clipboard = window['ClipboardJS'];
  modal = window['modal'];
  isSpreadActive = false;
  isShow = true;
  spreadActiveData = {};
  accountList = [];
  selectedAccount;
  isLoad = false;
  constructor(
    public $GlobalService: GlobalService,
    public $CommonDataService: CommonDataService,
    public $CommonProxyService: CommonProxyService
  ) {
  }
  ngOnInit() {
    // 获取领取账户数据
    this.$CommonDataService.allbalancelist().then((res: Result) => {
      if (res.success === 0) {
        this.accountList = res.data.reverse().splice(1);
        this.selectedAccount = this.accountList[0];
      }
    });
  }
  ngAfterViewInit(): void {
    const clipboard = new this.clipboard('.copyBtn_website');
    clipboard.on('success', (e) => {
      this.modal.open({
        message: '复制成功',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      e.clearSelection();
    });
    clipboard.on('error',  (e) => {
      this.modal.open({
        message: '复制失败，请重新复制',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      e.clearSelection();
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck(): void {
    // 初始化数据(数据由父路由传过来，父路由中先请求)
    if (!this.isSpreadActive) {
      this.spreadActiveData = this.$GlobalService.globalQueryModel.spreadActiveObj.spreadActiveData;
      this.isSpreadActive = this.$GlobalService.globalQueryModel.spreadActiveObj.isSpreadActive;
      // 防止页面闪现问题
      this.isShow = false;
    }
  }
  // 一键激活
  goToSpreadActive() {
    this.$CommonDataService.goToSpreadActive().then((res: Result) => {
      if ( res.success === 0) {
        this.spreadActiveData = res.data;
        this.isSpreadActive = true;
        this.$GlobalService.globalQueryModel.spreadActiveObj.spreadActiveData = res.data;
        this.$GlobalService.globalQueryModel.spreadActiveObj.isSpreadActive = true;
      }
    });
  }
  // 领取奖励功能
  postRewardMoney(balance) {
    if (balance <= 0) {
      return;
    }
    this.$GlobalService.globalQueryModel.getRewardMoney.gameid = this.selectedAccount.id;
    this.$CommonDataService.getRewardMoney().then((response: Result) => {
      if (response.success === 0) {
        // 刷新数据
        this.modal.open({
          message: response.msg,
          confirmShow: true,
          confirmTxt: '确认',
          cancelShow: false
        });
        this.$CommonDataService.getUserSpreadActiveData().then((res: Result) => {
          if (res.active === 0) {
            // 如果是已经激活
            this.spreadActiveData = res.data;
            this.isSpreadActive = true;
            this.$GlobalService.globalQueryModel.spreadActiveObj.spreadActiveData = res.data;
            this.$GlobalService.globalQueryModel.spreadActiveObj.isSpreadActive = true;
          } else {
            // 如果未激活，只显示推广赚钱
          }
        });
      }
    });
  }
}
