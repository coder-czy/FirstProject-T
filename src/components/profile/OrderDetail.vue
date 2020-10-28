<template>
  <div class="order-detail">
        <TitleCpn :title="'订单详情'" @left-click="comeBack">
                   <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
      <div class="detail-content">
          <div class="detial-status">
              {{detailData.status_text}}
          </div>
          <div class="store">{{detailData.multi_store}}</div>
          <div class="detial-goods">
              <h3 class="detail-title">商品明细</h3>
              <div class="goods-item" v-for="(item,index) in detailData.goods" :key="index">
                  <div class="goods-img">
                      <img :src="item.image" alt="">
                  </div>
                  <div class="goods-property">
                      <h2>{{item.name}}</h2>
                      <p>{{item.property}}</p>
                  </div>
                  <div class="item-right">
                      <span class="goods-number">x{{item.number}}</span>
                      <span class="goods-price">¥{{item.price}}</span>
                  </div>
              </div>
              <div class="total-price">总计：<span class="price"> ¥{{detailData.total_amount}}</span></div>
          </div>
          <div class="detial-msg">
              <h2 class="msg-title">订单信息</h2>
              <div class="msg-list">
                  <ul>
                      <li>
                          <span class="msg-name">订单号</span>
                          <span class="msg-val">{{detailData.order_no}}</span>
                        </li>
                      <li>
                          <span class="msg-name">下单时间</span>
                          <span class="msg-val">{{detailData.completed_time}}</span>
                        </li>
                      <li>
                          <span class="msg-name">支付方式</span>
                          <span class="msg-val">{{detailData.pay_mode}}</span>
                        </li>
                      <li>
                          <span class="msg-name">用餐方式</span>
                          <span class="msg-val">{{detailData.postscript}}</span>
                        </li>
                   
      
                  </ul>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
export default {
components:{
    TitleCpn
},
data() {
    return {
        detailData:null
    }
},
methods: {
    comeBack(){
    this.$router.go(-1)
},
    getDetailData(){
        this.detailData = this.$route.params
        console.log(this.detailData);
    }
},
created() {
    this.getDetailData()

},
}
</script>

<style lang="scss" scoped>
    .order-detail{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 60;
        background-color: #fff;

        .detail-content{
           position: absolute;
           top: 40px;
           left: 0;
           right: 0;
           bottom: 0;
           padding: 0 20px;
           overflow: scroll;

            .store{
                font-size: 16px;
                color: #333333;
                line-height: 30px;
            }
           .detial-status{
               height: 50px;
               line-height: 50px;
               color: #333333;
               font-size: 20px;
               font-weight: 600;
               border-bottom: 1px solid #f3f3f3;
           }

           
           .detial-goods{
                .detail-title{
                    margin: 20px 0 20px 0;
                }
               .goods-item{
                   display: flex;
                   margin-top: 10px;
                   border-bottom: 1px solid #f3f3f3;
                  .goods-img{
                      margin-right: 5px;
                       img{
                       width: 60px;
                   }
                  }
                .goods-property{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                   font-size: 12px;
                   h2{
                       color: #333333;
                   }
                   p{
                       color: #999999;
                   }
               }
               .item-right{
                   display: flex;
                   align-items: center;
                   flex-basis: 100px;

                   .goods-number{
                       flex: 1;
                       font-size: 12px;
                       color:#9d9d9d;
                   }
                   .goods-price{
                       flex: 1;
                       font-size: 14px;
                       color:#5f5f5f;


                   }
               }
               }
               .total-price{
                   line-height: 50px;
                   text-align: right;
                   font-size: 14px;
                   color: #333333;

                   .price{
                       font-size: 18px;
                   }
               }
               
           }
           .detial-msg{
               margin-top: 20px;
               .msg-title{
                 font-size: 16px;
                color: #333333;
                line-height: 30px;
                border-bottom: 1px solid #f3f3f3;
                
               }
               .msg-list{
                   margin-top: 20px;
                   ul{
                       li{
                           display: flex;
                           justify-content: space-between;
                           line-height: 40px;
                           font-size: 14px;
                           .msg-name{
                            color: #333333;
                           }
                           .msg-val{
                               color: #666666;
                           }
                       }
                   }
               }
           }

        }
    }
</style>