import {Component, OnInit} from '@angular/core';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../../core-module/common-util/result';

@Component({
  selector: 'app-history-bank-card',
  templateUrl: './history-bank-card.component.html',
  styleUrls: ['./history-bank-card.component.scss']
})
export class HistoryBankCardComponent implements OnInit {
  list = [];
  index;
  selectBankName;
  isShowList = true;
  isBankHistoryList = true;
  isUsdtHistoryList = true;

  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
  }

  ngOnInit() {
    this.bankLists();
  }

  clickDelUserBankCard(bankid) {
    this.$GlobalService.globalQueryModel.delUserBankCard.bankid = bankid;
    this.$CommonDataService.delUserBankCard().then((res: Result) => {
      if (res.success === '0' || res.success === 0) {
        this.bankLists();
      }
    });
  }

  // 修改
  historyCard(i) {
    this.index = this.$GlobalService.globalQueryModel.updCard;
    this.index.bankId = this.list[i].id;
    this.index.city = this.list[i].city;
    this.index.province = this.list[i].province;
    this.index.branch = this.list[i].branch;
    this.index.accountnum = this.list[i].updUserbanknum;
    this.index.bankName = this.list[i].bankname;
    // 将银行卡的名字传到子组件
    this.selectBankName = this.index.bankName;
    if (this.list[i].banktype === '0') {
      this.isShowList = false;
      this.isBankHistoryList = false;
    } else {
      this.isShowList = false;
      this.isUsdtHistoryList = false;
    }
  }

  bankLists() {
    this.$GlobalService.globalQueryModel.getAppBankLists.state = -1;
    this.$CommonDataService.getAppBankLists().then((res: Result) => {
      if (res.success === 1) {
        this.$GlobalMethodsService.showTopCenter(res.msg);
      }
      this.list = res.data || [];
    });
  }

  changListData(event) {
    this.isBankHistoryList = event.isShow;
    this.isUsdtHistoryList = event.isShow;
    this.isShowList = true;
    this.bankLists();
  }
}
