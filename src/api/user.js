import axios from "./http";

const user={
    login(data){
        return axios({
            method:'post',
            url:'/user/login',
            data: data
        })
    },
    register(data){
        return axios({
            method:'post',
            url:'/user/register',
            data: data
        })
    }
}
export default user;