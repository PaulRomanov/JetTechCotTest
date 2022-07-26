import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import  dayjs from 'dayjs';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {Result} from '../../../../../core-module/common-util/result';
import {GlobalMethodsService} from '../../../../../core-module/common-methods/global-methods.service';
declare const navigator: any;
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})

export class OrderHistoryComponent implements OnInit {

  giftType: {id: -1, name: '全部'}
  startTime
  endTime
  clipboard = window['ClipboardJS'];
  giftTypes:SelectItem[] = [
    {label: '全部', value: {id: -1, name: '全部'}},
    {label: '待审核', value: {id: 0, name: '待审核'}},
    {label: '审核通过', value: {id: 1, name: '审核通过'}},
    {label: '审核不通过', value: {id: 2, name: '审核不通过'}},
  ];
  // 日期
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };
  tableHeaderList = [
    {label: '商品名称', width: 10},
    {label: '兑换数量', width: 5},
    {label: '消耗积分', width: 5},
    {label: '兑换时间', width: 12},
    {label: '兑换订单号', width: 11},
    {label: '收货名字', width: 10},
    {label: '收货号码', width: 10},
    {label: '审核状态', width: 10},
    {label: '发货信息', width: 17},
    {label: '备注', width: 10},
  ];
  // 分页
  pageData = new PageData()
  rectCurrentPage = 1
  isQueryLoading = false
  pageSize: SelectItem[] = [
    {label: '显示5条', value: {id: 5, name: '显示5条'}},
    {label: '显示10条', value: {id: 10, name: '显示10条'}},
    {label: '显示20条', value: {id: 20, name: '显示20条'}}
  ];
  selectedPageSize: any
  list: [] = []
  constructor(
      public $GlobalService: GlobalService,
      private $CommonDataService: CommonDataService,
      private $GlobalMethodsService: GlobalMethodsService,
  ) { }

  ngOnInit() {
    this.$GlobalService.globalQueryModel.orderHistory.status = -1
    this.$GlobalService.globalQueryModel.orderHistory.pageSize = 5
    this.endTime = new Date();
    this.startTime = this.getDateStr(-6);
    this.$GlobalService.globalQueryModel.orderHistory.startTime =
      dayjs(this.startTime).format('YYYY-MM-DD')+'+'+'00:00:00';
    this.$GlobalService.globalQueryModel.orderHistory.endTime =
      dayjs(this.endTime).format('YYYY-MM-DD')+'+'+'23:59:59';
    this.getOrderHistory()
  }
  selectDate() {
    const startTime = new Date(this.startTime).getTime();
    const endTime = new Date(this.endTime).getTime();
    if (endTime < startTime) {
      this.$GlobalMethodsService.showTopCenter('结束日期不得早于开始日期');
      return
    }
    this.$GlobalService.globalQueryModel.orderHistory.startTime =
      dayjs(this.startTime).format('YYYY-MM-DD HH:mm:ss');
    this.$GlobalService.globalQueryModel.orderHistory.endTime =
      dayjs(this.endTime).format('YYYY-MM-DD HH:mm:ss');
  }
  getOrderHistory() {
    this.isQueryLoading = true
    this.$CommonDataService.scroeMallOrderHistory().then((res: Result) => {
      this.isQueryLoading = false
      if(res.success == 1) return
      this.list = res.data.rows
      this.pageData.total = res.data.totalPage
    })
  }
  giftTypeChange() {
    this.$GlobalService.globalQueryModel.orderHistory.status = this.giftType.id
  }

  copy(id){
    const elem = document.getElementById(`a${id}`);
    if (navigator.clipboard) {
      // clipboard api 复制
      navigator.clipboard.writeText(elem.innerText);
      this.$GlobalMethodsService.showTopCenter('已复制');
  } else {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      // 隐藏此输入框
      textarea.style.position = 'fixed';
      textarea.style.clip = 'rect(0 0 0 0)';
      textarea.style.top = '10px';
      // 赋值
      textarea.value = elem.innerText;
      // 选中
      textarea.select();
      // 复制
      document.execCommand('copy', true);
      // 移除输入框
      document.body.removeChild(textarea);
      this.$GlobalMethodsService.showTopCenter('已复制');
    }
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
    if(this.pageData.currentPage == this.$GlobalService.globalQueryModel.orderHistory.page) return
    this.$GlobalService.globalQueryModel.orderHistory.page = this.pageData.currentPage;
    this.getOrderHistory();
  }

  dataTimeChange(event, type) {
    this.$GlobalService.globalQueryModel.orderHistory.pageSize = this.selectedPageSize.id;
      this.getOrderHistory();
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
