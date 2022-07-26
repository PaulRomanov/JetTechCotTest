import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cooperation',
  templateUrl: './cooperation.component.html',
  styleUrls: ['./cooperation.component.scss']
})
export class CooperationComponent implements OnInit, AfterViewInit, OnDestroy {
  heightIs = 797;
  list = [
    { name: '首页', isShow: true, id: 0 },
    { name: '关于我们', isShow: true, id: 1 },
    // { name: '佣金计划', isShow: true, id: 2 },
    { name: '合作条款', isShow: true, id: 2 },
    { name: '牌照展示', isShow: true, id: 3 }
  ];
  isIndex = 0;

  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute,
  ) {
    this.$ActivatedRoute.params.subscribe(params => {
      this.isIndex = parseInt(params.index, 10);
      this.steHeight(this.isIndex, 100);
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    window['$']('#particles-js').particleground({});
      this.steHeight(0);
  }

  steHeight(index?, time = 0) {
      setTimeout(() => {
        this.heightIs = index ? document.getElementsByClassName('common-banner-con')[index - 1].clientHeight : 797;
       window['h'](this.heightIs);
      }, time);
  }

  ngOnDestroy(): void {
  }

  isSetIndex(i) {
    this.isIndex = i;
    this.$GlobalMethodsService.setRouterNumber(i);
    this.steHeight(i);
  }

}
