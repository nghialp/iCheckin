import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authTheme } from '../../theme/authTheme';
import AuthCard from '../../components/common/AuthenCard';
import { t } from 'i18next';
import useAuth from '../../hooks/useAuth';
import InputField from '../../components/common/InputField';

type SignUpFormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export default function SignUpPage({ navigation }: any) {
  const { signUp, loading, errors, clearError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors},
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange", 
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Clear error khi unmount (user rời khỏi trang)
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const onSubmit = async (data: SignUpFormData) => {
    const res = await signUp(data.fullName, data.email, data.password);
    if (res) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={authTheme.screen}>
      <AuthCard>
        {/* Tiêu đề */}
        <View style={authTheme.logoWrapper}>
          <Image
            source={require("../../assets/logo.png")}
            style={authTheme.logo}
          />
        </View>
        <Text style={authTheme.pageTitle}>{t('signUp.title')}</Text>
        <Text style={authTheme.subtitle}>{t('signUp.subtitle')}</Text>
        
        {/* Form đăng ký */}
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <InputField
              label={t('signUp.fullName')}
              type="text"
              value={value}
              onChange={(text) => {
                onChange(text);
                clearError();
              }}
              error={errors?.fullName?.message || formErrors.fullName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputField
              label={t('signUp.email')}
              type="email"
              value={value}
              onChange={(text) => {
                onChange(text);
                clearError();
              }}
              error={errors?.email?.message || formErrors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputField
              label={t('signUp.password')}
              type="password"
              value={value}
              onChange={(text) => {
                onChange(text);
                clearError();
              }}
              error={errors?.password?.message || formErrors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Confirm Password"
              type="password"
              value={value}
              onChange={(text) => {
                onChange(text);
                clearError();
              }}
              error={formErrors.confirmPassword?.message}
            />
          )}
        />

        {/* Nút Create Account */}
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          style={authTheme.button}
          uppercase
        >
          {t('signUp.button')}
        </Button>

        {/* Chính sách sử dụng */}
        <Text style={authTheme.policyText}>
          By signing up, you agree to our{' '}
          <Text style={authTheme.policyLink}>Terms of Service</Text> and{' '}
          <Text style={authTheme.policyLink}>Privacy Policy</Text>.
        </Text>
      </AuthCard>

    </View>
  );
}

