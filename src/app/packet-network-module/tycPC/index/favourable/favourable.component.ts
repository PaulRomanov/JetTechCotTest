import { Component, OnInit } from '@angular/core';
import jQ from 'jquery';
import { Result } from '../../../../core-module/common-util/result';
// import { CommonMethods } from '../../../../core-module/common-methods/common-methods';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';

import { ActivatedRoute } from '@angular/router';
import { CommonMethods } from '../../../../core-module/common-methods/common-methods';

@Component({
  selector: 'app-favourable',
  templateUrl: './favourable.component.html',
  styleUrls: ['./favourable.component.scss']
})
export class FavourableComponent implements OnInit {
  activityId;
  initNum = 0;
  changeNum: any = '100%';
  popChangeNum: any = '50%';
  isIndex = 1;
  listHead = [];
  list = [];
  nowIndex;
  activityDetailData = {
    ACTNAME: '',
    APPACTIMG: null,
    APPACTIVITYIMAGE: null,
    APPLYENTER: null,
    BELONGEDACT: '',
    COMMITLIMIT: '',
    ENDTIME: '',
    FLOWNUM: null,
    HACTIMG: null,
    HACTIVITYIMAGE: null,
    ID: null,
    INFOCONFIG: '',
    ISSHARED: 0,
    PCACTIMG: '',
    PCACTIVITYIMAGE: '',
    STARTTIME: '',
    SUITTYPE: ''
  };
  imgUrl = null;
  imgUrl2 = null;
  applyItemList = [];
  uuid = '';
  codeUrl;
  codeWarningText = ''; // 验证码提示
  activityCode = ''; // 验证码绑定数据值
  dark = false;
  timer;
  isShowRules = false;
  selectedData = []
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
    private $GlobalMethodsService: GlobalMethodsService,
    private $ActivatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.$ActivatedRoute.queryParams.subscribe(async queryParams=> {
      await this.fetchList()
      if(queryParams.index){
        this.selectClick(queryParams.index)
      }
   });
  }

  selectClick(index) {
    this.isIndex = index;
    if(index == 1){
      this.selectedData = [...this.list]
      return
    }
    this.selectedData = this.list.filter(item => item.BELONGEDACT == index)
  }

  async fetchList(){
    await this.$CommonDataService.getActivityPreact().then((res: Result) => {
      if (res.success === 0) {
        this.listHead = res.data;
      }
    });
    await this.$CommonDataService.getActivityData().then((res: Result) => {
      if (res.success === 0) {
        this.list = res.data;
        this.selectedData = [...this.list]
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
  checkDetail(count,i, data?) {
    this.imgUrl = '';
    this.activityDetailData = {
      ACTNAME: '',
      APPACTIMG: null,
      APPACTIVITYIMAGE: null,
      APPLYENTER: null,
      BELONGEDACT: '',
      COMMITLIMIT: '',
      ENDTIME: '',
      FLOWNUM: null,
      HACTIMG: null,
      HACTIVITYIMAGE: null,
      ID: null,
      INFOCONFIG: '',
      ISSHARED: 0,
      PCACTIMG: '',
      PCACTIVITYIMAGE: '',
      STARTTIME: '',
      SUITTYPE: ''
    };
    let activityData = null;
    if (count === 1) {
      activityData = data;
    } else {
      // activityData = this.currentData;
    } 
    this.nowIndex = i;
    const height = window.screen.availHeight * 0.9;
    const iLeft = (window.screen.availWidth - 1260) / 2;
    //   `height=${height} , width=1260, top=0, left=${iLeft}, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`);

    // this.$ActivatedRoute.params.subscribe(params => {
    //   this.activityId = params.activityId;
    // });
    this.$GlobalService.globalQueryModel.getActivityDetail.id = activityData.ID;
    this.$CommonDataService.getActivityDetail().then((res: Result) => {
      if (res.success === 0) {
        this.activityDetailData = res.data[0];
        this.imgUrl = this.activityDetailData['PCACTIVITYIMAGE'];
        this.imgUrl2 = this.activityDetailData['PCACTBIGIMAGE'];
        this.codeUrl = this.syidentifying();
        // 申请活动需要提交的数据
        this.applyItemList = [];
        // 验证码提示
        this.codeWarningText = '';
        // 验证码绑定数据值
        this.activityCode = '';
        // 展示需要填写的字段
        if (this.activityDetailData.INFOCONFIG) {
          const valueList = this.activityDetailData.INFOCONFIG.split(',');
          valueList.forEach((item) => {
            this.applyItemList.push({
              name: item,
              value: '',
              warningTxt: ''
            });
          });
        }
      }

    });
  }
  closeDetail(i){
    this.nowIndex = null;
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
   /**
* 获取验证码
*/
syidentifying() {
  this.uuid = CommonMethods.getUuid();
  return `${this.$CommonDataService.dlUrl}/web/appCode.jsp?codeKey=${this.uuid}&bgColor=42,142,188`;
}
// 刷新验证码
refreshCode() {
  this.codeUrl = this.syidentifying();
}
// 校验填写内容是否满足
isHasValue(key, item) {
  // 其他输入框失去焦点的时候
  if (key === 1) {
    if (item.value) {
      // 输入框限制长度50
      if (item.value.length > 50) {
        item.warningTxt = '不能超过50个字';
      } else {
        item.warningTxt = '';
      }
    } else {
      item.warningTxt = '必填项不可为空';
    }
  }
  // 验证码输入框失去焦点的时候
  if (key === 2) {
    if (this.activityCode) {
      this.codeWarningText = '';
    } else {
      this.codeWarningText = '必填项不可为空';
    }
  }
}
 // 提交数据
 submitActivityData() {
   const userToken = this.$GlobalService.globalQueryModel.userToken;
   if (!userToken) {
    this.modal.open({
      message: '请先登录！',
      confirmShow: true,
      confirmTxt: '确认',
      cancelShow: false
    });
    return;
   }
  const list = this.applyItemList;
  let isCompleteData = true;
  for (let i = 0; i < list.length; i++) {
    // 如果没填
    if (!list[i].value) {
      list[i].warningTxt = '必填项不可为空';
      isCompleteData = false;
    }
    // 如果超过50个字
    if (list[i].value.length > 50) {
      list[i].warningTxt = '不能超过50个字';
      isCompleteData = false;
    }
  }
  if (!this.activityCode) {
    this.codeWarningText = '必填项不可为空';
    isCompleteData = false;
  }
  if (!isCompleteData) {
    return;
  }
  const submitconfig = JSON.stringify({
    root: this.applyItemList
  });
  // 最终提交数据
  const obj = {
    actname: encodeURI(this.activityDetailData.ACTNAME) , // 活动名称
    belongedact: this.activityDetailData.BELONGEDACT, // 所属类型ID
    submitconfig: submitconfig, // 提交数据
    eventId: this.activityDetailData.ID, // 活动ID
    codeKey: this.uuid, // 验证码
    code: this.activityCode // 用户输入的验证码
  };
  const postObj = this.$GlobalService.globalQueryModel.postActivityData;
  this.$GlobalService.globalQueryModel.postActivityData = Object.assign(postObj, obj);
  this.$CommonDataService.postActivityData().then((res: Result) => {
    if (res.success === 0) {
      this.modal.open({
        message: '提交申请成功，请耐心等待审核！',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
    } else {
      // console.log(res.msg);
    }
  });
}
goToApply() {
  document.getElementById('dialog-apply').scrollIntoView(false);
}
showDetailRules() {
  this.isShowRules = true;
}
closeDetailRules() {
  this.isShowRules = false;
}
}
