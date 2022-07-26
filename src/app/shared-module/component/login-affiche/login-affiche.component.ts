import {Component, OnInit} from '@angular/core';
import Swiper from 'swiper';
import {CommonDataService} from '../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../core-module/common-util/global-service';
import {Result} from '../../../core-module/common-util/result';

@Component({
  selector: 'pc-login-affiche',
  templateUrl: './login-affiche.component.html',
  styleUrls: ['./login-affiche.component.scss']
})
export class LoginAfficheComponent implements OnInit {

  show: boolean = false;
  data = [];
  popMessage = '';
  testSwiper: any;

  constructor(
    public $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
  ) {
  }

  ngOnInit() {
    if (this.$GlobalService.globalQueryModel.swToken) {
      this.$GlobalService.globalQueryModel.openWebMsg.type = '1';
    }
    this.$CommonDataService.openWebMsg().then((res: Result) => {
      this.data = res.data;
     
       // 轮播图Swiper
       setTimeout(() => {
        this.testSwiper = new Swiper('.notice-swiper', {
          loop: true, // 循环模式选项
          
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          },
          
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
        })
      //判断是否刚登陆
      if (this.$GlobalService.globalTipsModelModel.openLoginMsg && this.data.length > 0) {
        this.show = true;
      }
      // if (this.$GlobalService.globalTipsModelModel.openLoginMsg && this.data.length > 0) {
        // this.show = true;
        // for (let i = 0; i < this.data.length; i++) {
        //   if (this.$GlobalService.globalQueryModel.userToken) {
        //     this.popMessage += `<p class='g-g--w-open-text'>${this.data[i].CN_CONTENT}</p>`;
        //   } else {
        //     this.popMessage += `<p class='g-g--w-open-text'>${this.data[i].swGameName}</p>`;
        //   }
        // }
      // }
    });
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  closeNotice() {
    this.show = false;
    this.$GlobalService.globalTipsModelModel.openLoginMsg = false;
  }
}
