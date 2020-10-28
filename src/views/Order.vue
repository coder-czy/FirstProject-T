<template>
  <div class="order">
    <!-- 网络异常时的empty组件 -->
      <van-empty v-if="loading" :image="image" class="empty">
      <p v-if="refreshText" class="refresh">网络异常，请点击 <i @click="refreshRquest" class="rf">刷新</i> </p>
    </van-empty>
    <div v-else>
      <!-- 订餐头部 -->
      <TitleCpn />
      <div class="order-header-container">
      
        <div class="header-top">
          <div class="header-top-left">
            <p class="left-title"><span class="icon"></span>有一间公寓八栋</p>
            <p class="left-store">由<span class="store">卓悦中心ONE AVENUE店</span>配送</p>
          </div>
          <div class="header-top-right">
            <div class="switch" @click="changeType" >
              <span class="zq" :class="{active:!isWm}">自取</span>
              <span class="wm" :class="{active:isWm}">外卖</span>
              <span class="bg" :class="{active:isWm}"></span>
            </div>
          </div>
        </div>
        <div class="header-bottom">
          <span>“霸气mini卡"超级购券活动，赶紧去购买</span><van-icon name="arrow" class="arrow-icon"/>
        </div>
      </div>

      <!-- 订餐商品内容 -->
       <div class="goods-container">
         <!-- 左边菜单 -->
          <div class="goods-menu" ref="menu">
                <ul>
              <li class="menu-item" v-for="(g,index) in goods" :key="index" :class="{active:currentIndex===index}" @click="scrollToGoodItem(index)"> 
                <van-icon :badge="menuCount(g)">
              <span class="menu-item-text">{{g.name}}</span>
              </van-icon>
              </li>
            </ul>
          </div>
          <!-- 右边的商品列表 -->   
        <div class="goods-list" ref="goods">
            <ul >
              <div class="goods-swipe">

                <van-swipe  :autoplay="8000"  indicator-color="white">
                <van-swipe-item v-for="(i, index) in ads" :key="index" >
                  <img :src="i.image"/>
                </van-swipe-item>
              </van-swipe>
              </div>
              <div v-for="(item , index) in goods" :key="index"  ref="goodsList">
          
          <li class="list-item">
          <p class="item-name"> {{item.name}}<img :src="item.icon" class="name-icon"></p>
            </li>
          
          <ol>
            <li v-for="(g,i) in item.goods_list" :key="i" class="line"  @click="openGoodsDetail(g,item.id)">
              <!-- 商品 -->
              <GoodsListItem :goods="g" @add-count="addCount" @reduce-count="reduceCount"/>

            </li>
          </ol>      
              </div>
        </ul>
        </div>
      
       </div>
    
    <!-- 购物车 -->
    <ShopCart :goods="goods" @add-count="addCount" @reduce-count="reduceCount" @empty-list="emptyList"/>

                  <!-- 商品详情 -->
        <GoodsDetail :isShowDetail="isShowDetail"
         @close-detail="closeDetail"
          :detailFood="detailGoods"
          @add-count="addCount"
          :menuId="menuId"
          />

    </div>

  </div>
</template>

<script>
import TitleCpn from '../components/common/TitleCpn'
import GoodsListItem from '../components/common/GoodsListItem'
import ShopCart from '../components/order/ShopCart'
import GoodsDetail from '../components/order/GoodsDetail'

import BetterScroll from 'better-scroll'

export default {
  data() {
    return {
    goods:[],
    loading:false,
    image:'',
    refreshText:false,
    currentIndex:0,
    isWm:false,
    ads:[],
    isShowDetail:false,
    detailGoods:null,
    menuId:0
    }
  },
  computed: {
    shopCartCount(){
     
    },
    // 计算菜单里添加的数量
    menuCount(){
      return (g)=>{
      let {goods_list} = g
      let num = 0
      for(let i=0;i<goods_list.length;i++){
        if(goods_list[i]&&goods_list[i].count){
          num += goods_list[i].count
        }
        continue
      }
      return num || ''
      }
    }
  },
  components:{
    TitleCpn,
    GoodsListItem,
    ShopCart,
    GoodsDetail
  },
  created() {
   this.getGoodsData()
  },
  methods: {
      // 作商品的网络请求
     async getGoodsData(){
        this.startRequest()
        this.refreshText = false
        
        let res = await this.$axios('/api/goods')
        let res1 = await this.$axios('/api/ads')
        if(res.status===200&&res.data.code===1&&res1.status===200&&res1.data.code===1){
        
          this.goods = res.data.data
          this.ads = res1.data.data
          console.log(this.goods);
          console.log(this.ads);
          this.successRequest()
          this.initBetterScrol()
        }else{
          this.failRequest()
        }
   
  },
         startRequest(){
        this.$toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: '加载中...',
          })
        this.loading =true
        this.image = 'default'

  },
          successRequest(){
            this.$toast.clear()
          this.loading = false
          },
          failRequest(){
            this.$toast.clear()
              this.refreshText = true
            this.image = 'network'
          },
          refreshRquest(){
            if(this.timer){
              clearTimeout(this.timer)
            }

            this.timer = setTimeout(() => {
              this.timer = null
              this.getGoodsData()
            }, 300);
          },
          // 切换按钮
          changeType(){
            this.isWm = !this.isWm
            if(this.isWm){
              this.$router.push('/address')
            }
          },
          // 初始化better-scroll
          initBetterScrol(){
            this.$nextTick(()=>{

              if(!this.menuScroll){
          
                this.menuScroll = new BetterScroll(this.$refs.menu,{
                  click:true,
                  bounce:false
                })
              }else{
                this.menuScroll.refresh()
              }
              if(!this.goodsScroll){
                this.goodsScroll = new BetterScroll(this.$refs.goods,{
                  click:true,
                  bounce:false
                })
                this.goodsScroll.on('scrollEnd',this.scrollHandle)
              }else{
                this.goodsScroll.refresh()

              }
            })
          },
          scrollHandle({y}){
            // console.log(this.$refs.goodsList);
            y=Math.abs(y)
            for(let i=0;i<this.$refs.goodsList.length;i++){
              if(i===this.$refs.goodsList.length-1){
                this.currentIndex = i
                break
              }
              let top = this.$refs.goodsList[i].offsetTop
              let nextTop = this.$refs.goodsList[i+1].offsetTop

              if(y>=top&&y<nextTop){
                this.currentIndex = i
                break
              }
            }

          },
          // 点击菜单滚动到对应的商品区域
          scrollToGoodItem(i){
            this.goodsScroll.scrollToElement(this.$refs.goodsList[i],300)
            this.currentIndex = i
          },
          // 打开商品详情
          openGoodsDetail(goods,id){

            console.log(11);
            this.isShowDetail = true
            this.detailGoods = goods,
            this.menuId = id
          },
          // 关闭详情页
          closeDetail(){
            this.isShowDetail=false
          },
          // 将详情里的添加的数量添加到对应商品中
          addCount(val){
            for(let i=0;i<this.goods.length;i++){

              let {goods_list} = this.goods[i]
              let food = goods_list.find(f=>f.id===val.id)
  
              if(food&&!food.count){
                // 在对应商品中添加count属性
                this.$set(food,'count',val.num)
              }else if(food&&food.count){
                food.count+=val.num
              }
            }
            console.log(val);
          },
          // 减少商品
          reduceCount(g){
            let {id} = g
            for(let j=0;j<this.goods.length;j++){
              let {goods_list} = this.goods[j] 
              let f = goods_list.find(s=>s.id===id)
              if(f){

                f.count--
              }
              continue
            }

          },
            // 清空购物车
            emptyList(){
               this.goods.forEach(f => {
                f.goods_list.forEach((i)=>{
                if(i.count){
                  i.count =0
                }
              })
            });
            }

  },
  beforeDestroy() {
    this.menuScroll&&this.menuScroll.destory()
    this.goodsScroll&&this.goodsScroll.destory()
  },
  
}
</script>

<style lang="scss" scoped>
  .order{
    height: 100vh;
    position: relative;
    .empty{
      height: 100vh;
    }
    .rf{
      color: blue;
    }
  .order-header-container{
    background-color: #fefefe;
    .header-top{
      display: flex;
      padding: 20px 10px 15px 10px;
      align-items: center;

      .header-top-left{
        flex: 1;
        .left-title{
        font-size: 20px;
        color: #595a5c;
        font-weight: 800;
        margin-bottom: 10px;

        .icon{
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right:8px;
          background: url('../assets/images/order/location.png') center center no-repeat;
          background-size: contain;

        }
      }
      .left-store{
        color: #929294;
        font-size: 12px;

        .store{
          display: inline-block;
          color: #5b5b5d;
          margin: 0 8px;
        }

      }

      }
      .header-top-right{
        flex-basis: 112px;

        .switch{
          position: relative;
          width: 112px;
          height: 30px;
          line-height: 30px;
          color: #919193;
          font-size: 12px;
          border-radius: 30px;
          background: #f5f5f5;
          font-weight: 200;

          span{
            position: relative;
            display: inline-block;
            z-index: 10;
            
          }
          .zq{
            margin: 0 30px 0 18px;

            &.active{
              color: #fff;
            }
          }
          .wm{

             &.active{
              color: #fff;
            }
          }
          .bg{
            position: absolute;
            top: 0;
            left: 0;
            width: 60px;
            height: 30px;
            border-radius: 30px;
            background: #adb838;
            z-index: 1;
            transition: all .1s linear;

             &.active{
              top: 0;
              left: 52px;
            }
          }

        }
      }
      
    }
    .header-bottom{
      height: 35px;
      width: 100%;
      background-color: #e7e9ce;
      color: #adb838;
      font-size: 14px;
      line-height: 35px;
      padding: 0 15px ;

      .arrow-icon{
        float: right;
        margin-top: 9px;
      }
    }

  }

      .goods-container{
      display: flex;
      position: absolute;
      top: 158px;
      right: 0;
      bottom: 48px;
      left: 0;
      overflow: hidden;
    }

  .goods-menu{
    flex-basis: 98px;
    
    height: 100%;
    overflow: hidden;
 
    .menu-item{
      position: relative;
      display: table;
      padding: 10px 20px 10px 10px;
      height: 48px;
      width: 98px;
      font-size: 12px;
      font-weight: 200;
      line-height: 28px;
      background-color: #fefefe;
      color: #8e8f91;

      .van-info{
        background-color: #adb838;
      }

      .menu-item-text{
        width: 68px;
        display: table-cell;
        vertical-align: middle;
        

      }

    
     &.active{
      background-color: #f5f5f5;
      color:#5a5a5c;
      }
    }
    
  } 

  .goods-list{
    flex: 1;
    height: 100%;
    padding-right: 10px;
    overflow: hidden;
    .item-name{
      border-left: 2px solid #adb838;
      padding-left: 8px;
      background-color: #f5f5f5;
    }
    .van-swipe{
      overflow: hidden;
      width: 264px;
      margin: 10px 0 10px 10px;
   
      img{
        width: 264px;

      }
      .van-swipe-item{
        width: 100%;
      }
    }


    .list-item{
      position: relative;
      padding-left: 10px;
      font-size: 12px;
      color: rgb(147,153,159);
      line-height: 26px;
      background-color:#fefefe;
      
      
     .name-icon{
       width: 15px;
       height: 15px;
       vertical-align: middle;
       margin-left: 8px;
     }
    }
  }

  }
</style>