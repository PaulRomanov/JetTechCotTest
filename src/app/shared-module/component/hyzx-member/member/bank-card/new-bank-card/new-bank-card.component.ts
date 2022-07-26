import {Component, OnInit} from '@angular/core';
import {MenuItem, SelectItem} from 'primeng/api';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {Result} from '../../../../../../core-module/common-util/result';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new-bank-card',
  templateUrl: './new-bank-card.component.html',
  styleUrls: ['./new-bank-card.component.scss']
})
export class NewBankCardComponent implements OnInit {
  cities1: SelectItem[] = [];
  selectedCity1: any;
  isShow = false;
  isLoad;
  payWays = [
    {
      label: '银行卡',
      value: {
        name: 'bank',
        val: '0'
      }
    },
    {
      label: 'USDT-ERC20',
      value: {
        name: 'USDT-ERC20',
        val: '1'
      }
    },
    {
      label: 'USDT-TRC20',
      value: {
        name: 'USDT-TRC20',
        val: '2'
      }
    },
    // {
    //   label: 'CNYB',
    //   value: {
    //     name: 'CNYB',
    //     val: '3'
    //   }
    // }
  ];
  selectedPayWay = { name: 'bank', val: '0' };

  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private  $router: Router,
    private $ActivatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // 银行卡是否完善省市支行开关
    this.$CommonDataService.getFullInfoSwtich().then((res: Result) => {
      if (res.success !== '0000011') {
        this.isShow = true;
      }
    });
    // 银行卡管理查询公司银行卡
    this.$CommonDataService.getValidReceiptsbBankList().then((res: Result) => {
      // 循环付款方式
      this.cities1 = [];
      res.data.forEach(item => {
        this.cities1.push(
          {label: `${item.bankname}`, value: {name: `${item.bankname}`}},
        );
      });
      // 设置初始值
      this.selectedCity1 = this.cities1[0];
      this.$GlobalService.globalQueryModel.addCard.bankname = this.selectedCity1.value.name;
      this.$GlobalService.globalQueryModel.addCard.banktype = '0';
    });
  }
  // 收款方式选择
  changePayType(event) {
    console.log(event)
    this.$GlobalService.globalQueryModel.addCard.accountnum = '';
    this.$GlobalService.globalQueryModel.addCard.branch = '';
    this.$GlobalService.globalQueryModel.addCard.city = '';
    this.$GlobalService.globalQueryModel.addCard.province = '';
    if (event.value.name === 'USDT-ERC20') {
      this.$GlobalService.globalQueryModel.addCard.bankname = 'USDT-ERC20';
    }
    if (event.value.name === 'USDT-TRC20') {
      this.$GlobalService.globalQueryModel.addCard.bankname = 'USDT-TRC20';
    }
    if (event.value.name === 'CNYB') {
      this.$GlobalService.globalQueryModel.addCard.bankname = 'CNYB';
    }
    this.$GlobalService.globalQueryModel.addCard.banktype = event.value.val;
  }
// 银行卡选择
  changeType(event) {
    this.$GlobalService.globalQueryModel.addCard.bankname = event.value.name;
  }
  // 提交银行卡
  clickAddCard() {
    this.isLoad = !this.isLoad;
    this.$CommonDataService.addCard().then((res: Result) => {
      this.isLoad = !this.isLoad;
      if (res.success === 0 || res.success === '0') {
        // 清空新增银行卡数据
        this.$GlobalService.globalQueryModel.addCard.accountnum = '';
        this.$GlobalService.globalQueryModel.addCard.branch = '';
        this.$GlobalService.globalQueryModel.addCard.city = '';
        this.$GlobalService.globalQueryModel.addCard.province = '';
        // this.$router.navigate(['/ly/index/ly-member/bankCard/commonBank']);
        this.$router.navigate(['../commonBank'], { relativeTo: this.$ActivatedRoute });
      }
    });
  }
}
