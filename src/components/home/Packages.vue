<template>
  <div class="packages">
       <TitleCpn :title="'购买卷包'" @left-click="comeBack">
                   <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
      <div class="package-content">

           <van-tabs v-model="active" title-active-color="#abba11" background="#f5f8fa" color="#abba11" swipeable>
        <van-tab  v-for="item in packageData" :key="item.id" :title="item.title" >
            <div class="package-img">
                <img :src="item.image" alt="">
            </div>
            <div class="package-decs">
                <h2 class="title">{{item.title}}</h2>
            </div>
            <div class="package-coupons">
                <div class="coupons-item" @click="showDetail(c.detail)" v-for="c in item.coupons" :key="c.coupon_id">
                    <img :src="c.detail.image" class="item-img">
                    <div class="coupons-detial">

                    <p class="item-name">{{c.detail.coupon_title}}</p>
                    <span class="coupons-num">x{{c.coupon_num}}</span>
                    </div>
                </div>
            </div>
            <div class="coupons-content">
              <h2>购买须知</h2>
                <p>{{item.content}}</p>
            </div>
        </van-tab>
      
        </van-tabs>
      </div>
      <div class="package-bottom">
          <div class="package-rule">
              <p><span class="radio" @click="toggleChecked" :class="{active:isChecked}"></span>阅读并同意 <span class="rule">《付费卷包协议》</span></p>
          </div>
          <div class="bottom-btn">
              <div class="price">合计<span class="money">¥ {{packagePrice}}</span></div>
              <div class="buy-btn">购买</div>
          </div>
      </div>
      

      <div class="cover-detial"  v-if="isShowDetail" @click="closeDetail">
          <div class="detail-content">
              <h2 class="detail-title">{{detailData.title}}</h2>
              <p class="user-time">{{detailData.expire}}</p>
              <p>{{detailData.explain_text}}</p>
          </div>
          <div class="close icon-close" @click="closeDetail"></div>
      </div>

  </div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
import {apiPackages} from '../../network/api'
export default {
    data() {
        return {
            active:0,
            packageData:null,
            isChecked:false,
            detailData:null,
            isShowDetail:false

        }
    },
    computed: {
        packagePrice(){
            return this.packageData&&this.packageData[this.active].amount
        }
    },
methods: {
    comeBack(){
        this.$router.go(-1)
    },
    toggleChecked(){
        this.isChecked = !this.isChecked
    },
    // 请求卡卷数据
    getOrderData(){
        apiPackages('/packages').then(res=>{
            this.packageData = res.data
        })
    },

    showDetail(val){
        this.detailData = val
        this.isShowDetail = true

    },
    closeDetail(){
        this.isShowDetail = false
    },
    
},
components:{
    TitleCpn
},
created() {
    this.getOrderData()
},
}
</script>

<style lang="scss" scoped>
    $baseColor:#abba11;
    .packages{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 35;
        background-color: #f5f8fa;

        .package-content{
            background-color: #f5f8fa;
            position: absolute;
            top: 40px;
            bottom: 92px;
            left: 0;
            right: 0;
            overflow: scroll;
            .package-img{
                padding-top: 20px ;
                img{
                    width: 90vw;
                    border-radius: 8px;
                    // text-align: center;
                    margin: 0 5vw;

                }
            }
            .package-decs{
                margin-top: 20px;
                .title{
                    font-size: 16px;
                    font-weight: 900;
                    color: #333333;
                    text-align: center;
                }
            }
            .package-coupons{
                background-color: #fff;
                margin: 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                border-radius: 4px;
                box-shadow: -0.5px 12px 10px 0px #E8EEDF ;


                .coupons-item{
                    flex-basis: 33.33%;
                    text-align: center;
                    padding: 20px 10px;
                    // margin-bottom: 20px;
                    .item-img{
                        width: 100%;

                        border-radius: 8px;
                        margin-bottom: 15px;
                    }
                    .coupons-detial{
                        display: flex;

                    .item-name{
                        font-size: 12px;
                        color:#7f8284 ;
                        flex-basis: 60px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                    
                    }
                    .coupons-num{
                        flex: 1;
                        font-size: 12px;
                        color: $baseColor;
                        line-height: 20px;
                        text-align: right;
                    }
                    }
                }

            }
            .coupons-content{
                font-size: 12px;
                padding: 20px;
                color: #707375;
                h2{
                    color: #333333;
                    font-weight: 700;
                    line-height: 30px;
                }
                p{
                    line-height: 20px;
                }
            }
        }
        .cover-detial{
            position: fixed;
            top: 40px;
            right: 0;
            left: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.4);
            z-index: 20;

            .detail-content{
                position: absolute;
                height: 320px;
                bottom: 200px;
                left: 22px;
                right: 22px;
                background-color: #fff;
                padding: 35px 20px 15px 20px;
                border-radius: 8px;

                .detail-title{
                    font-size: 18px;
                    color: #484b4d;
                    font-weight: 600;
                    text-align: center;
                    margin-bottom: 4px;
                }

                .user-time{
                    font-size: 14px;
                    text-align: center;
                    margin-bottom:15px ;
                }
                p{
                    font-size: 14px;
                    color: #b0b0b0;
                    line-height: 20px;

                }
            }

            .close{
                position: absolute;
                bottom: 160px;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 30px;
                color:#fff;
                font-size: 24px;
                line-height: 30px;
                text-align: center;
                border-radius: 50%;
                border: 2px solid #fff;
            }

        }
        .package-bottom{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 92px;
            background-color: #fff;

            .package-rule{
                height: 32px;
                line-height: 32px;
                padding:0 20px;
                border: 1px solid #eeeeee;
                 font-size: 12px;

                .rule{
                    color: $baseColor;
                }
                .radio{
                    display: inline-block;
                    vertical-align: middle;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    border: 1px solid #c4c9cc;
                    margin-right: 6px;
                   

                    &.active{
                        background: url('../../assets/images/success.png') center center no-repeat;
                        background-size: contain;
                    }
                }

            }
            .bottom-btn{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 60px;
                line-height: 60px;
                background-color: #fff;
                .price{
                    flex: 1;
                    height: 100%;
                    padding-left: 20px;
                    color: #7a7d7f;
                    font-size: 12px;

                    .money{
                        color: #4f5253;
                        font-size: 14px;
                        margin-left: 4px;
                    }
                }
                .buy-btn{
                    flex-basis: 110px;
                    background-color: $baseColor;
                    height: 100%;
                    text-align: center;
                    color: #fff;
                    font-size: 18px;
                    font-weight: 700;

                }
            }

        }
    }
</style>