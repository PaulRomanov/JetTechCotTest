import { Component, OnInit } from '@angular/core';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../core-module/common-util/result';
import jQ from 'jquery';

@Component({
  selector: 'app-djvideo',
  templateUrl: './djvideo.component.html',
  styleUrls: ['./djvideo.component.scss']
})
export class DjvideoComponent implements OnInit {
  isShowIndex: 0;
  arr = [];
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
  ) { }

  ngOnInit() {
    // 轮播图Swiper
    setTimeout(() => {

      // let arr = []
      let _this = this;
      this.$CommonDataService.homegame().then((res: Result) => {
        for(let i=0;i<res.data.length;i++){
          if(res.data[i].subname=='ZR GAME'){
            _this.arr = res.data[i].childs
          }
        }
      })

    });
  }
  scrollGame(direct){
    if(direct == 'prev'){
      jQ('.games_box').animate({
        scrollLeft: jQ('.games_box').scrollLeft() - 98*5
      },500);
    }else{
      jQ('.games_box').animate({
        scrollLeft: jQ('.games_box').scrollLeft() + 98*5
      },500);
    }
  }
  goGame(item) {
    this.$GlobalMethodsService.goGameResolve(item);
  }
  // 鼠标进入显示二级菜单
  listName(i) {
    this.isShowIndex = i;
  }

  // 鼠标离开隐藏二级菜单
  listNameHide() {
    this.isShowIndex = null;
  }
}
