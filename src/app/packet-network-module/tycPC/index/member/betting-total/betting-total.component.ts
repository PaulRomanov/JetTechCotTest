import { Component, OnInit } from '@angular/core';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {Result} from '../../../../../core-module/common-util/result';

@Component({
  selector: 'app-betting-total',
  templateUrl: './betting-total.component.html',
  styleUrls: ['./betting-total.component.scss']
})
export class BettingTotalComponent implements OnInit {
  dataStateTime;
  dataEndTime;
  list = [];
  isLogin;
  // 日期
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };
  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService
  ) { }

  ngOnInit() {
    this.dataEndTime =  new Date();
    this.dataStateTime = this.getDateStr(-6);
    this.searchList();
  }
  // 获取当前日期前后
  getDateStr(AddDayCount) {
    const dd = new Date(this.dataEndTime);
    dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1; // 获取当前月份的日期
    const d = dd.getDate();
    return new Date(y + '-' + m + '-' + d);
  }
  // 查询投注合计
  searchList () {
    this.isLogin = !this.isLogin;
    this.$GlobalService.globalQueryModel.searchAppBettotal.strattime = this.formatDate(this.dataStateTime) ;
    this.$GlobalService.globalQueryModel.searchAppBettotal.endtime = this.formatDate(this.dataEndTime) ;
    this.$CommonDataService.searchAppBettotal().then((res: Result) => {
      this.list = res.data.list;
      this.isLogin = !this.isLogin;
    });
  }
  // 时间转化
  formatDate(date) {
    const d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
}
