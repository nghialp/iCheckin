import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client/react';
import { UPDATE_NOTIFICATION_SETTINGS_MUTATION } from '../../graphql/mutations';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import useAuth from '../../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackNavigationProp<RootStackParamList, 'Notifications'>;

interface NotificationsScreenProps {
  navigation: Props;
}

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    pushNotifications: user?.notificationSettings?.pushNotifications ?? true,
    emailNotifications: user?.notificationSettings?.emailNotifications ?? true,
    smsNotifications: user?.notificationSettings?.smsNotifications ?? false,
    promotions: user?.notificationSettings?.promotions ?? true,
    updates: user?.notificationSettings?.updates ?? true,
    reminders: user?.notificationSettings?.reminders ?? true,
  });

  const [updateSettings, { loading }] = useMutation(UPDATE_NOTIFICATION_SETTINGS_MUTATION);

  const handleSave = async () => {
    try {
      const result = await updateSettings({
        variables: { input: settings },
      });

      if ((result.data as any)?.updateNotificationSettings?.success) {
        Alert.alert(t('notifications.success'), t('notifications.settingsUpdated'));
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert(t('notifications.error'), error.message || t('notifications.saveFailed'));
    }
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('notifications.title')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('notifications.chanelTitle')}</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="bell" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('notifications.push')}</Text>
                <Text style={styles.settingDesc}>{t('notifications.pushDesc')}</Text>
              </View>
            </View>
            <Switch
              value={settings.pushNotifications}
              onValueChange={() => toggleSetting('pushNotifications')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="email" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('notifications.email')}</Text>
                <Text style={styles.settingDesc}>{t('notifications.emailDesc')}</Text>
              </View>
            </View>
            <Switch
              value={settings.emailNotifications}
              onValueChange={() => toggleSetting('emailNotifications')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="message-text" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('notifications.sms')}</Text>
                <Text style={styles.settingDesc}>{t('notifications.smsDesc')}</Text>
              </View>
            </View>
            <Switch
              value={settings.smsNotifications}
              onValueChange={() => toggleSetting('smsNotifications')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>
        </View>

        {/* Detailed Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('notifications.contentTitle')}</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="gift" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('notifications.promotions')}</Text>
              </View>
            </View>
            <Switch
              value={settings.promotions}
              onValueChange={() => toggleSetting('promotions')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="star" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('notifications.updates')}</Text>
              </View>
            </View>
            <Switch
              value={settings.updates}
              onValueChange={() => toggleSetting('updates')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Icon name="alarm" size={24} color="#0066CC" style={styles.icon} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{t('notifications.reminders')}</Text>
              </View>
            </View>
            <Switch
              value={settings.reminders}
              onValueChange={() => toggleSetting('reminders')}
              trackColor={{ false: '#ccc', true: '#81C784' }}
            />
          </View>
        </View>

        {/* Warning if all disabled */}
        {!settings.pushNotifications && !settings.emailNotifications && !settings.smsNotifications && (
          <View style={styles.warningBox}>
            <Icon name="alert-circle" size={20} color="#FF9800" />
            <Text style={styles.warningText}>{t('notifications.disabledWarning')}</Text>
          </View>
        )}
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, loading && { opacity: 0.5 }]}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? t('notifications.saving') : t('notifications.save')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  settingDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  warningBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  warningText: {
    fontSize: 13,
    color: '#FF9800',
    marginLeft: 8,
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
