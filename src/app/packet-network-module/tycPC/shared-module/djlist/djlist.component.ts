import {AfterViewInit, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../core-module/common-util/result';
import {CommonMethods} from '../../../../core-module/common-methods/common-methods';
import { environment } from 'src/environments/environment';
import  dayjs from 'dayjs';

@Component({
  selector: 'pc-djlist',
  templateUrl: './djlist.component.html',
  styleUrls: ['./djlist.component.scss']
})
export class DjlistComponent implements OnInit, OnDestroy, DoCheck {
  modal = window['modal'];
  data: any = [];
  listNew = [
    {name: '优惠', subname: 'YHHD', childs: []},
    {name: '代理', subname: 'VIP GAME', childs: []},
    {name: 'APP下载', subname: 'APPXZ', childs: []}
  ];
  gameData;
  isShowIndex = null;
  tabIndex = 0;
  isColor = true;
  itrem = null;
  timer = null;
  // 单独处理棋牌和捕鱼
  navDataList = [];
  oldUserToken = '11';
  nowMdTime = '';

  constructor(
    private $CommonDataService: CommonDataService,
    public  $GlobalService: GlobalService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
    this.setMdTime();
    this.timer = setInterval(() => {
      this.setMdTime();
    }, 1000);
    // 监听路由变化
    this.$Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { // 当导航成功结束时执行
        this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.data);
      }
    });
  }

  ngOnInit() {
    // 头部字体特效
    this.itrem = setInterval(() => {
      this.isColor = !this.isColor;
    }, 500);
    // 首页游戏列表
    if (this.$GlobalService.globalJavaResData.gameNavList.length === 0) {
      this.setListNav();
    }
  }

  /**
   * 线路检测
   */
  circuit() {
    window.open(`#/${environment.rootUrl}/newPage/circuit`, '_blank');
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
      item.link = 'sportst';
    } else if (item.subname === 'VG GAME') {
      item.link = 'chessCard';
    } else if (item.subname === 'POKERGAMES') {
      item.link = 'pokerGame';
    } else if (item.subname === 'PY GAME') {
      item.link = 'fishing';
    } else if (item.subname === 'ZR GAME') {
      item.link = 'video';
    } else if (item.subname === 'DZ GAME') {
      item.link = 'games';
    } else if (item.subname === 'CP GAME') {
      item.link = 'lotteryt';
    } else if (item.subname === 'YHHD') {
      item.link = 'favourable';
    } else if (item.subname === 'APPXZ') {
      item.link = 'appDown';
    }  else if (item.subname === 'DJ GAME') {
      item.link = 'bettings';
    } else if (item.subname === 'VIP GAME') {
      item.link = 'vipPage';
      // item.link = '';
    } else {
      item.link = 'noviceguide';
    }
  }

// 二级路由跳转
  openLinkGame(name, i) {
    if (name !== 'VIP GAME') { // 合作经营不需要选中
      this.tabIndex = i;
    }
    // console.log(name);
    if (name === 'TY GAME') {
      this.$Router.navigate(['./sportst'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'VG GAME') {
      this.$Router.navigate(['./chessCard'], {relativeTo: this.$ActivatedRoute});
    }  else if (name === 'POKERGAMES') {
      this.$Router.navigate(['./pokerGame'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'PY GAME') {
      this.$Router.navigate(['./fishing'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'ZR GAME') {
      this.$Router.navigate(['./video'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'DZ GAME') {
      this.$Router.navigate(['./games'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'CP GAME') {
      this.$Router.navigate(['./lotteryt'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'YHHD') {
      this.$Router.navigate(['./favourable'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'APPXZ') {
      // this.$Router.navigate(['ly/index/appDown'], { relativeTo: this.$ActivatedRoute });
      this.$Router.navigate(['./appDown'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'DJ GAME') {
      // this.$Router.navigate(['ly/index/appDown'], { relativeTo: this.$ActivatedRoute });
      this.$Router.navigate(['./bettings'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'VIP GAME') { // 合作经营
      this.$Router.navigate(['./vipPage'], {relativeTo: this.$ActivatedRoute});
      // window.open(`#/${environment.rootUrl}/newPage/cooperation/0`, '_blank');
      // window.open(`#/${environment.rootUrl}/newPage/vipPage`, '_blank');
    } else {
      this.$Router.navigate(['./noviceguide'], {relativeTo: this.$ActivatedRoute});
    }
  }
  setMdTime() {
    // 将时间戳转化成时间格式
    this.nowMdTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  }

  // 点击二级菜单游戏
  imgGamesGo(item, list, number) {
    if (list.subname === 'VG GAME') {
      this.$Router.navigate(['./chessCard'], {relativeTo: this.$ActivatedRoute});
      return;
    }
    if (list.subname === 'PY GAME') {
      this.$Router.navigate(['./fishing'], {relativeTo: this.$ActivatedRoute});
      this.$GlobalService.globalJavaResData.gameItemByIndexId = number + 1;
      console.log(number + 1)
      return;
    }
    if (list.subname === 'TY GAME') {
      this.$Router.navigate(['./sportst'], {relativeTo: this.$ActivatedRoute});
      this.$GlobalService.globalJavaResData.gameItemTyIndexId = item.gameId;
      return;
    }
    if (list.subname === 'CP GAME') {
      this.$Router.navigate(['./lotteryt'], {relativeTo: this.$ActivatedRoute});
      return;
    }
    this.$GlobalMethodsService.imgGamesGo(item, list, number, this.$Router, this.$ActivatedRoute);
  }

  setListNav() {
    this.$CommonDataService.homegame().then((res: Result) => {
      this.data = res.data || [];
      this.data.push(...this.listNew);
      // 第一项加上home图标
      this.data.unshift({name: '首页', subname: 'HOME', childs: []});
      this.data.forEach(item => {
        this.getLinkName(item);
        // console.log(item)
        item.childs.forEach(el => {
          el.active = false;
        });

      });
      // 处理电竞棋牌和捕鱼游戏
      this.navDataList = CommonMethods.deepClone(this.data);
      this.navDataList.forEach(item => {
        if (item.subname === 'VG GAME' && item.childs.length > 0) {
          const firstItem = item.childs[0];
          firstItem['name'] = 'VG棋牌';
          firstItem['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/VG.png`;
          firstItem['chargeStatus'] = 0;
          item.childs = [];
          item.childs.push(firstItem);
        }
        if (item.subname === 'PY GAME') {
          item.childs = [];
          for (let i = 0; i < 7; i++) {
            const pyObj = new Object();
            if (i === 0) {
              pyObj['name'] = 'AG捕鱼';
              pyObj['imgSUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/menu_logo_ag.png`;
              pyObj['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/img_fishing_menu_01.png`;
            // } else if (i === 1) {
            //   pyObj['name'] = 'CQ9捕鱼';
            //   pyObj['imgSUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/menu_logo_cq9.png`;
            //   pyObj['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/img_fishing_menu_02.png`;
            } else if (i === 1) {
              pyObj['name'] = 'FG捕鱼';
              pyObj['imgSUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/menu_logo_fg.png`;
              pyObj['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/img_fishing_menu_03.png`;
            } else if (i === 2) {
              pyObj['name'] = 'VG捕鱼';
              pyObj['imgSUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/menu_logo_vg.png`;
              pyObj['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/img_fishing_menu_04.png`;
            } else if (i === 3) {
              pyObj['name'] = 'BBIN捕鱼';
              pyObj['imgSUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/menu_logo_bbin.png`;
              pyObj['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/img_fishing_menu_05.png`;
            } else if (i === 4) {
              pyObj['name'] = 'JDB捕鱼';
              pyObj['imgSUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/menu_logo_jdb.png`;
              pyObj['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/img_fishing_menu_06.png`;
            } else if (i === 5) {
              pyObj['name'] = 'KA捕鱼';
              pyObj['imgSUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/menu_logo_ka.png`;
              pyObj['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/img_fishing_menu_07.png`;
            } else if (i === 6){
              pyObj['name'] = 'BG捕鱼';
              pyObj['imgSUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/menu_logo_bg.png`;
              pyObj['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/img_fishing_menu_08.png`;
            }
            // else if (i === 7){
            //   pyObj['name'] = 'HY捕鱼';
            //   pyObj['imgSUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/menu_logo_hy.png`;
            //   pyObj['imgUrl'] = `/${this.$GlobalService.globalJavaResData.projectName}/img/img_fishing_menu_09.png`;
            // }
            item.childs.push(pyObj);
          }
        }
      });
      this.$GlobalService.globalJavaResData.gameNavList = this.data;
      this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.data);
    });
  }

  //体育游戏入口
  goGame(item) {
    this.$GlobalMethodsService.goGameResolve(item);
  }

  // 彩票游戏入口
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
   * 跳转彩票游戏页面
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

  ngOnDestroy(): void {
    if (this.itrem) {
      clearInterval(this.itrem);
    }
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ngDoCheck(): void {
    // 监听是否登录
    if (this.oldUserToken !== this.$GlobalService.globalQueryModel.userToken) {
      this.oldUserToken = this.$GlobalService.globalQueryModel.userToken;
      this.setListNav();
    }
  }
}
