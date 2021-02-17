import axios from 'axios';

export default {
    create(tagFormData){
        return axios.post('/api/tags',{
            tagFormData : tagFormData
        })
    },
    findAll(){
        return axios.get('/api/tags')
    }
}