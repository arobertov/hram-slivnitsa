<template>
  <b-modal id="loginModal" >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">User Login</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="formIsError" id="err_message" class="alert alert-danger" role="alert">
           {{formError.error}}
          </div>

          <form action=""  method="post" name="form_login" id="formLoginModal" >

            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

            <label for="inputUsername">Username</label>
            <input type="text" v-model="user.username" name="username" id="inputUsername" class="form-control" required>

            <label for="inputPassword">Password</label>
            <input type="password" v-model="user.password" name="password" id="inputPassword" class="form-control" required>

            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" name="_remember_me"> Remember me
              </label>
            </div>
            <button class="btn btn-lg btn-primary" type="submit" @click="submitLoginEvent($event)">
              Sign in
            </button>
            <button class="btn btn-default" type="button" aria-hidden="true" data-dismiss="modal">Cancel</button>
          </form>
        </div>
        <div class="modal-footer m-auto">
          <div class="container" >
            <a href="">
              <span><button type="button" class="btn btn-outline-secondary">Forgot Password</button></span>
            </a>
            <a href="">
              <span><button type="button" class="btn btn-outline-secondary">Registration</button></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import {createHelpers} from 'vuex-map-fields';

const { mapFields } = createHelpers({
  getterType: "UserModule/getLoginField",
  mutationType: 'UserModule/updateLoginField',
});


export default {
  name: "LoginFormModal",
  computed:{
    user(){
      return this.$store.getters["UserModule/getUser"]
    },
    submitted(){
      return this.$store.getters["UserModule/getIsSubmitted"];
    },
    responseData(){
      return this.$store.getters["UserModule/getResponseData"];
    },
    formIsError(){
      return this.$store.getters["UserModule/getIsError"];
    },
    formError(){
      return this.$store.getters["UserModule/getError"];
    },
    ...mapFields([
        "username",
        "password"
    ]),
  },
  methods:{
    async submitLoginEvent(event){
      if(event) event.preventDefault();
      const result = await this.$store.dispatch("UserModule/sendLoginForm",this.$store.state.UserModule.user);
    }
  }

}
</script>

<style scoped>

</style>