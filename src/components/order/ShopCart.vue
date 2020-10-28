<template>
<div>
     <div class="shop-cart"  v-show="shopCartCount>0">
    <div class="content-left">
        <span class="shop-cart-icon" @click="toggleShowList">
        <van-icon :badge="shopCartCount">
            <img src="../../assets/images/menu/cart.png" alt="">
        </van-icon>
        </span>
        <span class="total-price">¥ {{getTotalPrice}}</span>
    </div>
    <div class="content-right">去结算</div>
  </div>
    <div class="shopCart-cover" v-show="isShowList&&shopCartCount>0" @click="closeShowList" >
        <div class="shopCart-list" @click.stop="">
            
                <div class="list-title">
                <span class="empty" @click.stop="emptyShowList">清空</span>
            </div>
            <div class="list-content"  ref="goodList">
                <div>
                    <div class="list-item" v-for="(item) in showCartList" :key="item.id">
                        <div class="item-top">
                            <div class="list-left">{{item.name}}</div>
                        <div class="list-center">¥{{item | getItemListPrice(item)}}</div>
                        <div class="list-right">
                            <CountControl @reduce-count="reduceCount(item)" @add-count="addCount(item)" :food="item"/>
                        </div>
                        </div>
                        <div class="item-bottom" v-if="item.use_property">
                            {{ item | selectProperty(item)}}
                        </div>
                    </div>

                </div>

            </div>
           
            
        </div>
    </div>
</div>
 
</template>

<script>
import CountControl from '../common/CountControl'
import BetterScroll from 'better-scroll'
export default {

data() {
    return {
        isShowList:false

    }
},
props:{
    goods:{
        type:Array,
        require:true
    }
},
watch: {
    // 监听购物车商品数量，如果小于1就让遮罩层隐藏
    shopCartCount(oldval,val){
        if(oldval!==val&&val<1){
            this.isShowList = false
        }
        if(oldval!==val){
             this.initGoodListScroll()
        }
    },
    showCartList(oldv,v){
       if(oldv.length!==v.length){
           this.initGoodListScroll()
       }

    }

},
components:{
CountControl
},
computed: {
//    购物车内商品的数量
    shopCartCount(){
        let count = 0
    for(let i=0 ;i<this.showCartList.length;i++){
       count+=this.showCartList[i].count
    }
    return count || ''
    },
    // 购物车清单
    showCartList(){
        let goodsList = []
        for(let j=0;j<this.goods.length;j++){
            let {goods_list} = this.goods[j]
            goods_list.forEach(g=>{
                let index = goodsList.some(f=>f.id===g.id)
                if(g&&g.count&&!index){
                    goodsList.push(g)
                }
            })
        }
        return goodsList
    },
    // 计算商品总价格
    getTotalPrice(){
       return this.showCartList.reduce((oldval,val)=>{
            return oldval+val.count*val.price
        },0)
    },
 
},
filters:{
    // 用户所选的商品的属性
    selectProperty(food){
            let result =[]
        
           if(food&&food.property){
                food.property.forEach(v=>{
                v.values.forEach(i=>{
                    if(i.is_default){
                        result.push(i.value)
                    }
                })
            })
           }
        
            return result.join(',')
        },
           // 计算每一列商品的总价格
    getItemListPrice(food){
        return food.count*food.price
    }
},
methods: {
    // 切换购物车清单
    toggleShowList(){
        this.isShowList = !this.isShowList
        if(this.isShowList){
             this.initGoodListScroll()
        // console.log(this.showCartList);
        }
    },
    // 关闭购物车清单
    closeShowList(){
        this.isShowList = false
    },
    // 清空购物车
    emptyShowList(){
        this.$emit('empty-list')
    },
    reduceCount(food){
        this.$emit('reduce-count',food)
    },
    addCount(food){
        this.$emit('add-count',{id:food.id,num:1})
    },
    // 初始化better-scroll
    initGoodListScroll(){
       this.$nextTick(()=>{
            if(!this.goodListScroll){
            this.goodListScroll = new BetterScroll(this.$refs.goodList,{
                click:true,
                bounce:false
            })
        }else{
            this.goodListScroll.refresh()
        }
       })
    }
},
    beforeDestroy() {
        this.goodListScroll.destroy()
    },
}
</script>

<style lang="scss" scoped>
$baseColor:#a9b910;
.shopCart-cover{
        position: fixed;
        top: 40px;
        left: 0;    
        right: 0;
        bottom: 48px;
        background-color: rgba(66, 66, 66, .5);
        z-index: 10;

        .shopCart-list{
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            padding-bottom: 60px;
            max-height : 320px;
            background-color: #fff;

            .list-title{
                height: 27px;
                background-color: #e9ebd0;
                padding: 0 16px;
                .empty{
                    display: block;
                    height: 100%;
                    line-height: 27px;
                    float: right;
                    font-size: 12px;
                    color: $baseColor;
                }


            }
            .list-content{
                padding: 0 15px;
                overflow: hidden;
                max-height: 250px;
             .list-item{
                border-bottom: 1px solid #fefefe;
                padding: 25px 0;
                
                .item-top{
                    display: flex;
                    align-items: center;
                    color: #474a4c;
                    height: 25px;
                    .list-left{
                        flex: 1;
                        font-size: 14px;
                      

                    }
                    .list-center{
                        flex-basis: 30px;
                        font-size: 16px;
                        margin:0 50px 0 40px;
                    }
                }
                .item-bottom{
                    width: 40vw;
                    font-size: 12px;
                    line-height: 20px;
                    color: #9b9b9b;
                }
                } 
            }
           
            
        }
    }
.shop-cart{
    display: flex;
    position: fixed;
    z-index: 11;
    right: 14px;
    left: 14px;
    bottom: 62px;
    height: 46px;
    border-radius: 46px;
    background-color: #fff;
    // overflow: hidden;

    
    
    .content-left{
        flex: 1;
        position: relative;
        padding-left: 25px;

        .total-price{
            line-height: 46px;
            margin-left: 66px;
            color: #5a5a5a;
            font-size: 18px;
        }

        .shop-cart-icon{
            position: absolute;
            left: 25px;
            top: -16px;
            display: inline-block;
            width: 45px;

            .van-info{
                background-color: #f8be28;
            }
           

            img{
                width: 100%;
               
            }
        }
    }
    .content-right{
        flex-basis: 70px;
        background-color: #adb838;
        font-size: 14px;
        line-height: 46px;
        text-align: center;
        color: #fff;
        border-top-right-radius: 23px;
        border-bottom-right-radius: 23px;
        
    }

}
</style>