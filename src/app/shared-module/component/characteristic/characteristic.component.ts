import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Result} from '../../../core-module/common-util/result';
import Swiper from 'swiper';
import {CommonDataService} from '../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../core-module/common-methods/global-methods.service';
@Component({
  selector: 'pc-characteristic',
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.scss']
})
export class CharacteristicComponent implements OnInit, AfterViewInit, OnDestroy {
  data: any = [];
  marqueeStr = '';
  charas: any;
  DiscountRec1: any;
  resData = [];
  chData: any;
  bar;
  testSwipers;
  drawing;
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService
  ) {
  }

  ngOnInit() {
    // 首页特色活动
    this.$CommonDataService.chara().then((res: Result) => {
      this.charas = res.data;
    });
    // 首页优惠推荐
    this.$CommonDataService.getActivityDiscountSubset().then((res: Result) => {
      this.chData = res.data;
      this.DiscountRec1 = this.removeByValue(this.chData);
      const len = this.DiscountRec1.length;
      const page = 3;
      const lineNum = len % 3 === 0 ? len / 3 : Math.floor((len / 3) + 1);
      this.resData = [];
      for (let i = 0; i < lineNum; i++) {
        const temp = this.DiscountRec1.slice(i * page, i * page + page);
        this.resData.push(temp);
      }
      setTimeout(() => {
        this.testSwipers = new Swiper('#swiper-container2', {
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.pagination2',
            type: 'bullets',
          },
        });
      });
    });


  }

  /**
   * 过滤数组
   * param arr
   */
  removeByValue(arr) {
    const chRes = [];
    arr.forEach((item, i) => {
      if (item.HOS_STATUS === 1) {
        chRes.push(arr[i]);
      }
    });
    return chRes;
  }

  // 进度条动画
  Id(obj) {
    return document.getElementById(obj);
  }

  start(IdName, Idcount, code) {
    if (this.Id(IdName)) {
      this.Id(IdName).style.width = parseInt(this.Id(IdName).style.width, 10) - 1 + '%';
      const _thisWidth = this.Id(IdName).style.width;
      this.Id(Idcount).innerHTML = _thisWidth.replace('%', '');
      if (this.Id(IdName).style.width === code && IdName === 'bar') {
        window.clearInterval(this.bar);
      } else if (this.Id(IdName).style.width === code && IdName === 'drawing') {
        window.clearInterval(this.drawing);
      }
    }
  }

  ngAfterViewInit(): void {
    // 进度条定时器
    this.bar = setInterval(() => {
      // 存款滚动条
      this.start('bar', 'FontNumone', '1%');
    }, 50);
    // 进度条定时器
    this.drawing = setInterval(() => {
      // 取款滚动条
      this.start('drawing', 'FontNumtwo', '3%');
    }, 50);

    // 变量t是滚动条滚动时，距离顶部的距离
  }

  ngOnDestroy(): void {
    if (this.bar) {
      clearInterval(this.bar);
    }
    if (this.drawing) {
      clearInterval(this.drawing);
    }
  }
}

