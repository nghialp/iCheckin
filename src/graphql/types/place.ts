// Place types - consolidated (single source of truth)
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  type?: string;
  category?: string;
  address?: string;
  lat: number;
  lng: number;
  thumbnail?: string;
  description?: string;
  openingHours?: OpeningHour[];
  distance?: number;
  googlePlaceId?: string;
  // Extended fields for MapPage/LocationDetailPage
  photos?: string[];
}

// Google Places API response type
export interface GooglePlace {
  name: string;
  type: string;
  address: string;
  lat: number;
  lng: number;
  thumbnail: string;
  googlePlaceId: string;
  distance?: string;
}

export interface OpeningHour {
  day?: string;
  open: string;
  close: string;
}

