import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../core-module/common-util/global-service';
// import { CommonMethods } from 'src/app/core-module/common-methods/common-methods';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.scss']
})
export class ForgetPwdComponent implements OnInit {
  constructor(
    public $GlobalService: GlobalService,
    public $CommonDataService: CommonDataService,
    public $GlobalMethodsService: GlobalMethodsService
  ) { }

  ngOnInit() {
  }
  closeWindow() {
    window.close();
  }

}
