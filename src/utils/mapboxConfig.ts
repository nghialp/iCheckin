/**
 * Mapbox Configuration and Utilities
 * This file contains all Mapbox setup and helper functions
 */

import MapboxGL from '@rnmapbox/maps';
import Config from 'react-native-config';

// TODO: Replace with your actual MapboxGL access token
// Get your token from: https://account.mapbox.com/tokens/
// Store in .env file as: MAPBOX_ACCESS_TOKEN=your_token_here
export const MAPBOX_ACCESS_TOKEN = Config.MAPBOX_ACCESS_TOKEN || '';

/**
 * Initialize MapboxGL with access token
 * Call this in your app's main entry point (App.tsx or root provider)
 */
export const initializeMapbox = () => {
  if (MAPBOX_ACCESS_TOKEN) {
    MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);
  } else {
    console.warn('Mapbox access token not configured. Maps may not render correctly.');
  }
};

/**
 * Default map style URL
 */
export const MAP_STYLE_URL = 'mapbox://styles/mapbox/streets-v12';

/**
 * Alternative map styles
 */
export const MAP_STYLES = {
  STREETS: 'mapbox://styles/mapbox/streets-v12',
  OUTDOORS: 'mapbox://styles/mapbox/outdoors-v12',
  LIGHT: 'mapbox://styles/mapbox/light-v11',
  DARK: 'mapbox://styles/mapbox/dark-v11',
  SATELLITE: 'mapbox://styles/mapbox/satellite-v9',
  SATELLITE_STREETS: 'mapbox://styles/mapbox/satellite-streets-v12',
};

/**
 * Default camera/region settings
 */
export const DEFAULT_CAMERA = {
  centerCoordinate: [106.660172, 10.762622], // Default to Ho Chi Minh City [lng, lat]
  zoomLevel: 12,
  animationDuration: 1000,
};

export const DEFAULT_INITIAL_REGION = {
  centerCoordinate: [106.660172, 10.762622],
  zoomLevel: 12,
};

/**
 * Convert latitude/longitude delta to Mapbox zoom level
 * Used for compatibility with react-native-maps style region objects
 */
export const regionToZoomLevel = (latitudeDelta: number): number => {
  // Approximate conversion: zoom = log2(360 / latitudeDelta)
  return Math.log2(360 / latitudeDelta);
};

/**
 * Convert Mapbox zoom level to latitude/longitude delta
 */
export const zoomLevelToRegion = (zoomLevel: number): number => {
  return 360 / Math.pow(2, zoomLevel);
};

/**
 * Feature collection for markers
 */
export const createMarkerFeatureCollection = (
  markers: Array<{
    id: string;
    latitude: number;
    longitude: number;
    title?: string;
    [key: string]: any;
  }>
) => {
  return {
    type: 'FeatureCollection' as const,
    features: markers.map((marker) => ({
      type: 'Feature' as const,
      id: marker.id,
      geometry: {
        type: 'Point' as const,
        coordinates: [marker.longitude, marker.latitude],
      },
      properties: {
        title: marker.title || '',
        ...marker,
      },
    })),
  };
};

/**
 * Marker style configuration
 */
export const MARKER_STYLES = {
  default: {
    size: 30 as const,
    color: '#007AFF',
  },
  selected: {
    size: 40 as const,
    color: '#FF3B30',
  },
  user: {
    size: 35 as const,
    color: '#34C759',
  },
};

/**
 * Animation configuration
 */
export const ANIMATION_CONFIG = {
  duration: 500,
  timing: 'ease-in-out' as const,
};

/**
 * Utility to check if coordinates are valid
 */
export const isValidCoordinate = (lat: number, lng: number): boolean => {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
};

/**
 * Calculate distance between two coordinates (in kilometers)
 * Using Haversine formula
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Format coordinates for display
 */
export const formatCoordinates = (lat: number, lng: number): string => {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};
