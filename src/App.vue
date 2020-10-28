<template>
  <div id="app">
    <keep-alive>
    
    <router-view></router-view>
    </keep-alive>
    <TabBar>
      <TabBarItem :link="home">
        <img slot="icon" src="../src/assets/images/tabBar/index.png">
        <img slot="active-icon" src="../src/assets/images/tabBar/index_selected.png">
        <span slot="text">首页</span>
      </TabBarItem>
      <TabBarItem :link="order">
        <img slot="icon" src="../src/assets/images/tabBar/drink.png">
        <img slot="active-icon" src="../src/assets/images/tabBar/drink_selected.png">
        <span slot="text">点餐</span>
      </TabBarItem>
      <TabBarItem :link="taking">
        <img slot="icon" src="../src/assets/images/tabBar/take.png">
        <img slot="active-icon" src="../src/assets/images/tabBar/take_selected.png">
        <span slot="text">取餐</span>
      </TabBarItem>
      <TabBarItem :link="profile">
        <img slot="icon" src="../src/assets/images/tabBar/mine.png">
        <img slot="active-icon" src="../src/assets/images/tabBar/mine_selected.png">
        <span slot="text">我的</span>
      </TabBarItem>
    </TabBar>
  </div>
</template>
<script>
import TabBar from './components/tabbar/TabBar'
import TabBarItem from './components/tabbar/TabBarItem'
export default {
  components:{
    TabBar,
    TabBarItem
  },
  data() {
    return {
      home:'/home',
      order:'/order',
      taking:'/taking',
      profile:'/profile'

    }
  },
}
</script>
<style lang="scss" scoped>

</style>
