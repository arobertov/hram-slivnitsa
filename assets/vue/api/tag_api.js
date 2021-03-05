import axios from 'axios';

export default {
    create(tagName){
        return axios.post('/api/tags',{
            name : tagName
        })
    },
    findAll(){
        return axios.get('/api/tags')
    },
    show(tagId){
        return axios.get('api/tags/'+tagId)
    },
    edit(tagId,tagFormData){
        return axios.put('api/tags/'+tagId,{
            name : tagFormData.name
        })
    },
    delete(tagId){
        return axios.delete("/api/tags/"+tagId);
    },

}