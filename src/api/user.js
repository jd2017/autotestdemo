import axios from "./http";

const user={
    login(data){
        return axios({
            method:'post',
            url:'/auth/login',
            data: data
        })
    },
    register(data){
        return axios({
            method:'post',
            url:'/auth/register',
            data: data
        })
    }
}
export default user;