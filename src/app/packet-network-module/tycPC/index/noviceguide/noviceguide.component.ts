import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';
import jQ from 'jquery';
import {fromEvent} from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { Result } from '../../../../core-module/common-util/result';

@Component({
  selector: 'app-noviceguide',
  templateUrl: './noviceguide.component.html',
  styleUrls: ['./noviceguide.component.scss']
})
export class NoviceguideComponent implements OnInit {
  isShow = null;
  isUserToken = null;
  imgShowIndex = 0;

  public marqueeTitleStyle = {
    background: 'transparent',
    color: '#fff'
  };
  public marqueeContentStyle = {
    'font-size': '18px',
    color: '#fff'
  };
  bannerLeft = []
  bannerRight = []

  subscribeScoll;
  constructor(
    public $GlobalService: GlobalService,
    private $Router: Router,
    private $CommonDataService: CommonDataService,
    private $ActivatedRoute: ActivatedRoute
  ) {
    if (this.$GlobalService.globalQueryModel.userToken || this.$GlobalService.globalQueryModel.swToken) {
      this.isUserToken = true;
    }
    if (this.$GlobalService.globalQueryModel.userToken && this.$GlobalService.globalJavaResData.signSwitch === '1') {
      this.$GlobalService.globalJavaResData.isSignShow = true;
    }
  }

  ngOnInit() {
    //弹窗
    this.modalBanner()
    // 首页滚动条动画
    this.subscribeScoll = fromEvent(window, 'scroll')
      .subscribe((event) => {
        this.onWindowScroll();
      });
  }

  toogelImg(el, index) {
    this.imgShowIndex = index;
    this.bannerLeft.forEach(item => {
      item.active = false;
    });
    this.bannerLeft[index].active = true;
  }

  toggleShow() {
    this.$GlobalService.globalTipsModelModel.isOpenBigMsg = false;
    this.isUserToken = true;
  }

  modalBanner(){
    this.$CommonDataService.modalBanner().then((res: Result)=>{
      if(res.success == 0){
        let list = res.data
        if(list.length > 0) list[0].active = true
        for(var i = 0; i < list.length; i++){
          if(list[i].position == 0){
            this.bannerLeft.push(list[i])
          }else{
            this.bannerRight.push(list[i])
          }
        }
        this.bannerLeft.sort(function(a, b){return a.sortnum - b.sortnum}); 
        this.bannerRight.sort(function(a, b){return a.sortnum - b.sortnum});
        if(list.length > 0 && !this.isUserToken){
          this.$GlobalService.globalTipsModelModel.isOpenBigMsg = true;
        }
      }
    })
  }
  bannerJump(item){
    //打开优惠活动
    if(item.linktype == 2){
      this.$Router.navigate(['./../favourable'], {queryParams: {index : item.link}, relativeTo: this.$ActivatedRoute});
    }
    //打开外部链接
    else if(item.linktype == 3){
      window.open(item.link);
    }
  }

  onWindowScroll() {
    const name = jQ('.seekAdvice-list-tuglie');
    const name1 = jQ('.seekAdvice-bottom');
    const clheight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (name.length > 0) {
      (clheight + scrollTop) > name.offset().top ? name.addClass('show-page') : name.removeClass('show-page');
    }
    if (name1.length > 0) {
      (clheight + scrollTop) > name1.offset().top ? name1.addClass('show-page') : name1.removeClass('show-page');
    }
  }
  // 关闭签到弹窗
  closeSign() {
    this.$GlobalService.globalJavaResData.isSignShow = false;
  }
  // 去签到页面
  goSign() {
    window.open(`#/${environment.rootUrl}/newPage/sign`);
  }
}
