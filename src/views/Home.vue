<template>

  <div class="home">

     <!-- 首页背景 -->
     <div class="banner">
         <img src="https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" alt="轮播图图片">
         <div class="banner-text">

         <p class="text-title">你好，{{memberData.nickname || '游客'}}</p>
         <p>一杯奶茶，一口软欧包，在奈雪遇见美好</p>
    </div>
         <div class="container">

             <!-- 自取和外卖模块 -->
             <div class="take-type">
                 <div class="zq" @click="goOrder">
                     <img src="../assets/images/index/zq.png" alt="">
                     <span>自取</span>
                     <p class="take-tip">预约点单，到店自取</p>
                 </div>
                 <div class="wm" @click="goAddress">
                     <img src="../assets/images/index/wm.png" alt="">
                        <span>外卖</span>
                     <p class="take-tip">外卖下单，快速送达</p>

                 </div>
             </div>

             <!-- 会员商城 -->
             <div class="member-content">
                 <div class="member-left" @click="goAttendance">

                 <p>我的积分<span class="member-count">{{memberData.pointNum}}</span></p>
                 <span class="member-gift">进入积分商城兑换奈雪卷及周边好礼<van-icon name="arrow" /></span>
                 </div>
                 <div class="member-right" @click="goMemberCode">
                     <img src="../assets/images/index/qrcode.png" alt="会员码">
                     <p>会员码</p>
        
                 </div>
             </div>

            <div class="mall-content">
                <div class="mall-left"> 
                    <p class="mall-left-title"><span><img src="../assets/images/index/csc.png" alt=""></span>奈雪的茶商城</p>
                    <p>优质茶礼盒，网红零食</p>
                    <img class="mall-left-img" src="../assets/images/index/yzclh.png" alt="">
                </div>
                <div class="mall-right">
                    <div class="tea-sell"  @click="goRechargeCards">
                        <p><span class="sell-icon icon"></span>储值有礼</p>
                        <img src="../assets/images/index/mcsb_bg.png" class="mall-right-bg">
                    </div>
                    <div class="member-packet" @click="goPackages">
                        <p><span class="packet-icon icon"></span>会员卷包</p>
                        <img src="../assets/images/index/hyjb_bg.png" class="mall-right-bg">

                    </div>
                 </div>

            </div>
         </div>
     </div>
  </div>

</template>

<script>
import {apiMember,apiAddresses} from '../network/api'
import {mapMutations} from 'vuex'
import {SET_MEMBER,SET_ADDRESSES} from '../store/mutations/mutation-types'
export default {
    data() {
        return {
            goods:null,
            loading:true,
            

        }
    },
    computed: {
        memberData(){
            return this.$store.state.member
        }
    },
    methods: {
        ...mapMutations([SET_MEMBER,SET_ADDRESSES]),
    goOrder(){
        this.$router.push('/order')
    },
    goAddress(){
        this.$router.push('/address')
    },
    goAttendance(){
        this.$router.push('/attendance')
    },
    goPackages(){
        this.$router.push('/packages')
        console.log(11);
    },
    goMemberCode(){
        this.$router.push('/memberCode')
    },
    goRechargeCards(){
        this.$router.push('/rechargeCards')

    },
    getData(){
        // 获取会员数据  存储在vuex
        apiMember('/member').then(res=>{
            console.log(res);
            this.SET_MEMBER(res.data)
        })
        // 获取地址数据
        apiAddresses('/addresses').then(res=>{
            console.log(res);
            this.SET_ADDRESSES(res.data)
        })
    }

    },
    created() {
    this.getData()
    },

}
</script>

<style lang="scss" scoped>
    .home{
        width: 100%;
            position: relative;
            background-color:#f5f8fa;
        .banner{
            width: 100%;
            img{
                width: 100%;
                // vertical-align: top;
            }
            .banner-text{
                position: absolute;
                top: 50px;
                left: 20px;
                color: #fff;
                font-size: 12px;
                font-weight: 200;

                .text-title{
                    font-size: 15px;
                    font-weight: 400;
                    margin-bottom: 12px;
                }
            }
        }
        .container{
            position: absolute;
            top: 235px;
            left: 0;
            padding: 0 20px ;
            width: 100%;

            .take-type{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 200px;
                border-radius: 6px;
                background-color:#fefefe ;
                box-shadow: -0.5px 12px 10px 0px #E8EEDF ;
                .zq{
                    border-right: 1px solid #ebeaea;
                }
                .zq,.wm{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 17px;
                    font-weight: 700;
                    color: #484b4d ;
                    .take-tip{
                        font-size: 12px;
                        color: #aaadb1;
                        font-weight: normal;
                        margin-top: 10px;
                    }
                    img{
                        width: 60px;
                        margin-bottom: 14px;
                    }
                }
            }
        }
        .member-content{
            height: 80px;
            width: 100%;
             border-radius: 6px;
            background-color:#fefefe ;
            box-shadow: -0.5px 12px 10px 0px #E8EEDF;
            margin-top: 14px;
            padding: 20px 12px 18px 12px;
            display: flex;



            .member-left{
                flex: 1;
               
               p{
                   color: #818182 ;
                   font-size: 14px;
                   line-height: 20px;
                   margin-bottom: 10px;
               }
               .member-count{
                   display: inline-block;
                   color: #000;
                   font-size: 20px;
                   vertical-align: top;
                   font-weight: 600;
                   margin-left: 4px;
               }
               .member-gift{
                   display: inline-block;
                   color: #b1b1b3 ;
                   font-size: 10px;
               }
            }
            .member-right{
                flex-basis: 42px;

                img{
                    width: 22px;
                    margin-left: 10px;
                }
                p{
                    font-size: 10px;
                    text-align: center;
                    color: #aab551;
                }
            }
        }

        .mall-content{
            display: flex;
            border-radius: 6px;
            background-color:#fefefe ;
            box-shadow: -0.5px 12px 10px 0px #E8EEDF;
            margin: 14px 0 60px 0;
            padding: 10px;
            height: 154px;
            

            .mall-left{
                position: relative;
                flex: 1;
                background-color: #f2f2e7 ;
                margin-right: 10px;
                padding: 20px 0 0 10px;

                p{
                        font-size: 10px;
                        color: #bab9b5 ;
                    }
                .mall-left-title{
                    font-size: 12px;   
                    line-height: 12px; 
                    color: #6c6c6a;
                    font-weight: 600;
                    margin-bottom: 6px;
                    img{
                        width: 10px;
                        vertical-align: top;
                        margin-right: 4px;
                        

                    }
                    
                }
            .mall-left-img{
                    position: absolute;
                    bottom: 0;
                    right: 30px;
                    width: 80px;
                    
                }
            }

            .mall-right{
               
                display: flex;
                flex-direction: column;
                flex: 1;
                font-size: 12px;
                color: #5e5c5d;
                font-weight: 600;

                .mall-right-bg{
                    width: 40%;
                    position: absolute;
                    z-index: 1;
                    right: 0;
                    bottom: 0;

                }
                .tea-sell{
                    display: flex;
                     position: relative;
                    flex: 1;
                    background-color: #fdf3f1;
                    margin-bottom: 10px;

                    // background: url('../assets/images/index/mcsb_bg.png')no-repeat center right ;

                    p{
                        display: block;
                        margin: auto;
                        vertical-align: middle;
                        margin-right: 65px;
                    }
                    .sell-icon{
                        background: url('../assets/images/index/mcsb.png') center center no-repeat;
                        background-size: 130%;
                    }
                }
                .icon{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin-right: 10px;
                    vertical-align: middle;


                }

                .member-packet{
                    display: flex; 
                    position: relative;
                    flex: 1;
                    background-color: #fcf6d5;
                    
                      p{
                        display: block;
                        margin: auto;
                        vertical-align: middle;
                        margin-right: 65px;
                    }
                    .packet-icon{
                        background: url('../assets/images/index/hyjb.png') center center no-repeat;
                        background-size: 130%;
                    }
                }

            }
        }
    }
</style>