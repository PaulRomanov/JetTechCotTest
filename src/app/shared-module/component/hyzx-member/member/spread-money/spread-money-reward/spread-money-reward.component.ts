import { Component, OnInit } from '@angular/core';
import {Result, SpreadActiveModel} from '../../../../../../core-module/common-util/result';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';

@Component({
  selector: 'app-spread-money-reward',
  templateUrl: './spread-money-reward.component.html',
  styleUrls: ['./spread-money-reward.component.scss']
})
export class SpreadMoneyRewardComponent implements OnInit {
  spreadActiveData = new SpreadActiveModel();
  spreadRewardData = new SpreadActiveModel();
  memberName = '';
  isLoad = false;
  constructor(
    public $GlobalService: GlobalService,
    public $CommonDataService: CommonDataService
  ) { }

  ngOnInit() {
    this.$CommonDataService.getUserSpreadActiveData().then((res: Result) => {
      if (res.success === 0) {
        this.spreadActiveData = res.data;
      }
    });
    this.isLoad = true;
    this.$CommonDataService.getSpreadRewardData().then((res: Result) => {
      this.isLoad = false;
      if (res.success === 0) {
        this.spreadRewardData = res.data;
      }
    });
  }
  searchMemberData() {
    this.isLoad = true;
    this.$GlobalService.globalQueryModel.getSpreadRewardData.memberName = this.memberName;
    this.$CommonDataService.getSpreadRewardData().then((res: Result) => {
      this.isLoad = false;
      if (res.success === 0) {
        this.spreadRewardData = res.data;
      }
    });
  }
}
