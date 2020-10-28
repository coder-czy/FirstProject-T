<template>
	<div class="container">
		<div class="intro">
			<img src="../assets/images/logo.png" />
			<div class="tips">
				<p>一杯好茶，一口软欧包</p>
				
				在奈雪遇见两种美好
			</div>
		</div>
		<div class="bottom">
            <van-form @submit="onSubmit">
            <van-field
                class="login-input"
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="testUserName"
            />
            <van-field
                class="login-input"
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="testpswd"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" class="login-btn">
                {{btnText}}
                </van-button>
                
             </div>
             <div class="toggleText" @click="toggleT">
            {{toggleText}}
             </div>
            </van-form>



			<div class="text-center">
				<p class="text-title">新用户登录即加入会员，享会员权益</p>
				<div class="member">
					<div class="member-item">
						<img src="../assets/images/mine/rhyl.png" />
						<div>入会有礼</div>
					</div>
					<div class="member-item">
						<img src="../assets/images/mine/jfdh.png" />
						<div>积分兑换</div>
					</div>
					<div class="member-item">
						<img src="../assets/images/mine/sjtq.png" />
						<div>升级特权</div>
					</div>
					<div class="member-item">
						<img src="../assets/images/mine/srtq.png" />
						<div>生日特权</div>
					</div>
					<div class="member-item">
						<img src="../assets/images/mine/nxbz.png" />
						<div>奈雪宝藏</div>
					</div>
				</div>
				<div class="power-declare">会员权益说明</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
        name:'Login',
		data() {
			return {
				username: '',
                password: '',
                isRegister:true
			}
        },
        computed: {
            testUserName(){
                let regex =  /^([a-zA-Z0-9_\u4e00-\u9fa5]{4,16})$/
               
                    return [{ pattern:regex, message: '4-16位(字母/数字/汉字/下划线)' }] 
                
            },
            testpswd(){
                let  reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
               
                    return [{ pattern:reg, message: '6-20位数字和字母' }] 
                
            },
            toggleText(){
                if(!this.isRegister){
                    return '新用户？去注册'
                }else{
                    return '已有账号？去登录'
                }
            },
            btnText(){
                if(!this.isRegister){
                    return '登录'
                }else{
                    return '注册'
                }
            }
        },
		methods: {
			 onSubmit(values) {
                 if(this.isRegister){
                     let obj = {"username":this.username,"password":this.password}
                     localStorage.setItem('user',JSON.stringify(obj))
                     
                      this.$store.commit('setUserMsg',{username:this.username,password:this.password})
                      this.isRegister= false
                      this.username = ''
                      this.password = ''
                 }else{
                     if(this.$store.state.username===this.username&&this.$store.state.password===this.password){
                         this.$toast.success('登录成功！');
                         console.log(this.$route);
                         this.$router.replace(this.$route.params.to.path)
                         this.$store.commit('setLoginStatus',true)
                     }else{
                         this.$toast.fail('登录失败！')
                     }
                 }
            console.log('submit', values);
              },
              toggleT(){
            this.isRegister = !this.isRegister
        },
        
     
        }
       
	}
</script>

<style lang="scss" scoped>
$baseColor :#a3b248;
.container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    background-color: #fefefe;

	.intro {
		width: 100%;
		padding: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		font-size:14px;
		color: $baseColor;
		
		img {
			width: 100px;
			height: 100px;
		}
		
		.tips {
			line-height: 24px;
			text-align: center;
            margin-top: 10px;
		}
	}
	
	.bottom {
		height: 40vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0 40px;

        .toggleText{
            font-size: 12px;
            color: blue;
            text-align: right;
            text-decoration: underline;
        }

        .login-input{
            border-radius: 22px;
            margin-bottom: 10px;
        }
		
		.login-btn {
		background-color: $baseColor;
        border: 1px solid $baseColor;
			
		}

        .text-center{
            margin-top: 40px;

        .text-title{
            font-size: 14px;
            color: #777;
            text-align: center;
            margin-bottom: 20px;

        }

        .member{
            display: flex;
            justify-content: center;
            margin: 10px 0;
            width: 100%;

            .member-item{
                flex: 1;
                text-align: center;
                font-size: 12px;
                color: #aaa;

                img{
                    width: 37px;
                    margin-bottom: 4px;
                }
            }
        }

        .power-declare{
            margin-top: 30px;
            line-height: 30px;
            font-size: 14px;
            color: blue;
            text-decoration: underline;
            text-align: right;
        }

        }
		
		
	}
}
</style>
