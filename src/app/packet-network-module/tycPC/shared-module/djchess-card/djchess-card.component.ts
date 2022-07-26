import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import jQ from 'jquery';
import {Result} from "../../../../core-module/common-util/result";
import { environment } from 'src/environments/environment';
/**
 * 棋牌游戏的（包含大唐棋牌）
 */
@Component({
  selector: 'app-djchess-card',
  templateUrl: './djchess-card.component.html',
  styleUrls: ['./djchess-card.component.scss']
})
export class DjchessCardComponent implements OnInit {
  arr = [];
  modal = window['modal'];
  gameTypeList = [];
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
      if (this.$GlobalService.globalJavaResData.pokerGameIndexId === 0) {
        this.gameTypeList.forEach((item, i) => {
          if (item.subname === 'POKERGAMES') {
            this.titleList = item.childs;
            this.sportsTab(event, item.childs[0], 0);
          }
        });
      } else {
        this.gameTypeList.forEach((item, i) => {
          if (item.subname === 'POKERGAMES') {
            this.titleList = item.childs;
            this.tabIndex = this.titleList.findIndex(el => el.gameId === this.$GlobalService.globalJavaResData.pokerGameIndexId);
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
    this.tabIndex = i;
    this.whStatus = item.whStatus;
    this.swStatus = item.swStatus;
    this.chargeStatus = item.chargeStatus;
    this.gameData = item;
    this.isQp = item.gamePlatformId;
    // 获取游戏列表
    this.$GlobalService.globalQueryModel.IGPC.game = `${item.gameUrl}`;
    this.$CommonDataService.IGPC().then((res: Result) => {
      this.qpList = [];
      this.qpList = res.data.list;
      /*if (this.isQp === 'DTQP') {
        const list = res.data.list || [];
        this.dtDataObj = list[0];
      } else if (this.isQp === 'KYQP') {
        const list = res.data.list || [];
        this.kyDataObj = list[0];
      } else if (this.isQp === 'LEG') {
        const list = res.data.list || [];
        this.lyDataObj = list[0];
      } else if (this.isQp === 'WL') {
        const list = res.data.list || [];
        this.wlDataObj = list[0];
      } else {
        this.qpList = res.data.list || [];
      }*/
    });
    jQ('.title-current').stop().animate(
      {left: event.target.offsetLeft + 'px'}
    );

  }

  ngDoCheck (): void {
    if (this.oldListGameId !== this.$GlobalService.globalJavaResData.pokerGameIndexId) {
      this.oldListGameId = this.$GlobalService.globalJavaResData.pokerGameIndexId;
      this.toggelGame();
    }
  }
}
