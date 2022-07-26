import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import Swiper from 'swiper';
@Component({
  selector: 'app-attract-investment',
  templateUrl: './attract-investment.component.html',
  styleUrls: ['./attract-investment.component.scss']
})
export class AttractInvestmentComponent implements OnInit, AfterViewInit {
  testSwiper: Swiper;
  clipboard = window['ClipboardJS'];
  modal = window['modal'];
  constructor(
    public $GlobalMethodsService: GlobalMethodsService,
    public $GlobalService: GlobalService) {}
  ngAfterViewInit(): void {
    this.testSwiper = new Swiper('.swiper-container', {
      direction : 'vertical',
      mousewheel: true,
      speed: 800,
      slidesPerView: 'auto',
      // 分页器指示器
      pagination: {
        el: '.swiper-pagination',
        bulletClass : 'my-bullet',
        bulletActiveClass: 'my-bullet-active',
        type: 'bullets',
        clickable: true,
        bulletElement : 'div',
      },
    });
  }
  ngOnInit() {}
  copyBankaccount(acc) {
    const clipboard = new this.clipboard(acc);
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
}
