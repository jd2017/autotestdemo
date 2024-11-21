// 测试计划的增删查改管理
// 导入已经添加基础配置的instance 实例
import instance from './http.js'

const record = {
    // 获取计划
    getRecord(params){
        return instance({
            method: 'get',
            url: '/record',
            // 如果是传递URL参数信息，则使用 params 参数
            params : params
        })
    },
    // 添加计划
    addRecord(data){
        return instance({
            method :'post',
            url : '/record',
            data : data
        })
    }
   
}

// 一定要添加导出操作，否则无法调用成功
export default record;