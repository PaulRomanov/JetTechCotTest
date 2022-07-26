import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../../core-module/common-util/global-service';
import { CommonDataService } from '../../../../../core-module/common-util/common-data.service';
import { Result } from '../../../../../core-module/common-util/result';

@Component({
  selector: 'app-personal-news',
  templateUrl: './personal-news.component.html',
  styleUrls: ['./personal-news.component.scss']
})
export class PersonalNewsComponent implements OnInit {
  data = [];
  // 分页
  pageData = new PageData();
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService
  ) { }

  ngOnInit() {
    this.getDataList();
    this.$CommonDataService.setState().then((res: Result) => {
      if (res.success === 0) {
        this.$GlobalService.globalTipsModelModel.isUnreadInfo = false;
      }
    });
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
    this.$GlobalService.globalQueryModel.getPersonalMessage.page = this.pageData.currentPage;
    this.getDataList();
  }
  getDataList() {
    this.$CommonDataService.getPersonalMessage().then((res: Result) => {
      if (res.success === 0) {
        this.data = res.data;
        this.pageData.total = Math.ceil(res.total / 5);
      }
    });
  }
}
class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
