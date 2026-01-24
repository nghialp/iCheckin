import React, { useState } from 'react';
import { View, Alert, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useMutation } from '@apollo/client/react';
import { RESET_PASSWORD_MUTATION } from '../../graphql/mutations/resetPassword.mutation';
import { ResetPasswordResponse, ResetPasswordVariables } from '../../graphql/types/resetPassword';
import { t } from 'i18next';
import { authTheme } from '../../theme/authTheme';

export default function ChangePasswordPage({ navigation }: any) {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [resetPassword, { loading }] = useMutation<ResetPasswordResponse, ResetPasswordVariables>(RESET_PASSWORD_MUTATION);

	const handleReset = async () => {
		if (!newPassword || !currentPassword || !confirmPassword) {
			Alert.alert('Error', 'Please fill in all fields');
			return;
		}
		if (newPassword !== confirmPassword) {
			Alert.alert('Error', t('changePassword.errorMessage'));
			return;
		}

		try {
			const res = await resetPassword({ variables: { newPassword } });
			if (res.data?.success) {
				Alert.alert('Success', res.data?.message);
				navigation.replace('Home');
			} else {
				Alert.alert('Error', res.data?.message);
			}
		} catch (err) {
			Alert.alert('Error', 'An error occurred while resetting the password.');
		}
	};

	const onConfirmPassword = (confirmPassword: string) => {
		setConfirmPassword(confirmPassword);
		if (newPassword !== confirmPassword) {
			Alert.alert('Error', 'Passwords do not match');
			return;
		}
	}

	return (
		<View style={authTheme.screen}>
			{/* Tiêu đề */}
			<View style={authTheme.logoWrapper}>
				<Image
					source={require("../../assets/logo.png")}
					style={authTheme.logo}
				/>
			</View>
			{/* 🔝 Tiêu đề */}
			<Text style={authTheme.pageTitle}>{t('resetPassword.title')}</Text>
			<Text style={authTheme.subtitle}>{t('resetPassword.subtitle')}</Text>

			{/* 🔐 Form */}
			<TextInput
				label={t('resetPassword.currentPassword')}
				secureTextEntry
				value={currentPassword}
				onChangeText={setCurrentPassword}
				style={authTheme.input}
				mode="outlined"
			/>
			<TextInput
				label={t('resetPassword.newPassword')}
				secureTextEntry
				value={newPassword}
				onChangeText={setNewPassword}
				style={authTheme.input}
				mode="outlined"
			/>
			<TextInput
				label={t('resetPassword.confirmPassword')}
				secureTextEntry
				value={confirmPassword}
				onChangeText={onConfirmPassword}
				style={authTheme.input}
				mode="outlined"
			/>

			{/* 🔘 Nút hành động */}
			<Button
				mode="contained"
				onPress={handleReset}
				loading={loading}
				style={authTheme.button}
				contentStyle={{ paddingVertical: 8 }}
			>
				{t('resetPassword.button')}
			</Button>

			{/* 🔙 Link quay lại */}
			<Button
				onPress={() => navigation.navigate('Login')}
				compact
				style={authTheme.backLink}
			>
				{t('login.backToLogin')}
			</Button>
		</View>
	);
}

