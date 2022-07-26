import { Component, OnInit } from '@angular/core';
import  dayjs from 'dayjs';
import { SelectItem, SelectItemGroup } from 'primeng/api';
import { CommonDataService } from '../../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../../core-module/common-util/global-service';
import { Result } from '../../../../../core-module/common-util/result';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.scss']
})
export class BettingComponent implements OnInit {
  modal = window['modal'];
  cities1: SelectItem[] = [
    { label: '全部日期', value: { id: 0, name: '全部日期' } },
    { label: '最近一周', value: { id: 1, name: '最近一周' } },
    { label: '最近30天', value: { id: 2, name: '最近30天' } },
    { label: '最近90天', value: { id: 3, name: '最近90天' } }
  ];
  cities4: SelectItem[] = [
    { label: '显示5条', value: { id: 5, name: '显示5条' } },
    { label: '显示10条', value: { id: 10, name: '显示10条' } },
    { label: '显示20条', value: { id: 20, name: '显示20条' } }
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
  dateValue = new Date();
  dateValue1;
  // 类型
  typeList;
  tableHeaderList = [];
  tableData = new TableModel();
  historyListss = [];
  historyListData;
  colspan;
  validAmount = 0;
  result1 = 0;
  totalResult;
  validBetAmount;
  // 分页
  pageData = new PageData();
  rectCurrentPage = 1;
  isQueryLoading = false;

  //
  groupedDataList: SelectItemGroup[] = [];
  groupedType: SelectItemGroup[] = [];

  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService
  ) {
    this.$GlobalService.initGlobalData();
    // 赋值初始值
    this.tableData.page = 1;
    this.dataEndTime = new Date();
    this.selectedCity1 = this.cities1[1].value;
    this.dataStateTime = this.getDateStr(-6);
    this.tableData.startTime = dayjs(this.dataStateTime).format('YYYY-MM-DD');
    this.tableData.endTime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    this.tableData.pageSize = '5'; //  一页显示几条
  }

  ngOnInit() {
    // 投注历史游戏下拉列表
    this.$CommonDataService.getTzListHistory().then((res: Result) => {
      this.groupedType = res.data;
      this.groupedType.forEach((item, i) => {
        this.groupedDataList.push(
          {
            label: `${item['bigGameName']}`,
            value: {
              bigGameType: `${item['bigType']}`, bigGameId: `${item['bigGameId']}`
            },
            items: []
          });
        item['childGame'].forEach((el) => {
          this.groupedDataList[i].items.push(
            {
              label: `${el.childGameName}`,
              value: {
                childGameId: `${el.childGameId}`,
                childGameName: `${el.childGameName}`,
                gamePlatformChildId: `${el.gamePlatformChildId}`,
                gamePlatformId: `${el.gamePlatformId}`
              }
            },
          );
        });
      });
      this.$GlobalService.globalQueryModel.getTzHosityList = this.tableData;
      // 初始化列表
      // this.getTzHosityAccounList();
    });
  }

  getTzHosityAccounList() {
    this.isQueryLoading = true;
    this.tableData.startTime = dayjs(this.dataStateTime).format('YYYY-MM-DD');
    this.tableData.endTime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    // 拼接时分秒数据
    this.$GlobalService.globalQueryModel.getTzHosityList.startTime = `${this.tableData.startTime} 00:00:00`;
    this.$GlobalService.globalQueryModel.getTzHosityList.endTime = `${this.tableData.endTime} 23:59:59`;
    this.$GlobalService.globalQueryModel.getTzHosityList = this.tableData;
    this.$GlobalService.globalQueryModel.getTzHosityList.userToken = this.$GlobalService.globalQueryModel.userToken;
    this.$CommonDataService.getTzAccumListHistory().then((res: Result) => {
      this.isQueryLoading = false;
      this.tableHeaderList = [];
      // 没有类型的时候
      if (!res.data.gameCode) {
        return;
      }
      this.tableHeaderList = res.data.detailFieldsTitles;
      this.historyListData = res.data;
      this.colspan = this.historyListData.detailFieldsTitles.length - 3;
      this.totalResult = this.historyListData.totalResult;
      this.validBetAmount = this.historyListData.validBetAmount;
      this.historyListss = [];
      this.historyListData.list.forEach((v1, k1) => {
        this.historyListss[k1] = {};
        this.historyListData.detailFields.forEach((v2, k2) => {
          this.historyListss[k1][v2] = v1[this.historyListData.detailFields[k2]];
        });
      });
      // 总页数
      this.pageData.total = res.data.totalPage;
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
      // 切换时间
      if (event.value.id === 0) {
        this.dataStateTime = this.getDateStr(-1000);
        this.tableData.startTime = dayjs(this.getDateStr(-1000)).format('YYYY-MM-DD');
      } else if (event.value.id === 1) {
        this.dataStateTime = this.getDateStr(-6);
        this.tableData.startTime = dayjs(this.getDateStr(-6)).format('YYYY-MM-DD');
      } else if (event.value.id === 2) {
        this.dataStateTime = this.getDateStr(-30);
        this.tableData.startTime = dayjs(this.getDateStr(-30)).format('YYYY-MM-DD');
      } else if (event.value.id === 3) {
        this.dataStateTime = this.getDateStr(-90);
        this.tableData.startTime = dayjs(this.getDateStr(-90)).format('YYYY-MM-DD');
      }
    } else if (type === 3) {
      // 切换类型
      this.tableData.game = this.selectedCity3.gamePlatformChildId;
      // 重置page
      // this.tableData.page = 1;
      // this.rectCurrentPage = 1;
      // console.log(this.selectedCity3);
    } else if (type === 5) {
      // 切换条数
      this.tableData.pageSize = this.selectedCity4.id;
      // this.$GlobalService.globalQueryModel.getTzHosityList = this.tableData;
      // this.getTzHosityAccounList();
    }
  }

  querySerach() {
    if (!this.selectedCity3) {
      this.modal.open({
        message: '请选择查询的游戏类型',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    const startTime = new Date(this.dataStateTime).getTime();
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
    // this.pageData.currentPage = this.rectCurrentPage;
    this.tableData.page = 1;
    this.pageData.currentPage = this.tableData.page;
    this.getTzHosityAccounList();
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
    this.getTzHosityAccounList();
  }

  /** 切换年
   * todo
   */
  nextY() {
    // console.log(this.dataStateTime);
    const dd = new Date(this.dataStateTime);
    const m = dd.getMonth() + 1; // 获取当前月份的日期
    // console.log(dd.getFullYear() - 1);
    const y = dd.getFullYear() - 1;
    // console.log(m);
    const d = dd.getDate();
    this.dataStateTime = new Date(y + '-' + m + '-' + d);
  }
  selectDate() {
    const startTime = new Date(this.dataStateTime).getTime();
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

class TableModel {
  userToken: string;
  page: any; // 选择的 1页 2页
  pageSize: any; // 下拉选择的页数
  game: any;
  startTime: any;
  endTime: any;
}

class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
