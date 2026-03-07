import React, { useState } from 'react';
import {
	View,
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	TextInput as RNTextInput,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/common/Icon';
import { CHANGE_PASSWORD } from '../../graphql/mutations/resetPassword.mutation';
import { ChangePasswordResponse, ResetPasswordInput } from '../../graphql/interfaces/pages/authen.interface';
import useAuth from '../../hooks/useAuth';
import useApolloMutationWrapper from '../../hooks/useApolloMutationWrapper';

const ChangePasswordPage = ({ navigation }: any) => {
	const { t } = useTranslation();
	const { user } = useAuth();
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

	const PasswordField = ({
		label,
		value,
		onChangeText,
		showPassword,
		onTogglePassword,
		placeholder,
	}: any) => (
		<View style={styles.fieldContainer}>
			<Text style={styles.fieldLabel}>{label}</Text>
			<View style={styles.inputWrapper}>
				<RNTextInput
					style={styles.input}
					secureTextEntry={!showPassword}
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor="#999"
				/>
				<TouchableOpacity
					style={styles.iconButton}
					onPress={onTogglePassword}
				>
					<Icon
						name={showPassword ? 'eye-off' : 'eye'}
						size={20}
						color="#0066CC"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Icon name="chevron-left" size={28} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>{t('changePassword.title')}</Text>
				<View style={{ width: 28 }} />
			</View>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{/* Header Section */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Icon name="lock" size={24} color="#0066CC" />
						<Text style={styles.sectionTitle}>{t('changePassword.title')}</Text>
					</View>
					<Text style={styles.subtitle}>{t('changePassword.subtitle')}</Text>
				</View>

				{/* Form Section */}
				<View style={styles.formSection}>
					{/* Current Password */}
					<PasswordField
						label={t('changePassword.currentPassword')}
						value={currentPassword}
						onChangeText={setCurrentPassword}
						showPassword={showCurrentPassword}
						onTogglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
						placeholder="••••••••"
					/>

					{/* New Password */}
					<PasswordField
						label={t('changePassword.newPassword')}
						value={newPassword}
						onChangeText={setNewPassword}
						showPassword={showNewPassword}
						onTogglePassword={() => setShowNewPassword(!showNewPassword)}
						placeholder="••••••••"
					/>

					{/* Confirm Password */}
					<PasswordField
						label={t('changePassword.confirmPassword')}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						showPassword={showConfirmPassword}
						onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
						placeholder="••••••••"
					/>

					{/* Password Requirements */}
					<View style={styles.requirementsCard}>
						<Text style={styles.requirementsTitle}>Password Requirements:</Text>
						<View style={styles.requirementItem}>
							<Icon
								name={newPassword.length >= 8 ? 'check-circle' : 'circle-outline'}
								size={16}
								color={newPassword.length >= 8 ? '#4CAF50' : '#ccc'}
							/>
							<Text style={[
								styles.requirementText,
								{ color: newPassword.length >= 8 ? '#333' : '#999' }
							]}>
								At least 8 characters
							</Text>
						</View>
						<View style={styles.requirementItem}>
							<Icon
								name={newPassword === confirmPassword && newPassword !== '' ? 'check-circle' : 'circle-outline'}
								size={16}
								color={newPassword === confirmPassword && newPassword !== '' ? '#4CAF50' : '#ccc'}
							/>
							<Text style={[
								styles.requirementText,
								{ color: newPassword === confirmPassword && newPassword !== '' ? '#333' : '#999' }
							]}>
								Passwords match
							</Text>
						</View>
					</View>
				</View>

				{/* Actions */}
				<View style={styles.actions}>
					<TouchableOpacity
						style={[
							styles.button,
							styles.submitButton,
							loading && styles.buttonDisabled
						]}
						onPress={handleReset}
						disabled={loading}
					>
						<Icon name="check" size={20} color="#fff" />
						<Text style={styles.buttonText}>{t('changePassword.button')}</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.cancelButton]}
						onPress={() => navigation.goBack()}
					>
						<Icon name="close" size={20} color="#666" />
						<Text style={[styles.buttonText, { color: '#666' }]}>{t('common.cancel')}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
	},
	content: {
		flex: 1,
		padding: 16,
	},
	section: {
		marginBottom: 24,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	sectionHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#000',
		marginLeft: 12,
	},
	subtitle: {
		fontSize: 14,
		color: '#666',
		marginTop: 8,
	},
	formSection: {
		marginBottom: 24,
	},
	fieldContainer: {
		marginBottom: 20,
	},
	fieldLabel: {
		fontSize: 14,
		fontWeight: '600',
		color: '#000',
		marginBottom: 8,
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#ddd',
		paddingHorizontal: 12,
	},
	input: {
		flex: 1,
		paddingVertical: 12,
		fontSize: 16,
		color: '#000',
	},
	iconButton: {
		padding: 8,
	},
	requirementsCard: {
		backgroundColor: '#f9f9f9',
		borderRadius: 12,
		padding: 16,
		marginTop: 16,
		borderLeftWidth: 4,
		borderLeftColor: '#0066CC',
	},
	requirementsTitle: {
		fontSize: 14,
		fontWeight: '600',
		color: '#000',
		marginBottom: 12,
	},
	requirementItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	requirementText: {
		fontSize: 13,
		marginLeft: 8,
	},
	actions: {
		marginBottom: 32,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 12,
		marginBottom: 12,
	},
	submitButton: {
		backgroundColor: '#0066CC',
	},
	cancelButton: {
		backgroundColor: '#f0f0f0',
		borderWidth: 1,
		borderColor: '#ddd',
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#fff',
		marginLeft: 8,
	},
});

export default ChangePasswordPage;

