<template>
	<div class="rectify">
		<div class="maincon">
			<div class="serbox">
				<el-button v-if="identityCode!=21002" type="primary" size="small" @click="$store.state.rectification=true">发起整改</el-button>
				 <el-select class="selinpout" v-model="value" placeholder="状态" size="small" @change="changestatus()">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				  <el-select v-model="valuet" size="small" placeholder="我的待办" @change="changestatus()">
				     <el-option
				       v-for="item in optionst"
				       :key="item.value"
				       :label="item.label"
				       :value="item.value">
				     </el-option>
				   </el-select>
				  <el-input v-model="input" class="serinput" @keyup.enter.native="changestatus()"></el-input>
				  <el-button type="primary" size="small" class="submi" @click="changestatus()">搜索</el-button>
			</div>
			
			<ul class="con">
				<li 
				v-for="(item,index) in lidatas"
				:key="index"
				@click="liclick(item)"
				>
					<p class="title">{{item.title}}</p>
					<p>
						<span>{{item.createTime | conversion}}</span>
						<span type="primary" size="small" class="submi">{{item.statusDesc}}</span>
					</p>
					<img v-if="!item.cover" src="@/assets/image/cams/uav_default.jpg" alt="">
					<img v-if="item.cover" :src="item.cover" alt="">
				</li>
			</ul>
			<!-- 分页 -->
			<el-pagination
			  background
			  @current-change="whatepage"
			  :current-page.sync="currentPage"
			  layout="prev, pager, next, jumper"
			  :page-size="PageSize"
			  :total="total">
			</el-pagination>
		</div>
		
		<!-- 发起整改 -->
		<Rectification></Rectification>
		<!-- 草稿 -->
		<Havedatadilog :havedatainfo="havedatainfo"></Havedatadilog>
		<!-- 未开始 -->
		<Notstarted :havedatainfo="havedatainfo"></Notstarted>
	</div>
</template>

<script>
	import Rectification from "@/components/rectify/Rectification.vue"
	import Havedatadilog from "@/components/rectify/Havedatadilog.vue"
	import Notstarted from "@/components/rectify/Notstarted.vue"
	import {userRelatedList,usersurpost,getalllist} from "@/utils/rectify.js"
	export default{
		components:{
			Rectification,
			Havedatadilog,
			Notstarted
		},
		filters:{
			conversion(value) {
			      return new Date(value).toLocaleString();
			    },
		},
		data(){
			return{
				identityCode:21002,//身份id
				value:'',
				options: [{
					  value: 0,
					  label: '全部'
					}, {
					  value: 1,
					  label: '未开始'
					}, {
					  value: 2,
					  label: '进行中'
					}, {
					  value: 3,
					  label: '已完成'
					}],
				valuet:'1',
				optionst: [{
					  value: '0',
					  label: '全部'
					}, {
					  value: '1',
					  label: '我的待办'
					}, {
					  value: '2',
					  label: '我的发起'
					}],
				input:'',
				total:0,//页面数据总数
				currentPage:1,
				lidatas:[],//页面数据
				havedatainfo:null,//单条数据id
				PageSize:8
			}
		},
		mounted() {
			this.identityCode = localStorage.getItem("identityCode")
			// console.log(this.identityCode)
			// 我的待办列表出现啦
			this.changestatus()
		},
		methods:{
			// 我的待办
			getdatas(data){
				userRelatedList(data).then(res=>{
					this.total=res.data.total
					this.lidatas=res.data.items
				})
			},
			//我的发起
			getusersurpost(data){
				usersurpost(data).then(res=>{
					this.total=res.data.total
					this.lidatas=res.data.items
				})
			},
			// 全部
			getall(data){
				getalllist(data).then(res=>{
					this.total=res.data.total
					this.lidatas=res.data.items
				})
			},
			// serchbox筛查
			changestatus(){
				if(this.valuet == '1'){
					this.getdatas({
						page:this.currentPage,
						status:this.value,
						keyword:this.input,
					})
				}else if(this.valuet == '2'){
					this.getusersurpost({
						page:this.currentPage,
						status:this.value,
						keyword:this.input,
					})
				}else if(this.valuet == '0'){
					this.getall({
						page:this.currentPage,
						status:this.value,
						keyword:this.input,
					})
				}
			},
			// page
			whatepage(val){
				if(this.valuet == '1'){
					this.getdatas({
						page:val,
						status:this.value,
						keyword:this.input,
					})
				}else if(this.valuet == '2'){
					this.getusersurpost({
						page:val,
						status:this.value,
						keyword:this.input,
					})
				}else if(this.valuet == '0'){
					this.getall({
						page:val,
						status:this.value,
						keyword:this.input,
					})
				}
			},
			liclick(val){
				this.havedatainfo=val
				if(val.status == 10004){//草稿
					this.$store.state.havedatadilog=true
				}else if(val.status != 10004){//未开始、进行中
					this.$store.state.notStarted=true
				}
			},
		}
	}
</script>

<style scoped>
	.rectify{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.el-select{
		background: rgba(2,82,173,0.2) linear-gradient(180deg, #00A0FF 0%, #008EEF 100%);
		border-radius: 4px;
		color: white;
		width: 133px;
		margin: 0 10px;
	}
	/deep/.el-input--suffix .el-input__inner{
		background: rgba(2,82,173,0.2) linear-gradient(180deg, #00A0FF 0%, #008EEF 100%);
		border-radius: 4px;
		color: white;
		border: none;
		text-align: center;
	}
	/deep/.el-select .el-input .el-select__caret{
		color:white;
	}
	.el-button--primary{
		background: rgba(2,82,173,0.2) linear-gradient(180deg, #00A0FF 0%, #008EEF 100%);
		border-radius: 4px;
		border: none;
		width: 133px;
		line-height: 32px;
		height: 32px;
		padding: 0;
		margin-right: 5px;
	}
	.serbox{
		display: flex;
		align-items: center;
		margin: 20px 0;
	}
	.submi{
		width: 53px;
	}
	.serinput{
		width: 250px;
		height: 32px;
		margin:0 5px;
	}
	/deep/.serinput .el-input__inner{
		height: 32px;
	}
	/deep/.el-input__inner::-webkit-input-placeholder{ /*WebKit browsers*/
	color: white;
	}
	.con{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.con::after{
	        content: '';
	        flex: auto; 
	     }
	.con li{
		width: 23.5%;
		background: rgba(2, 82, 173, 0.3000);
		border-radius: 10px;
		padding: 20px 15px 15px 15px;
		cursor: pointer;
		color: #fff;
		box-sizing: border-box;
		margin-bottom: 20px;
		margin-right: 1.75%;
	}
	.con li:nth-of-type(4n){
	  margin-right: 0;
	}
	.con li p{
		width: 100%;
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
		overflow: hidden;
	}
	.con li img{
		width: 100%;
		height: 15vw;
		margin-top: 25px;
	}
	.con li .title{
		font-size: 16px;
		font-weight: 800;
	}
	.con li .submi{
		    display: inline;
		    padding: 5px 10px;
		    font-size: 12px;
		    font-weight: 100;
		    width: 80px;
		    overflow: hidden;
		    color: #fff;
		    text-align: center;
		    white-space: nowrap;
		    vertical-align: baseline;
		    border-radius: 4px;
		    background: #D8D8D8 linear-gradient(180deg, #00A0FF 0%, #008EEF 100%);
			line-height: 16px;
	}
/deep/.selinpout .el-input__inner::-webkit-input-placeholder{
	  color: white !important;
	}
	/deep/.selinpout .el-input__inner:-moz-placeholder{
		color: white !important;
		 opacity: 1;
	}
	/deep/.selinpout .el-input__inner::-moz-placeholder{
		color: white !important;
		 opacity: 1;
	}
	
</style>