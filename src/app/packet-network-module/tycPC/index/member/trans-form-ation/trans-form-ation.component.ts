import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Result } from '../../../../../core-module/common-util/result';
import { CommonDataService } from '../../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../../../core-module/common-methods/global-methods.service';

@Component({
  selector: 'app-trans-form-ation',
  templateUrl: './trans-form-ation.component.html',
  styleUrls: ['./trans-form-ation.component.scss']
})
export class TransFormAtionComponent implements OnInit {
  modal = window['modal'];
  // 一键转入
  oneKeyTransfer = false;
  // 刷新余额
  refroneKeyTransfer = false;
  // 金额转换
  isOneKeyTransfer = false;
  Transfer;
  isLoding;
  cities1: SelectItem[];
  cities2: SelectItem[];
  selectedCity1: SelectItem;
  selectedCity2: SelectItem;
  isShowIndex;
  isTeachHide = false;
  // 字母和数字
  noSpecial: RegExp = /^d*(?:.d{0,2})?$/;
  data: any;
  copyCitiesData = [];

  // 是否显示按钮
  isQbBtn = false;
  // 钱包模式
  isQbMs = true;

  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
    // 获取钱包模式
    this.getQbWalletType();
    this.cities1 = [];
    // An array of cities
    this.cities2 = [];
    this.$GlobalService.globalQueryModel.beginUserChange.balance = '';
    this.isTeachHide = localStorage.isTeachHide;
    if (!this.isTeachHide) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnInit() {
    // 账户余额
    this.$CommonDataService.allbalancelist().then((res: Result) => {
      const data = res.data;
      data.forEach(item => {
        if (item.id === '0') {
          // 主账户
          sessionStorage.setItem('totalBalanceName', item.value);
          this.$GlobalService.globalQueryModel.totalBalanceName = item.value;
        } else if (item.id === '-1') {
          // 账户余额
          sessionStorage.setItem('totalBalance', item.value);
          this.$GlobalService.globalQueryModel.totalBalance = item.value;
        }
      });
      this.isLoding = true;
      this.data = res.data.reverse().slice();
      this.$GlobalService.globalQueryModel.balancelist = this.data;
      // console.log(this.$GlobalService.globalQueryModel.balancelist);
      this.data.forEach(item => {
        if (item.id !== '-1') {
          this.copyCitiesData.push({ label: `${item.name}`, value: { id: `${item.id}`, key: `${item.key}` } });
          this.cities1.push(
            { label: `${item.name}`, value: { id: `${item.id}`, key: `${item.key}` } },
          );
          this.cities2.push(
            { label: `${item.name}`, value: { id: `${item.id}`, key: `${item.key}` } },
          );
        }
      });
      // 设置初始值
      this.selectedCity1 = this.cities1[0].value;
      this.cities2 = this.copyCitiesData.filter(item => item.value.key !== this.cities1[0].value.key);
      this.selectedCity2 = this.cities2[0].value;
      this.cities1 = this.copyCitiesData.filter(item => item.value.key !== this.cities2[0].value.key);
    });
  }

  // 刷新余额
  refreshAmount() {
    this.refroneKeyTransfer = !this.refroneKeyTransfer;
    this.$CommonDataService.allbalancelist().then((res: Result) => {
      const data = res.data;
      data.forEach(item => {
        if (item.id === '0') {
          // 主账户
          sessionStorage.setItem('totalBalanceName', item.value);
          this.$GlobalService.globalQueryModel.totalBalanceName = item.value;
        } else if (item.id === '-1') {
          // 账户余额
          sessionStorage.setItem('totalBalance', item.value);
          this.$GlobalService.globalQueryModel.totalBalance = item.value;
        }
      });
      this.data = res.data.reverse().slice();
      this.$GlobalService.globalQueryModel.balancelist = this.data;
      this.refroneKeyTransfer = !this.refroneKeyTransfer;
    });
  }

  // 一键转入
  Next(gameId, i) {
    this.oneKeyTransfer = !this.oneKeyTransfer;
    this.isShowIndex = i;
    this.$GlobalService.globalQueryModel.mainToGame.gameId = gameId;
    this.$CommonDataService.mainToGame().then((res: Result) => {
      this.Transfer = res.data;
      if (res.success === 0) {
        this.$GlobalMethodsService.showTopCenter(res.msg);
      }
      this.oneKeyTransfer = !this.oneKeyTransfer;
      this.$GlobalMethodsService.myAllbalancelist();
    });
  }
  // 额度转换
  beginUser() {
    if (!this.$GlobalService.globalQueryModel.beginUserChange.balance) {
      this.modal.open({
        message: '请输入转换金额!',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    } else {
      this.isOneKeyTransfer = !this.isOneKeyTransfer;
      console.log(this.selectedCity1, this.selectedCity2);
      this.$GlobalService.globalQueryModel.beginUserChange.fromGameName = this.selectedCity1['id'];
      this.$GlobalService.globalQueryModel.beginUserChange.toGameName = this.selectedCity2['id'];
      this.$CommonDataService.beginUserChange().then((res: Result) => {
        if (res.success === 0) {
          this.$GlobalMethodsService.showTopCenter(res.msg);
        }
        if (res.success === 1) {
          this.isOneKeyTransfer = !this.isOneKeyTransfer;
          return;
        }
        this.$GlobalMethodsService.myAllbalancelist();
        this.isOneKeyTransfer = !this.isOneKeyTransfer;
      });
    }
  }

  changeRegData(event) {
    this.$GlobalService.globalQueryModel.beginUserChange.balance = event.target.value;
  }

  // 金额转换账户选择
  filterChange(event, amount) {
    if (amount === 0) {
      this.cities2 = this.copyCitiesData.filter(item => item.value.key !== event.value.key);
    } else {
      this.cities1 = this.copyCitiesData.filter(item => item.value.key !== event.value.key);
    }
  }

  // 来回切换
  transFormChange() {
    this.cities1 = this.copyCitiesData.filter(item => item.value.key !== this.selectedCity1['key']);
    this.cities2 = this.copyCitiesData.filter(item => item.value.key !== this.selectedCity2['key']);
    const copSelect = this.selectedCity1;
    this.selectedCity1 = this.selectedCity2;
    this.selectedCity2 = copSelect;
  }
  // 关闭弹窗
  closeTeach() {
    this.isTeachHide = true;
    localStorage.isTeachHide = true;
    document.body.style.overflow = 'initial';
  }

  // 获取钱包模式
  getQbWalletType() {
    this.$CommonDataService.getWalletType().then((res: Result) => {
      if (res.success === 0) {
        if (res.data.companyWallettype === 2) { // 为双钱包模式
            this.isQbBtn = true;
          if (res.data.userWallettype === 0) {// 转账模式
            this.isQbMs = true;
          } else if (res.data.userWallettype === 1) {// 免转模式
            this.isQbMs = false;
          }
        } else {
          this.isQbBtn = false;
        }
      }
    })
  }
  // 修改钱包模式
  upDateWalletType(type) {
    // 处理选中后重复点击
    if (type === 0 && this.isQbMs) {
      return;
    } else if (type === 1 && !this.isQbMs) {
      return;
    }
    this.$GlobalService.globalQueryModel.upDateWalletType.wallettype = type;
    this.$CommonDataService.upDateWalletType().then((res: Result) => {
      if (res.success === 0) {
        this.isQbMs = !this.isQbMs;
        if(this.isQbMs) {
          this.$GlobalMethodsService.showTopCenter('已关闭钱包免转模式');
        } else {
          this.$GlobalMethodsService.showTopCenter('已开启钱包免转模式');
        }
      }
    })
  }
}

interface City {
  name: string;
  code: string;
}

