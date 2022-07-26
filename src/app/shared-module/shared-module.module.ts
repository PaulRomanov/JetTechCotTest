import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core-module/core-module.module';
import { ListComponent } from './component/list/list.component';
import { BottomComponent } from './component/bottom/bottom.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import {CharacteristicComponent} from './component/characteristic/characteristic.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {KeyFilterModule} from 'primeng/keyfilter';
import {CalendarModule} from 'primeng/calendar';
import { MemberComponent } from './component/hyzx-member/member/member.component';
import { DepositComponent } from './component/hyzx-member/member/deposit/deposit.component';
import { WithdrawMoneyComponent } from './component/hyzx-member/member/withdraw-money/withdraw-money.component';
import { TransFormAtionComponent } from './component/hyzx-member/member/trans-form-ation/trans-form-ation.component';
import { BankCardComponent } from './component/hyzx-member/member/bank-card/bank-card.component';
import { SecurityComponent } from './component/hyzx-member/member/security/security.component';
import { AccountHistoryComponent } from './component/hyzx-member/member/account-history/account-history.component';
import { BettingTotalComponent } from './component/hyzx-member/member/betting-total/betting-total.component';
import { AuditComponent } from './component/hyzx-member/member/audit/audit.component';
import { ActivityComponent } from './component/hyzx-member/member/activity/activity.component';
import { BettingComponent } from './component/hyzx-member/member/betting/betting.component';
import { PersonalNewsComponent } from './component/hyzx-member/member/personal-news/personal-news.component';
import { HistoricalNewsComponent } from './component/hyzx-member/member/historical-news/historical-news.component';
import { InternetBankingQuickComponent } from './component/hyzx-member/member/deposit/internet-banking-quick/internet-banking-quick.component';
import { OnlineDepositComponent } from './component/hyzx-member/member/deposit/online-deposit/online-deposit.component';
import { CompanysPaymentComponent } from './component/hyzx-member/member/deposit/companys-payment/companys-payment.component';
import { CommonBankCardsComponent } from './component/hyzx-member/member/bank-card/common-bank-cards/common-bank-cards.component';
import { HistoryBankCardComponent } from './component/hyzx-member/member/bank-card/history-bank-card/history-bank-card.component';
import { NewBankCardComponent } from './component/hyzx-member/member/bank-card/new-bank-card/new-bank-card.component';
import { PersonalInformationComponent } from './component/hyzx-member/member/security/personal-information/personal-information.component';
import { LoginPasswordComponent } from './component/hyzx-member/member/security/login-password/login-password.component';
import { WithdrawalPasswordComponent } from './component/hyzx-member/member/security/withdrawal-password/withdrawal-password.component';
import { SecurityQuestionComponent } from './component/hyzx-member/member/security/security-question/security-question.component';
import { LatestNewsComponent } from './component/hyzx-member/member/historical-news/latest-news/latest-news.component';
import { HistoricalNewComponent } from './component/hyzx-member/member/historical-news/historical-new/historical-new.component';
import {StepsModule} from 'primeng/steps';
import { WithdrawoneOneComponent } from './component/hyzx-member/member/withdraw-money/withdrawone-one/withdrawone-one.component';
import {ChipsModule} from 'primeng/chips';
import {RadioButtonModule} from 'primeng/radiobutton';
import { IssuesSucurityComponent } from './component/hyzx-member/member/security/issues-sucurity/issues-sucurity.component';
import { FavourableConComponent } from './component/yhhd-favourable/favourable-con/favourable-con.component';
import { UpBankCardComponent } from './component/hyzx-member/member/bank-card/history-bank-card/up-bank-card/up-bank-card.component';
import { GamesComponent } from './component/yx-games/games/games.component';
import {CheckboxModule} from 'primeng/checkbox';
import { ChessCardComponent } from './component/yx-games/chess-card/chess-card.component';
import { FishingComponent } from './component/yx-games/fishing/fishing.component';
import { VideoComponent } from './component/yx-games/video/video.component';
import { LotteryComponent } from './component/yx-games/lottery/lottery.component';
import { SportsComponent } from './component/yx-games/sports/sports.component';
import {ToastModule} from 'primeng/toast';
import {LoadingBarComponent} from './component/loading-bar/loading-bar.component';
import {LoadingBarService} from './component/loading-bar/loading-bar.service';
import { GamePermisComponent } from './component/yx-games/game-permis/game-permis.component';
import { SpreadMoneyComponent } from './component/hyzx-member/member/spread-money/spread-money.component';
import { SpreadMoneyPayComponent } from './component/hyzx-member/member/spread-money/spread-money-pay/spread-money-pay.component';
import { SpreadMoneyRewardComponent } from './component/hyzx-member/member/spread-money/spread-money-reward/spread-money-reward.component';
import { SpreadMoneyRecordComponent } from './component/hyzx-member/member/spread-money/spread-money-record/spread-money-record.component';
import { SpreadMoneyDetailComponent } from './component/hyzx-member/member/spread-money/spread-money-detail/spread-money-detail.component';
import { SpreadLessonComponent } from './component/hyzx-member/member/spread-lesson/spread-lesson.component';
import { LoginAfficheComponent } from './component/login-affiche/login-affiche.component';
import { DepositOfficalComponent } from './component/hyzx-member/member/deposit/deposit-offical/deposit-offical.component';
import { ForgerResetPwdComponent } from './component/forger-reset-pwd/forger-reset-pwd.component';
import { MarqueeComponent } from './component/marquee/marquee.component';
import { StatementComponent } from './component/hyzx-member/member/spread-money/statement/statement.component';
import { CaijinComponent } from './component/hyzx-member/member/caijin/caijin.component';
import { SpreadMoneyBrokerageComponent } from './component/hyzx-member/member/spread-money/spread-money-brokerage/spread-money-brokerage.component';
import { SigninComponent } from './component/hyzx-member/member/signin/signin.component';
import { CompanysWycxkComponent } from './component/hyzx-member/member/deposit/companys-payment/companys-wycxk/companys-wycxk.component';
import { KnowHuobiComponent } from './component/hyzx-member/member/deposit/know-huobi/know-huobi.component';
import { XunibiHuobiComponent } from './component/hyzx-member/member/deposit/xunibi-huobi/xunibi-huobi.component';
import { XunibiBianComponent } from './component/hyzx-member/member/deposit/xunibi-bian/xunibi-bian.component';
import { XunibiCoinComponent } from './component/hyzx-member/member/deposit/xunibi-coin/xunibi-coin.component';
// import { AttendanceRecordComponent } from './component/hyzx-member/member/signin/attendance-record/attendance-record.component';
// import { AwardAuditComponent } from './component/hyzx-member/member/signin/award-audit/award-audit.component';
@NgModule({
  declarations: [
    ListComponent,
    BottomComponent,
    HomepageComponent,
    CharacteristicComponent,
    MemberComponent,
    DepositComponent,
    WithdrawMoneyComponent,
    TransFormAtionComponent,
    BankCardComponent,
    SecurityComponent,
    AccountHistoryComponent,
    BettingTotalComponent,
    AuditComponent,
    ActivityComponent,
    BettingComponent,
    PersonalNewsComponent,
    HistoricalNewsComponent,
    InternetBankingQuickComponent,
    OnlineDepositComponent,
    CompanysPaymentComponent,
    CommonBankCardsComponent,
    HistoryBankCardComponent,
    NewBankCardComponent,
    PersonalInformationComponent,
    LoginPasswordComponent,
    WithdrawalPasswordComponent,
    SecurityQuestionComponent,
    LatestNewsComponent,
    HistoricalNewComponent,
    WithdrawoneOneComponent,
    SecurityQuestionComponent,
    IssuesSucurityComponent,
    FavourableConComponent,
    UpBankCardComponent,
    GamesComponent,
    ChessCardComponent,
    FishingComponent,
    VideoComponent,
    LotteryComponent,
    SportsComponent,
    LoadingBarComponent,
    GamePermisComponent,
    SpreadMoneyComponent,
    SpreadMoneyPayComponent,
    SpreadMoneyRewardComponent,
    SpreadMoneyRecordComponent,
    SpreadMoneyDetailComponent,
    SpreadLessonComponent,
    LoginAfficheComponent,
    DepositOfficalComponent,
    ForgerResetPwdComponent,
    MarqueeComponent,
    StatementComponent,
    CaijinComponent,
    SpreadMoneyBrokerageComponent,
    SigninComponent,
    CompanysWycxkComponent,
    CompanysPaymentComponent,
    KnowHuobiComponent,
    XunibiHuobiComponent,
    XunibiBianComponent,
    XunibiCoinComponent
    // AttendanceRecordComponent,
    // AwardAuditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    KeyFilterModule,
    CalendarModule,
    StepsModule,
    ChipsModule,
    RadioButtonModule,
    CheckboxModule,
    ToastModule
  ],
  bootstrap: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListComponent,
    BottomComponent,
    HomepageComponent,
    CharacteristicComponent,
    DropdownModule,
    InputTextModule,
    PasswordModule,
    KeyFilterModule,
    MemberComponent,
    DepositComponent,
    WithdrawMoneyComponent,
    TransFormAtionComponent,
    BankCardComponent,
    SecurityComponent,
    AccountHistoryComponent,
    BettingTotalComponent,
    AuditComponent,
    ActivityComponent,
    BettingComponent,
    PersonalNewsComponent,
    HistoricalNewsComponent,
    CalendarModule,
    StepsModule,
    CalendarModule,
    ChipsModule,
    RadioButtonModule,
    FavourableConComponent,
    GamesComponent,
    CheckboxModule,
    ChessCardComponent,
    FishingComponent,
    VideoComponent,
    LotteryComponent,
    SportsComponent,
    ToastModule,
    LoadingBarComponent,
    GamePermisComponent,
    SpreadMoneyComponent,
    LoginAfficheComponent,
    ForgerResetPwdComponent,
    MarqueeComponent,
  ],
  providers: [
    LoadingBarService,
  ]
})
export class SharedModule {

}

