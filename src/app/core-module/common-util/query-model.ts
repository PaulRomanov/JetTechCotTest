// 参数

import {CommonMethods} from '../common-methods/common-methods';
import { environment } from 'src/environments/environment';
// 这里存储需要提交的数据
export class QueryModel {
  companyId = CommonMethods.getcompanyId();
  userToken = CommonMethods.getUserToken();
  swToken = CommonMethods.getSwToken();
  homegame = {
    companyId: this.companyId,
    type: '2',
    userToken: this.userToken
  };
  loginoutuser = {
    userToken: null,
    deviceType: 1
  };
  verifySwitch = {
    userToken: this.userToken,
    companyId: this.companyId,
    deviceType: 1
  }
  allbalancelist = {
    userToken: this.userToken,
  };
  modifyPhoneCheck = {
    userToken: this.userToken,
  };
  orderHistory = {
    userToken: this.userToken,
    startTime: '',
    endTime: '',
    status: 0,
    page: 1,
    pageSize: 5
  }
  scoreHistory = {
    userToken: this.userToken,
    startTime: '',
    endTime: '',
    changeAttr: 0,
    page: 1,
    pageSize: 5
  }
  productDetail = {
    userToken: this.userToken,
    productId: ''
  }
  hotGoodsList = {
    cid: this.companyId,
    page: 1,
    pageSize: 8
  }
  createOrder ={
    productId: '',
    userToken: this.userToken,
    addressee: '',
    address: '',
    phoneno: '',
    amount: 0,
    serial: ''
  }
  RotationChart = {
    cid: this.companyId,
  };
  getActivityDiscountSubset = {
    cid: this.companyId,
    type: '',
    belongendACt: '',
  };
  loginData = {
    loginName: null,
    passWord: '',
    code: '',
    codeKey: '',
    companyId: this.companyId,
    deviceType: 1,
    captchaVerification:'',
    sectoken: ''
  };
  IGPC = {
    game: null,
    gameId: null,
  };
  //红包雨
  envelopSwitch = {
    deviceId: 0,
    companyId: this.companyId,
    userToken: this.userToken
  }
  //积分商城开关
  scoreMallSwitch = {
    cid: this.companyId
  }
  //红包记录
  envelopRecord = {
    userToken: this.userToken,
    starttime: null,
    endtime: null,
    pagesize: 10,
    page: 1,
    status: null
  }
  //刮刮乐
  scratch = {
    userToken: this.userToken,
    phoneno: '' ,
    smscode: ''
  }
  //刮刮乐活动-刮开奖金
  scratchOpen = {
    userToken: this.userToken,
    deviceType: '1' 
  }
  // getMatch = {
  //   userToken: this.userToken,
  // };
  // 注册
  createUser = {
    companyId: this.companyId,
    loginName: '',
    passWord: '',
    ensurePassword: '',
    mobile: '',
    email: '',
    qq: '',
    realName: '',
    code: '',
    codeKey: '',
    referCode: '',
    isreferCode: false,
    qRcode: '',
    smsCode: '',
    pcode: '',
    captchaVerification: '',
    deviceType: 1
  };
  // 快速注册
  fastCreateUser = {
    companyId: this.companyId,
    mobile: '',
    smsCode: '',
    referCode: ''
  };
  // 获取短信验证码
  mobileYzm = {
    mobile: '',
    companyId: this.companyId,
    code: '',
    vcode: '',
    codeKey: ''
  };
  // 短信验证码登录
  mobileLogin = {
    mobile: '',
    companyId: this.companyId,
    vcode: '',
  };
  // 获取短信验证码权限开关
  mobileYzmIsOk = {
    cid: this.companyId,
    type: 1
  };
  // 账号是否被注册
  userNumCheck = {
    companyId: this.companyId,
    loginName: '',
  };
  // 手机号是否被注册
  phoneNumberCheck = {
    mobile: '',
    companyId: this.companyId,
    userType: 'MEMBERSHIP',
  };

  //vip中心--我的礼金记录
  myGiftRecordQuery = {
    userToken: this.userToken,
    bounsType: 0,
    page: 1,
    pageSize: 10,
    dateStart: '',
    dateEnd: ''
  }
  mainToGame = {
    userToken: this.userToken,
    gameId: null,
  };
  newNoticeList = {
    userToken: this.userToken,
    page: 1,
    pagesize: 5
  };
  hisNoticeList = {
    userToken: this.userToken,
    page: 1,
    pagesize: 5
  };
  getPersonalMessage = {
    userToken: this.userToken,
    page: 1,
    pagesize: 5,
  };
  getpayment = {
    userToken: this.userToken,
  };
  appImmediatelyaudit = {
    userToken: this.userToken,
    money: null
  };
  auditwithdrawontime = {
    userToken: this.userToken,
    money: null,
    userbankpassword: null
  };
  getPayList = {
    deviceType: 'pc',
    userToken: this.userToken,
  };
  getPayType = {
    userToken: this.userToken,
    deviceType: 'pc',
    payChannel: null,
  };
  heepay = {
    userToken: this.userToken,
    loginName: sessionStorage.getItem('loginName'),
    amount: null,
    bank_segment: '',
    deviceType: 1,
    isfavorable: '',
    payPlatFormId: null,
    paynum: null,
    channel: 0,
    paychannel: null,
  };
  transferAllGameToMain = {
    userToken: this.userToken,
  };
  beginUserChange = {
    userToken: this.userToken,
    balance: '',
    from: null,
    to: null,
    fromGameName: null,
    toGameName: null,
  };
  getUserAccountList = {
    userToken: this.userToken,
    page: null,
    pagesize: null,
    type: null,
    status: null,
    starttime: null,
    endtime: null,
  };
  setInfo = {
    address: null,
    birthday: null,
    email: null,
    mobile: null,
    qq: null,
    realname: null,
    sex: 1,
    userToken: this.userToken,
    withdrawpwd: null,
  };
  getUserInfo = {
    userToken: this.userToken,
  };
  modify = {
    userToken: this.userToken,
    type: '',
    newPwd: null,
    oldPwd: null,
  };
  isModify = {
    userToken: this.userToken,
  };
  ChangeSecurityQA = {
    userToken: this.userToken,
    newSa: '',
    oldSa: '',
    newSq: '',
    oldSq: '',
  };
  newUserSetsecurityQA = {
    securityQuestion: '',
    securityAnswer: '',
    userToken: this.userToken,
  };
  isHassetsecurityQA = {
    userToken: this.userToken,
  };
  getpaymentName = {
    userToken: this.userToken,
  };
  userconfig = {
    refercode: null,
    usertype: null,
    keygroup: null,
    keyname: null,
    userToken: this.userToken,
    companyId: this.companyId
  };
  getActivityPreact = {
    cid: this.companyId,
  };
  // 投注历史游戏下拉列表
  tzListHistory = {
    companyId: this.companyId
  };
  getTzHosityList = {
    userToken: this.userToken,
    page: null,
    pageSize: null,
    game: null,
    startTime: null,
    endTime: null,
  };
  // 活动申请记录页面数据
  activityType = {
    cid: this.companyId
  };
  activityData = {
    userToken: this.userToken,
    page: null,
    pageSize: null,
    actId: '',
    verstatus: null,
    starttime: null,
    endtime: null
  };
  preloadBankList = {
    bigtype: null,
    banktype: null,
    userToken: this.userToken,
  };
  mcashgsrk = {
    userToken: this.userToken,
    code: null,
  };
  getBanklist = {
    appVersion: 'now',
    bankid2: null,
    banktype: null,
    paytype: null,
    userToken: this.userToken,
  };
  searchAppBettotal = {
    strattime: null,
    endtime: null,
    userToken: this.userToken,
  };
  saveDeposite = {
    userToken: this.userToken,
    bankid: null,
    ckyh: '',
    depositusername: null,
    money: null,
    paytype: null,
    serial: null,
  };
  saveDepositeImage = null;
  getAppDiscount = {
    amount: null,
    // stype: '',
    payChannel: '',
    userToken: this.userToken,
  };
  // 保存取款信息
  saveWithdraw = {
    userToken: this.userToken,
    inputmoney: null,
    money: null,
    privilegemoney: null,
    userbankpassword: null,
    bankid: null,
    commfee: null,
    payfee: null,
    factorage: null,
    withdrawtime: null,
    sectoken: null
  };
  getAppBankLists = {
    state: null,
    pagenum: 100,
    userToken: this.userToken,
  };
  delUserBankCard = {
    userToken: this.userToken,
    bankid: null,
  };
  getFullInfoSwtich = {
    userToken: this.userToken,
  };
  addCard = {
    accountnum: '',
    bankname: '',
    branch: '',
    city: '',
    province: '',
    banktype: '0',
    userToken: this.userToken,
  };
  getValidReceiptsbBankList = {
    userToken: this.userToken,
  };
  updCard = {
    bankId: null,
    bankName: null,
    branch: null,
    province: null,
    city: null,
    accountnum: null,
    userToken: this.userToken,
  };
  // 即时稽核
  auditTimeData = {
    userToken: this.userToken,
    page: 1,
    pageSize: 5
  };
  // 账户安全等级
  accountSecurityLevel = {
    userToken: this.userToken,
  };

  // 游戏账户余额单个接口
  agamebalance = {
    userToken: this.userToken,
    gameid: '',
    companyId: this.companyId
  };
  // 游戏菜单
  getComputerGamet = {
    gamePlatformId: null
  };
  // 游戏列表
  getDzGameList = {
    gameplatformId: null,
    client: 'PC'
  };
  // 全民推广-领取奖励
  getRewardMoney = {
    userToken: this.userToken,
    gameid: ''
  };
  // 全民推广-一键激活
  goToSpreadActive = {
    userToken: this.userToken
  };
  // 全民推广-是否已激活
  getUserSpreadActiveData = {
    userToken: this.userToken
  };
  spreadActiveObj = {
    spreadActiveData: {
      qrcodeUrl: ''
    },
    isSpreadActive: false
  };
  // 全民推广-可领取奖励明细
  getSpreadRewardData = {
    userToken: this.userToken,
    memberName: ''
  };
  // 全民推广-领取记录
  getSpreadRecordData = {
    userToken: this.userToken,
    page: null,
    pagesize: null,
    status: null,
    starttime: null,
    endtime: null
  };
  // 全民推广-推广明细
  getSpreadDetailData = {
    userToken: this.userToken,
    memberName: ''
  };
  // 全民推广-获取设置比例数据
  getSpreadPercent = {
    userToken: this.userToken,
    account: null,
    userid: ''
  };
  // 全民推广-提交设置比例数据
  setSpreadPercentData = {
    userToken: this.userToken,
    userid: null,
    status: null,
    percent: null,
    opercent: null
  };
  // 获取根据不同厅主获取CDN前缀域
  domainCdn = {
    usertype: 'COMPANY',
    keygroup: 'PCDN',
    keyname: 'CDNDOMAIN',
    keyId: this.companyId
  };
  // 弹窗公告
  openWebMsg = {
    companyId: this.companyId,
    type: '0',
    userToken: this.userToken
  };
  // 活动申请列表数据
  getActivityData = {
    belongedact: '',
    userToken: this.userToken,
    suitType: 'PC',
    cid: this.companyId
  };
  // 申请活动提交数据
  postActivityData = {
    userToken: this.userToken, // 用户token
    actname: '', // 活动名称
    belongedact: null, // 所属类型ID
    submitconfig: '', // 提交数据
    eventId: '', // 活动ID
    codeKey: '', // 验证码
    code: '' // 用户输入的验证码
  };
  // 进入详情页面获取数据
  getActivityDetail = {
    userToken: this.userToken,
    id: null,
    suitType: 'PC'
  };
  // 获取用户签到活动的申请记录
  getUserRewardList = {
    userToken: this.userToken,
    startTime: null,
    endTime: null,
    page: 1,
    pageSize: 5,
    reviewStatus: -1
  };
  // 推广赚钱数据统计报表
  dataReport = {
    userToken: this.userToken,
    memberName: '',
    startdate: null,
    enddate: null,
    userid: ''
  };
  // 设置默认银行卡
  setCardDefault = {
    userToken: this.userToken,
    bankid: null
  };
  // 忘记密码-通过手机找回
  verifyingPictureCode = {
    code: null,
    codeKey: null,
    loginName: null,
    companyId: this.companyId
  };
  // 忘记密码-通过手机找回
  sendMsg = {
    loginName: null,
    companyId: this.companyId,
    codeKey: null,
    key: null
  };
  verifyingPhoneCode = {
    loginName: null,
    fcode: null,
    cid: this.companyId
  };
  resetPsw = {
    fNewPassWord: null,
    fNewPassWord2: null,
    validKey: null
  };
  fsecQAT = {
    companyId: this.companyId,
    floginname: null,
    fsecQ: null,
    fsecA: null,
    key: null
  };
  // 获取个人信息未读条数
  getPersonalMessagewd = {
    userToken: this.userToken,
    page: 1,
    pagesize: 5
  };
  // 将未读消息设置为已读
  setState = {
    userToken: this.userToken,
    state: 1
  };
  // 获取免费领彩金接口开关
  getCaijinVerifySetting = {
    userToken: this.userToken
  };
  // 提交实名认证信息
  setCaijinVerifySetting = {
    userToken: this.userToken,
    realname: null,
    phone: null,
    phoneCode: null,
    email: null,
    emailCode: null
  };
  // 实名认证发送手机号验证码
  caijinVerifyPhone = {
    userToken: this.userToken,
    mobile: null
  };
  // 实名认证发送邮箱验证码
  caijinVerifyEmail = {
    userToken: this.userToken,
    email: null
  };
  // 佣金查询-获取期数
  getPeriodsDisplayList = {
    userToken: this.userToken
  };
  // 佣金查询-获取佣金数据
  getWinningList = {
    userToken: this.userToken,
    periodid: '',
    status: '',
    commissionAvailable: '',
    validMemCount1: '',
    validMemCount2: '',
    memberName: ''
  };
  // 获取修改取款密码的手机验证码
  sandWithdrawalVerif = {
    userToken: this.userToken
  };
  // 获取修改取款密码 是否开启验证码开关
  withdrawalVerifOFFON = {
    userToken: this.userToken
  };
  // 验证 短信验证码
  verifWithdrawal = {
    userToken: this.userToken,
    code: ''
  };
  // 修改取款密码
  editWithdrawalPwd = {
    userToken: this.userToken,
    pwd: '',
    pwd2: '',
    code: ''
  };
  // 是否首次出款
  checkFirstWithdrawal = {
    userToken: this.userToken
  };
  // 检测手机有效性
  checkMobileValid = {
    userToken: this.userToken,
    mobile: null,
    code: null
  };
  // 获取手机验证码
  sendSMSComVerify = {
    mobile: null,
    userToken: this.userToken
  };
    // 刮刮乐检测手机验证码
  scratchVerifyPhone = {
    userToken: this.userToken,
    phoneno: null
  };
  // 公司入款：励扬特殊入款方式-获取付款方式
  saveCompanyDeposite = {
    userToken: this.userToken,
    serial: '',
    ckyh: '',
    money: null,
    bankid: '',
    paytype: '',
    userBankid: 0,
    depositusername: ''
  };
  // 公司入款：励扬特殊入款方式-提交付款订单
  submitOrCancelOrder = {
    userToken: this.userToken,
    orderNo: '',
    type: ''
  };
  // 用户已签到的天数喝距离领奖还需签到的天数
  userSignDaysAndRestDays = {
    userToken: this.userToken
  };
  // 用户进行签到
  userSign = {
    userToken: this.userToken
  };
  //弹窗广告
  modalBanner = {
    type: '2',
    cid: null
  }
  // 按月查询用户签到记录
  getUserSignListByMonth = {
    userToken: this.userToken,
    month: null
  };
  // 用户领取当天奖励
  receiveTodayReward = {
    userToken: this.userToken
  };
  // 从接口获取介绍号
  getSubAgentReferCode = {
    url: ''
  };
  // 获取用户的转账模式
  getWalletType = {
    userToken: this.userToken
  };
  // 修改钱包模式
  upDateWalletType = {
    userToken: this.userToken,
    wallettype: '',
  };
  // 获取广告弹窗
  popupadsList = {
    cid: this.companyId,
    type: 2
  };
  // 推荐游戏
  gameRecommend = {
    userToken: this.userToken,
    companyId: this.companyId,
    type: 2
  };
  // 实时返水--开关
  ssSwitchon = {
    userToken: this.userToken
  };
  // 实时返水--人工试算
  ssCalcute = {
    userToken: this.userToken
  };
  // 实时返水--人工领取
  ssCollect = {
    userToken: this.userToken
  };
  // 实时返水--获取人工试算结果
  ssResult = {
    userToken: this.userToken
  };
  // 实时返水--获取返水领取记录
  ssRecord = {
    userToken: this.userToken,
    pagesize: 10,
    page: 1,
    starttime: '',
    endtime: ''
  };
  // 实时返水--获取返水领取详情
  ssResultdetail = {
    userToken: this.userToken,
    id: null
  };
  //首页平台特色活动
  companylistbuid = {
    companyId: this.companyId,
  };
  constructor() {
  }

  // 单列缓存账户余额
  totalBalance = sessionStorage.getItem('totalBalance');
  balanceShow = sessionStorage.getItem('balanceShow');
  // 总余额
  totalBalanceName = sessionStorage.getItem('totalBalanceName');
  // 用户名
  sessionStorageName = sessionStorage.getItem('loginName');
  // 登录时间
  loginTime = sessionStorage.getItem('loginTime');
  // websocket info
  websocketUsername = sessionStorage.getItem('usernamelogin') ?
    sessionStorage.getItem('usernamelogin') :
    this.companyId + new Date().getTime() + Math.floor(Math.random() * 100);
  websocketInfo = {
    username: this.websocketUsername,
    cid: this.companyId,
    checkUsername: 0
  };
  // 参数
  // 在线存款
  getPayListName = {};
  // 获取所有余额
  balancelist = [];

  getPayListData = {};
  // 客服QQ , 客服电话
  customerQQ = [];
  customerPhone = [];
}

// 这里不再存储全局变量数据  重要
export class TipsModelModel {
  constructor() {
  }

  level = 0;
  // 密码强度等级
  grades = {
    mail: null,
    mobile: null,
    realname: null,
    securityquestion: null,
    userbankpassword: null
  };
  // 登录提示
  loginState = {
    yzmText: '发送验证码',
    regText: '发送验证码'
  };
  balanceState = {
    loading: false
  };
  // 点击按钮需要改变的注册的状态值
  regLoginisState = {
    isLoginCon: false,
    // isShowloginHeader: false,
    selectChangeTitlePassword: false,
    passwordLoginErr: false,      // 显示错误信息html结构
    passwordLoginSuccess: false,
    loginMsg: '',                // 显示后台错误信息
    isLoginLoading: false,
    // 账号验证
    userNameExpIsState: false,   // 账号是否通过验证
    userNameExpMsg: '',          // 显示错误信息
    // 密码验证
    isPasswordQd: false,         // 密码强度是否显示
    passWordExpIsState: false,   // 密码验证是否通过
    passWordExpMsg: '',          // 显示错误信息
    passwordQdStyle: 4,          // 密码强度
    // 手机号验证
    mobileExpIsState: false,
    mobileExpMsg: '',
    // 验证码
    isYzmShow: false,           // 是否显示验证码
    yzmText: '发送验证码',
    isYzm: false,               // 是否可以点击发送验证码
    javaYzm: false,             // 显示图片验证码 暂时默认显示
    yzmUrl: '',                 // 图片验证码url
    // 是否可以登录
    isSubmit: false,
    isMobilePhone: true,       // 手机号是否必填 false 为非必填 true为必填
    // 是否可以注册
    isRegSubmit: false,
    isRegSubmitLoading: false
  };
  // 点击按钮需要改变的登录的状态值
  loginisState = {
    isLoginCon: false,
    isSelectChangePassword: true,
    passwordLoginErr: false,
    phoneLoginErr: false,
    realNameLastName: '',
    realNameVerify: false,
    realName: '',
    realNameVerifyTimes: 3,
    realNameErr: false,
    phoneLoginMsg: '',
    javaYzm: false,
    yzmUrl: '',
    sectoken: '',
    loginMsg: '',
    onlineServiceModel: false,
    isLoginLoading: false,
    userNameLogin: sessionStorage.getItem('loginName'),
    sessionStorageName: sessionStorage.getItem('loginName'),
    registerSuccess: false
  };
  //注册成功后保存账号密码
  regSuccAccount = {
    account: '',
    password: ''
  }
  // 弹窗公告
  openLoginMsg = false;
  // 取款弹窗
  isWithdrawMoney;
  // 个人消息未读标识
  isUnreadInfo = false;
  // 大公告弹窗
  isOpenBigMsg = false;

}

// 存储后台返回的数据和全局用到的状态变量值，非必须条件建议不用全局状态
export class JavaResData {
  // 导航栏的数据存储
  gameNavList = [];
  // 棋牌游戏
  pokerGameIndexId = 0;
  // 电子游戏的
  gameItemIndexId = 0;
  // 捕鱼的
  gameItemByIndexId = 0;
  // 体育赛事的
  gameItemTyIndexId = 0;
  // 提款返回状态
  WITAUDITFLAG = [];
  // cdn 返回的后台地址
  cdnValidKey = '';
  cdnValidKey2 = environment.cdnPath; // test
  projectName = environment.rootUrl;
  // 项目名
  title = '';
  // 下拉框无数据显示文字
  selectText = '暂无数据';
  // 彩票变量
  cpList = [];
  tabIndex = 0;
  cpwhStatus;
  cpswStatus;
  cpchargeStatus;
  // 显示header登录信息的状态 （不可清除）
  isShowloginHeader = false;
  // 获取领彩金开关
  // 如果caijinData中的vcode = '2'的时候，则不显示认证送体验金的入口，否则就在头部和会员中心显示
  caijinData = JSON.parse(sessionStorage.getItem('caijinData')) || {
    email: null,
    isEmail: null,
    isPhone: null,
    isRealname: null,
    phone: null,
    realname: null,
    vcode: 2,
    vmsg: null,
  };
  // 用户是否设置安全问题
  isHasSecurityQA = false;
  //  签到开关
  signSwitch = sessionStorage.getItem('signSwitch');
  isSignShow = false;
}
