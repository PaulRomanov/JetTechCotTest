import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CommonDataService } from '../../../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../../../core-module/common-util/global-service';
import { Result } from '../../../../../../core-module/common-util/result';
import  dayjs from 'dayjs';

@Component({
  selector: 'app-spread-money-record',
  templateUrl: './spread-money-record.component.html',
  styleUrls: ['./spread-money-record.component.scss']
})
export class SpreadMoneyRecordComponent implements OnInit {
  modal = window['modal'];
  cities1: SelectItem[] = [
    { label: '全部日期', value: { id: 0, name: '全部日期' } },
    { label: '最近一周', value: { id: 1, name: '最近一周' } },
    { label: '最近30天', value: { id: 2, name: '最近30天' } },
    { label: '最近90天', value: { id: 3, name: '最近90天' } }
  ];
  cities2: SelectItem[] = [];
  cities3: SelectItem[] = [
    { label: '全部', value: { id: '-1', label: '全部' } },
    { label: '处理中', value: { id: '12', label: '处理中' } },
    { label: '已发放', value: { id: '10', label: '已发放' } },
    { label: '已拒绝', value: { id: '11', label: '已拒绝' } }
  ];
  cities4: SelectItem[] = [
    { label: '显示5条', value: { id: 5, name: '显示5条' } },
    { label: '显示10条', value: { id: 10, name: '显示10条' } },
    { label: '显示20条', value: { id: 20, name: '显示20条' } }
  ];
  selectedCity1: any;
  selectedCity3: any;
  selectedCity4: any;
  dataStartTime;
  dataEndTime;
  // 日期
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };
  dateValue = new Date();
  dateValue1;
  // 类型
  typeList;
  // tableHeaderList
  tableHeaderList = [
    { label: '申请时间', width: 100 },
    { label: '订单号', width: 100 },
    { label: '领取金额（元）', width: 200 },
    { label: '转入账户', width: 200 },
    { label: '状态', width: 100 }
  ];
  tableData = {
    page: null,
    pagesize: null,
    status: null ,
    starttime: null,
    endtime: null
  };
  tableList = [];
  // 分页
  pageData = new PageData();
  isLoad = false;
  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService
  ) {
    // 赋值初始值
    this.tableData.page = 1;
    this.selectedCity1 = this.cities1[1].value;
    this.dataEndTime = new Date();
    this.dataStartTime = this.getDateStr(-6);
    this.tableData.starttime = dayjs(this.dataStartTime).format('YYYY-MM-DD');
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    this.tableData.pagesize = '5'; //  一页显示几条
    this.tableData.status = '-1';
  }

  ngOnInit() {
    // 获取初始化数据
    // tslint:disable-next-line:max-line-length
    this.isLoad = true;
    this.$GlobalService.globalQueryModel.getSpreadRecordData = Object.assign(this.$GlobalService.globalQueryModel.getSpreadRecordData, this.tableData);
    this.$CommonDataService.getSpreadRecordData().then((res: Result) => {
      this.isLoad = false;
      if (res.success === 0) {
        this.tableList = res.data.list;
        this.pageData.total = Math.ceil(res.data.totalSize / parseInt(this.tableData.pagesize, 10));
      }
    });

  }

  getAccounList() {
    // tslint:disable-next-line:max-line-length
    this.tableData.starttime = dayjs(this.dataStartTime).format('YYYY-MM-DD');
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    this.$GlobalService.globalQueryModel.getSpreadRecordData = Object.assign(this.$GlobalService.globalQueryModel.getSpreadRecordData, this.tableData);
    this.$CommonDataService.getSpreadRecordData().then((res: Result) => {
      this.isLoad = false;
      if (res.success === 0) {
        this.tableList = res.data.list;
        this.pageData.total = Math.ceil(res.data.totalSize / parseInt(this.tableData.pagesize, 10));
      }
      // this.pageData.currentPage = this.$GlobalService.globalQueryModel.getUserAccountList.page;
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
    if (type === 0) {
      if (event.value.id === 0) {
        this.dataStartTime = this.getDateStr(-1000);
        this.tableData.starttime = dayjs(this.getDateStr(-1000)).format('YYYY-MM-DD');
      } else if (event.value.id === 1) {
        this.dataStartTime = this.getDateStr(-6);
        this.tableData.starttime = dayjs(this.getDateStr(-6)).format('YYYY-MM-DD');
      } else if (event.value.id === 2) {
        this.dataStartTime = this.getDateStr(-30);
        this.tableData.starttime = dayjs(this.getDateStr(-30)).format('YYYY-MM-DD');
      } else if (event.value.id === 3) {
        this.dataStartTime = this.getDateStr(-90);
        this.tableData.starttime = dayjs(this.getDateStr(-90)).format('YYYY-MM-DD');
      }
    } else if (type === 4) { // 状态
      this.tableData.status = this.selectedCity3.id;
    } else if (type === 5) { // 显示几条数据
      this.tableData.pagesize = this.selectedCity4.id;
      this.$GlobalService.globalQueryModel.activityData = Object.assign(this.$GlobalService.globalQueryModel.activityData, this.tableData);
      this.getAccounList();
    }
    // console.log(this.tableData);
  }
  querySerach() {
    const startTime = new Date(this.dataStartTime).getTime();
    const endTime = new Date(this.dataEndTime).getTime();
    if (endTime < startTime) {
      this.modal.open({
        message: '结束日期不得早于开始日期',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    this.tableData.page = 1;
    this.pageData.currentPage = this.tableData.page;
    this.isLoad = true;
    this.getAccounList();
  }

  // 分页逻辑
  addCurrentPage(page, type?) {
    if (this.pageData.goPage > this.pageData.total) {
      window['modal'].open({
        message: '目标页面超过总页数，请重新输入',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
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
    this.tableData.page = this.pageData.currentPage;
    this.getAccounList();
  }
  selectDate() {
    const startTime = new Date(this.dataStartTime).getTime();
    const endTime = new Date(this.dataEndTime).getTime();
    if (endTime < startTime) {
      this.modal.open({
        message: '结束日期不得早于开始日期',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
    }
  }
}
class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
