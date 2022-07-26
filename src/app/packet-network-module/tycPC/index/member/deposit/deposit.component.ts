import {Component, Input, OnInit} from '@angular/core';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../core-module/common-methods/global-methods.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Result} from '../../../../../core-module/common-util/result';
import {SelectItem} from 'primeng/api';

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
  jumpChild = true;

  // urlData = {
  //   onLine: '',
  //   rechargerList: '',
  //   underLine: '',
  //   yinlian: ''
  // }
  constructor(public $CommonDataService: CommonDataService,
              public $GlobalService: GlobalService,
              public $GlobalMethodsService: GlobalMethodsService,
              public $router: Router,
              public $ActivatedRoute: ActivatedRoute) {
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
        {name: '网银快捷', link: 'internetBankingQuick', data: res.data.yinlian, isShow: res.data.yinlian.length > 0},
        {name: '客服充值', link: 'depositOffical', data: res.data.rechargerList, isShow: res.data.rechargerList.length > 0},
        {name: '公司入款', link: 'companysPayment', data: res.data.underLine, isShow: res.data.underLine.length > 0},
        {name: '在线充值', link: 'onlineDeposit', data: res.data.onLine, isShow: res.data.onLine.length > 0}
      ];
      this.list.forEach(item => {
        if (item.isShow) {
          this.showList.push(item);
        }
      });
      // 默认跳转路由
      // this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.showList);
      // this.$router.navigate([`../deposit/${this.showList[this.tabIndex].link}`], { relativeTo: this.$ActivatedRoute });
    });
  }

  ngOnInit() {
  }

  entranceChild(payChannel,link,item){
    if(payChannel){
      this.jumpChild=false;
      this.$router.navigate([link,payChannel], { relativeTo: this.$ActivatedRoute });
    }else {
      window.location.href=item.link
    }
    
  }
  
  blackDeposit(){
    this.jumpChild=true;
  }

}
