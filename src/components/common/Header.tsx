import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { RootStackParamList } from '../../utils/router';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Header() {
	const navigation = useNavigation<NavigationProp>();

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate("Home")}> <Text style={styles.logo}>iCheckin</Text></TouchableOpacity>
			<Appbar.Action icon="map" onPress={() => navigation.navigate('Map')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
	logo: { fontSize: 20, fontWeight: 'bold' },
	search: { fontSize: 20 },
});