import axios from "axios";

export default {
    uploadImage(data){
        return axios.post('/api/images',data,
            { headers: {'content-type': 'multipart/form-data' }
            });
    },
    showImage(imageId){
        return axios.get('/api/images/'+imageId);
    },
    findAllImages(){
        return axios.get('/api/images');
    },
    deleteImage(imageIri){
        return axios.delete(imageIri);
    }
}