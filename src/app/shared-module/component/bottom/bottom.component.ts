import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../core-module/common-util/global-service';

@Component({
  selector: 'pc-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss']
})
export class BottomComponent implements OnInit {

  constructor(
    public $GlobalService: GlobalService,
  ) { }

  ngOnInit() {
  }

}
