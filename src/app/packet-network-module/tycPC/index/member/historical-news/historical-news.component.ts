import {Component, OnInit} from '@angular/core';
import {GlobalMethodsService} from '../../../../../core-module/common-methods/global-methods.service';

@Component({
  selector: 'app-historical-news',
  templateUrl: './historical-news.component.html',
  styleUrls: ['./historical-news.component.scss']
})
export class HistoricalNewsComponent implements OnInit {
  typeUrl = 0;
  constructor(
    private $GlobalMethodsService: GlobalMethodsService
  ) {
    // const local = window.location.hash;
    // const str = local.substring(local.lastIndexOf('\/') + 1, local.length);
    // if ( str === 'historical') {
    //   this.typeUrl = 1;
    // } else {
    //   this.typeUrl = 0;
    // }
  }

  list = [{name: '最新消息', link: 'latest'},
    {name: '历史消息', link: 'historical'}];
  tabIndex = 0;
  ngOnInit() {
    this.tabIndex = this.$GlobalMethodsService.checkCurrentTab(this.list);
  }

}
