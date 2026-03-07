import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  // [SECTION] Header
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#666',
    marginBottom: 4,
  },
  opening: {
    color: '#0a0',
    marginBottom: 8,
  },

  // [SECTION] Photos
  placePhoto: {
    width: screenWidth * 0.7,
    height: 160,
    borderRadius: 10,
    marginRight: 12,
  },

  // [SECTION] Map
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  mapMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a84ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  mapMarkerText: {
    fontSize: 20,
  },

  // [SECTION] Check-in Button
  checkInButton: {
    backgroundColor: '#0a84ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  checkInText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },

  // [SECTION] Reviews Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },

  // [SECTION] Review Card
  reviewCard: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },

  // [SECTION] User Info
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  userName: {
    fontWeight: '600',
  },
  timestamp: {
    color: '#999',
  },

  // [SECTION] Review Content
  caption: {
    marginBottom: 6,
  },
  reviewPhoto: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 6,
  },
  feelings: {
    fontSize: 18,
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // [SECTION] Modal
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#0a84ff',
    borderRadius: 8,
  },
});
