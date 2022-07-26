import { Component, OnInit } from '@angular/core';
import jQ from 'jquery';
import { Result } from '../../../../core-module/common-util/result';
// import { CommonMethods } from '../../../../core-module/common-methods/common-methods';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import { environment } from 'src/environments/environment';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';

@Component({
  selector: 'pc-favourable-con',
  templateUrl: './favourable-con.component.html',
  styleUrls: ['./favourable-con.component.scss']
})
export class FavourableConComponent implements OnInit {
  initNum = 0;
  changeNum: any = '100%';
  popChangeNum: any = '50%';
  isIndex = 1;
  listHead = [];
  list = [];
  // currentData;
  // applyItemList = []; // 申请活动需要提交的数据
  // codeWarningText = ''; // 验证码提示
  // activityCode = ''; // 验证码绑定数据值
  // isDialogShow = false;
  // uuid = '';
  // codeUrl;
  modal = window['modal'];
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
  }

  ngOnInit() {
    // 头部标签
    this.$CommonDataService.getActivityPreact().then((res: Result) => {
      if (res.success === 0) {
        this.listHead = res.data;
      }

    });
    // 游戏列表
    this.$CommonDataService.getActivityData().then((res: Result) => {
      if (res.success === 0) {
        this.list = res.data;
      }

    });
  }

  selectClick(event, item, index) {
    this.isIndex = index;
    jQ('#banner-ul .active').animate(
      { left: event.currentTarget.offsetLeft + 'px' });
    // 游戏列表
    index = item.PREACTNAME === '全部' ? '' : index;
    this.$GlobalService.globalQueryModel.getActivityData.belongedact = index;
    this.$CommonDataService.getActivityData().then((res: Result) => {
      if (res.success === 0) {
        this.list = res.data;
      }
    });
  }

  mouseMoveDom(event) {
    this.initNum = event.clientX / 5000;
    this.changeNum = this.initNum + 100 + .05;
    this.popChangeNum = 50 - this.initNum;
  }

  getLogin() {
    // this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
    this.$GlobalMethodsService.loginOPenWindow();
  }
  // 点击申请入口
  // applyPort(data) {
  //   if (!this.$GlobalService.globalQueryModel.userToken) {
  //     this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon = true;
  //   } else {
  //     // $scope.activityName = data.ACTNAME;//活动名称
  //     // $scope.activityBelongedact = data.BELONGEDACT;//活动所属类型
  //     // $scope.activityId = data.ID;//活动ID
  //     this.currentData = data;
  //     // 申请活动需要提交的数据
  //     this.applyItemList = [];
  //     // 验证码提示
  //     this.codeWarningText = '';
  //     // 验证码绑定数据值
  //     this.activityCode = '';
  //     // 展示需要填写的字段
  //     if (data.INFOCONFIG) {
  //       const valueList = data.INFOCONFIG.split(',');
  //       valueList.forEach((item) => {
  //         this.applyItemList.push({
  //           name: item,
  //           value: '',
  //           warningTxt: ''
  //         });
  //       });
  //     }
  //     this.isDialogShow = true;
  //     this.codeUrl = this.syidentifying();
  //   }
  // }
  // closeDialogApply() {
  //   this.isDialogShow = false;
  // }
  // 点击查看活动详情
  checkDetail(count, data?) {
    let activityData = null;
    if (count === 1) {
      activityData = data;
    } else {
      // activityData = this.currentData;
    }
    const height = window.screen.availHeight * 0.9;
    const iLeft = (window.screen.availWidth - 1260) / 2;
    // const iTop = window.screen.availHeight * 0;
    window.open(`#/${environment.rootUrl}/newPage/activityDetail/${activityData.ID}`, '活动详情',
      `height=${height} , width=1260, top=0, left=${iLeft}, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`);
  }
  // isHasValue(key, item) {
  //   // 其他输入框失去焦点的时候
  //   if (key === 1) {
  //     if (item.value) {
  //       // 输入框限制长度50
  //       if (item.value.length > 50) {
  //         item.warningTxt = '不能超过50个字';
  //       } else {
  //         item.warningTxt = '';
  //       }
  //     } else {
  //       item.warningTxt = '必填项不可为空';
  //     }
  //   }
  //   // 验证码输入框失去焦点的时候
  //   if (key === 2) {
  //     if (this.activityCode) {
  //       this.codeWarningText = '';
  //     } else {
  //       this.codeWarningText = '必填项不可为空';
  //     }
  //   }
  // }
  // 提交数据
  // submitActivityData() {
  //   console.log(this.currentData);
  //   const list = this.applyItemList;
  //   let isCompleteData = true;
  //   for (let i = 0; i < list.length; i++) {
  //     // 如果没填
  //     if (!list[i].value) {
  //       list[i].warningTxt = '必填项不可为空';
  //       isCompleteData = false;
  //     }
  //     // 如果超过50个字
  //     if (list[i].value.length > 50) {
  //       list[i].warningTxt = '不能超过50个字';
  //       isCompleteData = false;
  //     }
  //   }
  //   if (!this.activityCode) {
  //     this.codeWarningText = '必填项不可为空';
  //     isCompleteData = false;
  //   }
  //   if (!isCompleteData) {
  //     return;
  //   }
  //   const submitconfig = JSON.stringify({
  //     root: this.applyItemList
  //   });
  //   // 最终提交数据
  //   const obj = {
  //     actname: encodeURI(this.currentData.ACTNAME) , // 活动名称
  //     belongedact: this.currentData.BELONGEDACT, // 所属类型ID
  //     submitconfig: submitconfig, // 提交数据
  //     eventId: this.currentData.ID, // 活动ID
  //     codeKey: this.uuid, // 验证码
  //     code: this.activityCode // 用户输入的验证码
  //   };
  //   const postObj = this.$GlobalService.globalQueryModel.postActivityData;
  //   this.$GlobalService.globalQueryModel.postActivityData = Object.assign(postObj, obj);
  //   this.$CommonDataService.postActivityData().then((res: Result) => {
  //     if (res.success === 0) {
  //       this.modal.open({
  //         message: '提交申请成功，请耐心等待审核！',
  //         confirmShow: true,
  //         confirmTxt: '确认',
  //         cancelShow: false
  //       });
  //       this.isDialogShow = false;
  //     } else {
  //       // console.log(res.msg);
  //     }
  //   });
  // }
    /**
   * 获取验证码
   */
  // syidentifying() {
  //   this.uuid = CommonMethods.getUuid();
  //   return `${this.$CommonDataService.dlUrl}/web/appCode.jsp?codeKey=${this.uuid}&bgColor=42,142,188`;
  // }
  // // 刷新验证码
  // refreshCode() {
  //   this.codeUrl = this.syidentifying();
  // }
}
