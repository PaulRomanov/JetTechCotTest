import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import {SelectItem} from 'primeng/api';
import {GlobalService} from '../../../../../core-module/common-util/global-service';
import {CommonDataService} from '../../../../../core-module/common-util/common-data.service';
import {Result} from '../../../../../core-module/common-util/result';
import {GlobalMethodsService} from '../../../../../core-module/common-methods/global-methods.service';
import {city} from './city.js';
import { EventBusService } from '../../../../../core-module/event-bus/event-bus';
@Component({
  selector: 'app-mall-index',
  templateUrl: './mall-index.component.html',
  styleUrls: ['./mall-index.component.scss']
})
export class MallIndexComponent implements OnInit {

  showModal: boolean = false
  max = 1
  isUserToken = false
  constructor(
    public $GlobalService: GlobalService,
    private $CommonDataService: CommonDataService,
    private $GlobalMethodsService: GlobalMethodsService,
    private $EventBusService:EventBusService
  ) {
    if (this.$GlobalService.globalQueryModel.userToken || this.$GlobalService.globalQueryModel.swToken) {
      this.isUserToken = true;
    }
   }
  bestGoodsList = []
  detailAddress = ''
  hotGoodsList = []
  goodsDetail: GoodDetail = new GoodDetail()
  nzOptions: any[] | null = null;
  values: any[] | null = null;
  // 分页
  pageData = new PageData()
  rectCurrentPage = 1
  isQueryLoading = false
  detailLoading = false
  sumitLoading = false
  pageSize: SelectItem[] = [
    {label: '显示5条', value: {id: 5, name: '显示5条'}},
    {label: '显示10条', value: {id: 10, name: '显示10条'}},
    {label: '显示20条', value: {id: 20, name: '显示20条'}}
  ];
  selectedPageSize: any
  
  ngOnInit() {
    setTimeout(() => {
      this.nzOptions = city;
      this.addCityValue(this.nzOptions)
    }, 100);
    this.getBestGoods()
    this.getHotGoods()
  }
  addCityValue(arr){
    for(let i = 0; i <arr.length; i++){
      arr[i].value = arr[i].label
      if(arr[i].children){
        this.addCityValue(arr[i].children)
      }else{
        arr[i].isLeaf = true
      }
    }
  }
  getBestGoods(){
    this.$CommonDataService.scroeMallBestGoods().then((res: Result) => {
      if(res.success == 0){
        this.bestGoodsList = res.data
        this.initSwiper('.swiper-container')
      }
    })
  }
  getHotGoods(){
    this.$CommonDataService.scroeMallHotGoods().then((res: Result) => {
      if(res.success == 0){
        this.hotGoodsList = res.data.rows
        this.pageData.total = res.data.totalPage
      }
    })
  }
  getGoodsDetail(id){
    if(!this.isUserToken){
      this.$GlobalMethodsService.loginOPenWindow();
      return
    }
    this.showModal = true
    this.detailLoading = true
    this.$GlobalService.globalQueryModel.productDetail.productId = id
    this.$GlobalService.globalQueryModel.createOrder.productId = id
    this.$CommonDataService.scroeMallProductDetail().then((res: Result) => {
      this.detailLoading = false
      if(res.success == 0){
        this.values = []
        this.$GlobalService.globalQueryModel.createOrder.addressee = ''
        this.$GlobalService.globalQueryModel.createOrder.phoneno = ''
        this.detailAddress = ''
        this.goodsDetail = res.data
        this.max = Math.floor(this.goodsDetail.userScore / parseInt(this.goodsDetail.score))
        this.$GlobalService.globalQueryModel.createOrder.serial = res.data.serial
        this.initSwiper('.swiper-container1')
      }
    })
  }
  createOrder(){
    if(this.max == 0){
      this.$GlobalMethodsService.showTopCenter('积分不足');
      return
    }
    if(!this.$GlobalService.globalQueryModel.createOrder.addressee || !this.$GlobalService.globalQueryModel.createOrder.phoneno || !this.detailAddress || this.values.length == 0 || !this.$GlobalService.globalQueryModel.createOrder.amount){
      return
    }
    // if(!/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.$GlobalService.globalQueryModel.createOrder.phoneno)){
    //   this.$GlobalMethodsService.showTopCenter('请输入正确的手机号');
    //   return
    // }
    this.detailLoading = true
    this.$CommonDataService.scroeMallCreateOrder().then((res: Result) => {
      this.detailLoading = false
      if(res.success == 0){
        this.$GlobalMethodsService.showTopCenter(res.msg);
        this.showModal = false
        this.$EventBusService.eventBus.next('refresh_score')
      }
    })
  }
  initSwiper(container){
    setTimeout(() => {
      new Swiper(container, {
        loop: false,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        // 滚动条
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
          bulletElement : 'div',
          bulletActiveClass: 'indicator_active'
        },
        // 左右按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        // fadeEffect: {
        //   crossFade: true,
        // }
        watchSlidesProgress: true,
      });
    })
  }
  onChanges(values: any): void {
    this.$GlobalService.globalQueryModel.createOrder.address = values.join('') + this.detailAddress
  }
  detailChange(){
    this.$GlobalService.globalQueryModel.createOrder.address = this.values.join('') + this.detailAddress
  }
  // 分页逻辑
  addCurrentPage(page, type?) {
    if (this.pageData.goPage > this.pageData.total) {
      this.$GlobalMethodsService.showTopCenter('目标页面超过总页数，请重新输入');
      this.pageData.goPage = null;
      return;
    }
    if (type === 0 && !this.pageData.goPage) {
      this.$GlobalMethodsService.showTopCenter('请输入要跳转的页面');
      return;
    }
    this.pageData.currentPage = parseInt(page, 10) ? parseInt(page, 10) : 1;
    if(this.pageData.currentPage == this.$GlobalService.globalQueryModel.hotGoodsList.page) return
    this.$GlobalService.globalQueryModel.hotGoodsList.page = this.pageData.currentPage;
    this.getHotGoods();
  }
}

class GoodDetail {
  id: number;
  category: string;
  name: string;
  images: string[];
  value: string;
  userScore: number;
  score: string;
  orderno: number;
  desc: string;
  serial: string
}
class PageData {
  goPage: any; // 输入框的页数
  currentPage: any = 1; // 当前页数
  total: any; // 总页数
}