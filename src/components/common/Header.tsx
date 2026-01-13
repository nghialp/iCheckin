import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { RootStackParamList } from '../../utils/router';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Header() {
	const navigation = useNavigation<NavigationProp>();
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingTop: insets.top + 8 }]}>
			<TouchableOpacity onPress={() => navigation.navigate("Home")}>
				<Text style={styles.logo}>iCheckin</Text>
			</TouchableOpacity>
			<Appbar.Action icon="magnify" onPress={() => navigation.navigate('Search')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ddf4feff', padding: 16, paddingBottom: 8 },
	logo: { fontSize: 25, fontWeight: 'bold' },
	search: { fontSize: 20 },
});