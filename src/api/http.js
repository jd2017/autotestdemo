//完成http请求的基本配置
// 导入 axios
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
    baseURL : 'http://39.102.48.202:6099/'
    }
)
// 导出实例，方便其他js模块使用

export default instance

