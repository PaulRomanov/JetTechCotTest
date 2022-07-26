import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { GlobalService } from '../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../core-module/common-methods/global-methods.service';
import { CommonDataService } from '../../../core-module/common-util/common-data.service';
import { Result } from '../../../core-module/common-util/result';
import {fromEvent} from 'rxjs';
import jQ from 'jquery';
import { filter } from 'rxjs/operators';
import { EventBusService } from '../../../core-module/event-bus/event-bus';
import { Utils } from 'src/app/core-module/common-util/utils-service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isTopShow = false;
  isfloatShow = false;
  subscribeScoll;
  interval: any
  interval1: any = null
  interval2: any
  interval3: any
  interval4: any
  showMall: boolean = true
  mallSwing: boolean = true
  hiddenEnvelop: boolean = true
  timerCountdown = '00:00:00'
  allSecond: number = 0
  hiddenScratch: boolean = true
  disabledBtn: boolean = true
  showVerify: boolean = false
  hasEnvelop: boolean = false
  codeSend: boolean = false
  timeRunout: boolean = false
  isUserToken: boolean = false
  isRaining: boolean = false
  hasOpenScratchPrize: boolean = false
  codeTimer = 60
  loadingEnvelop: boolean = false
  form = {
    mobile: '',
    smscode: ''
  }
  openAmount = '0'
  envelop = {
    amount: 0,
    left: -1
  }
  scoreMall : number =  0

  constructor(
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute,
    private $CommonDataService: CommonDataService,
    private $EventBusService:EventBusService,
    private utils: Utils
  ) {
    if (this.$GlobalService.globalQueryModel.userToken || this.$GlobalService.globalQueryModel.swToken) {
      this.isUserToken = true;
    }
  }
  ngOnInit() {
    /**
     * 红包雨可单独写一个组件，可实现全包网平台共享
     * 组件功能包括：倒计时，下红包雨，抢红包弹窗
     * 组件参数包括：未登录是否下红包雨，红包背景图片，弹窗背景图
     * 组件状态包括：未登录是否下雨，登录是否下雨和显示倒计时，抢红包结果
     */
    //红包雨开关
    this.getEnvelopRain()
    //积分商城开关
    this.scoreMallSwitch()
    this.$Router.events.pipe(//监听路由代码
        filter(event => event instanceof NavigationEnd)
      ).subscribe((res: any) => {
      var url = this.$ActivatedRoute.snapshot['_routerState'].url
      if(url != '/tyc/index/noviceguide'){
        this.removeAllEnvelops()
      }else{
        setTimeout(() => {
          this.getEnvelopRain()
        },100)
      }
    });
    this.interval4 = setInterval(() => {
      if(this.$ActivatedRoute.snapshot['_routerState'].url == '/tyc/index/noviceguide' && this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon == false){
        this.getEnvelopRain()
        this.scoreMallSwitch()
      }
    },30000)
    //刮刮卡
    this.getScratchStatus() 
    // 首页滚动条动画
    this.subscribeScoll = fromEvent(window, 'scroll')
    .subscribe((event) => {
      this.onWindowScroll();
    });
    this.interval = setInterval( () => {
      this.mallSwing = !this.mallSwing
    }, 6000)
    //登陆退出通知
    this.$EventBusService.eventBus.subscribe((val)=>{
      if(val === 'login'){
        this.removeAllEnvelops()
        this.isUserToken = true
        this.getScratchStatus()
      }else if(val === 'logout'){
        this.removeAllEnvelops()
        this.allSecond = 0
        this.isUserToken = false
      }else if(val === 'openLogin'){
        this.removeAllEnvelops()
      }
    })
  }
  onWindowScroll() {
     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
     this.isTopShow = scrollTop >= 500 ? true : false;
     this.isfloatShow = scrollTop >= 200 ? true : false;
  }
  topClick() {
    jQ(document.documentElement).animate({scrollTop: '0px'}, 500);
  }
  jumptossfs(){
    this.$Router.navigate(['./realtimeRebate'], {relativeTo: this.$ActivatedRoute});
  }
  beforeDestroy() {
    clearInterval(this.interval)
    this.interval = null
    clearInterval(this.interval1)
    this.interval1 = null
    clearInterval(this.interval3)
    this.interval3 = null
    clearInterval(this.interval4)
    this.interval4 = null
    this.$EventBusService.eventBus.unsubscribe()
  }
  goMall(e){
    if(e.srcElement.className.indexOf('points-mall') > -1){
      this.$Router.navigate(['./pointsMall'], {relativeTo: this.$ActivatedRoute});
    }
  }
  goEnvelopRecord(){
    this.hiddenEnvelop = true
    this.$Router.navigate(['./member/envelopeRain'], {relativeTo: this.$ActivatedRoute});
  }
  //积分商城开关
  scoreMallSwitch(){
    this.$CommonDataService.scoreMallSwitch().then((res: Result) => {
      if(res.success == 0 && res.data == 1){
        this.scoreMall = 1
      }
    })
  }
  //红包雨开关
  getEnvelopRain(){
    this.$CommonDataService.envelopRainSwitch().then((res: Result) => {
      if(res.success == 0 && res.data.switchOn == true){
        if(this.isUserToken && this.allSecond == 0) this.getCountdown(res.data.startAt, res.data.endAt)
        if(!this.isRaining && ((this.isUserToken && this.allSecond > 0) || !this.isUserToken)){
          this.generateEnvelopRain()
        }
      }else if(res.data.switchOn == false){
        this.removeAllEnvelops()
      }
    })
  }
  //抢红包
  getEnvelop(){
    //未登录状态，通知登录
    if(!this.isUserToken){
      this.removeAllEnvelops()
      this.$GlobalMethodsService.loginOPenWindow();
      this.$GlobalService.globalTipsModelModel.isOpenBigMsg = false;
      return
    }
    //次数用完
    if(this.envelop.left == 0){
      this.timeRunout = true
      this.hasEnvelop = false
      this.hiddenEnvelop = false
      this.removeAllEnvelops()
      return
    }
    if(this.loadingEnvelop) return
    this.loadingEnvelop = true
    this.$GlobalMethodsService.showTopCenter('正在为您抢红包...');
    this.$CommonDataService.envelopRain().then((res: Result) => {
      this.loadingEnvelop = false
      this.hiddenEnvelop = false
      //抢到了
      if(res.success == 0){
        this.hasEnvelop = true
        this.envelop = res.data
        if(this.envelop.left == 0){
          this.timeRunout = true
          this.hasEnvelop = false
          this.removeAllEnvelops()
        }
      }else{
        this.hasEnvelop = false
        this.removeAllEnvelops()
      }
    })
  }
  generateEnvelopRain(){
    var html = document.getElementById('index-container')
    this.interval1 = setInterval( () => {
      this.generateEnvelop(html)
    },300)
    this.isRaining = true
  }
  generateEnvelop(html){
    var element = document.createElement('div');
    element.style.width = '98px'
    element.style.height = '98px'
    element.style.backgroundImage = `url(${this.$GlobalService.globalJavaResData.cdnValidKey2 + '/'+ this.$GlobalService.globalJavaResData.projectName + '/img/red_01.png'})`
    element.style.position = 'fixed'
    element.style.left = (Math.random() * (85 - 10) + 10) + 'vw';
    element.style.top = '-120px'
    element.style.zIndex = '98'
    element.style.cursor = 'pointer'
    element.style.animation = `rain ${Math.random() * 2 + 4}s linear`
    element.setAttribute('class', 'envelop-rain')
    element.style.transform = `rotate(${(Math.random() * 30) * (Math.random()>0.5?1:-1)}deg)`
    element.addEventListener('click',() => {
      this.getEnvelop()
    })
    html.appendChild(element)
    setTimeout(() => {
      if(html.contains(element)){
        html.removeChild(element)
      }
    }, 6000);
  }
  removeAllEnvelops(){
    clearInterval(this.interval1)
    this.interval1 = null
    this.isRaining = false
    this.allSecond = 0
    var envelops = document.querySelectorAll('.envelop-rain')
    var html = document.getElementById('index-container')
    Array.prototype.forEach.call(envelops, (el, idx, list) => {
      html.removeChild(el)
    })
  }
  getCountdown(start, end) {
    var d1 = new Date().setHours(start.substring(0, 2))
    var d2 = new Date(d1).setMinutes(start.substring(3, 5))
    var d3 = new Date(d2).setSeconds(0)
    var ed1 = new Date().setHours(end.substring(0, 2))
    var ed2 = new Date(ed1).setMinutes(end.substring(3, 5))
    var ed3 = new Date(ed2).setSeconds(0)
    var current = this.utils.getTimeByZone().getTime()
    if(current >= d3 && current < ed3){
      this.allSecond = (ed3 - current) / 1000
      this.generateCountDown()
    }else{
      return
    }
    if(this.interval2){
      clearInterval(this.interval2)
      this.interval2 = null
    }
    this.interval2 = setInterval(()=> {
      if(this.allSecond < 3){
        clearInterval(this.interval1)
        this.interval1 = null
      }
      if(this.allSecond == 0){
        this.isRaining = false
        clearInterval(this.interval2)
        this.timerCountdown = '00:00:00'
        return
      }
      this.allSecond--
      this.generateCountDown()
    },1000)
  }
  generateCountDown(){
    var hour, minute, second;
    hour = parseInt((this.allSecond / 60 / 60 % 24).toString());
    minute = parseInt((this.allSecond / 60 % 60).toString());
    second = parseInt((this.allSecond % 60).toString());
    this.timerCountdown = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
  }

  getScratchStatus(){
    if(!this.isUserToken) return
    this.$CommonDataService.scratchActivity().then((res: Result)=>{
      if(res.success == 0){
        //有活动未刮开,有活动已刮开
        if(res.data.status == 0 || res.data.status == 1){
          this.form.mobile = localStorage.getItem('phoneNumber')
          this.hiddenScratch = false
          this.openAmount = res.data.openAmount
          this.initScratch()
        }
        //不弹出活动页
        else if(res.data.status == 2){

        }
      }
    })
  }
  openScratchPrize(){
    this.$CommonDataService.scratchOpen().then((res: Result)=>{
    })
  }
  //验证手机号是否已领奖
  scratchVerifyPhone(){
    if(!this.form.mobile){
      this.$GlobalMethodsService.showTopCenter('请填写手机号');
      return
    }
    if(this.codeTimer < 60) return
    this.$GlobalService.globalQueryModel.scratchVerifyPhone.phoneno = this.form.mobile
    this.$CommonDataService.scratchVerifyPhone().then((res: Result)=>{
      if(res.success == 0){
        if(res.data.status == 0){
          this.$GlobalService.globalQueryModel.sendSMSComVerify.mobile = this.form.mobile
          this.$CommonDataService.sendSMSComVerify().then((res: Result)=>{
            if(res.success == 0){
              this.codeSend = true
              this.interval3 = setInterval(()=>{
                if(this.codeTimer-- == 0){
                  this.codeSend = false
                  this.codeTimer = 60
                  clearInterval(this.interval3)
                }
              },1000)
            }
          })
        }else{
          this.$GlobalMethodsService.showTopCenter(res.msg);
        }
      }else{
        this.$GlobalMethodsService.showTopCenter(res.msg);
      }
    })
  }
  //领奖
  scratchGetPrize(){
    if(!this.form.smscode){
      this.$GlobalMethodsService.showTopCenter('请填写验证码');
      return
    }
    if(!this.form.mobile){
      this.$GlobalMethodsService.showTopCenter('请填写手机号');
      return
    }
    this.$GlobalService.globalQueryModel.scratch.phoneno = this.form.mobile
    this.$GlobalService.globalQueryModel.scratch.smscode = this.form.smscode
    this.$CommonDataService.scratchGetPrize().then((res: Result)=>{
      if(res.success == 0){
        this.$GlobalMethodsService.showTopCenter(res.msg);
        if(res.data.status == 0){
          this.hiddenScratch = true
        }
      }
    })
  }
  initScratch(){
    this.hasOpenScratchPrize = false
    function isCanvas(obj: HTMLCanvasElement | HTMLElement | Element): obj is HTMLCanvasElement {
        return obj.tagName === 'CANVAS';
    }
    var canvas = document.getElementById('canvas');
    if(!isCanvas(canvas)) return
    var ctx = canvas.getContext('2d');
    // 画一个矩形, 遮住背景
    ctx.fillStyle = '#E9E9E9';
    ctx.fillRect(0,0,276,144);

    ctx.fillStyle = '#7D7D7D';
    ctx.font = "700 24px microsoft yahei"
    ctx.textAlign = "center";
    ctx.fillText("点击刮开涂层", 138, 80);
    // 设置合成属性, 重复的地方不渲染(透明)
    ctx.globalCompositeOperation = 'destination-out';
    canvas.onmousedown = () => {
      var counter = 0
      canvas.onmousemove = (e) => {
        counter++
        if(counter > 40 && !this.hasOpenScratchPrize){
          this.openScratchPrize()
          this.disabledBtn = false
          this.hasOpenScratchPrize = true
        }
        // 获取鼠标相对于画布左上角的位置
        var x = e.offsetX,y = e.offsetY;
        // 画圆
        ctx.arc(x,y,10,0,2 * Math.PI);
        // 填充
        ctx.fill();
      }
      canvas.onmouseup = function(){
        canvas.onmousemove = null;
        canvas.onmouseup = null;
      }
    }
  }
}
