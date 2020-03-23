import { I18n } from '@aws-amplify/core';

export function StringNullOrEmptyValidation(formData) {
  console.log(formData);
  const violation= [];
  /* Check name field */
  if (formData.name.length <= 2) {
    return [false, I18n.get('Name')];
  }
  /* verify email */
  if (formData.email.length <= 6) {
    return [false, I18n.get('Email')];
  }
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(re.test(String(formData.email).toLowerCase()));
  if (!re.test(String(formData.email).toLowerCase())) {
    return [false, I18n.get('Email')];
  }
  /* Verify gender */
  if (formData.gender === null) {
    return [false, I18n.get('Gender')];
  }
  /* Verify password */
  if (formData.password.length <= 1 || formData.confirmPassword.length <= 1) {
    return [false, I18n.get('Password')];
  }
  if (formData.password !== formData.confirmPassword) {
    return [false, I18n.get('Password')];
  }
  return [true, null];
}

export const idGenerator = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};
