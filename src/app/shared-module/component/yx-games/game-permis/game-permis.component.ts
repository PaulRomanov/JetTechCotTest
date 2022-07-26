import {Component, OnInit} from '@angular/core';
import {Result} from '../../../../core-module/common-util/result';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';

@Component({
  selector: 'pc-game-permis',
  templateUrl: './game-permis.component.html',
  styleUrls: ['./game-permis.component.scss']
})
export class GamePermisComponent implements OnInit {
  modal = window['modal'];
  gameId = null;
  accountBalance = null;
  transferAmount = null;
  gameUrl = null;
  gameYe = null;
  gameData = [];

  constructor(
    private $CommonDataService: CommonDataService,
    private $GlobalService: GlobalService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute,
    private $GlobalMethodsService: GlobalMethodsService,
  ) {
  }

  ngOnInit() {
    this.gameUrl = sessionStorage.getItem('gameUrl');
    this.$ActivatedRoute.params.subscribe(params => {
      this.gameId = params.gameId;
      this.$GlobalService.globalQueryModel.agamebalance.gameid = this.gameId;
      this.getGameBalance();
    });

  }

  /**
   *获取主账户金额
   */
  getGameBalance() {
    this.$CommonDataService.getGamebalance().then((res: Result) => {
      this.gameData = res.data;
      this.gameYe = res.data.balanceData[0].balance;
      this.accountBalance = res.data.balanceData[1].balance;
      this.transferAmount = Math.floor(this.accountBalance);
    });
  }

  /**
   *跳转到存款页
   */
  clickRouter() {
    this.$Router.navigate(['../../../index/ly-member/deposit'], {relativeTo: this.$ActivatedRoute});
  }

  /**
   * 跳转第三方游戏
   */
  goGames() {
    window.location.assign(`${this.$CommonDataService.dlUrl}${this.gameUrl}&userToken=${this.$GlobalService.globalQueryModel.userToken}`);
    // window.open(`${this.$CommonDataService.dlUrl}${this.gameUrl}&userToken=${this.$GlobalService.globalQueryModel.userToken}`, '_blank');
  }

  /**
   * 一键归账
   */
  keyAccount() {
    this.$CommonDataService.transferAllGameToMain().then((res: Result) => {
      if (res.success === 0) {
        this.$GlobalMethodsService.showTopCenter(res.msg);
        this.getGameBalance();
      }
    });
  }

  /**
   * 自动转账进入游戏
   */
  automaticTransfer() {
    this.$GlobalService.globalQueryModel.beginUserChange.fromGameName = this.gameData['balanceData'][1].id;
    this.$GlobalService.globalQueryModel.beginUserChange.toGameName = this.gameData['balanceData'][0].id;
    this.$GlobalService.globalQueryModel.beginUserChange.balance = this.transferAmount;
    this.$CommonDataService.beginUserChange().then((res: Result) => {
      if (res.success === 1) {
        this.modal.options.confirm = () => {
          this.goGames();
        };
      } else {
        this.$GlobalMethodsService.showTopCenter(res.msg);
        this.getGameBalance();
        this.goGames();
      }
    });
  }
}
