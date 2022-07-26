import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonDataService} from '../../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../../core-module/common-util/global-service';
import {Result} from '../../../../../../../core-module/common-util/result';
import {Router} from '@angular/router';

@Component({
  selector: 'pc-up-bank-card',
  templateUrl: './up-bank-card.component.html',
  styleUrls: ['./up-bank-card.component.scss']
})
export class UpBankCardComponent implements OnInit, OnChanges {
  cities1 = [];
  selectedCity1: string = '';
  isShow;
  isLoad;
  @Input() data = [];
  @Input() getSelect; // 父组件点击修改的银行名
  @Input() isSHowBankInfo = false;
  @Input() isSHowUsdtInfo = false;
  @Output() isSHowBankInfoChange = new EventEmitter();
  isShowBankLists;
  isShowUsdtLists;
  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $router: Router
  ) {
  }

  ngOnInit() {
    // 银行卡管理查询公司银行卡
    this.$CommonDataService.getValidReceiptsbBankList().then((res: Result) => {
      // 循环付款方式
      res.data.forEach(item => {
        this.cities1.push(
          {label:  `${item.bankname}`, value: `${item.bankname}`},
        );
      });
      // this.$GlobalService.globalQueryModel.addCard.bankname = this.cities1[0].value.name;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.getSelect) {
      this.selectedCity1 = this.getSelect;
    }
  }

// 银行卡选择
  changeType(event) {
    this.$GlobalService.globalQueryModel.updCard.bankName = event.value;
  }

  // 提交银行卡
  clickAddCard() {
    this.isLoad = !this.isLoad;
    this.$CommonDataService.updCard().then((res: Result) => {
      this.isLoad = !this.isLoad;
      this.isShowBankLists = true;
      this.isSHowBankInfoChange.emit({isShow: this.isShowBankLists});
    });
  }
  clickCancelCard() {
    this.isShowBankLists = true;
    this.isShowUsdtLists = true;
    this.isSHowBankInfoChange.emit({isShow: this.isShowBankLists});
  }
}
