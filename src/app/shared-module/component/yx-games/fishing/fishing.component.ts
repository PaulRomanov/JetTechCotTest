import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../core-module/common-util/result';

@Component({
  selector: 'app-fishing',
  templateUrl: './fishing.component.html',
  styleUrls: ['./fishing.component.scss']
})
export class FishingComponent implements OnInit, AfterViewInit, OnDestroy {
  domain;
  domain2;
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService,
  ) {
  }

  ngOnInit() {

  }

  goGame(item) {
    this.$GlobalMethodsService.goGameResolve(item);
  }

  loadScript() {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = './assets/common/fishing/fishing.js';
    script.id = 'zmFishing';
    head.appendChild(script);
  }

  ngAfterViewInit(): void {
    this.loadScript();
  }

  ngOnDestroy(): void {
    const zmFishing = document.getElementById('zmFishing');
    const prent = zmFishing.parentNode;
    if (zmFishing) {
      prent.removeChild(zmFishing);
    }
  }
}
