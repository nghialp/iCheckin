// User types - consolidated from utils/types.ts
export interface User {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  avatar?: string;
  bio?: string;
  country?: string;
  interests: string[];
  hobby?: string;
  friendsCount?: number;
  followersCount?: number;
  rewardPoints?: number;
  totalCheckins?: number;
  totalBadges?: number;
  visitedPlaces?: number;
}

export interface UserBasic {
  id: string;
  name: string;
  avatarUrl?: string;
}

