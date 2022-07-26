import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core-module/common-util/global-service';

@Component({
  selector: 'pc-djbottom',
  templateUrl: './djbottom.component.html',
  styleUrls: ['./djbottom.component.scss']
})
export class DjbottomComponent implements OnInit {

  constructor(
    public $GlobalService: GlobalService
  ) { }

  ngOnInit() {
  }

}
