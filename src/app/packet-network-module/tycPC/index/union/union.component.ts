import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pc-ly-union',
  templateUrl: './union.component.html',
  styleUrls: ['./union.component.scss']
})
export class UnionComponent implements OnInit {
  isShowIndex = 0;
  // 导航名字
  navigationName = '联盟方案';
  // 新手指南
  listData = [
    {
      icon: 'iconfanganzhizuo_huaban',
      name: '联盟方案',
    },
    {
      icon: 'iconbuqianxieyi01',
      name: '联盟协议',
    },
    {
      icon: 'iconicon',
      name: '代理登录',
    },
    {
      icon: 'iconzhuce',
      name: '代理注册',
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  // 新手指南点击效果
  listName(item, i ) {
    this.isShowIndex = i;
    this.navigationName = item.name;
  }
}
