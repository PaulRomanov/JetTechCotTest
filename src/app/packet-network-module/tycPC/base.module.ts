import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTER_CONFIG } from './base.routes';
import { QRCodeModule } from 'angular2-qrcode';
import { BaseComponent } from './base.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../../shared-module/shared-module.module';
import { NoviceguideComponent } from './index/noviceguide/noviceguide.component';
import { GuideComponent } from './index/guide/guide.component';
import { UnionComponent } from './index/union/union.component';
import { MemberComponent } from './index/member/member.component';
import { FavourableComponent } from './index/favourable/favourable.component';
import { NewPageComponent } from './new-page/new-page.component';
import { GameTipsComponent } from './new-page/game-tips/game-tips.component';
import { AppDownloadComponent } from './index/app-download/app-download.component';
import { RealtimeRebateComponent } from './index/member/realtime-rebate/realtime-rebate.component';
import { ActivityDetailComponent } from './new-page/activity-detail/activity-detail.component';
import { ConsultationComponent } from './shared-module/consultation/consultation.component';
import { CoreModule } from '../../core-module/core-module.module';
import { DjfishingComponent } from './shared-module/djfishing/djfishing.component';
import { DjchessCardComponent } from './shared-module/djchess-card/djchess-card.component';
import { ForgetPwdComponent } from './new-page/forget-pwd/forget-pwd.component';
import { DjvideoComponent } from './shared-module/djvideo/djvideo.component';
import { CircuitComponent } from './shared-module/circuit/circuit.component';
import {DjbottomComponent} from './shared-module/djbottom/djbottom.component';
import { DjlistComponent } from './shared-module/djlist/djlist.component';
import { BettingsComponent } from './shared-module/bettings/bettings.component';
import { DjVipGameComponent } from './shared-module/dj-vip-game/dj-vip-game.component';
import { ZmHeaderComponent } from './shared-module/zm-header/zm-header.component';
import { RulesTermsComponent } from './index/rules-terms/rules-terms.component';
import { GameplayComponent } from './index/gameplay/gameplay.component';
import { TechnicaHelpComponent } from './index/technica-help/technica-help.component';
import { CooperationComponent } from './new-page/cooperation/cooperation.component';
import { DjadvantageComponent } from './shared-module/djadvantage/djadvantage.component';
import { HandicapComponent } from './shared-module/handicap/handicap.component';
import { DjPokerComponent } from './shared-module/dj-poker/dj-poker.component';
import { SignComponent } from './new-page/sign/sign.component';
import { MemberExclusiveComponent } from './index/member-exclusive/member-exclusive.component';
import { AttractInvestmentComponent } from './new-page/attract-investment/attract-investment.component';
import { BeautyHomeServiceComponent } from './index/beauty-home-service/beauty-home-service.component';
import { DjGamesComponent } from './shared-module/djgames/djgames.component';
import { SportsTComponent } from './shared-module/sports/sports.component';
import { LotteryTComponent } from './shared-module/lottery/lottery.component';

import { AccountHistoryComponent } from './index/member/account-history/account-history.component';
import { ActivityComponent } from './index/member/activity/activity.component';
import { AuditComponent } from './index/member/audit/audit.component';
import { CommonBankCardsComponent } from './index/member/bank-card/common-bank-cards/common-bank-cards.component';
import { HistoryBankCardComponent } from './index/member/bank-card/history-bank-card/history-bank-card.component';
import { UpBankCardComponent } from './index/member/bank-card/history-bank-card/up-bank-card/up-bank-card.component';
import { NewBankCardComponent } from './index/member/bank-card/new-bank-card/new-bank-card.component';
import { BankCardComponent } from './index/member/bank-card/bank-card.component';
import { BettingComponent } from './index/member/betting/betting.component';
import { BettingTotalComponent } from './index/member/betting-total/betting-total.component';
import { CaijinComponent } from './index/member/caijin/caijin.component';
import { CompanysWycxkComponent } from './index/member/deposit/companys-payment/companys-wycxk/companys-wycxk.component';
import { CompanysPaymentComponent } from './index/member/deposit/companys-payment/companys-payment.component';
import { DepositOfficalComponent } from './index/member/deposit/deposit-offical/deposit-offical.component';
import { InternetBankingQuickComponent } from './index/member/deposit/internet-banking-quick/internet-banking-quick.component';
import { OnlineDepositComponent } from './index/member/deposit/online-deposit/online-deposit.component';
import { DepositComponent } from './index/member/deposit/deposit.component';
import { HistoricalNewComponent } from './index/member/historical-news/historical-new/historical-new.component';
import { LatestNewsComponent } from './index/member/historical-news/latest-news/latest-news.component';
import { HistoricalNewsComponent } from './index/member/historical-news/historical-news.component';
import { PersonalNewsComponent } from './index/member/personal-news/personal-news.component';
import { IssuesSucurityComponent } from './index/member/security/issues-sucurity/issues-sucurity.component';
import { LoginPasswordComponent } from './index/member/security/login-password/login-password.component';
import { PersonalInformationComponent } from './index/member/security/personal-information/personal-information.component';
import { SecurityQuestionComponent } from './index/member/security/security-question/security-question.component';
import { WithdrawalPasswordComponent } from './index/member/security/withdrawal-password/withdrawal-password.component';
import { SecurityComponent } from './index/member/security/security.component';
import { SigninComponent } from './index/member/signin/signin.component';
import { SpreadLessonComponent } from './index/member/spread-lesson/spread-lesson.component';
import { SpreadMoneyBrokerageComponent } from './index/member/spread-money/spread-money-brokerage/spread-money-brokerage.component';
import { SpreadMoneyDetailComponent } from './index/member/spread-money/spread-money-detail/spread-money-detail.component';
import { SpreadMoneyPayComponent } from './index/member/spread-money/spread-money-pay/spread-money-pay.component';
import { SpreadMoneyRecordComponent } from './index/member/spread-money/spread-money-record/spread-money-record.component';
import { SpreadMoneyRewardComponent } from './index/member/spread-money/spread-money-reward/spread-money-reward.component';
import { StatementComponent } from './index/member/spread-money/statement/statement.component';
import { SpreadMoneyComponent } from './index/member/spread-money/spread-money.component';
import { TransFormAtionComponent } from './index/member/trans-form-ation/trans-form-ation.component';
import { WithdrawMoneyComponent } from './index/member/withdraw-money/withdraw-money.component';
import { WithdrawoneOneComponent } from './index/member/withdraw-money/withdrawone-one/withdrawone-one.component';
import { YxForgerResetPwdComponent } from './new-page/forget-pwd/forger-reset-pwd/forger-reset-pwd.component';
import { TycMarqueeComponent } from './shared-module/marquee/marquee.component';
import { TycHomepageComponent } from './shared-module/homepage/homepage.component';
import { VipComponent } from './index/member/security/vip/vip.component';
import { VerifyClickComponent } from "./shared-module/verify-click/verify-click.component";
import { EnvelopeRainComponent } from './index/member/security/envelope-rain/envelope-rain.component';
import { PointsMallComponent } from './index/points-mall/points-mall.component';
import { OrderHistoryComponent } from './index/points-mall/order-history/order-history.component';
import { PointHistoryComponent } from './index/points-mall/point-history/point-history.component';
import { ExchangeComponent } from './index/points-mall/exchange/exchange.component';
import { MallIndexComponent } from './index/points-mall/mall-index/mall-index.component';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [
    BaseComponent,
    IndexComponent,
    NoviceguideComponent,
    GuideComponent,
    UnionComponent,
    MemberComponent,
    FavourableComponent,
    NewPageComponent,
    GameTipsComponent,
    AppDownloadComponent,
    RealtimeRebateComponent,
    ActivityDetailComponent,
    ConsultationComponent,
    DjfishingComponent,
    DjchessCardComponent,
    ForgetPwdComponent,
    DjvideoComponent,
    CircuitComponent,
    DjbottomComponent,
    DjlistComponent,
    BettingsComponent,
    DjVipGameComponent,
    ZmHeaderComponent,
    RulesTermsComponent,
    GameplayComponent,
    TechnicaHelpComponent,
    CooperationComponent,
    DjadvantageComponent,
    HandicapComponent,
    DjPokerComponent,
    SignComponent,
    MemberExclusiveComponent,
    AttractInvestmentComponent,
    BeautyHomeServiceComponent,
    DjGamesComponent,
    SportsTComponent,
    LotteryTComponent,
    AccountHistoryComponent,
    ActivityComponent,
    AuditComponent,
    CommonBankCardsComponent,
    HistoryBankCardComponent,
    UpBankCardComponent,
    NewBankCardComponent,
    BankCardComponent,
    BettingComponent,
    BettingTotalComponent,
    CaijinComponent,
    CompanysWycxkComponent,
    CompanysPaymentComponent,
    DepositOfficalComponent,
    InternetBankingQuickComponent,
    OnlineDepositComponent,
    DepositComponent,
    HistoricalNewComponent,
    LatestNewsComponent,
    HistoricalNewsComponent,
    PersonalNewsComponent,
    IssuesSucurityComponent,
    LoginPasswordComponent,
    PersonalInformationComponent,
    SecurityQuestionComponent,
    WithdrawalPasswordComponent,
    SecurityComponent,
    SigninComponent,
    SpreadLessonComponent,
    SpreadMoneyBrokerageComponent,
    SpreadMoneyDetailComponent,
    SpreadMoneyPayComponent,
    SpreadMoneyRecordComponent,
    SpreadMoneyRewardComponent,
    StatementComponent,
    SpreadMoneyComponent,
    TransFormAtionComponent,
    WithdrawMoneyComponent,
    WithdrawoneOneComponent,
    YxForgerResetPwdComponent,
    TycMarqueeComponent,
    TycHomepageComponent,
    VipComponent,
    VerifyClickComponent,
    EnvelopeRainComponent,
    PointsMallComponent,
    OrderHistoryComponent,
    PointHistoryComponent,
    ExchangeComponent,
    MallIndexComponent,
    // KnowHuobiComponent,
    // XunibiHuobiComponent,
    // XunibiBianComponent,
    // XunibiCoinComponent
  ],
  imports: [
    RouterModule.forChild(ROUTER_CONFIG),
    SharedModule,
    CoreModule,
    QRCodeModule,
    NzCascaderModule,
    NzSpinModule
  ]
})
export class BaseModule { }

