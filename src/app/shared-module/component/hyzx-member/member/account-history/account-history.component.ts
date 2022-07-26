import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {Result} from '../../../../../core-module/common-util/result';
import  dayjs from 'dayjs';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.scss']
})
export class AccountHistoryComponent implements OnInit {
  cities1: SelectItem[] = [
    {label: '全部日期', value: {id: 0, name: '全部日期'}},
    {label: '最近一周', value: {id: 1, name: '最近一周'}},
    {label: '最近30天', value: {id: 2, name: '最近30天'}},
    {label: '最近90天', value: {id: 3, name: '最近90天'}}
  ];
  cities2: SelectItem[] = [];
  cities3: SelectItem[] = [
    {label: '全部状态', value: {id: '0', label: '全部状态'}},
    {label: '转账成功', value: {id: '1', label: '转账成功'}},
    {label: '转账失败', value: {id: '2', label: '转账失败'}},
    {label: '超时', value: {id: '11', label: '超时'}},
    {label: '取款处理中', value: {id: '3', label: '取款处理中'}},
    {label: '取款成功', value: {id: '4', label: '取款成功'}},
    {label: '取款失败', value: {id: '5', label: '取款失败'}},
    {label: '被拒绝', value: {id: '6', label: '被拒绝'}},
    {label: '存款处理中', value: {id: '7', label: '存款处理中'}},
    {label: '已存入', value: {id: '8', label: '已存入'}},
    {label: '已取消', value: {id: '10', label: '已取消'}},
    {label: '取消', value: {id: '09', label: '取消'}},
    {label: '首充奖励已发放', value: {id: '50', label: '首充奖励已发放'}},
    {label: '额外奖励已发放', value: {id: '51', label: '额外奖励已发放'}},
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
  // tableHeaderList
  tableHeaderList = [
    {label: '序号', width: 5},
    {label: '订单号', width: 20},
    {label: '实际金额', width: 10},
    {label: '申请金额', width: 10},
    {label: '类型', width: 10},
    {label: '状态', width: 10},
    {label: '操作日期', width: 20},
    {label: '备注', width: 15}
  ];
  tableData = new TableModel();
  tableList = [];
  // 分页
  pageData = new PageData();

  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService
  ) {
    // 赋值初始值
    this.selectedCity1 = this.cities1[1].value;
    this.tableData.page = 1;
    this.dataEndTime = new Date();
    this.dataStateTime = this.getDateStr(-6);
    this.tableData.starttime = dayjs(this.dataStateTime).format('YYYY-MM-DD');
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    this.tableData.pagesize = '5'; //  一页显示几条
    this.tableData.status = '0';
  }

  ngOnInit() {
    // 获取类型
    this.$CommonDataService.getAccountType().then((res: Result) => {
      this.typeList = res.data;
      this.typeList.forEach(item => {
        this.cities2.push({label: `${item.name}`, value: {id: `${item.id}`, name: `${item.name}`}});
      });
      this.selectedCity2 = this.cities2[0];
      this.tableData.type = this.selectedCity2.value.id;
      this.$GlobalService.globalQueryModel.getUserAccountList = this.tableData;
      // 初始化列表
      this.getAccounList();
    });

  }

  getAccounList() {
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
    this.tableData.starttime = dayjs(this.dataStateTime).format('YYYY-MM-DD');
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    this.$GlobalService.globalQueryModel.getUserAccountList = this.tableData;
    this.$GlobalService.globalQueryModel.getUserAccountList.userToken = this.$GlobalService.globalQueryModel.userToken;
    this.$CommonDataService.getUserAccountLoglist().then((res: Result) => {
      this.isQueryLoading = false;
      this.tableList = res.data;
      this.pageData.total = Math.ceil(res.total / parseInt(this.tableData.pagesize, 10));
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
        this.dataStateTime = this.getDateStr(-1000);
        this.tableData.starttime = dayjs(this.getDateStr(-1000)).format('YYYY-MM-DD');
      } else if (event.value.id === 1) {
        this.dataStateTime = this.getDateStr(-6);
        this.tableData.starttime = dayjs(this.getDateStr(-6)).format('YYYY-MM-DD');
      } else if (event.value.id === 2) {
        this.dataStateTime = this.getDateStr(-30);
        this.tableData.starttime = dayjs(this.getDateStr(-30)).format('YYYY-MM-DD');
      } else if (event.value.id === 3) {
        this.dataStateTime = this.getDateStr(-90);
        this.tableData.starttime = dayjs(this.getDateStr(-90)).format('YYYY-MM-DD');
      }
    } else if (type === 3) { // 类型
      this.tableData.type = this.selectedCity2.id;
    } else if (type === 4) {
      this.tableData.status = this.selectedCity3.id;
    } else if (type === 5) {
      this.tableData.pagesize = this.selectedCity4.id;
      this.$GlobalService.globalQueryModel.getUserAccountList = this.tableData;
      this.getAccounList();
    }
  }

  querySerach() {
    // 每次更新条件，必须切换到第一页
    this.tableData.page = 1;
    this.pageData.currentPage = this.tableData.page;
    this.getAccounList();
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
    this.tableData.page = this.pageData.currentPage;
    this.getAccounList();
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
  pagesize: any; // 下拉选择的页数
  type: any;
  status: string;
  starttime: any;
  endtime: any;
}

class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
