import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import Swiper from 'swiper';
import {SelectItem} from 'primeng/api';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonDataService} from '../../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../../../core-module/common-util/result';
import {Dropdown} from 'primeng/primeng';
// 网银储蓄卡
@Component({
  selector: 'app-companys-wycxk',
  templateUrl: './companys-wycxk.component.html',
  styleUrls: ['./companys-wycxk.component.scss']
})
export class CompanysWycxkComponent implements OnInit, OnChanges {
  @Input() listStr;
  oldUrl = null;
  onLine;
  isCompany = 0;
  isDiscounts;
  cities1: SelectItem[] = [];
  selectedCity1: any;
  heepaydata;
  urlLink;
  layerShow = false;
  whichBlock = null;
  orderNo;
  cities2: SelectItem[] = [];
  selectedCity2: any;
  modal = window['modal'];
  imgSrc;
  placeHolder = '请输入金额';
  moneyArr = [];
  isMoneyWarnShow = false;
  warnTxt;
  restrictionType;
  selectMoneyArr = [];
  selectKey = 0;
  showDepositusername = '';
  wYcxkDepositusername = '';
  constructor(public $CommonDataService: CommonDataService,
              public $GlobalService: GlobalService,
              public $GlobalMethodsService: GlobalMethodsService,
              public router: Router,
              private $ActivatedRoute: ActivatedRoute
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(this.listStr);
    if (this.listStr && this.listStr.paychannel) {
      this.$GlobalService.globalQueryModel.getPayType.payChannel = this.listStr.paychannel;
      this.showDepositusername = this.listStr.showDepositusername;
      this.getPayType();
    }
  }
  ngOnInit() {
  }

  getPayType() {
    this.$CommonDataService.getPayType().then((res: Result) => {
      // 循环付款方式
      this.cities1 = res.data.resutl;
      // 设置初始值
      this.selectedCity1 = this.cities1[0];
      this.$GlobalService.globalQueryModel.heepay.payPlatFormId = this.selectedCity1.payPlatFormId;
      this.$GlobalService.globalQueryModel.heepay.paynum = this.selectedCity1.number;
      // 获取存款区间
      this.restrictionType = this.selectedCity1.restrictionType;
      this.$GlobalService.globalQueryModel.heepay.amount = null;
      this.isDiscounts = false;
      this.isMoneyWarnShow = false;
      if (this.selectedCity1.restrictionType === 3) {
        // 范围限制
        this.moneyArr = this.selectedCity1.restrictionMoney.split(',');
        if (this.moneyArr.length > 1) {
          this.placeHolder = this.moneyArr[0] + '元至' + this.moneyArr[1] + '元';
        } else {
          this.placeHolder = '请输入金额';
        }
      } else if (this.selectedCity1.restrictionType === 2) {
        // 只能输入固定金额
        this.moneyArr = this.selectedCity1.restrictionMoney.split(',');
        this.selectMoneyArr = [];
        this.moneyArr.forEach((item) => {
          this.selectMoneyArr.push({
            label: item,
            value: item
          });
        });
        this.$GlobalService.globalQueryModel.heepay.amount = this.moneyArr[0];
        this.discount();
      } else {
        // 不做任何限制，通过maxMoery和minMoery来判断范围
        this.moneyArr = [];
        this.moneyArr.push(this.selectedCity1.minMoery);
        this.moneyArr.push(this.selectedCity1.maxMoery);
        this.placeHolder = this.moneyArr[0] + '元至' + this.moneyArr[1] + '元';
      }
    });
  }

  // 在线入款点击
  companyList(item, i) {
    // this.$GlobalMethodsService.clearFilter(d);
    this.$GlobalService.globalQueryModel.getPayType.payChannel = item.paychannel;
    this.isCompany = i;
    this.selectKey = 0;
    // this.$CommonDataService.mcashgsrk().then((res: Result) => {
    //   // 控制tab切换

    // });
    this.getPayType();
  }

  // 付款方式选择
  changeType(item, index) {
    // 获取存款区间
    // console.log(item);
    this.selectKey = index;
    this.restrictionType = item.restrictionType;
    this.$GlobalService.globalQueryModel.heepay.amount = null;
    this.isDiscounts = false;
    this.isMoneyWarnShow = false;
    if (item.restrictionType === 3) {
      // 从范围限制
      this.moneyArr = item.restrictionMoney.split(',');
      if (this.moneyArr.length > 1) {
        this.placeHolder = this.moneyArr[0] + '元至' + this.moneyArr[1] + '元';
      } else {
        this.placeHolder = '请输入金额';
      }
    } else if (item.restrictionType === 2) {
      // 只能输入固定金额
      this.moneyArr = item.restrictionMoney.split(',');
      this.selectMoneyArr = [];
      this.moneyArr.forEach((ele) => {
        this.selectMoneyArr.push({
          label: ele,
          value: ele
        });
      });
      this.$GlobalService.globalQueryModel.heepay.amount = this.moneyArr[0];
      this.discount();
    } else {
      // 不做任何限制
      this.moneyArr = [];
      this.moneyArr.push(item.minMoery);
      this.moneyArr.push(item.maxMoery);
      this.placeHolder = this.moneyArr[0] + '元至' + this.moneyArr[1] + '元';
    }
    this.$GlobalService.globalQueryModel.heepay.paynum = item.number;
    this.$GlobalService.globalQueryModel.heepay.payPlatFormId = item.payPlatFormId;
  }

  changeAmount(event) {
    this.discount();
  }

  // 在线存款提交
  subMinHeepay() {
    if (this.isMoneyWarnShow) {
      return;
    }
    this.$GlobalService.globalQueryModel.heepay['depositusername'] = this.wYcxkDepositusername;
    this.$CommonDataService.heepay().then((res: Result) => {
      if (res.success === 0) {
        this.heepaydata = res.data;
        if (this.heepaydata.url === undefined || this.heepaydata.url === 'undefined') {
          this.modal.open({
            message: res.msg,
            confirmShow: true,
            confirmTxt: '确认',
            cancelShow: false
          });
        } else {
          this.orderNo = this.heepaydata.orderNo;
          this.layerShow = true;
          if (this.heepaydata.openType === '0' || this.heepaydata.openType === '2' || this.heepaydata.openType === '3' ||
            this.heepaydata.openType === '5' || this.heepaydata.openType === '7') {
            // 跳转第三方
            // this.whichBlock = 1;
            const payChannel = this.$GlobalService.globalQueryModel.getPayType.payChannel;
            if (payChannel === 'alipaywap') {
              this.whichBlock = 4;
            } else {
              this.whichBlock = 1;
            }
          } else if (this.heepaydata.openType === '1') {
            this.whichBlock = 3;
            const base64 = this.encode(this.heepaydata.url);
            // this.imgSrc = '/ag/' + 'cash/zfscanpay/getQRcode.action?code_url=' + base64 + '&isbase64=1';
            this.imgSrc = '/ag/ms/api/uc/getQrcode?url=' + base64 + '&base64=true';
          } else if (this.heepaydata.openType === '4' || this.heepaydata.openType === '6') {
            this.whichBlock = 3;
            this.imgSrc = this.heepaydata.url;
          }
        }
      }
    });
  }

  // 选择优惠
  discount() {
    const amount = this.$GlobalService.globalQueryModel.heepay.amount;
    this.isMoneyWarnShow = false;
    // 输入的非法数字
    if (this.restrictionType !== 2) {
      if (parseFloat(amount).toString() === 'NaN') {
        this.isMoneyWarnShow = true;
        this.warnTxt = '请输入正确金额';
        return;
      }
      if (parseFloat(amount) < parseFloat(this.moneyArr[0])) {
        this.isMoneyWarnShow = true;
        this.warnTxt = `*存款金额应处于${this.moneyArr[0]}到${this.moneyArr[1]}之间`;
        return;
      }
      if (parseFloat(amount) > parseFloat(this.moneyArr[1])) {
        this.isMoneyWarnShow = true;
        this.warnTxt = `*存款金额应处于${this.moneyArr[0]}到${this.moneyArr[1]}之间`;
        return;
      }
    }

    this.$GlobalService.globalQueryModel.getAppDiscount.amount = amount;
    this.$GlobalService.globalQueryModel.getAppDiscount.payChannel = this.$GlobalService.globalQueryModel.getPayType.payChannel;
    this.$CommonDataService.getAppDiscount().then((res: Result) => {
      if (res.discounts === undefined) {
        return;
      }
      this.isDiscounts = true;
      this.cities2 = [];
      res.discounts.forEach(item => {
        this.cities2.push(
          {label: `${item.msg}`, value: {bankaccount: `${item.number}`}},
        );
      });
      // 设置初始值
      this.selectedCity2 = this.cities2[0];
      this.$GlobalService.globalQueryModel.heepay.isfavorable = this.selectedCity2.value.bankaccount;
    });
  }

  // 选择优惠
  IsChangeType(event) {
    this.$GlobalService.globalQueryModel.heepay.isfavorable = event.value.bankaccount;
  }

  // 关闭弹窗
  closeLayer() {
    this.layerShow = false;
    // 刷新页面
    this.$GlobalService.globalQueryModel.heepay.amount = null;
    this.isDiscounts = false;
    this.getPayType();
  }

  // 支付确定按钮
  payEnd() {
    // if (this.whichBlock === 1) {
    //   window.open(this.heepaydata.url);
    // }
    window.open(this.heepaydata.url);
    this.whichBlock = 2;
  }

  // 查看订单
  toLookOrder() {
    this.layerShow = false;
    setTimeout(() => {
      this.router.navigate(['/tyc/index/member/accountHistory'], {relativeTo: this.$ActivatedRoute});
      this.closeLayer();
    }, 200);
  }

  // 在线客服
  openKufu() {
    this.$GlobalMethodsService.openKufu();
  }

  // base64工具函数
  encode(input) {
    let output = '';
    const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    input = this.utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  decode(input) {
    let output = '';
    const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = this.utf8_decode(output);
    return output;
  }

  utf8_encode(string) {
    string = string.replace(/\r\n/g, '\n');
    let utftext = '';
    for (let n = 0; n < string.length; n++) {
      const c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  utf8_decode(utftext) {
    let string = '';
    let i = 0;
    let c = 0, c3 = 0, c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }

  setValueReplace() {
    this.wYcxkDepositusername = document.getElementById('wycxkMoney')['value'];
  }
}
