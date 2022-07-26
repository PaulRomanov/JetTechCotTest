import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'pc-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit, OnDestroy {
  isColor = true;
  itrem = null;

  constructor(
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
  ) {
  }

  ngOnInit() {
    this.itrem = setInterval(() => {
      this.isColor = !this.isColor;
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.itrem) {
      clearInterval(this.itrem);
    }
  }

  openCooperation() {
    window.open(`#/${environment.rootUrl}/newPage/vipPage`, '_blank');
  }
}
