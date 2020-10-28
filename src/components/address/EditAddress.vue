<template>
  <div class="edit-address">
      <TitleCpn @left-click="back">
        <div slot="left" class="icon-arrow_lift" ></div>
      </TitleCpn>
      <div class="edit-content">
          <div class="form">
           <FormItem :title="'收货人'">
               <input type="text" placeholder="请输入收货人" slot="center">
           </FormItem>
           <FormItem :title="'性别'">
              <div slot="center" class="select-sex">
                  <span v-for="(item, index) in ['先生','女士']" :key="index" :class="{active: currentIndex===index}" @click="changeSex(index)">{{item}}</span>
              </div>
           </FormItem>
           <FormItem :title="'手机号'">
               <input type="text" placeholder="请输入收货人联系方式" slot="center">
           </FormItem>
           <FormItem :title="'收货地址'">
               <p slot="center">请选择收货地址</p>
               <div slot="right" class="icon-keyboard_arrow_right arrow-right"></div>
           </FormItem>
           <FormItem :title="'门牌号'">
               <input type="text" placeholder="请输入收货人详细地址" slot="center">
           </FormItem>
          </div>
      </div>
      <div class="save">保存</div>
  </div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
import FormItem from './FormItem'
export default {
components:{
    TitleCpn,
    FormItem
},
data() {
    return {
        currentIndex:0
    }
},
methods: {
    back(){
        this.$router.go(-1)
    },
    changeSex(i){
        this.currentIndex = i
    }
},
}
</script>

<style lang="scss" scoped>
$baseColor:#abba11;
    .edit-address{
        position: fixed;
        z-index: 55;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;

        .save{
        position: absolute;
        left: 40px;
        right: 40px;
        bottom: 192px;
        height: 50px;
        border-radius: 50px;
        background-color: $baseColor;
        font-size: 16px;
        color: #fff;
        line-height: 50px;
        text-align: center;
        }
        .edit-content{
            padding:10px 15px 0 15px ;
            
            .form{
                
                background-color: #fff;
                 input{
                     border: none;
                     height: 35px;
                     font-size: 14px;

                 }
                 input::-webkit-input-placeholder {
                     color: #dbdbdb;

                 }
                 p{
                     font-size: 14px;
                       color: #dbdbdb;
                 }
                 .arrow-right{
                     font-size: 24px;
                     color: #898d98;
                 }
                 .select-sex{
                     span{
                         display: inline-block;
                         width: 78px;
                         height: 30px;
                         color:#a0a4a7 ;
                         line-height: 30px;
                         text-align: center;
                         border: 1px solid #a0a4a7;
                         border-radius: 3px;
                         margin-right: 5px;

                         &.active{
                             background-color: $baseColor;
                             color: #fff;
                             border: none;
                         }

                     }
                 }
            }
        }
    }
</style>