import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import  dayjs from 'dayjs';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {Result} from '../../../../../../core-module/common-util/result';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.component.html',
  styleUrls: ['./vip.component.scss']
})
export class VipComponent implements OnInit {

  giftType: {id: 0, name: '全部'}
  startTime
  endTime
  giftTypes:SelectItem[] = [
    {label: '全部', value: {id: 0, name: '全部'}},
    {label: '升级礼金', value: {id: 1, name: '升级礼金'}},
    {label: '周俸禄', value: {id: 2, name: '周俸禄'}},
    {label: '节日礼金', value: {id: 3, name: '节日礼金'}}
  ];
  // 日期
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };
  hideGroup: boolean = false
  tableHeaderList = [
    {label: '', width: 12.5},
    {label: '级别', width: 12.5},
    {label: '累计存款', width: 12.5},
    {label: '累计投注', width: 12.5},
    {label: '升级礼金', width: 12.5},
    {label: '周入款', width: 12.5},
    {label: '周俸禄', width: 12.5},
    {label: '节日礼金', width: 12.5}
  ];
  tableHeaderList1 = [
    {label: '订单号', width: 12.5},
    {label: '日期', width: 10},
    {label: '礼金类型', width: 9},
    {label: '等级名称', width: 6},
    {label: '彩金', width: 6},
    {label: '状态', width: 6},
    {label: '备注', width: 20},
  ];
  vipInfo = {
      "myLevel": {
          "audittype": null,
          "bannerh5": null,
          "bannerpc": null,
          "cid": 0,
          "depamount": 0,
          "festaudit": null,
          "festbonus": 0,
          "festbtn": null,
          "id": 0,
          "levelaudit": null,
          "levelbonus": 0,
          "levelbtn": null,
          "levelid": 0,
          "levelname": "",
          "status": null,
          "type": 0,
          "validamount": 0,
          "weekaudit": null,
          "weekbonus": 0,
          "weekbtn": null,
          "weekdep": 0
      },
      "nextLevel": {
          "audittype": null,
          "bannerh5": null,
          "bannerpc": null,
          "cid": 0,
          "depamount": 0,
          "festaudit": null,
          "festbonus": 0,
          "festbtn": null,
          "id": 0,
          "levelaudit": null,
          "levelbonus": 0,
          "levelbtn": null,
          "levelid": 0,
          "levelname": "",
          "status": null,
          "type": 0,
          "validamount": 0,
          "weekaudit": null,
          "weekbonus": 0,
          "weekbtn": null,
          "weekdep": 0
      },
      "control": {
          "levelSwitch": 0,
          "festBtn": 0,
          "weekBtn": 0,
          "levelBtn": 0,
          "festSwitch": 0,
          "bannerH5": "",
          "bannerPC": "",
          "weekSwitch": 0
      },
      "user": {
          "amount": 0,
          "amountMore": 0,
          "level": 0,
          "recharge": 0,
          "rechargeMore": 0
      },
      "switch": 1
  }
  depositPercent = 0
  betPercent = 0
  giftRecords:[] = []
  detailImgUrl = "";
  showDetailImg = false;
  yhNum = 3;
  yhDsj;
  isYh = true;
  // 分页
  pageData = new PageData()
  rectCurrentPage = 1
  isQueryLoading = false
  isReloadLoading = false
  imgUrl

  constructor(
      public $GlobalService: GlobalService,
      private $CommonDataService: CommonDataService,
      private $GlobalMethodsService: GlobalMethodsService,
    ) { 
    this.endTime = new Date();
    this.startTime = this.getDateStr(-6);
    this.$GlobalService.globalQueryModel.myGiftRecordQuery.dateStart =
      dayjs(this.startTime).format('YYYY-MM-DD')+'+'+'00:00:00';
    this.$GlobalService.globalQueryModel.myGiftRecordQuery.dateEnd =
      dayjs(this.endTime).format('YYYY-MM-DD')+'+'+'23:59:59';
  }

  ngOnInit() {
    this.$GlobalService.globalQueryModel.myGiftRecordQuery.page = 1
    this.$CommonDataService.getVipInfo().then((res: Result) => {
      if(res.success == 1) return
      if(res.data){
        this.vipInfo = res.data
        this.depositPercent = 250 * this.vipInfo.user.recharge / (this.vipInfo.user.recharge + this.vipInfo.user.rechargeMore)
        this.betPercent = 250 * this.vipInfo.user.amount / (this.vipInfo.user.amount + this.vipInfo.user.amountMore)
      }
      
    })
    this.myGiftRecords()
  }
  closeYh(){
    this.isYh = true;
    clearInterval(this.yhDsj);
  }
  nGetVipInfo(){
    this.$CommonDataService.getVipInfo().then((res: Result) => {
      if(res.success == 1) return
      if(res.data){
        this.vipInfo = res.data
        this.depositPercent = 250 * this.vipInfo.user.recharge / (this.vipInfo.user.recharge + this.vipInfo.user.rechargeMore)
        this.betPercent = 250 * this.vipInfo.user.amount / (this.vipInfo.user.amount + this.vipInfo.user.amountMore)
      }
      
    })
  }
  selectDate() {
    const startTime = new Date(this.startTime).getTime();
    const endTime = new Date(this.endTime).getTime();
    if (endTime < startTime) {
      this.$GlobalMethodsService.showTopCenter('结束日期不得早于开始日期');
      return
    }
    this.$GlobalService.globalQueryModel.myGiftRecordQuery.dateStart =
      dayjs(this.startTime).format('YYYY-MM-DD HH:mm:ss');
    this.$GlobalService.globalQueryModel.myGiftRecordQuery.dateEnd =
      dayjs(this.endTime).format('YYYY-MM-DD HH:mm:ss');
  }

  giftTypeChange() {
    this.$GlobalService.globalQueryModel.myGiftRecordQuery.bounsType = this.giftType.id
  }
  //获取vip信息
  getVipInfo(){
    this.$CommonDataService.getVipInfo().then((res: Result) => {
      if(res.success == 1) return
      this.vipInfo = res.data
      this.depositPercent = 250 * this.vipInfo.user.recharge / (this.vipInfo.user.recharge + this.vipInfo.user.rechargeMore)
      this.betPercent = 250 * this.vipInfo.user.amount / (this.vipInfo.user.amount + this.vipInfo.user.amountMore)
      this.imgUrl = this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc' + this.vipInfo.control.bannerPC
    })
  }

  openDetailImg(url){
    if(this.vipInfo.control.bannerPC){
      this.detailImgUrl = url;
      this.showDetailImg = true;
    }
  }

  addZero(n){
    if(n%1===0){
      n = n+'.00'
    }
    return n
  }

  closeDetailImg(){
    this.showDetailImg = false;
  }

  // 获取当前日期前后
  getDateStr(AddDayCount) {
    const dd = new Date(this.endTime);
    dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1; // 获取当前月份的日期
    const d = dd.getDate();
    return new Date(y + '-' + m + '-' + d);
  }

  //更新等级
  reloadVipLevel() {
    this.isReloadLoading = true
    this.$CommonDataService.reloadVipLevel().then((res: Result) => {
      this.isReloadLoading = false
      this.$GlobalMethodsService.showTopCenter(res.msg);
      this.nGetVipInfo()
    })
  }

  //领取升级礼金
  getUpgradeGift() {
    if(this.vipInfo.control.levelBtn == 0){
      this.$GlobalMethodsService.showTopCenter('不可领取');
      return
    }
    this.$CommonDataService.getUpgradeGift().then((res: Result) => {
      // if(res.success == 0) this.$GlobalMethodsService.showTopCenter(res.msg);
      if(res.success == 0){
        this.isYh = false;
        this.yhDsj =  setInterval(()=>{
          this.yhNum = this.yhNum -1;
          if(this.yhNum == 0){
            this.isYh = true;
            this.yhNum = 3;
            clearInterval(this.yhDsj)
          }
        },1000)
        this.nGetVipInfo()
      }else{
        this.$GlobalMethodsService.showTopCenter(res.msg);
      }
    })
  }

  //领取节日礼金
  getFestivalGift() {
    if(this.vipInfo.control.festBtn == 0){
      this.$GlobalMethodsService.showTopCenter('不可领取');
      return
    }
    this.$CommonDataService.getFestivalGift().then((res: Result) => {
      if(res.success == 0){
        this.isYh = false;
        this.yhDsj =  setInterval(()=>{
          this.yhNum = this.yhNum -1;
          if(this.yhNum == 0){
            this.isYh = true;
            this.yhNum = 3;
            clearInterval(this.yhDsj)
          }
        },1000)
        this.nGetVipInfo()
      }else{
        this.$GlobalMethodsService.showTopCenter(res.msg);
      }
    })
  }

  //领取周俸禄
  getWeekGift() {
    if(this.vipInfo.control.weekBtn == 0){
      this.$GlobalMethodsService.showTopCenter('不可领取');
      return
    }
    this.$CommonDataService.getWeekGift().then((res: Result) => {
      // if(res.success == 0) this.$GlobalMethodsService.showTopCenter(res.msg);
      if(res.success == 0){
        this.isYh = false;
        this.yhDsj =  setInterval(()=>{
          this.yhNum = this.yhNum -1;
          if(this.yhNum == 0){
            this.isYh = true;
            this.yhNum = 3;
            clearInterval(this.yhDsj)
          }
        },1000)
        this.nGetVipInfo()
      }else{
        this.$GlobalMethodsService.showTopCenter(res.msg);
      }
    })
  }

  //我的礼金记录
  myGiftRecords() {
    this.isQueryLoading = true
    this.$CommonDataService.myGiftRecords().then((res: Result) => {
      this.isQueryLoading = false
      if(res.success == 1) return
      this.giftRecords = res.data
      this.pageData.total = Math.ceil(res.total / this.$GlobalService.globalQueryModel.myGiftRecordQuery.pageSize)
    })
  }
  // 分页逻辑
  addCurrentPage(page, type?) {
    if (this.pageData.goPage > this.pageData.total) {
      this.$GlobalMethodsService.showTopCenter('目标页面超过总页数，请重新输入');
      this.pageData.goPage = null;
      return;
    }
    if (type === 0 && !this.pageData.goPage) {
      this.$GlobalMethodsService.showTopCenter('请输入要跳转的页面');
      return;
    }
    this.pageData.currentPage = parseInt(page, 10) ? parseInt(page, 10) : 1;
    if(this.pageData.currentPage == this.$GlobalService.globalQueryModel.myGiftRecordQuery.page) return
    this.$GlobalService.globalQueryModel.myGiftRecordQuery.page = this.pageData.currentPage;
    this.myGiftRecords();
  }
}
class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}
