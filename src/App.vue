<template>
  <div id="app">
	   <Topmenu ></Topmenu>
	<router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
	import Topmenu from '@/components/Topmenu'
	// import {getUserInfo} from '@/utils/comm'
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
			 username:''
		}
	  },
	  created() {
	  },
	  mounted() {
	  },
	  watch:{
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
