<template>
  <div class="mallDetail">
      <TitleCpn :title="'兑换商品详情'" @left-click="comeBack">
                   <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
      <div class="detail-stage">
          <div class="detail-img">
              <span class="detail-icon"></span>
              <img :src="detailData.img[0]" alt="" v-if="detailData.img.length">
              <img src="../../assets/images/emptyMall.jpg" alt="" v-else>
          </div>
          <div class="detail-rule">

          <div class="detail-price"><span class="price">{{detailData.points_price}}</span>积分</div>
          <div ><h2 class="goods-name title-name">{{detailData.goods_name}}</h2>
           <span class="detail-num">剩余<span class="num">{{detailData.exchanged_num}}</span>份</span>
           </div>
          <h2 class="title-name">兑换须知</h2>
          <div class="goods-rule" v-html="detailData.exchange_desc"></div>
           <h2 class="title-name">使用须知</h2>
           <p class="use-limit">使用限制：<span class="limit">{{detailData.exchange_num_desc}}</span></p>
          </div>

      </div>
      <div class="detail-bottom">
          <div class="bottom-btn">积分不足</div>
          
      </div>
  </div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
export default {
data() {
    return {
        detailData:null
    }
},
methods: {
    getDetailData(){
        this.detailData = this.$route.params
        console.log(this.detailData);
    },
    comeBack(){
        this.$router.go(-1)
    }
},
components:{
    TitleCpn
},
created() {
    this.getDetailData()
},
}
</script>

<style lang="scss" scoped>
$baseColor:#abba11;
    .mallDetail{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 86px;
        z-index: 40;
        background-color: #fff;

        .detail-stage{
            width: 100%;
            height: 100%;
            overflow: auto;
            padding-bottom: 40px;
            .detail-img{
                position: relative;
                    width: 100%;

                img{
                    width: 100%;
                }

                .detail-icon{
                    display: inline-block;
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    width: 50px;
                    height: 50px;
                    background: url('../../assets/images/services/gynx.png') center center no-repeat;
                    background-size: contain;
                }
            }
            .detail-rule{
                margin-top: 50px;
            padding:0 40px 0 20px ;
            .detail-price{
                color: #808284;
                font-size: 12px;
                margin-bottom:60px ;
                .price{
                    color: $baseColor;
                    font-size: 20px;
                    margin-right: 4px;
                }
            }
            
            .title-name{
                font-size: 16px;
                color:#484b4d ;
                font-weight: 700;
                margin-bottom:15px;

            }
            .detail-num{
                font-size: 12px;
                color: #808284;
                float: right;

                .num{
                    color: $baseColor;
                    margin: 0 4px;

                }
            }
            .goods-rule{
                font-size: 12px;
                color: #707275;
                line-height: 16px;
                margin-bottom: 20px;
            }

            .use-limit{
                color: #707275;
                font-size: 12px;

                .limit{
                    color:#484b4d ;
                    font-size: 14px;
                    font-weight: 700;


                }
            }
            }
        }
       
       .detail-bottom{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 86px;
        padding: 18px 16px;
        background-color: #fff;

        .bottom-btn{
            height: 50px;
            background-color: #d5dd88;
            font-size: 20px;
            color: #fff;
            border-radius: 50px;
            line-height: 50px;
            text-align: center;
            font-weight: 700;
        }
       }

        
    }
</style>