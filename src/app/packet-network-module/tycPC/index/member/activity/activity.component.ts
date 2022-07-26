import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {Result} from '../../../../../core-module/common-util/result';
import  dayjs from 'dayjs';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  cities1: SelectItem[] = [
    {label: '全部日期', value: {id: 0, name: '全部日期'}},
    {label: '最近一周', value: {id: 1, name: '最近一周'}},
    {label: '最近30天', value: {id: 2, name: '最近30天'}},
    {label: '最近90天', value: {id: 3, name: '最近90天'}}
  ];
  cities2: SelectItem[] = [];
  cities3: SelectItem[] = [
    {label: '全部', value: {id: '4', label: '全部'}},
    {label: '未审核', value: {id: '2', label: '未审核'}},
    {label: '通过', value: {id: '0', label: '通过'}},
    {label: '不通过', value: {id: '1', label: '不通过'}}
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
  dataStartTime;
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
    {label: '活动名称', width: 50},
    {label: '申请时间', width: 100},
    {label: '审核状态', width: 100},
    {label: '备注', width: 200}
  ];
  tableData = {
    page: null,
    pageSize: null,
    actId: '',
    verstatus: null,
    starttime: null,
    endtime: null
  };
  tableList = [];

  cols = [
    {field: 'xh', header: '序号', width: 50},
    {field: 'ddh', header: '订单号', width: 200},
    {field: 'applyamount', header: '实际金额', width: 90},
    {field: 'applyamount', header: '申请金额', width: 100},
    {field: 'type', header: '类型', width: 90},
    {field: 'status', header: '状态', width: 90},
    {field: 'optime', header: '操作日期', width: 200},
    {field: 'hint', header: '备注', width: 100}
  ];
  // 分页
  pageData = new PageData();

  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService
  ) {
    // 赋值初始值
    this.tableData.page = 1;
    this.dataEndTime = new Date();
    this.selectedCity1 = this.cities1[1].value;
    this.dataStartTime = this.getDateStr(-6);
    this.tableData.starttime = dayjs(this.dataStartTime).format('YYYY-MM-DD');
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    this.tableData.pageSize = '5'; //  一页显示几条
    this.tableData.verstatus = '4';
  }

  ngOnInit() {
    // 获取类型
    this.$CommonDataService.getActivityType().then((res: Result) => {
      if (res.success === 0) {
        this.typeList = res.data;
        this.typeList.forEach(item => {
          this.cities2.push({ label: `${item.ACTNAME}`, value: { id: `${item.ID}`, name: `${item.ACTNAME}` } });
        });
        // 设置默认值
        // this.selectedCity2 = this.cities2[0];
        // console.log('96', this.cities2[0]);
        // this.tableData.type = this.selectedCity2.value.id;
        this.$GlobalService.globalQueryModel.activityData = Object.assign(this.$GlobalService.globalQueryModel.activityData, this.tableData);
        // 初始化列表
        this.getAccounList();
      }

    });

  }

  getAccounList() {
    const startTime = new Date(this.dataStartTime).getTime();
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
    this.tableData.starttime = dayjs(this.dataStartTime).format('YYYY-MM-DD') + ' 00:00:00';
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD') + ' 23:59:59';
    this.$GlobalService.globalQueryModel.activityData = Object.assign(this.$GlobalService.globalQueryModel.activityData, this.tableData);
    // this.$GlobalService.globalQueryModel.getUserAccountList.userToken = this.$GlobalService.globalQueryModel.userToken;
    this.$CommonDataService.getAcitityData().then((res: Result) => {
      if (res.success === 0) {
        this.isQueryLoading = false;
        this.tableList = res.data.list;
        this.pageData.total = Math.ceil(res.data.totalSize / parseInt(this.tableData.pageSize, 10));
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
    } else if (type === 3) { // 类型
      this.tableData.actId = this.selectedCity2.id;
      // console.log(this.selectedCity2);
    } else if (type === 4) { // 状态
      this.tableData.verstatus = this.selectedCity3.id;
    } else if (type === 5) { // 显示几条数据
      this.tableData.pageSize = this.selectedCity4.id;
      this.$GlobalService.globalQueryModel.activityData = Object.assign(this.$GlobalService.globalQueryModel.activityData, this.tableData);
      this.getAccounList();
    }
    // console.log(this.tableData);
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
    const startTime = new Date(this.dataStartTime).getTime();
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

// class TableModel {
//   userToken: string;
//   page: any; // 选择的 1页 2页
//   pagesize: any; // 下拉选择的页数
//   type: any;
//   status: string;
//   starttime: any;
//   endtime: any;
// }

class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
