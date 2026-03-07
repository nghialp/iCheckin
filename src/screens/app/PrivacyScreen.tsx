import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useApolloMutationWrapper } from '../../hooks/useApolloMutationWrapper';
import { UPDATE_PRIVACY_SETTINGS_MUTATION } from '../../graphql/mutations';
import Icon from '../../components/common/Icon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import { SafeAreaView } from 'react-native-safe-area-context';
import useUserData from '../../hooks/useUserData';
import { styles } from '../../styles/screens/PrivacyScreen.styles';

type Props = NativeStackNavigationProp<RootStackParamList, 'Privacy'>;

interface PrivacyScreenProps {
  navigation: Props;
}

const PrivacyScreen = ({ navigation }: PrivacyScreenProps) => {
  const { t } = useTranslation();
  const { user, updateUserCache } = useUserData();

  const [settings, setSettings] = useState({
    locationAccess: user?.privacySettings?.locationAccess ?? true,
    contactsAccess: user?.privacySettings?.contactsAccess ?? false,
    cameraAccess: user?.privacySettings?.cameraAccess ?? true,
    microphoneAccess: user?.privacySettings?.microphoneAccess ?? false,
    profileVisibility: user?.privacySettings?.profileVisibility ?? 'friends',
    activityStatus: user?.privacySettings?.activityStatus ?? true,
  });

  const { mutate: updateSettings, loading } = useApolloMutationWrapper<any, any>(
    UPDATE_PRIVACY_SETTINGS_MUTATION,
    {
      onCompleted: (data) => {
        // Update global user context with new privacy settings
        if (data?.updatePrivacySettings?.privacySettings) {
          updateUserCache({
            privacySettings: data.updatePrivacySettings.privacySettings,
          });
        }
      },
    }
  );

  const handleSave = async () => {
    try {
      const result = await updateSettings({ input: settings });

      if ((result.data as any)?.updatePrivacySettings?.success) {
        Alert.alert(t('privacy.success'), t('privacy.settingsUpdated'));
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert(t('privacy.error'), error.message || t('privacy.saveFailed'));
    }
  };

  const toggleSetting = (key: string) => {
    setSettings({
      ...settings,
      [key]: !settings[key as keyof typeof settings],
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('privacy.title')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Device Permissions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('privacy.devicePermissions')}</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="map-marker" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('privacy.location')}</Text>
              </View>
            </View>
            <Switch
              value={settings.locationAccess}
              onValueChange={() => toggleSetting('locationAccess')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="contacts" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('privacy.contacts')}</Text>
              </View>
            </View>
            <Switch
              value={settings.contactsAccess}
              onValueChange={() => toggleSetting('contactsAccess')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="camera" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('privacy.camera')}</Text>
              </View>
            </View>
            <Switch
              value={settings.cameraAccess}
              onValueChange={() => toggleSetting('cameraAccess')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="microphone" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('privacy.microphone')}</Text>
              </View>
            </View>
            <Switch
              value={settings.microphoneAccess}
              onValueChange={() => toggleSetting('microphoneAccess')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>
        </View>

        {/* Data Sharing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('privacy.dataSharing')}</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="account-eye" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('privacy.profileVisibility')}</Text>
                <Text style={styles.settingDesc}>{settings.profileVisibility}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.chevron}>
              <Icon name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="check-circle" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('privacy.activityStatus')}</Text>
              </View>
            </View>
            <Switch
              value={settings.activityStatus}
              onValueChange={() => toggleSetting('activityStatus')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('privacy.dataManagement')}</Text>

          <TouchableOpacity style={styles.actionItem}>
            <Icon name="download" size={24} color="#0066CC" style={styles.icon} />
            <Text style={styles.actionLabel}>{t('privacy.downloadData')}</Text>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionItem, { borderTopWidth: 1, borderTopColor: '#f0f0f0' }]}>
            <Icon name="delete" size={24} color="#FF4444" style={styles.icon} />
            <Text style={[styles.actionLabel, { color: '#FF4444' }]}>{t('privacy.deleteData')}</Text>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, loading && { opacity: 0.5 }]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? t('privacy.saving') : t('privacy.save')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default PrivacyScreen;
