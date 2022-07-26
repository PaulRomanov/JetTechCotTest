import { Component, OnInit } from '@angular/core';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import { GlobalService } from '../../../../core-module/common-util/global-service';
@Component({
  selector: 'app-beauty-home-service',
  templateUrl: './beauty-home-service.component.html',
  styleUrls: ['./beauty-home-service.component.scss']
})
export class BeautyHomeServiceComponent implements OnInit {

  constructor(
    public $GlobalMethodsService: GlobalMethodsService,
    public $GlobalService: GlobalService
  ) {
  }
  ngOnInit() {}
  closeWindow() {
    window.close();
  }
}
