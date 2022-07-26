import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../../../../core-module/common-methods/global-methods.service';
import { Result } from '../../../../../../core-module/common-util/result';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-withdrawal-password',
  templateUrl: './withdrawal-password.component.html',
  styleUrls: ['./withdrawal-password.component.scss']
})
export class WithdrawalPasswordComponent implements OnInit {
  modal = window['modal'];
  visible = false;
  refroneKeyTransfer;
  newVisible = false;
  newPwd1;
  newVisible1 = false;
  isShowWarning = {
    warning1: false,
    warning2: false,
    warning3: false
  };
  stopIndex = 0;
  isCaptchaOpen = false;
  showPassword1 = false;
  showPassword2 = false;
  phone;
  code = '';
  SMSpwd1 = '';
  SMSpwd2 = '';
  isSMSpwd1TipShow = false;
  isSMSpwd2TipShow = false;
  isShowCountdown = false;
  countdown = 60;
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
    public $Router: Router,
    private $ActivatedRoute: ActivatedRoute
  ) {
    this.$GlobalService.globalQueryModel.modify.newPwd = '';
    this.$GlobalService.globalQueryModel.modify.oldPwd = '';
    this.newPwd1 = '';
  }
  ngOnInit() {
    this.withdrawalVerifOFFON();
  }
  getUserInfo() {
    this.$CommonDataService.getUserInfo().then((res: Result) => {
      this.phone = res.data.mobile;
    });
  }
  loginPassword() {
    // 拦截：
    if (!this.$GlobalService.globalQueryModel.modify.oldPwd || this.$GlobalService.globalQueryModel.modify.oldPwd.length < 6) {
      this.isShowWarning.warning1 = true;
      return;
    } else {
      this.isShowWarning.warning1 = false;
    }
    if (!this.$GlobalService.globalQueryModel.modify.newPwd || this.$GlobalService.globalQueryModel.modify.newPwd.length < 6) {
      this.isShowWarning.warning2 = true;
      return;
    } else {
      this.isShowWarning.warning2 = false;
    }
    if (!this.newPwd1 || this.newPwd1 !== this.$GlobalService.globalQueryModel.modify.newPwd) {
      this.isShowWarning.warning3 = true;
      return;
    } else {
      this.isShowWarning.warning3 = false;
    }
    this.$GlobalService.globalQueryModel.modify.type = '2';
    this.refroneKeyTransfer = !this.refroneKeyTransfer;
    this.$CommonDataService.modify().then((res: Result) => {
      this.refroneKeyTransfer = !this.refroneKeyTransfer;
      if (res.success === 0) {
        this.$GlobalMethodsService.showTopCenter(res.msg);
        this.$GlobalService.globalQueryModel.modify.newPwd = '';
        this.$GlobalService.globalQueryModel.modify.oldPwd = '';
        this.newPwd1 = '';
      }
    });
  }
  // 切换修改密码展示内容
  changeStopIndex(stopIndex, isMsg?) {
    if (isMsg && !this.phone) {
      this.modal.open({
        message: '您暂未设置手机号，请先去完善！',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      this.modal.options.confirm = () => {
        this.$Router.navigate(['../personalInformation'], { relativeTo: this.$ActivatedRoute });
      };
      return;
    }
    this.stopIndex = stopIndex;
  }
  // 获取修改取款密码 是否开启验证码开关
  withdrawalVerifOFFON() {
    this.$CommonDataService.withdrawalVerifOFFON().then((res: Result) => {
      if (res.data.isWithdrawalVerif === 1) {
        this.isCaptchaOpen = true;
        this.getUserInfo();
      }
    });
  }
  // 发送验证码
  sandWithdrawalVerif() {
    this.$CommonDataService.sandWithdrawalVerif().then((res: Result) => {
      if (res.success === 0) {
        this.modal.open({
          message: '短信发送成功，请注意查收！',
          confirmShow: true,
          confirmTxt: '确认',
          cancelShow: false,
        });
        this.isShowCountdown = true;
        this.countdown = 60;
        const stime = setInterval(() => {
          this.countdown--;
          if (this.countdown < 0) {
            clearInterval(stime);
            this.isShowCountdown = false;
          }
        }, 1000);
      }
    });
  }
  // 下一步
  next() {
    this.$GlobalService.globalQueryModel.verifWithdrawal.code = this.code;
    this.$CommonDataService.verifWithdrawal().then((res: Result) => {
      if (res.success === 0) {
        this.stopIndex++;
      }
    });
  }
  // 短信 第一个密码失去焦点事件
  SMSpwd1Blur() {
    this.isSMSpwd1TipShow = this.SMSpwd1.length !== 6 ? true : false;
  }
  // 短信 第二个密码失去焦点事件
  SMSpwd2Blur() {
    this.isSMSpwd2TipShow = this.SMSpwd2.length !== 6 || (this.SMSpwd1 !== this.SMSpwd2) ? true : false;
  }
  // 短信 确认修改密码
  commit() {
    this.$GlobalService.globalQueryModel.editWithdrawalPwd.code = this.code;
    this.$GlobalService.globalQueryModel.editWithdrawalPwd.pwd = this.SMSpwd1;
    this.$GlobalService.globalQueryModel.editWithdrawalPwd.pwd2 = this.SMSpwd2;
    this.$CommonDataService.editWithdrawalPwd().then((res: Result) => {
      if (res.success === 0) {
        this.modal.open({
          message: '密码修改成功！',
          confirmShow: true,
          confirmTxt: '确认',
          cancelShow: false,
        });
        this.modal.options.confirm = () => {
          window.location.reload();
        };
      }
    });
  }
}
