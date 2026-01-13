import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import AuthCard from '../../components/common/AuthenCard';
import { authTheme } from '../../theme/authTheme';
import InputField from '../../components/common/InputField';

type LoginFormData = {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default function LoginPage({ navigation }: { navigation: any }) {
  const { login, loading, errors, clearError } = useAuth();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [remember, setRemember] = React.useState(false);

  // Clear error khi unmount (user rời khỏi trang)
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const onSubmit = async (data: LoginFormData) => {
    const res = await login(data.email, data.password, remember);
    if (res) {
      console.debug('Login successful');
    }
  };

  return (
    <View style={authTheme.screen}>
      <AuthCard>
        <View style={authTheme.logoWrapper}>
          <Image
            source={require("../../assets/logo.png")}
            style={authTheme.logo}
          />
        </View>
        <Text style={authTheme.pageTitle}>{t('login.title')}</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputField
              label={t('login.email')}
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
              label={t('login.password')}
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

        <View style={authTheme.row}>
          <TouchableOpacity
            activeOpacity={1}
            style={authTheme.checkboxRow}
            onPress={() => setRemember(!remember)}
          >
            <View style={authTheme.checkbox}>
              {remember && <Text style={authTheme.checkmark}>✓</Text>}
            </View>
            <Text style={authTheme.rememberText}>{t('login.rememberPassword')}</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={authTheme.forgotText}>{t('login.forgotPassword')}</Text>
          </TouchableOpacity>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          style={authTheme.button}
          uppercase
        >
          {t('login.button')}
        </Button>

        <Text style={authTheme.orText}>or</Text>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={authTheme.signupLink}>{t('login.signUp')}</Text>
        </TouchableOpacity>
      </AuthCard>
    </View>
  );
}

