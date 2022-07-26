import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {

  constructor(
    public $GlobalService: GlobalService
  ) { }

  ngOnInit() {
  }

}
