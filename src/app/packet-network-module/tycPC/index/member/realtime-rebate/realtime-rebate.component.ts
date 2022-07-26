import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import { GlobalMethodsService } from '../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../core-module/common-util/result';
import  dayjs from 'dayjs';
import {SelectItem} from 'primeng/api';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-realtime-rebate',
  templateUrl: './realtime-rebate.component.html',
  styleUrls: ['./realtime-rebate.component.scss']
})
export class RealtimeRebateComponent implements OnInit {
  cities4: SelectItem[] = [
    {label: '显示5条', value: {id: 5, name: '显示5条'}},
    {label: '显示10条', value: {id: 10, name: '显示10条'}},
    {label: '显示20条', value: {id: 20, name: '显示20条'}}
  ];
  tabIndex = 0;
  ssfsTime = "";
  titleList = ["实时返水","返水记录"];
  tableList = [];
  tableList2 = [];
  tableList3 = [];
  dataStateTime;
  dataEndTime;
  cancollect;//试算记录是否可领取
  nextcaltm;//下次可进行试算的时间戳
  showDetail = false;
  countDownTime = "";//倒计时
  nowTime;
  endTime;
  t;
  // 日期
  en: any = {
    firstDayOfWeek: 0,
    dayNamesMin: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
      '十月', '十一月', '十二月'],
  };
  tableData = new TableModel();
  // 分页
  pageData = new PageData();
  isQueryLoading = false;
  constructor(
    public $GlobalService: GlobalService,
    public $CommonDataService: CommonDataService,
    public $GlobalMethodsService: GlobalMethodsService,
    public router: Router
  ) {
    this.tableData.page = 1;
    this.dataEndTime = new Date();
    this.dataStateTime = this.getDateStr(-6);
    this.tableData.starttime = dayjs(this.dataStateTime).format('YYYY-MM-DD');
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    this.tableData.pagesize = '5'; //  一页显示几条
    this.tableData.status = '0';
  }

  ngOnInit() {
    
    let arr = this.router.url.split("/");
    if(arr[arr.length-1]=="realtimeRebate"){
      this.$GlobalMethodsService.isSsfs = true
    }
    // this.$CommonDataService.ssSwitchon().then((res: Result) => {
    //   if(res.success===1){
    //     alert("未开启实时返水功能")
    //   }

    // });

    this.getPageInfo()

    // 初始化列表
    this.getAccounList();
  }

  getPageInfo(){
    this.$CommonDataService.ssResult().then((ress: Result) => {
      this.ssfsTime = ress.data.calperiods;
      this.tableList = ress.data.detail;
      this.cancollect = ress.data.cancollect;
      this.nextcaltm = ress.data.nextcaltm;
      this.nowTime = new Date().getTime();
      // this.getLocalTime(this.nextcaltm)
      // this.getLocalTime(this.nowTime)
      if(this.nextcaltm - this.nowTime > 0){
        this.getCountDown()
      }else{
        this.countDownTime = "";
      }
    });
  }

  ngOnDestroy () {
    this.$GlobalMethodsService.isSsfs = false
  }
   getLocalTime(nS) {     
		var d = new Date(parseInt(nS));    //根据时间戳生成的时间对象
		var date = (d.getFullYear()) + "-" + 
					(d.getMonth() + 1) + "-" +
					(d.getDate()) + " " + 
					(d.getHours()) + ":" + 
					(d.getMinutes()) + ":" + 
					(d.getSeconds()); 
		console.log(date);   
  }

   getCountDown(){
    
    setInterval(()=>{
        // var nowTime = new Date();
        // var endTime = new Date(timestamp * 1000);
        // var t = this.nowTime - this.nextcaltm;
//            var d=Math.floor(t/1000/60/60/24);
        this.nowTime = new Date().getTime();
        this.t = this.nextcaltm - this.nowTime;
        let hour,min,sec = null;
        hour=Math.floor(this.t/1000/60/60%24);
        min=Math.floor(this.t/1000/60%60);
        sec=Math.floor(this.t/1000%60);

        if (min < 10 && min !=0) {
          min = "0" + min;
        }else if(min == 0){
          min ="00"
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        this.countDownTime = min + ":" + sec;
    },1000);
}

  getAccounList() {
    const startTime = new Date(this.dataStateTime).getTime();
    const endTime = new Date(this.dataEndTime).getTime();
    if (endTime < startTime) {
      window['modal'].open({
        message: '结束日期不得早于开始日期',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      return;
    }
    this.isQueryLoading = true;
    this.tableData.starttime = dayjs(this.dataStateTime).format('YYYY-MM-DD');
    this.tableData.endtime = dayjs(this.dataEndTime).format('YYYY-MM-DD');
    // this.$GlobalService.globalQueryModel.getActivityDetail.id = this.activityId;
    // this.$CommonDataService.getActivityDetail().then((res: Result) => {
      this.$GlobalService.globalQueryModel.ssRecord.page = this.tableData.page;
      this.$GlobalService.globalQueryModel.ssRecord.pagesize = this.tableData.pagesize;
      this.$GlobalService.globalQueryModel.ssRecord.starttime = this.tableData.starttime;
      this.$GlobalService.globalQueryModel.ssRecord.endtime = this.tableData.endtime;
      // this.$GlobalService.globalQueryModel.ssRecord.pagesize = 900;
    this.$CommonDataService.ssRecord().then((res: Result) => {
      this.isQueryLoading = false;
      this.tableList2 = res.data;
      console.log(this.tableList2)
      this.pageData.total = Math.ceil(res.total / parseInt(this.tableData.pagesize, 10));
      // this.pageData.currentPage = this.$GlobalService.globalQueryModel.getUserAccountList.page;
    });
  }

  selectDate() {
    const startTime = new Date(this.dataStateTime).getTime();
    const endTime = new Date(this.dataEndTime).getTime();
    if (endTime < startTime) {
      window['modal'].open({
        message: '结束日期不得早于开始日期',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
    }
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

  // 分页逻辑
  addCurrentPage(page, type?) {
    if (this.pageData.goPage > this.pageData.total) {
      window['modal'].open({
        message: '目标页面超过总页数，请重新输入',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false,
      });
      this.pageData.goPage = null;
      return;
    }
    if (type === 0 && !this.pageData.goPage) {
      window['modal'].open({
        message: '请输入要跳转的页面',
        confirmShow: true,
        confirmTxt: '确认',
        cancelShow: false
      });
      return;
    }
    this.pageData.currentPage = parseInt(page, 10) ? parseInt(page, 10) : 1;
    this.tableData.page = this.pageData.currentPage;
    this.getAccounList();
  }

  querySerach() {
    // 每次更新条件，必须切换到第一页
    this.tableData.page = 1;
    this.pageData.currentPage = this.tableData.page;
    this.getAccounList();
  }

  sportsTab(i){
    this.tabIndex = i;
  }

  shisuan(){
    this.$CommonDataService.ssCalcute().then((res: Result) => {
      this.ssfsTime = res.data.calperiods;
      this.tableList = res.data.detail;
      this.getPageInfo()
    });

  }

  allget(){
    this.$CommonDataService.ssCollect().then((res: Result) => {
      if(res.success==0){
        window['modal'].open({
          message: '领取成功',
          confirmShow: true,
          confirmTxt: '确认',
          cancelShow: false,
        });
        this.getPageInfo()
      }else{
        window['modal'].open({
          message: res.msg,
          confirmShow: true,
          confirmTxt: "确认",
          cancelShow: false,
        });
      }
    });
  }

  getDetail(id){
    this.showDetail = true;
    this.$GlobalService.globalQueryModel.ssResultdetail.id = id;
    this.$CommonDataService.ssResultdetail().then((res: Result) => {
      this.tableList3 = res.data;
    });
  }

  closeDetail(){
    this.showDetail = false;
  }

}
class TableModel {
  userToken: string;
  page: any; // 选择的 1页 2页
  pagesize: any; // 下拉选择的页数
  type: any;
  status: string;
  starttime: any;
  endtime: any;
}
class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}