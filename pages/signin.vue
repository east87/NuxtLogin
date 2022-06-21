
<template>


  <div class="authincation section-padding">
    <nuxt-link v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')">
      English
    </nuxt-link>

    <nuxt-link v-if="$i18n.locale !== 'id'" :to="switchLocalePath('id')">
      Indonesia
    </nuxt-link>
    <div class="container h-100">
      <div class="row justify-content-center h-100 align-items-center">
        <div class="col-xl-5 col-md-6">
          <div class="text-center">
            <h2 class="card-title mt-5"> {{ $t('signinTitle') }}</h2>
            <span class="px-3 text-body-3">{{ $t('signinSubTitle') }}</span>
          </div>
          <div class="auth-form my-4 form-input">
            <b-form @submit.stop.prevent="onSubmit">
              <!--email -->
              <b-form-group id="email-input-group" :label="`${$t('labelInputEmail') } *`" label-for="email-input">
                <b-form-input id="email-input" v-model="$v.form.email.$model" name="email" type="email"
                  :state="validateState('email')" aria-describedby="input-email-feedback"
                  :placeholder="`${$t('placeholderInputEmail')}`"></b-form-input>
                <span v-if="$v.form.email.$invalid == false" class="input-isvalid text-body-5">Success</span>
                <b-form-invalid-feedback v-if="$v.form.email.$error" id="input-email-feedback" class="text-body-5">
                  <span v-if="!$v.form.email.required">{{ $t('errorRequire', ['Email']) }}</span>
                  <span v-if="!$v.form.email.email"> {{ $t('errorFormat', ['Email','email']) }}</span>
                </b-form-invalid-feedback>
              </b-form-group>
              <!--password -->
              <b-form-group id="password-input-group" :label="`${$t('labelInputPassword') } *`"
                label-for="password-input">
                <b-form-input id="password-input" v-model="$v.form.password.$model" name="password" :type="inputTye"
                  :state="validateState('password')" aria-describedby="input-password-feedback"
                  :placeholder="`${$t('placeholderInputPassword')}`">
                </b-form-input>
                <span variant="none" class="icon-input-left" @click="showPassword()">
                  <CustomIcon role="button" :icon-name="hidePassword ?'eye-close':'eye-open'" />
                </span>
                <span v-if="$v.form.password.$invalid == false" class="input-isvalid text-body-5">Success</span>
                <b-form-invalid-feedback v-if="$v.form.password.$error" id="input-email-feedback" class="text-body-5">
                  <span v-if="!$v.form.password.required">{{ $t('errorRequire', ['Password']) }}</span>
                  <span v-if="!$v.form.password.minLength">
                    {{ $t('errorMinLength', ['Password', $v.form.password.$params.minLength.min]) }}
                  </span>
                </b-form-invalid-feedback>
              </b-form-group>

              <div class="text-right mb-4 forget-password">
                <NuxtLink to="/forgetpassword">
                  {{ $t('forgetPasswordTitle')}}
                </NuxtLink>
              </div>
              <b-button block type="submit" variant="secondary">{{ $t('signinBtn') }}</b-button>
            </b-form>
            <div class="text-center my-3">
              <span class="text-body-3">{{ $t('textHaveNotAccount') }} <NuxtLink to="/signup">
                  {{ $t('signupBtn') }}
                </NuxtLink></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import CustomIcon from '@/components/CustomIcon';
export default {
  name: 'SigninPage',
  components: {
    CustomIcon
  },
  mixins: [validationMixin],
  data() {
    return {
      hidePassword: true,
      inputTye: 'password',
      form: {
        email: '',
        password: '',
      },
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(8) },
    },
  },
  methods: {
    validateState(email) {
      const { $dirty, $error } = this.$v.form[email]
      return $dirty ? !$error : null
    },


    resetForm() {
      this.form = {
        email: null,
        password: null,
      }

      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    onSubmit() {

      this.$v.form.$touch()
      console.log(this.$v.form.email);
      if (this.$v.form.$anyError) {
        return
      }

      alert('Form submitted!')
    },
  },
}
</script>
