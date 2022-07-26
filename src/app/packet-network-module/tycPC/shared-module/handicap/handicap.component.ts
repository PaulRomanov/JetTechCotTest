import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../../core-module/common-util/global-service';
import {GlobalMethodsService} from '../../../../core-module/common-methods/global-methods.service';
import {CommonDataService} from '../../../../core-module/common-util/common-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Result} from '../../../../core-module/common-util/result';
import { environment } from 'src/environments/environment';
import jQ from 'jquery';


@Component({
  selector: 'app-handicap',
  templateUrl: './handicap.component.html',
  styleUrls: ['./handicap.component.scss']
})
export class HandicapComponent implements OnInit {

  list = [];
  imelemUrl;
  subscribeScoll;
  charas;
  gameIndex = 1;
  games = [];
  selectedGameTypeIndex = 0;
  selectedGameType = {
    name: '',
    imgUrl: '',
    subname: '',
    childs: [],
    summary: '',
    enname: ''
  };
  selected = true;
  selectedIndex = 0;
  selectedIndex1 = null;
  backgroundImage = '';
  selectedBackgroundImage = '';
  selectedStyle = {};
  unselectedStyle = {};
  scrolling = false;
  selectedGame = {
    imgUrl: '',
    subname: '',
    name: ''
  };
  teseList = [
    {activitypictures:'',detailspictures:''},
    {activitypictures:'',detailspictures:''},
    {activitypictures:'',detailspictures:''},
    {activitypictures:'',detailspictures:''},
    {activitypictures:'',detailspictures:''},
  ];
  sportList = [];
  charas2 = [
    {
      gameUrl: './../video',
      title: 'AG视讯',
      imgUrl: `/tyc/img/home_up_img01.png`
    },
    {
      gameUrl: './../pokerGame',
      title: '开元棋牌',
      imgUrl: `/tyc/img/home_up_img02.png`
    },
    {
      gameUrl: './../games',
      title: 'MG电子厅',
      imgUrl: `/tyc/img/home_up_img03.png`
    },
    {
      gameUrl: './../lotteryt',
      title: 'IG官方彩票',
      imgUrl: `/tyc/img/home_up_img04.png`
    }
  ];
  zhenren = [];
  isNOpenWin = false;
  appDownUrl = '';
  imgOpenIndex;
  constructor(
    public $GlobalService: GlobalService,
    public $GlobalMethodsService: GlobalMethodsService,
    public $CommonDataService: CommonDataService,
    private $Router: Router,
    private $ActivatedRoute: ActivatedRoute
  ) {
  }

  // $GlobalService.globalJavaResData.gameNavList

  goGame(item) {
    this.$GlobalMethodsService.goGameResolve(item);
  }

  nopenWindow(item){
    if(item.JumpMethod == 0){
      this.isNOpenWin = true;
      // this.imgOpenIndex = this.$GlobalService.globalJavaResData.cdnValidKey2+this.$GlobalService.globalJavaResData.projectName+'/img/platform _features_'+index+'_content.png';
      this.imgOpenIndex = item.detailspictures;
    }else{
      window.open(item.detailslink, '_blank');
    }
  }

  closenWindow(){
    this.isNOpenWin = false;
  }

  ngOnInit() {
    this.backgroundImage = `url(${this.$GlobalService.globalJavaResData.cdnValidKey2}/tyc/img/home_btn_Unselected.png)`;
    this.selectedBackgroundImage = `url(${this.$GlobalService.globalJavaResData.cdnValidKey2}/tyc/img/home_btn_Selected.png)`;
    //   this.subscribeScoll = fromEvent(window, 'scroll')
    // .subscribe((event) => {
    //     this.onWindowScroll();
    //   });

    // this.$GlobalService.globalJavaResData.gameNavList().then((res: Result) => {
    //     console.log(res)
    // });

    // 电竞网赛事实时盘口
    // this.$CommonDataService.getMatch().then((res: Result) => {
    //   this.list = res.data.matchDetail || [];
    //   this.imelemUrl = res.data.imelemUrl;
    // });
    // 首页特色活动
    this.$CommonDataService.chara().then((res: Result) => {
      this.charas = res.data;
    });

    // 平台特色
    this.$CommonDataService.companylistbuid().then((res: Result) => {
      this.teseList = res.list;
      console.log(this.teseList,res)
    });
    // 电竞实时足球列表
    this.$CommonDataService.getSportInfo().then((res: Result) => {
      this.sportList = res.data;
      // console.log(res);
    });
    this.$CommonDataService.homegame().then((res: Result) => {
      this.games = res.data;
      for (let i = 0; i < this.games.length; i++) {
        const name = this.games[i].subname;
        if (name === 'POKERGAMES') {
          this.games[i].bgPosition = '3px -8px';
          this.games[i].enname = 'CHESS &CARD GAMES';
          this.games[i].bgPosition1 = '-68px 0';
          this.games[i].summary = '包含斗地主、牛牛、麻将、推筒子、炸金花、十三水、德州扑克、百家乐、推胡子、二十一点等游戏，同时在线人数高达上万人，不用担心缺人的问题，玩家随时都可以开局，玩法随你喜欢，玩家在线无限制的畅玩。';
        } else if (name === 'DJ GAME') {
          this.games[i].bgPosition = '-898px -6px';
          this.games[i].bgPosition1 = '-978px 0';
          this.games[i].summary = '';
          this.games[i].enname = 'LIVE CASINO';
        } else if (name === 'TY GAME') {
          this.games[i].enname = 'SPOETS EVENTS';
          this.games[i].bgPosition = '-753px -3px';
          this.games[i].bgPosition1 = '-822px 0';
          this.games[i].summary = '信誉至上，网上娱乐爱好者首选！ 提供各种大型赛事。稳定安全。包含BBIN体育、沙巴体育、皇冠体育、皇冠三昇，五大联赛及各式球赛投注竞猜，包括NBA篮球、足球、网球、冠军赛、棒球、冰球、橄榄球等游戏。';
        } else if (name === 'PY GAME') {
          this.games[i].enname = 'FISHING GAMES';
          this.games[i].bgPosition = '-293px -3px';
          this.games[i].bgPosition1 = '-370px -3px';
          this.games[i].summary = '多种鱼类和多种炮弹的热门休闲游戏。经过调整优化传统捕鱼游戏玩法，使游戏玩法更加完善精确、确保游戏公平公正。公正透明的报表系统、多种捕鱼工具、人性化的游戏操作、精致的动画效果，让玩家完全沉浸在捕鱼的乐趣中。游戏设有百万JACKPOT奖励和派奖活动，玩家享受游戏乐趣同时获得丰厚奖金。';
          this.games[i].childs = [
            { gameBgImg: this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc/img/img_content_logo_ag.png' , name: 'AG捕鱼'},
            { gameBgImg: this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc/img/img_content_logo_bbin.png', name: 'BBIN捕鱼' },
            { gameBgImg: this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc/img/img_content_logo_cq9.png', name: 'CQ9捕鱼' },
            { gameBgImg: this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc/img/img_content_logo_fg.png', name: 'FG捕鱼' },
            { gameBgImg: this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc/img/img_content_logo_jdb.png', name: 'JDB捕鱼' },
            { gameBgImg: this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc/img/img_content_logo_ka.png', name: 'KA捕鱼' },
            { gameBgImg: this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc/img/img_content_logo_vg.png', name: 'VG捕鱼' },
            { gameBgImg: this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc/img/img_fishing_menu_08.png', name: 'BG捕鱼' },
            // { gameBgImg: this.$GlobalService.globalJavaResData.cdnValidKey2 + '/tyc/img/img_fishing_menu_09.png', name: 'HY捕鱼' }
          ];
        } else if (name === 'ZR GAME') {
          this.games[i].enname = 'LIVE CASINO';
          this.games[i].bgPosition = '-142px -5px';
          this.games[i].bgPosition1 = '-224px -3px';
          this.games[i].summary = '以高规格打造的真人配备最先进的设备以及富丽堂皇的装潢，为玩家打造绝佳真人视讯游戏体验。游戏选择多样化，包括备受欢迎的百家乐、骰宝、轮盘等，加上全天侯监控管理，为玩家提供稳定而流畅的游戏服务。';
        } else if (name === 'DZ GAME') {
          this.games[i].enname = 'SLOT GAMES';
          this.games[i].bgPosition = '-605px 0';
          this.games[i].bgPosition1 = '-679px 9px';
          this.games[i].summary = '在线娱乐结合综多电子游艺平台：主要有BBIN电子、CQ9电子、KA电子、WM电子、PT电子、JDB电子、AG电子、MG电子、大满贯电子、VG电子，除了老虎机、桌上游戏、街机游戏、刮刮乐、转轮、捕鱼机外，超过千款的电脑联机游戏任玩家游玩，新鲜有趣的视觉感受，彷佛亲临CASINO！';
        } else if (name === 'CP GAME') {
          this.games[i].enname = 'LOTTERY GAMES';
          this.games[i].bgPosition = '-445px -3px';
          this.games[i].bgPosition1 = '-527px 2px';
          this.games[i].summary = '提供中国福利彩票开奖时间、开奖查询，各类福利彩开奖时间信息，如六合彩、3D彩、BB番摊、11选5、排列三、北京pk拾、时时彩、快乐十分、快乐8、快乐彩、江苏快三、十一定夺金、双喜龙门、BB幸运熊猫、BB射龙门、BB雷电PK、梯子游戏等等。';
        }
      }
      this.selectedGameType = this.games[0];
      this.selectedGame = this.games[0].childs[0];
      // const arr = res.data;
      // for (let o = 0; o < this.charas2.length; o++) {
      //   for (let t = 0; t < arr.length; t++) {
      //     // console.log(arr[t].childs)
      //     for (let i = 0; i < arr[t].childs.length; i++) {
      //       if (this.charas2[o].title === arr[t].childs[i].name) {
      //         this.charas2[o]['i'] = i;
      //         this.charas2[o]['obj'] = arr[t].childs[i];
      //       }
      //     }
      //   }
      // }
      let arr = [];
      res.data.forEach(element => {
        arr = [...arr, ...element.childs];
      });
      for (let i = 0; i < this.charas2.length; i++) {
        arr.forEach((it, index) => {
          if (this.charas2[i].title === it.name) {
            this.charas2[i]['obj'] = it;
            this.charas2[i]['gameId'] = it.gameId;
          }
        });
      }
      console.log(this.charas2)
    });
  }

  enterGame(item) {
    const name = this.selectedGameType.subname;
    if (name === 'TY GAME') {
      this.$GlobalMethodsService.goGameResolve(item);
    } else if (name === 'VG GAME') {
      this.$Router.navigate(['./../chessCard'], {relativeTo: this.$ActivatedRoute});
    }  else if (name === 'POKERGAMES') {
      this.$Router.navigate(['./../pokerGame'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'PY GAME') {
      this.$Router.navigate(['./../fishing'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'ZR GAME') {
      this.$Router.navigate(['./../video'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'DZ GAME') {
      this.$Router.navigate(['./../games'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'CP GAME') {
      this.$Router.navigate(['./../lotteryt'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'YHHD') {
      this.$Router.navigate(['./../favourable'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'APPXZ') {
      // this.$Router.navigate(['ly/index/appDown'], { relativeTo: this.$ActivatedRoute });
      this.$Router.navigate(['./../appDown'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'DJ GAME') {
      // this.$Router.navigate(['ly/index/appDown'], { relativeTo: this.$ActivatedRoute });
      this.$Router.navigate(['./../bettings'], {relativeTo: this.$ActivatedRoute});
    } else if (name === 'VIP GAME') { // 合作经营
      // this.$Router.navigate(['./vipPage'], {relativeTo: this.$ActivatedRoute});
      // window.open(`#/${environment.rootUrl}/newPage/cooperation/0`, '_blank');
      window.open(`#/${environment.rootUrl}/newPage/vipPage`, '_blank');
    } else {
      this.$Router.navigate(['./../noviceguide'], {relativeTo: this.$ActivatedRoute});
    }
  }

  selectGameType(type, index) {
    this.selected = false;
    this.selectedIndex = index;
    setTimeout(() => {
      jQ('.games_box').animate({
        scrollLeft: 0
      }, 0);
      this.selectedGameType = type;
      this.selectedGame = this.selectedGameType.childs[0];
      this.selected = true;
    }, 800);
  }

  scrollGame(direct) {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;
    setTimeout(() => {
      this.scrolling = false;
    }, 500);
    if (direct === 'prev') {
      jQ('.games_box').animate({
        scrollTop: jQ('.games_box').scrollTop() - 106 * 5
      }, 500, 'swing');
    } else {
      jQ('.games_box').animate({
        scrollTop: jQ('.games_box').scrollTop() + 106 * 5
      }, 500);
    }
  }


  // onWindowScroll() {
  //   let name = jQ('.seekAdvice-list-tuglie');
  //   let clheight = document.documentElement.clientHeight;
  //   let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  //   console.log((clheight+scrollTop),jQ('.seekAdvice-list-tuglie').offset().top);
  //   (clheight+scrollTop) > name.offset().top ? name.addClass('aa') : name.removeClass('aa')
  // }
  // 特色进入游戏
  listgame(url) {
    window.open(url, '_blank');
  }

  // 盘口进入
  thishref(themeUrl) {
    if (this.$GlobalService.globalQueryModel.userToken === null) {
      this.$GlobalMethodsService.showTopCenter('登录查看更多消息！');
    } else {
      window.open(themeUrl, '_blank');
    }
  }
  jumptossfs(){
    console.log("123123")
    this.$Router.navigate(['../realtimeRebate'], {relativeTo: this.$ActivatedRoute});
  }
  // 火爆真人跳转
  jumptoGame(item, number) {
    this.$Router.navigate([item.gameUrl], { relativeTo: this.$ActivatedRoute });
    if (item.title === '开元棋牌') {
      this.$GlobalService.globalJavaResData.pokerGameIndexId = item.gameId;
    }
    if (item.title === 'MG电子厅') {
      console.log(item.gameId)
      this.$GlobalService.globalJavaResData.gameItemIndexId = item.gameId;
    }
    // this.$GlobalMethodsService.imgGamesGo(item, this.list, number, this.$Router, this.$ActivatedRoute);
  }

  // 点击首页热门游戏
  imgGamesGo(item, list, number) {
    if (list.subname === 'VG GAME') {
      this.$Router.navigate(['./chessCard'], {relativeTo: this.$ActivatedRoute});
      return;
    }
    if (list.subname === 'PY GAME') {
      this.$Router.navigate(['./fishing'], {relativeTo: this.$ActivatedRoute});
      this.$GlobalService.globalJavaResData.gameItemByIndexId = number+1;
      return;
    }
    if (list.subname === 'TY GAME') {
      this.$Router.navigate(['./sportst'], {relativeTo: this.$ActivatedRoute});
      this.$GlobalService.globalJavaResData.gameItemTyIndexId = item.gameId;
      return;
    }
    if (list.subname === 'CP GAME') {
      this.$Router.navigate(['./lotteryt'], {relativeTo: this.$ActivatedRoute});
      return;
    }
    this.$GlobalMethodsService.imgGamesGo(item, list, number, this.$Router, this.$ActivatedRoute);
  }

  // 全部进入游戏
  seektotal() {
    if (this.$GlobalService.globalQueryModel.userToken === null) {
      this.$GlobalMethodsService.showTopCenter('登录查看更多消息！');
    } else {
      window.open(this.imelemUrl + '&userToken=' + this.$GlobalService.globalQueryModel.userToken, '_blank');
    }
  }
  // 实时足球的全部跳转
  goTYgame() {
    if (this.$GlobalService.globalQueryModel.userToken === null) {
      this.$GlobalMethodsService.showTopCenter('登录查看更多消息！');
    } else {
      this.$Router.navigate(['../sports'], { relativeTo: this.$ActivatedRoute });
    }
  }

  // 实时足球的全部跳转
  goZxgame() {
    window.open('https://www.aisidianjing.com/', '_blank');
  }
}
