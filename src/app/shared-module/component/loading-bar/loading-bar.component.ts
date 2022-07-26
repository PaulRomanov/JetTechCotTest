import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from './loading-bar.service';
import {GlobalService} from '../../../core-module/common-util/global-service';
@Component({
  selector: 'loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
  show: boolean = false;
  timer;
  constructor(
    public $GlobalService: GlobalService,
  ) {
    LoadingBarService.loading = this;
  }
  ngOnInit() {
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }
}
