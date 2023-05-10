<template>
	<div id="login">
	    <vue-particles
	        color="#fff"
	        :particleOpacity="0.7"
	        :particlesNumber="60"
	        shapeType="circle"
	        :particleSize="4"
	        linesColor="#fff"
	        :linesWidth="1"
	        :lineLinked="true"
	        :lineOpacity="0.4"
	        :linesDistance="150"
	        :moveSpeed="2"
	        :hoverEffect="true"
	        hoverMode="grab"
	        :clickEffect="true"
	        clickMode="push"
	        class="lizi"
	      >
	      </vue-particles>
		   <div class="loginbox">
			   <h3>智慧工地管理平台登录</h3>
			   <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm"  @keyup.enter.native="submitForm('ruleForm')">
				   <el-form-item prop="userName">
				     <el-input v-model.number="ruleForm.userName" placeholder="用户名">
						  <template slot="prepend"><i class="el-icon-user"></i></template>
					 </el-input>
				   </el-form-item>
			     <el-form-item prop="password">
			       <el-input type="password" v-model="ruleForm.password"  placeholder="密码">
					    <template slot="prepend"><i class="el-icon-lock"></i></template>
				   </el-input>
			     </el-form-item>
			    
			     <el-form-item class="btnbox">
			       <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
			     </el-form-item>
			   </el-form>
		   </div>
		  </div>
</template>

<script>
	import {login,getUserInfo,news} from '@/utils/comm.js'
	  export default {
		  inject:["reload"],
	    data() {
	      var checkAge = (rule, value, callback) => {
	        if (value === '') {
	          return callback(new Error('用户名不能为空'));
	        }else {
			callback();
		}
	      };
	      var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else {
			callback();
			}
	      };
	      return {
	        ruleForm: {
	          password: '',
	          userName: '',
			  uuid: 'UUID'
	        },
	        rules: {
	          password: [
	            { validator: validatePass, trigger: 'blur' }
	          ],
	          userName: [
	            { validator: checkAge, trigger: 'blur' }
	          ]
	        }
	      };
	    },
	    methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	           login(this.ruleForm).then(res=>{
				   if(res.data.code == 200){
					   localStorage.setItem('username',this.ruleForm.userName)
					   localStorage.setItem('tocken','Bearer '+res.data.data.token)
					   localStorage.setItem('expireTime',res.data.data.expireTime)
					   this.$nextTick(()=>{
					   	getUserInfo().then(info=>{
					   		localStorage.setItem('identityCode',info.data.identityCode)
					   		localStorage.setItem('currentUserId',info.data.userId)
							this.$message.success('登录成功')
							this.$router.push('/home')
					   	})
						news({status:0}).then(ress=>{
							localStorage.setItem('newstotal',ress.total)
						})
					   })
				   }else{
					   this.$message.error(res.data.data.detail)
				   }
			   })
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        })
	      }
	    }
	  }
</script>

<style scoped>
	.loginbox{
		width: 28%;
		height: 317px;
		background: rgba(255,255,255,0.9);
		min-width: 300px;
		max-width: 600px;
		padding:30px 40px 40px 40px;
		box-sizing: border-box;
		border-radius: 10px;
		position: fixed;
		top: calc(50% - 158.5px);
		left:calc(50% - 16.7%);
	}
	.loginbox h3{
		text-align: center;
		margin-bottom: 40px;
	}
	.btnbox{text-align: center;}
	/deep/.el-form-item__error{
		left: 70px;
	}
</style>