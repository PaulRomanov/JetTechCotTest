import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../core-module/common-util/global-service';
import { GlobalMethodsService } from '../../../../core-module/common-methods/global-methods.service';
import { CommonDataService } from '../../../../core-module/common-util/common-data.service';
import { Result } from '../../../../core-module/common-util/result';
import { EventBusService } from '../../../../core-module/event-bus/event-bus';
@Component({
  selector: 'app-points-mall',
  templateUrl: './points-mall.component.html',
  styleUrls: ['./points-mall.component.scss']
})
export class PointsMallComponent implements OnInit {

  isUserToken:boolean = false
  score = 0

  constructor(
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    private $CommonDataService: CommonDataService,
    private $EventBusService:EventBusService
  ) { 
    if (this.$GlobalService.globalQueryModel.userToken || this.$GlobalService.globalQueryModel.swToken) {
      this.isUserToken = true;
    }
  }

  ngOnInit() {
    this.isUserToken && this.getScore()
    this.$EventBusService.eventBus.subscribe((val)=>{
      if(val === 'refresh_score'){
        this.getScore()
      }
    })
    
  }

  getScore(){
    this.$CommonDataService.scroeMallScoreQuery().then((res: Result) => {
      if(res.success == 0){
        this.score = res.data.score
      }
    })
  }

}
