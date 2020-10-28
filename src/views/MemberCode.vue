<template>
  <div class="member-code">
  <TitleCpn :title="'会员码'" @left-click="comeBack">
                   <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
      <div class="member-content">
          <div class="member-avatar">
              <img src="../assets/images/mine/default.png" alt="">
              <div class="member-level"><span class="level"></span><span>{{member.memberLevel}}</span></div>
          </div>
          <h2 class="member-name">{{member.nickname}}</h2>
          <div class="member-stage">
              <div class="stage-item" @click="goPackage">
                  <p>{{member.couponNum}}</p>
                  <div>奈雪卷</div>
              </div>
              <div class="stage-item" @click="goAttendance">
                  <p>{{member.pointNum}}</p>
                  <div>积分</div>
              </div>
              <div class="stage-item" @click="goRechargeCards">
                  <p>{{member.balance}}</p>
                  <div>余额</div>
              </div>
              <div class="stage-item" @click="goGiftCards">
                  <p>{{member.giftBalance}}</p>
                  <div>礼品卡</div>
              </div>
          </div>
          <div class="code">
             <img :src="codeImg" alt="">
          </div>
          <p class="code-tip">支付前出示可累计积分，会员码每30秒更新</p>
          <div class="weChat-btn"> <img src="../assets/images/mine/wechat.png" alt=""> 使用微信支付</div>
      </div>
  </div>
</template>

<script>
import TitleCpn from '../components/common/TitleCpn'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            codeImg:null
        }
    },
    computed: {
        ...mapState(['member'])
    },
    methods: {
        comeBack(){
            this.$router.go(-1)
        },
          goAttendance(){
        this.$router.push('/attendance')
        },
        goGiftCards(){
            this.$router.push('/giftCards')
           
        },

        goPackage(){
            this.$router.push('/MyPackages')
        },
        goRechargeCards(){
            this.$router.push('/rechargeCards')
        },
  
  
        // 获取二维码图片
        getCodePicture(){  
            let _this = this
            let data = "content=https://www.naixuecha.com/&size=160&errorCorrection=L";

            let xhr = new XMLHttpRequest();

            // let blob = new Blob([xhr.response],{type:'image/jpeg'})
            xhr.withCredentials = true;
            xhr.responseType = "blob"
            xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let blob = xhr.response
                let url =URL.createObjectURL(blob)

                console.log(url);
                _this.codeImg =url
            }
            });

            xhr.open("POST", "https://v1.alapi.cn/api/qr");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(data);
                    }
    },
    
    components:{
        TitleCpn
    },
    created() {
        this.getCodePicture()
    },
}
</script>

<style lang="scss" scoped>
    .member-code{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 30;
        
        .member-content{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
           .member-avatar{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid #fff;
            box-shadow: 0 0 4px 4px #eee;
            margin: 15px 0 20px 0;
            img{
                width: 100%;

            }
        } 
        .member-level{
            position: absolute;
            color:#ffcb32 ;
            height: 25px;
            line-height: 25px;
            top: 115px;
            left: 200px;
            background-color: #fff;
            border-radius: 25px;
            padding: 2px 8px;
            font-size: 14px;
           box-shadow: 0 0 4px 4px #eee;

            .level{
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url('../assets/images/mine/level.png') center center no-repeat;
            background-size: contain;
            }
        }
        .member-name{
            color: #a0a4a7;
            font-weight: 600;
            margin-top: 10px;
        }
        .member-stage{
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        color: #a3a7aa;

        .stage-item{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            p{
                margin-bottom: 4px;
            }
        }
        }
        .code{
            width:160px;
            height: 160px;
            margin-top: 30px;
        }
        .code-tip{
            text-align: center;
            color: #a0a4a7;
            font-size: 12px;
            margin: 20px 0 30px 0;
        }
        .weChat-btn{
            width: 200px;
            height: 46px;
            background-color: #09bb07;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            line-height: 46px;
            border-radius: 8px;
            img{
                width: 20px;
                vertical-align: middle;
                
            }
        }
        }
        
    }
</style>