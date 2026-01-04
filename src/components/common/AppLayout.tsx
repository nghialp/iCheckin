import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default AppLayout;