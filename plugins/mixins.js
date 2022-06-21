import Vue from 'vue'

const mixin = {
  methods: {
    showPassword() {
      this.hidePassword = !this.hidePassword;
      this.inputTye = this.hidePassword ? 'password' : 'text';
    },
    showPasswordConfirm() {
      this.hidePasswordConfirm = !this.hidePasswordConfirm;
      this.inputTyeConfirm = this.hidePasswordConfirm ? 'password' : 'text';
    },
  }
}

Vue.mixin(mixin)
