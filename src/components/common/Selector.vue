<template>
<van-icon :badge="count" >
  <div class="selector">
      选规格
  </div>
  </van-icon>
</template>

<script>
export default {
props:{
    count:{
        type:[Number,String]
      
    }
}
}
</script>

<style lang="scss" scoped>
    .selector{
        width: 60px;
        height: 24px;
        background-color: #adb838;
        border-radius: 24px;
        color: #fff;
        font-size: 10px;
        line-height: 22px;
        text-align: center;


    }
        .van-info{
            background-color: #f9bb2b  ;
        }
</style>