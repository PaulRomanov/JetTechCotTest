import {AfterViewInit, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {Result} from '../../../../core-module/common-util/result';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import Swiper from 'swiper';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import jQ from 'jquery';
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {
  modal = window['modal'];
  navGame = [];
  navList = [];
  oneTiTle = 0;
  titleList = [];
  titleNum = 0;
  gameList = [];
  gamePlatformId = null;
  gameImgBg = null; // 图片背景
  isLinkType = true; // 显示图片 还是显示游戏列表
  gameId = null;
  searchGameName = null;

  // 监听点击list组件的游戏id值
  oldListGameId = null;
  // 父级的停压状态
  prentChargeStatus = 0;
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const mySwiper = new Swiper('#dzGame', {
      freeMode: true,
      freeModeMomentumRatio: .5,
      slidesPerView: 'auto',
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper的父元素时，自动初始化swiper
    });
    const swiperWidth = mySwiper.el.clientWidth;
    const maxTranslate = -600;
    const maxWidth = -maxTranslate + swiperWidth / 2;
    mySwiper.on('tap', function () {
      if (!this.clickedIndex) {
        return;
      }
      const slide = mySwiper.slides[this.clickedIndex];
      const slideLeft = slide.offsetLeft;
      const slideWidth = slide.clientWidth;
      const slideCenter = slideLeft + slideWidth / 2;
      // 被点击slide的中心点
      mySwiper.setTranslate(600);
      if (slideCenter < swiperWidth / 2) {
        mySwiper.setTranslate(0);
      } else if (slideCenter > maxWidth) {
        mySwiper.setTranslate(maxTranslate);
      } else {
        const nowTlanslate = slideCenter - swiperWidth / 2;
        mySwiper.setTranslate(-nowTlanslate);
      }
    });
  }

  /**
   * 获取二级列表(全部 最热 推荐)
   * param item
   */
  gettitleList(item) {
    this.gamePlatformId = item.gamePlatformId;
    this.$GlobalService.globalQueryModel.getComputerGamet.gamePlatformId = item.gamePlatformId;
    this.$CommonDataService.getComputerGamet().then((res: Result) => {
      // console.log(res);
      if (res.data) {
        this.titleList = res.data.subData.reverse() || [];
        this.$GlobalService.globalQueryModel.getDzGameList.gameplatformId = item.gamePlatformId;
        this.getComputerGametDZList(item);
      }
    });
  }

  /**
   * 获取全部title下的游戏列表
   * param item
   */
  getComputerGametDZList(item) {
    this.$CommonDataService.getComputerGametList().then((res: Result) => {
      // console.log(res);
      if(this.$GlobalService.globalQueryModel.getDzGameList.gameplatformId === 'PT2'){
        this.gameList = res.data.listAs;
      }else{
        this.gameList = res.data.list;
      }
      // this.gameList = res.data.list;
    });
  }
  /**
   * 开始游戏
   * param data
   */
  startGame(item) {
    // console.log(item);
    // 维护
    if (parseInt(item.status, 10) !== 0) {
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
    // 试玩
    if (this.$GlobalService.globalQueryModel.swToken && item.swurl) {
      this.$GlobalMethodsService.getOpenUrl(item, 1, this.gameId);
      // window.open(`${this.$CommonDataService.dlUrl}${item.swUrl}&userToken=${this.$GlobalService.globalQueryModel.swToken}`, '_blank');
      return;
    } else if (this.$GlobalService.globalQueryModel.userToken) { // 正式账户
      if (this.$GlobalService.globalQueryModel.userToken && this.prentChargeStatus === 1) {
        this.modal.open({
          message: `该账户未开通${item.gamename}游戏`,
          confirmShow: true,
          confirmTxt: '确认',
          cancelShow: false,
        });
        return;
      }
      this.$GlobalMethodsService.getOpenUrl(item, 0, this.gameId);
    } else { // 提示登录
      this.$GlobalMethodsService.showTopCenter();
      // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
      this.$GlobalMethodsService.loginOPenWindow();
      return;
    }

  }

  /**
   *一级标题
   * param item
   * param i
   */
  titleTab(item, i) {
    // console.log(item);
    this.searchGameName = null;
    this.oneTiTle = i;
    this.titleNum = 0;
    jQ('.title-current').stop().animate(
      {left: this.oneTiTle * 140 + 'px'}
    );
    this.gameId = item.gameId;
    this.prentChargeStatus = item.chargeStatus;

    // console.log(item);
    if (item.linkType !== 0) { // 跳转新的窗口
      this.isLinkType = false;
      this.gameImgBg = item.gameBgImg;
      this.titleGameOpenUrl(item);
      return;
    } else {
      this.isLinkType = true;
      this.gameImgBg = null;
    }
    delete this.$GlobalService.globalQueryModel.getDzGameList['label'];
    this.gettitleList(item);
  }

  /**
   *二级标题（全部，热门）
   * param item
   * param i
   */
  twoTitle(item, i) {
    // console.log(item);
    this.titleNum = i;
    this.searchGameName = null;
    this.$GlobalService.globalQueryModel.getDzGameList.gameplatformId = this.gamePlatformId;
    this.$GlobalService.globalQueryModel.getDzGameList['label'] = item.gameType;
    this.getComputerGametDZList(item);
  }

  /**
   *单独处理一级导航的游戏跳转
   * param item
   */
  titleGameOpenUrl(item) {
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

    // 试玩
    if (this.$GlobalService.globalQueryModel.swToken && item.swStatus === 1) {
      this.$GlobalMethodsService.getOpenUrl(item, 1, this.gameId);
      // window.open(`${this.$CommonDataService.dlUrl}${item.swUrl}&userToken=${this.$GlobalService.globalQueryModel.swToken}`, '_blank');
      return;
    } else if (this.$GlobalService.globalQueryModel.swToken && item.swStatus !== 1) { // 状态不为1提示登录
      this.$GlobalMethodsService.showTopCenter();
      // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
      this.$GlobalMethodsService.loginOPenWindow();
      return;
    }
    if (this.$GlobalService.globalQueryModel.userToken && item.chargeStatus === 1) {
      this.modal.open({
        message: `该账户未开通${item.name}游戏`,
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    // 正式账户跳转
    if (this.$GlobalService.globalQueryModel.userToken) {
      this.$GlobalMethodsService.getOpenUrl(item, 0, this.gameId);
      return;
    }
  }

  gameSearch() {
    // console.log(this.gameList);
    if (!this.searchGameName) {
      this.modal.open({
        message: '请输入游戏名称',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    const res = [];
    this.gameList.forEach(item => {
      if (item.gamename.indexOf(this.searchGameName) !== -1) {
        res.push(item);
      }
    });
    this.gameList = res;
  }

  /**
   *初始化游戏列表
   */
  initGame() {
    this.$CommonDataService.homegame().then((res: Result) => {
      this.navGame = res.data;
      // console.log(this.navGame);
      if (this.$GlobalService.globalJavaResData.gameItemIndexId === 0) {
        this.navGame.forEach((item) => {
          if (item.subname === 'DZ GAME') {
            this.navList = item.childs;
            this.gameId = this.navList[0].gameId;
            this.titleTab(this.navList[0], 0);
          }
        });
      } else {
        this.navGame.forEach((item) => {
          if (item.subname === 'DZ GAME') {
            this.navList = item.childs;
            this.oneTiTle = this.navList.findIndex(el => el.gameId === this.$GlobalService.globalJavaResData.gameItemIndexId);
            this.gameId = this.navList[this.oneTiTle].gameId;
            this.titleTab(this.navList[this.oneTiTle], this.oneTiTle);
          }
        });
      }
    });
  }

  ngDoCheck(): void {
    // 监听选择的游戏id改变
    if (this.oldListGameId !== this.$GlobalService.globalJavaResData.gameItemIndexId) {
      this.oldListGameId = this.$GlobalService.globalJavaResData.gameItemIndexId;
      this.initGame();
    }
  }

  ngOnDestroy(): void {
    this.oldListGameId = null;
    this.$GlobalService.globalJavaResData.gameItemIndexId = 0;
    this.gameImgBg = null; // 图片背景
    this.isLinkType = true; // 显示图片 还是显示游戏列表
  }
}
