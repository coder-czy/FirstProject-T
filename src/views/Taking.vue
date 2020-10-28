<template>
  <div class="taking">
    <TitleCpn />
     <div class="none-taking">
       <div class="bg-img"><img src="../assets/images/loading.gif" alt=""></div>
       <div class="none-taking-title">
         <p>您还没有点单</p>
         <p>快去犒劳一下自己吧~</p>
       </div>
       <div class="go-order" @click="goOrder">
         去点餐
       </div>
       <p class="order-history" @click="goMyOrder">查看历史订单</p>

     </div>
  </div>
</template>

<script>
import TitleCpn from '../components/common/TitleCpn'
export default {
components:{
  TitleCpn
},
methods: {
  goOrder(){
    this.$router.push('/order')
  },
  goMyOrder(){
    this.$router.push('/myOrder')
  },
},
}
</script>

<style lang="scss" scoped>
$baseColor:#abba11;
.taking{
  

  .none-taking{
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 48px;
    background-color: #f5f8fa;

    .bg-img{

      img{
        height: 140px;
      }
    }
    .none-taking-title{
      p{
        color: #707275;
        font-size: 14px;
        line-height: 28px;
        text-align: center;
      }
    }
    .go-order{
      height: 50px;
      width: 175px;
      border-radius: 50px;
      font-size: 18px;
      color: #fff;
      background-color: $baseColor;
      text-align: center;
      line-height: 50px;
      margin: 50px 0 22px 0;
    }

    .order-history{
      font-size: 14px;
      color: $baseColor;

    }
    
  }
}
</style>