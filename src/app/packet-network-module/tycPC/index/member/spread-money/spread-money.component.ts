import { Component, OnInit } from '@angular/core';
import { GlobalMethodsService } from '../../../../../core-module/common-methods/global-methods.service';
import { CommonDataService } from '../../../../../core-module/common-util/common-data.service';
import { Result } from 'src/app/core-module/common-util/result';
import { GlobalService } from '../../../../../core-module/common-util/global-service';
@Component({
  selector: 'pc-spread-money',
  templateUrl: './spread-money.component.html',
  styleUrls: ['./spread-money.component.scss']
})
export class SpreadMoneyComponent implements OnInit {
  typeUrl = 0;
  list = [
    { name: '推广赚钱', link: 'spreadMoneyPay', isShow: true },
    // { name: '佣金查询', link: 'spreadMoneyBrokerage', isShow: true }
    // { name: '可领取奖励明细', link: 'spreadMoneyReward', isShow: true },
    // { name: '领取记录', link: 'spreadMoneyRecord', isShow: true },
    // { name: '推广明细', link: 'spreadMoneyDetail', isShow: true },
    // { name: '统计报表', link: 'statement', isShow: true }
  ];
  tabIndex = 0;
  isSpreadActive = false;
  spreadActiveData = {};
  winningSwitch = 0;
  spreadMode = 0;
  dataReportSwitch = 0;
  constructor(
    public $GlobalMethodsService: GlobalMethodsService,
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService
  ) {
    this.winningSwitch = parseFloat(sessionStorage.getItem('winningSwitch'));
    this.spreadMode = parseFloat(sessionStorage.getItem('spreadMode'));
    this.dataReportSwitch = parseFloat(sessionStorage.getItem('dataReportSwitch'));
    // this.list = [
    //   { name: '推广赚钱', link: 'spreadMoneyPay', isShow: true },
    //   { name: '佣金查询', link: 'spreadMoneyBrokerage', isShow: this.winningSwitch === 0 ? false : true }
    // ];
  }
  ngOnInit() {
    this.$CommonDataService.getUserSpreadActiveData().then((res: Result) => {
      if (res.success === 0) {
        if (res.active === 0) {
          // 如果是已经激活
          this.$GlobalService.globalQueryModel.spreadActiveObj.spreadActiveData = res.data;
          this.$GlobalService.globalQueryModel.spreadActiveObj.isSpreadActive = true;
        } else {
          // 如果未激活，只显示推广赚钱
        }
      }
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck(): void {
    // 初始化数据(数据由子路由传过来，子路由中一键激活成功)
    if (!this.isSpreadActive) {
      this.spreadActiveData = this.$GlobalService.globalQueryModel.spreadActiveObj.spreadActiveData;
      this.isSpreadActive = this.$GlobalService.globalQueryModel.spreadActiveObj.isSpreadActive;
      /****
        这里情况比较多,全民推广跟佣金查询联动判断
        1）后台开启推广功能和输赢佣金功能时，显示全民推广菜单（包含推广赚钱以及推广教程），
        推广赚钱菜单项增加佣金查询功能；
        2）后台开启推广功能，关闭输赢佣金功能时，不显示佣金查询菜单；
        3）后台关闭推广功能，开启输赢佣金功能时，显示全民推广菜单（仅显示推广赚钱项，不展示推广教程），
        推广赚钱菜单项仅显示推广赚钱和佣金查询；
        4）后台关闭推广功能及输赢佣金功能时，不显示全民推广主菜单。
        全民推广模式
        mode=0表示关闭全民推广，mode=1表示打开全民推广无限模式，mode=2表示打开全民推广提成模式
        输赢佣金开关
        winningSwitch=0表示关闭佣金开关，winningSwitch=1表示打开佣金开关-含彩票，winningSwitch=2表示打开佣金开关-不含彩票
      ****/
      // 这里判断了第一第二条
      // 如果一键激活成功，则展现更多tab
      if (this.isSpreadActive) {
        if (this.spreadMode === 0) {
          this.list = [
            { name: '推广赚钱', link: 'spreadMoneyPay', isShow: true },
            { name: '佣金查询', link: 'spreadMoneyBrokerage', isShow: this.winningSwitch === 0 ? false : true }
          ];
        } else {
          this.list = [
            { name: '推广赚钱', link: 'spreadMoneyPay', isShow: true },
            { name: '可领取奖励明细', link: 'spreadMoneyReward', isShow: true },
            { name: '领取记录', link: 'spreadMoneyRecord', isShow: true },
            { name: '推广明细', link: 'spreadMoneyDetail', isShow: true },
            { name: '统计报表', link: 'statement', isShow: this.dataReportSwitch === 0 ? false : true },
            { name: '佣金查询', link: 'spreadMoneyBrokerage', isShow: this.winningSwitch === 0 ? false : true }
          ];
        }
        this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.list);
      }
    }
  }
}
