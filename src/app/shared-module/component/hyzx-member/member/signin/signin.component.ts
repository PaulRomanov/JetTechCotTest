// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.scss']
// })
// export class SigninComponent implements OnInit {
//   list = [
//     // {name: '签到记录', link: 'attendanceRecord'},
//     // {name: '奖励审核记录', link: 'awardAudit'},
//   ];
//   tabIndex = 0;
//   constructor() { }

//   ngOnInit() {
//   }

// }
import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {Result} from '../../../../../core-module/common-util/result';
import  dayjs from 'dayjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  cities1: SelectItem[] = [
    {label: '全部日期', value: {id: 0, name: '全部日期'}},
    {label: '最近一周', value: {id: 1, name: '最近一周'}},
    {label: '最近30天', value: {id: 2, name: '最近30天'}},
    {label: '最近90天', value: {id: 3, name: '最近90天'}}
  ];
  cities2: SelectItem[] = [];
  cities3: SelectItem[] = [
    {label: '全部', value: {id: -1, label: '全部'}},
    {label: '未处理', value: {id: 0, label: '未处理'}},
    {label: '不通过', value: {id: 1, label: '不通过'}},
    {label: '通过', value: {id: 4, label: '通过'}}
  ];
  cities4: SelectItem[] = [
    {label: '显示5条', value: {id: 5, name: '显示5条'}},
    {label: '显示10条', value: {id: 10, name: '显示10条'}},
    {label: '显示20条', value: {id: 20, name: '显示20条'}}
  ];
  selectedCity1: any;
  selectedCity2: any;
  selectedCity3: any;
  selectedCity4: any;
  dataStateTime;
  dataEndTime;
  // 日期
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };
  isQueryLoading = false;
  dateValue = new Date();
  dateValue1;
  // 类型
  typeList;
  tableHeaderList = [
    {label: '单号', width: 15},
    {label: '申请时间', width: 20},
    {label: '入款天数', width: 10},
    {label: '奖励金额', width: 10},
    {label: '审核状态', width: 10}
  ];
  tableList = [];
  // 分页
  pageData = new PageData();
  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService
  ) {
    // 设置初始值
    this.$GlobalService.globalQueryModel.getUserRewardList.page = 1;
    this.dataEndTime = new Date();
    this.dataStateTime = this.getDateStr(-6);
    console.log(this.dataEndTime);
    this.$GlobalService.globalQueryModel.getUserRewardList.startTime = dayjs(this.dataStateTime).format('YYYY-MM-DD HH:mm:ss');
    this.$GlobalService.globalQueryModel.getUserRewardList.endTime = dayjs(this.dataEndTime).format('YYYY-MM-DD HH:mm:ss');
    this.$GlobalService.globalQueryModel.getUserRewardList.pageSize = 5; //  一页显示几条
    this.selectedCity4 = this.cities4[0].value;
    this.$GlobalService.globalQueryModel.getUserRewardList.reviewStatus = -1;
    this.selectedCity3 = this.cities3[0].value;
  }

  ngOnInit() {
    // 获取申请记录数据
    this.$CommonDataService.getUserRewardList().then((res: Result) => {
      if (res.success === 0) {
        this.tableList = res.data.list;
        this.pageData.total = Math.ceil(res.data.totalSize / parseInt(this.selectedCity4.id, 10));
      }
    });

  }

  getRewardData() {
    const startTime = new Date(this.dataStateTime).getTime();
    const endTime = new Date(this.dataEndTime).getTime();
    if (endTime < startTime) {
      window['modal'].open({
        message: '结束日期不得早于开始日期',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    this.isQueryLoading = true;
    this.$GlobalService.globalQueryModel.getUserRewardList.startTime = dayjs(this.dataStateTime).format('YYYY-MM-DD HH:mm:ss');
    this.$GlobalService.globalQueryModel.getUserRewardList.endTime = dayjs(this.dataEndTime).format('YYYY-MM-DD HH:mm:ss');
    this.$GlobalService.globalQueryModel.getUserRewardList.reviewStatus = this.selectedCity3.id;
    this.$GlobalService.globalQueryModel.getUserRewardList.pageSize = this.selectedCity4.id;
    this.$GlobalService.globalQueryModel.getUserRewardList.page = 1;
    this.$CommonDataService.getUserRewardList().then((res: Result) => {
      this.isQueryLoading = false;
      if (res.success === 0) {
        this.tableList = res.data.list;
        this.pageData.total = Math.ceil(res.data.totalSize / parseInt(this.selectedCity4.id, 10));
      }
    });
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

  dataTimeChange(event, type) {
    if (type === 4) {
      // 选择审核状态
      this.$GlobalService.globalQueryModel.getUserRewardList.reviewStatus = this.selectedCity3.id;
    } else if (type === 5) {
      // 选择页数
      this.$GlobalService.globalQueryModel.getUserRewardList.pageSize = this.selectedCity4.id;
      this.getRewardData();
    }
  }

  querySerach() {
    // 每次更新条件，必须切换到第一页
    this.pageData.currentPage = 1;
    this.getRewardData();
  }

  // 分页逻辑
  addCurrentPage(page, type?) {
    if (this.pageData.goPage > this.pageData.total) {
      window['modal'].open({
        message: '目标页面超过总页数，请重新输入',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      this.pageData.goPage = null;
      return;
    }
    if (type === 0 && !this.pageData.goPage) {
      window['modal'].open({
        message: '请输入要跳转的页面',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      return;
    }
    this.pageData.currentPage = parseInt(page, 10) ? parseInt(page, 10) : 1;
    this.$GlobalService.globalQueryModel.getUserRewardList.page = this.pageData.currentPage;
    this.getRewardData();
  }

  selectDate() {
    const startTime = new Date(this.dataStateTime).getTime();
    const endTime = new Date(this.dataEndTime).getTime();
    if (endTime < startTime) {
      window['modal'].open({
        message: '结束日期不得早于开始日期',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
    }
  }
}

class TableModel {
  userToken: string;
  page: any; // 选择的 1页 2页
  pageSize: any; // 下拉选择的页数
  reviewStatus: any;
  startTime: any;
  endTime: any;
}

class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
