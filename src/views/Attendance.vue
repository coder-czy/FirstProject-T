<template>
   <div class="attendance">
      <TitleCpn :title="'积分签到'" @left-click="comeBack">
          <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
    <div class="attendance-box">
          <div class="banner"><img src="../assets/images/integrals/bg.png" alt="">
      <div class="total-point">
          <div class="point-left" @click="goPointFlow">
              <img src="../assets/images/integrals/integral.png" alt="">
              <span class="point-num">{{getTotalPoint}}</span>
              积分
              <span class="icon-keyboard_arrow_right"></span>
          </div>
          <div class="point-right" @click="goExchangeRecord">
              兑换记录
          </div>
      </div>
      </div>
      <div class="attendance-content">
        <div class="attendance-person">
          <div class="person-top">

                <div class="get-point">连续签到赚积分
                    <span @click="toggleProgress">

                    <van-icon name="arrow-up" v-show="isShowProgress"/>
                    <van-icon name="arrow-down" v-show="!isShowProgress"/>
                    </span>
                    </div>
                <div class="remind">签到提醒
                    <van-switch @click="isRemind" v-model="checked" active-color="#abba11" inactive-color="#fff" size="20px"/>
                </div>
        
          </div>
          <div class="person-bottom" v-show="isShowProgress">
              <van-steps :active="active" active-color="#abba11">
                <van-step>1天</van-step>
                <van-step>2天</van-step>
                <van-step>3天</van-step>
                <van-step>4天</van-step>
                <van-step>5天</van-step>
                <van-step>6天</van-step>
                <van-step>7天</van-step>
                
                </van-steps>
                <ul class="day-point">
                    <li>+1</li>
                    <li>+1</li>
                    <li>+1</li>
                    <li>+1</li>
                    <li>+1</li>
                    <li>+1</li>
                    <li>+10</li>
                </ul>
           <div class="attendance-btn" :class="{active:isAttendance}" @click="attendanceClick">
            {{btnText}}
           </div>
          </div>
        </div>

       
        
      </div>
      <div class="empty-white"  v-show="isShowProgress"></div>
      <div class="point-mall">
          <div class="mall-type" v-for="(item,index) in mallData" :key="index">
              <div class="mall-title">
                  <span>{{item.name}}</span>
              </div>
              <div class="mall-content">
                  <div class="mall-item"  v-for="i in item.mallList" :key="i.goods_id" @click="goDetail(i)">
                      <span class="mall-icon"></span>
                      <img :src="i.img[0]" alt="" v-if="i.img.length">
                      <img v-else src="../assets/images/emptyMall.jpg" alt="">
                      <p class="mall-name">{{i.goods_name}}</p>
                      <p class="mall-price"><span class="price">{{i.points_price}}</span>积分</p>
                      <p class="mall-num">剩余{{i.exchanged_num}}件</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import TitleCpn from '../components/common/TitleCpn'
import {apiPointsMall,apiPointsFlow} from '../network/api'
export default {
components:{
    TitleCpn
},
data() {
    return {
        checked:false,
        isShowProgress:true,
         active: 0,
         isAttendance:false,
         mallData:[],
         pointFlowData:[]
      
    }
},
methods: {
    comeBack(){
        this.$router.go(-1)
    },
    toggleProgress(){
        this.isShowProgress = !this.isShowProgress
    },
    goExchangeRecord(){
        this.$router.push({name:'ExchangeRecord'})
    },
    goPointFlow(){
        this.$router.push({name:'PointFlow',params:{data:this.pointFlowData}})
    },
    attendanceClick(){
        if(!this.isAttendance){

            this.active+=1
        }
        this.isAttendance= true
        
    },
    isRemind(){
        console.log(this.checked);
        if(!this.checked){
           this.$dialog.confirm({
            title: '奈雪点餐申请',
            message: '签到提醒',
            })
            .then(() => {
                // on confirm
            })
            .catch(() => {
                this.checked = false
                // on cancel
            });
        }
    },
    // 请求兑换商品数据

    getData(){
        apiPointsMall('pointsMall').then(res=>{
            this.mallData = res.data
        })
        apiPointsFlow('pointsFlow').then(res=>{
            this.pointFlowData = res.data
        })
    },
  
    goDetail(val){
        this.$router.push({name:'MallDetail',params:val})
    }
},
created () {
    this.getData()
},
computed: {
    btnText(){
        if(this.isAttendance){
            return '已签到'
        }else{
            return '签到'
        }
    },
    getImg(img){
        return 
    },
    getTotalPoint(){
        return this.pointFlowData&&this.pointFlowData.reduce((pv,cv)=>{
            return pv+=cv.changeNum
        },0)
    }
},
}
</script>

<style lang="scss" scoped>
  $baseColor:#abba11;
  .attendance{
    position: fixed;
    display: flex;
    z-index: 35;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0px;
    background-color: #f0f3f6;
.attendance-box{
    overflow: scroll;

    .banner{
      flex-basis: 200px;
      position: relative;

      .total-point{
          position: absolute;
          display: flex;
          top: 80px;
          left: 0;
          right: 0;
         

          .point-left{
              color: #fff;
              flex: 1;
              margin-left: 40px;
              font-size: 14px;

              img{
                  width: 35px;
                  vertical-align: bottom;
                  margin-right: 8px;
              }

              .point-num{
                  font-size: 44px;
              }
              .icon-keyboard_arrow_right{
                  vertical-align: middle;
                  margin-left: -4px;
              }
          }
          .point-right{
              flex-basis: 90px;
              height: 30px;
              width: 90px;
              line-height: 30px;
              text-align: center;
              background-color: #f8faeb;
              font-size: 14px;
              border-top-left-radius: 15px;
              border-bottom-left-radius: 15px;
              margin: 10px 0;
              color: $baseColor;
              
              
          }
      }

      img{
        width: 100%;
      }

    }
    .attendance-content{
      flex: 1;
      position: relative;

      .attendance-person{
        position: absolute;
        top:-50px;
        left: 16px;
        right: 16px;
       box-shadow:-0.5px 12px 10px 0px #E8EEDF;
        background-color: #fff;
        border-radius: 4px; 
        

        .person-top{
           display: flex;
           justify-content: center;
           align-items: center;
          padding: 24px 16px;
          
          line-height: 24px;

          .get-point{
              color: #484b4d;
              flex: 1;
              text-align: left;

          }
          .remind{
              color: #707275;
              font-size: 14px;
              flex: 1;
              text-align: right;

              .van-switch{
              vertical-align: top;

              }
          }
 
        }

        .person-bottom{
        
         .day-point{
             display: flex;
             justify-content: space-between;
             align-items: center;
             padding: 0 10px;
             margin-bottom: 10px;
             

             li{
                 flex-basis: 20px;
                 text-align: center;
                 font-size: 12px;
                 &:last-child{
                     font-size: 14px;
                     font-weight: 700;
                     color: #ffc606;
                 }
             }
         }


        }
        

      }

      .attendance-btn{
        width: 134px;
        height: 36px;
        line-height: 36px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        background-color: $baseColor;
        border-radius: 36px;
        margin: 15px auto;

        &.active{
            background-color: #fff;
            border: 1px solid #a0a4a7;
            color:#a0a4a7 ;
        }


      }
      
      
    }
    .empty-white{
        height:  130px;
    }
    .point-mall{
        

        .mall-type{
            background-color: #f0f3f6;
            margin-top: 35px;
          
            .mall-title{
                padding:10px ;
                font-size: 16px;
                color:#484b4d ;

            }
            .mall-content{
           
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-evenly;
            align-self: start;
            background-color: #f0f3f6;
         
            .mall-item{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                flex-basis:45% ;
                background-color: #fff;
                // flex: 50%;
                height: 240px;
                margin: 10px auto;
                padding: 10px;

                .mall-icon{
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    background: url('../assets/images/services/gynx.png') center center no-repeat;
                    background-size: contain;
                    
                }

                img{
                   width:140px ; 
                   margin-top: 10px;
                }
                p{
                    align-self: flex-start;

                    &.mall-name{
                        font-size: 16px;
                        color:#484b4d ;
                        font-weight: 900;
                        margin-bottom: 14px;
                        margin-top: 14px;
                    }
                    &.mall-price{
                        font-size: 12px;
                        color:#a6aaad ;
                        margin-bottom: 6px;
                        .price{
                            font-size: 16px;
                            color: $baseColor;
                        }

                    }
                    &.mall-num{
                        font-size: 12px;
                        color: #a6aaad;
                    }
                }
            &:last-child{
                margin-left: 10px;
               
            }
            }
            }
        }
    }
}

  }
</style>