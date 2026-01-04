import { t } from 'i18next';
import React from 'react';
import { View, Image } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import AuthCard from '../../components/common/AuthenCard';
import { authTheme } from '../../theme/authTheme';

export default function EmailSentPage({ navigation }: any) {
	const handleBackToLogin = () => {
		navigation.replace('Login');
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
				{/* 🔝 Icon + Tiêu đề */}
				<IconButton
					icon="email-check-outline"
					size={64}
					iconColor="#0a84ff"
					style={authTheme.iconWrapper}
				/>
				<Text style={authTheme.pageTitle}>{t('emailSent.title')}</Text>
				<Text style={authTheme.subtitle}>
					{t('emailSent.message')}
				</Text>

				{/* 🔘 Nút hành động */}
				<Button
					mode="contained"
					onPress={handleBackToLogin}
					style={authTheme.button}
					contentStyle={{ paddingVertical: 8 }}
				>
					{t('emailSent.backToLogin')}
				</Button>
			</AuthCard>
		</View>
	);
}

