<template>
  <div class="profile">
      <TitleCpn :title="'奈雪乐园'" />
      <div class="banner"><img src="../assets/images/mine/banner.jpg" alt=""></div>
      <div class="profile-content">
        <div class="profile-person">
          <div class="person-top">
            <div class="top-left">
              <div class="person-avatar">
                <img src="../assets/images/mine/default.png" alt="">
                </div>
              <div class="person-level">
                <span class="level-img"><img src="../assets/images/mine/level.png" alt=""></span>
                <span class="level-num">{{memberData.level}}</span>
                </div>
            </div>
            <div class="top-center">
              <div class="user-name" @click="goUserInfo">{{memberData.nickname}}<span class="icon-keyboard_arrow_right right"></span></div>
              <div class="user-grow">当前成长值<span>{{memberData.currentValue}}/600</span></div>
              <div class="progress">
                <div class="progress-content" :style="{'width':memberData.currentValue/600*100+'%'}"></div>
              </div>

            </div>
            <div class="top-right">
              <div class="member-power">
                会员权益<span class="icon-keyboard_arrow_right"></span>
              </div>
              </div>
          </div>
          <div class="person-bottom">
            <div class="member-item" @click="goPackage">
              <div class="item-num">{{memberData.couponNum}}</div>
              <div class="item-text">奈雪卷</div>
            </div>
            <div class="member-item" @click="goAttendance">
              <div class="item-num">{{memberData.pointNum}}</div>
              <div class="item-text">积分商城</div>
            </div>
            <div class="member-item" @click="goRechargeCards">
              <div class="item-num">{{memberData.balance}}</div>
              <div class="item-text">余额</div>
            </div>
            <div class="member-item"  @click="goGiftCards">
              <div class="item-num">{{memberData.giftBalance}}</div>
              <div class="item-text">礼品卡</div>
            </div>
          </div>
        </div>

        <div class="profile-server">
          <h2 class="my-server">我的服务</h2>
          <div class="server-container">
            <div class="server-item" @click="goAttendance">
            <div class="server-icon"><img src="../assets/images/mine/jfqd.png" alt=""></div>
            <p class="server-text">积分签到</p>
          </div>
            <div class="server-item" @click="goGiftCards">
            <div class="server-icon"><img src="../assets/images/mine/stxy.png" alt=""></div>
            <p class="server-text">送TA心意</p>
          </div>
            <div class="server-item">
            <div class="server-icon"><img src="../assets/images/mine/nxsc.png" alt=""></div>
            <p class="server-text">奈雪商城</p>
          </div>
            <div class="server-item">
            <div class="server-icon"><img src="../assets/images/mine/tywj.png" alt=""></div>
            <p class="server-text">体验问卷</p>
          </div>
            <div class="server-item" @click="goMyOrder">
            <div class="server-icon"><img src="../assets/images/mine/wddd.png" alt=""></div>
            <p class="server-text">我的订单</p>
          </div>
            <div class="server-item" @click="goUserInfo">
            <div class="server-icon"><img src="../assets/images/mine/wdzl.png" alt=""></div>
            <p class="server-text">我的资料</p>
          </div>
            <div class="server-item">
            <div class="server-icon"><img src="../assets/images/mine/lxkf.png" alt=""></div>
            <p class="server-text">联系客服</p>
          </div>
            <div class="server-item" @click="goServices">
            <div class="server-icon"><img src="../assets/images/mine/gdfw.png" alt=""></div>
            <p class="server-text">更多服务</p>
          </div>

        </div>
          
        </div>
        
      </div>
      <div class="rule-tips">
        <p>会员-卡适用于奈雪的茶和奈雪酒屋指定范围</p>
      </div>
      <div class="member-code" @click="goMemberCode">
        <span class="code-icon"></span>
        会员码
      </div>
  </div>
</template>

<script>
import TitleCpn from '../components/common/TitleCpn'
import {mapMutations} from 'vuex'
import {SET_ORDER} from '../store/mutations/mutation-types'
import {apiOrders, apiPackages} from '../network/api'
export default {
components:{
  TitleCpn
},
computed: {
  memberData(){
    return this.$store.state.member
  }
},
methods: {
  ...mapMutations([SET_ORDER]),
  goAttendance(){
    this.$router.push('/attendance')
  },
  goGiftCards(){
    this.$router.push('/giftCards')
    console.log(`11`);
  },
  goUserInfo(){
    this.$router.push('/userInfo')
  },
  goPackage(){
    this.$router.push('/MyPackages')
  },
  goRechargeCards(){
    this.$router.push('/rechargeCards')
  },
  goMyOrder(){
    this.$router.push('/myOrder')
  },
  goMemberCode(){
    this.$router.push('/memberCode')
},
  goServices(){
    this.$router.push('/services')
},
  // 请求卡卷数据
    getData(){
        apiOrders().then(res=>{
            this.SET_ORDER(res.data)
        })
    },
},
created() {
  this.getData()
},
}
</script> 

<style lang="scss" scoped>
  $baseColor:#abba11;
  .profile{
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;

    .banner{
      flex-basis: 200px;

      img{
        width: 100%;
      }

    }
    .profile-content{
      flex: 1;
      position: relative;

      .profile-person{
        position: absolute;
        top:-70px;
        left: 16px;
        right: 16px;
       box-shadow: -0.5px 12px 10px 0px #E8EEDF;

        height: 168px;
        background-color: #fff;
        border-radius: 4px; 
        

        .person-top{
           display: flex;
          height: 60px;
          padding: 14px 0;
          margin-left:20px ;
          .top-left{
          position: relative;
          flex-basis: 84px;

          .person-avatar{
            position: absolute;
            top: -36px;
            left: 0;
            width: 82px;
            height: 82px;
            border-radius: 50%;
            border: 6px solid #fff;
            

            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .person-level{
            position: absolute;
            width: 34px;
            height: 20px;
            z-index: 1;
            border-radius: 20px;
            top: 29px;
            left:  45px;
            text-align: center;
            font-size: 12px;
            background-color: #fff;
            padding: 4px;
            color: #ffc61e;
            font-weight: 700;

            img{
              width: 12px;
            }
          }
          
        }
        .top-center{
            flex: 1;
            margin-left: 14px;

            .user-name{
              font-size: 18px;
              font-weight: 900;
              color: #484b4d;
              margin-bottom:4px ;

              span{
                vertical-align: middle;
              }
            }
            .right{
              color: #989ca6;
              font-size: 20px;
            }
            .user-grow{
              font-size: 12px;
              color: #a6aaad;
              margin-bottom:4px ;
            }
            .progress{
              height: 5px;
              width: 128px;
              background-color: #f3f4ee;
              border-radius: 5px;
              overflow: hidden;

              .progress-content{
                height: 100%;
                width: 50%;
                background-color: $baseColor;
              }
            }
            
          }

          .top-right{
            position: relative;
            flex-basis: 88px;
            

            .member-power{
              position: absolute;
              right: 0;
              top: 0;
              height: 30px;
              width: 100%;
              background-color: #ffc210;
              color: #fff;
              font-size: 13px;
              text-align: center;
              line-height: 30px;
              padding-left: 4px;
              border-top-left-radius: 15px;
              border-bottom-left-radius: 15px;
              
              span{
                vertical-align: middle;
              }
            }
            
          }
        }

        .person-bottom{
          display: flex;
          margin-top: 40px;

          .member-item{
            flex: 25%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
              text-align: center;


            .item-num{
              font-size: 24px;
              font-weight: 700;
              color: #484b4d;
              margin-bottom:10px;

            }
            .item-text{
              font-size: 14px;
              color: #a6aaad;
            }
          }
        }
        

      }

      .profile-server{
        margin-top: 115px;
        padding-top: 25px;
        background-color: #fff;

        .my-server{
          font-size: 16px;
          margin-left: 15px;
        }

        .server-container{
          display: flex;
          flex-wrap: wrap;

          .server-item{
            flex: 25%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 20px;

            .server-icon{
              width: 35px;
              height: 35px;
              margin-bottom: 10px;

              img{
                width: 100%;
              }
            }
            .server-text{
              font-size: 14px;
              color:#6f7275;
            }

          }
        }
      }
      
      
    }
    .rule-tips{
      background-color: #f5f8fa;
      font-size: 12px;
      color: #a5a9ab;
      text-align: center;
      padding: 25px 0;

    }
    .member-code{
      position: absolute;
      top: 60px;
      right: 20px;
      background-color: #fff;
      width: 80px;
      height: 34px;
      border-radius: 34px;
      font-size: 14px;
      padding: 0 8px;
      line-height: 34px;
      color: $baseColor;

      .code-icon{
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('../assets/images/mine/hym.png') center center no-repeat;
        background-size: 100%;
        vertical-align: middle;
      }
    }
  }
</style>