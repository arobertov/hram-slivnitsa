import axios from "axios";

export default {
    signIn(loginFormData){
        return axios.post("/login",{
            username: loginFormData.username,
            password: loginFormData.password,
            _remember_me: loginFormData.remember_me
        })
    },
    registerUser(formData){
        console.log(formData);
        return axios.post("/api/users",{
            username:formData.username,
            email:formData.email,
            alias:formData.alias,
            password:formData.password
        })
    },
    findUser(userIri){
        return axios.get(userIri)
    }
}