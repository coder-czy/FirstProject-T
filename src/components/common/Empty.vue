<template>
  <div class="empty-cpn">
      <div class="package-empty">
            <img src="../../assets/images/empty.png" alt="">
            <p>您暂时还没有{{word}}哦~</p>
        </div>
  </div>
</template>

<script>
export default {
 props:{
     word:{
         type:String,
         default:'卷'
     }
 }
}
</script>

<style lang="scss" scoped>
 .empty-cpn{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                position: fixed;
                top: 84px;
                left: 0;
                right: 0;
                bottom: 0;

                img{
                    width: 200px;
                }
                p{
                    color: #787a7d;
                    text-align: center;
                }
            }
</style>