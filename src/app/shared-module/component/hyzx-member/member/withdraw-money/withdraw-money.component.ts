import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonDataService } from '../../../../../core-module/common-util/common-data.service';
import { GlobalService } from '../../../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../../../core-module/common-methods/global-methods.service';
@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.scss']
})
export class WithdrawMoneyComponent implements OnInit {
  items: MenuItem[];
  isLoad = 0;
  isShow = false;
  ngOnInit() {
    this.items = [
      { label: '填写取款资料' },
      { label: '确认取款申请' },
      { label: '提交取款申请' }
    ];
  }
  constructor(private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService) { }
  getIsLading(event) {
    this.isLoad = event.value;
    // 出款时间提示语
    if (this.isLoad === 2 && this.$GlobalService.globalJavaResData.WITAUDITFLAG['WITAUDITFLAG'] === '0') {
      if (this.$GlobalService.globalQueryModel.appImmediatelyaudit.money >
        this.$GlobalService.globalJavaResData.WITAUDITFLAG['WITAUDITAMOUNT']) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      console.log(this.$GlobalService.globalJavaResData.WITAUDITFLAG);
    } else {
      this.isShow = false;
    }
  }
}
