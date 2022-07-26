import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import  dayjs from 'dayjs';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {Result} from '../../../../../core-module/common-util/result';
import {GlobalMethodsService} from '../../../../../core-module/common-methods/global-methods.service';
@Component({
  selector: 'app-point-history',
  templateUrl: './point-history.component.html',
  styleUrls: ['./point-history.component.scss']
})
export class PointHistoryComponent implements OnInit {

  giftType: {id: 0, name: '全部'}
  startTime
  endTime
  giftTypes:SelectItem[] = [
    {label: '全部', value: {id: 0, name: '全部'}},
    {label: '减少', value: {id: -1, name: '减少'}},
    {label: '增加', value: {id: 1, name: '增加'}},
  ];
  // 日期
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };
  tableHeaderList = [
    {label: '变动时间', width: 10},
    {label: '属性', width: 10},
    {label: '数量', width: 10},
    {label: '变化前积分', width: 10},
    {label: '变化后积分', width: 10},
    {label: '来源或用途', width: 10},
    {label: '状态', width: 10},
    {label: '备注', width: 10},
  ];
  changeTypes = [
    '充值获得',
    '投注获得',
    '平台奖励',
    '平台扣除',
    '兑换扣除',
    '审核失败加回'
  ]
  // 分页
  pageData = new PageData()
  rectCurrentPage = 1
  isQueryLoading = false
  pageSize: SelectItem[] = [
    {label: '显示5条', value: {id: 5, name: '显示5条'}},
    {label: '显示10条', value: {id: 10, name: '显示10条'}},
    {label: '显示20条', value: {id: 20, name: '显示20条'}}
  ];
  list:[] = []
  selectedPageSize: any
  constructor(
      public $GlobalService: GlobalService,
      private $CommonDataService: CommonDataService,
      private $GlobalMethodsService: GlobalMethodsService,
  ) { }

  ngOnInit() {
    this.$GlobalService.globalQueryModel.scoreHistory.pageSize = 5
    this.endTime = new Date();
    this.startTime = this.getDateStr(-6);
    this.$GlobalService.globalQueryModel.scoreHistory.startTime =
      dayjs(this.startTime).format('YYYY-MM-DD')+'+'+'00:00:00';
    this.$GlobalService.globalQueryModel.scoreHistory.endTime =
      dayjs(this.endTime).format('YYYY-MM-DD')+'+'+'23:59:59';
    this.getHistory()
  }
  selectDate() {
    const startTime = new Date(this.startTime).getTime();
    const endTime = new Date(this.endTime).getTime();
    if (endTime < startTime) {
      this.$GlobalMethodsService.showTopCenter('结束日期不得早于开始日期');
      return
    }
    this.$GlobalService.globalQueryModel.scoreHistory.startTime =
      dayjs(this.startTime).format('YYYY-MM-DD HH:mm:ss');
    this.$GlobalService.globalQueryModel.scoreHistory.endTime =
      dayjs(this.endTime).format('YYYY-MM-DD HH:mm:ss');
  }
  giftTypeChange() {
    this.$GlobalService.globalQueryModel.scoreHistory.changeAttr = this.giftType.id
  }
  //我的礼金记录
  getHistory() {
    this.isQueryLoading = true
    this.$CommonDataService.scroeMallScoreHistory().then((res: Result) => {
      this.isQueryLoading = false
      if(res.success == 1) return
      this.list = res.data.rows
      this.pageData.total = res.data.totalPage
    })
  }

  // 分页逻辑
  addCurrentPage(page, type?) {
    if (this.pageData.goPage > this.pageData.total) {
      this.$GlobalMethodsService.showTopCenter('目标页面超过总页数，请重新输入');
      this.pageData.goPage = null;
      return;
    }
    if (type === 0 && !this.pageData.goPage) {
      this.$GlobalMethodsService.showTopCenter('请输入要跳转的页面');
      return;
    }
    this.pageData.currentPage = parseInt(page, 10) ? parseInt(page, 10) : 1;
    if(this.pageData.currentPage == this.$GlobalService.globalQueryModel.scoreHistory.page) return
    this.$GlobalService.globalQueryModel.scoreHistory.page = this.pageData.currentPage;
    this.getHistory();
  }

  dataTimeChange(event, type) {
    this.$GlobalService.globalQueryModel.scoreHistory.pageSize = this.selectedPageSize.id;
      this.getHistory();
  }
  // 获取当前日期前后
  getDateStr(AddDayCount) {
    const dd = new Date(this.endTime);
    dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1; // 获取当前月份的日期
    const d = dd.getDate();
    return new Date(y + '-' + m + '-' + d);
  }

}
class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
