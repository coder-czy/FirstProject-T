<template>
  <div class="exchange-record">
        <TitleCpn :title="'兑换历史'" @left-click="comeBack">
                   <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
      <div class="exchange-content">
            <van-tabs v-model="active" title-active-color="#abba11" background="#f5f8fa" color="#abba11" swipeable>
        <van-tab  :title="'全部'">
         <Empty :word="'兑换记录'" />
        </van-tab>
        <van-tab  :title="'待发货'">
         <Empty :word="'兑换记录'" />
           
        </van-tab>
        <van-tab  :title="'已发货'">
         <Empty :word="'兑换记录'" />
           
        </van-tab>
        <van-tab  :title="'已完成'">
         <Empty :word="'兑换记录'" />
           
        </van-tab>
        </van-tabs>
      </div>
      
  </div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
import Empty from '../common/Empty'

export default {
    data() {
        return {
            active:0
        }
    },
components:{
    TitleCpn,
    Empty
},
methods: {
    comeBack(){
        this.$router.go(-1)
    }
},
}
</script>

<style lang="scss" scoped>
    .exchange-record{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 40;
        background-color: #f5f8fa;
    }
</style>