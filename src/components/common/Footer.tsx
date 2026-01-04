import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from './Icon';

const Footer = () => {
  const navigation = useNavigation() as any;
  const [index, setIndex] = React.useState(0);

  const routes = [
    { key: 'Home', title: 'Home', icon: 'home' },
    { key: 'Search', title: 'Search', icon: 'magnify' },
    { key: 'Profile', title: 'Profile', icon: 'account' },
    { key: 'Setting', title: 'Settings', icon: 'cog' },
  ];

  const handleIndexChange = (i: number) => {
    setIndex(i);
    if (navigation.navigate) {
      navigation.navigate(routes[i].key);
    }
  };

  return (
    <View style={styles.container}>
      {routes.map((route, i) => (
        <TouchableOpacity
          key={route.key}
          style={styles.tab}
          onPress={() => handleIndexChange(i)}
          accessibilityRole="button"
          accessibilityLabel={route.title}
        >
          <Icon
            name={route.icon}
            size={24}
            color={index === i ? '#0066CC' : '#666'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Footer;

