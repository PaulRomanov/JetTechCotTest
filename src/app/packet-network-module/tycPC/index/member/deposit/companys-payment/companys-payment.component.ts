import {Component, DoCheck, OnInit} from '@angular/core';
import Swiper from 'swiper';
import {MenuItem, SelectItem} from 'primeng/api';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {Result} from '../../../../../../core-module/common-util/result';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';
import $ from 'jquery';
import { ActivatedRoute,ParamMap } from '@angular/router';
@Component({
  selector: 'app-companys-payment',
  templateUrl: './companys-payment.component.html',
  styleUrls: ['./companys-payment.component.scss']
})
export class CompanysPaymentComponent implements OnInit, DoCheck {
  oldUrl = null;
  underLineName;
  items: MenuItem[];
  cities1: SelectItem[] = [];
  cities2: SelectItem[] = [];
  selectedCity2: any;
  isCompany = 0;
  panyNameCode;
  address;
  saveDe;
  serial;
  getBank;
  isMoneyWarnShow = false;
  warnTxt;
  suMinBankid;
  isDocount = false;
  cBankaccount;
  cAccountnum;
  isCode = false;
  isUSDT = false;
  isNoTradeId = false;
  // 存款成功字段
  paytime;
  mach = { minamount: '', maxamount: '', serial: '' };
  subBank;
  suBankid;
  subBankName;
  subNum;
  subBankaccount;
  xnbBalance;
  // 显示步骤
  indexShow = 0;
  serialNumber = 0;
  isLoad = false;
  selectKey = 0;
  hasUploadImage = false;
  isDisabled = true;
  clipboard = window['ClipboardJS'];
  modal = window['modal'];
  ispecialType = false;
  specialDepositData = {};
  specialQcode = '';
  defaultPlaceHolder ;
  limitType = 1;
  limitAmount = [];
  usdtObj;
  usdtArr;
  dRate;
  nowbankname;
  isWYCXK = false;
  listStr;
  paychannel;
  itemData;
  clickIndex;
  isShowName = false;
  yhNum = 3;
  yhDsj;
  isYh = true;
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    private route:ActivatedRoute,
  ) {
    this.$GlobalService.globalQueryModel.saveDeposite.money = '';
    this.$GlobalService.globalQueryModel.saveDeposite.depositusername = '';
  }

  ngOnInit() {
    this.paychannel = this.route.snapshot.paramMap.get('paychannel');
    this.items = [
      {label: '填写存款资料'},
      {label: '确认存款申请'},
      {label: '提交成功'}
    ];

    //网银储蓄卡bug
    setTimeout( ()=>{
      if(this.underLineName){
        let itemArr = this.underLineName
        for(var i=0;i<itemArr.length; i++){
          if(itemArr[i].paychannel==this.paychannel){
            this.itemData = itemArr[i]
          }
        }
        let item = this.itemData
        // 网银储蓄卡 start
        if (item && item.WYCXK === 'wycxk') {
          this.companyList(this.paychannel,0,item)
          // return;
        } else {
          this.isWYCXK = false;
        }
      // 网银储蓄卡 end
      }
    })
  }

  ngDoCheck(): void {
    // 监听公司入款
    if (this.oldUrl !== this.$GlobalService.globalQueryModel.getPayListData) {
      this.oldUrl = this.$GlobalService.globalQueryModel.getPayListData;
      if (Object.keys(this.oldUrl).length !== 0) {
        this.underLineName = this.oldUrl.underLine;
        // 获取公司入款第一个支付
        // this.$GlobalService.globalQueryModel.mcashgsrk.code = this.underLineName[0].paychannel;
        this.$GlobalService.globalQueryModel.mcashgsrk.code = this.paychannel;
        this.$CommonDataService.mcashgsrk().then((res: Result) => {
          // 控制tab切换
          this.indexShow = 0;
          this.mach = res.data;
          this.panyNameCode = res.data.payTypeSets[0];
          this.serial = res.data.serial;
          this.paytime = res.data.paytime;
          this.$GlobalService.globalQueryModel.preloadBankList.bigtype = res.data.payTypeSets[0].bigType;
          this.$GlobalService.globalQueryModel.preloadBankList.banktype = this.panyNameCode.code;
          this.subBankName = this.panyNameCode.payName;
          // 如果是银行卡则 不获取子账户
          if (this.panyNameCode.bigType === '1') {
            if (this.panyNameCode.bigType === '1' && this.panyNameCode.code === '4') {
              // 如果是网银转账获取子账户
              this.isCode = false;
              this.mcahgsrkList('');
              return;
            }
            this.isCode = true;
          } else {
            // 获取公司入款子账户
            this.isCode = false;
            this.mcahgsrkList('');
          }
          if (this.panyNameCode.bigType === '3') {
            this.ispecialType = true;
          } else {
            this.ispecialType = false;
          }
          if (this.panyNameCode.bigType === '2') {
            this.isShowName = true;
          } else {
            this.isShowName = false;
          }
        });
        setTimeout(() => {
          const mySwiper = new Swiper('#topNav', {
            freeMode: true,
            freeModeMomentumRatio: 0.5,
            slidesPerView: 'auto',
          });
          const swiperWidth = mySwiper.el.clientWidth;
          const maxTranslate = mySwiper['maxTranslate']();
          const maxWidth = -maxTranslate + swiperWidth / 2;
          mySwiper.on('tap', function () {
            if (!this.clickedIndex) {
              return;
            }
            const slide = mySwiper.slides[this.clickedIndex];
            const slideLeft = slide.offsetLeft;
            const slideWidth = slide.clientWidth;
            const slideCenter = slideLeft + slideWidth / 2;
            // 被点击slide的中心点
            mySwiper.setTranslate(300);
            if (slideCenter < swiperWidth / 2) {
              mySwiper.setTranslate(0);
            } else if (slideCenter > maxWidth) {
              mySwiper.setTranslate(maxTranslate);
            } else {
              const nowTlanslate = slideCenter - swiperWidth / 2;
              mySwiper.setTranslate(-nowTlanslate);
            }
          });
        });
      }

    }
  }

  // 公司入款点击
  companyList(paychannel, i, item?) {
  
    // 网银储蓄卡 start
    if (item && item.WYCXK === 'wycxk') {
      this.isWYCXK = true;
      this.listStr = item;
      this.isCompany = i;
      this.selectKey = 0;
      return;
    } else {
      this.isWYCXK = false;
    }
    this.warnTxt = ""
    this.$GlobalService.globalQueryModel.saveDeposite.money = "";
    // 网银储蓄卡 end
    // this.$GlobalMethodsService.clearFilter(d);
    this.selectKey = 0;
    this.isMoneyWarnShow = false;
    this.$GlobalService.globalQueryModel.mcashgsrk.code = paychannel;
    this.$CommonDataService.mcashgsrk().then((res: Result) => {
      // this.cBankaccount = res.data.username;
      // 控制tab切换
      this.indexShow = 0;
      this.serialNumber = 0;
      this.mach = res.data;
      this.isCompany = i;
      this.serial = res.data.serial;
      this.paytime = res.data.paytime;
      this.panyNameCode = res.data.payTypeSets[0];
      this.$GlobalService.globalQueryModel.preloadBankList.bigtype = res.data.payTypeSets[0].bigType;
      this.subBankName = this.panyNameCode.payName;

      // 如果是银行卡则 不获取子账户
      if (res.data.payTypeSets[0].bigType === '1') {
        if (res.data.payTypeSets[0].bigType === '1' && res.data.payTypeSets[0].code === '4') {
          // 如果是网银转账获取子账户
          this.isCode = false;
          // 获取公司入款子账户
          this.mcahgsrkList(paychannel);
          return;
        }
        this.isCode = true;
        this.defaultPlaceHolder = '存款金额' + this.mach.minamount + '元-' + this.mach.maxamount + '元';
        const moneyValue = this.$GlobalService.globalQueryModel.saveDeposite.money;
        this.isMoneyWarnShow = true;
        if (parseFloat(moneyValue) < parseFloat(this.mach['minamount'])) {
          // 小于最低存款金额
          this.warnTxt = `*存款金额应处于${this.mach['minamount']}到${this.mach['maxamount']}之间`;
        } else if (parseFloat(moneyValue) > parseFloat(this.mach['maxamount'])) {
           // 大于最低存款金额
          this.warnTxt = `*存款金额应处于${this.mach['minamount']}到${this.mach['maxamount']}之间`;
        } else if (parseFloat(moneyValue).toString() === 'NaN') {
          this.warnTxt = '请输入正确金额';
        } else {
          this.isMoneyWarnShow = false;
          this.isDisabled = this.$GlobalService.globalQueryModel.saveDeposite.depositusername ? false : true;
        }
      } else {
        this.isCode = false;
        // 获取公司入款子账户
        this.mcahgsrkList(paychannel);
      }
      if (this.panyNameCode.bigType === '3') {
        this.ispecialType = true;
      } else {
        this.ispecialType = false;
      }
      if (this.panyNameCode.bigType === '2') {
        this.isShowName = true;
      } else {
        this.isShowName = false;
      }
    });
  }

  // 点击获取收款子账户
  mcahgsrkList(isClickCode) {
    // 如果是入款点击从点击事件取值, 否则从上一个接口取值
    if (isClickCode !== '') {
      this.panyNameCode.code = isClickCode;
    }
    // 获取公司入款子银行
    this.$GlobalService.globalQueryModel.preloadBankList.banktype = this.panyNameCode.code;
    this.$CommonDataService.preloadBankList().then((res: Result) => {
      // 循环付款方式
      this.cities1 = res.data;
      if(res.data2.isBlock==true){
        this.isUSDT = true;
        
        this.usdtObj = res.data[0];
        this.usdtArr = res.data;
        // let arr = []
        // for(let i=0;i<res.data.length;i++){
        //   arr.push(res.data[i].accountnum)
        // }
        // this.usdtArr = arr;
        this.dRate = res.data2.dRate;
      }else{
        this.isUSDT = false;
      }
        // 首次加载默认选择第一个支付
        this.cBankaccount = res.data[0].bankaccount;
        this.cAccountnum = res.data[0].accountnum;
        this.$GlobalService.globalQueryModel.getBanklist.bankid2 = res.data[0].id;
        
        // 根据limitType值判断placeHolder
        this.limitType = res.data[0].limitType;
        this.limitAmount = res.data[0].limitAmount.split(',');
        if (this.limitType === 1) {
          // 若limintype值为1，提示语置灰显示—存款金额XXX元-XXX元（此处范围值取自“maxamount"和“minamount"）
          if(this.isUSDT && res.data[0].limitAmount==""){
            this.defaultPlaceHolder = ""
          }else{
            this.defaultPlaceHolder = '存款金额' + this.mach.minamount + '元-' + this.mach.maxamount + '元';
          }
          
        } else if (this.limitType === 2) {
          // 若limintype值为2，提示语置灰显示—存款金额XXX元-XXX元（此处范围值取自“limitAmount”）
          this.defaultPlaceHolder = '存款金额' + this.limitAmount[0] + '元-' + this.limitAmount[1] + '元';
        } else {
          // 若limintype值为3，提示语置灰显示—存款金额XXX元，XXX元，XXX元……（此处范围值取自“limitAmount”）
          this.defaultPlaceHolder = '';
          // const limitAmount = res.data[0].limitAmount.split(',');
          this.limitAmount.forEach((item, index) => {
            if (index === this.limitAmount.length - 1) {
              this.defaultPlaceHolder += item + '元' ;
            } else {
              this.defaultPlaceHolder += item + '元，';
            }
          });
          this.defaultPlaceHolder = '存款金额' + this.defaultPlaceHolder;
          // console.log( this.defaultPlaceHolder);
        }
      
      
    });
  }

  // 付款方式选择
  changeType(item, index) {
    this.selectKey = index;
    this.cBankaccount = item.bankaccount;
    this.cAccountnum = item.accountnum;
    this.nowbankname = item.bankname;
    this.$GlobalService.globalQueryModel.getBanklist.bankid2 = item.id;
    // 根据limitType值判断placeHolder
    this.limitType = item.limitType;
    this.limitAmount = item.limitAmount.split(',');
    if (this.limitType === 1) {
      // 若limintype值为1，提示语置灰显示—存款金额XXX元-XXX元（此处范围值取自“maxamount"和“minamount"）
      // this.defaultPlaceHolder = '存款金额' + this.mach.minamount + '元-' + this.mach.maxamount + '元';
      if(this.isUSDT && item.limitAmount==""){
        this.defaultPlaceHolder = ""
      }else{
        this.defaultPlaceHolder = '存款金额' + this.mach.minamount + '元-' + this.mach.maxamount + '元';
      }
    } else if (this.limitType === 2) {
      // 若limintype值为2，提示语置灰显示—存款金额XXX元-XXX元（此处范围值取自“limitAmount”）
      this.defaultPlaceHolder = '存款金额' + item.limitAmount.split(',')[0] + '元-' + item.limitAmount.split(',')[1] + '元';
    } else {
      // 若limintype值为3，提示语置灰显示—存款金额XXX元，XXX元，XXX元……（此处范围值取自“limitAmount”）
      this.defaultPlaceHolder = '';
      // const limitAmount = item.limitAmount.split(',');
      this.limitAmount.forEach((ele, i) => {
        if (i === this.limitAmount.length - 1) {
          this.defaultPlaceHolder += ele + '元' ;
        } else {
          this.defaultPlaceHolder += ele + '元，';
        }
      });
      this.defaultPlaceHolder = '存款金额' + this.defaultPlaceHolder;
    }
    this.nextName(this.$GlobalService.globalQueryModel.saveDeposite.money);
  }

  // 获取优惠
  discount(mach) {
    this.yhNum = 3;
    this.nextName(mach);
    if (!mach) {
      this.isDocount = false;
      return;
    }
    if (this.isMoneyWarnShow) {
      return;
    }
    if(this.isUSDT){
      let gb = this.$GlobalService.globalQueryModel.saveDeposite.money/this.dRate;
      // let nb= Math.pow(10, 2);
      // this.xnbBalance = this.returnFloat(Math.ceil(gb * nb) / nb);
      // return
      this.xnbBalance = Math.round(gb*100)/100
    }

    // this.isDocount = true;
    this.$GlobalService.globalQueryModel.getAppDiscount.amount = mach;
    // this.$GlobalService.globalQueryModel.getAppDiscount.stype = '1';
    this.$GlobalService.globalQueryModel.getAppDiscount.payChannel = this.$GlobalService.globalQueryModel.mcashgsrk.code;
    this.$CommonDataService.getAppDiscount().then((res: Result) => {
      if (res.success === 1) {
        this.isDocount = false;
      } else {
        if(res.msg == "NO_DATA"){
          this.isDocount = false;
          this.isYh = false;
          this.yhDsj =  setInterval(()=>{
            this.yhNum = this.yhNum -1;
            if(this.yhNum == 0){
              this.isYh = true;
              this.yhNum = 3;
              clearInterval(this.yhDsj)
            }
          },1000)
        }else{
          this.isDocount = true;
          // 每次选择初始化
          this.cities2 = [];
          res.discounts.forEach(item => {
            this.cities2.push(
              {label: `${item.msg}`, value: {bankaccount: `${item.number}`}},
            );
          });
          // 设置初始值
          this.selectedCity2 = this.cities2[0];
          this.$GlobalService.globalQueryModel.saveDeposite.ckyh = this.selectedCity2.value.bankaccount;
        }
      }
    });
  }
  closeYh(){
    this.isYh = true;
    clearInterval(this.yhDsj);
  }
  // 选择优惠
  deChangeType(event) {
    // console.log(event);
    this.$GlobalService.globalQueryModel.saveDeposite.ckyh = event.value.bankaccount;
  }

  // 公司存款下一步
  nextCompany() {
    // 如果没有输入指定金额下一步return
    if (this.isMoneyWarnShow) {
      return;
    }

    // 输入制定金额下一步
    this.isLoad = !this.isLoad;
    if (this.panyNameCode.bigType === '3') {
      // 如果是励扬支付宝扫码或者励扬网银转账，调用另外一个接口
      const currentDeposite = {
        serial: this.mach.serial,
        ckyh: this.$GlobalService.globalQueryModel.saveDeposite.ckyh,
        money: this.$GlobalService.globalQueryModel.saveDeposite.money,
        bankid: this.$GlobalService.globalQueryModel.getBanklist.bankid2,
        paytype: this.panyNameCode.code,
        depositusername: this.$GlobalService.globalQueryModel.saveDeposite.depositusername
      };
      this.$GlobalService.globalQueryModel.saveCompanyDeposite = Object.assign({}, this.$GlobalService.globalQueryModel.saveCompanyDeposite, currentDeposite);
      this.$CommonDataService.saveCompanyDeposite().then((res: Result) => {
        this.isLoad = !this.isLoad;
        if (res.success === 0) {
          this.specialDepositData = res.data;
          this.serialNumber = 1;
          if (this.panyNameCode.code === '21' || this.panyNameCode.code === '23') {
            // 励扬支付宝扫码
            this.indexShow = 1;
            const base64 = this.encode(res.data.payCode);
            this.specialQcode = '/ag/ms/api/uc/getQrcode?url=' + base64 + '&base64=true';
          } else if (this.panyNameCode.code === '22') {
            // 励扬网银转账
            this.indexShow = 2;
          }
        }
      });
    } else if(!this.isUSDT){
      this.$GlobalService.globalQueryModel.getBanklist.paytype = this.$GlobalService.globalQueryModel.preloadBankList.banktype;
      this.$GlobalService.globalQueryModel.getBanklist.banktype = this.$GlobalService.globalQueryModel.preloadBankList.bigtype;
      this.$CommonDataService.getBanklist().then((res: Result) => {
        this.isLoad = !this.isLoad;
        this.serialNumber = 1;
        // 控制tab切换 转账indexShow =2 扫码 indexShow =1 usdt indexShow=4
        if(this.isUSDT == true){
          this.indexShow = 4;
        }else if (this.$GlobalService.globalQueryModel.getBanklist.banktype !== '0') {
          this.indexShow = 2;
        } else {
          this.indexShow = 1;
        }
        this.getBank = res.data;
        // 设置loading
        this.getBank.forEach(item => {
          item.isLoad = false;
        });
        // 是否只返回单个支付
        // if (this.getBank.length === 1) {
        //   this.suMinBankid = this.getBank[0].bankid;
        // }
      });
    }
    if(this.isUSDT){
      let gb = this.$GlobalService.globalQueryModel.saveDeposite.money/this.dRate;
      // let nb= Math.pow(10, 2);
      // this.xnbBalance = this.returnFloat(Math.ceil(gb * nb) / nb);
      this.xnbBalance = Math.round(gb*100)/100
      this.isLoad = !this.isLoad;
      this.indexShow = 4;
      this.getBank = [{"isLoad":false,"bankname":"","address":"","bankaccount":"","bankid":""}]
      this.$GlobalService.globalQueryModel.getBanklist.paytype = this.$GlobalService.globalQueryModel.preloadBankList.banktype;
    }
    this.warnTxt = ""
  }
  returnFloat(value){
    var num = Math.round(parseFloat(value) * 100) / 100+"";
    var s = num.toString().split(".");
    if(s.length== 1){
      num = num.toString() + ".00";
      return num;
    }
    if (s.length > 1) {
      if (s[1].length < 2) {
        num = num.toString() + "0";
      }
      return num;
    }
  }
  showImage(){
    this.hasUploadImage = true;
    var file = $('#upload').get(0).files[0];
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    this.$GlobalService.globalQueryModel.saveDepositeImage = formData;
        //创建用来读取此文件的对象
            var reader = new FileReader();
        //使用该对象读取file文件
            reader.readAsDataURL(file);
        //读取文件成功后执行的方法函数
            reader.onloadend=function(e){
        //读取成功后返回的一个参数e，整个的一个进度事件
                // console.log(e);
        //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
      //的base64编码格式的地址
          $('#imgshow').get(0).src = e.target["result"];
  }
}

  subMinCode(item) {
    if(this.isUSDT){
      this.$GlobalService.globalQueryModel.saveDeposite.depositusername = document.getElementById('depositusername')['value'];
      let name = this.$GlobalService.globalQueryModel.saveDeposite.depositusername;
      // console.log(!isNaN(name))
      // if(name==""||name.length!=6||isNaN(name)){
      if(name==""||name.length!=6){
        this.isNoTradeId = true;
        this.warnTxt = '请输入正确的交易ID';
        return
      }else{
        this.warnTxt = '';
      }
    }
    
    item.isLoad = !item.isLoad;
    // 存款完成展示
    this.subBank = item.bankname;
    this.address = item.address;
    this.subBankaccount = item.bankaccount;
    // 确认存款
    const submUrl = this.$GlobalService.globalQueryModel.saveDeposite;
    submUrl.bankid = item.bankid;
    // 银行卡 选择对应ID 其实就是bankid
    // if (submUrl.bankid === undefined) {
    //   submUrl.bankid = item.bankid;
    // }
    submUrl.paytype = this.$GlobalService.globalQueryModel.getBanklist.paytype;
    if(this.isUSDT){
      this.$GlobalService.globalQueryModel.saveDeposite.bankid = this.usdtArr[this.selectKey].id
    }
    submUrl.serial = this.serial;
    this.$CommonDataService.saveDeposite().then((res: Result) => {
      item.isLoad = !item.isLoad;
      if (res.success === 0) {
        this.indexShow = 3;
        this.serialNumber = 2;
      }
      this.saveDe = res.data;
      // 因后台转账返回收款账号字段不一致，因此需要判断banktype返回值 订单详情中展示收款账号
      // if (this.$GlobalService.globalQueryModel.getBanklist.banktype === '2') {
      //   this.subNum = this.suMinBankid = this.getBank[0].num;
      // }
      // 存款账号
      if (item.btype === '1') { // 网银转账
        this.subNum = item.accountnum;
      } else { // 其他
        this.subNum = item.num;
      }
    });
  }
  submitSpecial() {
    this.isLoad = !this.isLoad;
    this.$GlobalService.globalQueryModel.submitOrCancelOrder.type = this.specialDepositData['type'];
    this.$GlobalService.globalQueryModel.submitOrCancelOrder.orderNo = this.specialDepositData['orderNo'];
    if(this.isUSDT){
      this.$GlobalService.globalQueryModel.submitOrCancelOrder.type == "1";
      // this.$GlobalService.globalQueryModel.submitOrCancelOrder.orderNo
      
    }
    this.$CommonDataService.submitOrCancelOrder().then((res: Result) => {
      this.isLoad = !this.isLoad;
      if (res.success === 0) {
          this.indexShow = 3;
          this.serialNumber = 2;
          this.subBank = this.specialDepositData['otherName'];
          this.subNum = this.specialDepositData['accountInfo'];
          this.subBankaccount = this.specialDepositData['accountInfoName'];
      }
    });
  }
  nextName(moneyValue) {
    this.isMoneyWarnShow = true;
    this.isDisabled = true;
    if (this.limitType === 1) {
      
      if(this.isUSDT && this.limitAmount[0]==[""]){
        this.warnTxt = "需要您支付"+1*this.dRate+this.usdtObj.bankname=="CNYB"?"CNYB":"USDT";
        this.isDisabled = false;
        this.isMoneyWarnShow = false;
        return
      }
      if (parseFloat(moneyValue) < parseFloat(this.mach['minamount'])) {
        // 小于最低存款金额
        this.warnTxt = `*存款金额应处于${this.mach['minamount']}到${this.mach['maxamount']}之间`;
      } else if (parseFloat(moneyValue) > parseFloat(this.mach['maxamount'])) {
         // 大于最低存款金额
        this.warnTxt = `*存款金额应处于${this.mach['minamount']}到${this.mach['maxamount']}之间`;
      } else if (parseFloat(moneyValue).toString() === 'NaN') {
        this.warnTxt = '请输入正确金额';
      } else {
        this.isMoneyWarnShow = false;
        if(this.isUSDT){
          this.isDisabled = false;
        }else{
          this.isDisabled = this.$GlobalService.globalQueryModel.saveDeposite.depositusername ? false : true;
        }
        
      }
    } else if (this.limitType === 2) {
      // 若limintype值为2，提示语置灰显示—存款金额XXX元-XXX元（此处范围值取自“limitAmount”）
      // this.defaultPlaceHolder = '存款金额' + item.limitAmount.split(',')[0] + '元-' + item.limitAmount.split(',')[1] + '元';
      if (parseFloat(moneyValue) < parseFloat(this.limitAmount[0])) {
        // 小于最低存款金额
        this.warnTxt = `*存款金额应处于${this.limitAmount[0]}到${this.limitAmount[1]}之间`;
      } else if (parseFloat(moneyValue) > parseFloat(this.limitAmount[1])) {
         // 大于最大存款金额
         this.warnTxt = `*存款金额应处于${this.limitAmount[0]}到${this.limitAmount[1]}之间`;
      } else if (parseFloat(moneyValue).toString() === 'NaN') {
        this.warnTxt = '请输入正确金额';
      } else {
        this.isMoneyWarnShow = false;
        if(this.isUSDT){
          this.isDisabled = false;
        }else{
          this.isDisabled = this.$GlobalService.globalQueryModel.saveDeposite.depositusername ? false : true;
        }
        
      }
    } else if ( this.limitType === 3) {
      // 若limintype值为3，提示语置灰显示—存款金额XXX元，XXX元，XXX元……（此处范围值取自“limitAmount”）
      this.warnTxt = '';
      let isHasAvailableValue = false;
      this.limitAmount.forEach((ele, i) => {
        if (i === this.limitAmount.length - 1) {
          this.warnTxt += ele + '元' ;
        } else {
          this.warnTxt += ele + '元，';
        }
        if (parseFloat(moneyValue) === parseFloat(ele)) {
          isHasAvailableValue = true;
        }
      });
      if (!isHasAvailableValue) {
        // 小于最低存款金额
        // this.warnTxt = `*存款金额应处于${this.limitAmount[0]}到${this.limitAmount[1]}之间`;
        this.warnTxt = '存款金额应为' + this.warnTxt;
      } else if (parseFloat(moneyValue).toString() === 'NaN') {
        this.warnTxt = '请输入正确金额';
      } else {
        this.isMoneyWarnShow = false;
        if(this.isUSDT){
          this.isDisabled = false
        }else{
          this.isDisabled = this.$GlobalService.globalQueryModel.saveDeposite.depositusername ? false : true;
        }
      }
    }
  }
  
  setValueReplace() {
    this.warnTxt = ""
    this.$GlobalService.globalQueryModel.saveDeposite.money = document.getElementById('saveDepositeMoney')['value'];
    if(this.isUSDT && this.limitAmount[0]==[""]){

    }else{
      this.$GlobalService.globalQueryModel.saveDeposite.depositusername = document.getElementById('depositusername')['value'];
    }
    this.nextName(this.$GlobalService.globalQueryModel.saveDeposite.money);
  }
  copyBankaccount(item, index) {
    const currentId = '#bankaccount' + (index + 1);
    const clipboard = new this.clipboard(currentId);
    clipboard.on('success', (e) => {
      this.modal.open({
        message: '复制成功',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      e.clearSelection();
    });
    clipboard.on('error', (e) => {
      this.modal.open({
        message: '复制失败，请重新复制',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      e.clearSelection();
    });
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
}
