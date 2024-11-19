//完成http请求的基本配置
// 导入 axios
import router from '@/router';
import axios from 'axios'

//创建 instance 实例
var instance = axios.create({
    //请求头
    headers: {
        'Content-Type':'application/json',
    },
    //超时时间
    timeout : 2500,
    //基础 url
    // baseURL : 'http://39.102.48.202:6099/'
    // baseURL :'https://hogwarts-platform-backend.hogwarts.ceshiren.com/'
    baseURL : 'http://127.0.0.1:8080/'
    }
)
//请求拦截器
instance
    .interceptors
    .request
    .use(config => {
        //Authorization
        //如果本地登录成功，则获取token
       if(localStorage.getItem('token')){
            //token信息拼接到请求头 Authorization
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
            //命令行输出打印查看
            console.log('http.js页面，请求拦截器命令行打印：'+ config.headers.Authorization);

        } 
        return config;
    }, error => {
        //返回给定原因而被拒绝的对象
        return Promise.reject(error);
    })

    
//响应拦截器
instance
    .interceptors
    .response
    .use(config => {
        if(40013 == config.data.code || 40014 == config.data.code){
            //没有登录成功，token清空
            localStorage.removeItem('token');
        }
        return config;
    }, error => {
        // 检查是否是因为 token 失效导致的错误
        if(error.response){
            const status = error.response.status;
            console.log('error====http.js全局响应拦截状态：'+status)
            if(status=== 403 ||status == 401){
                // 清除失效的 token（可选）
                localStorage.removeItem('token');
                // 跳转到登录页面或显示错误提示
                router.push('/login').catch(() => {
                    // 如果路由跳转失败（比如当前已经在登录页面），则显示一个全局错误提示
                    alert('Your session has expired. Please log in again.');
                })
            }else{
                alert('非业务异常 系统繁忙，请稍后重试.')
            }
        }
        //返回给定原因而被拒绝的对象
        return Promise.reject(error);
    })

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// 导出实例，方便其他js模块使用
export default instance

