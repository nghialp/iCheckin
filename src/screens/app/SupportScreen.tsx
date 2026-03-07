import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/common/Icon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';

type Props = NativeStackNavigationProp<RootStackParamList, 'Support'>;

interface SupportScreenProps {
  navigation: Props;
}

export default function SupportScreen({ navigation }: SupportScreenProps) {
  const { t } = useTranslation();

  const handleContactSupport = () => {
    Alert.alert(
      t('support.contactUs'),
      t('support.contactUsDesc'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('support.sendMessage'),
          onPress: () => {
            Linking.openURL('mailto:support@icheckin.app');
          },
        },
      ]
    );
  };

  const handleReportBug = () => {
    Alert.alert(
      t('support.reportBug'),
      t('support.reportBugDesc'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('support.sendMessage'),
          onPress: () => {
            Linking.openURL('mailto:bugs@icheckin.app?subject=Bug Report');
          },
        },
      ]
    );
  };

  const handleOpenURL = (url: string) => {
    Linking.openURL(url).catch((err) => {
      Alert.alert('Error', 'Could not open the link');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('support.title')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Help Center Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="help-circle" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('support.helpCenter')}</Text>
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleOpenURL('https://help.icheckin.app')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{t('support.helpCenter')}</Text>
              <Text style={styles.cardDescription}>
                {t('support.helpCenterDesc')}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="comment-question" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('support.faq')}</Text>
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleOpenURL('https://help.icheckin.app/faq')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{t('support.faq')}</Text>
              <Text style={styles.cardDescription}>
                {t('support.faqDesc')}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Contact Support Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="email" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('support.contactUs')}</Text>
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={handleContactSupport}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{t('support.contactUs')}</Text>
              <Text style={styles.cardDescription}>
                {t('support.contactUsDesc')}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Report Bug Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="bug" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('support.reportBug')}</Text>
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={handleReportBug}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{t('support.reportBug')}</Text>
              <Text style={styles.cardDescription}>
                {t('support.reportBugDesc')}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Legal Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="file-document" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>Legal</Text>
          </View>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleOpenURL('https://icheckin.app/terms')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{t('support.termsOfService')}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleOpenURL('https://icheckin.app/privacy')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{t('support.privacyPolicy')}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        {/* App Version Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="information" size={20} color="#0066CC" />
            <Text style={styles.sectionTitle}>{t('support.appVersion')}</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{t('support.appVersion')}</Text>
              <Text style={styles.cardDescription}>
                Version 1.0.0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
  },
});
