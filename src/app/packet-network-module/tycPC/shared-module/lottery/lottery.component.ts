import {Component, OnInit} from '@angular/core';
import {Result} from '../../../../core-module/common-util/result';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import jQ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss']
})
export class LotteryTComponent implements OnInit {
  arr = [];
  modal = window['modal'];
  isShowIndex: 0;
  cpList;
  // whStatus;
  // chargeStatus;
  navGame;
  gameData;

  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
  }

  ngOnInit() {
    // 页面刚刷新无数据默认获取第一条
    if (this.$GlobalService.globalJavaResData.cpList && this.$GlobalService.globalJavaResData.tabIndex === 0) {
      this.$CommonDataService.homegame().then((res: Result) => {
        res.data.forEach((item) => {
          if (item.subname === 'CP GAME') {
            // 取单独的配置需要拼接厅主id
            this.$GlobalService.globalQueryModel.IGPC.game = `${item.childs[0].gameUrl2}${this.$GlobalService.globalQueryModel.companyId}`;
            this.gameData = item.childs[0];
            // 取状态
            this.$GlobalService.globalJavaResData.cpwhStatus = item.childs[0].whStatus;
            this.$GlobalService.globalJavaResData.cpchargeStatus = item.childs[0].chargeStatus;
            this.$GlobalService.globalJavaResData.cpswStatus = item.childs[0].swStatus;
            // console.log(this.gameData);
            this.$CommonDataService.IGPC().then((data: Result) => {
              this.$GlobalService.globalJavaResData.cpList = data.data.list;
              this.$GlobalService.globalJavaResData.tabIndex = 0;
            });
          }
        });
      });
    }

    // 轮播图Swiper
    setTimeout(() => {

      // let arr = []
      let _this = this;
      this.$CommonDataService.homegame().then((res: Result) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].subname == 'CP GAME') {
            _this.arr = res.data[i].childs;
          }
        }
      });
    });
  }

  // 鼠标进入显示二级菜单
  listName(i) {
    this.isShowIndex = i;
  }
  scrollGame(direct) {
    if (direct == 'prev') {
      jQ('.games_box').animate({
        scrollLeft: jQ('.games_box').scrollLeft() - 98 * 5
      }, 500);
    } else {
      jQ('.games_box').animate({
        scrollLeft: jQ('.games_box').scrollLeft() + 98 * 5
      }, 500);
    }
  }
  // 鼠标离开隐藏二级菜单
  listNameHide() {
    this.isShowIndex = null;
  }

  // 点击二级导航
  gamesName(event, gameUrl2, index, whStatus, chargeStatus, data) {
    // this.whStatus = whStatus;
    // this.chargeStatus = chargeStatus;
    this.$GlobalService.globalJavaResData.cpwhStatus = data.whStatus;
    this.$GlobalService.globalJavaResData.cpchargeStatus = data.chargeStatus;
    this.$GlobalService.globalJavaResData.cpswStatus = data.swStatus;
    // 取单独的配置需要拼接厅主id
    this.$GlobalService.globalQueryModel.IGPC.game = `${gameUrl2}${this.$GlobalService.globalQueryModel.companyId}`;
    this.gameData = data;
    this.$CommonDataService.IGPC().then((res: Result) => {
      this.$GlobalService.globalJavaResData.cpList = res.data.list;
      this.$GlobalService.globalJavaResData.tabIndex = index;
      jQ('.title-current').stop().animate(
        {left: event.target.offsetLeft + 'px'}
      );
    });
  }

  // 游戏入口
  gameLogin(item) {
    this.gameData = item;
    // gameurl, gamecode
    // 维护
    if (parseInt(item.whStatus, 10) !== 0) {
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
    if (this.$GlobalService.globalQueryModel.swToken && parseInt(item.swStatus, 10) === 1 && item.swurl) {
      this.getOpenUrl(item, 1);
      // window.open(`${this.$CommonDataService.dlUrl}${item.swUrl}&userToken=${this.$GlobalService.globalQueryModel.swToken}`, '_blank');
      return;
    } else if (this.$GlobalService.globalQueryModel.swToken && parseInt(item.swStatus, 10) !== 1) { // 状态不为1提示登录
      this.$GlobalMethodsService.showTopCenter();
      // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
      this.$GlobalMethodsService.loginOPenWindow();
      return;
    }
    // 停押
    if (this.$GlobalService.globalQueryModel.userToken && item.chargeStatus !== 0) {
      this.modal.open({
        message: `该账户未开通${this.gameData.name}游戏！`,
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
        // const gameData = res;
        // if (gameData.success === 0 && parseInt(gameData.data[0].balance, 10) < parseInt(gameData.total, 10)) {
        //   sessionStorage.setItem('gameUrl', url);
        //   // 小于临界值跳转到新界面
        //   window.open(`#/${environment.rootUrl}/newPage/gameTips/${this.gameData.gameId}`, '_blank');
        // } else {//  大于就直接跳转游戏
        //   window.open(`${this.$CommonDataService.dlUrl}${url}&userToken=${this.$GlobalService.globalQueryModel.userToken}`, '_blank');
        // }
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
}
