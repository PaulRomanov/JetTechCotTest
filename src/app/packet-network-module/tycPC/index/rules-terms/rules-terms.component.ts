import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
@Component({
  selector: 'app-rules-terms',
  templateUrl: './rules-terms.component.html',
  styleUrls: ['./rules-terms.component.scss']
})

export class RulesTermsComponent implements OnInit {
  isShowIndex = 0;
  // 导航名字
  navigationName = '联系我们';
  // 新手指南
  listData = [
    {
      icon: 'iconshengming',
      name: '规则声明',
    },
    {
      icon: 'iconjieshou',
      name: '规则接受',
    },
    {
      icon: 'icontiaojian',
      name: '投注条件',
    },
    {
      icon: 'iconguanlizhengce',
      name: '管理政策',
    },
    {
      icon: 'iconyinsizhengce',
      name: '隐私政策',
    },
    {
      icon: 'iconheding',
      name: '身份核定',
    },
    {
      icon: 'icontouzhuguize',
      name: '投注规则',
    }
  ];

  constructor(
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
  }

  ngOnInit() {
    this.$ActivatedRoute.params.subscribe(params => {
      this.isShowIndex = parseInt(params.type, 10);
      this.listData.forEach(item => {
        this.navigationName = this.listData[params.type].name;
      });
    });
  }

  // 新手指南点击效果
  listName(item, i) {
    this.isShowIndex = i;
    this.navigationName = item.name;
    this.$GlobalMethodsService.setRouterNumber(i);
  }
}
