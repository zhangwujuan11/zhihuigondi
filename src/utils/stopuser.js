import axios from 'axios'  // 关键代码
const CancelToken = axios.CancelToken   // 关键代码

//方法传参多加一个 that传进去
export function userLoginCA(data, that) {
 return axios({
     url: 'user/login',
     method: 'get',
     data,
     // 关键代码 cancelToken
     cancelToken: new CancelToken(function executor(c) {
       that.cancel = c
     })   
   })
  }