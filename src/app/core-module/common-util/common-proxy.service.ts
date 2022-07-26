import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Result} from './result';
import {ParametersPipe} from '../pipe/parameters.pipe';
import {CommonMethods} from '../common-methods/common-methods';
import {GlobalService} from './global-service';
import {QueryModel, TipsModelModel} from './query-model';
import {Router} from '@angular/router';
import {LoadingBarService} from '../../shared-module/component/loading-bar/loading-bar.service';

@Injectable()
export class CommonProxyService {
  modal = window['modal'];
  dlUrl = '/ag/';

  constructor(
    private $http: HttpClient,
    private $GlobalService: GlobalService,
    private $Router: Router,
    private $LoadingBarService: LoadingBarService
  ) {
  }

  proxyService(type: string, url: string, body?: any, options?: any) {
    this.getUserToken();
    // this.$LoadingBarService.open();
    if (type === 'get') {
      return new Promise((resolve, reject) => {
        this.$http[type](`${this.dlUrl}${url}`).subscribe((result: Result) => {
          // this.$LoadingBarService.close();
          // 状态拦截
          if (result.success === 0 || result.success === true) {
            resolve(result);
          } else if (result.success === 1) {
            this.modal.open({
              message: result.msg,
              confirmShow: true,
              confirmTxt: '确认',
              cancelShow: false,
            });
            this.clearData();
            resolve(result);
          } else if (result.success === 3 || result.success === '3') {
            this.modal.open({
              message: '系统检测到您的会话失效，请重新登录！',
              confirmShow: true,
              confirmTxt: '确认',
              cancelShow: false,
            });
            this.$Router.navigate(['']);
            this.modal.options.confirm = () => {
              this.clearData();
              window.location.reload();
            };
            // reject(result);
          } else {
            resolve(result);
          }
          this.getUserToken();
        });
      });
    } else if (type === 'post') {
      return new Promise((resolve, reject) => {
        this.$http[type](`${this.dlUrl}${new ParametersPipe().transform(url, body)}`, null).subscribe((result: Result) => {
          // this.$LoadingBarService.close();
          // 状态拦截
          if (result.success === 0 || result.success === true) {
            resolve(result);
          } else if (result.success === 1) {
            if (!options) {
              this.modal.open({
                message: result.msg,
                confirmShow: true,
                confirmTxt: '确认',
                cancelShow: false,
              });
            }
            resolve(result);
          } else if (result.success === 3 || result.success === '3') {
            this.modal.open({
              message: '系统检测到您的会话失效，请重新登录！',
              confirmShow: true,
              confirmTxt: '确认',
              cancelShow: false,
            });
            this.$Router.navigate(['']);
            this.modal.options.confirm = () => {
              this.clearData();
              window.location.reload();
            };
            // reject(result);
          } else {
            resolve(result);
          }
          this.getUserToken();
        });
      });
    } else if (type === 'post1') {
      return new Promise((resolve, reject) => {
        this.$http.post(`${this.dlUrl}${url}`, null, { params: body }).subscribe((result: Result) => {
          // this.$LoadingBarService.close();
          // 状态拦截
          if (result.success === 0 || result.success === true) {
            resolve(result);
          } else if (result.success === 1) {
            if (!options) {
              this.modal.open({
                message: result.msg,
                confirmShow: true,
                confirmTxt: '确认',
                cancelShow: false,
              });
            }
            resolve(result);
          } else if (result.success === 3 || result.success === '3') {
            this.modal.open({
              message: '系统检测到您的会话失效，请重新登录！',
              confirmShow: true,
              confirmTxt: '确认',
              cancelShow: false,
            });
            this.$Router.navigate(['']);
            this.modal.options.confirm = () => {
              this.clearData();
              window.location.reload();
            };
            // reject(result);
          } else {
            resolve(result);
          }
          this.getUserToken();
        });
      });
    }
  }
  proxyService1(url: string, body?: any, options?: any) {
    this.getUserToken();
    // this.$LoadingBarService.open();
    return new Promise((resolve, reject) => {
      this.$http.post(`${this.dlUrl}${new ParametersPipe().transform(url, body)}`, options).subscribe((result: any) => {
        if (result.success === 0 || result.success === true) {
          resolve(result);
        } else if (result.success === 1) {
          this.modal.open({
            message: result.msg,
            confirmShow: true,
            confirmTxt: '确认',
            cancelShow: false,
          });
          resolve(result);
        } else if (result.success === 3 || result.success === '3') {
          this.modal.open({
            message: '系统检测到您的会话失效，请重新登录！',
            confirmShow: true,
            confirmTxt: '确认',
            cancelShow: false,
          });
          this.$Router.navigate(['']);
          this.modal.options.confirm = () => {
            this.clearData();
            window.location.reload();
          };
          // reject(result);
        } else {
          resolve(result);
        }
        this.getUserToken();
      })
    })
  }

  getUserToken() {
    this.$GlobalService.globalQueryModel.userToken = CommonMethods.getUserToken();
    this.$GlobalService.globalQueryModel.swToken = CommonMethods.getSwToken();
    this.$GlobalService.globalQueryModel.companyId = CommonMethods.getcompanyId();
    // 登录名
    this.$GlobalService.globalQueryModel.sessionStorageName = sessionStorage.getItem('loginWeb');
    // 设置token
    Object.keys(this.$GlobalService.globalQueryModel).forEach((item: any) => {
      if (this.$GlobalService.globalQueryModel[item] &&
        typeof this.$GlobalService.globalQueryModel[item].length !== 'number' &&
        this.$GlobalService.globalQueryModel[item] instanceof Object) {
        if (this.$GlobalService.globalQueryModel[item].hasOwnProperty('userToken')) {
          this.$GlobalService.globalQueryModel[item].userToken = this.$GlobalService.globalQueryModel.userToken;
        }
      }
    });
    Object.keys(this.$GlobalService.globalQueryModel).forEach((item: any) => {
      if (this.$GlobalService.globalQueryModel[item] &&
        typeof this.$GlobalService.globalQueryModel[item].length !== 'number' &&
        this.$GlobalService.globalQueryModel[item] instanceof Object) {
        if (this.$GlobalService.globalQueryModel[item].hasOwnProperty('companyId')) {
          this.$GlobalService.globalQueryModel[item].companyId = this.$GlobalService.globalQueryModel.companyId;
        }
        if (this.$GlobalService.globalQueryModel[item].hasOwnProperty('cid')) {
          this.$GlobalService.globalQueryModel[item].cid = this.$GlobalService.globalQueryModel.companyId;
        }
        if (this.$GlobalService.globalQueryModel[item].hasOwnProperty('keyId')) {
          this.$GlobalService.globalQueryModel[item].keyId = this.$GlobalService.globalQueryModel.companyId;
        }
      }
    });

    Object.keys(sessionStorage).forEach(el => {
      if (this.$GlobalService.globalQueryModel.hasOwnProperty(el)) {
        this.$GlobalService.globalQueryModel[el] = sessionStorage.getItem(el);
      }
    });
    // 关于试玩的接口需要用到swToken 单独处理
    this.$GlobalService.globalQueryModel.agamebalance.userToken =
      this.$GlobalService.globalQueryModel.userToken ? CommonMethods.getUserToken() : CommonMethods.getSwToken();
    this.$GlobalService.globalQueryModel.loginoutuser.userToken =
      this.$GlobalService.globalQueryModel.userToken ? CommonMethods.getUserToken() : CommonMethods.getSwToken();
    this.$GlobalService.globalQueryModel.openWebMsg.userToken =
      this.$GlobalService.globalQueryModel.userToken ? CommonMethods.getUserToken() : CommonMethods.getSwToken();
  }

  /**
   * 清除数据
   */
  clearData() {
    sessionStorage.clear();
    this.$GlobalService.globalQueryModel = new QueryModel();
    this.$GlobalService.globalTipsModelModel = new TipsModelModel();
    this.$Router.navigate(['']);
  }
}
