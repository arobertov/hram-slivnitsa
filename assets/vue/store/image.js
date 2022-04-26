import imageApi from "../api/image_api";
const HYDRA_MEMBER = "hydra:member";
export default {
    namespaced: true,
    state:{
        images:[],
        image:{
            contentUrl:'',
            filePath:''
        },
        isLoading:false,
        isError: false,
        isSuccess:false,
        successMessage:'',
        error: ''
    },
    getters:{
        getImages(state){
            return state.images;
        },
        getImage(state){
            return state.image;
        },
        getIsLoading(state){
            return state.isLoading;
        },
        getIsError(state){
            return state.isError;
        },
        getIsSuccess(state){
            return state.isSuccess;
        },
        getError(state){
            return state.error;
        },
        getSuccessMessage(state){
            return state.successMessage;
        }
    },
    mutations:{
        fetchingImages(state){
            if(state.images.length === 0){
                state.isLoading = true;
            }
            state.isError = false;
            state.isSuccess = false;
        },
        fetchingImagesSuccess(state,images){
            state.images = images[HYDRA_MEMBER];
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        },
        uploadingImage(state) {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        },
        uploadImageSuccess(state,image){
            if(!Array.isArray(state.images)) {
                state.images = [];
            }
            state.images.push(image);
            state.isLoading = false;
            state.isError = false;
            state.error = '';
            state.isSuccess = true;
            state.successMessage = 'Изображението е качено на сайта!';
        },
        deletingImageSuccess(state,image){
            state.isSuccess = true;
            state.isLoading = false;
            state.successMessage = 'Изображението е изтрито!';
            state.images = state.images.filter(i=>i!==image)
        },
        setError(state,error){
            state.isLoading = false;
            state.isSuccess = false;
            state.successMessage = '';
            state.isError = true;
            state.error = error;
        }
    },
    actions:{
       async uploadImage({commit},image){
            try{
                const response = await imageApi.uploadImage(image);
                commit('uploadImageSuccess',response.data);
                return response.data
            }
            catch (e){
                let error = e.response.data;
                if(error.hasOwnProperty('hydra:description')){
                    error = error['hydra:description'];
                }
                commit('setError',error);
                return null
            }
            },
       async findAllImages({commit}){
           commit('fetchingImages');
           try{
               const response = await imageApi.findAllImages();
               commit('fetchingImagesSuccess',response.data);
               return response.data;
           }catch (e) {
               let error = e.response.data;
               if(error.hasOwnProperty('violations')){
                   error = error.violations[0]['message'];
               }
               commit('setError',error);
               return null
           }
       },
       async delete({commit},imageIri){
            try{
                const response = await imageApi.deleteImage(imageIri);
                commit('deletingImageSuccess',response.data)
                console.log(response.data)
            }catch (e) {
                let error = e.response.data;
                if(error.hasOwnProperty('hydra:description')){
                    error = error['hydra:description'];
                }
                commit('setError',error);
                return null
            }
       }
    }
}