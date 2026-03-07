import React, { useState } from 'react';
import { View, Alert, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { CHANGE_PASSWORD } from '../../graphql/mutations/resetPassword.mutation';
import { authTheme } from '../../theme/authTheme';
import { ChangePasswordResponse, ResetPasswordInput } from '../../graphql/interfaces/pages/authen.interface';
import useAuth from '../../hooks/useAuth';
import useApolloMutationWrapper from '../../hooks/useApolloMutationWrapper';

const ChangePasswordPage = ({ navigation }: any) => {
	const { t } = useTranslation();
	const { user } = useAuth();
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const { mutate: resetPassword, loading } = useApolloMutationWrapper<ChangePasswordResponse, ResetPasswordInput>(CHANGE_PASSWORD);

	const handleReset = async () => {
		if (!newPassword || !currentPassword || !confirmPassword) {
			Alert.alert(t('common.error'), t('changePassword.fillAllFields'));
			return;
		}
		if (newPassword.length < 8) {
			Alert.alert(t('common.error'), t('changePassword.passwordTooShort'));
			return;
		}
		if (newPassword !== confirmPassword) {
			Alert.alert(t('common.error'), t('changePassword.passwordMismatch'));
			return;
		}
		if (!user?.id) {
			Alert.alert(t('common.error'), t('changePassword.userNotFound'));
			return;
		}

		try {
			const res = await resetPassword({ userId: user.id, currentPassword, newPassword });
			if (res.data?.changePassword) {
				Alert.alert(t('common.success'), t('changePassword.successMessage'));
				navigation.replace('Home');
			} else {
				Alert.alert(t('common.error'), t('changePassword.failedMessage'));
			}
		} catch (err) {
			Alert.alert(t('common.error'), t('changePassword.errorMessage'));
		}
	};

	const onConfirmPassword = (confirmPassword: string) => {
		setConfirmPassword(confirmPassword);
		if (newPassword && newPassword !== confirmPassword) {
			// Validation happens in handleReset, no need to show alert on every keystroke
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
			<Text style={authTheme.pageTitle}>{t('changePassword.title')}</Text>
			<Text style={authTheme.subtitle}>{t('changePassword.subtitle')}</Text>

			{/* 🔐 Form */}
			<TextInput
				label={t('changePassword.currentPassword')}
				secureTextEntry={!showPassword}
				value={currentPassword}
				onChangeText={setCurrentPassword}
				style={authTheme.input}
				mode="outlined"
			/>
			<TextInput
				label={t('changePassword.newPassword')}
				secureTextEntry={!showPassword}
				value={newPassword}
				onChangeText={setNewPassword}
				style={authTheme.input}
				mode="outlined"
			/>
			<TextInput
				label={t('changePassword.confirmPassword')}
				secureTextEntry={!showPassword}
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
				{t('changePassword.button')}
			</Button>

			{/* 🔙 Link quay lại */}
			<Button
				onPress={() => navigation.goBack()}
				compact
				style={authTheme.backLink}
			>
				{t('common.back')}
			</Button>
		</View>
	);
};

export default ChangePasswordPage;

