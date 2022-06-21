export const showPassword = () => {
  this.hidePassword = !this.hidePassword;
  this.inputTye = this.hidePassword ? 'password' : 'text';
}

