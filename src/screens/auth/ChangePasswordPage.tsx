import React, { useState } from 'react';
import { View, Alert, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { CHANGE_PASSWORD } from '../../graphql/mutations/resetPassword.mutation';
import { authTheme } from '../../theme/authTheme';
import { ChangePasswordResponse, ResetPasswordInput } from '../../graphql/interfaces/pages/authen.interface';
import useAuth from '../../hooks/useAuth';
import useApolloMutationWrapper from '../../hooks/useApolloMutationWrapper';

const ChangePasswordPage = ({ navigation }: any) => {
	const t = require('i18next').t;
	const { user } = useAuth();
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { mutate: resetPassword, loading } = useApolloMutationWrapper<ChangePasswordResponse, ResetPasswordInput>(CHANGE_PASSWORD);

	const handleReset = async () => {
		if (!newPassword || !currentPassword || !confirmPassword) {
			Alert.alert('Error', 'Please fill in all fields');
			return;
		}
		if (newPassword !== confirmPassword) {
			Alert.alert('Error', t('changePassword.errorMessage'));
			return;
		}
		if (!user?.id) {
			Alert.alert('Error', 'User not found');
			return;
		}

		try {
			const res = await resetPassword({ userId: user.id, currentPassword, newPassword });
			if (res.data?.changePassword) {
				Alert.alert('Success', 'Password changed successfully');
				navigation.replace('Home');
			} else {
				Alert.alert('Error', 'Failed to change password');
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
};

export default ChangePasswordPage;

