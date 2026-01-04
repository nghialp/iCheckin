import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import AuthCard from '../../components/common/AuthenCard';
import { authTheme } from '../../theme/authTheme';

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
  const { login, loading, error, clearError } = useAuth();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
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
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label={t('login.email')}
              value={value}
              onChangeText={(text) => {
                onChange(text);
                clearError(); // Clear error khi user bắt đầu nhập lại
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
              label={t('login.password')}
              secureTextEntry
              value={value}
              onChangeText={(text) => {
                onChange(text);
                clearError(); // Clear error khi user bắt đầu nhập lại
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

      {error ? <Text style={authTheme.errorText}>{String(error.message || error)}</Text> : null}
    </View>
  );
}

