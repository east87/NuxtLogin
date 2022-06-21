<template>
  <div class="authincation section-padding">
    <div class="container h-100">
      <div class="row justify-content-center h-100 align-items-center pt-5">

        <div class="col-xl-6 col-md-6">
          <b-img class="icon-page" center src="~/static/icons/ic_forgot_password.webp" alt="forgot password"></b-img>
          <!--section Forget password option-->
          <div v-if="!showEnterCodeByEmail" class="section-forget">
            <div class="text-center">
              <h2 class="card-title mt-2">{{ $t('forgetPasswordTitle')}}</h2>
              <span class="text-body-3">{{ $t('forgetPasswordSubTitle')}}</span>
            </div>
            <div class="auth-form my-4">
              <b-row class="col-reset justify-content-center">
                <b-col class="col-md-6 col-10">
                  <b-button variant="none" class="btn-left text-body-4 px-1 my-2"
                    @click="$bvModal.show('bv-modal-email')">
                    <b-row>
                      <span class="col-12 text-left mb-2 font-200">{{
                      $t('textResetPasswordEmail')}}</span>
                      <span class="col-12 text-left mb-1">
                        <CustomIcon icon-name="email" class="mr-2" />your****@gmail.com
                      </span>
                    </b-row>
                  </b-button>
                </b-col>
                <b-col class="col-md-6 col-10">
                  <b-button variant="none" class="btn-right text-body-4 px-1 my-2"
                    @click="$bvModal.show('bv-modal-phone')">
                    <b-row>
                      <span class="col-12 text-left mb-2 font-200">{{ $t('textResetPasswordPhone')}}</span>
                      <span class="col-12 text-left mb-1">
                        <CustomIcon icon-name="phone" class="mr-2" /> +62*********46
                      </span>
                    </b-row>
                  </b-button>
                </b-col>
              </b-row>
              <div class="text-center my-3">
                <span class="text-body-3">
                  <NuxtLink to="/signin">
                    Return to lognin
                  </NuxtLink>
                </span>
              </div>
            </div>
          </div>

          <!--section code by-email-->
          <div v-if="showEnterCodeByEmail" class="section-code-by-email">
            <div class="text-center">
              <h2 class="card-title mt-2">{{ $t('forgetPasswordTitle')}}</h2>
              <span class="text-body-3">{{ $t('enterCodeByEmailWording',[`${email}`])}}</span>
            </div>
            <div class="auth-form my-4">
              <form ref="form" @submit.stop.prevent="onVerifyCode">
                <div class="form-row">

                  <div class="form-group col-8">
                    <label for="phone-input">{{ $t('labelVerifyCode')}}</label>
                    <b-form-input id="phone-input" v-model="$v.codeNumber.$model" name="phone" type="text"
                      :state="validateState('codeNumber')" aria-describedby="input-phone-feedback"
                      placeholder="0000000">
                    </b-form-input>
                    <span v-if="$v.codeNumber.$invalid == false" class="input-isvalid text-body-5">Success</span>
                    <b-form-invalid-feedback v-if="$v.codeNumber.$error" id="input-email-feedback" class="text-body-5">
                      <span v-if="!$v.codeNumber.required">{{ $t('errorRequire', ['Code']) }}</span>
                      <span v-if="!$v.codeNumber.numeric">{{ $t('errorFormat', ['Code', 'numeric']) }}</span>
                      <span v-if="!$v.codeNumber.minLength || !$v.codeNumber.maxLength">
                        {{
                        $t('errorcodeLength',
                        ['Code',$v.codeNumber.$params.maxLength.max])
                        }}
                      </span>
                    </b-form-invalid-feedback>
                  </div>

                  <div class="form-group col-4">
                    <label for="phone-code">&nbsp;</label>
                    <b-button block variant="outline-secondary" class="btn-flag">
                      Get Code
                    </b-button>
                  </div>
                </div>
                <b-button type="submit" class="mt-3" block>Confirm</b-button>
              </form>
            </div>
          </div>


        </div>
      </div>
    </div>


    <!--modal email-->
    <b-modal id="bv-modal-email" ref="modal" centered :title="$t('resetByEmailWording')" hide-footer>
      <form ref="form" @submit.stop.prevent="onResetByEmail">
        <b-form-group id="email-input-group" :label="`${$t('labelInputEmail')}`" label-for="email-input">
          <b-form-input id="email-input" v-model="$v.email.$model" name="email" type="email"
            :state="validateState('email')" aria-describedby="input-email-feedback"
            :placeholder="`${$t('placeholderInputEmail')}`"></b-form-input>
          <span v-if="$v.email.$invalid == false" class="input-isvalid text-body-5">Success</span>
          <b-form-invalid-feedback v-if="$v.email.$error" id="input-email-feedback" class="text-body-5">
            <span v-if="!$v.email.required">{{ $t('errorRequire', ['Email']) }}</span>
            <span v-if="!$v.email.email"> {{ $t('errorFormat', ['Email','email']) }}</span>
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" class="mt-3" block>{{ $t('resetPassworBtn') }}</b-button>
      </form>
    </b-modal>
    <!--modal phone-->
    <b-modal id="bv-modal-phone" ref="modal" centered :title="$t('resetByPhoneWording')" hide-footer>
      <form ref="form" @submit.stop.prevent="onResetByPhone">
        <div class="form-row">
          <div class="form-group col-4">
            <label for="phone-code">{{ `${$t('labelInputPhone')}` }}</label>
            <b-button block variant="outline-secondary" class="btn-flag">
              <span> 🇮🇩 </span>+62
            </b-button>
          </div>
          <div class="form-group col-8">
            <label for="phone-input">&nbsp;</label>
            <b-form-input id="phone-input" v-model="$v.phoneNumber.$model" name="phone" type="text"
              :state="validateState('phoneNumber')" aria-describedby="input-phone-feedback"
              :placeholder="`${$t('placeholderInputPhone')}`">
            </b-form-input>
            <span v-if="$v.phoneNumber.$invalid == false" class="input-isvalid text-body-5">Success</span>
            <b-form-invalid-feedback v-if="$v.phoneNumber.$error" id="input-email-feedback" class="text-body-5">
              <span v-if="!$v.phoneNumber.required">{{ $t('errorRequire', ['Phone']) }}</span>
              <span v-if="!$v.phoneNumber.numeric">{{ $t('errorFormat', ['Phone', 'numeric']) }}</span>
              <span v-if="!$v.phoneNumber.minLength || !$v.phoneNumber.maxLength">
                {{
                $t('errorPhoneLength',
                ['Phone', $v.phoneNumber.$params.minLength.min, $v.phoneNumber.$params.maxLength.max])
                }}
              </span>
            </b-form-invalid-feedback>
          </div>
        </div>
        <b-button type="submit" class="mt-3" block>{{ $t('resetPassworBtn') }}</b-button>
      </form>
    </b-modal>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, numeric,  minLength, maxLength } from 'vuelidate/lib/validators'
// import CustomIcon from '@/components/CustomIcon';
export default {
  name: 'ForgetPasswordPage',
  // components: {
  //   CustomIcon
  // },
  mixins: [validationMixin],
  data() {
    return {
      showEnterCodeByEmail: false,
      showEnterCodeByPhone: false,

      email: 'email@dasdsa.ss',
      phoneNumber: '',

      codeNumber:'',
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    phoneNumber: { required, numeric, minLength: minLength(10), maxLength: maxLength(14), },
    codeNumber: { required, numeric, minLength: minLength(6), maxLength: maxLength(6), },
  },
  methods: {
    validateState(email) {
      const { $dirty, $error } = this.$v[email]
      return $dirty ? !$error : null
    },

    resetForm() {
      this.email= null;
      this.phoneNumber = null;

      this.$nextTick(() => {
        this.$v.$reset()
      })
    },
    onResetByEmail() {
      alert('reset email');
      this.$v.email.$touch()
      console.log(this.$v.email);
      if (this.$v.$anyError) {
        return
      }
      this.$nextTick(() => {
        this.$bvModal.hide('bv-modal-email')
      })
      this.showEnterCodeByEmail=true;
    },
    onResetByPhone() {
      alert('reset phone');
      this.$v.phoneNumber.$touch()
      console.log(this.$v.phoneNumber);
      if (this.$v.$anyError) {
        return
      }
      alert('Form submitted!')
    },

    onVerifyCode(){
      this.$v.codeNumber.$touch()
      console.log(this.$v.codeNumber);
      if (this.$v.$anyError) {
        return
      }
      alert('Form submitted!')
    }
  },
}
</script>
