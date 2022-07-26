import { Injectable } from '@angular/core';
import { GlobalService } from './global-service';
import { CommonProxyService } from './common-proxy.service';
import { apiService } from './http-url-config';


@Injectable()
export class CommonDataService {
  dlUrl = null;

  constructor(
    private $CommonProxyService: CommonProxyService,
    private $GlobalService: GlobalService
  ) {
    this.dlUrl = this.$CommonProxyService.dlUrl;
  }

  // 首页游戏列表
  homegame() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.homegame}`, this.$GlobalService.globalQueryModel.homegame);
  }

  // 首页轮播图
  RotationChart() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.RotationChart}`, this.$GlobalService.globalQueryModel.RotationChart);
  }

  // 滚动公告
  marquee() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.marquee}`, this.$GlobalService.globalQueryModel.homegame);
  }
  // 检测用户是否符合首次出款修改手机号
  modifyPhoneCheck() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.modifyPhoneCheck}`, this.$GlobalService.globalQueryModel.modifyPhoneCheck);
  }
  // 首页特色活动
  chara() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.chara}`, this.$GlobalService.globalQueryModel.homegame);
  }
 // 获取用户签到活动的申请记录
  getUserRewardList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getUserRewardList}`, this.$GlobalService.globalQueryModel.getUserRewardList);
  }
  // 优惠推荐
  getActivityDiscountSubset() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getActivityDiscountSubset}`, this.$GlobalService.globalQueryModel.getActivityDiscountSubset);
  }

  // 登录
  loginWeb() {
    return this.$CommonProxyService.proxyService('post1',
      `${apiService.loginWeb}`, this.$GlobalService.globalQueryModel.loginData, 'login');
  }

  //图片验证
  verifySwitch() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.verifySwitch}`, this.$GlobalService.globalQueryModel.verifySwitch);
  }

  // 账户余额
  allbalancelist() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.allbalancelist}`, this.$GlobalService.globalQueryModel.allbalancelist);
  }

  // 退出
  loginoutuser() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.loginoutuser}`, this.$GlobalService.globalQueryModel.loginoutuser);
  }

  // 金额转换一键转入
  mainToGame() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.mainToGame}`, this.$GlobalService.globalQueryModel.mainToGame);
  }

  // 最新消息
  newNoticeList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.newNoticeList}`, this.$GlobalService.globalQueryModel.newNoticeList);
  }

  // 历史消息
  hisNoticeList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.hisNoticeList}`, this.$GlobalService.globalQueryModel.hisNoticeList);
  }

  // 个人消息
  getPersonalMessage() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getPersonalMessage}`, this.$GlobalService.globalQueryModel.getPersonalMessage);
  }

  // 取款获取个人信息
  getpayment() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getpayment}`, this.$GlobalService.globalQueryModel.getpayment);
  }

  // 获取websocket链接地址
  getWebSocketUrl() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.websocketUrl}`, this.$GlobalService.globalQueryModel.websocketInfo);
  }

  // 账户类型
  getAccountType() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getAccountType}`, this.$GlobalService.globalQueryModel.loginoutuser);
  }

  // 账户列表查询
  getUserAccountLoglist() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getUserAccountLoglist}`, this.$GlobalService.globalQueryModel.getUserAccountList);
  }

  // 取款申请
  appImmediatelyaudit() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.appImmediatelyaudit}`, this.$GlobalService.globalQueryModel.appImmediatelyaudit);
  }

  // 取款申请太阳城
  auditwithdrawontime() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.auditwithdrawontime}`, this.$GlobalService.globalQueryModel.auditwithdrawontime);
  }

  // 在线存款获取信息
  getPayList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getPayList}`, this.$GlobalService.globalQueryModel.getPayList);
  }

  // 一键归账
  transferAllGameToMain() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.transferAllGameToMain}`, this.$GlobalService.globalQueryModel.transferAllGameToMain);
  }

  // 额度转换
  beginUserChange() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.beginUserChange}`, this.$GlobalService.globalQueryModel.beginUserChange);
  }

  // 彩票游戏分类
  IGPC() {
    return this.$CommonProxyService.proxyService('post',
      `${this.$GlobalService.globalQueryModel.IGPC.game}`, this.$GlobalService.globalQueryModel.IGPC.gameId);
  }
  // 保存个人信息
  setInfo() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.setInfo}`, this.$GlobalService.globalQueryModel.setInfo);
  }
  // 获取个人信息
  getUserInfo() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getUserInfo}`, this.$GlobalService.globalQueryModel.getUserInfo);
  }

  // 修改密码
  modify() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.modify}`, this.$GlobalService.globalQueryModel.modify);
  }

  // 判断是否有取款密码
  isModify() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.isModify}`, this.$GlobalService.globalQueryModel.isModify);
  }

  // 修改安全问题
  ChangeSecurityQA() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.ChangeSecurityQA}`, this.$GlobalService.globalQueryModel.ChangeSecurityQA);
  }

  // 设置安全问题
  setNewUserSecurityQA() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.newUserSetsecurityQA}`, this.$GlobalService.globalQueryModel.newUserSetsecurityQA);
  }


  // 获取用户配置信息
  userconfig() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.userconfig}`, this.$GlobalService.globalQueryModel.userconfig, 'option');
  }

  // 投注历史游戏下拉列表
  getTzListHistory() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.tzListHistory}`, this.$GlobalService.globalQueryModel.tzListHistory);
  }

  // 投注历史游戏下拉列表
  getTzAccumListHistory() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.tzAccumHistory}`, this.$GlobalService.globalQueryModel.getTzHosityList);
  }

  // 获取存款接口明细
  mcashgsrk() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.mcashgsrk}`, this.$GlobalService.globalQueryModel.mcashgsrk);
  }

  // 活动申请记录页面-活动类型
  getActivityType() {
    return this.$CommonProxyService.proxyService('post', `${apiService.getAcitityType}`, this.$GlobalService.globalQueryModel.activityType);
  }

  // 活动申请记录页面-活动类型
  getAcitityData() {
    return this.$CommonProxyService.proxyService('post', `${apiService.getAcitityData}`, this.$GlobalService.globalQueryModel.activityData);
  }

  // 保存取款信息
  saveWithdraw() {
    return this.$CommonProxyService.proxyService('post', `${apiService.saveWithdraw}`, this.$GlobalService.globalQueryModel.saveWithdraw);
  }

  // 获取公司入款明细
  preloadBankList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.preloadBankList}`, this.$GlobalService.globalQueryModel.preloadBankList);
  }

  // 公司入款下一步
  getBanklist() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getBanklist}`, this.$GlobalService.globalQueryModel.getBanklist);
  }

  // 公司入款提交
  saveDeposite() {
    return this.$CommonProxyService.proxyService1(`${apiService.saveDeposite}`, this.$GlobalService.globalQueryModel.saveDeposite, this.$GlobalService.globalQueryModel.saveDepositeImage);
  }

  // 存款优惠
  getAppDiscount() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getAppDiscount}`, this.$GlobalService.globalQueryModel.getAppDiscount);
  }

  // 在线存款获取支付详细
  getPayType() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getPayType}`, this.$GlobalService.globalQueryModel.getPayType);
  }

  // 在线存款提交
  heepay() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.heepay}`, this.$GlobalService.globalQueryModel.heepay);
  }

  // 投注合计
  searchAppBettotal() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.searchAppBettotal}`, this.$GlobalService.globalQueryModel.searchAppBettotal);
  }

  // 常用银行卡
  getAppBankLists() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getAppBankLists}`, this.$GlobalService.globalQueryModel.getAppBankLists, 'option');
  }

  // 移动银行卡
  delUserBankCard() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.delUserBankCard}`, this.$GlobalService.globalQueryModel.delUserBankCard);
  }

  // 银行卡是否完善省市支行开关
  getFullInfoSwtich() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getFullInfoSwtich}`, this.$GlobalService.globalQueryModel.getFullInfoSwtich);
  }

  // 新增银行卡
  addCard() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.addCard}`, this.$GlobalService.globalQueryModel.addCard);
  }

  // 银行卡管理查询公司银行卡
  getValidReceiptsbBankList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getValidReceiptsbBankList}`, this.$GlobalService.globalQueryModel.getValidReceiptsbBankList);
  }

  // 银行卡管理查询公司银行卡
  updCard() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.updCard}`, this.$GlobalService.globalQueryModel.updCard);
  }

  // 是否设置安全问题
  isHassetsecurityQA() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.isHassetsecurityQA}`, this.$GlobalService.globalQueryModel.isHassetsecurityQA);
  }

  // 即时稽核
  initAuditTime() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.auditTime}`, this.$GlobalService.globalQueryModel.auditTimeData);
  }

  // 账户安全等级
  accountLevel() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.accountSecurityLevel}`, this.$GlobalService.globalQueryModel.accountSecurityLevel);
  }

  // 头部标签
  getActivityPreact() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getActivityPreact}`, this.$GlobalService.globalQueryModel.getActivityPreact);
  }

  // 试玩
  SWLogin() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.SWLogin}`);
  }

  // 注册
  getCreateUser() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.setCreateUser}`, this.$GlobalService.globalQueryModel.createUser, 'login');
  }
  //快速注册
  fastCreateUser(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.fastCreateUser}`, this.$GlobalService.globalQueryModel.fastCreateUser, 'login');
  }

  // 获取手机验证码
  getMobileYzm() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.mobileYzm}`, this.$GlobalService.globalQueryModel.mobileYzm, 'login');
  }
  // 登录获取手机验证码
  getMobileYzmLogin() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.mobileYzmLogin}`, this.$GlobalService.globalQueryModel.mobileLogin, 'login');
  }
  // 注册获取手机验证码
  getMobileYzmRegister() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.mobileYzm}`, this.$GlobalService.globalQueryModel.fastCreateUser, 'login');
  }
  // 手机验证码登录
  loginWithMobile() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.mobileLoginWithVerify}`, this.$GlobalService.globalQueryModel.mobileLogin, 'login');
  }

  // 获取手机验证码开关权限
  mobileYzmIsOk() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.mobileYzmIsOk}`, this.$GlobalService.globalQueryModel.mobileYzmIsOk);
  }

  // 账号是否被注册
  userNumCheck() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.userNumCheck}`, this.$GlobalService.globalQueryModel.userNumCheck, 'login');
  }

  // 手机号是否被注册
  phoneNumberCheck() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.phoneNumberCheck}`, this.$GlobalService.globalQueryModel.phoneNumberCheck, 'login');
  }

  // 账户余额单个游戏接口
  getGamebalance() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.agamebalance}`, this.$GlobalService.globalQueryModel.agamebalance, 'games');
  }

  // 电子游戏
  getComputerGamet() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getComputerGamet}`, this.$GlobalService.globalQueryModel.getComputerGamet);
  }

  // 电子游戏列表
  getComputerGametList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getDzGameList}`, this.$GlobalService.globalQueryModel.getDzGameList);
  }

  // 全民推广-领取奖励
  getRewardMoney() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getRewardMoney}`, this.$GlobalService.globalQueryModel.getRewardMoney);
  }

  // 全民推广-一键激活
  goToSpreadActive() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.goToSpreadActive}`, this.$GlobalService.globalQueryModel.goToSpreadActive);
  }

  // 全民推广-是否已激活
  getUserSpreadActiveData() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getUserSpreadActiveData}`, this.$GlobalService.globalQueryModel.getUserSpreadActiveData);
  }

  // 全民推广-可领取奖励明细
  getSpreadRewardData() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getSpreadRewardData}`, this.$GlobalService.globalQueryModel.getSpreadRewardData);
  }

  //  全民推广-领取记录
  getSpreadRecordData() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getSpreadRecordData}`, this.$GlobalService.globalQueryModel.getSpreadRecordData);
  }

  // 全民推广-推广明细
  getSpreadDetailData() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getSpreadDetailData}`, this.$GlobalService.globalQueryModel.getSpreadDetailData);
  }

  // 全民推广-获取设置比例数据
  getSpreadPercent() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getSpreadPercent}`, this.$GlobalService.globalQueryModel.getSpreadPercent);
  }

  // 全民推广-提交设置比例数据
  setSpreadPercentData() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.setSpreadPercentData}`, this.$GlobalService.globalQueryModel.setSpreadPercentData);
  }

  // 获取根据不同厅主获取CDN前缀域
  domainCdn() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.domainCdn}`, this.$GlobalService.globalQueryModel.domainCdn);
  }

  // 弹窗公告
  openWebMsg() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.openWebMsg}`, this.$GlobalService.globalQueryModel.openWebMsg);
  }
  // 活动申请列表数据
  getActivityData() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getActivityData}`, this.$GlobalService.globalQueryModel.getActivityData);
  }
  // 申请活动提交数据
  postActivityData() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.postActivityData}`, this.$GlobalService.globalQueryModel.postActivityData);
  }
  // 进入活动详情页面获取数据
  getActivityDetail() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getActivityDetail}`, this.$GlobalService.globalQueryModel.getActivityDetail);
  }
  // 设置默认银行卡
  setCardDefault() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.setCardDefault}`, this.$GlobalService.globalQueryModel.setCardDefault);
  }
  // 查询电竞网赛事
  // getMatch() {
  //   return this.$CommonProxyService.proxyService('post',
  //     `${apiService.getMatch}`, this.$GlobalService.globalQueryModel.getMatch);
  // }
  // 忘记密码-通过手机找回
  verifyingPictureCode() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.verifyingPictureCode}`, this.$GlobalService.globalQueryModel.verifyingPictureCode);
  }
  // 忘记密码-发送短信
  sendMsg() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.sendMsg}`, this.$GlobalService.globalQueryModel.sendMsg);
  }
  // 忘记密码-验证短信是否正确
  verifyingPhoneCode() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.verifyingPhoneCode}`, this.$GlobalService.globalQueryModel.verifyingPhoneCode);
  }
  // 忘记密码-重置密码提交
  resetPsw() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.resetPsw}`, this.$GlobalService.globalQueryModel.resetPsw);
  }
  // 推广赚钱 数据统计报表
  dataReport() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.dataReport}`, this.$GlobalService.globalQueryModel.dataReport);
  }
  // 忘记密码-验证密保问题是否正确
  fsecQAT() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.fsecQAT}`, this.$GlobalService.globalQueryModel.fsecQAT);
  }
  // 个人消息未读条数
  getPersonalMessagewd() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getPersonalMessagewd}`, this.$GlobalService.globalQueryModel.getPersonalMessagewd);
  }
  // 个人消息修改状态
  setState() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.setState}`, this.$GlobalService.globalQueryModel.setState);
  }
  // 获取免费领彩金接口开关
  getCaijinVerifySetting() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getCaijinVerifySetting}`, this.$GlobalService.globalQueryModel.getCaijinVerifySetting);
  }
  // 获取实名认证设置信息
  setCaijinVerifySetting() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.setCaijinVerifySetting}`, this.$GlobalService.globalQueryModel.setCaijinVerifySetting);
  }
  // 实名认证发送手机号验证码
  caijinVerifyPhone() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.caijinVerifyPhone}`, this.$GlobalService.globalQueryModel.caijinVerifyPhone);
  }
  // 实名认证发送邮箱验证码
  caijinVerifyEmail() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.caijinVerifyEmail}`, this.$GlobalService.globalQueryModel.caijinVerifyEmail);
  }
  // 佣金查询-获取期数
  getPeriodsDisplayList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getPeriodsDisplayList}`, this.$GlobalService.globalQueryModel.getPeriodsDisplayList);
  }
  // 佣金查询-获取佣金数据
  getWinningList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getWinningList}`, this.$GlobalService.globalQueryModel.getWinningList);
  }
  // 获取修改取款密码的手机验证码
  sandWithdrawalVerif() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.sandWithdrawalVerif}`, this.$GlobalService.globalQueryModel.sandWithdrawalVerif);
  }
  // 获取修改取款密码 是否开启验证码开关
  withdrawalVerifOFFON() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.withdrawalVerifOFFON}`, this.$GlobalService.globalQueryModel.withdrawalVerifOFFON);
  }
  // 验证短信验证码
  verifWithdrawal() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.verifWithdrawal}`, this.$GlobalService.globalQueryModel.verifWithdrawal);
  }
  // 修改取款密码
  editWithdrawalPwd() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.editWithdrawalPwd}`, this.$GlobalService.globalQueryModel.editWithdrawalPwd);
  }
  // 判断是否首次出款
  checkFirstWithdrawal() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.checkFirstWithdrawal}`, this.$GlobalService.globalQueryModel.checkFirstWithdrawal);
  }
  // 检测手机有效性
  checkMobileValid() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.checkMobileValid}`, this.$GlobalService.globalQueryModel.checkMobileValid);
  }
  // 检测手机有效性
  sendSMSComVerify() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.sendSMSComVerify}`, this.$GlobalService.globalQueryModel.sendSMSComVerify);
  }
    // 公司入款：励扬特殊入款方式-获取付款方式
    saveCompanyDeposite() {
      console.log(1)
      return this.$CommonProxyService.proxyService('post',
        `${apiService.saveCompanyDeposite}`, this.$GlobalService.globalQueryModel.saveCompanyDeposite);
    }
    // 公司入款：励扬特殊入款方式-提交付款订单
    submitOrCancelOrder() {
      return this.$CommonProxyService.proxyService('post',
        `${apiService.submitOrCancelOrder}`, this.$GlobalService.globalQueryModel.submitOrCancelOrder);
    }
    // 获取足球信息
    getSportInfo() {
      return this.$CommonProxyService.proxyService('post',
        `${apiService.searchSoccerPurchase}`, null);
    }
    // 用户已签到的天数喝距离领奖还需签到的天数
    userSignDaysAndRestDays() {
      return this.$CommonProxyService.proxyService('post',
        `${apiService.userSignDaysAndRestDays}`, this.$GlobalService.globalQueryModel.userSignDaysAndRestDays);
    }
    // 用户进行签到
    userSign() {
      return this.$CommonProxyService.proxyService('post',
        `${apiService.userSign}`, this.$GlobalService.globalQueryModel.userSign);
    }
   // 按月查询用户签到记录
   getUserSignListByMonth() {
      return this.$CommonProxyService.proxyService('post',
        `${apiService.getUserSignListByMonth}`, this.$GlobalService.globalQueryModel.getUserSignListByMonth);
    }
  // 用户领取当天奖励
  receiveTodayReward() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.receiveTodayReward}`, this.$GlobalService.globalQueryModel.receiveTodayReward);
  }
  // 从接口获取介绍号
  getSubAgentReferCode() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getSubAgentReferCode}`, this.$GlobalService.globalQueryModel.getSubAgentReferCode);
  }
  // 获取用户的转账模式
  getWalletType() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getWalletType}`, this.$GlobalService.globalQueryModel.getWalletType);
  }
  // 修改用户钱包转账模式
  upDateWalletType() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.upDateWalletType}`, this.$GlobalService.globalQueryModel.upDateWalletType);
  }
  // 获取弹窗广告
  popupadsList() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.popupadsList}`, this.$GlobalService.globalQueryModel.popupadsList);
  }
  // 首页游戏推荐
  gameRecommend() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.gameRecommend}`, this.$GlobalService.globalQueryModel.gameRecommend);
  }

  // 实时返水--开关
  ssSwitchon() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.ssSwitchon}`, this.$GlobalService.globalQueryModel.ssSwitchon);
  }
  // 实时返水--人工试算
  ssCalcute() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.ssCalcute}`, this.$GlobalService.globalQueryModel.ssCalcute);
  }
  // 实时返水--人工领取
  ssCollect() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.ssCollect}`, this.$GlobalService.globalQueryModel.ssCollect);
  }
  // 实时返水--获取人工试算结果
  ssResult() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.ssResult}`, this.$GlobalService.globalQueryModel.ssResult);
  }
  // 实时返水--获取返水领取记录
  ssRecord() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.ssRecord}`, this.$GlobalService.globalQueryModel.ssRecord);
  }
  // 实时返水--获取返水领取详情
  ssResultdetail() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.ssResultdetail}`, this.$GlobalService.globalQueryModel.ssResultdetail);
  }


  // 注册代理
  agentRegister(loginName, passWord, ensurePassword, mobile, accountPwd, email, qq, realName, cname, codeKey, agreement) {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.gameRecommend}`, {
        companyId: this.$GlobalService.globalQueryModel.companyId,
        loginName: loginName,
        passWord: passWord,
        ensurePassword: ensurePassword,
        mobile: mobile,
        accountPwd: accountPwd,
        email: email,
        qq: qq,
        realName: realName,
        cname: cname,
        codeKey: codeKey,
        agreement: agreement
      });
  }

  //VIP会员信息
  getVipInfo() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.vipInfo}`, this.$GlobalService.globalQueryModel.userSign);
  }

  //更新等级
  reloadVipLevel() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.reloadVipLevel}`, this.$GlobalService.globalQueryModel.userSign);
  }

  //领取升级礼金
  getUpgradeGift() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getUpgradeGift}`, this.$GlobalService.globalQueryModel.userSign);
  }

  //领取节日礼金
  getFestivalGift() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getFestivalGift}`, this.$GlobalService.globalQueryModel.userSign);
  }

  //领取周俸禄
  getWeekGift() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.getWeekGift}`, this.$GlobalService.globalQueryModel.userSign);
  }

  //我的礼金记录
  myGiftRecords() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.myGiftRecords}`, this.$GlobalService.globalQueryModel.myGiftRecordQuery);
  }

  //红包雨开关
  envelopRainSwitch() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.envelopRainSwitch}`, this.$GlobalService.globalQueryModel.envelopSwitch);
  }

  //积分商城开关
  scoreMallSwitch() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scoreMallSwitch}`, this.$GlobalService.globalQueryModel.scoreMallSwitch);
  }

  //抢红包
  envelopRain() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.envelopRain}`, this.$GlobalService.globalQueryModel.envelopSwitch);
  }

  //红包记录
  envelopRecord() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.envelopRainRecord}`, this.$GlobalService.globalQueryModel.envelopRecord);
  }

  //刮刮乐活动-活动金额
  scratchActivity() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scratchActivity}`, this.$GlobalService.globalQueryModel.userSign);
  }

  //刮刮乐活动-刮开奖金
  scratchOpen() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scratchOpen}`, this.$GlobalService.globalQueryModel.scratchOpen);
  }

  //刮刮乐活动-领取奖金
  scratchGetPrize() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scratchPrize}`, this.$GlobalService.globalQueryModel.scratch);
  }

  //刮刮乐活动-验证领奖手机号
  scratchVerifyPhone() {
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scratchVerifyPhone}`, this.$GlobalService.globalQueryModel.scratchVerifyPhone);
  }

  //弹窗广告
  modalBanner(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.modalBanner}`, this.$GlobalService.globalQueryModel.modalBanner);
  }

  //积分商城-查询精品商品列表
  scroeMallBestGoods(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scroeMallBestGoods}`, this.$GlobalService.globalQueryModel.RotationChart);
  }

  //积分商城-查询热门商品列表
  scroeMallHotGoods(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scroeMallHotGoods}`, this.$GlobalService.globalQueryModel.hotGoodsList);
  }

  //积分商城-查询商品详情
  scroeMallProductDetail(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scroeMallProductDetail}`, this.$GlobalService.globalQueryModel.productDetail);
  }

  //积分商城-创建订单
  scroeMallCreateOrder(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scroeMallCreateOrder}`, this.$GlobalService.globalQueryModel.createOrder);
  }

  //积分商城-查询会员积分
  scroeMallScoreQuery(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scroeMallScoreQuery}`, this.$GlobalService.globalQueryModel.allbalancelist);
  }

  //积分商城-查询会员订单记录
  scroeMallOrderHistory(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scroeMallOrderHistory}`, this.$GlobalService.globalQueryModel.orderHistory);
  }

  //积分商城-查询会员订单记录
  scroeMallScoreHistory(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.scroeMallScoreHistory}`, this.$GlobalService.globalQueryModel.scoreHistory);
  }

  //首页平台特色活动
  companylistbuid(){
    return this.$CommonProxyService.proxyService('post',
      `${apiService.companylistbuid}`, this.$GlobalService.globalQueryModel.companylistbuid);
  }
  //出款方式
  getWithdrawMethods(){
    return this.$CommonProxyService.proxyService('post', `${apiService.withdrawMethods}`)
  }
}
