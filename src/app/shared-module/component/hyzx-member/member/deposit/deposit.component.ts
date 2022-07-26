import {Component, Input, OnInit} from '@angular/core';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../core-module/common-methods/global-methods.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Result} from '../../../../../core-module/common-util/result';

@Component({
  selector: 'pc-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  getPay;
  list = [];
  tabIndex = 0;
  showList = [];
  // urlData = {
  //   onLine: '',
  //   rechargerList: '',
  //   underLine: '',
  //   yinlian: ''
  // }
  constructor(private $CommonDataService: CommonDataService,
              private $GlobalService: GlobalService,
              private $GlobalMethodsService: GlobalMethodsService,
              private $router: Router,
              private $ActivatedRoute: ActivatedRoute) {
    // 取款获取个人信息
    this.$CommonDataService.getPayList().then((res: Result) => {
      // this.urlData.onLine = res.data.onLine;
      // this.urlData.yinlian = res.data.yinlian;
      // this.urlData.underLine = res.data.underLine;
      // this.urlData.rechargerList = res.data.rechargerList;
      // 公司入款的网银储蓄卡 start
      if (res.data.underLineInOnline && res.data.underLineInOnline.length > 0) {
        res.data.underLineInOnline.forEach((item)=>{
          item.WYCXK = 'wycxk'
          res.data.underLine.push(item);
        });
      }
      // 公司入款的网银储蓄卡 end
      this.$GlobalService.globalQueryModel.getPayListName = res.data;
      this.$GlobalService.globalQueryModel.getPayListData = res.data;
      this.list = [
        {name: '网银快捷', link: 'internetBankingQuick', isShow: res.data.yinlian.length > 0},
        {name: '在线存款', link: 'onlineDeposit', isShow: res.data.onLine.length > 0},
        {name: '公司入款', link: 'companysPayment', isShow: res.data.underLine.length > 0},
        {name: '官方直充', link: 'depositOffical', isShow: res.data.rechargerList.length > 0}
      ];
      this.list.forEach(item => {
        if (item.isShow) {
          this.showList.push(item);
        }
      });
      // 默认跳转路由
      this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.showList);
      this.$router.navigate([`../deposit/${this.showList[this.tabIndex].link}`], { relativeTo: this.$ActivatedRoute });
    });
  }

  ngOnInit() {
  }

}
