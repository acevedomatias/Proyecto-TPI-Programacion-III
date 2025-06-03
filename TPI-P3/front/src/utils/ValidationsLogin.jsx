

export const validateLogin = (data) => {
  const errors = {};
  if (!data.email.trim()) {
    errors.email = "El email es obligatorio";
  }
  if (!data.password.trim()) {
    errors.password = "La contraseña es obligatoria";
  }
  return errors;
};