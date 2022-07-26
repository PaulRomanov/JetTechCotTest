import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import {ActivatedRoute, Router} from "@angular/router";
import {fromEvent} from 'rxjs';
import jQ from 'jquery';
@Component({
  selector: 'member-exclusive',
  templateUrl: './member-exclusive.component.html',
  styleUrls: ['./member-exclusive.component.scss']
})
export class MemberExclusiveComponent implements OnInit {
  show: boolean = false;
  showNum = 1;
  isTopShow = false;
  subscribeScoll;
  constructor(
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    private $CommonDataService: CommonDataService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit() {

  }
  onWindowScroll() {
     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
     this.isTopShow = scrollTop >= 500 ? true : false;
  }
  topClick() {
    jQ(document.documentElement).animate({scrollTop: '0px'}, 500);
  }
    // 实时足球的全部跳转
    goTYgame() {
        if (this.$GlobalService.globalQueryModel.userToken === null) {
          this.$GlobalMethodsService.showTopCenter('登录查看更多消息！');
        } else {
          this.$Router.navigate(['../sports'], { relativeTo: this.$ActivatedRoute });
        }
      }
  open(num) {
    console.log(num)
    this.showNum = num
    this.show = true;
  }

  close() {
    this.show = false;
  }

}
