import {Component, DoCheck, OnDestroy, OnInit, AfterViewInit} from '@angular/core';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Result } from '../../../../core-module/common-util/result';
import  dayjs from 'dayjs';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  signDay1 = 0;
  signDay2 = 0;
  isUserSign = false;
  modal = window['modal'];
  dateValue;
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月',
      '10月', '11月', '12月'],
  };
  signDayArr = [];
  dateExa = [
    { date: '2020-02-01', signStatus: '0' },
    { date: '2020-02-02', signStatus: '1' },
    { date: '2020-02-03', signStatus: '1' },
    { date: '2020-02-04', signStatus: '1' },
    { date: '2020-02-05', signStatus: '0' },
    { date: '2020-02-06', signStatus: '0' },
    { date: '2020-02-07', signStatus: '1' },
    { date: '2020-02-08', signStatus: '0' }
  ];
  calender = false;
  rewardMoney = 0;
  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    public $Router: Router,
    private $ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // 用户已签到的天数和距离领奖还需签到的天数
    this.getUserSignDays();
    // 查询用户签到记录
    this.$GlobalService.globalQueryModel.getUserSignListByMonth.month = dayjs(this.dateValue).format('YYYY-MM');
    this.querySignRecord();
  }
  // 用户已签到的天数和距离领奖还需签到的天数
  getUserSignDays () {
    this.$CommonDataService.userSignDaysAndRestDays().then((res: Result) => {
      if (res.success === 0) {
        this.signDay1 = res.data.signDays;
        this.signDay2 = res.data.restDays;
        this.rewardMoney = res.data.rewardMoney;
      }
    });
  }
  // 用户进行签到
  sign() {
    this.$CommonDataService.userSign().then((res: Result) => {
      if (res.success === 0) {
        this.isUserSign = true;
        this.$GlobalMethodsService.showTopCenter(res.msg);
        this.getUserSignDays();
        // 刷新用户签到记录
        this.querySignRecord();
      }
    });
  }
  // 查询用户签到记录
  querySignRecord() {
    this.calender = false;
    this.$CommonDataService.getUserSignListByMonth().then((res: Result) => {
      this.calender = true;
      if (res.success === 0) {
        res.data.forEach(item => {
          if (item.signStatus === '1') {
            this.signDayArr.push(new Date(item.date));
            // 判断当天是否已签到
            if (new Date(item.date).getDate() === new Date().getDate()) {
              this.isUserSign = true;
            }
          }
        });
      }
    });
  }
  monthChange(event) {
    this.signDayArr = [];
    this.dateValue = new Date(event.year + '-' + event.month + '-1');
    this.$GlobalService.globalQueryModel.getUserSignListByMonth.month = (event.month < 10) ? (event.year + '-0' + event.month) : (event.year + '-' + event.month);
    this.querySignRecord();
  }
  // 用户领取当天奖励
  getTodayReward() {
    this.$CommonDataService.receiveTodayReward().then((res: Result) => {
      if (res.success === 0) {
        this.$GlobalMethodsService.showTopCenter(res.msg);
      }
    });
  }
}
