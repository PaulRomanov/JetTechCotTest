import { Routes } from '@angular/router';
import { BaseComponent } from './base.component';
import { IndexComponent } from './index/index.component';
import { NoviceguideComponent } from './index/noviceguide/noviceguide.component';
import { PointsMallComponent } from './index/points-mall/points-mall.component';
import { GuideComponent } from './index/guide/guide.component';
import { UnionComponent } from './index/union/union.component';
import { MemberComponent } from './index/member/member.component';
import { DepositComponent } from './index/member/deposit/deposit.component';
import { WithdrawMoneyComponent } from './index/member/withdraw-money/withdraw-money.component';
import { TransFormAtionComponent } from './index/member/trans-form-ation/trans-form-ation.component';
import { BankCardComponent } from './index/member/bank-card/bank-card.component';
import { SecurityComponent } from './index/member/security/security.component';
import { AccountHistoryComponent } from './index/member/account-history/account-history.component';
import { BettingTotalComponent } from './index/member/betting-total/betting-total.component';
import { AuditComponent } from './index/member/audit/audit.component';
import { ActivityComponent } from './index/member/activity/activity.component';
import { BettingComponent } from './index/member/betting/betting.component';
import { PersonalNewsComponent } from './index/member/personal-news/personal-news.component';
import { HistoricalNewsComponent } from './index/member/historical-news/historical-news.component';
import { CommonBankCardsComponent } from './index/member/bank-card/common-bank-cards/common-bank-cards.component';
import { HistoryBankCardComponent } from './index/member/bank-card/history-bank-card/history-bank-card.component';
import { NewBankCardComponent } from './index/member/bank-card/new-bank-card/new-bank-card.component';
import { InternetBankingQuickComponent } from './index/member/deposit/internet-banking-quick/internet-banking-quick.component';
import { OnlineDepositComponent } from './index/member/deposit/online-deposit/online-deposit.component';
import { CompanysPaymentComponent } from './index/member/deposit/companys-payment/companys-payment.component';
import { DepositOfficalComponent } from './index/member/deposit/deposit-offical/deposit-offical.component';
import { PersonalInformationComponent } from './index/member/security/personal-information/personal-information.component';
import { VipComponent } from './index/member/security/vip/vip.component';
import { EnvelopeRainComponent } from './index/member/security/envelope-rain/envelope-rain.component';
import { LoginPasswordComponent } from './index/member/security/login-password/login-password.component';
import { WithdrawalPasswordComponent } from './index/member/security/withdrawal-password/withdrawal-password.component';
import { SecurityQuestionComponent } from './index/member/security/security-question/security-question.component';
import { LatestNewsComponent } from './index/member/historical-news/latest-news/latest-news.component';
import { HistoricalNewComponent } from './index/member/historical-news/historical-new/historical-new.component';
import { IssuesSucurityComponent } from './index/member/security/issues-sucurity/issues-sucurity.component';
import { FavourableComponent } from './index/favourable/favourable.component';
import { DjGamesComponent } from './shared-module/djgames/djgames.component';
import { AppDownloadComponent } from './index/app-download/app-download.component';
import { RealtimeRebateComponent } from './index/member/realtime-rebate/realtime-rebate.component';
import { ChessCardComponent } from '../../shared-module/component/yx-games/chess-card/chess-card.component';
import { FishingComponent } from '../../shared-module/component/yx-games/fishing/fishing.component';
import { VideoComponent } from '../../shared-module/component/yx-games/video/video.component';
import { LotteryComponent } from '../../shared-module/component/yx-games/lottery/lottery.component';
import { SportsComponent } from '../../shared-module/component/yx-games/sports/sports.component';
import { NewPageComponent } from './new-page/new-page.component';
import { GameTipsComponent } from './new-page/game-tips/game-tips.component';
import { SpreadMoneyComponent } from './index/member/spread-money/spread-money.component';
import { SpreadMoneyPayComponent } from './index/member/spread-money/spread-money-pay/spread-money-pay.component';
import { SpreadLessonComponent } from './index/member/spread-lesson/spread-lesson.component';
import { SpreadMoneyRewardComponent } from './index/member/spread-money/spread-money-reward/spread-money-reward.component';
import { SpreadMoneyRecordComponent } from './index/member/spread-money/spread-money-record/spread-money-record.component';
import { SpreadMoneyDetailComponent } from './index/member/spread-money/spread-money-detail/spread-money-detail.component';
import { ActivityDetailComponent } from './new-page/activity-detail/activity-detail.component';
import { DjfishingComponent } from './shared-module/djfishing/djfishing.component';
import { DjchessCardComponent } from './shared-module/djchess-card/djchess-card.component';
import { ForgetPwdComponent } from './new-page/forget-pwd/forget-pwd.component';
import { DjvideoComponent } from './shared-module/djvideo/djvideo.component';
import { CircuitComponent } from './shared-module/circuit/circuit.component';
import { BettingsComponent } from './shared-module/bettings/bettings.component';
import { StatementComponent } from './index/member/spread-money/statement/statement.component';
import { DjVipGameComponent } from './shared-module/dj-vip-game/dj-vip-game.component';
import { RulesTermsComponent } from './index/rules-terms/rules-terms.component';
import { GameplayComponent } from './index/gameplay/gameplay.component';
import { TechnicaHelpComponent } from './index/technica-help/technica-help.component';
import { CaijinComponent } from './index/member/caijin/caijin.component';
import { CooperationComponent } from './new-page/cooperation/cooperation.component';
import { SpreadMoneyBrokerageComponent } from './index/member/spread-money/spread-money-brokerage/spread-money-brokerage.component';
import { DjPokerComponent } from './shared-module/dj-poker/dj-poker.component';
import { SigninComponent } from './index/member/signin/signin.component';
import { SignComponent } from './new-page/sign/sign.component';
import { MemberExclusiveComponent } from './index/member-exclusive/member-exclusive.component';
import { AttractInvestmentComponent } from './new-page/attract-investment/attract-investment.component';
import { BeautyHomeServiceComponent } from './index/beauty-home-service/beauty-home-service.component';
import { SportsTComponent } from './shared-module/sports/sports.component';
import { LotteryTComponent } from './shared-module/lottery/lottery.component';
import { KnowHuobiComponent } from '../../shared-module/component/hyzx-member/member/deposit/know-huobi/know-huobi.component';
import { XunibiHuobiComponent } from '../../shared-module/component/hyzx-member/member/deposit/xunibi-huobi/xunibi-huobi.component';
import { XunibiBianComponent } from '../../shared-module/component/hyzx-member/member/deposit/xunibi-bian/xunibi-bian.component';
import { XunibiCoinComponent } from '../../shared-module/component/hyzx-member/member/deposit/xunibi-coin/xunibi-coin.component';
import { PointHistoryComponent } from './index/points-mall/point-history/point-history.component';
import { OrderHistoryComponent } from './index/points-mall/order-history/order-history.component';
import { ExchangeComponent } from './index/points-mall/exchange/exchange.component';
import { MallIndexComponent } from './index/points-mall/mall-index/mall-index.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'index', component: IndexComponent,
        children: [
          { path: 'noviceguide', component: NoviceguideComponent },
          { path: 'pointsMall', component:  PointsMallComponent,
            children: [
              { path: '', component: MallIndexComponent },
              { path: 'order-history', component: OrderHistoryComponent },
              { path: 'point-history', component: PointHistoryComponent },
              { path: 'exchange', component: ExchangeComponent },
            ]
          },
          { path: 'favourable', component: FavourableComponent },
          { path: 'guide/:type', component: GuideComponent },
          { path: 'rulesTerms/:type', component: RulesTermsComponent },
          { path: 'gameplay/:type', component: GameplayComponent },
          { path: 'technicalHelp/:type', component: TechnicaHelpComponent },
          { path: 'union', component: UnionComponent },
          { path: 'games', component: DjGamesComponent },
          { path: 'appDown', component: AppDownloadComponent },
          { path: 'chessCard', component: DjPokerComponent },
          { path: 'pokerGame', component: DjchessCardComponent },
          { path: 'fishing', component: DjfishingComponent },
          { path: 'video', component: DjvideoComponent },
          { path: 'lottery', component: LotteryComponent },
          { path: 'bettings', component: BettingsComponent },
          { path: 'sports', component: SportsComponent },
          { path: 'vipPage', component: AttractInvestmentComponent },
          { path : 'sportst', component: SportsTComponent},
          { path: 'lotteryt', component: LotteryTComponent },
          { path: 'XunibiHuobi', component: XunibiHuobiComponent },
          { path: 'XunibiBian', component: XunibiBianComponent },
          { path: 'XunibiCoin', component: XunibiCoinComponent },
          {
            path: 'member', component: MemberComponent,
            children: [
              { path: 'knowHuobi', component: KnowHuobiComponent },
              {
                path: 'deposit', component: DepositComponent,
                children: [
                  { path: 'internetBankingQuick', component: InternetBankingQuickComponent },
                  { path: 'onlineDeposit/:paychannel', component: OnlineDepositComponent },
                  { path: 'companysPayment/:paychannel', component: CompanysPaymentComponent },
                  { path: 'depositOffical', component: DepositOfficalComponent },
                ]
              },
              // { path: 'depositOffical', component: DepositOfficalComponent },
              { path: 'withdrawMoney', component: WithdrawMoneyComponent },
              { path: 'transFormAtion', component: TransFormAtionComponent },
              {
                path: 'bankCard', component: BankCardComponent,
                children: [
                  { path: 'commonBank', component: CommonBankCardsComponent },
                  { path: 'historyBank', component: HistoryBankCardComponent },
                  { path: 'newBank', component: NewBankCardComponent },
                ]
              },
              {
                path: 'security', component: SecurityComponent,
                children: [
                  { path: 'personalInformation', component: PersonalInformationComponent },
                  { path: 'loginPassword', component: LoginPasswordComponent },
                  { path: 'withdrawalPassword', component: WithdrawalPasswordComponent },
                  { path: 'securityQuestion', component: SecurityQuestionComponent },
                  { path: 'IssuesSucurity', component: IssuesSucurityComponent },
                ]
              },
              { path: 'vipCenter', component: VipComponent },
              { path: 'envelopeRain', component: EnvelopeRainComponent },
              { path: 'realtimeRebate', component: RealtimeRebateComponent },
              { path: 'accountHistory', component: AccountHistoryComponent },
              { path: 'bettingTotal', component: BettingTotalComponent },
              { path: 'audit', component: AuditComponent },
              { path: 'activity', component: ActivityComponent },
              { path: 'betting', component: BettingComponent },
              { path: 'personalNews', component: PersonalNewsComponent },
              {
                path: 'historicalNews', component: HistoricalNewsComponent,
                children: [
                  { path: 'latest', component: LatestNewsComponent },
                  { path: 'historical', component: HistoricalNewComponent },
                ]
              },
              {
                path: 'spreadMoney', component: SpreadMoneyComponent,
                children: [
                  { path: 'spreadMoneyPay', component: SpreadMoneyPayComponent },
                  { path: 'spreadMoneyReward', component: SpreadMoneyRewardComponent },
                  { path: 'spreadMoneyRecord', component: SpreadMoneyRecordComponent },
                  { path: 'spreadMoneyDetail', component: SpreadMoneyDetailComponent },
                  { path: 'statement', component: StatementComponent },
                  { path: 'spreadMoneyBrokerage', component: SpreadMoneyBrokerageComponent }
                ]
              },
              { path: 'SpreadLesson', component: SpreadLessonComponent },
              { path: 'caijin', component: CaijinComponent },
              { path: 'signin', component: SigninComponent }
            ]
          },
          { path: 'member-exclusive', component: MemberExclusiveComponent },
          { path: 'beauty-home-service', component: BeautyHomeServiceComponent },
        ]
      },
      {
        path: 'newPage', component: NewPageComponent,
        children: [
          { path: 'gameTips/:gameId', component: GameTipsComponent },
          { path: 'activityDetail/:activityId', component: ActivityDetailComponent },
          { path: 'forgetPwd', component: ForgetPwdComponent },
          { path: 'circuit', component: CircuitComponent },
          { path: 'cooperation/:index', component: CooperationComponent },
          { path: 'sign', component: SignComponent },
          { path: 'vipPage', component: AttractInvestmentComponent },
        ]
      }
    ]
  }
];
