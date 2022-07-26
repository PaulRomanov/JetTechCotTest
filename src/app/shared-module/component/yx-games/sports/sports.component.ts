import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Result} from '../../../../core-module/common-util/result';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import jQ from 'jquery';
@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit, DoCheck, OnDestroy {
  modal = window['modal'];
  navGame = [];
  navList = [];
  tabIndex = 0;
  iframeUrl = '';
  isErrImg = true;
  // 监听点击list组件的游戏id值
  oldListGameId = null;
  // 停压状态下的图片
  isTyErrImg = false;
  tyImg = null;

  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
  ) {
    if (this.$GlobalService.globalQueryModel.userToken) {
      this.isErrImg = false;
    }
  }

  ngOnInit() {

  }

  toggelGame() {
    this.$CommonDataService.homegame().then((res: Result) => {
      this.navGame = res.data;
      if (this.$GlobalService.globalJavaResData.gameItemTyIndexId === 0) {
        this.navGame.forEach((item, i) => {
          if (item.subname === 'TY GAME') {
            this.navList = item.childs;
            this.sportsTab(event, item.childs[0], 0);
            // if (item.childs[0].chargeStatus === 1) {
            //   this.isTyErrImg = true;
            //   this.tyImg = item.childs[0].gameBgImg;
            //   return;
            // } else {
            //   this.isTyErrImg = false;
            //   this.iframeUrl = `${this.$CommonDataService.dlUrl}${item.childs[0].gameUrl}&userToken=${this.$GlobalService.globalQueryModel.userToken}`;
            // }
          }
        });
      } else {
        this.navGame.forEach((item, i) => {
          if (item.subname === 'TY GAME') {
            this.navList = item.childs;
            this.tabIndex = this.navList.findIndex(el => el.gameId === this.$GlobalService.globalJavaResData.gameItemTyIndexId);
            this.sportsTab(event, item.childs[this.tabIndex], this.tabIndex);
            // if (item.childs[this.tabIndex].chargeStatus === 1) {
            //   this.isTyErrImg = true;
            //   this.tyImg = item.childs[this.tabIndex].gameBgImg;
            //   return;
            // } else {
            //   this.isTyErrImg = false;
            //   this.iframeUrl = `${this.$CommonDataService.dlUrl}${item.childs[this.tabIndex].gameUrl}&userToken=${this.$GlobalService.globalQueryModel.userToken}`;
            // }
          }
        });
      }

    });
  }

  sportsTab(event, item, i) {
    this.tabIndex = i;
    jQ('.title-current').stop().animate(
      {left: event.target.offsetLeft + 'px'}
    );
    // 维护
    if (item.whStatus !== 0) {
      this.modal.open({
        message: '维护',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    // 未登录
    if (!this.$GlobalService.globalQueryModel.userToken && !this.$GlobalService.globalQueryModel.swToken) {
      this.$GlobalMethodsService.showTopCenter();
      // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
      this.$GlobalMethodsService.loginOPenWindow();
      return;
    }
    // 停押状态，0不停押 1停押
    if (this.$GlobalService.globalQueryModel.userToken && (item.chargeStatus && item.chargeStatus === 1)) {
      this.modal.open({
        message: `该账户未开通${item.name}游戏`,
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      this.isTyErrImg = true;
      this.tyImg = item.gameBgImg;
      return;
    }
    // 没有停压
    if (this.$GlobalService.globalQueryModel.userToken && item.chargeStatus === 0) {
      if (item.linkType === 2) { // 跳转游戏
        this.isTyErrImg = true;
        this.tyImg = item.gameBgImg;
        this.iframeUrl = null;
        this.$GlobalMethodsService.getOpenUrl(item, 0, item.gameId);
        return;
      }
      this.isTyErrImg = false;
      this.iframeUrl = `${this.$CommonDataService.dlUrl}${item.gameUrl}&userToken=${this.$GlobalService.globalQueryModel.userToken}`;
      return;
    }
    // 试玩
    if (this.$GlobalService.globalQueryModel.swToken && item.swStatus === 1) {
      if (item.linkType === 2) { // 跳转游戏
        this.$GlobalMethodsService.getOpenUrl(item, 0, item.gameId);
        return;
      }
      this.isTyErrImg = false;
      this.iframeUrl = `${this.$CommonDataService.dlUrl}${item.gameUrl}&userToken=${this.$GlobalService.globalQueryModel.userToken}`;
      return;
    } else if (this.$GlobalService.globalQueryModel.swToken !== null && item.swStatus !== 1) { // 状态不为1提示登录
      this.$GlobalMethodsService.showTopCenter();
      // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
      this.$GlobalMethodsService.loginOPenWindow();
      return;
    }
  }

  ngDoCheck(): void {
    if (this.oldListGameId !== this.$GlobalService.globalJavaResData.gameItemTyIndexId) {
      this.oldListGameId = this.$GlobalService.globalJavaResData.gameItemTyIndexId;
      this.toggelGame();
    }
  }

  ngOnDestroy(): void {
    this.tabIndex = 0;
    this.iframeUrl = '';
    this.isErrImg = true;
    // 监听点击list组件的游戏id值
    this.oldListGameId = null;
    // 停压状态下的图片
    this.isTyErrImg = false;
    this.tyImg = null;
    this.$GlobalService.globalJavaResData.gameItemTyIndexId = 0;
  }

}
