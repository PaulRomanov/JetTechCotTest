// 导入模块
import {Pipe, PipeTransform} from '@angular/core';

// 管道名称
@Pipe({name: 'parametersPipe'})
export class ParametersPipe implements PipeTransform {
  // 参数说明:
  // value是在使用管道的时候,获取的所在对象的值
  // arg: 自定义参数, 数字类型, 使用的时候, 使用冒号添加在管道名称后面
  // transform(value: any, arg?: any) {
  // return JSON.stringify(value).replace(/:/g, '=').replace(/,/g, '&').replace(/{/g, '?').replace(/}/g, '').replace(/"/g, '')
  // .replace(/!/g, ':');
  // }

  transform(value: any, arg: any) {
    // console.log(value, arg);
    const paramsArr = [];
    if (arg) {
      Object.keys(arg).forEach(item => {
        paramsArr.push(item + '=' + arg[item]);
      });
      if (value.search(/\?/) === -1) {
        value += '?' + paramsArr.join('&');
      } else {
        value += '&' + paramsArr.join('&');
      }
    }
    return value;
  }
}
