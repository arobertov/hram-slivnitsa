<template>
  <ValidationObserver ref="observer">
    <b-form ref="form"
              slot-scope="{ validate }"
              @submit.prevent="validate().then(handleSubmit)"
      >
        <ValidationProvider rules="required|min:4|max:30" name="Username">
          <b-form-group
          label="Username"
          label-for="input-username"
          slot-scope="{ valid, errors }"
          description="Потебителско име : от 4 до 30 символа"
      >
          <b-form-input
            name="username"
            id="input-username"
            v-model="user.username"
            :state="errors[0] ? false : (valid ? true : null)"
            placeholder="Въведете потребителско име" required>
          ></b-form-input>
          <b-form-invalid-feedback id="inputLiveFeedback">
          {{ errors[0] }}
        </b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <b-button  variant="success" type="submit">
          Submit
        </b-button>
    </b-form>


  </ValidationObserver>
</template>

<script>
import {createHelpers} from 'vuex-map-fields';
import { ValidationObserver, ValidationProvider} from 'vee-validate';

const { mapFields } = createHelpers({
  getterType: "UserModule/getLoginField",
  mutationType: 'UserModule/updateLoginField',
});

export default {
  name: "LoginForm",
  components: {
    ValidationObserver,
    ValidationProvider
  },
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
  methods: {
    checkFormValidity() {
      return true;
    },
    resetModal() {
      this.user.username = ''
      this.usernameState = null
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        console.log('invalid form');
        return
      }
      console.log('submit valid form');
      this.$store.dispatch("UserModule/sendLoginForm",this.$store.state.UserModule.user);

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('login-form')
      })
    }
  }
}
</script>

<style scoped>

</style>