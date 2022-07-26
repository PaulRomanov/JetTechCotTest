import { Component, OnInit } from '@angular/core';
import {Result, SpreadActiveModel} from '../../../../../../core-module/common-util/result';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';

@Component({
  selector: 'app-spread-money-detail',
  templateUrl: './spread-money-detail.component.html',
  styleUrls: ['./spread-money-detail.component.scss']
})
export class SpreadMoneyDetailComponent implements OnInit {
  spreadActiveData = new SpreadActiveModel();
  memberName = '';
  spreadMode = null;
  spreadDetailData = new SpreadActiveModel();
  spreadPercentData = new SpreadActiveModel();
  newPercent = null;
  isPercentDialogShow = false;
  percentWarning = '';
  currentData = {};
  isLoad = false;
  constructor(
    public $GlobalService: GlobalService,
    public $CommonDataService: CommonDataService
  ) { }

  ngOnInit() {
    this.$CommonDataService.getUserSpreadActiveData().then((res: Result) => {
      if (res.success === 0) {
        this.spreadActiveData = res.data;
      }
    });
    // tslint:disable-next-line:radix
    this.spreadMode = parseInt(sessionStorage.getItem('spreadMode'));
    this.isLoad = true;
    this.$CommonDataService.getSpreadDetailData().then((res: Result) => {
      this.isLoad = false;
      if (res.success === 0) {
        this.spreadDetailData = res.data;
      }
    });
  }
  searchMemberData() {
    this.isLoad = true;
    this.$GlobalService.globalQueryModel.getSpreadDetailData.memberName = this.memberName;
    this.$CommonDataService.getSpreadDetailData().then((res: Result) => {
      this.isLoad = false;
      if (res.success === 0) {
        this.spreadDetailData = res.data;
      }
    });
  }
  // 设置提成比例
  setSpreadPercent(item) {
    this.newPercent = null;
    // 如果当前用户为禁用状态的时候
    if (item.status === 2) {
      return;
    }
    // 如果当前提成比例小于或等于公司设置默认提成比例时
    if (this.spreadActiveData['delegatePercent'] <= this.spreadDetailData.companySet['minimalDelegatePercent']) {
      return;
    }
    this.currentData = item;
    this.$GlobalService.globalQueryModel.getSpreadPercent.account = item.account;
    this.$GlobalService.globalQueryModel.getSpreadPercent.userid = item.uid;
    this.$CommonDataService.getSpreadPercent().then((res: Result) => {
      if (res.success === 0) {
        this.isPercentDialogShow = true;
        this.spreadPercentData = res.data;
      }
    });
  }
  testNumber() {
    this.percentWarning = '';
    if (this.newPercent < this.spreadPercentData['minimalDelegatePercent']) {
      this.percentWarning = '设置的比例不能小于' + this.spreadPercentData['minimalDelegatePercent'] + '%';
    } else if (this.newPercent > this.spreadPercentData['maxDelegatePercent']) {
      this.percentWarning = '设置的比例不能大于' + this.spreadPercentData['maxDelegatePercent'] + '%';
    } else {
      this.percentWarning = '';
    }
  }
  closeSpreadPercentDialog() {
    this.isPercentDialogShow = false;
  }
  postSpreadPercentData() {
    if (!this.newPercent) {
      this.percentWarning = '设置的比例不能为空';
      return;
    }
    if (this.newPercent < this.spreadPercentData['minimalDelegatePercent']) {
      this.percentWarning = '设置的比例不能小于' + this.spreadPercentData['minimalDelegatePercent'] + '%';
      return;
    }
    if (this.newPercent > this.spreadPercentData['maxDelegatePercent']) {
      this.percentWarning = '设置的比例不能小于' + this.spreadPercentData['minimalDelegatePercent'] + '%';
      return;
    }
    //   $scope.setSpreadPercentData(
    //     itemData.uid,
    //     itemData.status,
    //     $scope.newPercent,
    //     itemData.delegatePercent
    // );
    this.$GlobalService.globalQueryModel.setSpreadPercentData = Object.assign(this.$GlobalService.globalQueryModel.setSpreadPercentData, {
      userid: this.currentData['uid'],
      status: this.currentData['status'],
      percent: this.newPercent,
      opercent: this.currentData['delegatePercent']
    });
    this.$CommonDataService.setSpreadPercentData().then((res: Result) => {
      if (res.success === 0) {
        this.isPercentDialogShow = false;
        this.$CommonDataService.getSpreadDetailData().then((response: Result) => {
          if (response.success === 0) {
            this.spreadDetailData = response.data;
          }
        });
      }
    });
  }
}
