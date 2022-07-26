import {Subject} from 'rxjs';
import {Injectable, OnInit} from '@angular/core';
import {Result} from '../common-util/result';
import {CommonDataService} from '../common-util/common-data.service';

@Injectable()
export class NativeWebsocketImplService {
  private socket;
  // 心跳检测时间 默认一分钟发起一次心跳检测
  private heartCheckTime = 60 * 1000;
  private heartCheckTimeOut;
  // 通过订阅的方式拿到消息
  subscibeMessage;
  private messageTopic;
  private isConnect: boolean;
  private connectNum = 0;
  // 获取请求的数据
  socketData;
  ip;
  port;
  loginMessageToken;
  userName;
  webSocketHost;

  constructor(
    private $CommonDataService: CommonDataService
  ) {
    // 是否为连接状态
    // this.connect();
    // this.getWebsocketIp();
  }

  /**
   * 连接
   */
  connect() {

    // 获取请求的数据
    // this.$CommonDataService.getWebSocketUrl().then((res: Result) => {
    //   console.log('29', res);
    //   this.socketData = res;
    //   this.ip = this.socketData.ip;
    //   this.port = this.socketData.port;
    //   this.loginMessageToken = this.socketData.token;
    //   this.userName = this.socketData.username;
    //   if (this.loginMessageToken != null && this.loginMessageToken.trim() !== '') {
    //     const pro = document.location.protocol;
    //     if (pro === 'https' || pro === 'https:') { // https协议，只能使用域名和wss
    //       this.webSocketHost = `wss://${this.ip}:${this.port}`;
    //     } else {
    //       this.webSocketHost = `ws://${this.ip}:${this.port}`;
    //     }
    //   }
    //   this.messageTopic = new Subject<any>();
    //   this.subscibeMessage = this.messageTopic.asObservable();
    //   // this.socket = new WebSocket(`ws://152.101.131.145:9000`);
    //   this.socket = new WebSocket(this.webSocketHost);
    //   // 链接成功
    //   this.socket.onopen = () => {
    //     console.log('链接成功！');
    //     this.isConnect = true;
    //   };
    //   // 开启心跳检测
    //   // this.heartCheckStart();
    //   this.socket.onmessage = (event) => {
    //     this.messageTopic.next(event);
    //   };
    // });

  }

  /**
   * 关闭
   */
  // close() {
  //   if (this.socket) {
  //     this.socket.close();
  //     this.messageTopic.complete();
  //   }
  // }

  /**
   * 获取数据（可能存在隐患）
   * 建议适用订阅的方式获取数据
   * param {(event) => {}} fn
   */
  // getMessage(fn: (event) => {}) {
  //   if (this.socket) {
  //     this.socket.onmessage = (event) => {
  //       this.isConnect = true;
  //       if (fn) {
  //         fn(event);
  //       }
  //     };
  //   }
  // }

  /**
   * 心跳开始
   */
  // heartCheckStart() {
  //   this.connectNum++;
  //   this.isConnect = false;
  //   this.heartCheckTimeOut = setTimeout(() => {
  //     this.socket.send('ping');
  //     console.log('正在ping服务器。。。。。。。');
  //     setTimeout(() => {
  //       if (!this.isConnect && this.connectNum < 4) {
  //         // 重新连接
  //         this.heartCheckRest();
  //         this.connect();
  //       }
  //     }, 6000);
  //   }, this.heartCheckTime);
  //
  // }

  /**
   * 重置心跳
   */
  // heartCheckRest() {
  //   clearInterval(this.heartCheckTimeOut);
  //   this.connectNum = 0;
  // }


  /**
   *
   */
  // getWebsocketIp() {
    // 获取请求的数据
    // this.$CommonDataService.getWebSocketUrl().then((res: Result) => {
    //   console.log('29', res);
    //   this.socketData = res;
    //   this.ip = this.socketData.ip;
    //   this.port = this.socketData.port;
    //   this.loginMessageToken = this.socketData.token;
    //   this.userName = this.socketData.username;
    //   if (this.loginMessageToken != null && this.loginMessageToken.trim() !== '') {
    //     const pro = document.location.protocol;
    //     if (pro === 'https' || pro === 'https:') { // https协议，只能使用域名和wss
    //       this.webSocketHost = `wss://${this.ip}:${this.port}`;
    //     } else {
    //       this.webSocketHost = `ws://${this.ip}:${this.port}`;
    //     }
    //   }
    // });
  // }
}
