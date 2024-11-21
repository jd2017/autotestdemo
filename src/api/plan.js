// 测试计划的增删查改管理
// 导入已经添加基础配置的instance 实例
import instance from './http.js'

const plan = {
    // 获取计划
    getPlan(params){
        return instance({
            method: 'get',
            url: '/plan',
            // 如果是传递URL参数信息，则使用 params 参数
            params : params
        })
    },
    // 添加计划
    addPlan(data){
        return instance({
            method :'post',
            url : '/plan',
            data : data
        })
    },
    // 删除计划
    deletePlan(data){
        return instance({
            method : 'delete',
            url : '/plan',
            // 如果是传递请求体，则使用data 参数；如果是拼接参数用params
            data : data
        })
    }
}

// 一定要添加导出操作，否则无法调用成功
export default plan;