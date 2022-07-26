import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';

@Component({
  selector: 'pc-ly-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent implements OnInit {
  isShowIndex = 0;
  // 导航名字
  navigationName = '联系我们';
  // 新手指南
  listData = [
    {
      icon: 'icondianhua',
      name: '联系我们',
    },
    {
      icon: 'iconzhuce',
      name: '如何注册',
    },
    {
      icon: 'iconicon',
      name: '如何登录',
    },
    {
      icon: 'iconwangjimima',
      name: '忘记密码',
    },
    {
      icon: 'iconyucunkuan',
      name: '如何存款',
    },
    {
      icon: 'iconyinhangqia',
      name: '如何取款',
    },
    {
      icon: 'iconwenti',
      name: '常见问题',
    },
    {
      icon: 'iconzerenren',
      name: '责任博彩',
    },
    {
      icon: 'icongongzhonghao',
      name: '关于我们',
    },
    {
      icon: 'icongongzhonghao',
      name: '安全保密',
    },
    {
      icon: 'icongongzhonghao',
      name: '诚信专业',
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
