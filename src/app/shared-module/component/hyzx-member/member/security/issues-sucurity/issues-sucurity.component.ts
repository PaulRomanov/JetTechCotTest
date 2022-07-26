import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../../core-module/common-util/result';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-issues-sucurity',
  templateUrl: './issues-sucurity.component.html',
  styleUrls: ['./issues-sucurity.component.scss']
})
export class IssuesSucurityComponent implements OnInit {
  selectedCity4: any = '你爸爸叫什么名字？';
  problemLogin;
  cities4: SelectItem[] = [
    {label: '你爸爸叫什么名字？', value: {id: 5, name: '你爸爸叫什么名字？'}},
    {label: '你妈妈叫什么名字？', value: {id: 10, name: '你妈妈叫什么名字？'}},
    {label: '最爱的一本书是什么？', value: {id: 20, name: '最爱的一本书是什么？'}},
    {label: '你出生地在哪里？', value: {id: 20, name: '你出生地在哪里？'}}
  ];
  // isShowWarning = {
  //   warning1: false
  // };
  constructor(
    private $CommonDataService: CommonDataService,
    public $GlobalService: GlobalService,
    private $ActivatedRoute: ActivatedRoute,
    private $Router: Router,
    private $GlobalMethodsService: GlobalMethodsService
  ) {
    this.$GlobalService.globalQueryModel.newUserSetsecurityQA.securityAnswer = '';
  }

  ngOnInit() {
    this.$GlobalService.globalQueryModel.newUserSetsecurityQA.securityQuestion = this.cities4[0].value.name;
  }
  dataTimeChange (event, name) {
    this.$GlobalService.globalQueryModel.newUserSetsecurityQA.securityQuestion = event.value.name;
  }
  problem () {
    this.problemLogin = !this.problemLogin;
    this.$CommonDataService.setNewUserSecurityQA().then((res: Result) => {
      this.problemLogin = !this.problemLogin;
      if (res.success === 0) {
        this.$GlobalMethodsService.showTopCenter(res.msg);
        this.$GlobalService.globalQueryModel.newUserSetsecurityQA.securityAnswer = '';
        this.$GlobalService.globalJavaResData.isHasSecurityQA = true;
        this.$Router.navigate(['../personalInformation'], {relativeTo: this.$ActivatedRoute});
        // setTimeout( () => {
        //   window.location.reload();
        // }, 2000);
      }
    });
  }
}
