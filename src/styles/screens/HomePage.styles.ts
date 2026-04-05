import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  placesScrollContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  placeItemWrapper: {
    width: screenWidth * 0.9,
    marginRight: 12,
  },
});
