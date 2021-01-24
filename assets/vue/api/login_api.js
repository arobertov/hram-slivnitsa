import axios from "axios";

export default {
    signIn(loginFormData){
        return axios.post("/login",{
            username: loginFormData.username,
            password: loginFormData.password,
            remember_me: loginFormData.remember_me
        })
    },
    findUser(userIri){
        return axios.get(userIri)
    }
}