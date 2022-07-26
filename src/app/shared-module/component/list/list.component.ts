import {Component, OnInit} from '@angular/core';
import {Result} from '../../../core-module/common-util/result';
import {CommonDataService} from '../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../core-module/common-util/global-service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GlobalMethodsService} from '../../../core-module/common-methods/global-methods.service';

@Component({
  selector: 'pc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  modal = window['modal'];
  data: any = [];
  listNew = [
    {name: '优惠活动', subname: 'YHHD', childs: []},
    {name: 'APP下载', subname: 'APPXZ', childs: []},
  ];
  isShowIndex = null;
  gameData;
  tabIndex = 0;
  // 区别电子游戏
  // hoverGameTitle = null;

  constructor(
    private $CommonDataService: CommonDataService,
    public  $GlobalService: GlobalService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
    // 监听路由变化
    this.$Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { // 当导航成功结束时执行
        this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.data);
      }
    });
  }

  ngOnInit() {
    // console.log(jQ);
    // 首页游戏列表
    if (this.$GlobalService.globalJavaResData.gameNavList.length === 0) {
      this.$CommonDataService.homegame().then((res: Result) => {
        this.data = res.data;
        this.data.push(...this.listNew);
        // 第一项加上home图标
        this.data.unshift({name: '', subname: 'HOME', childs: []});
        this.data.forEach(item => {
          this.getLinkName(item);
          // console.log(item)
          item.childs.forEach(el => {
            el.active = false;
          });
        });
        this.$GlobalService.globalJavaResData.gameNavList = this.data;
        this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.data);
      });
    }
  }
  // 鼠标进入显示二级菜单
  listName(list, i) {
    this.isShowIndex = i;
    // console.log(list);
    // if (list.subname === 'DZ GAME') {
    //   this.hoverGameTitle = 'DZ GAME';
    // } else if (list.subname === 'TY GAME') {
    //   this.hoverGameTitle = 'TY GAME';
    // } else {
    //   this.hoverGameTitle = null;
    // }
  }
 // 鼠标离开隐藏二级菜单
  listNameHide() {
    this.isShowIndex = null;
  }
 // 头部菜单点击后样式
  getLinkName(item) {
    if (item.subname === 'TY GAME') {
      item.link = 'sports';
    } else if (item.subname === 'VG GAME') {
      item.link = 'chessCard';
    } else if (item.subname === 'PY GAME') {
      item.link = 'fishing';
    } else if (item.subname === 'ZR GAME') {
      item.link = 'video';
    } else if (item.subname === 'DZ GAME') {
      item.link = 'games';
    } else if (item.subname === 'CP GAME') {
      item.link = 'lottery';
    } else if (item.subname === 'YHHD') {
      item.link = 'favourable';
    } else if (item.subname === 'APPXZ') {
      item.link = 'appDown';
    } else {
      item.link = 'noviceguide';
    }
  }
// 二级路由跳转
  openLinkGame(name, i) {
    this.tabIndex = i;
    // console.log(name);
    if (name === 'TY GAME') {
      this.$Router.navigate(['./sports'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'VG GAME') {
      this.$Router.navigate(['./chessCard'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'PY GAME') {
      this.$Router.navigate(['./fishing'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'ZR GAME') {
      this.$Router.navigate(['./video'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'DZ GAME') {
      this.$Router.navigate(['./games'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'CP GAME') {
      this.$Router.navigate(['./lottery'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'YHHD') {
      this.$Router.navigate(['./favourable'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'APPXZ') {
      // this.$Router.navigate(['ly/index/appDown'], { relativeTo: this.$ActivatedRoute });
      this.$Router.navigate(['./appDown'], {relativeTo: this.$ActivatedRoute});
    } else {
      this.$Router.navigate(['./noviceguide'], {relativeTo: this.$ActivatedRoute});
    }
  }
 // 点击二级菜单游戏
  imgGamesGo(item, list, number) {
    // console.log(this.$Router);
    this.$GlobalMethodsService.imgGamesGo(item, list, number, this.$Router, this.$ActivatedRoute);
    // 彩票
    // if (list.subname === 'CP GAME') {
    //   this.$GlobalService.globalQueryModel.IGPC.game = item.gameUrl2;
    //   this.$CommonDataService.IGPC().then((res: Result) => {
    //     this.$GlobalService.globalJavaResData.tabIndex = number;
    //     this.$GlobalService.globalJavaResData.cpList = res.data.list;
    //     // this.tabIndex = index;
    //     this.$Router.navigate(['./lottery'], {relativeTo: this.$ActivatedRoute});
    //   });
    //   return;
    // }
    // // 电子游戏
    // if (list.subname === 'DZ GAME') {
    //   // console.log(item);
    //   this.$GlobalService.globalJavaResData.gameItemIndexId = item.gameId;
    //   this.$Router.navigate(['./games'], {relativeTo: this.$ActivatedRoute});
    //   return;
    // }
    // // 体育赛事
    // if (list.subname === 'TY GAME') {
    //   this.$GlobalService.globalJavaResData.gameItemTyIndexId = item.gameId;
    //   this.$Router.navigate(['./sports'], {relativeTo: this.$ActivatedRoute});
    //   return;
    // }
    // // 维护
    // if (item.whStatus !== 0) {
    //   this.modal.open({
    //     message: '维护',
    //     confirmShow: true,
    //     confirmTxt: '确认',
    //     cancelShow: false,
    //   });
    //   return;
    // }
    // // 未登录
    // if (!this.$GlobalService.globalQueryModel.userToken && !this.$GlobalService.globalQueryModel.swToken) {
    //   this.$GlobalMethodsService.showTopCenter();
    //   this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
    //   return;
    // }
    // // 停押状态，0不停押 1停押
    // if (this.$GlobalService.globalQueryModel.userToken && (item.chargeStatus && item.chargeStatus === 1)) {
    //   this.modal.open({
    //     message: `该账户未开通${item.name}游戏`,
    //     confirmShow: true,
    //     confirmTxt: '确认',
    //     cancelShow: false,
    //   });
    //   return;
    // }
    // // 试玩
    // if (this.$GlobalService.globalQueryModel.swToken && item.swStatus === 1) {
    //   this.$GlobalMethodsService.getOpenUrl(item, 1, item.gameId);
    //   // window.open(`${this.$CommonDataService.dlUrl}${item.swUrl}&userToken=${this.$GlobalService.globalQueryModel.swToken}`, '_blank');
    //   return;
    // } else if (this.$GlobalService.globalQueryModel.swToken && item.swStatus !== 1) { // 状态不为1提示登录
    //   this.$GlobalMethodsService.showTopCenter();
    //   this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
    //   return;
    // }
    // // 正式账户跳转
    // if (this.$GlobalService.globalQueryModel.userToken) {
    //   this.$GlobalMethodsService.getOpenUrl(item, 0, item.gameId);
    //   return;
    // }
  }
}
