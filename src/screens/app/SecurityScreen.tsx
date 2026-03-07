import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/common/Icon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import { styles } from '../../styles/screens/SecurityScreen.styles';

type Props = NativeStackNavigationProp<RootStackParamList, 'Security'>;

interface SecurityScreenProps {
  navigation: Props;
}

export default function SecurityScreen({ navigation }: SecurityScreenProps) {
  const { t } = useTranslation();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword' as any);
  };

  const handleEnable2FA = async () => {
    if (!twoFactorEnabled) {
      Alert.alert(
        t('security.twoFactorAuth'),
        t('security.twoFactorAuthConfirm'),
        [
          {
            text: t('common.cancel'),
            onPress: () => setTwoFactorEnabled(false),
            style: 'cancel',
          },
          {
            text: t('common.confirm'),
            onPress: () => {
              setTwoFactorEnabled(true);
              Alert.alert(t('common.success'), t('security.twoFactorAuthEnabled'));
            },
          },
        ]
      );
    } else {
      setTwoFactorEnabled(false);
    }
  };

  const handleEnableBiometric = () => {
    setBiometricEnabled(!biometricEnabled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('security.title')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Password Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="lock" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('security.changePassword')}</Text>
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={handleChangePassword}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{t('security.changePassword')}</Text>
              <Text style={styles.cardDescription}>
                {t('security.changePasswordHint')}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Two-Factor Authentication */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="shield-check" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('security.twoFactorAuth')}</Text>
          </View>
          <View style={styles.settingCard}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('security.twoFactorAuth')}</Text>
              <Text style={styles.settingDescription}>
                {t('security.twoFactorAuthHint')}
              </Text>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={handleEnable2FA}
              trackColor={{ false: '#d3d3d3', true: '#81c784' }}
              thumbColor={twoFactorEnabled ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Login Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="bell-alert" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('security.loginAlerts')}</Text>
          </View>
          <View style={styles.settingCard}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('security.loginAlerts')}</Text>
              <Text style={styles.settingDescription}>
                {t('security.loginAlertsHint')}
              </Text>
            </View>
            <Switch
              value={loginAlertsEnabled}
              onValueChange={setLoginAlertsEnabled}
              trackColor={{ false: '#d3d3d3', true: '#81c784' }}
              thumbColor={loginAlertsEnabled ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Biometric Authentication */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="fingerprint" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('security.biometricAuth')}</Text>
          </View>
          <View style={styles.settingCard}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('security.biometricAuth')}</Text>
              <Text style={styles.settingDescription}>
                {t('security.biometricAuthHint')}
              </Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleEnableBiometric}
              trackColor={{ false: '#d3d3d3', true: '#81c784' }}
              thumbColor={biometricEnabled ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Active Sessions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="devices" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('security.activeSessions')}</Text>
          </View>
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{t('security.manageActiveSessions')}</Text>
              <Text style={styles.cardDescription}>
                {t('security.activeSessionsHint')}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Security Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="lightbulb" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('security.securityTips')}</Text>
          </View>
          <View style={styles.tipCard}>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>{t('security.tip1')}</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>{t('security.tip2')}</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>{t('security.tip3')}</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.tipText}>{t('security.tip4')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}