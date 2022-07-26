import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import Swiper from 'swiper';
import {SelectItem} from 'primeng/api';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../../core-module/common-util/result';
import {Dropdown} from 'primeng/primeng';
import { ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-xunibi-huobi',
  templateUrl: './xunibi-huobi.component.html',
  styleUrls: ['./xunibi-huobi.component.scss']
})
export class XunibiHuobiComponent implements OnInit, DoCheck {
  ModeSwiper1: any;
  ModeSwiper2: any;
  ModeSwiper3: any;
  ModeSwiper4: any;
  index1: number;
  index2: number;
  index3: number;
  index4: number;

  posiLeft: number;
  showPosi: boolean;
  subscribeScoll:any;
  maodian: number;
  scrollDis:any = {
    _top:0
  }
  constructor(public $CommonDataService: CommonDataService,
              public $GlobalService: GlobalService,
              public $GlobalMethodsService: GlobalMethodsService,
              public router: Router,
              private $ActivatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscribeScoll = fromEvent(window, 'scroll')
      .subscribe((event) => {
        this.onWindowScroll();//调用
    });
    console.log(123,(window.innerWidth-1200)/2);
    this.posiLeft = (window.innerWidth-1200)/2-3;
    this.showPosi = true;
    this.maodian = 0;
    this.index1 = 0;
    this.index2 = 0;
    this.index3 = 0;
    this.index4 = 0;
    // 轮播图Swiper
    var _this = this;

      setTimeout(() => {
        this.ModeSwiper1 = new Swiper('.banner-swiper1', {
          loop: false,
          autoplay: {
            delay: 5000000,
            disableOnInteraction: false,
          },
          // 左右按钮
          navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1',
          },
          effect : 'fade',
          on:{
            slideChange: function(){
              _this.index1 = this.activeIndex;
            },
          },
        });
      });

    setTimeout(() => {
      this.ModeSwiper2 = new Swiper('.banner-swiper2', {
        loop: false,
        autoplay: {
          delay: 5000000,
          disableOnInteraction: false,
        },
        // 左右按钮
        navigation: {
          nextEl: '.swiper-button-next2',
          prevEl: '.swiper-button-prev2',
        },
        effect : 'fade',
        on:{
          slideChange: function(){
            // console.log(this.activeIndex);
            _this.index2 = this.activeIndex;
          },
        },
      });
    });
    setTimeout(() => {
      this.ModeSwiper3 = new Swiper('.banner-swiper3', {
        loop: false,
        autoplay: {
          delay: 5000000,
          disableOnInteraction: false,
        },
        // 左右按钮
        navigation: {
          nextEl: '.swiper-button-next3',
          prevEl: '.swiper-button-prev3',
        },
        effect : 'fade',
        on:{
          slideChange: function(){
            // console.log(this.activeIndex);
            _this.index3 = this.activeIndex;
          },
        },
      });
    });
    setTimeout(() => {
      this.ModeSwiper4 = new Swiper('.banner-swiper4', {
        loop: false,
        autoplay: {
          delay: 5000000,
          disableOnInteraction: false,
        },
        // 左右按钮
        navigation: {
          nextEl: '.swiper-button-next4',
          prevEl: '.swiper-button-prev4',
        },
        effect : 'fade',
        on:{
          slideChange: function(){
            // console.log(this.activeIndex);
            _this.index4 = this.activeIndex;
          },
        },
      });
    });
  }

  scollPostion() {
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return {
        top: t,
        left: l,
        width: w,
        height: h
    };
  }
  onWindowScroll(){
    this.scrollDis._top = this.scollPostion().top;
    console.log(this.scrollDis._top);
    if(this.scrollDis._top>=2568){
      this.showPosi = false;
    }else{
      this.showPosi = true;
    }
    if(this.scrollDis._top>=100 && this.scrollDis._top<600 ){
      this.maodian = 1;
    }else if(this.scrollDis._top>=600 && this.scrollDis._top<1230 ){
      this.maodian = 2;
    }else if(this.scrollDis._top>=1230 && this.scrollDis._top<1860 ){
      this.maodian = 3;
    }else if(this.scrollDis._top>=1860 && this.scrollDis._top<2490 ){
      this.maodian = 4;
    }else if(this.scrollDis._top>=2490 && this.scrollDis._top<2700 ){
      this.maodian = 5;
    }else{
      this.maodian = 0;
    }
  }

  goDistance(num){
    if(num==1){
      window.scrollTo(0,100)
    }else if(num==2){
      window.scrollTo(0,600)
    }else if(num==3){
      window.scrollTo(0,1230)
    }else if(num==4){
      window.scrollTo(0,1860)
    }else if(num==5){
      window.scrollTo(0,2490)
    }

  }

  ngDoCheck(): void {

  }

  goBack() {
    history.go(-1);
  }


}

