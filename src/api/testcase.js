// 测试用例的增删查改管理
// 导入已经添加基础配置的instance 实例
import instance from './http.js'

const testcase = {
    // 获取用例
    getTestCase(params){
        return instance({
            method: 'get',
            url: '/case/listcase',
            // 如果是传递URL参数信息，则使用 params 参数
            params : params
        })
    },
    // 添加用例
    addTestCase(data){
        return instance({
            method :'post',
            url : '/case/addcase',
            data : data
        })
    },
    // 删除用例
    deleteTestCase(data){
        return instance({
            method : 'delete',
            url : '/case/deletecase',
            // 如果是传递请求体，则使用data 参数；如果是拼接参数用params
            data : data
        })
    },
    // 修改用例
    updateTestCase(data){
        return instance({
            method : 'put',
            url : '/case/updatacase',
             // 如果是传递请求体，则使用data 参数
            data : data
        })
    }
}

// 一定要添加导出操作，否则无法调用成功
export default testcase;