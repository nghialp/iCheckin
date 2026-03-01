import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { CheckInContext } from '../../providers/CheckInProvider';
import { MapPlace } from '../../graphql/interfaces/entities/place.interface';

const ProfileCard = ({ places }: {places: MapPlace[] }) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { openCheckInModal } = useContext(CheckInContext);

  const userData = user || {
    name: 'Guest',
    country: 'Unknown',
    avatar: '../../assets/user_default.png',
    interests: 'Photography, Hiking'
  };

  const handleCheckIn = () => {
    openCheckInModal(places);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={
          userData?.avatar
            ? { uri: userData.avatar }
            : require('../../assets/user_default.png')
        } style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.country}>{userData.country || 'Unknown'}</Text>
          <Text style={styles.interests}>{userData.interests || 'No interests set'}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCheckIn}>
        <Text style={styles.buttonText}>{t('checkIn') || 'Check In'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddf4feff',
    paddingHorizontal: 12,
    // marginHorizontal: -16,
    marginTop: -12,
    paddingBottom: 10,
  },
  content: {
    flexDirection: 'row',        // ✅ sắp xếp Image và info theo chiều ngang
    alignItems: 'center', 

    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    // flex: 1, 
    // marginBottom: 20,
    // justifyContent: 'space-between',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
    // marginBottom: 16,
    // padding: 12,
  },
  info: {
    alignItems: 'flex-start',
    margin: 12,
    flex: 1, 
    justifyContent: 'center'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  interests: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    backgroundColor: '#6690ecff',
    paddingHorizontal: 30,
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProfileCard;
