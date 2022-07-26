import {AfterViewInit, Component, OnInit} from '@angular/core';
import Swiper from 'swiper';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import { environment } from 'src/environments/environment';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'tyc-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class TycHomepageComponent implements OnInit {
  data: any;
  testSwiper: any;

  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    // 首页轮播图
    this.$CommonDataService.RotationChart().then(res => {
      this.data = res['data'];
      // 轮播图Swiper
      setTimeout(() => {
        this.testSwiper = new Swiper('.home-swiper', {
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          // 滚动条
          /*pagination: {
            el: '.swiper-pagination',
            clickable: true,
            bulletClass : 'my-bullet',
            bulletActiveClass: 'my-bullet-active',
            type: 'bullets',
            bulletElement : 'div',
          },*/
          // 左右按钮
          navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1',
          },
          effect: 'fade',
          // fadeEffect: {
          //   crossFade: true,
          // }
          watchSlidesProgress: true,
        });
        // 鼠标移出隐藏按钮，移入显示按钮
        for (let i = 0; i < this.testSwiper.length; i++) {
          this.testSwiper[i].el.onmouseover = () => {
            this.testSwiper[i].navigation.$nextEl.removeClass('hide');
            this.testSwiper[i].navigation.$prevEl.removeClass('hide');
          };
          this.testSwiper[i].el.onmouseout = () => {
            this.testSwiper[i].navigation.$nextEl.addClass('hide');
            this.testSwiper[i].navigation.$prevEl.addClass('hide');
          };
        }
      });
    });
  }

  /**
   *图片跳转
   * param item
   */
  targetImg(item) {
    if (item.targetPage === 0) {
      return;
    } else if (item.targetPage === 8) { // 跳新页面
      window.open(item.targetUrl);
    } else if (item.targetPage === 9) { // 跳优惠活动
      this.$Router.navigate(['../favourable'], {relativeTo: this.$ActivatedRoute});
      const height = window.screen.availHeight * 0.9;
      const iLeft = (window.screen.availWidth - 1260) / 2;
      window.open(`#/${environment.rootUrl}/newPage/activityDetail/${item.targetUrl}`, '活动详情',
        `height=${height} , width=1260, top=0, left=${iLeft}, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no`);
    } else if (item.targetPage === 110) {// 跳棋牌
      this.$Router.navigate(['../chessCard'], {relativeTo: this.$ActivatedRoute});
    } else if (item.targetPage === 111) {// 跳捕鱼
      this.$Router.navigate(['../fishing'], {relativeTo: this.$ActivatedRoute});
    }
  }
}
