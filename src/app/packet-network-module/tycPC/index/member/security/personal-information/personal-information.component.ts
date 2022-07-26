import {Component, OnInit} from '@angular/core';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../../core-module/common-util/result';
import  dayjs from 'dayjs';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  refroneKeyTransfer;
  data;
  grades;
  isModify = false;
  level;
  inFo = {
    realname: null,
    mobile: null,
    mail: null,
    userbankpassword: null
  };
  gloBal;
  isEmail = false;
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };

  dateTimeStr = '';
  companyId;

  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
    const timeStr = new Date();
    this.dateTimeStr = `1970:${timeStr.getFullYear()}`;
    this.$GlobalService.globalQueryModel.setInfo.birthday = new Date();
    this.gloBal = this.$GlobalService.globalQueryModel.setInfo;
  }

  ngOnInit() {
    // 检测用户是否符合首次出款修改手机号
    // alert(1)
    this.$CommonDataService.modifyPhoneCheck().then((modify: Result) => {
      if (modify.data.modify === true) {
        this.isModify = true;
      }
    });
    this.getInfoName();
    this.companyId = this.$GlobalService.globalQueryModel.companyId;
  }

  Preservation() {
    this.refroneKeyTransfer = !this.refroneKeyTransfer;
    this.$GlobalService.globalQueryModel.setInfo.birthday =
      dayjs(this.$GlobalService.globalQueryModel.setInfo.birthday).format('YYYY-MM-DD');
    this.$CommonDataService.setInfo().then((res: Result) => {
      this.data = res.data;
      this.refroneKeyTransfer = !this.refroneKeyTransfer;
      if (res.success === 0) {
        this.$GlobalMethodsService.showTopCenter(res.msg);
        this.$CommonDataService.accountLevel().then((result: Result) => {
          const letName = this.$GlobalService.globalTipsModelModel;
          letName.grades = result.data;
          this.level = 0;
          this.level = letName.grades.mail === 0 ? this.level + 1 : this.level;
          this.level = letName.grades.mobile === 0 ? this.level + 1 : this.level;
          this.level = letName.grades.realname === 0 ? this.level + 1 : this.level;
          this.level = letName.grades.securityquestion === 0 ? this.level + 1 : this.level;
          this.level = letName.grades.userbankpassword === 0 ? this.level + 1 : this.level;
          this.level > 4 ? (this.level = '高') : this.level > 2 ? (this.level = '中') : (this.level = '低');
          letName.level = this.level;
        });
        this.getInfoName();
      }
    });
  }

  getInfoName() {
    this.$CommonDataService.getUserInfo().then((res: Result) => {
      this.inFo = res.data;
      this.gloBal = this.$GlobalService.globalQueryModel.setInfo;
      // 真实姓名
      this.gloBal.realname = this.inFo['realname'];
      // 性别
      this.gloBal.sex = this.inFo['sex'];
      // 手机号码
      this.gloBal.mobile = this.inFo['mobile'];
      // 出生年月
      this.gloBal.birthday = this.inFo['birthday'] ? this.inFo['birthday'] : this.$GlobalService.globalQueryModel.setInfo.birthday;
      // 电子邮箱
      this.gloBal.email = this.inFo['mail'];
      // 微信
      this.gloBal.qq = this.inFo['qq'];
      // 所在地区
      this.gloBal.address = this.inFo['diqu'];
      // 取款密码
      this.gloBal.withdrawpwd = this.inFo['userbankpassword'];
    });
  }

  rexEmail() {
    const rex = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$');
    if (rex.test(this.$GlobalService.globalQueryModel.setInfo.email)) {
      this.isEmail = true;
      console.log(this.isEmail);
    } else {
      this.isEmail = false;
    }
  }

  changeRegData(event) {
    this.$GlobalService.globalQueryModel.setInfo.email = event.target.value;
  }

  changeRegDataQQ(event) {
    this.$GlobalService.globalQueryModel.setInfo.qq = event.target.value;
  }
  changeRegDataPassword(event) {
    this.$GlobalService.globalQueryModel.setInfo.withdrawpwd = event.target.value;
  }
  changeRegDataMobile(event) {
    this.$GlobalService.globalQueryModel.setInfo.mobile = event.target.value;
  }
  changeRegDataName(event) {
    this.$GlobalService.globalQueryModel.setInfo.realname = event.target.value;
  }
}
