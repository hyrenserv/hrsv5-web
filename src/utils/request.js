import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000000 // request timeout
})

let loadingInstance = [];
//内存中正在请求的数量
let loadingNum = 0;
function startLoading() {
  if (loadingNum == 0) {
    store.state.loading.loadingShow = true
  }
  //请求数量加1
  loadingNum++;

}
function endLoading() {
  //请求数量减1
  loadingNum--
  if (loadingNum <= 0) {
    store.state.loading.loadingShow = false
  }
}
// request interceptor
// 请求拦截器
service.interceptors.request.use(
  config => {
    //  打开loadding
    startLoading()
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
    const token = store.state.user.token;
    config.method = 'POST'
    if (token) {
      //config.headers.Authorization = getToken();
      // config.data = true;
      config.headers['Hyren_userCookie'] = getToken();
    }
    /**
     * 这里对代码项的重复请求进行忽略,也就是说如果是代码项的请求不限制请求的次数
     */
    if (!loadingInstance.includes(config.url) || config.url.indexOf('/codes/') != -1) {
      loadingInstance.push(config.url)
      return config;
    }
  },
  error => {
    endLoading()
    return Promise.error(error);
  })


// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    loadingInstance = loadingInstance.filter(item => item != response.config.url)
    // 对响应数据做些事，把loading动画关掉
    endLoading()
    const res = response.data
    // console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      const headers = response.headers
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '确认登出', {
          confirmButtonText: '重新登入',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('login')
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      else if (res.code == 500) {//如果返回的状态是 500表示服务器异常
        Message({
          message: '服务器异常',
          showClose: true,
          type: 'error',
          duration: 0
        })
      }
      else if (headers['content-type'] === 'APPLICATION/OCTET-STREAM;charset=utf-8' || headers['content-type'] === 'APPLICATION/OCTET-STREAM') {
        return response

      } else if (res.code == 220) {//如果返回的状态是 500表示服务器异常

        Message({
          message: res.message,
          showClose: true,
          type: 'error',
          duration: 0
        })

        return res;
      }
    } else {
      return res;
    }
  },
  error => {
    endLoading()
    Message({
      message: error.message,
      type: 'error',
      duration: 0,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service