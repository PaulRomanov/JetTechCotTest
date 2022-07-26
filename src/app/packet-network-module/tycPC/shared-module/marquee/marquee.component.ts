import {Component, OnInit, Input} from '@angular/core';
import {Result} from '../../../../core-module/common-util/result';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'tyc-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.scss']
})
export class TycMarqueeComponent implements OnInit {
  data;
  marqueeStr = '';

  @Input() marqueeTitleStyle: Object;
  @Input() marqueeContentStyle: Object;

  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    // 首页滚动消息
    this.$CommonDataService.marquee().then((res: Result) => {
      this.data = res.data;
      this.data.forEach(item => {
        this.marqueeStr += item.EN_CONTENT;
      });
    });
  }

  // 点击消息公告
  marquee() {
    if (this.$GlobalService.globalQueryModel.userToken === null) {
      this.$GlobalMethodsService.showTopCenter('登录查看更多消息！');
    } else {
      this.$Router.navigate(['../member/historicalNews/latest'], {relativeTo: this.$ActivatedRoute});
    }
  }
}
