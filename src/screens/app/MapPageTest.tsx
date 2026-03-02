import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestMapPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapbox Test Page</Text>
      <Text style={styles.subtitle}>If you see this, React Native is working</Text>
      <Text style={styles.subtitle}>Mapbox component is disabled for testing</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
});

export default TestMapPage;
