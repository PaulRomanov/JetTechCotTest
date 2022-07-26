export const apiService = {
  // 首页游戏列表
  homegame: `/cs/game/pc/nav`,
  // 轮播图
  RotationChart: `/ms/api/actOrNotice/getLyPctagActivity.do`,
  // 滚动公告
  marquee: `/ms/api/actOrNotice/getanewmessagetoweb.do`,
  // 首页特色
  chara: `/cs/game/pc/chara`,
  // 优惠推荐
  getActivityDiscountSubset: `/ms/activesetting/getActivityDiscountSubset`,
  // 登录
  loginWeb: `/ms/api/pc/user/basic/loginWeb.do`,
  //图片验证开关
  verifySwitch: `/ms/api/captcha/switchon`,
  // 账户余额
  allbalancelist: `/ms/api/user/basic/allbalancelist.do`,
  // 退出
  loginoutuser: `/ms/api/user/basic/loginoutuser.do`,
 // 获取用户签到活动的申请记录
  getUserRewardList: '/ms/signActivity/getUserRewardList',
  // 金额转换一键转入
  mainToGame: `/ms/api/user/transfer/mainToGame`,
  // 最新消息
  newNoticeList: `/ms/api/actOrNotice/notice/newNoticeList.do`,
  // 历史消息
  hisNoticeList: `/ms/api/actOrNotice/notice/hisNoticeList.do`,
  // 个人消息
  getPersonalMessage: `/ms/api/actOrNotice/getPersonalMessage.do`,
  // 取款获取个人信息
  getpayment: `/ms/api/withdraw/getpayment.do`,
  //  获取websocket链接
  websocketUrl: `/cs/user/message/server`,
  // 检测用户是否符合首次出款修改手机号
  modifyPhoneCheck: `/cash/cash/UserCashWithdrawAction/modifyPhoneCheck.action`,
  // 获取账户类型
  getAccountType: `/ms/api/pc/user/basic/getAccountLogTypeInfo.do`,
  // 账户列表查询
  getUserAccountLoglist: `/ms/api/user/basic/getUserAccountLoglist.do`,
  // 取款申请
  appImmediatelyaudit: `/cash/auditquery/appImmediatelyaudit.action`,
  // 在线存款获取信息
  getPayList: `/ms/api/deposit/getPayList`,
  // 一键归帐
  transferAllGameToMain: `ms/api/user/transfer/transferAllGameToMain.do`,
  // 额度转换
  beginUserChange: `/ms/api/user/transfer/beginUserChange.do`,
  // 保存个人信息
  setInfo: `/ms/api/pc/user/basic/setInfo.do`,
  // 获取个人信息
  getUserInfo: `/ms/api/user/basic/getUserInfo.do`,
  // 修改密码
  modify: `/ms/api/user/basic/pwd/modify.do`,
  // 判断是否有取款密码
  isModify: `/ms/api/user/basic/pwd/isModify`,
  // 修改安全问题
  ChangeSecurityQA: `/ms/api/pc/user/basic/ChangeSecurityQA.do`,
  // 新账户设置安全问题
  newUserSetsecurityQA: `/ms/api/pc/user/basic/setsecurityQA.do`,
  // 是否设置安全问题
  isHassetsecurityQA: `/ms/api/pc/user/basic/isHassetsecurityQA.do`,
  // 存款审核订单
  getpaymentName: `/ms/api/withdraw/getpayment.do`,
  // 获取用户配置信息
  userconfig: `/cs/user/userconfig/get`,
  // 投注历史游戏下拉列表
  tzListHistory: `/ms/game/type/list`,
  tzAccumHistory: `/ms/bet/mobile/history/list`,
  // 获取存款接口明细
  mcashgsrk: `/ms/api/companyDeposit/mcashgsrk.do`,
  // 活动申请记录页面接口-活动类型
  getAcitityType: `/ms/api/event/getAllActName`,
  // 活动申请记录页面接口-活动列表数据
  getAcitityData: `/ms/api/event/getEventNoteByCon`,
  // 获取公司入款明细
  preloadBankList: `/ms/api/companyDeposit/preloadBankList.do`,
  // 公司入款下一步
  getBanklist: `/ms/api/companyDeposit/getBanklist.do`,
  // 公司入款提交
  saveDeposite: `/ms/api/companyDeposit/saveDeposite.do`,
  // 存款优惠
  getAppDiscount: `/ms/api/deposit/getAppDiscount.do`,
  // 保存取款记录
  saveWithdraw: `/ms/api/withdraw/addwithdraw.do`,
  // 在线存款获取支付详细
  getPayType: '/ms/api/deposit/getPayType.do',
  // 在线存款提交
  heepay: `/ms/api/deposit/heepay.do`,
  // 投注合计
  searchAppBettotal: `/betting/query/searchAppBettotal.action`,
  // 银行卡
  getAppBankLists: `/ms/api/bank/getAppBankLists.do`,
  // 移入历史、常用
  delUserBankCard: `/ms/api/bank/delUserBankCard.do`,
  // 银行卡是否完善省市支行开关
  getFullInfoSwtich: `/ms/api/bank/getFullInfoSwtich.do`,
  // 新增银行卡
  addCard: `/ms/api/bank/addCard.do`,
  // 银行卡管理查询公司银行卡
  getValidReceiptsbBankList: `/ms/api/bank/getValidReceiptsbBankList.do`,
  // 修改银行卡
  updCard: `/ms/api/bank/updCard.do`,
  // 即时稽核
  auditTime: `/instantAudit/queryAuditListPage.action`,
  // 账户安全等级
  accountSecurityLevel: `/ms/api/pc/user/basic/getSeclevel.do`,
  // 优惠活动头部
  getActivityPreact: `/ms/activesetting/getActivityPreact`,
  // 注册
  setCreateUser: `/ms/api/pc/user/basic/createUser.do`,
  //快速注册
  fastCreateUser: `/ms/api/pc/user/basic/createUserFast.do`,
  // 获取手机验证码
  mobileYzm: `/ms/api/pc/user/basic/sendSMSVerify.do`,
  //获取登录验证码
  mobileYzmLogin: '/ms/api/pc/user/basic/loginWithMobile.do',
  //使用验证码登录
  mobileLoginWithVerify: '/ms/api/pc/user/basic/loginWithVerify.do',
  // 短信验证码开关
  mobileYzmIsOk: `/ms/api/pc/user/basic/isSmsCode.do`,
  // 判断账号是否已经被注册
  userNumCheck: `/ms/api/pc/user/basic/membercheckLoginname`,
  // 判断手机号是否被注册
  phoneNumberCheck: `/ms/api/pc/user/basic/checkmobile`,
  // 试玩
  SWLogin: `/ms/api/user/basic/SWLogin.do`,
  // 账户余额单个游戏接口
  agamebalance: `/ms/api/user/basic/agamebalance.do`,
  // 电子游戏
  getComputerGamet: `/ms/bet/replaceIntoGameComputer/getComputerGamet.do`,
  // 获取电子游戏列表
  getDzGameList: `/ms/game/pub/list/v2`,
  // 全民推广-领取奖励
  getRewardMoney: `/ms/unlimited/level/h5/withdraw`,
  // 全民推广-一键激活
  goToSpreadActive: `/ms/unlimited/level/h5/create`,
  // 全民推广-是否已经激活
  getUserSpreadActiveData: `/ms/unlimited/level/h5/userisexist`,
  // 全民推广-可领取奖励明细
  getSpreadRewardData: `/ms/unlimited/level/h5/report`,
  // 全民推广-领取记录
  getSpreadRecordData: `/ms/unlimited/level/h5/history`,
  // 全民推广-推广明细
  getSpreadDetailData: `/ms/unlimited/level/h5/underlist`,
  // 全民推广-获取提成比例区间数据
  getSpreadPercent: `/ms/unlimited/level/h5/isexist`,
  // 全民推广-提交提成比例设置数据
  setSpreadPercentData: `/ms/unlimited/level/h5/update`,
  // 获取根据不同厅主获取CDN前缀域
  domainCdn: `/cs/user/userconfig/domain`,
  // 弹窗公告
  openWebMsg: `/ms/api/actOrNotice/getWebMessageTT.do`,
  // 活动申请列表数据
  getActivityData: `/ms/api/event/getEventHallByType`,
  // 申请活动提交数据
  postActivityData: `/ms/api/event/applyEventNote`,
  // 进入详情页面获取数据
  getActivityDetail: `/ms/api/event/getEventHallByID`,
  // 设置默认银行卡
  setCardDefault: `/ms/api/bank/setCardDefault.do`,
  // 忘记密码-通过手机找回
  verifyingPictureCode: `/ms/api/pc/user/basic/newcheckFcode.do`,
  // 忘记密码（验证码短信验证码，是否公司账号）
  sendMsg: `/ms/api/pc/user/basic/forgetPWDMSM.do`,
  // 推广赚钱 数据统计报表
  dataReport: `/ms/unlimited/level/h5/dataReport`,
  // 忘记密码（验证短信是否正确）
  verifyingPhoneCode: `/ms/api/pc/user/basic/forgetByPhoneVerify.do`,
  // 忘记密码（重置密码）
  resetPsw: `/ms/api/pc/user/basic/resetPassword.do`,
  // 忘记密码（密保问题提交）
  fsecQAT: `/ms/api/pc/user/basic/fsecQAT.do`,
  // 查询电竞网赛事
  // getMatch: `/cs/imele/egame/getMatch.do`,
  // 获取个人信息未读条数
  getPersonalMessagewd: `/ms/api/actOrNotice/getPersonalMessagewd.do`,
  // 删除/标识已阅读
  setState: `/ms/api/actOrNotice/setState.do`,
  // 获取免费领彩金接口开关
  getCaijinVerifySetting: `/ms/api/pc/user/basic/getVerifySetting`,
  // 提交实名认证信息
  setCaijinVerifySetting: `/ms/api/pc/user/basic/verifySetting`,
  // 实名认证发送手机号验证码
  caijinVerifyPhone: `/ms/api/pc/user/basic/verifyPhone`,
  // 实名认证发送邮箱验证码
  caijinVerifyEmail: `/ms/api/pc/user/basic/verifyEmail`,
  // 佣金查询-获取期数
  getPeriodsDisplayList: `/ms/unlimited/level/h5/getPeriodsDisplayList`,
  // 佣金查询-获取佣金数据
  getWinningList: `/ms/unlimited/level/h5/getWinningList`,
  // 获取修改取款密码的手机验证码
  sandWithdrawalVerif: '/ms/api/pc/user/basic/sandWithdrawalVerif',
  // 获取修改取款密码 是否开启验证码开关
  withdrawalVerifOFFON: '/ms/api/pc/user/basic/withdrawalVerifOFFON',
  // 验证短信验证码
   verifWithdrawal: `/ms/api/pc/user/basic/verifWithdrawal`,
  // 修改取款密码
  editWithdrawalPwd: `/ms/api/pc/user/basic/editWithdrawalPwd`,
  // 判断是否首次出款
  checkFirstWithdrawal: `/ms/api/pc/user/basic/checkFirstWithdrawal`,
    // 检测手机有效性
    checkMobileValid: `/ms/api/pc/user/basic/checkMobileValid`,
  // 获取手机验证码
  sendSMSComVerify: `/ms/api/pc/user/basic/sendSMSComVerify.do`,
  // 公司入款：励扬特殊入款方式-获取付款方式
  saveCompanyDeposite: `/ms/api/companyDeposit/saveDeposite.do`,
   // 公司入款：励扬特殊入款方式-提交付款订单
   submitOrCancelOrder: `/ms/api/companyDeposit/submitOrCancelOrder`,
  // 首页实时足球
  searchSoccerPurchase: `/ms/soccerPurchase/searchSoccerPurchase`,
  // 用户已签到的天数喝距离领奖还需签到的天数
  userSignDaysAndRestDays: `/ms/signActivity/userSignDaysAndRestDays`,
  // 用户进行签到
  userSign: `/ms/signActivity/userSign`,
  // 按月查询用户签到记录
  getUserSignListByMonth: `/ms/signActivity/getUserSignListByMonth`,
  // 用户领取当天奖励
  receiveTodayReward: `ms/signActivity/receiveTodayReward`,
  // 从接口获取介绍号
  getSubAgentReferCode: `/ms/domainurl/url/getSubAgentReferCode`,
  // 获取用户的转账模式
  getWalletType: `/ms/api/user/basic/wallettype`,
  // 修改钱包模式
  upDateWalletType: `/ms/api/user/basic/updateUserWallettype`,
  // 获取广告弹窗
  popupadsList: `/ms/user/conf/popupads/list`,
  // 首页推荐游戏
  gameRecommend: `/cs/game/pc/GameRecommend`,
  // 实时返水--开关
  ssSwitchon: `/ms/api/largesstimely/switchon`,
  // 实时返水--人工试算
  ssCalcute: `/ms/api/largesstimely/manual/calcute/start`,
  // 实时返水--人工领取
  ssCollect: `/ms/api/largesstimely/manual/collect/start`,
  // 实时返水--获取人工试算结果
  ssResult: `/ms/api/largesstimely/manual/calcute/result`,
  // 实时返水--获取返水领取记录
  ssRecord: `/ms/api/largesstimely/collect/result`,
  // 实时返水--获取返水领取详情
  ssResultdetail: `/ms/api/largesstimely/collect/resultdetail`,
  //VIP会员
  vipInfo: `/ms/user/level/info`,
  //更新等级
  reloadVipLevel: `/ms/user/level/reload`,
  //领取升级礼金
  getUpgradeGift: `/ms/user/level/levelBonus`,
  //领取节日礼金
  getFestivalGift: '/ms/user/level/festivalBonus',
  //领取周俸禄
  getWeekGift: `/ms/user/level/weekBonus`,
  //我的礼金记录
  myGiftRecords: '/ms/user/level/bounsList',
  // 取款--获取取款稽核金额信息与审核取款密码
  auditwithdrawontime: `/cash/auditquery/auditwithdrawontime.action`,
  //积分商城开关
  scoreMallSwitch: `/ms/scoreMall/queryScoreMallSwitch`,
  //红包雨活动开关
  envelopRainSwitch: `/ms/api/redenvelope/switchon`,
  //红包雨活动-抢红包
  envelopRain: `/ms/api/redenvelope/snatch`,
  //红包雨活动-红包记录
  envelopRainRecord: `/ms/api/redenvelope/result`,
  //刮刮乐活动-活动金额
  scratchActivity: `ms/ggleActivity/getGgleActivityPrize.do`,
  //刮刮乐活动-刮开奖金
  scratchOpen: `ms/ggleActivity/updateGgleActivityOpenStatus.do`,
  //刮刮乐活动-领取奖金
  scratchPrize: `ms/ggleActivity/depositGgleActivityPrize.do`,
  //刮刮乐活动-验证领奖手机号
  scratchVerifyPhone: `ms/ggleActivity/checkHasPhoneGotGgleActivityPrize.do`,
  //弹窗广告
  modalBanner: `/ms/user/conf/popupads/list`,
  //积分商城-查询精品商品列表
  scroeMallBestGoods: `/ms/scoreMall/product/bestlist`,
  //积分商城-查询热门商品列表
  scroeMallHotGoods: `/ms/scoreMall/product/hotlist`,
  //积分商城-查询商品详情
  scroeMallProductDetail: `/ms/scoreMall/product/detail`,
  //积分商城-创建订单
  scroeMallCreateOrder:`/ms/scoreMall/createOrder`,
  //积分商城-查询会员积分
  scroeMallScoreQuery: `/ms/scoreMall/queryUserScore`,
  //积分商城-查询会员订单记录
  scroeMallOrderHistory: `/ms/scoreMall/queryUserOrderHistory`,
  //积分商城-查询会员订单记录
  scroeMallScoreHistory: `/ms/scoreMall/queryUserScoreHistory`,
  //首页平台特色活动
  companylistbuid: `/cs/feature/setting/companylistbuid`,
  //出款方式
  withdrawMethods: '/ms/payMethod/getpayMethodType'
};

