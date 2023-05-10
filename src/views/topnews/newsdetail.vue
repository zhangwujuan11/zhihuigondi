<template>
	<div>
		<Title>
			<template v-slot:contont>
				<el-button class="btnn" @click="goindex()">返回</el-button>
				<div class="detail">
					<h4>{{detail.title}}</h4>
					<p>发布时间：{{detail.createTime | time}}</p>
					<div>
						{{detail.tcontent}}
					</div>
				</div>
			</template>
		</Title>
	</div>
</template>

<script>
	import Title from "@/components/slot/Titlel.vue"
	
	export default{
		components:{
			Title
		},
		filters:{
			time(e){
			  var time = new Date(e);
			   function timeAdd0(str) {
				 if (str < 10) {
				   str = '0' + str;
				 }
				 return str
			   }
			   var y = time.getFullYear();
			   var m = time.getMonth() + 1;
			   var d = time.getDate();
			   var h = time.getHours();
			   var mm = time.getMinutes();
			   var s = time.getSeconds();
			   return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
			}
			
		},
		data(){
			return{
				detail:{}
			}
		},
		mounted() {
			this.detail=JSON.parse(this.$route.query.cont)
		},
		methods:{
			// 日期截取
			getrdate(row, column, cellValue, index){
				if(cellValue == null){
					return '-'
				}else{
					var date =new Date(cellValue) ;
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					return year + '-' + month + '-' + day
				}
			},
			goindex(){
				this.$router.push('/topnews')
			}
		}
	}
</script>

<style scoped>
	/deep/.titletext{
		display: none;
	}
	.btnn{
		color: white;
		width: 88px;
		height: 33px;
		border: 1px solid #52CCFFFF;
		border-radius: 4px;
		background: linear-gradient(180deg,transparent 30%,rgba(61, 159, 207, 0.70));
		position: absolute;
		margin-top: -23px;
	}
	.detail{
		min-height:70vh ;
		margin-top: 25px;
	}
	.detail h4{
		color: rgba(61, 159, 207, 1);
		font-size: 18px;
		line-height: 40px;
		font-weight: 600;
		text-align: center;
		margin-bottom: 10px;
	}
	.detail p{
		font-size: 14px;
		text-align: center;
	}
	.detail div{
		text-align: left;
		text-indent: 35px;
		font-size: 16px;
		line-height: 25px;
		margin-top: 10px;
	}
</style>