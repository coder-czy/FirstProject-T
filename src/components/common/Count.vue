<template>
  <div class="count-control" @click.stop="" >
      <span class="icon-remove_circle_outline btn" @click="reduceCount"></span>
      <span class="count">{{count}}</span>
      <span class="icon-add_circle btn" @click="addCount"></span>
  </div>
</template>

<script>
export default {
    props:{
        count:{
            type:Number
        }
    },
    
data() {
    return {
       
      
    }
},
watch: {
 
},
methods: {
    reduceCount(){
        //  this.count=this.count<=1 ? 1 : this.count -1
    this.$emit('reduce-count')
    },
    addCount(){
    // this.count++
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