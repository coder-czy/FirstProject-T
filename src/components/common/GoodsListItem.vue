<template>
  <div class="goods-item" >
      <div  class="item-avatar">
      <img :src="goods.images">
      </div>
      <div class="item-desc">
          <p class="name">{{goods.name}}</p>
          <div class="description text-desc" v-if="goods.content" >{{goods.content}}</div>
          <div class="money"><span class="price"><span class="yuan">¥</span>{{goods.price}}</span></div>
          
      </div>
    <div class="count-wrapper">
        <div v-if="goods.is_sell">
            <!-- 选择规格 -->
        <Selector v-if="goods.use_property" :count="selectCount"/> 
        <!-- 计数器 -->
        <CountControl :food="goods" v-else @add-count="addCount" @reduce-count="reduceCount"/>
        </div>
        <div v-else>
            已售罄
        </div>
    </div>
  </div>
</template>

<script>
import Selector from './Selector'
import CountControl from './CountControl'
export default {
props:{
    goods:Object
},
computed: {
// 用户选择的数量传递给select组件
    selectCount(){
        if(this.goods&&this.goods.count){
            return this.goods.count
        }else{
            return ''
        }
    }
},
components:{
Selector,
CountControl
},
methods: {
    addCount(){
        this.$emit('add-count',{id:this.goods.id,num:1})
    },
    reduceCount(){
        this.$emit('reduce-count',this.goods)
    },
    // 用户选择奶茶参数的数组
    goDetail(){
        this.$router.push({name:'detail',params:{food:this.goods}})
    }
},
}
</script>

<style lang="scss" scoped>
    .goods-item{
        display: flex;
        padding: 18px;
        position: relative;

        // &:after{
        //     position: absolute;
        //     right: 14px;
        //     bottom: 0;
        //     left: 14px;
        //     height: 1px;
        //     background: rgba(7,17,27,.1);
        //     content: '';
        // }
        
        

        .item-avatar{
           
            flex-basis: 57px;
            margin-right: 10px;
            img{
                 width: 80px;
                 height: 80px;
                 border-radius: 4px;
            }

        }
        .item-desc{
            flex: 1;

            .name{
                font-size: 12px;
                color: rgb(77, 86, 93);
                line-height: 12px;
                margin-top: 4px;
                margin-bottom: 0;
            }

            .description{
                font-size: 10px;
                color:#929294;
                line-height: 10px;
                margin-top: 15px;

              
            }

            .text-desc{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 40vw;
            }

            .price{
                font-size: 14px;
                color: #000;
                font-weight: 700;
                line-height: 24px;
                margin-left: 4px;
               
            }

         

            .money{
                margin-top:18px;
               
            }

        }
        .count-wrapper{
            position: absolute;
            right: 18px;
            bottom: 18px;
        }
    }
</style>