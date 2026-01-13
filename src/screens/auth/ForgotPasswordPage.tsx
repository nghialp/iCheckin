import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { t } from 'i18next';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client/react';
import { FORGOT_PASSWORD_MUTATION } from '../../graphql/queries/forgotPassword';
import { ForgotPasswordResponse, ForgotPasswordVariables } from '../../graphql/types/forgotPassword';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import AuthCard from '../../components/common/AuthenCard';
import { authTheme, colors } from '../../theme/authTheme';
import InputField from '../../components/common/InputField';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const [forgotPassword] = useMutation<ForgotPasswordResponse, ForgotPasswordVariables>(FORGOT_PASSWORD_MUTATION);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSendInstructions = async () => {
    if (!validateEmail(email)) {
      return;
    }
    
    try {
      const res = await forgotPassword({ variables: { email } });
      if (res.data?.success) {
        Alert.alert('Success', res.data?.message);
        navigation.replace('EmailSent');
      } else {
        Alert.alert('Error', res.data?.message);
      }
    } catch (err) {
      Alert.alert('Error', 'An error occurred while sending reset instructions.');
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
        <Text style={authTheme.pageTitle}>{t('forgotPassword.title')}</Text>
        <Text style={authTheme.subtitle}>
          {t('forgotPassword.instruction')}
        </Text>
        
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(text) => {
            setEmail(text);
            if (emailError) {
              validateEmail(text);
            }
          }}
          required
          error={emailError}
        />

        <TouchableOpacity style={authTheme.button} onPress={handleSendInstructions}>
          <Text style={authTheme.buttonText}>{t('forgotPassword.button')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation?.navigate?.('Login')}>
          <Text style={authTheme.link}>
            {t('forgotPassword.rememberPassword')} <Text style={{ color: colors.primary, fontWeight: '600' }}>{t('forgotPassword.backToLogin')}</Text>
          </Text>
        </TouchableOpacity>
      </AuthCard>
    </View>
  );
}

