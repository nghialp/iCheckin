import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Checkin } from '../../graphql/types/checkin';

interface Props {
  checkin: Checkin;
}

const CheckInFeedItem: React.FC<Props> = ({ checkin }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.place}>{checkin.place.name}</Text>
      <Text style={styles.time}>{checkin.checkedAt}</Text>
      {checkin.place.thumbnail && <Image source={{ uri: checkin.place.thumbnail }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  place: { fontWeight: 'bold' },
  time: { fontSize: 12, color: '#666' },
  tag: { color: '#0a84ff' },
  image: { width: '100%', height: 180, marginTop: 8, borderRadius: 8 },
});

export default CheckInFeedItem;