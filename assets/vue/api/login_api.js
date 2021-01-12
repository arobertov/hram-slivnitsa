import axios from "axios";

export default {
    signIn(loginFormData){
        return axios.post("/login",{
            username: 'admin',
            password: '123456'
        })
    }
}