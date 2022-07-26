import {Component, OnInit} from '@angular/core';
import {GlobalMethodsService} from '../../../../../core-module/common-methods/global-methods.service';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {Result} from '../../../../../core-module/common-util/result';
import {query} from '@angular/animations';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  list = [
    {name: '即时稽核', link: 'latest'},
  ];
  tabIndex = 0;
  auditData = [];
  totalCounts;
  isLoading = false;
  // 分页
  pageData = new PageData();
  tableData = new TableModel();

  constructor(
    private $GlobalMethodsService: GlobalMethodsService,
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
  ) {
  }

  ngOnInit() {
    this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.list);
    this.initListData();
  }

  initListData(type?) {
    if (type) {
      this.isLoading = true;
    }
    this.$GlobalService.globalQueryModel.auditTimeData = this.tableData;
    this.$GlobalService.globalQueryModel.auditTimeData.userToken = this.$GlobalService.globalQueryModel.userToken;
    this.$CommonDataService.initAuditTime().then((res: Result) => {
      if (type) {
        this.isLoading = false;
      }
      this.auditData = res.data.auditDetailList;
      this.auditData.forEach(item => {
        item.isMore = false;
      });
      this.totalCounts = res.data.totalNum;
      // //总页数
      this.pageData.total = Math.ceil(parseInt(res.data.totalPage, 10));
    });
  }

  actualMoney(arr) {
    let actual = 0;
    arr.forEach(function (v, k) {
      actual += v.bet * 100;
    });
    return (actual /= 100);
  }

  toggleMore(event) {
    event.isMore = !event.isMore;
  }

  refreshList() {
    this.initListData('query');
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
    this.initListData();
  }
}

class TableModel {
  userToken: string;
  page: any = 1; // 选择的 1页 2页
  pageSize: any = 5; // 页数
}

class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
