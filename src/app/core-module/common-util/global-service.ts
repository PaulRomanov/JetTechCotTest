import {Injectable} from '@angular/core';
import {JavaResData, QueryModel, TipsModelModel} from './query-model';

@Injectable()
export class GlobalService {
  // 全局提交数据
  public _globalQueryModel = new QueryModel();
  // 报错信息
  public _TipsModelModel = new TipsModelModel();
  // 存储后台的数据
  public _javaResData = new JavaResData();
  constructor() {
  }

  set globalQueryModel(obj) {
    this._globalQueryModel = obj;
  }

  get globalQueryModel() {
    return this._globalQueryModel;
  }

  set globalTipsModelModel(obj) {
    this._TipsModelModel = obj;
  }

  get globalTipsModelModel() {
    return this._TipsModelModel;
  }

  set globalJavaResData(obj) {
    this._javaResData = obj;
  }

  get globalJavaResData() {
    return this._javaResData;
  }

  /**
   * 初始化数据
   */
  initGlobalData() {
    this._globalQueryModel = new QueryModel();
  }

  initTipModel() {
    this._TipsModelModel = new TipsModelModel();
  }
}
