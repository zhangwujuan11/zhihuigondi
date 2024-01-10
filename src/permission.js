import router from './router'
import { Message } from 'element-ui'
// 路由白名单
const whiteList = ['/login','/bim/wxindex']
router.beforeEach(async(to, from, next) => {
	const hasToken=localStorage.getItem('tocken')
	let date = new Date().getTime()//当前时间
	let expireTime=localStorage.getItem("expireTime")//过期时间
	 if(!hasToken && whiteList.indexOf(to.path) >= 0){
		  next()
	 }else if(!hasToken && whiteList.indexOf(to.path) < 0){
		 Message({message:'请先登录'})
		 next('/login')
	 }else if(date > expireTime){
		let num =3
		Message({
			dangerouslyUseHTMLString: true,
			message:'<span>登录过期，请重新登录（<i id="deomdd">'+ num+'</i>s ）</span>'
			})
			let Os=document.getElementById("deomdd");
		 	let	timer=setInterval(function () {
		 	num--
		 	Os.innerText=num;
		 	if(num ==0){
		 		localStorage.clear()
		 		next('/login')
		 		window.clearTimeout(timer);
		 	}
		 	},1000)
	 }else{
		next() 
	 }
})