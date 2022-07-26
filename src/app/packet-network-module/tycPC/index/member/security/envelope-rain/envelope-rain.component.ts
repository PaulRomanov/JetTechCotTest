import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import  dayjs from 'dayjs';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {Result} from '../../../../../../core-module/common-util/result';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';
@Component({
  selector: 'app-envelope-rain',
  templateUrl: './envelope-rain.component.html',
  styleUrls: ['./envelope-rain.component.scss']
})
export class EnvelopeRainComponent implements OnInit {

  startTime
  endTime
  status: SelectItem[] = [
    {label: '全部', value: {id: null, name: '全部'}},
    {label: '成功', value: {id: 1, name: '成功'}},
    {label: '处理中', value: {id: 0, name: '处理中'}},
    {label: '失败', value: {id: -1, name: '失败'}}
  ]
  selectedStatus = this.status[0].value
  // 日期
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };
  tableHeaderList = [
    {label: '序号', width: 12.5},
    {label: '日期', width: 12.5},
    {label: '订单号', width: 12.5},
    {label: '彩金', width: 12.5},
    {label: '状态', width: 12.5},
    {label: '备注', width: 12.5},
  ];
  envelopRecord = []
  // 分页
  pageData = new PageData()
  isQueryLoading = false
  pageSize: SelectItem[] = [
    {label: '显示5条', value: {id: 5, name: '显示5条'}},
    {label: '显示10条', value: {id: 10, name: '显示10条'}},
    {label: '显示20条', value: {id: 20, name: '显示20条'}}
  ];
  selectedPageSize = {id: 10, name: '显示10条'}
  constructor(
      public $GlobalService: GlobalService,
      private $CommonDataService: CommonDataService,
      private $GlobalMethodsService: GlobalMethodsService,
  ) {
    this.endTime = new Date();
    this.startTime = this.getDateStr(-6);
    this.$GlobalService.globalQueryModel.envelopRecord.starttime =
      dayjs(this.startTime).format('YYYY-MM-DD')+'+'+'00:00:00';
    this.$GlobalService.globalQueryModel.envelopRecord.endtime =
      dayjs(this.endTime).format('YYYY-MM-DD')+'+'+'23:59:59';
   }

  ngOnInit() {
    this.$GlobalService.globalQueryModel.envelopRecord.page = 1
    this.myEnvelopRecord()
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
  //我的礼金记录
  myEnvelopRecord() {
    this.isQueryLoading = true
    this.$GlobalService.globalQueryModel.envelopRecord.status = this.selectedStatus.id
    this.$CommonDataService.envelopRecord().then((res: Result) => {
      this.isQueryLoading = false
      if(res.success == 1) return
      this.envelopRecord = res.data
      this.pageData.total = Math.ceil(res.total / this.$GlobalService.globalQueryModel.envelopRecord.pagesize)
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
    if(this.pageData.currentPage == this.$GlobalService.globalQueryModel.envelopRecord.page) return
    this.$GlobalService.globalQueryModel.envelopRecord.page = this.pageData.currentPage;
    this.myEnvelopRecord();
  }

  selectDate() {
    const startTime = new Date(this.startTime).getTime();
    const endTime = new Date(this.endTime).getTime();
    if (endTime < startTime) {
      this.$GlobalMethodsService.showTopCenter('结束日期不得早于开始日期');
      return
    }
    this.$GlobalService.globalQueryModel.envelopRecord.starttime =
      dayjs(this.startTime).format('YYYY-MM-DD HH:mm:ss');
    this.$GlobalService.globalQueryModel.envelopRecord.endtime =
      dayjs(this.endTime).format('YYYY-MM-DD HH:mm:ss');
  }
  dataTimeChange(event, type) {
    this.$GlobalService.globalQueryModel.envelopRecord.pagesize = this.selectedPageSize.id;
      this.myEnvelopRecord();
  }

}
class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
