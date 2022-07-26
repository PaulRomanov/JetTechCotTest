import { Component, OnInit } from '@angular/core';
import {Result} from '../../../../../core-module/common-util/result';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../core-module/common-methods/global-methods.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  isShow;
  tabIndex = 0;
 list = [{name: '个人信息',  link: 'personalInformation' , active: true},
    {name: '修改登录密码',  link: 'loginPassword' , active: true},
    {name: '修改取款密码',  link: 'withdrawalPassword' , active: true},
    {name: '修改安全问题',  link: 'securityQuestion' , active: true},
    {name: '设置安全问题',  link: 'IssuesSucurity' , active: true}];
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
    private $router: Router) {
    // 监听路由变化
    this.$router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { // 当导航成功结束时执行
        this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.list);
      }
    });
  }
  ngOnInit() {
    // 是否取款密码
      this.$CommonDataService.isModify().then((res: Result) => {
        this.isShow = res.success;
        if (this.isShow !== '0000013') {
          this.list[2].active = false;
        }
      });
      // 是否设置过安全问题
    this.$CommonDataService.isHassetsecurityQA().then((res: Result) => {
      this.isShow = res.success;
      if (this.isShow !== '000005') {
        this.list[3].active = false;
      } else {
        this.list[4].active = false;
      }
    });
    this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.list);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck(): void {
    // 已经设置了安全问题(有可能是在设置安全问题页面提交了，这里监控及时更新)
    if (this.$GlobalService.globalJavaResData.isHasSecurityQA) {
      console.log(1);
      this.list[3].active = true;
      this.list[4].active = false;
      this.$GlobalService.globalJavaResData.isHasSecurityQA = false;
    }
  }
}
