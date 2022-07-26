import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../../core-module/common-util/result';

@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.scss']
})
export class SecurityQuestionComponent implements OnInit {
  problemLogin = false;
  cities4: SelectItem[] = [
    {label: '你爸爸叫什么名字？', value: {id: 5, name: '你爸爸叫什么名字？'}},
    {label: '你妈妈叫什么名字？', value: {id: 10, name: '你妈妈叫什么名字？'}},
    {label: '最爱的一本书是什么？', value: {id: 20, name: '最爱的一本书是什么？'}},
    {label: '你出生地在哪里？', value: {id: 20, name: '你出生地在哪里？'}}
  ];
  selectedCity4: any;
  cities3: SelectItem[] = [
    {label: '你爸爸叫什么名字？', value: {id: 5, name: '你爸爸叫什么名字？'}},
    {label: '你妈妈叫什么名字？', value: {id: 10, name: '你妈妈叫什么名字？'}},
    {label: '最爱的一本书是什么？', value: {id: 20, name: '最爱的一本书是什么？'}},
    {label: '你出生地在哪里？', value: {id: 20, name: '你出生地在哪里？'}}
  ];
  selectedCity3: any;
  isShowWarning = {
    warning1: false,
    warning2: false
  };
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $GlobalMethodsService: GlobalMethodsService
  ) { }

  ngOnInit() {
    this.$GlobalService.globalQueryModel.ChangeSecurityQA.oldSq = this.cities4[0].value.name;
    this.$GlobalService.globalQueryModel.ChangeSecurityQA.newSq = this.cities3[0].value.name;
  }
  dataTimeChange (event, name) {
    if (name === 1) {
      this.$GlobalService.globalQueryModel.ChangeSecurityQA.oldSq = event.value.name;
    } else {
      this.$GlobalService.globalQueryModel.ChangeSecurityQA.newSq = event.value.name;
    }
  }
  problem () {
       // 拦截：
       if (!this.$GlobalService.globalQueryModel.ChangeSecurityQA.oldSa) {
        this.isShowWarning.warning1 = true;
        return;
      } else {
        this.isShowWarning.warning1 = false;
      }
      if (!this.$GlobalService.globalQueryModel.ChangeSecurityQA.newSa) {
        this.isShowWarning.warning2 = true;
        return;
      } else {
        this.isShowWarning.warning2 = false;
      }
    this.problemLogin = !this.problemLogin;
    this.$CommonDataService.ChangeSecurityQA().then((res: Result) => {
      this.problemLogin = !this.problemLogin;
      if (res.success === 0) {
        this.$GlobalMethodsService.showTopCenter(res.msg);
        this.$GlobalService.globalQueryModel.ChangeSecurityQA.oldSa = '';
        this.$GlobalService.globalQueryModel.ChangeSecurityQA.newSa = '';
        this.$GlobalService.globalQueryModel.ChangeSecurityQA.oldSq = this.cities4[0].value.name;
        this.$GlobalService.globalQueryModel.ChangeSecurityQA.newSq = this.cities3[0].value.name;
        this.selectedCity4 = this.cities4[0];
        this.selectedCity3 = this.cities3[0];
      }
    });
  }
}
