<template>
  <div class="point-flow">
    <TitleCpn :title="'积分明细'" @left-click="comeBack">
          <div class="icon-arrow_lift" slot="left" ></div>
      </TitleCpn>
      <div class="point-content">
          <div class="total-point">
          <h2>{{getTotalPoint}}</h2>
          <p class="rule">查看积分规则</p>
      </div>
      <div class="point-list">
          <div class="list-item" v-for="item in pointData" :key="item.id">
              <div class="item-top">
                  <span class="item-reason">{{item.reason}}</span>
                  <span class="item-changeNum">+{{item.changeNum}}</span>
              </div>
              <div class="item-bottom">
                  <span class="item-createdAt">{{item.createdAt}}</span>
                  <span class="item-sellerName">{{item.sellerName}}</span>
              </div>
          </div>
      </div>
      </div>
      
  </div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
export default {
    data() {
        return {
            pointData:null
        }
    },
    computed: {
        getTotalPoint(){
            
          return this.pointData&&this.pointData.reduce((pv,cv)=>{
              return pv+=cv.changeNum
          },0)||0

        // let result=0
        // for(let i=0 ;i<this.pointData.length;i++){
        //     result += this.pointData[i].changeNum
        // }
        // return result
        }
    },
    components:{
        TitleCpn
    },
    methods: {
        comeBack(){
            this.$router.go(-1)
        },
        getPointData(){
           this.pointData= this.$route.params.data
            console.log(this.$route.params.data);
        }
    },
    created() {
        this.getPointData()
    },
}
</script>

<style lang="scss" scoped>
  $baseColor:#abba11;

    .point-flow{
        position: fixed;

        z-index: 35;

        top: 0;
        left: 0;
        right: 0;
        bottom: 0px;
        background-color: #f5f8fa;

        .point-content{
            position: absolute;
            top: 40px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: scroll;

             .total-point{
            text-align: center;
           padding: 50px  0 40px 0;
            background-color: #fff;

            h2{
                font-size: 40px;
                color: #484b4d;

            }
            .rule{
                font-size: 14px;
                color: $baseColor;
                margin-top: 15px;
            }
         }
            .point-list{
                
                .list-item{
                    padding: 20px;
                    border-top: 1px solid #f4f4f4;
                    background-color: #fff;

                    &:last-child{
                        border-bottom: 1px solid #f4f4f4;
                    }
                    .item-top{
                        color: #353535;
                        margin-bottom: 10px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .item-bottom{
                        color: #828386;
                        font-size: 12px;
                          display: flex;
                        justify-content: space-between;
                    }
                }
            }

        }

       
    }
</style>