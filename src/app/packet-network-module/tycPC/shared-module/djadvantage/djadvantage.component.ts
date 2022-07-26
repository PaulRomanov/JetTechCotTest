import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from "../../../../core-module/common-util/global-service";
import {GlobalMethodsService} from "../../../../core-module/common-methods/global-methods.service";
import {CommonDataService} from "../../../../core-module/common-util/common-data.service";
import {fromEvent} from "rxjs";
import jQ from 'jquery';
@Component({
  selector: 'app-djadvantage',
  templateUrl: './djadvantage.component.html',
  styleUrls: ['./djadvantage.component.scss']
})
export class DjadvantageComponent implements OnInit, OnDestroy {
  subscribeScoll;
  isYbp = false;
  num60 = 0;
  itrme60 = null;
  num80 = 0;
  itrme80 = null;
  num90 = 0;
  itrme90 = null;
  num14 = 0;
  itrme14 = null;
  constructor(
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    public $CommonDataService: CommonDataService,
  ) { }

  ngOnInit() {
    // 首页滚动条动画
    this.subscribeScoll = fromEvent(window, 'scroll')
      .subscribe((event) => {
        this.onWindowScroll();
      });
  }

  onWindowScroll() {
    const name1 = jQ('#foot_information');
    const clheight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop + 200;
    if (name1.length > 0) {
      (clheight + scrollTop) > name1.offset().top ? this.isYbp = true : this.isYbp = false;
      if (!this.isYbp) {
        this.num60 = 0;
        this.num80 = 0;
        this.num90 = 0;
        this.num14 = 0;
        return;
      } else {
        this.getNumInterm60();
        this.getNumInterm80();
        this.getNumInterm90();
        this.getNumInterm14();
      }
    }
  }

  getNumInterm60() {
    clearInterval(this.itrme60);
    if (this.num60 < 60) {
      this.itrme60 = setInterval(()=>{
        this.num60++;
        if (this.num60 >= 60) {
          clearInterval(this.itrme60);
        }
      }, 10)
    }
  }

  getNumInterm80() {
    clearInterval(this.itrme80);
    if (this.num80 < 80) {
      this.itrme80 = setInterval(()=>{
        this.num80++;
        if (this.num80 >= 80) {
          clearInterval(this.itrme80);
        }
      }, 15)
    }
  }

  getNumInterm90() {
    clearInterval(this.itrme90);
    if (this.num90 < 90) {
      this.itrme90 = setInterval(()=>{
        this.num90++;
        if (this.num90 >= 90) {
          clearInterval(this.itrme90);
        }
      }, 10)
    }
  }

  getNumInterm14() {
    clearInterval(this.itrme14);
    if (this.num14 < 14) {
      this.itrme14 = setInterval(()=>{
        this.num14++;
        if (this.num14 >= 14) {
          clearInterval(this.itrme14);
        }
      }, 50)
    }
  }

  ngOnDestroy() {
    if (this.itrme60 || this.itrme60 || this.itrme90 || this.itrme14) {
      clearInterval(this.itrme60);
      clearInterval(this.itrme60);
      clearInterval(this.itrme90);
      clearInterval(this.itrme14);
    }
  }

}
