import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GooglePlace } from '../../graphql/types/place';
import { getDistanceFromLatLonInKm } from '../../utils/functions';
import useLocation from '../../hooks/useLocation';

interface PlaceItemProps {
  place: GooglePlace;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
	const location = useLocation();
	return (
		<View style={styles.container}>
			<Image source={{ uri: place.thumbnail }} style={styles.image} />
			<View style={{ flex: 1 }}>
				<Text style={styles.name}>{place.name}</Text>
				<Text>{place.type} • {getDistanceFromLatLonInKm(location, place)}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row', marginBottom: 12 },
	image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
	name: { fontWeight: 'bold' },
});

export default PlaceItem;