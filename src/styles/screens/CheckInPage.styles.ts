import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  pagerView: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  progressDotActive: {
    backgroundColor: '#0066CC',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#ddd',
  },
  progressLineActive: {
    backgroundColor: '#0066CC',
  },
  stepLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  stepLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#0066CC',
    fontWeight: '600',
  },
  locationDetectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gpsIcon: {
    backgroundColor: '#e3f2fd',
    borderRadius: 40,
  },
  detectingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  subDetectingText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066CC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 24,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  placesList: {
    paddingBottom: 16,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  placeIcon: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  placeType: {
    fontSize: 12,
    color: '#0066CC',
    marginTop: 2,
  },
  placeAddress: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  placeDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 8,
  },
  selectedPlaceCard: {
    marginBottom: 16,
    backgroundColor: '#f0f7ff',
  },
  selectedPlaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedPlaceInfo: {
    flex: 1,
  },
  selectedPlaceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
  selectedPlaceType: {
    fontSize: 12,
    color: '#666',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  feelingsInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  quickTagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickTag: {
    backgroundColor: '#f0f0f0',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickTagText: {
    fontSize: 20,
  },
  uploadPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  uploadPhotoText: {
    color: '#0066CC',
    fontWeight: '600',
    marginLeft: 8,
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  checkInButtonDisabled: {
    backgroundColor: '#ccc',
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
