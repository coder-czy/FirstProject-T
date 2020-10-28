<template>
	<div class="container">
         <TitleCpn  @left-click="comeBack">
          <div class="icon-arrow_lift" slot="left" ></div>
         </TitleCpn>
		<div class="cell" @click="goAddress">
			<div class="content">
				<img src="../../assets/images/services/bzzx.png" class="icon" />
				<div>我的地址</div>
                <div class="icon-keyboard_arrow_right right"></div>
			</div>
		
		</div>
		<div class="cell" @click="goHelpCenter">
			<div class="content">
				<img src="../../assets/images/services/bzzx.png" class="icon" />
				<div>帮助中心</div>
                <div class="icon-keyboard_arrow_right right"></div>

			</div>
		
		</div>
		<div class="cell">
			<div class="content">
				<img src="../../assets/images/services/gynx.png" class="icon" />
				<div>关于奈雪</div>
                <div class="icon-keyboard_arrow_right right"></div>

			</div>
					
		</div>
		<div class="cell">
			<div class="content">
				<img src="../../assets/images/services/wdzl.png" class="icon" />
				<div>奈雪礼物</div>
                <div class="icon-keyboard_arrow_right right"></div>

			</div>
					
		</div>
        <router-view></router-view>
	</div>
</template>

<script>
import TitleCpn from '../common/TitleCpn'
	export default {
		data() {
			return {
				
			}
        },
        components:{ 
            TitleCpn
        },
		methods: {
			comeBack(){
                this.$router.go(-1)
            },
            goAddress(){
                this.$router.push('/address')
            },
            goHelpCenter(){
                this.$router.push({name:'HelpCenter'})
            }
		}
	}
</script>

<style lang="scss">
$font-size-base:16px;
$text-color-base:#484b4d;
	.container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 30;
		background-color: #FFFFFF;
	}
	
	.cell {
		padding: 20px;
		display: flex;
		align-items: center;
		position: relative;
		
		.content {
            flex: 1;
            font-size: 16px;
            width: 100%;
            display: flex;
			align-items: center;
            position: relative;
			font-size: $font-size-base;
			color: $text-color-base;
			
			.icon {
				width: 30px;
				height: 30px;
				margin-right: 10px;
            }
            .right{
                font-size: 20px;
                color: #b4b4b4;
                position: absolute;
                right: 0;
            }
		}
		
		.navigator {
			width: 50px;
			height: 50px;
			position: relative;
			margin-right: -10px;
			flex-shrink: 0;
		}
		
		&:after {
			content: '';
			position: absolute;
			border-bottom: 2px solid #d9d9d9;
			-webkit-transform: scaleY(0.8);
			transform: scaleY(0.8);
			bottom: 0;
			right: 30px;
			left: 30px;
		}
	}
</style>
