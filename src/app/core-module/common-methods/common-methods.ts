import {FormExp, RegularExp} from '../common-util/regular-exp';

export class CommonMethods {
  /**
   *获取用户的token
   */
  static getUserToken() {
    if (sessionStorage.getItem('userToken') !== 'undefined') {
      return sessionStorage.getItem('userToken');
    } else {
      return null;
    }
  }

  static getSwToken() {
    if (sessionStorage.getItem('swToken') !== 'undefined') {
      return sessionStorage.getItem('swToken');
    } else {
      return null;
    }
  }

  /**
   *获取用户的 companyId
   */
  static getcompanyId() {
    if (sessionStorage.getItem('companyId') !== 'undefined') {
      return sessionStorage.getItem('companyId');
    } else {
      return null;
    }
  }

  /**
   * uuid
   */
  static getUuid() {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    const uuid = s.join('');
    return uuid;
  }

  /**
   * 表单效验（可参考注册页面）
   * param name
   * param data
   */
  static changeFormExp(name, data?: FormExp) {
    const maxLength = data.max || 13;
    const minLength = data.min || 6;
    // 正则效验
    const str = data.regular;
    const re = new RegExp(RegularExp[str]);
    if (!re.test(name)) {
      data.isState = true; // 错误信息状态
      data.stateNum = true; // 按钮禁用状态
      return data;
    }
    // 长度效验
    if (name.length !== 0 && (name.length < minLength || name.length > maxLength + 1)) {
      data.isState = true;
      data.stateNum = true;
      return data;
    }
    data.isState = false;
    data.stateNum = false;
    return data;
  }

  /**
   * 深拷贝
   * param obj   拷贝对象
   * returns {any[] | {}}   返回拷贝对象
   */
  public static deepClone(obj): any {
    const objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // 判断ojb子元素是否为对象，如果是，递归复制
          if (obj[key] && typeof obj[key] === 'object') {
            objClone[key] = this.deepClone(obj[key]);
          } else {
            // 如果不是，简单复制
            objClone[key] = obj[key];
          }
        }
      }
    }
    return objClone;
  }
}

