// Place types - consolidated (single source of truth)
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  types?: string;
  category?: string;
  address?: string;
  lat: number;
  lng: number;
  thumbnail?: string;
  description?: string;
  mapboxId?: string;
  // Extended fields for MapPage/LocationDetailPage
  photos?: string[];
}

// Google Places API response type
export interface GooglePlace {
  name: string;
  types: string;
  address: string;
  lat: number;
  lng: number;
  thumbnail: string;
  mapboxId: string;
}

export interface OpeningHour {
  day?: string;
  open: string;
  close: string;
}

