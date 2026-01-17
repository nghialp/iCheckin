import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../hooks/useAuth';
import { useMutation } from '@apollo/client/react';
import { UPDATE_PROFILE_MUTATION, UPDATE_USER_AVATAR_MUTATION } from '../../graphql/mutations';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';

type Props = NativeStackNavigationProp<RootStackParamList, 'PersonalDetails'>;

interface PersonalDetailsScreenProps {
  navigation: Props;
}

export default function PersonalDetailsScreen({ navigation }: PersonalDetailsScreenProps) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    location: user?.location || '',
  });

  const [updateProfile, { loading: profileLoading }] = useMutation(UPDATE_PROFILE_MUTATION);
  const [updateAvatar, { loading: avatarLoading }] = useMutation(UPDATE_USER_AVATAR_MUTATION);

  const handleAvatarPicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
    };

    launchImageLibrary(options, (response: any) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert(t('personalDetails.error'), response.errorMessage);
        return;
      }

      handleAvatarUpload(response.assets[0].uri);
    });
  };

  const handleAvatarUpload = async (uri: string) => {
    try {
      const result = await updateAvatar({
        variables: { avatarUrl: uri },
      });

      if ((result.data as any)?.updateUserAvatar?.success) {
        Alert.alert(t('personalDetails.success'), t('personalDetails.avatarUpdated'));
      }
    } catch (error) {
      Alert.alert(t('personalDetails.error'), t('personalDetails.avatarUpdateFailed'));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert(t('personalDetails.error'), t('personalDetails.nameRequired'));
      return false;
    }
    if (!formData.email.includes('@')) {
      Alert.alert(t('personalDetails.error'), t('personalDetails.invalidEmail'));
      return false;
    }
    if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      Alert.alert(t('personalDetails.error'), t('personalDetails.invalidPhone'));
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const result = await updateProfile({
        variables: {
          input: formData,
        },
      });

      if ((result.data as any)?.updateProfile?.success) {
        Alert.alert(t('personalDetails.success'), t('personalDetails.savedSuccessfully'));
        setEditMode(false);
      }
    } catch (error: any) {
      Alert.alert(t('personalDetails.error'), error.message || t('personalDetails.saveFailed'));
    }
  };

  const formatDateOfBirth = (date: string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('personalDetails.title')}</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handleAvatarPicker}
            disabled={avatarLoading}
          >
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Icon name="account-circle" size={60} color="#999" />
              </View>
            )}
            <View style={styles.cameraIcon}>
              <Icon name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarText}>{user?.name}</Text>
          <Text style={styles.avatarSubtext}>{user?.email}</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Text style={styles.fieldLabel}>{t('personalDetails.name')}</Text>
              {!editMode && (
                <TouchableOpacity
                  onPress={() => setEditMode(true)}
                  style={styles.editButton}
                >
                  <Icon name="pencil" size={18} color="#0066CC" />
                </TouchableOpacity>
              )}
            </View>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder={t('personalDetails.enterName')}
              />
            ) : (
              <Text style={styles.fieldValue}>{formData.name}</Text>
            )}
          </View>

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Text style={styles.fieldLabel}>{t('personalDetails.email')}</Text>
            </View>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder={t('personalDetails.enterEmail')}
                editable={false}
              />
            ) : (
              <Text style={styles.fieldValue}>{formData.email}</Text>
            )}
          </View>

          {/* Phone Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Text style={styles.fieldLabel}>{t('personalDetails.phone')}</Text>
            </View>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder={t('personalDetails.enterPhone')}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.fieldValue}>{formData.phone || t('personalDetails.notProvided')}</Text>
            )}
          </View>

          {/* Date of Birth Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Text style={styles.fieldLabel}>{t('personalDetails.dateOfBirth')}</Text>
            </View>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={formData.dateOfBirth}
                onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                placeholder={t('personalDetails.enterDOB')}
              />
            ) : (
              <Text style={styles.fieldValue}>
                {formData.dateOfBirth ? formatDateOfBirth(formData.dateOfBirth) : t('personalDetails.notProvided')}
              </Text>
            )}
          </View>

          {/* Gender Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Text style={styles.fieldLabel}>{t('personalDetails.gender')}</Text>
            </View>
            {editMode ? (
              <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderOption,
                      formData.gender === g && styles.genderOptionSelected,
                    ]}
                    onPress={() => setFormData({ ...formData, gender: g })}
                  >
                    <Text
                      style={[
                        styles.genderOptionText,
                        formData.gender === g && styles.genderOptionTextSelected,
                      ]}
                    >
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.fieldValue}>{formData.gender || t('personalDetails.notProvided')}</Text>
            )}
          </View>

          {/* Location Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Text style={styles.fieldLabel}>{t('personalDetails.address')}</Text>
            </View>
            {editMode ? (
              <TextInput
                style={styles.input}
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                placeholder={t('personalDetails.enterAddress')}
              />
            ) : (
              <Text style={styles.fieldValue}>{formData.location || t('personalDetails.notProvided')}</Text>
            )}
          </View>
        </View>

        {/* Save/Cancel Buttons */}
        {editMode && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setEditMode(false);
                setFormData({
                  name: user?.name || '',
                  email: user?.email || '',
                  phone: user?.phone || '',
                  dateOfBirth: user?.dateOfBirth || '',
                  gender: user?.gender || '',
                  location: user?.location || '',
                });
              }}
            >
              <Text style={styles.cancelButtonText}>{t('personalDetails.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton, profileLoading && { opacity: 0.5 }]}
              onPress={handleSave}
              disabled={profileLoading}
            >
              <Text style={styles.saveButtonText}>
                {profileLoading ? t('personalDetails.saving') : t('personalDetails.save')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#fff',
    paddingVertical: 24,
    borderRadius: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  avatarSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  fieldContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  editButton: {
    padding: 4,
  },
  fieldValue: {
    fontSize: 14,
    color: '#666',
    paddingVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#000',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  genderOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  genderOptionSelected: {
    borderColor: '#0066CC',
    backgroundColor: '#E6F0FF',
  },
  genderOptionText: {
    fontSize: 13,
    color: '#666',
  },
  genderOptionTextSelected: {
    color: '#0066CC',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#0066CC',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
  saveButton: {
    backgroundColor: '#0066CC',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
