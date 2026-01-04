import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileCard() {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useAuth();
  const { t } = useTranslation();

  const userData = user || { name: 'Guest', country: 'Unknown', avatar: 'https://via.placeholder.com/48' };

  const handleCheckIn = () => {
    navigation.navigate('CheckIn');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: userData.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text>{userData.country || 'Unknown'}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
        <Text style={styles.buttonText}>{t('checkIn')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  name: { fontSize: 16, fontWeight: 'bold' },
  button: { backgroundColor: '#0a84ff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
