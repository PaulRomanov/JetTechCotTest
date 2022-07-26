import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
@Component({
  selector: 'app-technica-help',
  templateUrl: './technica-help.component.html',
  styleUrls: ['./technica-help.component.scss']
})

export class TechnicaHelpComponent implements OnInit {
  isShowIndex = 0;
  // 导航名字
  navigationName = '联系我们';
  // 新手指南
  listData = [
    {
      icon: 'iconjishubangzhu',
      name: '技术帮助',
    },
    {
      icon: 'iconqingchuhuancun',
      name: '清除缓存',
    },
    {
      icon: 'iconfuwuqi',
      name: '设定服务器',
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
