import {Injectable} from '@angular/core';
import {GlobalService} from '../common-util/global-service';
import {CommonDataService} from '../common-util/common-data.service';
import {Result} from '../common-util/result';
import {MessageService} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {CommonMethods} from './common-methods';
import {RegularExp} from '../common-util/regular-exp';
import {CommonProxyService} from '../common-util/common-proxy.service';
import { EventBusService } from '../event-bus/event-bus';
@Injectable()
export class GlobalMethodsService {
  host;
  aff;
  modal = window['modal'];
  uuid = '';
  timer1 = null;
  timer2 = null;
  timer3 = null;
  isSsfs = null;
  moNum = 60;
  loginCount = 60;
  registerCount = 60;
  connect = window['connect'];
  disconnect = window['disconnect'];
  randomString = window['randomString'];
  //图片验证开关
  verifySwitchOn = false;

  constructor(private $CommonDataService: CommonDataService,
              private $GlobalService: GlobalService,
              private $MessageService: MessageService,
              private $Router: Router,
              private $ActivatedRoute: ActivatedRoute,
              private $CommonProxyService: CommonProxyService,
              private $EventBusService: EventBusService
              ) {
    // 在package-network.component.ts 文件处调用
    // this.loadkf();
    // 初始化启动websoket连接
    // if (sessionStorage.getItem('userToken')) {
    //   this.connect(sessionStorage.getItem('userToken'), this.$GlobalService.globalQueryModel.companyId);
    // } else if (sessionStorage.getItem('swToken')) {
    //   this.connect(sessionStorage.getItem('swToken'), this.$GlobalService.globalQueryModel.companyId);
    // } else {
    //   this.connect(this.randomString(32), this.$GlobalService.globalQueryModel.companyId);
    // }
  }

  // 账户余额
  myAllbalancelist() {
    this.$GlobalService.globalTipsModelModel.balanceState.loading = true
    return this.$CommonDataService.allbalancelist().then((res: Result) => {
      this.$GlobalService.globalTipsModelModel.balanceState.loading = false
      // 总余额
      const data = res.data;
      //显示money
      var show = localStorage.getItem('balanceShow')
      if(show === null){
        localStorage.setItem('balanceShow', '1')
      }
      data.forEach(item => {
        if (item.id === '0') {
          // 主账户
          sessionStorage.setItem('totalBalanceName', item.value);
          this.$GlobalService.globalQueryModel.totalBalanceName = item.value;
        } else if (item.id === '-1') {
          // 账户余额
          sessionStorage.setItem('totalBalance', item.value);
          this.$GlobalService.globalQueryModel.totalBalance = item.value;
        }
      });
      // 所有余额
      this.$GlobalService.globalQueryModel.balancelist = data.reverse().slice();
    });
  }

  /**
   *获取导航栏的数据，组装
   */
  getGameNavList() {
    this.$CommonDataService.homegame().then((res: Result) => {
      const listNew = [
        {name: '优惠活动', subname: 'YHHD', childs: []},
        {name: 'APP下载', subname: 'APPXZ', childs: []},
      ];
      this.$GlobalService.globalJavaResData.gameNavList = res.data;
      this.$GlobalService.globalJavaResData.gameNavList.push(...listNew);
      // 第一项加上home图标
      this.$GlobalService.globalJavaResData.gameNavList.unshift({name: '', subname: 'HOME', childs: []});
      // console.log(this.$GlobalService.globalJavaResData.gameNavList);
    });
  }

  /**
   * 拿到全局的cdn请求连接
   */
  getValidkeyCdn() {
    this.$CommonDataService.domainCdn().then((res: Result) => {
      const comIndex = new RegExp('https');
      const webpath = comIndex.test(window.parent.location.href) ?
        'https://' + window.location.host : 'http://' + window.location.host;
      this.$GlobalService.globalJavaResData.cdnValidKey = res.data.validKey === '' ? webpath : res.data.validKey;
      if(!environment.production){
        this.$GlobalService.globalJavaResData.cdnValidKey2 = res.data.validKey2 ? res.data.validKey2 : '/img/'
      }else{
        this.$GlobalService.globalJavaResData.cdnValidKey2 = res.data.validKey2 ? res.data.validKey2 : '';
      }
      sessionStorage.setItem('cdnValidKey2', this.$GlobalService.globalJavaResData.cdnValidKey2);
      sessionStorage.setItem('projectName', this.$GlobalService.globalJavaResData.projectName);
    });
  }

  /**
   *检测刷新页面时当前tab激活的公共方法
   * param list
   * param key
   */
  checkCurrentTab(list, key?) {
    // list :当前页面的循环数组
    // key ：list数组中关于路由的字段key
    const currentUrl = location.hash; // 当前URL
    const urlList = currentUrl.split('/');
    let currentKey = ''; // 数组中关于路由的key值
    let tabIndex = 0; // tabIndex：控制tab激活的变量
    if (key) {
      currentKey = key;
    } else {
      currentKey = 'link';
    }
    list.forEach((item, index) => {
      urlList.forEach((ele) => {
        if (ele === item[currentKey]) {
          tabIndex = index;
        }
      });
    });
    return tabIndex;
  }

  // 获取url中的参数
  getUrlParam(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
    const r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) {
      return unescape(r[2]);
    }
    return null; // 返回参数值
  }

  // 获取一级域名
  getDomains() {
    let host = top.location.hostname;
    if (host) {
      const pa = host.split('.');
      if (pa.length > 2) {
        host = pa[pa.length - 2] + '.' + pa[pa.length - 1];
      }
    }
    return host;
  }

  // 在线客服
  openKufu() {
    let aff2 = this.getUrlParam('aff');
    this.host = this.getDomains();
    if (!aff2 && !sessionStorage.getItem('aff_cookie')) {
      aff2 = (window['affMap'][this.host] ? window['affMap'][this.host] : '');
    }
    this.getUserConfig(aff2, 'GENGERAL', 'PKEFU', 'KFURL');
  }

  // 代理客服
  openDailiKufu() {
    let aff2 = this.getUrlParam('aff');
    this.host = this.getDomains();
    if (!aff2 && !sessionStorage.getItem('aff_cookie')) {
      aff2 = (window['affMap'][this.host] ? window['affMap'][this.host] : '');
    }
    this.getUserConfig(aff2, 'GENGERAL', 'PKEFU', 'SUBAGENT');
  }

  // 或者客服QQ跟客服电话
  getCustomerQQ(keyname) {
    let aff2 = this.getUrlParam('aff');
    this.host = this.getDomains();
    if (!aff2 && !sessionStorage.getItem('aff_cookie')) {
      aff2 = (window['affMap'][this.host] ? window['affMap'][this.host] : '');
    }
    this.$GlobalService.globalQueryModel.userconfig.refercode =
      sessionStorage.getItem('userToken') ? '' : aff2;
    // userToken
    this.$GlobalService.globalQueryModel.userconfig.usertype = 'GENGERAL';
    // keygroup
    this.$GlobalService.globalQueryModel.userconfig.keygroup = 'PKEFU';
    // keyname
    this.$GlobalService.globalQueryModel.userconfig.keyname = keyname;
    this.$CommonDataService.userconfig().then((res: Result) => {
      if (res.success === 0) {
        if (keyname === 'QQ') {
          this.$GlobalService.globalQueryModel.customerQQ = res.data;
        }
        if (keyname === 'MOBILE') {
          this.$GlobalService.globalQueryModel.customerPhone = res.data;
        }
      }
    });
  }

  loadkf() {
    this.aff = this.getUrlParam('aff');
    this.host = this.getDomains();
    if (this.aff === null || this.aff === 'undefined' || this.aff === '') {
      this.aff = sessionStorage.getItem('aff_cookie');
      if (this.aff === null || this.aff === 'undefined' || this.aff === '') {
        this.aff = (window['affMap'][this.host] ? window['affMap'][this.host] : '');
      }
    } else {
      sessionStorage.setItem('loginWeb', this.aff);
    }
  }

  // 获取用户配置表信息
  getUserConfig(refercode, usertype, keygroup, keyname) {
    // refercode
    this.$GlobalService.globalQueryModel.userconfig.refercode =
      sessionStorage.getItem('userToken') ? '' : refercode;
    // userToken
    this.$GlobalService.globalQueryModel.userconfig.usertype = usertype;
    // keygroup
    this.$GlobalService.globalQueryModel.userconfig.keygroup = keygroup;
    // keyname
    this.$GlobalService.globalQueryModel.userconfig.keyname = keyname;
    this.$CommonDataService.userconfig().then((res: Result) => {
      const tempwindow: any = window.open('', '_blank'); // 先打开页面
      if (res.success === 0 && res.data) {
        tempwindow.location = res.data[0].keyvalue; // 后更改页面地址
      } else {
        // tempwindow.location = url + '/fight/user/openKefu.jsp?cid=' + companyId; // 后更改页面地址
        tempwindow.location = this.$CommonProxyService.dlUrl + '/fight/user/openKefu.jsp?cid=' + this.$GlobalService.globalQueryModel.companyId; // 后更改页面地址
      }
    });
  }

  /**
   * 显示阴影弹框
   */
  // showTopCenter(msg?, time?) {
  //   const message = msg || '请先登录后再进行游戏!';
  //   const setTime = time || 1500;
  //   this.$MessageService.add({ key: 'tc', severity: '', summary: ' ', detail: message, life: setTime });
  // }

  /**
   * 判断临界值
   * param item
   * param url 游戏的url
   */
  getOpenUrl(item, type, gameId) {
    this.$GlobalService.globalQueryModel.agamebalance.gameid = gameId;
    if (type === 0) { // 正式账号
      // 后台字段不规范
      let url = null;
      if (item && item.gameUrl) {
        url = item.gameUrl;
      } else if (item && item.loginurl) {
        url = item.loginurl;
      }
      this.$CommonDataService.getGamebalance().then((res: Result) => {
        if (res.success === 0) {
          let gameData = res;
          if (gameData.data.wallettype.companyWallettype === 2) { // 公司为双钱包模式
            if (gameData.data.wallettype.userWallettype === 0) {// 用户为转账模式

              if (gameData.success === 0 && parseInt(gameData.data.balanceData[0].balance, 10) < parseInt(gameData.total, 10)) {
                sessionStorage.setItem('gameUrl', url);
                // 小于临界值跳转到新界面
                window.open(`#/${environment.rootUrl}/newPage/gameTips/${gameId}`, '_blank');
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
              window.open(`#/${environment.rootUrl}/newPage/gameTips/${gameId}`, '_blank');
            } else {//  大于就直接跳转游戏
              window.open(`${this.$CommonDataService.dlUrl}${url}&userToken=${this.$GlobalService.globalQueryModel.userToken}`, '_blank');
            }

          } else { // 公司模式为免转模式
            window.open(`${this.$CommonDataService.dlUrl}${url}&userToken=${this.$GlobalService.globalQueryModel.userToken}`, '_blank');
          }
        }
      });
    } else {
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
   * 是否能跳转三级菜单游戏的判断
   * param item
   */
  goGameResolve(item) {
    // 维护
    if (item.whStatus !== 0) {
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
      this.showTopCenter();
      // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
      this.loginOPenWindow();
      return;
    }
    // 停押状态，0不停押 1停押
    if (this.$GlobalService.globalQueryModel.userToken && item.chargeStatus === 1) {
      this.modal.open({
        message: `该账户未开通${item.name}游戏`,
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    // 试玩
    if (this.$GlobalService.globalQueryModel.swToken && item.swStatus === 1) {
      this.getOpenUrl(item, 1, item.gameId);
      return;
    } else if (this.$GlobalService.globalQueryModel.swToken && item.swStatus !== 1) { // 状态不为1提示登录
      this.showTopCenter();
      // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
      this.loginOPenWindow();
      return;
    }
    // 正式账户跳转
    if (this.$GlobalService.globalQueryModel.userToken) {
      this.getOpenUrl(item, 0, item.gameId);
      return;
    }
  }

  /**
   * 清除下拉框值
   * param dropdown
   */
  clearFilter(dropdown) {
    dropdown.filterValue = '';
  }

  // 全局方法--游戏导航栏列表hover二级页面跳转功能
  imgGamesGo(item, list, number, router, activatedRoute) {
    console.log(item)
    // item == null 报维护
    if (item == undefined) {
      this.modal.open({
        message: '维护',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    // 彩票
    if (list.subname === 'CP GAME') {
      const navList = list.childs;
      // 取单独的配置需要拼接厅主id
      this.$GlobalService.globalQueryModel.IGPC.game = `${item.gameUrl2}${this.$GlobalService.globalQueryModel.companyId}`;
      this.$CommonDataService.IGPC().then((res: Result) => {
        const cpId = item.gameId;
        this.$GlobalService.globalJavaResData.tabIndex = navList.findIndex(l => l.gameId === cpId);
        this.$GlobalService.globalJavaResData.cpList = res.data.list;
        // 取状态
        this.$GlobalService.globalJavaResData.cpwhStatus = item.whStatus;
        this.$GlobalService.globalJavaResData.cpswStatus = item.swStatus;
        this.$GlobalService.globalJavaResData.cpchargeStatus = item.chargeStatus;
        router.navigate(['./lottery'], {relativeTo: activatedRoute});
      });
      return;
    }

    // 棋牌游戏(大唐棋牌)
    if (list.subname === 'POKERGAMES') {
      this.$GlobalService.globalJavaResData.pokerGameIndexId = item.gameId;
      router.navigate(['./pokerGame'], {relativeTo: activatedRoute});
      return;
    }
    // 电子游戏
    if (list.subname === 'DZ GAME') {
      this.$GlobalService.globalJavaResData.gameItemIndexId = item.gameId;
      router.navigate(['./games'], {relativeTo: activatedRoute});
      return;
    }
    // 体育赛事
    if (list.subname === 'TY GAME') {
      this.$GlobalService.globalJavaResData.gameItemTyIndexId = item.gameId;
      router.navigate(['./sports'], {relativeTo: activatedRoute});
      return;
    }
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
      this.showTopCenter();
      // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
      this.loginOPenWindow();
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
      return;
    }
    // 试玩
    if (this.$GlobalService.globalQueryModel.swToken && item.swStatus === 1) {
      this.getOpenUrl(item, 1, item.gameId);
      // window.open(`${this.$CommonDataService.dlUrl}${item.swUrl}&userToken=${this.$GlobalService.globalQueryModel.swToken}`, '_blank');
      return;
    } else if (this.$GlobalService.globalQueryModel.swToken && item.swStatus !== 1) { // 状态不为1提示登录
      this.showTopCenter();
      // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
      this.loginOPenWindow();
      return;
    }
    // 正式账户跳转
    if (this.$GlobalService.globalQueryModel.userToken) {
      this.getOpenUrl(item, 0, item.gameId);
      return;
    }
  }

  /**
   *点击登录按钮，打开登录框
   */
  loginOPenWindow() {
    //图片验证开关状态  仅有太阳城使用
    this.$CommonDataService.verifySwitch().then((res: Result)=>{
      if(res.success === 0){
        this.verifySwitchOn = res.data;
      }
    })
    // 清空值
    this.$GlobalService.globalQueryModel.loginData.loginName = '';
    this.$GlobalService.globalQueryModel.loginData.passWord = '';
    this.$GlobalService.globalQueryModel.loginData.codeKey = '';
    this.$GlobalService.globalQueryModel.loginData.code = '';
    this.$GlobalService.initTipModel();
    if (localStorage.getItem('checkedUserName') === 'true') {
      this.$GlobalService.globalQueryModel.loginData.loginName = localStorage.getItem('loginName');
    } else {
      this.$GlobalService.globalQueryModel.loginData.loginName = '';
    }
    this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
    this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon = false;
    this.syidentifying('login');
    this.$EventBusService.eventBus.next('openLogin')
  }


  /**
   * 获取图片验证码
   */
  syidentifying(type) {
    this.uuid = CommonMethods.getUuid();
    if (type === 'login') {
      this.$GlobalService.globalTipsModelModel.loginisState.yzmUrl = `${this.$CommonDataService.dlUrl}/web/appCode.jsp?codeKey=${this.uuid}&bgColor=42,142,188`;
    } else if (type === 'reg') {
      this.$GlobalService.globalTipsModelModel.regLoginisState.yzmUrl = `${this.$CommonDataService.dlUrl}/web/appCode.jsp?codeKey=${this.uuid}&bgColor=42,142,188`;
    }
  }
  /**
   * 登录发送验证码
   */
  sendLoginCode() {
    this.$CommonDataService.getMobileYzmLogin().then((res: Result) => {
      if(res.success === 1){
        this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginErr = true;
        this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginMsg = res.msg;
        return;
      }
      this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginErr = false;
      this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginMsg = '';

      this.$GlobalService.globalTipsModelModel.loginisState.isLoginLoading = false;
      this.$GlobalService.globalTipsModelModel.loginState.yzmText = `${this.loginCount}s重新发送`;
      this.timer2 = setInterval(() => {
        this.loginCount = this.loginCount - 1;
        this.$GlobalService.globalTipsModelModel.loginState.yzmText = `${this.loginCount}s重新发送`;
        if (this.loginCount === 0) {
          this.$GlobalService.globalTipsModelModel.loginState.yzmText = '发送验证码';
          // if (!this.$GlobalService.globalTipsModelModel.regLoginisState.javaYzm || this.$GlobalService.globalQueryModel.createUser.code) {
          // 有手机号 和手机号正确的时候才能亮
          // if (!this.$GlobalService.globalTipsModelModel.loginState.mobileExpIsState && this.$GlobalService.globalQueryModel.createUser.mobile) {
          //   this.$GlobalService.globalTipsModelModel.loginState.isYzm = true;
          // } else {
          //   this.$GlobalService.globalTipsModelModel.loginState.isYzm = false;
          // }
          // }
          clearInterval(this.timer2);
          this.loginCount = 60;
        }
      }, 1000);
    })
  }
  /**
   * 注册发送验证码
   */
   sendRegisterCode() {
    this.$CommonDataService.getMobileYzmRegister().then((res: Result) => {
      if(res.success === 1){
        this.modal.open({
          message: res.msg,
          confirmShow: true,
          confirmTxt: '确认',
          cancelShow: false,
        });
        // this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginErr = true;
        // this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginMsg = res.msg;
        return;
      }
      // this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginErr = false;
      // this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginMsg = '';

      this.$GlobalService.globalTipsModelModel.loginisState.isLoginLoading = false;
      this.$GlobalService.globalTipsModelModel.loginState.regText = `${this.registerCount}s重新发送`;
      this.timer3 = setInterval(() => {
        this.registerCount = this.registerCount - 1;
        this.$GlobalService.globalTipsModelModel.loginState.regText = `${this.registerCount}s重新发送`;
        if (this.registerCount === 0) {
          this.$GlobalService.globalTipsModelModel.loginState.regText = '发送验证码';
          // if (!this.$GlobalService.globalTipsModelModel.regLoginisState.javaYzm || this.$GlobalService.globalQueryModel.createUser.code) {
          // 有手机号 和手机号正确的时候才能亮
          // if (!this.$GlobalService.globalTipsModelModel.loginState.mobileExpIsState && this.$GlobalService.globalQueryModel.createUser.mobile) {
          //   this.$GlobalService.globalTipsModelModel.loginState.isYzm = true;
          // } else {
          //   this.$GlobalService.globalTipsModelModel.loginState.isYzm = false;
          // }
          // }
          clearInterval(this.timer3);
          this.registerCount = 60;
        }
      }, 1000);
    })
  }
  /**
   * 验证码登录
   */
  mobileLogin() {
    if (!this.$GlobalService.globalQueryModel.mobileLogin.mobile && !this.$GlobalService.globalQueryModel.mobileLogin.vcode) {
      return;
    }
    this.$GlobalService.globalTipsModelModel.loginisState.isLoginLoading = true;
    this.$CommonDataService.loginWithMobile().then((res: Result) => {
      this.modal.close()
      this.$GlobalService.globalTipsModelModel.loginisState.isLoginLoading = false;
      if (res.success === 1) {
        this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginErr = true;
        this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginMsg = res.msg;
        this.modal.open({
          message: res.msg,
          confirmShow: true,
          confirmTxt: '确认',
          cancelShow: false,
        });
        return;
      }
      this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginErr = false;
      this.$GlobalService.globalTipsModelModel.loginisState.phoneLoginMsg = '';
      // 先清除试玩的信息
      sessionStorage.setItem('loginWeb', '');
      sessionStorage.setItem('swToken', '');
      this.$GlobalService.globalQueryModel.swToken = '';
      this.$GlobalService.globalTipsModelModel.loginisState.userNameLogin = '';
      this.$GlobalService.globalTipsModelModel.loginisState.sessionStorageName = '';
      this.$GlobalService.globalJavaResData.isShowloginHeader = false;
      sessionStorage.setItem('loginName', '');
      sessionStorage.setItem('usernamelogin', '');

      const data = res;
      // 显示头部
      this.$GlobalService.globalJavaResData.isShowloginHeader = true;
      // 影藏登录框
      this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = false;
      // 注册框
      this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon = false;
      // 用户名
      this.$GlobalService.globalTipsModelModel.loginisState.userNameLogin = data.data.loginName;
      this.$GlobalService.globalTipsModelModel.loginisState.sessionStorageName = data.data.loginName;
      sessionStorage.setItem('loginName', data.data.loginName);
      sessionStorage.setItem('usernamelogin', data.data.loginName);
      // 登录状态
      sessionStorage.setItem('userToken', data.data.userToken);
      // 签到
      sessionStorage.setItem('signSwitch', data.data.signSwitch);
      // 判断首页是否弹出签到悬浮窗
      if (data.data.signSwitch === 1) {
        this.$GlobalService.globalJavaResData.isSignShow = true;
      } else {
        this.$GlobalService.globalJavaResData.isSignShow = false;
      }
      // 登录时间
      sessionStorage.setItem('loginTime', data.data.loginTime);
      // 全民推广模式（mode=0表示关闭全民推广，mode=1表示打开全民推广无限模式，mode=2表示打开全民推广提成模式）
      sessionStorage.setItem('spreadMode', data.data.mode);
      // 输赢佣金开关（winningSwitch=0表示关闭佣金开关，winningSwitch=1表示打开佣金开关-含彩票，winningSwitch=2表示打开佣金开关-不含彩票）
      sessionStorage.setItem('winningSwitch', data.data.winningSwitch);
      // 统计报表开关（dataReportSwitch=0表示关闭统计报表，dataReportSwitch=1表示开启统计报表）,详见任务单3098
      sessionStorage.setItem('dataReportSwitch', data.data.dataReportSwitch);
      // 重新获取导航的数据，游戏停压状态
      this.getGameNavList();
      // 是否勾选记住账号
      if (localStorage.getItem('checkedPhoneNumber') === 'true') {
        localStorage.setItem('phoneNumber', this.$GlobalService.globalQueryModel.mobileLogin.mobile);
      } else {
        localStorage.setItem('phoneNumber', '');
      }
      // 初始化一下数据
      this.$GlobalService.initGlobalData();
      this.$Router.navigate(['']);
      // 公告弹窗
      this.$GlobalService.globalTipsModelModel.openLoginMsg = true;
      this.getCustomerQQ('QQ');
      this.getCustomerQQ('MOBILE');
      // 总金额
      this.myAllbalancelist();
      // 登录连接websocket
      // this.disconnect();
      // this.connect(data.data.userToken, this.$GlobalService.globalQueryModel.companyId);
      /* 获取领彩金开关
          登录成功后，获取该用户是否可以领取彩金，
          会员中心是否显示领取彩金入口
          目前只有电竞有此需求
      */
      if (this.$GlobalService.globalQueryModel.companyId === '37699' || this.$GlobalService.globalQueryModel.companyId === '37529' || this.$GlobalService.globalQueryModel.companyId === '1227207') {
        this.getCaijinVerifySetting();
      }

      //登录成功，广播事件
      this.$EventBusService.eventBus.next('loginin')
    })
  }
  /**
   * 登录方法
   * param type
   */
  okLogins(isFastRegister) {
    if (!this.$GlobalService.globalQueryModel.loginData.loginName || !this.$GlobalService.globalQueryModel.loginData.passWord || (!this.$GlobalService.globalQueryModel.loginData.code &&
        this.$GlobalService.globalTipsModelModel.loginisState.javaYzm && !this.verifySwitchOn)) {
      return;
    }
    if(this.$GlobalService.globalTipsModelModel.loginisState.realNameLastName.length > 0 && this.$GlobalService.globalTipsModelModel.loginisState.realName.length > 0){
      this.$GlobalService.globalQueryModel.loginData['realName'] = this.$GlobalService.globalTipsModelModel.loginisState.realNameLastName + this.$GlobalService.globalTipsModelModel.loginisState.realName
    }
    // if(this.$GlobalService.globalQueryModel.loginData.passWord.length < 8 || this.$GlobalService.globalQueryModel.loginData.passWord > 16){
    //   this.$GlobalService.globalTipsModelModel.loginisState.passwordLoginErr = true;
    //   this.$GlobalService.globalTipsModelModel.loginisState.loginMsg = '密码8-16位';
    //   return
    // }
    this.$GlobalService.globalTipsModelModel.loginisState.isLoginLoading = true;
    this.$GlobalService.globalQueryModel.loginData.codeKey = this.uuid;
    this.$CommonDataService.loginWeb().then((res: Result) => {
      this.modal.close()
      this.$GlobalService.globalTipsModelModel.loginisState.isLoginLoading = false;
      if (res.success === 1) {
        //联系在线客服
        if(this.$GlobalService.globalTipsModelModel.loginisState.realNameVerify == true){
          if(this.$GlobalService.globalTipsModelModel.loginisState.realNameVerifyTimes > 0){
            this.$GlobalService.globalTipsModelModel.loginisState.realNameVerifyTimes--
            this.$GlobalService.globalTipsModelModel.loginisState.realNameErr = true;
          }
          if(this.$GlobalService.globalTipsModelModel.loginisState.realNameVerifyTimes == 0){
            this.$GlobalService.globalTipsModelModel.loginisState.onlineServiceModel = true;
            if(this.$GlobalService.globalQueryModel.loginData.hasOwnProperty('realName')){
              delete this.$GlobalService.globalQueryModel.loginData['realName']
            }
            this.$GlobalService.globalTipsModelModel.loginisState.realNameLastName = '';
            this.$GlobalService.globalTipsModelModel.loginisState.realName = '';
            this.$GlobalService.globalTipsModelModel.loginisState.realNameVerify = false;
            this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = false;
          }
          return
        }
        // 获取后台错误信息
        this.$GlobalService.globalTipsModelModel.loginisState.passwordLoginErr = true;
        this.$GlobalService.globalTipsModelModel.loginisState.loginMsg = res.msg;
        // 显示后台验证码
        // this.$GlobalService.globalTipsModelModel.loginisState.javaYzm = true;
        // 密码错误一次出验证码
        // this.syidentifying('login');
        return;
      }
      //密码格式不对
      if(res.success == '0000016'){
        // 获取后台错误信息
        this.$GlobalService.globalTipsModelModel.loginisState.passwordLoginErr = true;
        this.$GlobalService.globalTipsModelModel.loginisState.loginMsg = res.msg;
        // 显示后台验证码
        // this.$GlobalService.globalTipsModelModel.loginisState.javaYzm = true;
        // 密码错误一次出验证码
        // this.syidentifying('login');
        return
      }
      //转站会员第一次登录，并且有真实姓名
      if(res.success == 4 && res.msg.length >= 1){
        this.$GlobalService.globalTipsModelModel.loginisState.realNameLastName = res.msg;
        this.$GlobalService.globalTipsModelModel.loginisState.realNameVerify = true;
        return
      }
      //重置真实姓名校验
      if(this.$GlobalService.globalQueryModel.loginData.hasOwnProperty('realName')){
        delete this.$GlobalService.globalQueryModel.loginData['realName']
      }
      this.$GlobalService.globalTipsModelModel.loginisState.realNameVerify = false;
      this.$GlobalService.globalTipsModelModel.loginisState.realNameVerifyTimes = 3
      this.$GlobalService.globalTipsModelModel.loginisState.realNameErr = false;
      this.$GlobalService.globalTipsModelModel.loginisState.realNameLastName = ''
      this.$GlobalService.globalTipsModelModel.loginisState.realName = ''
      // 先清除试玩的信息
      sessionStorage.setItem('loginWeb', '');
      sessionStorage.setItem('swToken', '');
      this.$GlobalService.globalQueryModel.swToken = '';
      this.$GlobalService.globalTipsModelModel.loginisState.userNameLogin = '';
      this.$GlobalService.globalTipsModelModel.loginisState.sessionStorageName = '';
      this.$GlobalService.globalJavaResData.isShowloginHeader = false;
      sessionStorage.setItem('loginName', '');
      sessionStorage.setItem('usernamelogin', '');

      const data = res;
      // 显示头部
      this.$GlobalService.globalJavaResData.isShowloginHeader = true;
      // 影藏登录框
      this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = false;
      // 注册框
      this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon = false;
      // 用户名
      this.$GlobalService.globalTipsModelModel.loginisState.userNameLogin = this.$GlobalService.globalQueryModel.loginData.loginName;
      this.$GlobalService.globalTipsModelModel.loginisState.sessionStorageName = this.$GlobalService.globalQueryModel.loginData.loginName;
      sessionStorage.setItem('loginName', this.$GlobalService.globalTipsModelModel.loginisState.userNameLogin);
      sessionStorage.setItem('usernamelogin', data.data.loginName);
      // 登录状态
      sessionStorage.setItem('userToken', data.data.userToken);
      // 签到
      sessionStorage.setItem('signSwitch', data.data.signSwitch);
      // 判断首页是否弹出签到悬浮窗
      if (data.data.signSwitch === 1) {
        this.$GlobalService.globalJavaResData.isSignShow = true;
      } else {
        this.$GlobalService.globalJavaResData.isSignShow = false;
      }
      // 登录时间
      sessionStorage.setItem('loginTime', data.data.loginTime);
      // 全民推广模式（mode=0表示关闭全民推广，mode=1表示打开全民推广无限模式，mode=2表示打开全民推广提成模式）
      sessionStorage.setItem('spreadMode', data.data.mode);
      // 输赢佣金开关（winningSwitch=0表示关闭佣金开关，winningSwitch=1表示打开佣金开关-含彩票，winningSwitch=2表示打开佣金开关-不含彩票）
      sessionStorage.setItem('winningSwitch', data.data.winningSwitch);
      // 统计报表开关（dataReportSwitch=0表示关闭统计报表，dataReportSwitch=1表示开启统计报表）,详见任务单3098
      sessionStorage.setItem('dataReportSwitch', data.data.dataReportSwitch);
      // 重新获取导航的数据，游戏停压状态
      this.getGameNavList();
      // 是否勾选记住账号
      if (localStorage.getItem('checkedUserName') === 'true') {
        localStorage.setItem('loginName', this.$GlobalService.globalTipsModelModel.loginisState.userNameLogin);
      } else {
        localStorage.setItem('loginName', '');
      }

      // 初始化一下数据
      this.$GlobalService.initGlobalData();
      this.$Router.navigate(['']);

      this.getCustomerQQ('QQ');
      this.getCustomerQQ('MOBILE');
      // 总金额
      this.myAllbalancelist();
      // 登录连接websocket
      // this.disconnect();
      // this.connect(data.data.userToken, this.$GlobalService.globalQueryModel.companyId);
      /* 获取领彩金开关
          登录成功后，获取该用户是否可以领取彩金，
          会员中心是否显示领取彩金入口
          目前只有电竞有此需求
      */
      if (this.$GlobalService.globalQueryModel.companyId === '37699' || this.$GlobalService.globalQueryModel.companyId === '37529' || this.$GlobalService.globalQueryModel.companyId === '1227207') {
        this.getCaijinVerifySetting();
      }

      //快速注册成功后弹出注册成功弹窗
      if(isFastRegister){
        this.$GlobalService.globalTipsModelModel.loginisState.registerSuccess = true
      }else{
        // 公告弹窗
        this.$GlobalService.globalTipsModelModel.openLoginMsg = true;
      }
      //登录成功，广播事件
      this.$EventBusService.eventBus.next('login')
    });
  }

  /**
   * 试玩
   */
  swloginData() {
    this.$CommonDataService.SWLogin().then((res: Result) => {
      const data = res.data;
      sessionStorage.setItem('loginWeb', data.username);
      sessionStorage.setItem('swToken', data.userToken);
      this.$GlobalService.globalQueryModel.swToken = data.userToken;
      this.$GlobalService.globalTipsModelModel.loginisState.userNameLogin = data.username;
      this.$GlobalService.globalTipsModelModel.loginisState.sessionStorageName = data.username;
      this.$GlobalService.globalJavaResData.isShowloginHeader = true;
      sessionStorage.setItem('loginName', data.username);
      sessionStorage.setItem('usernamelogin', data.username);
      this.$Router.navigate(['']);
      // 公告弹窗
      this.$GlobalService.globalTipsModelModel.openLoginMsg = true;
      // 试玩登录连接websocket
      // this.disconnect();
      // this.connect(data.userToken, this.$GlobalService.globalQueryModel.companyId);

    });
  }

  /**
   * 退出登录
   */
  signOut() {
    this.$CommonDataService.loginoutuser().then((res: Result) => {
      this.$GlobalService.globalJavaResData.isShowloginHeader = false;
      const comId = sessionStorage.getItem('companyId');
      const projectName = sessionStorage.getItem('projectName');
      const cdnValidKey2 = sessionStorage.getItem('cdnValidKey2');
      sessionStorage.clear();
      this.$GlobalService.initGlobalData();
      this.$GlobalService.initTipModel();
      sessionStorage.setItem('companyId', comId);
      sessionStorage.setItem('projectName', projectName);
      sessionStorage.setItem('cdnValidKey2', cdnValidKey2);
      this.$Router.navigate([''], {relativeTo: this.$ActivatedRoute});
      this.$GlobalService.globalTipsModelModel.isOpenBigMsg = true;
      // 退出登录，签到悬浮窗消失
      this.$GlobalService.globalJavaResData.isSignShow = false;
      // 退出登录断开websocket
      // this.disconnect();
      // this.connect(this.randomString(32), this.$GlobalService.globalQueryModel.companyId);
      //登录成功，广播事件
      this.$EventBusService.eventBus.next('logout')
      this.getCustomerQQ('QQ')
    });
  }

  /**
   * 短信验证码开关 和手机号必填开关
   */
  getYzmIsok() {
    this.$CommonDataService.mobileYzmIsOk().then((res: Result) => {
      if (res.success === '0000011') { // 显示验证码
        this.$GlobalService.globalTipsModelModel.regLoginisState.isYzmShow = true;
        // this.$GlobalService.globalTipsModelModel.regLoginisState.isMobilePhone = true;
      } else {
        this.$GlobalService.globalTipsModelModel.regLoginisState.isYzmShow = false;
        // this.$GlobalService.globalTipsModelModel.regLoginisState.isMobilePhone = false;
      }
    });
  }

  /**
   *点击注册按钮，打开注册框
   */
  regOPenWindow() {
    this.$CommonDataService.verifySwitch().then((res: Result) => {
      if (res.success === 0) {
        this.verifySwitchOn = res.data;
      }
    })
    this.$GlobalService.globalQueryModel.createUser.loginName = '';
    this.$GlobalService.globalQueryModel.createUser.passWord = '';
    this.$GlobalService.globalQueryModel.createUser.mobile = '';
    this.$GlobalService.globalQueryModel.createUser.referCode = '';
    this.$GlobalService.globalQueryModel.createUser.pcode = '';
    this.$GlobalService.globalQueryModel.createUser.ensurePassword = '';
    this.$GlobalService.globalQueryModel.createUser.code = '';
    this.$GlobalService.globalQueryModel.createUser.codeKey = '';
    this.$GlobalService.globalQueryModel.createUser.email = '';
    this.$GlobalService.globalQueryModel.createUser.qq = '';
    this.$GlobalService.globalQueryModel.createUser.qRcode = '';
    this.$GlobalService.globalQueryModel.createUser.realName = '';
    this.$GlobalService.globalQueryModel.createUser.smsCode = '';
    this.$GlobalService.initTipModel();
    // 获取介绍号和推广码
    this.getAffPcode();
    this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon = true;
    this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = false;
    // 验证码开关
    this.getYzmIsok();
    // 显示图片验证码
    this.syidentifying('reg');
    this.$EventBusService.eventBus.next('openLogin')
  }


  /**
   *注册验证
   */
  rustFormatReg(type, data) {
    // 账号
    if (type === 'userName') {
      const maxLength = 13;
      const minLength = 6;
      const userName = data;
      if (userName.length !== 0 && (userName.length < minLength || userName.length > maxLength + 1)) {
        this.$GlobalService.globalTipsModelModel.regLoginisState.userNameExpIsState = true;
        this.$GlobalService.globalTipsModelModel.regLoginisState.userNameExpMsg = '用户名为6~13位字母和数字组成';
        // 是否可以点击注册
        this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = false;
      } else {
        // 正则效验
        const str = 'usernamesStrAndNum';
        const re = new RegExp(RegularExp[str]);
        if (!re.test(userName)) {
          this.$GlobalService.globalTipsModelModel.regLoginisState.userNameExpIsState = true;
          this.$GlobalService.globalTipsModelModel.regLoginisState.userNameExpMsg = '用户名为6~13位字母和数字组成';
          // 是否可以点击注册
          this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = false;
          return;
        } else {
          // 验证用户名是否占用
          this.$GlobalService.globalQueryModel.userNumCheck.loginName = this.$GlobalService.globalQueryModel.createUser.loginName;
          this.$CommonDataService.userNumCheck().then((res: Result) => {
            if (res.success === 1) {
              this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginErr = true;
              this.$GlobalService.globalTipsModelModel.regLoginisState.loginMsg = res.msg;
              // 是否可以点击注册
              this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = false;
            } else {
              this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginErr = false;
              this.$GlobalService.globalTipsModelModel.regLoginisState.loginMsg = '';
            }
            return;
          });
        }
        // 恢复初始值
        this.$GlobalService.globalTipsModelModel.regLoginisState.userNameExpIsState = false;
        this.$GlobalService.globalTipsModelModel.regLoginisState.userNameExpMsg = '';
        // 是否能点击注册按钮
        this.isOkSubmit();
      }
    }

    // 手机号验证
    if (this.$GlobalService.globalQueryModel.companyId === '40051') { // 星汇世博手机号单独处理
      // 不需要效验手机号格式
      this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpIsState = false;
      this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpMsg = '';
      this.isOkSubmit();
      if (this.$GlobalService.globalQueryModel.createUser.mobile) {
        if (this.$GlobalService.globalTipsModelModel.regLoginisState.yzmText === '发送验证码') {
          this.$GlobalService.globalTipsModelModel.regLoginisState.isYzm = true;
        } else {
          this.$GlobalService.globalTipsModelModel.regLoginisState.isYzm = false;
        }
        return;
      }
    } else { // 其他包网正常走这里
      if (type === 'mobile') {
        const maxLength = 11;
        const minLength = 11;
        const mobile = data;
        if (mobile.length !== 0 && (mobile.length < minLength || mobile.length > maxLength + 1)) {
          this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpIsState = true;
          this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpMsg = '请输入正确的手机号码格式';
          this.isOkSubmit();
        } else {
          // 正则效验
          const str = 'mobileExp';
          const re = new RegExp(RegularExp[str]);
          if (!re.test(mobile)) {
            this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpIsState = true;
            this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpMsg = '请输入正确的手机号码格式';
            this.isOkSubmit();
            return;
          } else {
            this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpIsState = false;
            this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpMsg = '';
            this.isOkSubmit();
            if (this.$GlobalService.globalQueryModel.createUser.mobile) {
              if (this.$GlobalService.globalTipsModelModel.regLoginisState.yzmText === '发送验证码') {
                this.$GlobalService.globalTipsModelModel.regLoginisState.isYzm = true;
              } else {
                this.$GlobalService.globalTipsModelModel.regLoginisState.isYzm = false;
              }
              return;
            }
          }
        }
      }

    }
  }

  /**
   *密码效验
   * param e
   */
  passwordChangeInput(type, data) {
    // 密码
    if (type === 'password') {
      const maxLength = 12;
      const minLength = 8;
      const password = data;
      if (password.length !== 0 && (password.length < minLength || password.length > maxLength + 1)) {
        this.$GlobalService.globalTipsModelModel.regLoginisState.passWordExpIsState = true;
        this.$GlobalService.globalTipsModelModel.regLoginisState.isPasswordQd = false;
        this.$GlobalService.globalTipsModelModel.regLoginisState.passWordExpMsg = '密码为8~12位字母和数字组合';
        // 是否可以点击注册
        this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = false;
      } else {
        if (this.$GlobalService.globalQueryModel.createUser.loginName === this.$GlobalService.globalQueryModel.createUser.passWord) {
          this.$GlobalService.globalTipsModelModel.regLoginisState.passWordExpIsState = true;
          this.$GlobalService.globalTipsModelModel.regLoginisState.isPasswordQd = false;
          this.$GlobalService.globalTipsModelModel.regLoginisState.passWordExpMsg = '密码和用户名不能相同';
          // 是否可以点击注册
          this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = false;
          return;
        }
        // 字母和数字组成正则效验
        const re = new RegExp(RegularExp['passwordstartNum']);
        if (!re.test(password)) {
          this.$GlobalService.globalTipsModelModel.regLoginisState.passWordExpIsState = true;
          this.$GlobalService.globalTipsModelModel.regLoginisState.isPasswordQd = false;
          this.$GlobalService.globalTipsModelModel.regLoginisState.passWordExpMsg = '密码为8~12位字母和数字组合';
          // 是否可以点击注册
          this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = false;
          return;
        }
        // 验证密码强度
        const re1 = new RegExp(RegularExp.passwordQd1);
        const re2 = new RegExp(RegularExp.passwordQd2);
        if (re1.test(password)) { // 强
          this.$GlobalService.globalTipsModelModel.regLoginisState.passwordQdStyle = 2;
        } else if (re2.test(password)) { // 中
          this.$GlobalService.globalTipsModelModel.regLoginisState.passwordQdStyle = 3;
        } else {  // 低
          this.$GlobalService.globalTipsModelModel.regLoginisState.passwordQdStyle = 4;
        }
        // 密码强度是否显示
        this.$GlobalService.globalTipsModelModel.regLoginisState.isPasswordQd = true;
        this.$GlobalService.globalTipsModelModel.regLoginisState.passWordExpIsState = false;
        this.$GlobalService.globalTipsModelModel.regLoginisState.passWordExpMsg = '';
        this.isOkSubmit();
      }
    }
  }

  /**
   * 判断是否可以点击注册按钮
   */
  isOkSubmit() {
    // 是否能点击注册按钮
    if ((!this.$GlobalService.globalTipsModelModel.regLoginisState.userNameExpIsState && this.$GlobalService.globalQueryModel.createUser.loginName)
      && (!this.$GlobalService.globalTipsModelModel.regLoginisState.passWordExpIsState && this.$GlobalService.globalQueryModel.createUser.passWord)) {
      if (!this.$GlobalService.globalTipsModelModel.regLoginisState.isMobilePhone) {
        // 手机号不必填
        this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = true;
      } else {
        // 手机号必填
        if ((!this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpIsState && this.$GlobalService.globalQueryModel.createUser.mobile)) {
          this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = true;
        } else {
          this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = false;
        }
      }
    } else {
      this.$GlobalService.globalTipsModelModel.regLoginisState.isSubmit = false;
    }
  }

  /**
   * 点击发送手机验证码 且出图片验证码
   */
  getMobileNum(data) {
    this.$GlobalService.globalQueryModel.mobileYzm.mobile = data;
    this.$GlobalService.globalTipsModelModel.regLoginisState.isYzm = false;
    clearInterval(this.timer1);
    this.$GlobalService.globalQueryModel.mobileYzm.code = this.$GlobalService.globalQueryModel.createUser.code;
    this.$GlobalService.globalQueryModel.mobileYzm.codeKey = this.uuid;
    this.$CommonDataService.getMobileYzm().then((res: Result) => {
      // if (res.success === '01_10001') { // 出图片验证码
      //   this.$GlobalService.globalTipsModelModel.regLoginisState.javaYzm = true;
      //   this.syidentifying('reg');
      // }
      if (res.success === 1) { // 图片验证码错误
        this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginErr = true;
        this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginSuccess = false;
        this.$GlobalService.globalTipsModelModel.regLoginisState.loginMsg = res.msg;
      } else {
        this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginSuccess = true;
        this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginErr = false;
        this.$GlobalService.globalTipsModelModel.regLoginisState.loginMsg = '短信发送成功，请查看';
      }
      this.$GlobalService.globalTipsModelModel.regLoginisState.yzmText = `${this.moNum}s重新发送`;
      this.timer1 = setInterval(() => {
        this.moNum = this.moNum - 1;
        this.$GlobalService.globalTipsModelModel.regLoginisState.yzmText = `${this.moNum}s重新发送`;
        if (this.moNum === 0) {
          this.$GlobalService.globalTipsModelModel.regLoginisState.yzmText = '发送验证码';
          // if (!this.$GlobalService.globalTipsModelModel.regLoginisState.javaYzm || this.$GlobalService.globalQueryModel.createUser.code) {
          // 有手机号 和手机号正确的时候才能亮
          if (!this.$GlobalService.globalTipsModelModel.regLoginisState.mobileExpIsState && this.$GlobalService.globalQueryModel.createUser.mobile) {
            this.$GlobalService.globalTipsModelModel.regLoginisState.isYzm = true;
          } else {
            this.$GlobalService.globalTipsModelModel.regLoginisState.isYzm = false;
          }
          // }
          clearInterval(this.timer1);
          this.moNum = 60;
        }
      }, 1000);
    });
  }

  /**
   *推广号和介绍号
   */
  getAffPcode() {
    const originAffCode = this.getUrlParam('aff');
    const orignPcode = this.getUrlParam('pcode');

    this.$GlobalService.globalQueryModel.createUser.referCode = sessionStorage.getItem('loginWeb');
    if (orignPcode) {
      // 推广号
      this.$GlobalService.globalQueryModel.createUser.pcode = orignPcode.length > 9 ? orignPcode.slice(0, 9) : orignPcode;
    }
    if (originAffCode) {
      // 介绍号
      this.$GlobalService.globalQueryModel.createUser.referCode = originAffCode.length > 9 ? originAffCode.slice(0, 9) : originAffCode;
    } else {
      const host = this.getDomains();
      if (!this.$GlobalService.globalQueryModel.createUser.referCode) {
        this.$GlobalService.globalQueryModel.createUser.referCode = (window['affMap'][host] ? window['affMap'][host] : '');
        this.getSubAgentReferCode();
      }
      sessionStorage.setItem('loginWeb', this.$GlobalService.globalQueryModel.createUser.referCode);
    }
  }

  /**
   *注册
   */
  registeredLogin() {
    // 开启了短信验证码后短信验证码必填
    if (this.$GlobalService.globalTipsModelModel.regLoginisState.isYzmShow && !this.$GlobalService.globalQueryModel.createUser.smsCode) {
      this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginErr = true;
      this.$GlobalService.globalTipsModelModel.regLoginisState.loginMsg = '请填写短信验证码';
      return;
    }
    // 图片验证码 励扬和星汇没有图片验证码
    if (this.$GlobalService.globalQueryModel.companyId !== '24' && this.$GlobalService.globalQueryModel.companyId !== '9426' && this.$GlobalService.globalQueryModel.companyId !== '40051') {
      if (!this.verifySwitchOn && !this.$GlobalService.globalTipsModelModel.regLoginisState.javaYzm && !this.$GlobalService.globalQueryModel.createUser.code) {
        this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginErr = true;
        this.$GlobalService.globalTipsModelModel.regLoginisState.loginMsg = '请填写验证码';
        return;
      }
    }

    this.$GlobalService.globalQueryModel.createUser.codeKey = this.uuid;
    // 新加确认密码
    this.$GlobalService.globalQueryModel.createUser.ensurePassword = this.$GlobalService.globalQueryModel.createUser.passWord;

    this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginLoading = true;
    this.$CommonDataService.getCreateUser().then((res: Result) => {
      this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginLoading = false;
      if (res.success === 1) {
        // 获取后台错误信息
        this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginErr = true;
        this.$GlobalService.globalTipsModelModel.regLoginisState.loginMsg = res.msg;
        // 暂时从新刷图片验证码---
        this.syidentifying('reg');
        return;
      }
      // 隐藏注册框
      this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon = false;
      // 注册成功直接登录
      this.$GlobalService.globalQueryModel.loginData.loginName = this.$GlobalService.globalQueryModel.createUser.loginName;
      this.$GlobalService.globalQueryModel.loginData.passWord = this.$GlobalService.globalQueryModel.createUser.passWord;
      this.$GlobalService.globalTipsModelModel.loginisState.userNameLogin = this.$GlobalService.globalQueryModel.createUser.loginName;
      this.$GlobalService.globalTipsModelModel.loginisState.sessionStorageName = this.$GlobalService.globalQueryModel.createUser.loginName;
      this.$GlobalService.globalQueryModel.loginData.sectoken = res.data.sectoken;
      // 调登录的方法
      this.okLogins(false);
    });
  }
  /**
   *
   * @param msg 短信注册
   * @param time
   * @param type
   */
  fastRegister() {
    this.$GlobalService.globalTipsModelModel.regLoginisState.isRegSubmitLoading = true;
    this.$GlobalService.globalQueryModel.fastCreateUser.referCode = this.$GlobalService.globalQueryModel.createUser.referCode;

    this.$CommonDataService.fastCreateUser().then((res: Result) => {
      this.$GlobalService.globalTipsModelModel.regLoginisState.isRegSubmitLoading = false;
      if (res.success === 1) {
        // 获取后台错误信息
        this.$GlobalService.globalTipsModelModel.regLoginisState.passwordLoginErr = true;
        this.$GlobalService.globalTipsModelModel.regLoginisState.loginMsg = res.msg;
        this.modal.open({
          message: res.msg,
          confirmShow: true,
          confirmTxt: '确认',
          cancelShow: false,
        });
        return;
      }
      // 隐藏注册框
      this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon = false;
      this.modal.open({
        message: res.msg + '， 自动登录中...',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      //注册成功，直接登录
      setTimeout( () => {
        // 注册成功直接登录
        delete this.$GlobalService.globalQueryModel.loginData.code
        this.$GlobalService.globalQueryModel.loginData.loginName = this.$GlobalService.globalQueryModel.fastCreateUser.mobile;
        this.$GlobalService.globalQueryModel.loginData.passWord = res.Password;

        this.$GlobalService.globalTipsModelModel.regSuccAccount.account = this.$GlobalService.globalQueryModel.fastCreateUser.mobile
        this.$GlobalService.globalTipsModelModel.regSuccAccount.password = res.Password

        this.$GlobalService.globalTipsModelModel.loginisState.userNameLogin = this.$GlobalService.globalQueryModel.fastCreateUser.mobile;
        this.$GlobalService.globalTipsModelModel.loginisState.sessionStorageName = this.$GlobalService.globalQueryModel.fastCreateUser.mobile;
        this.$GlobalService.globalQueryModel.loginData.sectoken = res.sectoken;
        // 调登录的方法
        this.okLogins(true);
      }, 1000)
    });
  }

  // showTopCenter(msg?, time?, type?) {
  //   const message = msg || '请先登录后再进行游戏!';
  //   const setTime = time || 1500;
  //   this.$MessageService.add({ key: 'tc', severity: '', summary: ' ', detail: message, life: setTime });
  // }
  showTopCenter(msg?, time?, type?) {
    // 拦截，如果已经有弹框，不可以再次弹出来
    const ele1 = document.getElementById('showMessage');
    if (ele1) {
      return;
    }
    const flag = document.createElement('div');
    flag.setAttribute('id', 'showMessage');
    // 需要传递的参数
    const message = msg || '请先登录后再进行游戏!';
    const setTime = time || 1500;
    const finanleType = type || '';
    // const finalConfig = Object.assign({}, defaultConfig, config);
    flag.innerText = message;
    document.body.appendChild(flag);
    const ele = document.getElementById('showMessage');
    ele.className += ' showMessage';
    ele.className += '  showMessage_fadeOut';
    if (finanleType === 'success') {
      ele.className += ' showMessage_success';
    } else if (finanleType === 'warning') {
      ele.className += ' showMessage_warning';
    } else if (finanleType === 'error') {
      ele.className += ' showMessage_error';
    } else {

    }
    setTimeout(function () {
      const ele2 = document.getElementById('showMessage');
      document.body.removeChild(ele2);
    }, setTime);
  }

  /**
   *改变路由后面的参数
   * param index
   */
  setRouterNumber(index) {
    const urlTree = this.$Router.parseUrl(this.$Router.url);
    const arr = urlTree.root.children['primary'].segments;
    arr[arr.length - 1].path = `${index}`;
    this.$Router.navigateByUrl(urlTree);
  }

  // 从接口获取介绍号
  getSubAgentReferCode() {
    let url;
    if (location.host.includes('www')) {
      url = location.host.split('.').splice(1).join('.');
    } else {
      url = location.host;
    }
    this.$GlobalService.globalQueryModel.getSubAgentReferCode.url = url;
    this.$CommonDataService.getSubAgentReferCode().then((res: Result) => {
      if (res.success === 0) {
        const UrlParamCode = res.data.referCode;
        this.$GlobalService.globalQueryModel.createUser.referCode = UrlParamCode;
        if (this.$GlobalService.globalQueryModel.createUser.referCode) {
          this.$GlobalService.globalQueryModel.createUser.isreferCode = true;
        }
      }

    });
  }

  //  获取免费领彩金接口开关
  getCaijinVerifySetting() {
    this.$CommonDataService.getCaijinVerifySetting().then((res: Result) => {
      // console.log(res);
      if (res.success === 0) {
        sessionStorage.setItem('caijinData', JSON.stringify(res.data));
        // 由于后台输出字段不规范，有时vcode='2',有时vcode=2,特做以下处理
        if (res.data) {
          this.$GlobalService.globalJavaResData.caijinData = res.data;
          this.$GlobalService.globalJavaResData.caijinData.vcode = parseFloat(res.data.vcode);
        }
      }

    });
  }
}
