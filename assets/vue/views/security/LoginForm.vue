<template>
  <div class="modal" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Потребителски вход</h3>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="formIsError" id="err_message" class="alert alert-danger" role="alert">{{formError.error}}</div>
          <ValidationObserver ref="observer">
          <b-form ref="form"
                  slot-scope="{ validate }"
                  @submit.prevent="validate().then(handleSubmit)"
          >
            <ValidationProvider rules="required|min:4|max:30" name="Username">
              <b-form-group
                  label="Потребителско име"
                  label-for="input-username"
                  slot-scope="{ valid, errors }"
                  description="Потебителско име : от 4 до 30 символа"
              >
                <b-form-input
                    name="username"
                    id="input-username"
                    v-model="user.username"
                    :state="errors[0] ? false : (valid ? true : null)"
                    placeholder="Въведете потребителско име">
                  >
                </b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider rules="required|min:4|max:30" name="Username">
              <b-form-group
                  label="Парола:"
                  label-for="input-password"
                  slot-scope="{ valid, errors }"
                  description="Парола : от 6 до 30 символа"
              >
                <b-form-input
                    name="password"
                    id="input-password"
                    v-model="user.password"
                    :state="errors[0] ? false : (valid ? true : null)"
                    placeholder="Въведете парола" >
                  >
                </b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-button variant="success" type="submit">
              Submit
            </b-button>
          </b-form>
        </ValidationObserver>
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
import {ValidationObserver, ValidationProvider} from 'vee-validate';

const {mapFields} = createHelpers({
  getterType: "UserModule/getLoginField",
  mutationType: 'UserModule/updateLoginField',
});

export default {
  name: "LoginForm",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed: {
    user() {
      return this.$store.getters["UserModule/getUser"]
    },
    submitted() {
      return this.$store.getters["UserModule/getIsSubmitted"];
    },
    responseData() {
      return this.$store.getters["UserModule/getResponseData"];
    },
    formIsError() {
      return this.$store.getters["UserModule/getIsError"];
    },
    formError() {
      return this.$store.getters["UserModule/getError"];
    },
    ...mapFields([
      "username",
      "password"
    ]),
  },
  methods: {
    resetModal() {
      this.user.username = ''
      this.usernameState = null
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      const result = await this.$store.dispatch("UserModule/sendLoginForm", this.$store.state.UserModule.user);
      if(result !== undefined){
        this.$nextTick(() => {
          $('#loginModal').modal('hide');
          console.log(result)
          return result;
        })
      }
    }
  }
}
</script>

<style scoped>

</style>