import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import Swiper from 'swiper';
import {SelectItem} from 'primeng/api';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonDataService} from '../../../../../../core-module/common-util/common-data.service';
import {GlobalService} from '../../../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../../../core-module/common-methods/global-methods.service';
import {Result} from '../../../../../../core-module/common-util/result';
import {Dropdown} from 'primeng/primeng';

@Component({
  selector: 'app-know-huobi',
  templateUrl: './know-huobi.component.html',
  styleUrls: ['./know-huobi.component.scss']
})
export class KnowHuobiComponent implements OnInit, DoCheck {
  oldUrl = null;
  onLine;
  myhref = "";
  isCompany = 0;
  isDiscounts;
  cities1: SelectItem[] = [];
  selectedCity1: any;
  heepaydata;
  urlLink;
  layerShow = false;
  whichBlock = null;
  orderNo;
  cities2: SelectItem[] = [];
  selectedCity2: any;
  modal = window['modal'];
  imgSrc;
  placeHolder = '请输入金额';
  moneyArr = [];
  isMoneyWarnShow = false;
  isShowUSDT = false;
  USDTrate = 0;
  warnTxt;
  restrictionType;
  selectMoneyArr = [];
  selectKey = 0;
  isUSDT = false;
  constructor(public $CommonDataService: CommonDataService,
              public $GlobalService: GlobalService,
              public $GlobalMethodsService: GlobalMethodsService,
              public router: Router,
              private $ActivatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // setTimeout(() => {
    //   console.log(this.$GlobalService.globalQueryModel.getPayListName);
    // }, 1000);
    console.log("11111111111111111111");
    console.log(location.href);
    console.log("22222222222222222222");
    var ssr = location.href;
    var sr = ssr.indexOf("anxin");
    if(sr == -1){
      this.myhref = "yaxin";
    }else{
      this.myhref = "anxin";
    }
    console.log(this.myhref);
  }

  ngDoCheck(): void {
    
  }

  goBack() {
    history.go(-1);
  }

 
}

