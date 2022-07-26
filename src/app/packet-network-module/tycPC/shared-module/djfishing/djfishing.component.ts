import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {Result} from '../../../../core-module/common-util/result';

@Component({
  selector: 'app-djfishing',
  templateUrl: './djfishing.component.html',
  styleUrls: ['./djfishing.component.scss']
})
export class DjfishingComponent implements OnInit {
  arr = [];
  boxArr = [
    {imgUrl:'',name:'',yname:''}
  ];
  nowArr = [];
  tabIndex = 0;
  domain;
  domain2;
  modal = window['modal'];
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
  ) {
  }

  ngOnInit() {

      let _this = this;
      this.$CommonDataService.homegame().then((res: Result) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].subname == 'PY GAME') {
            _this.arr = res.data[i].childs;
          }
        }
        let arr = _this.arr;
        let boxArr = [
          { name: '全部', yname: 'ALL GAMES', list: [], imgUrl: '/tyc/img/electronicgames_logo_all.png'},
          {name: 'AG', list: [], yname: 'AG FISHING GAME', imgUrl: '/tyc/img/electronicgames_logo_ag.png'},
          // {name: 'CQ9', list: [], yname: 'CQ9 FISHING GAME', imgUrl: '/tyc/img/electronicgames_logo_cq9.png'},
          {name: 'FG', list: [], yname: 'FG FISHING GAME', imgUrl: '/tyc/img/electronicgames_logo_fg.png'},
          {name: 'VG', list: [], yname: 'VG FISHING GAME', imgUrl: '/tyc/img/electronicgames_logo_vg.png'},
          {name: 'BBIN', list: [], yname: 'BBIN FISHING GAME', imgUrl: '/tyc/img/electronicgames_logo_bbin.png'},
          {name: 'JDB', list: [], yname: 'JDB FISHING GAME', imgUrl: '/tyc/img/electronicgames_logo_jdb.png'},
          {name: 'KA', list: [], yname: 'KA FISHING GAME', imgUrl: '/tyc/img/electronicgames_logo_ka.png'},
          {name: 'BG', list: [], yname: 'BG FISHING GAME', imgUrl: '/tyc/img/electronicgames_logo_bg.png'},
          // {name: 'HY', list: [], yname: 'HY FISHING GAME', imgUrl: '/tyc/img/electronicgames_logo_hy.png'}
        ];
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < boxArr.length; j++) {
            if (arr[i].name.indexOf(boxArr[j].name) == 0) {
              boxArr[j].list.push(arr[i]);
            }
          }
        }
        boxArr[0].list = arr;
        _this.boxArr = boxArr;
        const gameItemByIndexId = this.$GlobalService.globalJavaResData.gameItemByIndexId;
        this.sportsTab(boxArr[gameItemByIndexId], gameItemByIndexId);
      });
  }
  sportsTab(item, i){
    // console.log(item, i)
    this.$GlobalService.globalJavaResData.gameItemByIndexId = i;
    this.tabIndex = i;
    this.nowArr = item.list;
  }
  goGame(item) {
    // console.log(item)
    this.$GlobalMethodsService.goGameResolve(item);
  }
}
