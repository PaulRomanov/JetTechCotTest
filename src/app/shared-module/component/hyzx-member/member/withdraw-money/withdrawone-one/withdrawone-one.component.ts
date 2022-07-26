import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { CommonDataService } from '../../../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../../../core-module/common-util/global-service';
import { Result } from '../../../../../../core-module/common-util/result';
import { GlobalMethodsService } from '../../../../../../core-module/common-methods/global-methods.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegularExp } from '../../../../../../core-module/common-util/regular-exp';

@Component({
  selector: 'pc-withdrawone-one',
  templateUrl: './withdrawone-one.component.html',
  styleUrls: ['./withdrawone-one.component.scss']
})
export class WithdrawoneOneComponent implements OnInit {
  // 接受父组件传过来的值
  @Input() data = [];
  @Output() loadingChange = new EventEmitter();
  cities1: SelectItem[] = [];
  selectedCity1: any;
  appImme = Object;
  moneyLoad = false;
  isDraw = false;
  nextLat = false;
  isOk;
  noMoeny = false;
  isLoad;
  modal = window['modal'];
  WITCEILING;
  iswich;
  WITFLOOR;
  modify;
  isCity;
  WITAUDITFLAG;
  getpayName = Object;
  isMoeny = false;
  isLoding;
  // 弹窗的取款密码
  withdrawone = {
    inputPassword1: null,
    inputPassword2: null,
    inputPassword3: null,
    inputPassword4: null,
    inputPassword5: null,
    inputPassword6: null
  };
  isAccuntOK = true;
  isnumOks = false;
  memberDrawShow = false;
  memberDrawMobile;
  isMobileWarning = false;
  memberDrawCode = '';
  isCodeWarning = false;
  mobileWarningTxt = '手机号码格式不正确';
  countTxt = '获取验证码';
  countNum = 60;
  reg = new RegExp(RegularExp.mobileExp);
  confirmDraw = false;
  USDTRATE; // usdt汇率
  CNYBRATE;
  USDTCTRL; // usdt出款开关  0：关闭，1：开启
  CNYBCTRL;
  cnybamount;
  usdtamount;
  @ViewChild('zmInput1') zmInput1: ElementRef;
  @ViewChild('zmInput2') zmInput2: ElementRef;
  @ViewChild('zmInput3') zmInput3: ElementRef;
  @ViewChild('zmInput4') zmInput4: ElementRef;
  @ViewChild('zmInput5') zmInput5: ElementRef;
  @ViewChild('zmInput6') zmInput6: ElementRef;

  saveLoad = false;

  constructor(private $CommonDataService: CommonDataService,
              private $GlobalService: GlobalService,
              private $Router: Router,
              private $ActivatedRoute: ActivatedRoute,
              private $GlobalMethodsService: GlobalMethodsService) {
    this.$GlobalService.globalQueryModel.appImmediatelyaudit.money = '';
  }

  ngOnInit() {
    // this.$GlobalMethodsService.getUrlParam('aff')
    // 检测用户是否符合首次出款修改手机号
    // alert(1)
    // this.$CommonDataService.modifyPhoneCheck().then((modify: Result) => {
    //   this.modify = modify;
    // });
    // 取款获取个人信息
    this.$CommonDataService.getpayment().then((res: Result) => {
      // 取款一键归账后查询余额
      this.$CommonDataService.allbalancelist().then((total: Result) => {
        total.data.forEach(item => {
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
      });
      // 查询个人信息
      this.$CommonDataService.getUserInfo().then((data: Result) => {
        this.isLoding = true;
        // 个人信息是否完善
        if (data.data.realname === '' || data.data.userbankpassword === '') {
          this.$GlobalMethodsService.showTopCenter('个人信息未完善，请完善后取款！');
          this.$Router.navigate(['../security/personalInformation'], { relativeTo: this.$ActivatedRoute });
        }
      });
      this.nextLat = true;
      this.getpayName = res.data;
      // 上一次取款审核是否通过
      if (res.success === '000004') {
        this.noMoeny = !this.noMoeny;
        this.isOk = 1;
      }
      // USDT当前汇率
      this.USDTRATE = res.data.USDTRATE;
      this.CNYBRATE = res.data.CNYBRATE;
      // USDT出款开关
      this.USDTCTRL = res.data.USDTCTRL;
      this.CNYBCTRL = res.data.CNYBCTRL;

      if(res.data.WITHDRAWBANKS.length==0){
        // this.$GlobalMethodsService.showTopCenter('请先在出款管理中增加出款方式！');
        this.modal.open({
          message: `请先在出款管理中增加出款方式！`,
          confirmShow: true,
          confirmTxt: '确认',
          cancelTxt: '取消',
          cancelShow: true,
        });
        return;
      }
      // 取款金额上限
      this.WITCEILING = res.data.WITHDRAWBANKS[0].witceiling;
      // 取款金额下限
      this.WITFLOOR = res.data.WITHDRAWBANKS[0].witfloor;
      // 是否有银行卡
      if (this.getpayName['WITHDRAWBANKS'].length > 0) {
        this.getpayName['WITHDRAWBANKS'].forEach(item => {
          if(item.bankname=="CNYB"||item.bankname=="USDT-TRC20"||item.bankname=="CNYB"){
            this.cities1.push(
              { label: `${item.bankname}:${item.updUserbanknum}`, value: item },
            );
          }else{
            this.cities1.push(
              { label: `${item.bankname}${item.userbanknum}`, value: item },
            );
          }

        });
        // 设置初始值
        this.selectedCity1 = this.cities1[0].value;
        // 是否需要完善省市支行开关
        this.isCity = this.selectedCity1;
        this.$GlobalService.globalQueryModel.saveWithdraw.bankid = this.selectedCity1.id;
        this.$GlobalService.globalJavaResData.WITAUDITFLAG = res.data;
      } else {
        this.$GlobalMethodsService.showTopCenter('未设置银行卡，请完善后取款！');
        this.$Router.navigate(['../bankCard/newBank'], { relativeTo: this.$ActivatedRoute });
      }
    });
    // 银行卡是否完善省市支行开关
    this.$CommonDataService.getFullInfoSwtich().then((iswich: Result) => {
      this.iswich = iswich;
    });
  }

  /**
   * 点击select获取下拉框的值
   * param event
   */
  changeType(event) {
    // 是否需要完善省市支行开关
    console.log(event)
    this.isCity = event.value;
    this.WITFLOOR = event.value.witfloor;
    this.WITCEILING = event.value.witceiling;
    this.$GlobalService.globalQueryModel.saveWithdraw.bankid = event.value.id;
    if (event.value.bankname === 'USDT-ERC20' || event.value.bankname === 'USDT-TRC20') {
      if (this.USDTCTRL == '0') {
        this.modal.open({
          message: `该出款渠道正在维护中，请使用其他方式出款`,
          confirmShow: true,
          confirmTxt: '确认',
          cancelTxt: '取消',
          cancelShow: true,
        });
        return;
      }
    }

    if (event.value.bankname === 'CNYB') {
      if (this.CNYBCTRL == '0') {
        this.modal.open({
          message: `该出款渠道正在维护中，请使用其他方式出款`,
          confirmShow: true,
          confirmTxt: '确认',
          cancelTxt: '取消',
          cancelShow: true,
        });
        return;
      }
    }
  }

  getQkVale(event) {
    this.$GlobalService.globalQueryModel.appImmediatelyaudit.money = event.target.value;
    if (this.$GlobalService.globalQueryModel.appImmediatelyaudit.money) {
      if (this.WITFLOOR > parseInt(this.$GlobalService.globalQueryModel.appImmediatelyaudit.money, 10)
        || parseInt(this.$GlobalService.globalQueryModel.appImmediatelyaudit.money, 10) > this.WITCEILING) {
        this.isAccuntOK = false;
        this.isnumOks = false;
      } else {
        this.isAccuntOK = true;
        this.isnumOks = true;
      }
    } else {
      this.isAccuntOK = true;
      this.isnumOks = false;
    }
  }

  // 取款下一步
  sunbimMach() {
    // 判断银行卡信息是否未完善
    if (this.iswich.success !== '0000010') {
      if (!this.isCity.city && this.isCity.bankname !== 'USDT-ERC20' && this.isCity.bankname !== 'USDT-TRC20') {
        this.modal.open({
          message: `您的${this.selectedCity1.bankname}尾号${this.selectedCity1.userbanknum}未完善省市支行，请完善信息后进行取款!`,
          confirmShow: true,
          confirmTxt: '确认',
          cancelTxt: '取消',
          cancelShow: true,
        });
        this.modal.options.confirm = () => {
          this.$Router.navigate(['../bankCard/commonBank'], { relativeTo: this.$ActivatedRoute });
        };
        return;
      }
    }
    if (this.isCity.bankname === 'USDT-ERC20' || this.isCity.bankname === 'USDT-TRC20') {
      if (this.USDTCTRL == '0') {
        this.modal.open({
          message: `该出款渠道正在维护中，请使用其他方式出款`,
          confirmShow: true,
          confirmTxt: '确认',
          cancelTxt: '取消',
          cancelShow: true,
        });
        return;
      }
    }
    if (this.isCity.bankname === 'CNYB') {
      if (this.CNYBCTRL == '0') {
        this.modal.open({
          message: `该出款渠道正在维护中，请使用其他方式出款`,
          confirmShow: true,
          confirmTxt: '确认',
          cancelTxt: '取消',
          cancelShow: true,
        });
        return;
      }
    }
    // // 首次出款手机号是否需要修改
    // if (this.modify.data.modify === true) {
    //   this.modal.open({
    //     message: '您当前的手机号为' + this.modify.data.phone + '，首次申请出款后，将不能修改，是否需要修改？',
    //     confirmShow: true,
    //     confirmTxt: '确认',
    //     cancelTxt: '取消',
    //     cancelShow: true,
    //   });
    //   // 确认跳转个人信息
    //   this.modal.options.confirm = () => {
    //     this.$Router.navigate(['../security/personalInformation'], { relativeTo: this.$ActivatedRoute });
    //   };
    //   // 取消继续取款
    //   this.modal.options.cancel = () => {
    //     this.astscy();
    //   };
    //   return;
    // }
    // 判断是否首次出款
    this.$CommonDataService.checkFirstWithdrawal().then((res: Result) => {
      if (res.success === 0) {
        if (res.data.isFirstWithdrawals) {
          // 首次出款，弹出手机号验证弹框
          this.memberDrawShow = true;
        } else {
          this.memberDrawShow = false;
          this.astscy();
        }
      }
    });
  }

  // 取款提交申请
  astscy() {
    this.moneyLoad = !this.moneyLoad;
    // 取款提交申请
    this.$CommonDataService.appImmediatelyaudit().then((res: Result) => {
      this.moneyLoad = !this.moneyLoad;
      if (res.success !== 1) {
        this.appImme = res.data;
        this.isMoeny = true;
        this.isLoad = 1;
        this.usdtamount = res.data.usdtamount;
        this.cnybamount = res.data.cnybamount;
        this.loadingChange.emit({ value: this.isLoad });
      }
    });
  }

  /**
   *上一步
   */
  pervClick() {
    this.isMoeny = !this.isMoeny;
    this.isLoad = 0;
    this.loadingChange.emit({ value: this.isLoad });
  }

  /**
   * input 获取焦点
   * param type
   */
  inputChangeData(type) {
    if (type === 1) {
      if (this.withdrawone.inputPassword1) {
        this.zmInput2.nativeElement.focus();
      } else {
        this.zmInput1.nativeElement.focus();
      }
    } else if (type === 2) {
      if (this.withdrawone.inputPassword2) {
        this.zmInput3.nativeElement.focus();
      } else {
        this.zmInput1.nativeElement.focus();
      }
    } else if (type === 3) {
      if (this.withdrawone.inputPassword3) {
        this.zmInput4.nativeElement.focus();
      } else {
        this.zmInput2.nativeElement.focus();
      }
    } else if (type === 4) {
      if (this.withdrawone.inputPassword4) {
        this.zmInput5.nativeElement.focus();
      } else {
        this.zmInput3.nativeElement.focus();
      }
    } else if (type === 5) {
      if (this.withdrawone.inputPassword5) {
        this.zmInput6.nativeElement.focus();
      } else {
        this.zmInput4.nativeElement.focus();
      }
    } else if (type === 6 && !this.withdrawone.inputPassword6) {
      this.zmInput5.nativeElement.focus();
    }
  }

  /**
   * 提交数据
   */
  saveDataInput() {
    this.saveLoad = true;
    const saveSet = this.$GlobalService.globalQueryModel.saveWithdraw;
    saveSet.inputmoney = this.$GlobalService.globalQueryModel.appImmediatelyaudit.money;
    saveSet.money = this.appImme['realmoney'];
    saveSet.privilegemoney = this.appImme['deductPrivilege'];
    saveSet.userbankpassword = this.withdrawone.inputPassword1 + this.withdrawone.inputPassword2 +
      this.withdrawone.inputPassword3 + this.withdrawone.inputPassword4 + this.withdrawone.inputPassword5 + this.withdrawone.inputPassword6;
    saveSet.commfee = this.appImme['feesets'];
    saveSet.payfee = this.appImme['fee'];
    saveSet.factorage = this.appImme['serviceCharge'];
    saveSet.withdrawtime = this.appImme['endtime'];
    saveSet.sectoken = this.appImme['sectoken'];
    this.$CommonDataService.saveWithdraw().then((res: Result) => {
      if (res.success === 1) {
        this.withdrawone = {
          inputPassword1: null,
          inputPassword2: null,
          inputPassword3: null,
          inputPassword4: null,
          inputPassword5: null,
          inputPassword6: null
        };
      } else if (res.success === 0) {
        this.isMoeny = false;
        this.noMoeny = true;
        this.isLoad = 2;
        this.isDraw = false;
        this.loadingChange.emit({ value: this.isLoad });
      }
      this.saveLoad = false;
    });
  }
  // 首次取款验证手机号功能
  closeMemberDrawDialog() {
    this.memberDrawShow = false;
  }
  testMobile() {
    // console.log(this.reg);
    if (!this.memberDrawMobile) {
      this.isMobileWarning = true;
      this.mobileWarningTxt = '请输入手机号码';
    } else if (!this.reg.test(this.memberDrawMobile)) {
      this.isMobileWarning = true;
      this.mobileWarningTxt = '手机号码格式不正确';
    } else {
      this.isMobileWarning = false;
    }
  }
  // 获取短信验证码
  getSMScode() {
    if (!this.memberDrawMobile) {
      this.isMobileWarning = true;
      this.mobileWarningTxt = '请输入手机号码';
    } else if (!this.reg.test(this.memberDrawMobile)) {
      this.isMobileWarning = true;
      this.mobileWarningTxt = '手机号码格式不正确';
    } else {
      this.isMobileWarning = false;
      if (this.countNum === 60) {
        this.$GlobalService.globalQueryModel.sendSMSComVerify.mobile = this.memberDrawMobile;
        this.$CommonDataService.sendSMSComVerify().then((res: Result) => {
          if (res.success === 0) {
            // 请求成功进入读秒
            this.countNum = 60;
            const smsCodeTimer = setInterval(() => {
              if (this.countNum === 0) {
                clearInterval(smsCodeTimer);
                this.countNum = 60;
              } else {
                this.countNum -= 1;
              }
            }, 1000);
          }
        });
      }
    }
  }
  // 提交手机号
  submitMemberDraw() {
    // 拦截：手机号未填
    if (!this.memberDrawMobile) {
      this.isMobileWarning = true;
      this.mobileWarningTxt = '请输入手机号码';
      return;
    }
    // 拦截：手机号验证不通过
    if (this.isMobileWarning) {
      return;
    }
    // 拦截：验证码未填写
    this.isCodeWarning = false;
    if (!this.memberDrawCode) {
      this.isCodeWarning = true;
      return;
    }
    this.$GlobalService.globalQueryModel.checkMobileValid.mobile = this.memberDrawMobile;
    this.$GlobalService.globalQueryModel.checkMobileValid.code = this.memberDrawCode;
    this.$CommonDataService.checkMobileValid().then((res: Result) => {
      if (res.success === 0) {
        this.memberDrawShow = false;
        this.astscy();
      }
    });
  }
  openKufu() {
    this.$GlobalMethodsService.openKufu();
  }
  closeConfirmDraw() {
    this.confirmDraw = false;
  }
  doConfirmDraw() {
    this.isDraw = true;
    this.confirmDraw = false;
  }
  // 点击确认取款
  drawMoney() {
    this.confirmDraw = true;
  }
  // usdt计算
  mathNumber(num) {
    return Math.floor(num * 100) / 100;
  }
}

interface SelectValue {
  label: any;
  value: any;
}
