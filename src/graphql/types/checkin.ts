// CheckIn types - consolidated
import { Place, GooglePlace } from './place';
import { User, UserBasic } from './user';

export interface Checkin {
  id: string;
  place: Place;
  mood?: string;
  status?: string;
  checkedAt: string;
  user?: User;
  content?: string;
}

export interface CheckInResponse {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  content?: string;
  user: {
    id: string;
    name: string;
  };
  place?: {
    id: string;
    name: string;
  };
}

export interface CheckInPlaceResponse {
  success: boolean;
  message: string;
  checkin?: {
    id: string;
    checkedAt: string;
    content?: string;
    place: {
      id: string;
      name: string;
    };
  };
}

export interface CheckInVariables {
  latitude: number;
  longitude: number;
  timestamp: string;
  content?: string;
}

export interface CheckInPlaceVariables {
  placeId: string;
  content?: string;
  photos?: string[];
}

// Social types
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: UserBasic;
  parentId?: string;
}

export interface Review {
  id: string;
  caption?: string;
  photos?: string[];
  feelings?: string[];
  likes: number;
  createdAt: string;
  user: UserBasic;
  comments: Comment[];
}

export interface CheckInWithDetails {
  id: string;
  caption?: string;
  photos?: string[];
  feelings?: string[];
  likes: number;
  createdAt: string;
  user: UserBasic;
  place: Place;
  comments: Comment[];
}

// Home page response types
export interface GetHomeDataResponse {
  nearbyPlaces: GooglePlace[];
  myCheckins: Checkin[];
}

export interface GetHomeDataVars {
  lat: number;
  lng: number;
}

// Feed types
export interface CheckInFeedItem {
  id: string;
  caption?: string;
  photos?: string[];
  feelings?: string[];
  likes: number;
  createdAt: string;
  user: UserBasic;
  place: Place;
  comments: Comment[];
}

