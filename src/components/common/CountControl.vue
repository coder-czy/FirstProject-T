<template>
  <div class="count-control" @click.stop="">
      <span v-show="count>0" class="icon-remove_circle_outline btn" @click="reduceCount"></span>
      <span class="count" v-show="count>0">{{count}}</span>
      <span class="icon-add_circle btn" @click="addCount"></span>
  </div>
</template>

<script>
export default {
props:{
food:{
    type:Object,
    require:true
}
},
computed: {
    count(){
        return this.food.count ||0
    }
},
methods: {
    reduceCount(){
      this.$emit('reduce-count')
    },
    addCount(){
    this.$emit('add-count')
    // console.log(this.food);
    }
},
}
</script>

<style lang="scss" scoped>
$bgcolor: #a9b910;

    .count-control{
    
        width: 72px;
        text-align: right;

        span{
            display: inline-block;
            width: 24px;
            height: 24px;
           line-height:24px;
           vertical-align: top;
 


        }
        .btn{
            font-size: 24px;
            color: $bgcolor;
        }
        .count{
            font-size: 10px;
            line-height: 24px;
            text-align: center;
            color: rgb(147,153,159);
        }


    }
</style>