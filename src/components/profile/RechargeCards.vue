<template>
  <div class="rechargeCards">
        <TitleCpn :title="'会员存储'" @left-click="comeBack">
                   <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
        <div class="rechargeCards-content">
            <div class="content-top">
                <p>账号余额（元）</p>
                <div class="money">0.00</div>
                <div class="top-bg"></div>
            </div>
            <div class="rechargeCards-stage">
                <div class="recharge-item" v-for="(item,index) in rechargeCardsData" :key="item.id"
                 :class="{active:index===currentIndex}" @click="toggleIndex(index)">
                    <img :src="item.full_image" class="item-img">
                    <p class="item-value"> <span class="item-price">{{item.value}}</span> 元</p>
                </div>
            </div>
            <div class="rechargeCards-desc">
                <h2 class="desc-title">使用说明</h2>
                {{getDesc}}
            </div>
        </div>
        <div class="rechargeCards-bottom">
          <div class="rechargeCards-rule">
              <p><span class="radio" @click="toggleChecked" :class="{active:isChecked}"></span>阅读并同意 <span class="rule">《奈雪会员存储协议》</span></p>
          </div>
          <div class="bottom-btn">
             
              <div class="buy-btn">立即储值</div>
          </div>
      </div>
  </div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
import {apiRechargeCards} from '../../network/api'
export default {
components:{
    TitleCpn
},
data() {
    return {
        isChecked:false,
        rechargeCardsData:null,
        currentIndex:0,
       
    }
},
computed: {
    getDesc(){
        return this.rechargeCardsData&&this.rechargeCardsData[this.currentIndex].desc
    }
},
methods: {
    toggleChecked(){
        this.isChecked = !this.isChecked
    },
    toggleIndex(i){
        this.currentIndex = i
        
    },
    comeBack(){
        this.$router.go(-1)
    },
    // 请求充值金额的数据
    getData(){
        apiRechargeCards().then(res=>{
            this.rechargeCardsData = res.data
        })
    }

},
created() {
    this.getData()
},
}
</script>

<style lang="scss" scoped>
$baseColor:#abba11;
    .rechargeCards{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 35;
        background-color: #f5f8fa;

        .rechargeCards-content{
            position: absolute;
            top: 40px;
            left: 0;
            right: 0;
            bottom: 92px;
            overflow: scroll;
            background-color: #fff;
            .content-top{
                position: relative;
               &:after{
                   content: '';
                   display: block;
                   clear: both;
               }
            .top-bg{
      
                width: 100%;
                height: 200px;
                background:url('../../assets/images/mine/bg.jpg') center center no-repeat;
                background-size: cover;
                filter: blur(2px);
            }
            p{
                position: absolute;
                top: 50px;
                left: 20px;
                z-index: 10;
                color: #fff;

            }
            .money{
                color: #fff;
                 position: absolute;
                z-index: 10;
                top: 80px;
                left: 20px;
                font-size: 40px;
                font-weight: 600;
            }
            }

            .rechargeCards-stage{                                                                                                                                                       
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;
                margin-top: 20px;

                .recharge-item{
                    padding: 15px 0;
                    background-color: #f5f5f5;
                    flex-basis: 40%;
                    height: 150px;
                    text-align: center;
                    padding: 25px 10px;
                    border-radius: 8px;
                    font-size: 16px;
                    margin-bottom: 10px;
                    .item-img{
                        width: 50px;
                        height: 50px;
                    }
                    p{
                        height: 36px;
                         line-height: 36px;
                    }
               .item-price{

                    font-size: 25px;
                   
               }
                .item-value{
                      margin-top: 10px;
                }
                &.active{
                    color: #facb4e ;
                    border: 1px solid #facb4e;
                    box-sizing: border-box;
                    .item-price{
                    font-size: 28px;

                    }

                }
                }

            }
            .rechargeCards-desc{

                .desc-title{
                    font-size: 16px;
                    color: #484b4d;
                    line-height: 30px;
                }
                padding: 20px;
                color: #707275;
                font-size: 12px;
                line-height: 16px;
            }
        }

        .rechargeCards-bottom{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 92px;
            background-color: #fff;

            .rechargeCards-rule{
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
               
                justify-content: center;
                align-items: center;
                height: 60px;
                background-color: #fff;
                padding: 5px 10px;
                
                .buy-btn{
                    
                    background-color: $baseColor;
                    height: 100%;
                    text-align: center;
                    color: #fff;
                    font-size: 18px;
                    line-height: 50px;
                    font-weight: 700;
                    border-radius: 50px;

                }
            }

        }
    }
</style>