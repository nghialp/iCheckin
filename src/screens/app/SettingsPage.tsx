import React from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { Appbar, List, Divider, Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import { useLanguageSwitcher } from '../../hooks/useLanguageSwitcher';

export default function SettingsPage() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { language, switchLanguage } = useLanguageSwitcher();

  const handleLogout = () => {
    Alert.alert(
      t('settings.logoutTitle'),
      t('settings.logoutMessage'),
      [
        { text: t('settings.cancel'), style: 'cancel' },
        {
          text: t('settings.logout'),
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={t('settings.title')} />
      </Appbar.Header>

      <View style={styles.content}>
        {/* Language Section */}
        <List.Section>
          <List.Subheader>{t('settings.language')}</List.Subheader>
          <View style={styles.languageRow}>
            <TouchableOpacity
              style={[styles.languageButton, language === 'vi' && styles.languageButtonActive]}
              onPress={() => switchLanguage('vi')}
            >
              <Text style={[styles.languageText, language === 'vi' && styles.languageTextActive]}>
                🇻🇳 Tiếng Việt
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.languageButton, language === 'en' && styles.languageButtonActive]}
              onPress={() => switchLanguage('en')}
            >
              <Text style={[styles.languageText, language === 'en' && styles.languageTextActive]}>
                🇺🇸 English
              </Text>
            </TouchableOpacity>
          </View>
        </List.Section>

        <Divider />

        {/* Account Section */}
        <List.Section>
          <List.Subheader>{t('settings.account')}</List.Subheader>
          <List.Item
            title={t('settings.changePassword')}
            description={t('settings.changePasswordDesc')}
            left={(props) => <List.Icon {...props} icon="lock" />}
            onPress={() => {
              // Navigate to change password
            }}
          />
          <List.Item
            title={t('settings.profile')}
            description={t('settings.profileDesc')}
            left={(props) => <List.Icon {...props} icon="account" />}
            onPress={() => {
              // Navigate to profile
            }}
          />
        </List.Section>

        <Divider />

        {/* Preferences Section */}
        <List.Section>
          <List.Subheader>{t('settings.preferences')}</List.Subheader>
          <List.Item
            title={t('settings.notifications')}
            description={t('settings.notificationsDesc')}
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => <Switch value={true} onValueChange={() => {}} />}
          />
          <List.Item
            title={t('settings.privacy')}
            description={t('settings.privacyDesc')}
            left={(props) => <List.Icon {...props} icon="shield-account" />}
            right={() => <Switch value={false} onValueChange={() => {}} />}
          />
        </List.Section>

        <Divider />

        {/* About Section */}
        <List.Section>
          <List.Subheader>{t('settings.about')}</List.Subheader>
          <List.Item
            title={t('settings.version')}
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
        </List.Section>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>{t('settings.logout')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  languageRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  languageButtonActive: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  languageText: {
    fontSize: 14,
    color: '#666',
  },
  languageTextActive: {
    color: '#0066CC',
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
  },
});
