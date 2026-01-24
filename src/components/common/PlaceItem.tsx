import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getDistanceFromLatLonInKm } from '../../utils/functions';
import useLocation from '../../hooks/useLocation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import { MapPlace } from '../../graphql/interfaces/entities/place.interface';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PlaceItemProps {
  place: MapPlace;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
	const location = useLocation();
	const navigation = useNavigation<NavigationProp>();

	const handlePress = () => {
		// Navigate to place detail if needed
		navigation.navigate('Map');
	};

	return (
		<TouchableOpacity style={styles.container} onPress={handlePress}>
			<Image source={{ uri: place.thumbnail }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.name}>{place.name}</Text>
				<Text style={styles.info}>
					{place.types[0]} • {getDistanceFromLatLonInKm(location, place, place.distance)}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: { 
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 12,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#f0f0f0',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
		height: 80,
		width: '100%',
	},
	image: { 
		width: 80, 
		height: 80, 
		borderRadius: 0,
	},
	content: {
		flex: 1,
		padding: 12,
		justifyContent: 'center',
	},
	name: { 
		fontWeight: 'bold',
		fontSize: 14,
		marginBottom: 4,
	},
	info: {
		fontSize: 12,
		color: '#999',
	},
});

export default PlaceItem;