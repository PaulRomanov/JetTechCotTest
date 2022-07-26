import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import dayjs from 'dayjs';
import { Result } from '../../../../../../core-module/common-util/result';
import { GlobalMethodsService } from '../../../../../../core-module/common-methods/global-methods.service';
import { CommonDataService } from '../../../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../../../core-module/common-util/global-service';
@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {
  cities1: SelectItem[] = [
    { label: '全部日期', value: { id: 0, name: '全部日期' } },
    { label: '最近一周', value: { id: 1, name: '最近一周' } },
    { label: '最近30天', value: { id: 2, name: '最近30天' } },
    { label: '最近90天', value: { id: 3, name: '最近90天' } }
  ];
  // 日期
  modal = window['modal'];
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };
  selectedCity1: any;
  dataStartTime;
  isHide = 0;
  topUser = [];
  underReportList: any = [];
  dataEndTime;
  // 弹窗显示隐藏
  isPopup = false;
  temArr: any = []; // 下线直属 / 非直属
  upAccount;
  // 弹窗值
  popup = {
    account: 0,
    createTime: 0,
    cashback: 0,
    delegatePercent: 0,
    userCount2nd: 0,
    userCountTotal: 0,
    setdepositOffer: 0,
    setregister: 0,
    setyharchive: 0,
    setother: 0,
    childdepositOffer: 0,
    childsetregister: 0,
    childsetyharchive: 0,
    childsetother: 0,
    setreturnPriv: 0,
    childreturnPriv: 0,
  };
  childrenTotal = [];
  selfTotal = [];
  tableData = {
    starttime: null,
    endtime: null
  };
  isLoad = false;
  constructor(public $GlobalMethodsService: GlobalMethodsService,
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService) { }

  ngOnInit() {
    // 赋值初始值
    this.$GlobalService.globalQueryModel.dataReport.memberName = '';
    this.selectedCity1 = this.cities1[1].value;
    this.dataEndTime = new Date();
    this.dataStartTime = this.getDateStr(-6);
    this.tableData.starttime = dayjs(this.dataStartTime).format('YYYY-MM-DD');
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    this.$GlobalService.globalQueryModel.dataReport.startdate = this.tableData.starttime;
    this.$GlobalService.globalQueryModel.dataReport.enddate = this.tableData.endtime;
    // 推广赚钱  统计报表
    this.isLoad = true;
    this.searchReport();
  }
  // 获取当前日期前后
  getDateStr(AddDayCount) {
    const dd = new Date(this.dataEndTime);
    dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1; // 获取当前月份的日期
    const d = dd.getDate();
    return new Date(y + '-' + m + '-' + d);
  }
  // 查询日期
  dataTimeChange(event, type) {
    if (event.value.id === 0) {
      this.dataStartTime = this.getDateStr(-1000);
      this.tableData.starttime = dayjs(this.getDateStr(-1000)).format('YYYY-MM-DD');
    } else if (event.value.id === 1) {
      this.dataStartTime = this.getDateStr(-6);
      this.tableData.starttime = dayjs(this.getDateStr(-6)).format('YYYY-MM-DD');
    } else if (event.value.id === 2) {
      this.dataStartTime = this.getDateStr(-30);
      this.tableData.starttime = dayjs(this.getDateStr(-30)).format('YYYY-MM-DD');
    } else if (event.value.id === 3) {
      this.dataStartTime = this.getDateStr(-90);
      this.tableData.starttime = dayjs(this.getDateStr(-90)).format('YYYY-MM-DD');
    }

  }
  // 查询用户数据
  querySerach(num) {
    const startTime = new Date(this.dataStartTime).getTime();
    const endTime = new Date(this.dataEndTime).getTime();
    if (endTime < startTime) {
      this.modal.open({
        message: '结束日期不得早于开始日期',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    this.tableData.starttime = dayjs(this.dataStartTime).format('YYYY-MM-DD');
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    this.$GlobalService.globalQueryModel.dataReport.startdate = this.tableData.starttime;
    this.$GlobalService.globalQueryModel.dataReport.enddate = this.tableData.endtime;
    if (num === 1) {
      // 表示直接点击的搜索按钮
      this.$GlobalService.globalQueryModel.dataReport.userid = '';
    }
    // 推广赚钱  统计报表
    this.isLoad = true;
    this.searchReport();
  }
  // 弹窗数据
  // account  会员账号
  // createTime 激活时间
  // cashback 已领取奖励
  // delegatePercent 提成比例
  // userCount2nd 直属会员
  // userCountTotal-userCount2nd 非直属会员
  // depositOffer+register+yharchive+other 优惠金额自身 && 下线
  // returnPriv 返水金额自身&& 下线

  thisItem(topUser, selfTotal, childrenTotal) {
    this.popup = {
      account: topUser.account ? topUser.account : 0,
      createTime: topUser.createTime ? topUser.createTime : 0,
      cashback: topUser.cashback ? topUser.cashback : 0,
      delegatePercent: topUser.delegatePercent ? topUser.delegatePercent : 0,
      userCount2nd: topUser.userCount2nd ? topUser.userCount2nd : 0,
      userCountTotal: topUser.userCountTotal ? topUser.userCountTotal : 0,
      setdepositOffer: selfTotal.depositOffer ? selfTotal.depositOffer : 0,
      setregister: selfTotal.register ? selfTotal.register : 0,
      setyharchive: selfTotal.yharchive ? selfTotal.yharchive : 0,
      setother: selfTotal.other ? selfTotal.other : 0,
      childdepositOffer: childrenTotal.depositOffer ? childrenTotal.depositOffer : 0,
      childsetregister: childrenTotal.register ? childrenTotal.register : 0,
      childsetyharchive: childrenTotal.yharchive ? childrenTotal.yharchive : 0,
      childsetother: childrenTotal.other ? childrenTotal.other : 0,
      setreturnPriv: selfTotal.returnPriv ? selfTotal.returnPriv : 0,
      childreturnPriv: childrenTotal.returnPriv ? childrenTotal.returnPriv : 0
    };
    this.isPopup = true;
  }
  selectDate() {
    const startTime = new Date(this.dataStartTime).getTime();
    const endTime = new Date(this.dataEndTime).getTime();
    if (endTime < startTime) {
      this.modal.open({
        message: '结束日期不得早于开始日期',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
    }
  }
  // 搜索数据统计报表
  searchReport() {
    this.$CommonDataService.dataReport().then((res: any) => {
      this.isLoad = false;
      if (res.success !== 0 && res.success !== '0') {
        this.isHide = 1;
      } else {
        this.isHide = 0;
        // 自身数据
        this.topUser = res.data.topUser || {};
        // 会员上级账号
        this.upAccount = res.data.upAccount;
        // 自身数据详情
        this.selfTotal = res.data.selfTotal || {};
        // 自身下线数据详情
        this.childrenTotal = res.data.childrenTotal || {};
        // 下线数据
        this.underReportList = res.data.underReportList || [];
      }
    });
  }
  // 获取当前数据
  thisInputShow(item) {
    console.log(item);
    this.$GlobalService.globalQueryModel.dataReport.memberName = item.underUser.account;
    this.$GlobalService.globalQueryModel.dataReport.userid = item.underUser.uid;
    this.querySerach(2);
  }
}
