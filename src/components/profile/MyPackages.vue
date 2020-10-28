<template>
  <div class="packages">
       <TitleCpn :title="'我的卡卷'" @left-click="comeBack">
                   <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
      <div class="package-content">
        <div class="package-top">

          <div class="package-exchange">
              <div class="exchange-input">
                  <input type="text" placeholder="请输入兑换码">
              </div>
              <div class="exchange-btn">兑换</div>
          </div>
          <p class="package-rule">查看兑换规则</p>
        </div>
           <van-tabs v-model="active" title-active-color="#abba11" background="#f5f8fa" color="#abba11" swipeable>
        <van-tab  :title="'全部'">
            <div class="package-stage">
                <div class="package-item" @click="showDetail(item)" v-for="item in packageData" :key="item.id">
                    <div class="item-top">
                        <div class="item-img">
                            <img :src="item.imageUrl" alt="">
                        </div>
                        <div class="item-desc">
                            <h2>{{item.title}}</h2>
                            <p>有效期至{{item.beginAt}}</p>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <p>查看详情</p>
                    </div>
                </div>
            </div>
        </van-tab>
        <van-tab  :title="'茶饮卷'">
            <div class="package-stage">
                <div class="package-item" @click="showDetail(item)" v-for="item in getTypeOne" :key="item.id">
                    <div class="item-top">
                        <div class="item-img">
                            <img :src="item.imageUrl" alt="">
                        </div>
                        <div class="item-desc">
                            <h2>{{item.title}}</h2>
                            <p>有效期至{{item.beginAt}}</p>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <p>查看详情</p>
                    </div>
                </div>
            </div>

        </van-tab>
        <van-tab  :title="'酒屋卷'">
          <div class="package-stage"  v-if="getTypeTwo.length">
                <div class="package-item" @click="showDetail(item)" v-for="item in getTypeTwo" :key="item.id">
                    <div class="item-top">
                        <div class="item-img">
                            <img :src="item.imageUrl" alt="">
                        </div>
                        <div class="item-desc">
                            <h2>{{item.title}}</h2>
                            <p>有效期至{{item.beginAt}}</p>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <p>查看详情</p>
                    </div>
                </div>
            </div>
        </van-tab>
        <van-tab  :title="'零售卷'">
          <div class="package-stage"  v-if="getTypeThree.length">
                <div class="package-item" @click="showDetail(item)" v-for="item in getTypeThree" :key="item.id">
                    <div class="item-top">
                        <div class="item-img">
                            <img :src="item.imageUrl" alt="">
                        </div>
                        <div class="item-desc">
                            <h2>{{item.title}}</h2>
                            <p>有效期至{{item.beginAt}}</p>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <p>查看详情</p>
                    </div>
                </div>
        </div>
        <div class="package-empty" v-else>
            <img src="../../assets/images/empty.png" alt="">
            <p>您暂时还没有卷哦~</p>
        </div>
        </van-tab>
    </van-tabs>
      </div>
     
      <div class="cover-detial"  v-if="isShowDetail" @click="closeDetail">
          <div class="detail-content" @click.stop="">
              <h2 class="detail-title">{{detailData.title}}</h2>
              <p class="user-time">有效期：{{detailData.beginAt}}至{{detailData.endAt}}</p>
              <div class="text" v-html="detailData.couponExplain"></div>
              <div class="use-btn" @click="goOrder">立即使用</div>
          </div>
          <div class="close icon-close" @click="closeDetail"></div>
      </div>
  </div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
import {apiCustomerCoupons} from '../../network/api'
export default {
    data() {
        return {
            active:0,
            packageData:null,
            isShowDetail:false,
            detailData:null

        }
    },
    computed: {
        getTypeOne(){
            return this.packageData&&this.packageData.filter(item=> item.couponType===1) ||[]
        },
        getTypeTwo(){
            return this.packageData&&this.packageData.filter(item=> item.couponType===2) ||[]
        },
        getTypeThree(){
            return this.packageData&&this.packageData.filter(item=> item.couponType===3) ||[]
        }
    },
methods: {
    comeBack(){
        this.$router.go(-1)
    },
    closeDetail(){
        this.isShowDetail = false
    },
    showDetail(val){
        this.isShowDetail = true
        this.detailData =val
    },
    goOrder(){
        this.$router.push('/order')
    },
    // 请求我的卡卷数据
    getData(){
        apiCustomerCoupons().then(res=>{
            this.packageData = res.data
        })
    }
//    async getPackageData(){
//         let res =await this.$axios('/api/customerCoupons')
//         if(res.status ===200&&res.data.code===1){
//             this.packageData = res.data.data
//             console.log(this.packageData);
//         }else{
//             console.log('网络出！！');
//         }
//     }

},
components:{
    TitleCpn
},
created() {
    this.getData()
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
                
                bottom: 150px;
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
                    margin-bottom: 15px;
                }

                .use-btn{
                    height: 50px;
                    background-color: $baseColor;
                    color: #fff;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 50px;
                    text-align: center;
                    border-radius: 50px;
                    margin-top: 10px;

                }

                .user-time{
                    font-size: 12px;
                    text-align: center;
                    margin-bottom:20px ;
                    color: #7b7d7f;
                }
                .text{
                    font-size: 14px;
                    color: #b0b0b0;
                    line-height: 20px;

                }
            }

            .close{
                position: absolute;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 30px;
                color:#fff;
                font-size: 27px;
                line-height: 30px;
                text-align: center;
                border-radius: 50%;
                border: 2px solid #fff;
            }

        }

        .package-content{
            position: relative;
            .package-stage{
                position: fixed;
                top: 214px;
                left: 0;
                right: 0;
                bottom: 0;
                overflow: scroll;
                padding: 10px 20px;
                .package-item{
                    background-color: #fff;
                    margin-bottom: 15px;
                    box-shadow: -0.5px 12px 10px 0px #E8EEDF;

                    .item-top{
                        padding: 30px 50px 30px 30px;
                        display: flex;
                        border-bottom: 1px solid #fcfdfd;
                        .item-img{
                            margin-right: 30px;
                            img{
                                width: 60px;
                                border-radius: 2px;
                            }
                        }
                        .item-desc{
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            width: 170px;
                            h2{
                                font-size: 18px;
                                color:#484b4d;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-weight: 500;
                            }
                            p{
                                font-size: 12px;
                                color: #7f8284;
                            }
                        }
                    }
                    .item-bottom{
                        height: 40px;
                        line-height: 40px;
                        text-align: right;
                        color: $baseColor;
                        font-size: 12px;
                        padding-right: 40px;
                    }
                }
            }
            .package-top{
             padding-top: 15px;
                background-color: #fff;
                margin-bottom: 20px;
                .package-rule{
                    text-align: center;
                    color: $baseColor;
                    font-size: 12px;
                    line-height: 50px;
                    
                }
            }
            .package-empty{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                position: fixed;
                top: 214px;
                left: 0;
                right: 0;
                bottom: 0;

                img{
                    width: 200px;
                }
                p{
                    color: #787a7d;
                }
            }
            .package-exchange{
                display: flex;
                height: 40px;
                overflow: hidden;
                padding: 0 55px;
                

            .exchange-input{
                flex: 1;
                border: 1px solid #e5e5e5;
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;

                input{
                    padding-left: 10px;
                    width: 100%;
                    height: 100%;
                    border: none;
                    font-size: 12px;
                    color: #999999;


                }

            }
            .exchange-btn{
                flex-basis: 70px;
                background-color: $baseColor;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
                font-size: 18px;
                line-height: 40px;
                text-align: center;
                font-weight: 700;
                color: #fff;
            }

            }
        }
    }
</style>