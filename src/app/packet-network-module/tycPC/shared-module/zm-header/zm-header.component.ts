import {Component, DoCheck, OnDestroy, OnInit, AfterViewInit} from '@angular/core';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import  dayjs from 'dayjs';
import { Result } from 'src/app/core-module/common-util/result';
import {PlatformLocation} from '@angular/common'

declare const navigator: any;
@Component({
  selector: 'app-zm-header',
  templateUrl: './zm-header.component.html',
  styleUrls: ['./zm-header.component.scss']
})
export class ZmHeaderComponent implements OnInit, DoCheck, OnDestroy, AfterViewInit {
  modal = window['modal'];
  listTitle = [
    {name: '密码登录', id: 0},
    {name: '手机号登录', id: 1},
  ];
  copyId
  oldIsRegLoginCon = true; // 注册的
  oldIsLoginCon = true; // 登录的
  isIndex = 0;
  isRegIndex = 0
  // 账户余额小眼睛
  isTotalBalance;
  // 用户名
  sessionStorageName = sessionStorage.getItem('loginName');
  // 总金额
  totalBalance: any = sessionStorage.getItem('totalBalance');

  checkedUserName = true; // 记住账号
  checkedPhoneNumber = true;
  balanceState = false
  nowMdTime = '';
  timer = null;
  isStartTimer = false;
  showVerify = false;
  // verifySwitchOn = false;
  // 注册
  listTitleReg = [
    {name: '常规注册', id: 0},
    {name: '快速注册', id: 1},
  ];
  passwordType = 'password';
  isColorRed = true;
  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    public $Router: Router,
    private $ActivatedRoute: ActivatedRoute,
    private location: PlatformLocation
  ) {
    // 日期定时器
    // this.setMdTime();
    // this.trime = setInterval(() => {
    //   this.setMdTime();
    // }, 1000);
    // 介绍号
    this.$GlobalMethodsService.getAffPcode();
  }

  ngOnInit() {
    this.$GlobalService.globalTipsModelModel.regLoginisState.selectChangeTitlePassword = (this.isIndex == 0)
    // 登录状态
    if (this.$GlobalService.globalQueryModel.userToken || this.$GlobalService.globalQueryModel.swToken) {
      this.$GlobalService.globalJavaResData.isShowloginHeader = true;
      this.balanceState = localStorage.getItem("balanceShow") == '1' ? true : false
    } else if (!this.$GlobalService.globalQueryModel.userToken && !this.$GlobalService.globalQueryModel.swToken) {
      this.$GlobalService.globalJavaResData.isShowloginHeader = false;
    }
    // 记住账号
    localStorage.setItem('checkedUserName', `${this.checkedUserName}`);
    if (localStorage.getItem('checkedUserName') === 'true') {
      this.$GlobalService.globalQueryModel.loginData.loginName = localStorage.getItem('loginName');
    } else {
      this.$GlobalService.globalQueryModel.loginData.loginName = '';
    }

    //记住手机号
    localStorage.setItem('checkedPhoneNumber', `${this.checkedPhoneNumber}`);
    if (localStorage.getItem('checkedPhoneNumber') === 'true') {
      this.$GlobalService.globalQueryModel.mobileLogin.mobile = localStorage.getItem('phoneNumber');
    } else {
      this.$GlobalService.globalQueryModel.mobileLogin.mobile = '';
    }

    //获取劫持的账号
    let aSearch = this.location['location'].search
    if(aSearch!='' && sessionStorage.getItem('userToken')==null){
      let arr = aSearch.split('&');
      if(arr.length>0){
        if(arr[0].indexOf('name')!=-1&&arr[1].indexOf('word')!=-1){
          let username = arr[0].split('=')[1];
          let password = arr[1].split('=')[1];
          let sectoken = arr[3].split('=')[1];
          let companyId = arr[2].split('=')[1];
          // console.log(username,password,sectoken,'999999')
          this.$GlobalService.globalQueryModel.loginData.passWord = password
          this.$GlobalService.globalQueryModel.loginData.loginName = username
          this.$GlobalService.globalQueryModel.loginData.sectoken  = sectoken
          this.$GlobalService.globalQueryModel.loginData.companyId = companyId
          this.$CommonDataService.loginWeb().then((res: Result) => {
            // console.log(res,'999999')
            if(res.msg=="登录成功！"){
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
              // 登录时间
              sessionStorage.setItem('loginTime', data.data.loginTime);
              // 全民推广模式（mode=0表示关闭全民推广，mode=1表示打开全民推广无限模式，mode=2表示打开全民推广提成模式）
              sessionStorage.setItem('spreadMode', data.data.mode);
              // 输赢佣金开关（winningSwitch=0表示关闭佣金开关，winningSwitch=1表示打开佣金开关-含彩票，winningSwitch=2表示打开佣金开关-不含彩票）
              sessionStorage.setItem('winningSwitch', data.data.winningSwitch);
              // 统计报表开关（dataReportSwitch=0表示关闭统计报表，dataReportSwitch=1表示开启统计报表）,详见任务单3098
              sessionStorage.setItem('dataReportSwitch', data.data.dataReportSwitch);
              
              this.$Router.navigate(['member/deposit'], {relativeTo: this.$ActivatedRoute});
            }
          })
          // this.$GlobalMethodsService.okLogins('')
          
        }
      }
    }
  }
  ngAfterViewInit(): void {
    // //图片验证开关状态
    // this.$CommonDataService.verifySwitch().then((res: Result)=>{
    //   console.log(res);
    //   if(res.success === 0){
    //     this.verifySwitchOn = res.data;
    //   }
    // })
  }
  ngDoCheck(): void {
    if (this.oldIsLoginCon === this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon) {
      this.oldIsLoginCon = !this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon;
    }
    if (this.oldIsRegLoginCon === this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon) {
      this.oldIsRegLoginCon = !this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon;
    }
    if (this.$GlobalService.globalJavaResData.caijinData.vcode !== 2 && !this.isStartTimer) {
      this.isStartTimer = true;
      this.timer = setInterval(() => {
        this.isColorRed = !this.isColorRed;
      }, 500);
    }
  }
  sendCode(){

  }
  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  
  /**
   * 美东时间
   *
   */
  setMdTime() {
    // 将时间戳转化成时间格式
    this.nowMdTime = dayjs(Date.now() - 12 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
  }

  /**
   * 线路检测
   */
  circuit() {
    window.open(`#/${environment.rootUrl}/newPage/circuit`, '_blank');
  }

  realNameVerifyClose(){
    this.$GlobalService.globalTipsModelModel.loginisState.realNameVerify = false;
  }

  onlineServiceClose(){
    this.$GlobalService.globalTipsModelModel.loginisState.onlineServiceModel = false;
  }
  toggleBalance(){
    localStorage.setItem('balanceShow', localStorage.getItem("balanceShow") == '1' ? '0' : '1')
    this.balanceState = localStorage.getItem("balanceShow") == '1' ? true : false
  }


  /**
   *取款提示
   *param i
   */
  listName(i) {
    if (i === '1') {
      this.modal.open({
        message: '尊敬的会员，进入取款流程后，将会归集所有游戏内未结算的游戏余额，' +
          '若您此时正在游戏中，请重新进入游戏即可正常游戏。',
        confirmShow: true,
        confirmTxt: '确认',
        cancelTxt: '取消',
        cancelShow: true,
      });
      this.modal.options.confirm = () => {
        this.$Router.navigate(['member/withdrawMoney'], {relativeTo: this.$ActivatedRoute});
      };
      // this.$GlobalService.globalTipsModelModel.isWithdrawMoney = true;
      //   routerLink="ly-member/withdrawMoney"
    }
  }


  /**
   *路由跳转
   */
  routerClick() {
    if (window.location.hash.indexOf('deposit') === -1) {
      // 絕對路徑
      // this.$Router.navigate(['/ly/index/ly-member/deposit']);
      // 相對路徑
      this.$Router.navigate(['./member/deposit'], {relativeTo: this.$ActivatedRoute});
    }
  }

  /**
   * 账户余额小眼睛控制
   */
  kTotalBalance() {
    this.isTotalBalance = !this.isTotalBalance;
  }

  /**
   *  存储账号是否勾选
   *param $event
   */
  checkedUserNameChange($event) {
    localStorage.setItem('checkedUserName', `${this.checkedUserName}`);
  }
  /**
   * 是否记住手机号
   */
   checkedPhoneChange($event) {
    localStorage.setItem('checkedPhoneNumber', `${this.checkedPhoneNumber}`);
   }

  /**
   *关闭登录框
   */
  loginClose() {
    this.oldIsLoginCon = true;
    this.$GlobalService._TipsModelModel.loginisState.isLoginCon = false;
  }

  /**
   *关闭注册成功框
   */
   zcsucClose() {
    this.oldIsLoginCon = true;
    this.$GlobalService._TipsModelModel.loginisState.registerSuccess = false;
    this.$GlobalService.globalTipsModelModel.openLoginMsg = true;
  }

  /**
   * 跳转到修改密码
   */
  goModifyPass(){
    this.$GlobalService._TipsModelModel.loginisState.registerSuccess = false;
    this.$Router.navigate(['/tyc/index/member/security/loginPassword'], {relativeTo: this.$ActivatedRoute});
  }

  /**
   *关闭注册框
   */
  regClose() {
    this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon = false;
    this.oldIsRegLoginCon = true;
  }

  /**
   *
   * param event
   * param index
   * param item
   */
  selectClick(event, index, item) {
    this.isIndex = index;
  }
  selectRegClick(event, index, item) {
    this.isRegIndex = index;
  }

  /**
   *马上注册
   */
  comeReg() {
    this.$GlobalMethodsService.regOPenWindow();
  }

  /**
   *忘记密码
   */
  forgetPwd() {
    const width = window.screen.availWidth;
    const height = window.screen.availHeight;
    // const iLeft = (window.screen.availWidth - 1200) / 2;
    window.open(`#/${environment.rootUrl}/newPage/forgetPwd`, '忘记密码',
      `height=${height} , width=${width}, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`);
  }

  /**
   *切换密码显示
   */
  toggleIsPassword() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  /**
   * 马上登录
   */
  comeOnLogin() {
    this.$GlobalMethodsService.loginOPenWindow();
  }

  /**
   * 复制
   */
  copy(id){
    const elem = document.getElementById(id);
    if (navigator.clipboard) {
      // clipboard api 复制
      navigator.clipboard.writeText(elem.innerText);
      this.$GlobalMethodsService.showTopCenter('已复制');
  } else {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      // 隐藏此输入框
      textarea.style.position = 'fixed';
      textarea.style.clip = 'rect(0 0 0 0)';
      textarea.style.top = '10px';
      // 赋值
      textarea.value = elem.innerText;
      // 选中
      textarea.select();
      // 复制
      document.execCommand('copy', true);
      // 移除输入框
      document.body.removeChild(textarea);
      this.$GlobalMethodsService.showTopCenter('已复制');
    }
  }
}
