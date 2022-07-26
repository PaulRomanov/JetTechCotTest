import { Component, OnInit, DoCheck } from '@angular/core';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';


@Component({
  selector: 'app-deposit-offical',
  templateUrl: './deposit-offical.component.html',
  styleUrls: ['./deposit-offical.component.scss']
})
export class DepositOfficalComponent implements OnInit, DoCheck {
  rechargerList = [];
  oldUrl = null;
  clipboard = window['ClipboardJS'];
  modal = window['modal'];
  isShow = false;
  newData;
  constructor(
    public $GlobalService: GlobalService
  ) {
  }

  ngOnInit() {

  }
  ngDoCheck(): void {
    // 监听公司入款
    if (this.oldUrl !== this.$GlobalService.globalQueryModel.getPayListData) {
      this.oldUrl = this.$GlobalService.globalQueryModel.getPayListData;
      if (Object.keys(this.oldUrl).length !== 0) {
        this.rechargerList = this.oldUrl.rechargerList;
      }
    }
  }
  details(item, index) {
    this.isShow = true;
    this.newData = item;
  }
  goBack() {
    this.isShow = false;
  }
  // copyWechat(item, index) {
  //   const currentId = '#wechat' + (index + 1);
  //   const clipboard = new this.clipboard(currentId);
  //   clipboard.on('success', (e) => {
  //     this.modal.open({
  //       message: '复制成功',
  //       confirmShow: true,
  //       confirmTxt: '确认',
  //       cancelShow: false
  //     });
  //     e.clearSelection();
  //   });
  //   clipboard.on('error', (e) => {
  //     this.modal.open({
  //       message: '复制失败，请重新复制',
  //       confirmShow: true,
  //       confirmTxt: '确认',
  //       cancelShow: false
  //     });
  //     e.clearSelection();
  //   });
  // }
}
