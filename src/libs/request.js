import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.publicPath.dev : config.publicPath.pro
const axios = new HttpRequest(baseUrl)
export default axios

// import axios from 'axios'

// const service = axios.create({
//   timeout: 5000, // request timeout
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     token: ''
//   }
// })

// service.interceptors.request.use(
//   config => {
//     return config;
//   },
//   error => {

//   });
// // respone interceptor
// service.interceptors.response.use(
//   response => {
//     const res = response.data;
//     if(res.code == 500){
//     }
//     return res;

//   },
//   error => {
//     if(error.response.status == 401) {

//       return;
//     } else if(error.response.status == 503){

//     }
//   }
// )

// export default service
