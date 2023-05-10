import router from './router'
import { Message } from 'element-ui'
// import {overdue} from '@/utils/login.js'

// 路由白名单
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
	const hasToken=localStorage.getItem('tocken')
	let date = new Date().getTime()//当前时间
	let expireTime=localStorage.getItem("expireTime")//过期时间
	if(!hasToken || date > expireTime){
		if (whiteList.indexOf(to.path) >= 0) {
		  next()
		} else {
			let num =3
			Message({
				dangerouslyUseHTMLString: true,
				message:'<span>未登录，请重新登录（<i id="deomdd">'+ num+'</i>s ）</span>'
				})
				let Os=document.getElementById("deomdd");
		let	timer=setInterval(function () {
		num--
		console.log(num)
		Os.innerText=num;
		if(num ==0){
			next('/login')
			window.clearTimeout(timer);
		}
		},1000)
		}
	}else{
		next()
	}
	
	// else{
    // token是否过期
    // overdue().then(res=>{
    //   if(res.data.active==true){
    //     next()
    //   }
    // }).catch(()=>{
    //   alert("登录过期,请重新登录")
    //   localStorage.removeItem('user')
    //   next('/login')
    // })
  // }
})