import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';

@Component({
  selector: 'app-chess-card',
  templateUrl: './chess-card.component.html',
  styleUrls: ['./chess-card.component.scss']
})
export class ChessCardComponent implements OnInit {
  gameName = '';
  navList = [];

  constructor(
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
  }

  ngOnInit() {

  }

  goGame(item) {
    this.$GlobalMethodsService.goGameResolve(item);
  }

}
