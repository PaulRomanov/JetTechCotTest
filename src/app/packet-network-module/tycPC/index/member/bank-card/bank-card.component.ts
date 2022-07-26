import {Component, OnInit} from '@angular/core';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../core-module/common-util/result';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.scss']
})
export class BankCardComponent implements OnInit {
  list = [
    {name: '常用出款方式', link: 'commonBank'},
    {name: '历史出款方式', link: 'historyBank'},
    {name: '新增出款方式', link: 'newBank'}
  ];
  tabIndex = 0;

  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
    private $router: Router,
  ) {
    // 监听路由变化
    this.$router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { // 当导航成功结束时执行
        this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.list);
      }
    });
  }

  ngOnInit() {
    this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.list);
  }
}
