<template>
  <div class="modal" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Регистрация</h3>
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
              <ValidationProvider name="Потребителско име" rules="required|min:4|max:30" >
                <b-form-group
                    label="Потребителско име"
                    label-for="register-username"
                    slot-scope="{ valid, errors }"
                    description="Потебителско име : от 4 до 30 символа"
                >
                  <b-form-input
                      name="username"
                      id="register-username"
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
              <ValidationProvider name="Псевдоним" rules="required|min:3|max:30" >
                <b-form-group
                    label="Псевдоним"
                    slot-scope="{ valid, errors }"
                    description="Ще се използва за представянето ви  : от 3 до 30 символа"
                >
                  <b-form-input
                      v-model="user.alias"
                      :state="errors[0] ? false : (valid ? true : null)"
                      placeholder="Въведете псевдоним">
                    >
                  </b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <ValidationProvider name="Парола" rules="required|min:4|max:30" vid="password">
                <b-form-group
                    label="Парола:"
                    slot-scope="{ valid, errors }"
                    description="Парола : от 6 до 30 символа"
                >
                  <b-form-input
                      type="password"
                      :state="errors[0] ? false : (valid ? true : null)"
                      placeholder="Въведете парола"
                      v-model="user.password"
                    >
                  </b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <ValidationProvider name="Повтори парола" rules="required|confirmed:password">
                <b-form-group
                    label="Повтори Парола:"
                    slot-scope="{ valid, errors }"
                >
                  <b-form-input
                      type="password"
                      :state="errors[0] ? false : (valid ? true : null)"
                      placeholder="Въведи паролата отново "
                      v-model="user.confirmation"
                    >
                  </b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <ValidationProvider name="Email" rules="required|email" >
                <b-form-group
                    slot-scope="{ valid, errors }"
                    label="Електронна поща">
                  <b-form-input
                      type="email"
                      v-model="user.email"
                      :state="errors[0] ? false : (valid ? true : null)"
                      placeholder="Въведи електронна поща">
                  </b-form-input>
                  <b-form-invalid-feedback>
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>
              <b-button variant="success" type="submit">
                Регистрация
              </b-button>
            </b-form>
          </ValidationObserver>
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
  name: "RegisterForm",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  computed:{
    user() {
      return this.$store.getters["UserModule/getUser"]
    },
    formIsError() {
      return this.$store.getters["UserModule/getIsError"];
    },
    formError() {
      return this.$store.getters["UserModule/getError"];
    },
  },
  methods:{
    async handleSubmit(){
      const response = await this.$store.dispatch("UserModule/sendRegisterForm",this.$store.state.UserModule.user)
      if(response !== undefined){
        await this.$store.dispatch("UserModule/getUser",response);
        this.$nextTick(()=>{
          $('#registerModal').modal('hide');
        })
      }
    }
  }
}
</script>

<style scoped>

</style>