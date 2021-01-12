<template>
  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">User Login</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="err_message" class="alert alert-danger" role="alert"></div>

          <form action=""  method="post" name="form_login" id="formLoginModal" >
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

            <label for="inputUsername">Username</label>
            <input type="text" name="username" id="inputUsername" class="form-control" required autofocus>

            <label for="inputPassword">Password</label>
            <input type="password" name="password" id="inputPassword" class="form-control" required>

            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" name="_remember_me"> Remember me
              </label>
            </div>
            <button class="btn btn-lg btn-primary" type="button" @click="submitLoginEvent($event)">
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
  </div>
</template>

<script>
import {createHelpers} from 'vuex-map-fields';


export default {
  name: "LoginFormModal",
  computed:{
    responseData(){
      return this.$store.getters["UserModule/getResponseData"];
    }
  },
  methods:{
    async submitLoginEvent(event){
      if(event) event.preventDefault();
      const result = await this.$store.dispatch("UserModule/sendLoginForm",{username:'fff',password:'hhh'});
      console.log(result);
    }
  }

}
</script>

<style scoped>

</style>