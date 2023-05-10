import axios from 'axios'


const server = axios.create({
	baseURL:process.env.VUE_APP_BASE_API,
	withCredentials: false,
	timeout: 8000
})

// 请求拦截器
server.interceptors.request.use(
	config => {
		const isToken = (config.headers || {}).isToken === false
		let tocken = localStorage.getItem('tocken')
		
		// config.headers['Accept'] = 'application/json'
		// config.headers['x-requested-with'] = 'XMLHttpRequest'
		// config.headers['Access-Control-Allow-Origin'] = "*"  
		if (tocken && !isToken ) {
			 config.headers['Authorization'] = tocken
		}
		return config
	}, error => {
		console.log(error)
		Promise.reject(error)
		
	}
)

//响应拦截
server.interceptors.response.use(response => {
	return response.data
	},
  error => {
    return Promise.reject(error)
    console.log('err' + error)
  })



export default server