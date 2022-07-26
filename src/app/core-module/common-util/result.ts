export class Result {
  public code?: any;
  public msg?: any;
  public data?: any;
  public data2?: any;
  public success?: any;
  public total?: any;
  public discounts?: any;
  public active?: any;
  public loginname?: any;
  public Password?: any;
  public sectoken?: string;
  list: any;
}

export class PopesMain {
  // 登录
  public isLoginCon = false; // 登录框是否显示
  public isLoginLoading = false; // 登录loading是否显示
  public loginMsg = '';
  public passwordLoginErr = false; // 密码错误信息是否显示
  public yzmUrl: string = ''; // 后台验证码
  public javaYzm = false; // 后台验证码显示
}

// 全民推广
export class SpreadActiveModel {
  public userCount2nd?: any;
  public userCountTotal?: any;
  public balance?: any;
  public cashBackAll?: any = 0;
  public  datauser?: [] = [];
  public  companySet?: Object;
  public delegatePercent?: any;
  public minimalDelegatePercent?: any;
  public maxDelegatePercent?: any;
  public  base?: Object;
  public  list?: [] = [];
}
