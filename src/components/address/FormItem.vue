<template>
  <div class="form-item">
      <div class="item-left">
       {{title}}
      </div>
      <div class="item-center">
           <slot name="center"></slot>
      </div>
      <div class="item-right">
          <slot name="right"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String
        }
    }
}
</script>
<style lang="scss" scoped>
    .form-item{
        display: flex;
        justify-content: center;
        align-items: center;
        padding:8px 12px ;
        line-height: 30px;
        background-color: #fff;
        border-bottom: 1px solid #f4f4f4;

        .item-left{
            flex-basis: 70px;
            font-size: 16px;
            color: #484b4d;
            
        }
        .item-center{
            flex:1;
            margin: 0 10px;
 
            
        }
        .item-right{
            flex-basis:20px;
  
 
            
        }
    }
</style>