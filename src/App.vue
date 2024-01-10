<template>
  <div id="app">
	   <Topmenu v-if="showtop"></Topmenu>
	<router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
	import Topmenu from '@/components/Topmenu'
	import wx from "weixin-js-sdk"
	export default {
	 provide(){//刷新
			return{
			  reload:this.reload
			}
		  },
	  components: {
		  Topmenu
	  },
	  data() {
	  	return{
			 isRouterAlive:true,
			 username:'',
			 showtop:true
		}
	  },
	  created() {
	  },
	  mounted() {
	  },
	  watch:{
			$route(to , from){
			 if(to.path =='/bim/wxindex' ){
				 this.showtop=false
			 }else{
				  this.showtop=true
			 }
			}
	  },
	  methods:{
		  reload(){
			  this.isRouterAlive=false;
			  this.$nextTick(function(){
				this.isRouterAlive=true
			  })
			}
	  }
	}
</script>

<style scoped>
	
</style>
