import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../../core-module/common-util/global-service';
import { Result } from '../../../../../core-module/common-util/result';
import { GlobalMethodsService } from '../../../../../core-module/common-methods/global-methods.service';
import { RegularExp } from '../../../../../core-module/common-util/regular-exp';
// import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-caijin',
  templateUrl: './caijin.component.html',
  styleUrls: ['./caijin.component.scss']
})
export class CaijinComponent implements OnInit {
  isShowRules = false;
  modal = window['modal'];
  initCaijinData = {
    email: null,
    isEmail: null,
    isPhone: null,
    isRealname: null,
    phone: null,
    realname: null,
    vcode: 2,
    vmsg: null,
  };
  caijinData = {
    realname: null,
    phone: null,
    phoneCode: null,
    email: null,
    emailCode: null
  };
  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) { }

  ngOnInit() {
    this.initCaijinData = this.$GlobalService.globalJavaResData.caijinData;
    this.initCaijinData.vcode = parseFloat(this.$GlobalService.globalJavaResData.caijinData.vcode);
    // 初始化数据
    this.caijinData = {
      realname: this.initCaijinData.realname,
      phone: this.initCaijinData.phone,
      phoneCode: null,
      email: this.initCaijinData.email,
      emailCode: null
    };
  }
  // 发送手机验证码
  caijinVerifyPhone() {
    // 未填手机号码
    if (!this.caijinData.phone) {
      this.modal.open({
        message: '请输入手机号码',
        confirmShow: true,
        confirmTxt: '确认',
        cancelTxt: '取消',
        cancelShow: false
      });
      return;
    }
    // 手机号码格式错误
    if (!this.regTest(RegularExp.mobileExp, '手机号码格式不正确', this.caijinData.phone)) {
      return;
    }
    // 发送手机验证码
    this.$GlobalService.globalQueryModel.caijinVerifyPhone.mobile = this.caijinData.phone;
    this.$CommonDataService.caijinVerifyPhone().then((res: Result) => {
      if (res.success === 0) {
        this.$GlobalMethodsService.showTopCenter('发送手机验证码成功', 1500, 'success');
      }
    });
  }
  // 发送邮箱验证码
  caijinVerifyEmail() {
    // 未填邮箱
    if (!this.caijinData.email) {
      this.modal.open({
        message: '请输入邮箱',
        confirmShow: true,
        confirmTxt: '确认',
        cancelTxt: '取消',
        cancelShow: false
      });
      return;
    }
    // 邮箱格式错误
    if (!this.regTest(RegularExp.emailExp, '邮箱格式不正确', this.caijinData.email)) {
      return;
    }
    // 发送邮箱验证码
    this.$GlobalService.globalQueryModel.caijinVerifyEmail.email = this.caijinData.email;
    this.$CommonDataService.caijinVerifyEmail().then((res: Result) => {
      if (res.success === 0) {
        this.$GlobalMethodsService.showTopCenter('发送邮箱验证码成功', 1500, 'success');
      }
    });
  }
  // 提交实名认证信息
  setCaijinVerifySetting() {
    let isCompleteData = true;
    for (const x in this.caijinData) {
      if (!this.caijinData[x]) {
        isCompleteData = false;
      }
    }
    if (!isCompleteData) {
      this.modal.open({
        message: '必填项不可为空',
        confirmShow: true,
        confirmTxt: '确认',
        cancelTxt: '取消',
        cancelShow: false
      });
      return;
    }
    if (!this.regTest(RegularExp.mobileExp, '手机号码格式不正确', this.caijinData.phone)) {
      return;
    }
    if (!this.regTest(RegularExp.emailExp, '邮箱格式不正确', this.caijinData.email)) {
      return;
    }
    this.$GlobalService.globalQueryModel.setCaijinVerifySetting = Object.assign({}, this.$GlobalService.globalQueryModel.setCaijinVerifySetting, this.caijinData);
    this.$CommonDataService.setCaijinVerifySetting().then((res: Result) => {
      if (res.success === 0) {
        // 如果领取成功，刷新页面数据
        this.$GlobalMethodsService.showTopCenter('领取彩金成功', 1500, 'success');
        this.$CommonDataService.getCaijinVerifySetting().then((msg: Result) => {
          sessionStorage.setItem('caijinData', msg.data);
          this.initCaijinData = msg.data;
          this.initCaijinData.vcode = parseFloat(msg.data.vcode);
          this.$GlobalService.globalJavaResData.caijinData = this.initCaijinData;
          this.caijinData = {
            realname: this.initCaijinData.realname,
            phone: this.initCaijinData.phone,
            phoneCode: null,
            email: this.initCaijinData.email,
            emailCode: null
          };
        });
        this.$GlobalMethodsService.myAllbalancelist();
      }
    });
  }
  regTest(regExp, msg, result) {
    const reg = new RegExp(regExp);
    let isOk = false;
    if (!reg.test(result)) {
      this.modal.open({
        message: msg,
        confirmShow: true,
        confirmTxt: '确认',
        cancelTxt: '取消',
        cancelShow: false
      });
    } else {
      isOk = true;
    }
    return isOk;
  }
  showDetailRules() {
    this.isShowRules = true;
  }
  closeDetailRules() {
    this.isShowRules = false;
  }
}
