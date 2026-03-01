import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Card, TextInput, Button, Text, IconButton } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client/react';
import { FORGOT_PASSWORD_MUTATION } from '../../graphql/mutations';
import { forgotPasswordValidationSchema, ForgotPasswordFormData } from '../../utils/validationSchemas';

type ForgotPasswordResponse = {
  forgotPassword: {
    success: boolean;
    message: string;
  };
};

export default function ForgotPasswordScreen({ navigation }: any) {
  const [forgotMutation, { loading, error: gqlError }] = useMutation<ForgotPasswordResponse>(FORGOT_PASSWORD_MUTATION);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordValidationSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const res = await forgotMutation({
        variables: { email: data.email },
      });
      if (res.data?.forgotPassword?.success) {
        setSuccess(true);
        resetField('email');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
    }
  };

  if (success) {
    return (
      <View style={styles.screen}>
        <View style={styles.headerContainer}>
          <Text style={styles.appTitle}>Use Check-in</Text>
          <Text style={styles.appSubtitle}>Ui Kit</Text>
        </View>

        <View style={styles.cardWrapper}>
          <Card style={styles.card} mode="elevated">
            <Card.Content style={styles.cardContent}>
              <Text style={{ fontSize: 24, fontWeight: '700', color: '#0B4A8B', marginBottom: 12 }}>
                ✓ Check Your Email
              </Text>
              <Text style={{ marginBottom: 12, color: '#666' }}>
                We've sent password reset instructions to your email. Please check your inbox and follow the link to reset your password.
              </Text>
              <Button
                mode="contained"
                onPress={() => navigation?.navigate?.('Login')}
                contentStyle={styles.loginBtnContent}
                style={styles.loginBtn}
                uppercase
              >
                Back to Login
              </Button>
            </Card.Content>
          </Card>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.appTitle}>Use Check-in</Text>
        <Text style={styles.appSubtitle}>Ui Kit</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardWrapper}>
          <Card style={styles.card} mode="elevated">
            <Card.Content style={styles.cardContent}>
              <Text style={styles.loginTitle}>Forgot Password?</Text>
              <Text style={{ marginBottom: 16, color: '#666' }}>
                Enter your email address and we'll send you a link to reset your password.
              </Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      label="Email"
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                      outlineStyle={styles.inputOutline}
                      contentStyle={{ height: 48 }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={!loading}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                  </>
                )}
              />

              {gqlError && <Text style={styles.errorText}>Failed to send reset email. Please try again.</Text>}

              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                disabled={loading}
                contentStyle={styles.loginBtnContent}
                style={styles.loginBtn}
                uppercase
              >
                Send Reset Link
              </Button>

              <TouchableOpacity onPress={() => navigation?.navigate?.('Login')}>
                <Text style={styles.backLink}>Back to Login</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <IconButton icon="arrow-left" size={20} onPress={() => navigation?.goBack?.()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFBEA', alignItems: 'center', justifyContent: 'center' },
  headerContainer: { alignItems: 'center', marginTop: 24 },
  appTitle: { fontSize: 32, fontWeight: '700', color: '#0B4A8B' },
  appSubtitle: { fontSize: 16, color: '#2d9bf0', marginTop: 4 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', width: '100%' },
  cardWrapper: { width: '86%', maxWidth: 420, alignSelf: 'center', marginVertical: 20 },
  card: { borderRadius: 28, backgroundColor: '#FFF7E6' },
  cardContent: { alignItems: 'center', paddingVertical: 32 },
  loginTitle: { fontSize: 28, fontWeight: '700', color: '#0B4A8B', marginBottom: 12 },
  input: { width: '100%', marginBottom: 8, backgroundColor: 'transparent' },
  inputOutline: { borderRadius: 12 },
  errorText: { color: '#E53935', fontSize: 12, marginBottom: 12, alignSelf: 'flex-start', marginLeft: 4 },
  loginBtn: { width: '72%', borderRadius: 30, elevation: 2, marginTop: 12 },
  loginBtnContent: { height: 48, backgroundColor: '#07A35A' },
  backLink: { color: '#0B4A8B', marginTop: 12, fontWeight: '600', textDecorationLine: 'underline' },
  footer: { position: 'absolute', bottom: 24, alignSelf: 'center' },
});
