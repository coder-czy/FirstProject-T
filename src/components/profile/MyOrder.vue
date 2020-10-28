<template>
  <div class="myOrder">
        <TitleCpn :title="'历史订单'" @left-click="comeBack">
                   <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
    <div class="order-stage">
        <div class="order-item" v-for="item in orderData" :key="item.id">
            <div class="item-top">
                <span class="store-name">{{item.multi_store}}</span>
                <span class="status-text" @click="goOrderDetial(item)">{{item.status_text}} <span class="arrow icon-keyboard_arrow_right"></span></span>
            </div>
            <div class="item-center">
                <span class="cneter-img" v-for="(img,index) in item.goods" :key="index">
                    <img :src="img.image" alt="">
                </span>
            </div>
            <div class="item-bottom">
                <div class="bottom-top">
                <div class="time">

                <p class="completed-time"> <span>下单时间：</span> {{item.completed_time}}</p>
                <p class="completed-time"> <span>订单编号：</span> {{item.order_no}}</p>
                </div>
                <div class="price">
                    ¥ {{item.total_amount}}
                </div>

                </div>
                <div class="bottom-btn">
                    <span class="connection">联系商家</span>
                    <span class="evaluate">评价</span>
                </div>
            </div>
        </div>
    </div>
      <router-view></router-view>

  </div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
export default {
components:{
    TitleCpn
},data() {
    return {

    }
},
methods: {
    comeBack(){
        this.$router.go(-1)
    },
    // 请求订单数据

    goOrderDetial(val){ 
        this.$router.push({name:'OrderDetail',params:val})
    }
},
computed: {
    orderData(){
        return this.$store.state.order
    }
},
created() {
    console.log(this.orderData);
},
}
</script>

<style lang="scss" scoped>
$baseColor:#abba11;

    .myOrder{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 30;
        background-color: #f5f5f5;
        
        .order-stage{
            width: 100%;
            position: absolute;
            top: 40px;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 16px 10px;
            overflow: scroll;

            .order-item{
                padding: 0 15px;
                background-color: #fff;
                margin-bottom: 10px;
                border-radius: 4px;
                .item-top{
                    height: 50px;
                    line-height: 50px;
                    border-bottom: 1px solid #ebebeb;
                    .store-name{
                        font-size: 16px;
                        color: #333333;
                    }
                    .status-text{
                        float: right;
                        font-size: 14px;
                        color: #666666;
                    }
                      .arrow{
                             vertical-align: middle;
                         }
                }
                .item-center{
                    height: 70px;
                    padding: 10px 0;
                    border-bottom: 1px solid #f5f5f5;
                    .cneter-img{
                        margin-right:10px ;
                        img{
                            width: 60px;
                        }   
                    }
                }
                .item-bottom{
                   
                    height:120px ;
                    font-size: 12px;
                    .bottom-top{
                         display: flex;
                         padding: 15px 0;
                         height: 60px;
                       
                         
                    }
                    .time{
                        flex: 1;
                        color: #999999;
                        p{
                            margin-bottom: 4px;
                        }
                    }
                    .price{
                        flex-basis: 100px;
                        text-align: right;
                        line-height: 30px;
                        color: #4b4b4b;
                        font-size: 16px;
                    }
                    .bottom-btn{
                        display: flex;
                        justify-content: flex-end;
                        height: 60px;
                        padding: 15px 0;
                        font-size: 14px;
                        color: #fff;
                        .connection{
                            display: inline-block;
                            height:30px ;
                            line-height: 30px;
                            // border: 1px solid #979797;
                            background-color: $baseColor;
                            border-radius: 4px;
                            margin-right: 10px;
                            padding: 0 10px;


                        }
                        .evaluate{
                            display: inline-block;
                            height:30px ;
                            line-height: 30px;
                            padding: 0 10px;
                            // border: 1px solid #979797;
                            background-color: $baseColor;

                            border-radius: 4px;
                        }
                    }
                    
                }
            }
        }

    }
</style>