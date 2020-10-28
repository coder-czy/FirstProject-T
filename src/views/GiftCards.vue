<template>
  <div class="gift-cards">
      <TitleCpn :title="'礼品卡列表'" @left-click="comeBack">
           <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
     

      <van-tabs v-model="active" title-active-color="#abba11" color="#abba11" swipeable>
        <van-tab  :title="'购买礼品卡'">
        <div class="gift-content" v-if="giftData">
            <div class="gift-banner">
                <img :src="giftData.img" alt="" v-if="giftData&&giftData.img">
            </div>
           
            <div class="gift-category" v-for="item in giftData.category_list" :key="item.id">
                <h2 class="list-title">{{item.name}}</h2>
                <div class="item-stage">

                <div class="list-item"  v-for="(g, index) in item.themesList" :key="index">
                    <img :src="g.imageUrls" alt="" class="item-img">
                    <p class="item-name">{{g.activityName}}</p>
                </div>
                </div>
            </div>
           
        </div>
        </van-tab>
        <van-tab  :title="'我的礼品卡'">
        <Empty :word="'礼品卡'"/>
     </van-tab>
    </van-tabs>
     
  </div>
</template>

<script>
import TitleCpn from '../components/common/TitleCpn'
import Empty from '../components/common/Empty'
import {apiGiftCards} from '../network/api'
export default {
components:{
    TitleCpn,
    Empty
},
data() {
    return {
        active:0,
        giftData:null
    }
},
methods: {
    comeBack(){
        this.$router.go(-1)
    },
    // 获取数据
    getData(){
        apiGiftCards('/giftCards').then(res=>{
            this.giftData = res.data
            console.log(this.giftData);
        })
    },

},
created() {
    this.getData()
},
}
</script>
<style lang="scss" scoped>
    .gift-cards{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 35;
        background-color: #f5f8fa;

        .van-tab__pane{
            height: calc( 100vh - 84px );
            
        }
        .gift-content{
            width: 100%;
            height: 100%;
            overflow: scroll;

            .gift-banner{
                width: 100%;
                margin-bottom: 30px;
                img{
                    width: 100%;
                }

            }
            .gift-category{
                margin-bottom: 38px;

                .list-title{
                    font-size: 16px;
                    color: #484b4d;
                    font-weight: 700;
                    padding-left: 20px;
                    margin-bottom: 12px;
                }
                .item-stage{
                display: flex;
                flex-wrap: wrap;
                .list-item{
                    flex-basis: 44%;
                    // margin: 0 auto;
                    margin-left: 15px;
                    margin-bottom: 15px;
                    background-color: #fff;
                    box-shadow:-0.5px 12px 10px 0px #E8EEDF;
                    border-radius: 8px;


                    img{
                        width: 100%;
                        border-top-left-radius:8px;
                        border-top-right-radius:8px;
                    }
                    .item-name{
                        font-size: 14px;
                        color: #484b4d;
                        text-align: center;
                        margin: 8px 0;

                    }
                }
                }

            }
        }
    }
</style>