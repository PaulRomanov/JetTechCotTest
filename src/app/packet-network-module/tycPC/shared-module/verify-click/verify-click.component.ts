import { Component } from '@angular/core';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import * as $ from 'jquery';
import "./verify/verify.js";
@Component({
  selector: 'verify-click',
  templateUrl: './verify-click.component.html',
  styleUrls: ['./verify-click.component.scss']
})
export class VerifyClickComponent {
  
  constructor(
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService
  ) {
    
  }
  ngOnInit(): void {
    // if (!window.Promise) {
    //   document.writeln('<script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.min.js"><' + '/' + 'script>');
    // }
    this.getVerify()
  }
  getVerify(){
    // 初始化验证码  嵌入式
    (<any>$('#mpanel2')).pointsVerify({
      baseUrl:this.$GlobalService.globalJavaResData.cdnValidKey+'/ms/api',  
      mode:'fixed',
      imgSize : {
        width: '400px',
        height: '200px',
      },
      ready : function() {
      },
      success : (params:any) => {
        if(this.$GlobalService.globalTipsModelModel.loginisState.isLoginCon){
          this.$GlobalService.globalQueryModel.loginData.captchaVerification=encodeURIComponent(params.captchaVerification)
          this.$GlobalMethodsService.okLogins('')
        }else if(this.$GlobalService.globalTipsModelModel.regLoginisState.isLoginCon){
          this.$GlobalService.globalQueryModel.loginData.captchaVerification=encodeURIComponent(params.captchaVerification)
          this.$GlobalService.globalQueryModel.createUser.captchaVerification=encodeURIComponent(params.captchaVerification)
          this.$GlobalMethodsService.registeredLogin()
        }
      },
      error : function() {

      }
    });

  }
}
