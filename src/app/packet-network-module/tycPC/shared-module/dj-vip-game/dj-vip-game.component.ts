import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-dj-vip-game',
  templateUrl: './dj-vip-game.component.html',
  styleUrls: ['./dj-vip-game.component.scss']
})
export class DjVipGameComponent implements OnInit, AfterViewInit {
  testSwiper: any;
  iframeHeight: number = 804;
  constructor(
    public $GlobalService: GlobalService,
    private $CommonDataService: CommonDataService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
    window.onresize = () => {
      this.setIframeHeight();
    };
  }
  ngAfterViewInit(): void {
    this.setIframeHeight();
  }
  ngOnInit() {
    // 轮播图Swiper
    setTimeout(() => {
      this.testSwiper = new Swiper('#vip-swiper-container', {
        loop: true,
        autoplay: {
          delay: 12000,
          disableOnInteraction: false,
        },
        // 左右按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.pagination2',
          type: 'bullets',
        },
      });
    });
  }
  setIframeHeight() {
    const siz = 1920 / 804;
    this.iframeHeight = document.body.clientWidth / siz;
  }
}
