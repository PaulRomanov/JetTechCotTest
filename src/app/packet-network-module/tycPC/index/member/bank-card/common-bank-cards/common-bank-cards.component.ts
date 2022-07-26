import { Component, OnInit } from '@angular/core';
import {Result} from '../../../../../../core-module/common-util/result';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';

@Component({
  selector: 'app-common-bank-cards',
  templateUrl: './common-bank-cards.component.html',
  styleUrls: ['./common-bank-cards.component.scss']
})
export class CommonBankCardsComponent implements OnInit {
  list = [];
  modal = window['modal'];
  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) { }

  ngOnInit() {
    this.getAppBank();
  }
  clickDelUserBankCard (bankid) {
   this.$GlobalService.globalQueryModel.delUserBankCard.bankid = bankid
    this.$CommonDataService.delUserBankCard().then((res: Result) => {
      if (res.success === '0' || res.success === 0) {
        this.getAppBank();
      }
    });
  }
  getAppBank () {
    this.$GlobalService.globalQueryModel.getAppBankLists.state = 1;
    this.$CommonDataService.getAppBankLists().then((res: Result) => {
      this.list = res.data || [];
    });
  }
  thisChecked(item) {
    // console.log(item);
    // 表示此银行卡已经是默认银行卡
    if (item.isdefault === '1') {
      this.modal.open({
        message: '不可取消默认银行卡',
        confirmShow: true,
        confirmTxt: '确定',
        cancelShow: false
      });
      this.getAppBank();
    } else {
    this.$GlobalService.globalQueryModel.setCardDefault.bankid = item.id;
    this.$CommonDataService.setCardDefault().then((res: Result) => {
      if (res.success === '0' || res.success === 0) {
        this.modal.open({
          message: '设置成功',
          confirmShow: true,
          confirmTxt: '确定',
          cancelShow: false
        });
        this.getAppBank();
      }
    });
    }

  }
}
