

export const validatePassword = (password) => {
  const minLength = /.{8,}/;
  const hasUpperCase = /[A-Z]/;
  const hasNumber = /[0-9]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!minLength.test(password)) {
    return "Password must be at least 8 characters long.";
  }
  if (!hasUpperCase.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!hasNumber.test(password)) {
    return "Password must contain at least one number.";
  }
  if (!hasSpecialChar.test(password)) {
    return "Password must contain at least one special character.";
  }
  if (looksLikeEmail.test(password)) {
    return "Password must not look like an email address.";
  }

  return null; // valid
};

export const sanitize = (text) => {
  return text.trim().replace(/[<>&"'`]/g, "");
};
export default {};
