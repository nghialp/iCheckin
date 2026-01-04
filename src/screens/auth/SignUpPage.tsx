// src/screens/SignUpPage.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authTheme } from '../../theme/authTheme';
import AuthCard from '../../components/common/AuthenCard';
import { t } from 'i18next';
import useAuth from '../../hooks/useAuth';

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
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export default function SignUpPage({ navigation }: any) {
  const { signUp, loading, error, clearError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
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
        {error && <Text style={authTheme.errorText}>{String(error.message || error)}</Text>}
        {/* Form đăng ký */}

        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t('signUp.fullName')}
              value={value}
              onChangeText={(text) => {
                onChange(text);
                clearError();
              }}
              onBlur={onBlur}
              style={authTheme.input}
              outlineStyle={authTheme.inputOutline}
              contentStyle={{ height: 48 }}
              error={!!errors.fullName}
              underlineColorAndroid="#0066CC"
            />
          )}
        />
        {errors.fullName && <Text style={authTheme.fieldError}>{errors.fullName.message}</Text>}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t('signUp.email')}
              value={value}
              onChangeText={(text) => {
                onChange(text);
                clearError();
              }}
              onBlur={onBlur}
              style={authTheme.input}
              outlineStyle={authTheme.inputOutline}
              contentStyle={{ height: 48 }}
              keyboardType="email-address"
              autoCapitalize="none"
              error={!!errors.email}
              underlineColorAndroid="#0066CC"
            />
          )}
        />
        {errors.email && <Text style={authTheme.fieldError}>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t('signUp.password')}
              secureTextEntry
              value={value}
              onChangeText={(text) => {
                onChange(text);
                clearError();
              }}
              onBlur={onBlur}
              style={authTheme.input}
              outlineStyle={authTheme.inputOutline}
              contentStyle={{ height: 48 }}
              error={!!errors.password}
              underlineColorAndroid="#0066CC"
            />
          )}
        />
        {errors.password && <Text style={authTheme.fieldError}>{errors.password.message}</Text>}

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Confirm Password"
              secureTextEntry
              value={value}
              onChangeText={(text) => {
                onChange(text);
                clearError();
              }}
              onBlur={onBlur}
              style={authTheme.input}
              outlineStyle={authTheme.inputOutline}
              contentStyle={{ height: 48 }}
              error={!!errors.confirmPassword}
              underlineColorAndroid="#0066CC"
            />
          )}
        />
        {errors.confirmPassword && <Text style={authTheme.fieldError}>{errors.confirmPassword.message}</Text>}

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

