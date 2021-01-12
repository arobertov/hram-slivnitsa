import axios from "axios";

export default {
    signIn(loginFormData){
        return axios.post("/login",{
            username: loginFormData.username,
            password: loginFormData.password,
        })
    }
}