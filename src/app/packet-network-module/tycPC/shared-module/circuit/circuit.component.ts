import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../../core-module/common-util/global-service';

@Component({
  selector: 'app-circuit',
  templateUrl: './circuit.component.html',
  styleUrls: ['./circuit.component.scss']
})
export class CircuitComponent implements OnInit {

  constructor(
    public $GlobalService: GlobalService
  ) { }
  tim = 1;
  b = 1;
  isreload = false;
  autourl = [
    'https://yax686.com',
    'https://yax996.com',
    'https://yax936.com',
    // 'https://yax333.com'
  ];
  seconds = [];
  timeStamp = new Date().getTime();
  timer;
  ngOnInit() {
    this.isreload = true;
    this.foo(this.autourl);
    this.timer = setInterval(
      () => {
        this.tim++;
      }, 100);
    this.run();
  }
  // error事件去匹配网速
  autoTest(url, i) {
    if (this.tim > 200) {
      this.seconds[i] = '链接超时';
    } else {
      this.seconds[i] = this.tim + 'ms';
    }
  }
  // 初始化
  run() {
    for (let k = 0; k < this.autourl.length; k++) {
      this.seconds[k] = '正在测速..';
    }

  }
  // 重新检测
  retest() {
    // window.location.reload();
    clearInterval(this.timer);
    this.isreload = false;
    this.tim = 1;
    this.autourl = this.foo(this.autourl);
    this.timer = setInterval(
      () => {
        this.tim++;
      }, 100);
    this.run();
    setTimeout(() => {
      this.isreload = true;
    }, 100);
  }
  // 随机排序
  foo(arr) {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
      const index = Math.floor(Math.random() * (len - i));
      const temp = arr[index];
      arr[index] = arr[len - i - 1];
      arr[len - i - 1] = temp;
    }
    return arr;
  }
}
