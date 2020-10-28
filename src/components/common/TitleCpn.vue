<template>
    <div  class="title">
    <div class="left" @click="leftClick">

    <slot name="left">
    </slot>
    </div>
  <div class="center">{{title}}</div>
  <div class="right">

  <slot name="right" @click="rightClick"></slot>
  </div>
    </div>
</template>

<script>
export default {
props:{
    title:{
        type:String,
        default:'奈雪の茶'
    }
},
methods: {
    leftClick(){
        this.$emit('left-click')
    },
    rightClick(){
        this.$emit('right-click')
    },
},
}
</script>

<style lang="scss" scoped>
.title{
    position: relative;
    display: flex;
    z-index: 30;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fefefe;
    font-size: 18px;
    text-align: center;
    color: #151515;
    font-weight: 900;

    .left{
        flex-basis: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .right{
        flex-basis: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .center{
        flex:1 ;
    }
 
}
</style>