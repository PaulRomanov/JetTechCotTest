import {Component, OnInit} from '@angular/core';
import {Result} from '../../../../../../core-module/common-util/result';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';


@Component({
  selector: 'app-spread-money-brokerage',
  templateUrl: './spread-money-brokerage.component.html',
  styleUrls: ['./spread-money-brokerage.component.scss']
})
export class SpreadMoneyBrokerageComponent implements OnInit {
  modal = window['modal'];
  peroidList = [];
  selectedPeroid: SpreadModel = new SpreadModel();
  memberName: string = '';
  isShowDialog = false;
  title = '直属下级会员输赢详情：';
  index;
  peroidData: any = {};
  winningCountList = [];
  winningCountListObj: any = {};
  vipuserName = '';
  isLoad = false;
  listDetailsOf2nd = [];
  listDetailsOfOther = [];
  constructor(
    public $GlobalService: GlobalService,
    public $CommonDataService: CommonDataService
  ) {
  }

  ngOnInit() {
    // 初始化，获取期数数据
    this.$CommonDataService.getPeriodsDisplayList().then((res: Result) => {
      if (res.success === 0) {
        this.peroidList = res.data;
        this.selectedPeroid = this.peroidList[0];
        this.peroidList.forEach((item, i) => {
          if (item.current === 1) {
            this.selectedPeroid = this.peroidList[i];
          }
        });
        this.getVipWinningList(this.selectedPeroid);
      }
    });
  }

  getVipWinningList(item?, name?) {
    this.isLoad = true;
    this.$GlobalService.globalQueryModel.getWinningList.periodid = item.id;
    // this.$GlobalService.globalQueryModel.getWinningList.status = item.status;
    this.$GlobalService.globalQueryModel.getWinningList.memberName = name ? name : '';
    this.$CommonDataService.getWinningList().then((msg: Result) => {
      this.isLoad = false;
      if (msg.success === 0) {
        this.vipuserName = msg.data.account;
        this.peroidData = msg.data.period;
        this.winningCountList = msg.data.winningCountList;
        this.winningCountListObj = this.winningCountList[0] ? this.winningCountList[0] : new SpreadModel();
        this.listDetailsOf2nd = [];
        this.listDetailsOfOther = [];
        if (this.winningCountList.length > 0) {
          // 直属输赢详情、费用详情列表
          this.listDetailsOf2nd = this.winningCountListObj.listDetailsOf2nd;
          // 非直属退佣详情
          this.listDetailsOfOther = this.winningCountListObj.listDetailsOfOther;
        }
      }
    });
  }

  dataChange(event) {
    this.selectedPeroid = event.value;
    this.getVipWinningList(event.value);
  }

  querySerach() {
    if (!this.memberName) {
      this.modal.open({
        message: '请输入会员账号',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    this.getVipWinningList(this.selectedPeroid, this.memberName);
  }

  showDetail(key) {
    this.isShowDialog = true;
    this.index = key;
    if (key === 1) {
      this.title = '直属下级会员输赢详情：';
    }
    if (key === 2) {
      this.title = '直属下级会员费用详情：';
    }
    if (key === 3) {
      this.title = '非直属下级会员退佣详情：';
    }
  }

  hideDialog() {
    this.isShowDialog = false;
  }

  setState(state) {
    let str = '';
    if (state === 0) {
      str = '未处理';
    } else if (state === 1) {
      str = '未达门槛';
    } else if (state === 2) {
      str = '退佣';
    } else if (state === 3) {
      str = '挂账';
    } else if (state === 4) {
      str = '清账';
    } else if (state === 5) {
      str = '未达佣金资格';
    }
    return str;
  }
  // 公共方法：计算各项之和
  count(list, keyword) {
    let total = 0;
    list.forEach((item, index) => {
      total += parseFloat(item[keyword]);
    });
    return total;
  }
}

class SpreadModel {
  periodname: any = '';
  starttime: any = '';
  endtime: any = '';
  account: any = '';
  auditerid: any = '';
  auditername: any = '';
  audittime: any = '';
  cid: any = '';
  commFee: any = '';
  commission2nd: any = '';
  commissionAvailable: any = '';
  commissionCount: any = '';
  commissionOther: any = '';
  commissionPercent: any = '';
  commissioned: any = '';
  effectiveUser: any = '';
  id: any = '';
  managementFee: any = '';
  netProfit: any = '';
  periodid: any = '';
  remark: any = '';
  remarktime: any = '';
  resultAmount: any = '';
  savetime: any = '';
  status: any = '';
  uid: any = '';
}
