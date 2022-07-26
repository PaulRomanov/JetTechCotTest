import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import jQ from 'jquery';

/**
 * VG棋牌
 */
@Component({
  selector: 'app-dj-poker',
  templateUrl: './dj-poker.component.html',
  styleUrls: ['./dj-poker.component.scss']
})
export class DjPokerComponent implements OnInit {
  gameTypeList = [{ name: 'VG棋牌' }];
  checkGameTypeIndex = 0;
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
  ) { }

  ngOnInit() {
  }
  goGame(item) {
    this.$GlobalMethodsService.goGameResolve(item);
  }
  changeGameType(i) {
    this.checkGameTypeIndex = i;
    jQ('.game_type_active').animate(
      { left: this.checkGameTypeIndex * 140 + 'px' });
  }
}
