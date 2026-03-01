import * as yup from 'yup';

/**
 * Shared validation rules
 */
const emailValidation = yup.string().email('Invalid email address').required('Email is required');
const passwordValidation = yup
  .string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required');
const strongPasswordValidation = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .required('Password is required');

/**
 * Login validation schema
 */
export const loginValidationSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  remember: yup.boolean(),
});

export type LoginFormData = yup.InferType<typeof loginValidationSchema>;

/**
 * Sign up validation schema
 */
export const signupValidationSchema = yup.object().shape({
  name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: emailValidation,
  password: strongPasswordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  agreeTerms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

export type SignupFormData = yup.InferType<typeof signupValidationSchema>;

/**
 * Forgot password validation schema
 */
export const forgotPasswordValidationSchema = yup.object().shape({
  email: emailValidation,
});

export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordValidationSchema>;

/**
 * Reset password validation schema
 */
export const resetPasswordValidationSchema = yup.object().shape({
  token: yup.string().required('Reset token is required'),
  newPassword: strongPasswordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordValidationSchema>;

/**
 * Change password validation schema
 */
export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: strongPasswordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

export type ChangePasswordFormData = yup.InferType<typeof changePasswordValidationSchema>;
