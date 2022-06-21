
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
            <h2 class="card-title mt-5"> {{ $t('signupTitle') }}</h2>
            <span class="px-3 text-body-3">{{ $t('signupSubTitle') }}</span>
          </div>
          <div class="auth-form my-4 form-input">
            <b-form @submit.stop.prevent="onSubmitSignup">
              <!--email -->
              <b-form-group id="email-input-group" :label="`${$t('labelInputEmail') } *`" label-for="email-input">
                <b-form-input id="email-input" v-model="$v.form.email.$model" name="email" type="email"
                  :state="validateState('email')" aria-describedby="input-email-feedback"
                  :placeholder="`${$t('placeholderInputEmail')}`">
                </b-form-input>
                <span v-if="$v.form.email.$invalid == false" class="input-isvalid text-body-5">Success</span>
                <b-form-invalid-feedback v-if="$v.form.email.$error" id="input-email-feedback" class="text-body-5">
                  <span v-if="!$v.form.email.required">{{ $t('errorRequire', ['Email']) }}</span>
                  <span v-if="!$v.form.email.email">{{ $t('errorFormat', ['Email', 'email']) }}</span>
                </b-form-invalid-feedback>
              </b-form-group>
              <div class="form-row">
                <div class="form-group col-4">
                  <label for="phone-code">{{ $t('labelInputPhone') }} *</label>
                  <b-button block variant="outline-secondary" class="btn-flag">
                    <span> 🇮🇩 </span>+62
                  </b-button>
                </div>
                <div class="form-group col-8">
                  <label for="phone-input">&nbsp;</label>
                  <b-form-input id="phone-input" v-model="$v.form.phoneNumber.$model" name="phone" type="text"
                    :state="validateState('phoneNumber')" aria-describedby="input-phone-feedback"
                    :placeholder="`${$t('placeholderInputPhone')}`"></b-form-input>
                  <span v-if="$v.form.phoneNumber.$invalid == false" class="input-isvalid text-body-5">Success</span>
                  <b-form-invalid-feedback v-if="$v.form.phoneNumber.$error" id="input-email-feedback"
                    class="text-body-5">
                    <span v-if="!$v.form.phoneNumber.required">{{ $t('errorRequire', ['Phone']) }}</span>
                    <span v-if="!$v.form.phoneNumber.numeric">{{ $t('errorFormat', ['Phone', 'numeric']) }}</span>
                    <span v-if="!$v.form.phoneNumber.minLength || !$v.form.phoneNumber.maxLength">
                      {{
                      $t('errorPhoneLength',
                      ['Phone', $v.form.phoneNumber.$params.minLength.min, $v.form.phoneNumber.$params.maxLength.max])
                      }}
                    </span>
                  </b-form-invalid-feedback>
                </div>
              </div>

              <!--password -->
              <b-form-group id="password-input-group" :label="`${$t('labelInputPassword') } *`"
                label-for="password-input">
                <b-form-input id="password-input" v-model="$v.form.password.$model" name="password" :type="inputTye"
                  :state="validateState('password')" aria-describedby="input-password-feedback"
                  :placeholder="`${$t('placeholderInputPassword')}`">
                </b-form-input>
                <span variant="none" class="icon-input-left" @click="showPassword()">
                  <CustomIcon role="button" :icon-name="hidePassword ? 'eye-close' : 'eye-open'" />
                </span>
                <span v-if="$v.form.password.$invalid == false" class="input-isvalid text-body-5">Success</span>
                <b-form-invalid-feedback v-if="$v.form.email.$error" id="input-email-feedback" class="text-body-5">
                  <span v-if="!$v.form.password.required">{{ $t('errorRequire', ['Password']) }}</span>
                  <span v-if="!$v.form.password.minLength">
                    {{ $t('errorMinLength', ['Password', $v.form.password.$params.minLength.min]) }}
                  </span>
                  <span v-if="!$v.form.password.combination">{{ $t('errorPasswordFormat') }}</span>
                </b-form-invalid-feedback>
              </b-form-group>

              <!--confirmPassword -->
              <b-form-group id="confirmPassword-input-group" :label="`${$t('labelInputPassConf')}`"
                label-for="confirmPassword-input">
                <b-form-input id="confirmPassword-input" v-model="$v.form.confirmPassword.$model" name="confirmPassword"
                  :type="inputTyeConfirm" :state="validateState('confirmPassword')"
                  aria-describedby="input-confirmPassword-feedback" :placeholder="`${$t('placeholderInputPassConf')}`">
                </b-form-input>
                <span variant="none" class="icon-input-left" @click="showPasswordConfirm()">
                  <CustomIcon role="button" :icon-name="hidePasswordConfirm ? 'eye-close' : 'eye-open'" />
                </span>
                <span v-if="$v.form.confirmPassword.$invalid == false" class="input-isvalid text-body-5">Success</span>
                <b-form-invalid-feedback v-if="$v.form.confirmPassword.$error" id="input-email-feedback"
                  class="text-body-5">
                  <span v-if="!$v.form.confirmPassword.required"> {{ $t('errorRequire', ['Password confirmation'])
                    }}</span>
                  <span v-if="!$v.form.confirmPassword.minLength">
                    {{ $t('errorMinLength', ['Password', $v.form.confirmPassword.$params.minLength.min]) }}</span>
                  <span v-if="!$v.form.confirmPassword.sameAsPassword">
                    {{
                    $t('errorPasswordSameAs')
                    }}</span>
                </b-form-invalid-feedback>
              </b-form-group>

              <!--Referal -->
              <b-form-group id="referal-input-group" :label="`${$t('labelInputReferal')}`" label-for="referal-input">
                <b-form-input id="referal-input" v-model="$v.form.referal.$model" name="referal" type="text"
                  :state="validateState('referal')" aria-describedby="input-referal-feedback"
                  :placeholder="`${$t('placeholderInputReferal')}`"></b-form-input>
                <span v-if="$v.form.referal.$model && $v.form.referal.$invalid == false"
                  class="input-isvalid text-body-5">Success</span>
              </b-form-group>
              <div class="text-justify mb-2 ">
                <span v-html="$t('textAgreeSignup')"> </span>
              </div>
              <div class="form-group">
                <b-form-checkbox v-model="$v.terms.$model" role="button" :class="{ 'is-invalid':$v.terms.$error }">Agree
                </b-form-checkbox>
                <span v-if="$v.terms.$invalid == false" class="input-isvalid text-body-5">Success</span>
                <div v-if="$v.terms.$error" class="invalid-feedback">
                  <span v-if="!$v.terms.sameAs || !$v.terms.required"> {{ $t('errorRequire', ['Terms ']) }}</span>
                </div>
              </div>

              <b-button block type="submit" variant="secondary">{{ $t('signupBtn') }}</b-button>

            </b-form>
            <div class="text-center my-3">
              <span class="text-body-3">{{ $t('textHaveAccount') }}<NuxtLink to="/signin">
                  {{ $t('signinBtn') }}
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


import { required, email, numeric, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
import CustomIcon from '@/components/CustomIcon';
export default {
  name: 'SignupPage',
  components: {
    CustomIcon
  },
  mixins: [validationMixin],
  data() {
    return {
      hidePassword: true,
      hidePasswordConfirm: true,
      inputTye: 'password',
      inputTyeConfirm: 'password',
      terms: false,
      form: {
        email: '',
        phoneCode: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        referal: '',

      },
    }
  },

  validations: {
    form: {
      email: { required, email },
      phoneNumber: { required, numeric, minLength: minLength(10), maxLength: maxLength(14), },
      password: {
        required,
        minLength: minLength(8),
        combination: function (value) {
          const containsUppercase = /[A-Z]/.test(value)
          const containsLowercase = /[a-z]/.test(value)
          const containsNumber = /[0-9]/.test(value)
          const containsSpecial = /[#?!@$%^&*-]/.test(value)
          return containsUppercase && containsLowercase && containsNumber && containsSpecial
        }
      },
      confirmPassword: { required, minLength: minLength(8), sameAsPassword: sameAs('password') },
      referal: { minLength: minLength(3) },

    },
    terms: {
      required,
      sameAs: sameAs(() => true)
    }
  },

  created() {

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
    onSubmitSignup() {
      this.$v.form.$touch();
      this.$v.terms.$touch();
      console.log(this.$v.form);

      if (this.$v.form.$anyError) {
        return false;
      } else{

        console.log(this.$v.terms);
      }
    },
  },
}
</script>
