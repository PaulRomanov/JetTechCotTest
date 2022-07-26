import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import { Result } from '../../../../core-module/common-util/result';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'yx-pc-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  transferAll;
  isAccounta;
  isShowIndex = '0';
  isShowIndex1 = '0';
  sessionStorageName;
  refroneKeyTransfer;
  data;
  modal = window['modal'];
  demoIndex = [
    {
      title: '会员中心', list: [
        { name: '存款', icon: 'iconjinbi', link: 'deposit', index: '0', position: '-1px 1px' },
        { name: '取款', icon: 'iconzaixianchongzhi', link: 'withdrawMoney', index: '1', position: '-16px 1px' },
        { name: '金额转换', icon: 'iconzhuanhuan', link: 'transFormAtion', index: '2', position: '-35px 1px' },
        { name: '出款管理', icon: 'iconyinhangqia', link: 'bankCard/commonBank', index: '3', position: '-53px 1px' },
        { name: '安全中心', icon: 'iconanquan', link: 'security/personalInformation', index: '4', position: '-71px 1px' },
        { name: 'VIP中心', icon: 'vip_icon', link: 'vipCenter', index: '5', position: '-257px 1px' },
        { name: '实时返水', icon: 'iconanquan', link: 'realtimeRebate', index: '6', position: '-217px 1px' }
      ]
    },
    {
      title: '历史记录', list: [
        { name: '账户历史', icon: 'iconlishi', link: 'accountHistory', index: '7', position: '-87px 1px' },
        { name: '投注合计', icon: 'iconqian2', link: 'bettingTotal', index: '8', position: '-106px 1px' },
        { name: '即时稽核', icon: 'iconaccount-audit', link: 'audit', index: '9', position: '-124px 1px' },
        { name: '红包领取记录', icon: 'iconaccount-audit', link: 'envelopeRain', index: '10', position: '-237px 1px' },
        { name: '活动申请记录', icon: 'icontubiao-', link: 'activity', index: '11', position: '-143px 1px' },
        { name: '投注历史', icon: 'iconic_history', link: 'betting', index: '12', position: '-161px 1px' }
      ]
    },
    {
      title: '自助活动', list: [
        { name: '认证体验金', icon: 'iconrenzhengyonghu', link: 'caijin', index: '13', position: '1px 1px' },
        { name: '签到活动', icon: 'iconqiandao', link: 'signin', index: '14', position: '-16px 1px' }
      ]
    },
    {
      title: '全民推广', list: [
        { name: '推广赚钱', icon: 'iconMenu_tuiguangzhuanqian', link: 'spreadMoney/spreadMoneyPay', index: '15', position: '1px 1px' },
        { name: '推广教程', icon: 'iconjiaocheng', link: 'SpreadLesson', index: '16', position: '-16px 1px' }
      ]
    },
    {
      title: '消息记录', list: [
        { name: '个人消息', icon: 'iconmessage', link: 'personalNews', index: '17', position: '-180px 1px' },
        { name: '系统消息', icon: 'iconyoujian', link: 'historicalNews/latest', index: '18', position: '-198px 1px' }
      ]
    }
  ];

  //  账户安全等级
  level;
  // 全民推广模式获取
  spreadMode = 0;
  // 是否有未读消息
  isUnreadInfo = false;
  // 输赢佣金开关
  winningSwitch = 0;
  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute
  ) {
    // 监听路由变化
    this.$Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { // 当导航成功结束时执行
        this.checkCurrentTab();
      }
    });
  }

  ngOnInit() {
    // 刷新页面时，保留原来的页面active  效果
    this.checkCurrentTab();
    // 获取等级
    this.getaccountLevel();
    this.sessionStorageName = sessionStorage.getItem('loginName');
    // 全民推广功能是否开启
    // tslint:disable-next-line:radix
    this.spreadMode = parseFloat(sessionStorage.getItem('spreadMode'));
    this.winningSwitch = parseFloat(sessionStorage.getItem('winningSwitch'));
    /****
    这里情况比较多,全民推广跟佣金查询联动判断
    1）后台开启推广功能和输赢佣金功能时，显示全民推广菜单（包含推广赚钱以及推广教程），
    推广赚钱菜单项增加佣金查询功能；
    2）后台开启推广功能，关闭输赢佣金功能时，不显示佣金查询菜单；
    3）后台关闭推广功能，开启输赢佣金功能时，显示全民推广菜单（仅显示推广赚钱项，不展示推广教程），
    推广赚钱菜单项仅显示推广赚钱和佣金查询；
    4）后台关闭推广功能及输赢佣金功能时，不显示全民推广主菜单。
    全民推广模式
    mode=0表示关闭全民推广，mode=1表示打开全民推广无限模式，mode=2表示打开全民推广提成模式
    输赢佣金开关
    winningSwitch=0表示关闭佣金开关，winningSwitch=1表示打开佣金开关-含彩票，winningSwitch=2表示打开佣金开关-不含彩票
    ****/
    // tslint:disable-next-line:curly
    // 这里判断了第三第四条，第一第二条去spreadmoney组件判断
    if (this.spreadMode === 0 && this.winningSwitch === 0 ) {
      // 全民推广关闭，佣金查询关闭
      this.demoIndex.forEach((item, index) => {
        if (item.title === '全民推广') {
          this.demoIndex.splice(index, 1);
        }
      });
    } else if (this.spreadMode === 0 && this.winningSwitch !== 0) {
      this.demoIndex.forEach((item, index) => {
        // 显示推广赚钱，不显示推广教程
        if (item.title === '全民推广') {
          item.list.splice(1, 1);
        }
      });
    }
    // 自助活动部分
    // 认证体验金是否开启：vcode='2'表示活动关闭，vcode='0'或者vcode='1'活动开启
    // 如果签到开关signSwitch=0，签到开关关闭，signSwitch=1，签到开关开启
    const signSwitch = parseFloat(sessionStorage.getItem('signSwitch'));
    if (this.$GlobalService.globalJavaResData.caijinData.vcode === 2 && signSwitch === 0) {
      this.demoIndex.forEach((item, index) => {
        if (item.title === '自助活动') {
          this.demoIndex.splice(index, 1);
        }
      });
    } else {
      this.demoIndex.forEach((item, index) => {
        if (item.title === '自助活动') {
          if (this.$GlobalService.globalJavaResData.caijinData.vcode === 2) {
            item.list.forEach((item2, k) => {
              if (item2.index === '14') {
                item.list.splice(k, 1);
              }
            });
          }
          if (signSwitch === 0) {
            item.list.forEach((item2, k) => {
              if (item2.index === '15') {
                item.list.splice(k, 1);
              }
            });
          }
        }
      });
    }
    // 获取是否有未读个人消息
    this.$CommonDataService.getPersonalMessagewd().then((res: Result) => {
      if (res.success === 0) {
        if (res.total > 0) {
          this.$GlobalService.globalTipsModelModel.isUnreadInfo = true;
        }
      }
    });
    
    // VIP会员中心开关
    this.$CommonDataService.getVipInfo().then((res2: Result) => {
      if(res2.data.switch===1){
        this.demoIndex[0].list[5] = { name: 'VIP中心', icon: 'vip_icon', link: 'vipCenter', index: '5', position: '-257px 1px' }
      }else{
        if(this.demoIndex[0].list[5].name=='VIP中心'){
          this.demoIndex[0].list.splice(5,1)
        }
      }

        // 实时返水开关
      this.$CommonDataService.ssSwitchon().then((res: Result) => {
        if(res.data.switchon===true){
          if(this.demoIndex[0].list[5].name!='实时返水'){
            this.demoIndex[0].list[6] = { name: '实时返水', icon: 'iconanquan', link: 'realtimeRebate', index: '16', position: '-217px 1px' }
          }
        }else{
          if(res2.data.switch===1){
            this.demoIndex[0].list.splice(6,1)
          }else if(res2.data.switch===0){
            this.demoIndex[0].list.splice(5,1)
          }
        }
      });

    });
  }

  // 会员中心点击效果
  listName(item, i) {
    this.isShowIndex = i;
    this.isShowIndex1 = i;
    this.routerClick(i);
    if (i === '1') {
      // this.$GlobalService.globalTipsModelModel.isWithdrawMoney = true;
      this.modal.open({
        message: '尊敬的会员，进入取款流程后，将会归集所有游戏内未结算的' +
          '游戏余额，若您此时正在游戏中，请重新进入游戏即可正常游戏。',
        confirmShow: true,
        confirmTxt: '确认',
        cancelTxt: '取消',
        cancelShow: true,
      });
      this.modal.options.confirm = () => {
        this.$Router.navigate(['withdrawMoney'], { relativeTo: this.$ActivatedRoute });
      };
      this.modal.options.cancel = () => {
        this.checkCurrentTab();
      };
    }
  }

  // 会员中心滑入效果
  listNameShow(item, i) {
    this.isShowIndex1 = i;
  }

  // 会员中心滑出效果
  listNameHide() {
    this.isShowIndex1 = null;
  }

  gameToMain() {
    this.isAccounta = !this.isAccounta;
    // 一键归账
    this.$CommonDataService.transferAllGameToMain().then((res: Result) => {
      if (res.success === 0) {
        this.transferAll = res.data;
        this.$GlobalMethodsService.showTopCenter(res.msg);
        this.isAccounta = !this.isAccounta;
        this.$GlobalMethodsService.myAllbalancelist();
      }
    });
  }

  // 刷新余额
  refreshAmount() {
    this.refroneKeyTransfer = !this.refroneKeyTransfer;
    this.$CommonDataService.allbalancelist().then((res: Result) => {
      if (res.success === 0) {
        const data = res.data;
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
        this.data = res.data.reverse().slice();
        this.$GlobalService.globalQueryModel.balancelist = this.data;
        this.refroneKeyTransfer = !this.refroneKeyTransfer;
      }

    });
  }

  checkCurrentTab() {
    const currentUrl = location.hash; // 当前URL
    const urlList = currentUrl.split('/');
    urlList.forEach(urlitem => {
      this.demoIndex.forEach(item => {
        item.list.forEach((element, i) => {
          if (element.link.indexOf(urlitem) > -1) {
            this.isShowIndex = element.index;
            this.isShowIndex1 = element.index;
          }
        });
      });
    });
  }

  handleOpenDialog() {
    window['modal'].open({
      message: '请充值后再进行游戏',
      confirmShow: true,
      confirmTxt: '确认',
      cancelShow: true,
      cancelTxt: '取消'
    });
  }

  /**
   *设置账户安全等级
   */
  getaccountLevel() {
    this.$CommonDataService.accountLevel().then((res: Result) => {
      if (res.success === 0) {
        const letName = this.$GlobalService.globalTipsModelModel;
        letName.grades = res.data;
        this.level = 0;
        this.level = letName.grades.mail === 0 ? this.level + 1 : this.level;
        this.level = letName.grades.mobile === 0 ? this.level + 1 : this.level;
        this.level = letName.grades.realname === 0 ? this.level + 1 : this.level;
        this.level = letName.grades.securityquestion === 0 ? this.level + 1 : this.level;
        this.level = letName.grades.userbankpassword === 0 ? this.level + 1 : this.level;
        this.level > 4 ? (this.level = '高') : this.level > 2 ? (this.level = '中') : (this.level = '低');
        letName.level = this.level;
      }

    });
  }

  /**
   *存款路由跳转
   */
  routerClick(i) {
    if (window.location.hash.indexOf('deposit') === -1 && i === '0') {
      // 相對路徑
      this.$Router.navigate(['./deposit'], { relativeTo: this.$ActivatedRoute });
    }
  }

}



