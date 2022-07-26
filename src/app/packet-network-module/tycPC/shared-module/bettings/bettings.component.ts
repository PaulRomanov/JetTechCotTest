// import {AfterViewInit, Component, OnInit} from '@angular/core';
// import {GlobalService} from '../../../../core-module/common-util/global-service';
// import {Result} from '../../../../core-module/common-util/result';
// import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
// import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
// import jQ from 'jquery';

// @Component({
//   selector: 'app-bettings',
//   templateUrl: './bettings.component.html',
//   styleUrls: ['./bettings.component.scss']
// })
// export class BettingsComponent implements OnInit {
//   modal = window['modal'];
//   navList = [];
//   iframeUrl = '';
//   // 停压状态下的图片
//   isTyErrImg = false;
//   tyImg = null;
//   gameTypeList = [];
//   tabIndex = 0;
//   // 监听点击list组件的游戏id值
//   oldListGameId = null;
//   whStatus;
//   swStatus;
//   chargeStatus;

//   constructor(
//     public  $GlobalService: GlobalService,
//     private $CommonDataService: CommonDataService,
//     private $GlobalMethodsService: GlobalMethodsService
//   ) {
//   }

//   ngOnInit() {

//     this.$CommonDataService.homegame().then((res: Result) => {
//       this.gameTypeList = res.data || [];
//         this.gameTypeList.forEach((item, i) => {
//           if (item.subname === 'DJ GAME') {
//             this.navList = item.childs;
//             this.sportsTab(event, item.childs[0], 0);
//           }
//         });
//     })
//   }

//   sportsTab(event, item, i) {
//     this.tabIndex = i;
//     jQ('.title-current').stop().animate(
//       {left: event.target.offsetLeft + 'px'}
//     );
//     // 维护
//     if (item.whStatus !== 0) {
//       this.modal.open({
//         message: '维护',
//         confirmShow: true,
//         confirmTxt: '确认',
//         cancelShow: false,
//       });
//       return;
//     }
//     // 未登录
//     if (!this.$GlobalService.globalQueryModel.userToken && !this.$GlobalService.globalQueryModel.swToken) {
//       this.isTyErrImg = true;
//       this.$GlobalMethodsService.showTopCenter();
//       this.$GlobalMethodsService.loginOPenWindow();
//       return;
//     }
//     // 停押状态，0不停押 1停押
//     if (this.$GlobalService.globalQueryModel.userToken && (item.chargeStatus && item.chargeStatus === 1)) {
//       this.modal.open({
//         message: `该账户未开通${item.name}游戏`,
//         confirmShow: true,
//         confirmTxt: '确认',
//         cancelShow: false,
//       });
//       this.isTyErrImg = true;
//       this.tyImg = item.gameBgImg;
//       return;
//     }
//     // 试玩
//     if (this.$GlobalService.globalQueryModel.swToken && item.swStatus === 1) {
//       this.isTyErrImg = false;
//       this.iframeUrl = `${this.$CommonDataService.dlUrl}${item.gameUrl}&userToken=${this.$GlobalService.globalQueryModel.userToken}`;
//       return;
//     } else if (this.$GlobalService.globalQueryModel.swToken !== null && item.swStatus !== 1) { // 状态不为1提示登录
//       this.isTyErrImg = true;
//       this.$GlobalMethodsService.showTopCenter();
//       this.$GlobalMethodsService.loginOPenWindow();
//       return;
//     }
//     // 正式账户
//     if (this.$GlobalService.globalQueryModel.userToken) {
//       this.isTyErrImg = false;
//       this.iframeUrl = `${this.$CommonDataService.dlUrl}${item.gameUrl}&userToken=${this.$GlobalService.globalQueryModel.userToken}`;
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import {Result} from "../../../../core-module/common-util/result";
import { environment } from 'src/environments/environment';
/**
 * 棋牌游戏的（包含大唐棋牌）
 */
@Component({
  selector: 'app-bettings',
  templateUrl: './bettings.component.html',
  styleUrls: ['./bettings.component.scss']
})
export class BettingsComponent implements OnInit {
  arr = [];
  modal = window['modal'];
  gameTypeList = [];
  dj_item = {
    imgSUrl: '',
    name: '',
    gamePlatformId: '',
    childs: []
  };
  titleList = [
    {imgLUrl: '', name: '', gameId: null}
  ];
  tabIndex = 0;
  // 监听点击list组件的游戏id值
  oldListGameId = null;
  whStatus;
  swStatus;
  chargeStatus;
  qpList = [];
  // 区别大唐棋牌和vg棋牌
  isQp = null;
  dtDataObj = {imgpath: ''};
  kyDataObj = {imgpath: ''};
  lyDataObj = {imgpath: ''};
  wlDataObj = {imgpath: ''};
  gameData;
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
  ) { }

  ngOnInit() {
    // 轮播图Swiper
    setTimeout(() => {
    });
  }

  // 游戏入口
  goGame(item) {
    // 维护
    if (parseInt(this.whStatus, 10) !== 0) {
      this.modal.open({
        message: '游戏正在维护！',
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

    // 试玩
    if (this.$GlobalService.globalQueryModel.swToken && parseInt(this.swStatus, 10) === 1 && item.swurl) {
      this.getOpenUrl(item, 1);
      return;
    } else if (this.$GlobalService.globalQueryModel.swToken && parseInt(this.swStatus, 10) !== 1) { // 状态不为1提示登录
      this.$GlobalMethodsService.showTopCenter();
      this.$GlobalMethodsService.loginOPenWindow();
      return;
    }
    // 停押
    if (this.$GlobalService.globalQueryModel.userToken && this.chargeStatus !== 0) {
      this.modal.open({
        message: `该账户未开通${item.gamename}游戏！`,
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    // 正式账户跳转
    if (this.$GlobalService.globalQueryModel.userToken) {
      this.getOpenUrl(item, 0);
      return;
    }
  }

  /**
   * 跳转游戏页面
   * param item
   */
  getOpenUrl(item, type) {
    if (type === 0) { // 正式账户跳转
      let url = null;
      if (item && item.gameUrl) {
        url = item.gameUrl;
      } else if (item && item.loginurl) {
        url = item.loginurl;
      } else if (item && item.gameurl) {
        url = item.gameurl;
      }
      this.$GlobalService.globalQueryModel.agamebalance.gameid = this.gameData.gameId;
      this.$CommonDataService.getGamebalance().then((res: Result) => {

        if (res.success === 0) {
          let gameData = res;
          if (gameData.data.wallettype.companyWallettype === 2) { // 公司为双钱包模式
            if (gameData.data.wallettype.userWallettype === 0) {// 用户为转账模式

              if (gameData.success === 0 && parseInt(gameData.data.balanceData[0].balance, 10) < parseInt(gameData.total, 10)) {
                sessionStorage.setItem('gameUrl', url);
                // 小于临界值跳转到新界面
                window.open(`#/${environment.rootUrl}/newPage/gameTips/${this.gameData.gameId}`, '_blank');
              } else {//  大于就直接跳转游戏
                window.open(`${this.$CommonDataService.dlUrl}${url}&userToken=${this.$GlobalService.globalQueryModel.userToken}`, '_blank');
              }

            } else if (gameData.data.wallettype.userWallettype === 1) {// 用户为免转模式
              window.open(`${this.$CommonDataService.dlUrl}${url}&userToken=${this.$GlobalService.globalQueryModel.userToken}`, '_blank');
            }
          } else if (gameData.data.wallettype.companyWallettype === 0) { // 公司模式为转账模式

            if (gameData.success === 0 && parseInt(gameData.data.balanceData[0].balance, 10) < parseInt(gameData.total, 10)) {
              sessionStorage.setItem('gameUrl', url);
              // 小于临界值跳转到新界面
              window.open(`#/${environment.rootUrl}/newPage/gameTips/${this.gameData.gameId}`, '_blank');
            } else {//  大于就直接跳转游戏
              window.open(`${this.$CommonDataService.dlUrl}${url}&userToken=${this.$GlobalService.globalQueryModel.userToken}`, '_blank');
            }

          } else { // 公司模式为免转模式
            window.open(`${this.$CommonDataService.dlUrl}${url}&userToken=${this.$GlobalService.globalQueryModel.userToken}`, '_blank');
          }
        }

      });
    } else { // 试玩
      let url = null;
      if (item && item.swUrl) {
        url = item.swUrl;
      } else if (item && item.swurl) {
        url = item.swurl;
      }
      // 试玩 直接跳转游戏
      window.open(`${this.$CommonDataService.dlUrl}${url}&userToken=${this.$GlobalService.globalQueryModel.swToken}`, '_blank');
    }
  }

  /**
   * 点击一级tab切换
   */
  toggelGame() {
    this.$CommonDataService.homegame().then((res: Result) => {
      this.gameTypeList = res.data;
      if (this.$GlobalService.globalJavaResData.gameItemIndexId === 0) {
        this.gameTypeList.forEach((item, i) => {
          if (item.subname === 'DJ GAME') {
            this.titleList = item.childs;
            this.sportsTab(event, item.childs[0], 0);
          }
        });
      } else {
        this.gameTypeList.forEach((item, i) => {
          if (item.subname === 'DJ GAME') {
            this.titleList = item.childs;
            this.tabIndex = this.titleList.findIndex(el => el.gameId === this.$GlobalService.globalJavaResData.gameItemIndexId);
            this.sportsTab(event, item.childs[this.tabIndex], this.tabIndex);
          }
        });
      }
    });
  }

  /**
   * 点击二级导航切换
   * @param event
   * @param item
   * @param i
   */
  sportsTab(event, item, i) {
    console.log(item)
    this.tabIndex = i;
    this.whStatus = item.whStatus;
    this.swStatus = item.swStatus;
    this.chargeStatus = item.chargeStatus;
    this.gameData = item;
    this.isQp = item.gamePlatformId;
    this.dj_item = item;
  }

  ngDoCheck (): void {
    if (this.oldListGameId !== this.$GlobalService.globalJavaResData.gameItemIndexId) {
      this.oldListGameId = this.$GlobalService.globalJavaResData.gameItemIndexId;
      this.toggelGame();
    }
  }
}
