import {Component, OnInit} from '@angular/core';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../core-module/common-util/result';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
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

}
