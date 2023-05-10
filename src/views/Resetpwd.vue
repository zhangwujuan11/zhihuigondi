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
			   <h3>智慧工地管理平台密码修改</h3>
			   <el-form :model="ruleForm"  :rules="rules" ref="ruleForm"  class="demo-ruleForm"  @keyup.enter.native="submitForm('ruleForm')">
			     <el-form-item prop="oldPassword">
			       <el-input type="password" v-model="ruleForm.oldPassword"  placeholder="旧密码">
					    <template slot="prepend"><i class="el-icon-lock"></i></template>
				   </el-input>
			     </el-form-item>
			    <el-form-item prop="newPassword">
			      <el-input type="password" v-model="ruleForm.newPassword"  placeholder="新密码">
			    		 <template slot="prepend"><i class="el-icon-lock"></i></template>
			      </el-input>
			    </el-form-item>
				<el-form-item prop="checkPassword">
				  <el-input type="password" v-model="ruleForm.checkPassword"  placeholder="确认新密码">
					 <template slot="prepend"><i class="el-icon-lock"></i></template>
				  </el-input>
				</el-form-item>
			     <el-form-item class="btnbox">
			       <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
				   <el-button @click="$router.back()">返回</el-button>
			     </el-form-item>
			   </el-form>
		   </div>
		  </div>
</template>

<script>
	import {reserpwd,getUserInfo} from '@/utils/comm.js'
	  export default {
		  inject:["reload"],
	    data() {
	      var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else {
			callback();
			}
	      };
		  var validatecheck = (rule, value, callback) => {
		    if (value === '') {
		      callback(new Error('请输入密码'));
		    } else if(value != this.ruleForm.newPassword) {
		  		callback(new Error('两次密码不一致'));
		  	}else{
				callback();
			}
		  };
	      return {
	        ruleForm: {
	          newPassword: '',
	          oldPassword: '',
			  checkPassword:''
	        },
	        rules: {
	          newPassword: [
	            { validator: validatePass, trigger: 'blur' }
	          ],
	         oldPassword: [
	           { validator: validatePass, trigger: 'blur' }
	         ],
			 checkPassword: [
			   { validator: validatecheck, trigger: 'blur' }
			 ]
	        }
	      };
	    },
	    methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
				  reserpwd({
					  newPassword:this.ruleForm.newPassword,
					  oldPassword:this.ruleForm.oldPassword
				  }).then(res=>{
					  if(res.code != 200){
							this.$message.error(res.data.detail)
					  }else{
						 this.$message.success("密码修改成功")
						 localStorage.clear()
						 this.$router.push('/login')
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
		height: 350px;
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