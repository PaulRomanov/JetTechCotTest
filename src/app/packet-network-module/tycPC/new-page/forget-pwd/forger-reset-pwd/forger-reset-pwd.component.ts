import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../../core-module/common-util/global-service';
import { CommonMethods } from '../../../../../core-module/common-methods/common-methods';
import { CommonDataService } from '../../../../../core-module/common-util/common-data.service';
import { GlobalMethodsService } from '../../../../../core-module/common-methods/global-methods.service';
import { Result } from '../../../../../core-module/common-util/result';
import { Router } from '@angular/router';
@Component({
  selector: 'yx-forget-resetPwd',
  templateUrl: './forger-reset-pwd.component.html',
  styleUrls: ['./forger-reset-pwd.component.scss']
})
export class YxForgerResetPwdComponent implements OnInit {
  codeUrl;
  uuid;
  modal = window['modal'];
  account;
  code;
  isComplete = false;
  isStep1 = true;
  isStep2 = false;
  isStep3 = false;
  isStep4 = false;
  smsCode;
  countSecond = 60;
  isSendSMS = false;
  password;
  ensurePwd;
  validKey;
  questionList = [
    {
      name: '你爸爸叫什么名字？',
      id: 1
    },
    {
      name: '你妈妈叫什么名字？',
      id: 2
    },
    {
      name: '你出生地在哪里？',
      id: 3
    },
    {
      name: '最爱的一本书是什么？',
      id: 4
    }
  ];
  selectedQuestion;
  isByQuestion = false;
  inputQuestion;
  keyNum = 1;
  isShowPwd = false;
  isShowEnsurePwd = false;
  progress = 0;
  windowHeight;
  constructor(
    public $GlobalService: GlobalService,
    public $CommonDataService: CommonDataService,
    public $GlobalMethodsService: GlobalMethodsService,
    public $Router: Router
  ) { }

  ngOnInit() {
    this.refreshCode();
    // this.setCountSecond();
    // 计算中间部分的高度
    this.windowHeight = (window.screen.availHeight - 280) + 'px';
    // console.log(this.windowHeight);
  }
  // 刷新验证码
  syidentifying() {
    this.uuid = CommonMethods.getUuid();
    return `${this.$CommonDataService.dlUrl}/web/appCode.jsp?codeKey=${this.uuid}&bgColor=42,142,188`;
  }
  refreshCode() {
    this.codeUrl = this.syidentifying();
  }
  // 判断是否填写了账号跟验证码
  check() {
    this.isComplete = true;
    if (!this.account) {
      this.modal.open({
        message: '账号不能为空！',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      this.isComplete = false;
      return;
    }
    if (!this.code) {
      this.modal.open({
        message: '验证码不能为空！',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      this.isComplete = false;
    }
    return;
  }
  resetBy(num) {
    this.check();
    if (!this.isComplete) {
      return;
    }
    this.$GlobalService.globalQueryModel.verifyingPictureCode.code = this.code;
    this.$GlobalService.globalQueryModel.verifyingPictureCode.codeKey = this.uuid;
    this.$GlobalService.globalQueryModel.verifyingPictureCode.loginName = this.account;
    this.$CommonDataService.verifyingPictureCode().then((res: Result) => {
      if (res.success === 0) {
        this.keyNum = num;
        if (num === 1) {
          // 通过手机号找回
          this.$GlobalService.globalQueryModel.sendMsg.key = res.data;
          this.$GlobalService.globalQueryModel.sendMsg.codeKey = this.uuid;
          this.$GlobalService.globalQueryModel.sendMsg.loginName = this.account;
          // 验证码通过，发送短信
          this.$CommonDataService.sendMsg().then((msg: Result) => {
            if (msg.success === 0) {
              this.isStep1 = false;
              this.isStep2 = true;
              this.isStep3 = false;
              this.isStep4 = false;
              this.isByQuestion = false;
              this.setCountSecond();
            } else {
              this.refreshCode();
            }
          });
        } else {
          // 通过密保问题找回
          this.isStep1 = false;
          this.isStep2 = true;
          this.isStep3 = false;
          this.isStep4 = false;
          this.isByQuestion = true;
          this.selectedQuestion = this.questionList[0];
          this.$GlobalService.globalQueryModel.fsecQAT.key = res.data;
        }
      } else {
        this.refreshCode();
      }
    });
  }
  // 重新发送短信验证码
  sendSMS() {
    this.$CommonDataService.sendMsg().then((msg: Result) => {
      if (msg.success === 0) {
        this.isSendSMS = false;
        this.countSecond = 60;
        this.setCountSecond();
      }
    });
  }
  // 设置读秒数
  setCountSecond() {
    const timer = setInterval(() => {
      this.countSecond--;
      // console.log(this.countSecond);
      if (this.countSecond === 0) {
        clearInterval(timer);
        this.isSendSMS = true;
      }
    }, 1000);
  }
  next(key) {
    // 点击上一步
    if (key === 0) {
      this.isStep1 = true;
      this.isStep2 = false;
      this.isStep3 = false;
      this.isStep4 = false;
    }
    // 点击下一步
    if (key === 1) {
      // console.log(this.keyNum);
      if (this.keyNum === 1) {
        // 点击下一步，验证手机验证码是否正确
        if (!this.smsCode) {
          this.modal.open({
            message: '请输入验证码！',
            confirmShow: true,
            confirmTxt: '确认',
            cancelShow: false
          });
          return;
        }
        this.$GlobalService.globalQueryModel.verifyingPhoneCode.fcode = this.smsCode;
        this.$GlobalService.globalQueryModel.verifyingPhoneCode.loginName = this.account;
        this.$CommonDataService.verifyingPhoneCode().then((res: Result) => {
          if (res.success === 0) {
            this.isStep1 = false;
            this.isStep2 = false;
            this.isStep3 = true;
            this.isStep4 = false;
            this.validKey = res.data.validKey;
            this.$GlobalService.globalQueryModel.resetPsw.validKey = this.validKey;
          }
        });
      } else {
        // 通过密保问题提交
        if (!this.inputQuestion) {
          this.modal.open({
            message: '请输入安全问题答案！',
            confirmShow: true,
            confirmTxt: '确认',
            cancelShow: false
          });
          return;
        }
        this.$GlobalService.globalQueryModel.fsecQAT.floginname = this.account;
        this.$GlobalService.globalQueryModel.fsecQAT.fsecQ = this.selectedQuestion.name;
        this.$GlobalService.globalQueryModel.fsecQAT.fsecA = this.inputQuestion;
        // this.$GlobalService.globalQueryModel.fsecQAT.key = this.account;
        this.$CommonDataService.fsecQAT().then((res: Result) => {
          if (res.success === 0) {
            this.isStep1 = false;
            this.isStep2 = false;
            this.isStep3 = true;
            this.isStep4 = false;
            this.validKey = res.data.validKey;
            this.$GlobalService.globalQueryModel.resetPsw.validKey = this.validKey;
          }
        });
      }

    }
  }
  // 重置密码提交
  resetPwd() {
    // console.log(111);
    if (!this.password) {
      this.modal.open({
        message: '请输入密码！',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      return;
    }
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{7,11}$/;
    if (!reg.test(this.password)) {
      this.modal.open({
        message: '密码为8~12位字母和数字组合！',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      return;
    }
    if (!this.ensurePwd) {
      this.modal.open({
        message: '请输入确认密码！',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      return;
    }
    if (this.password !== this.ensurePwd) {
      this.modal.open({
        message: '密码不一致！',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      return;
    }
    this.$GlobalService.globalQueryModel.resetPsw.fNewPassWord = this.password;
    this.$GlobalService.globalQueryModel.resetPsw.fNewPassWord2 = this.ensurePwd;
    // this.$GlobalService.globalQueryModel.resetPsw.validKey = this.validKey;
    this.$CommonDataService.resetPsw().then((res: Result) => {
      if (res.success === 0) {
        this.isStep1 = false;
        this.isStep2 = false;
        this.isStep3 = false;
        this.isStep4 = true;
      }
    });
  }
  login() {
    this.$Router.navigate(['']);
    this.$GlobalMethodsService.loginOPenWindow();
  }
  changeType(data) {
    // console.log(data);
    this.selectedQuestion = data.value;
  }
  toggleClass(key) {
    if (key === 1) {
      this.isShowPwd = !this.isShowPwd;
    }
    if (key === 2) {
      this.isShowEnsurePwd = !this.isShowEnsurePwd;
    }
  }
  // 判断密码强度
  checkPwdStrength() {
    // console.log(this.progress);
    if (this.password.length > 5 && this.password.length <= 8) {
      this.progress = 1;
    } else if (this.password.length > 8 && this.password.length <= 10) {
      this.progress = 2;
    } else if (this.password.length > 10 && this.password.length <= 12) {
      this.progress = 3;
    } else {
      this.progress = 0;
    }
  }
}
