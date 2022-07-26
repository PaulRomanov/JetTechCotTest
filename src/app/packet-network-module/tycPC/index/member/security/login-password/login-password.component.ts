import { Component, OnInit } from '@angular/core';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../../core-module/common-util/result';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.scss']
})
export class LoginPasswordComponent implements OnInit {
  visible = false;
  refroneKeyTransfer;
  noSpecial: RegExp = /^[0-9a-zA-Z]+$/;
  newVisible = false;
  newPwd1;
  newVisible1 = false;
  isShowWarning = {
    warning1: false,
    warning2: false,
    warning3: false
  };
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
    // 重置登陆密码输入框
    this.$GlobalService.globalQueryModel.modify.oldPwd = '';
    this.$GlobalService.globalQueryModel.modify.newPwd = '';
    this.newPwd1 = '';
  }

  ngOnInit() {

  }
  loginPassword () {
    // 拦截：
    if (!this.$GlobalService.globalQueryModel.modify.oldPwd || this.$GlobalService.globalQueryModel.modify.oldPwd.length < 8) {
      this.isShowWarning.warning1 = true;
      return;
    } else {
      this.isShowWarning.warning1 = false;
    }
    if (!this.$GlobalService.globalQueryModel.modify.newPwd || this.$GlobalService.globalQueryModel.modify.newPwd.length < 8) {
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
    this.$GlobalService.globalQueryModel.modify.type = '1';
    this.refroneKeyTransfer = !this.refroneKeyTransfer;
    this.$CommonDataService.modify().then((res: Result) => {
      this.refroneKeyTransfer = !this.refroneKeyTransfer;
      if (res.success === 0) {
        // 重置登陆密码输入框
        this.$GlobalService.globalQueryModel.modify.oldPwd = '';
        this.$GlobalService.globalQueryModel.modify.newPwd = '';
        this.newPwd1 = '';
        this.$GlobalMethodsService.showTopCenter(res.msg);
      }
    });
  }
}
