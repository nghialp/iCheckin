// // Re-export all types from graphql/types for backward compatibility
// // All type definitions have been consolidated to src/graphql/types/

// // Re-export from graphql types
// export * from '../graphql/types';

// // Extended types for backward compatibility with existing code
// // These types maintain the original interface names and properties

// import { User as GraphQLUser, UserBasic } from '../graphql/types/user';
// import { Place as GraphQLPlace, GooglePlace, Coordinates } from '../graphql/types/place';
// import { Checkin as GraphQLCheckin, Review as GraphQLReview, Comment as GraphQLComment } from '../graphql/types/checkin';

// // Extended Place with location field for MapPage/LocationDetailPage
// export interface Place extends GraphQLPlace {
//   reviews?: Review[];
//   photos?: string[];
//   location?: {
//     lat: number;
//     lng: number;
//     city?: string;
//   };
// }

// // Extended CheckIn for MapPage
// export interface CheckIn {
//   id: string;
//   place: Place;
//   user: UserBasic;
//   photos?: string[];
//   caption?: string;
//   feelings?: string[];
//   likes: number;
//   comments?: Comment[];
//   createdAt: string;
//   mood?: string;
//   status?: string;
//   checkedAt?: string;
//   content?: string;
// }

// // Backward compatibility exports
// export { GooglePlace as GooglePlace };
// export { Coordinates as Coordinates };
// export { GraphQLReview as Review };
// export { GraphQLCheckin as Checkin };
// export { GraphQLComment as Comment };
// export { GraphQLUser as User };

// // Extended User with social counts
// export interface User extends GraphQLUser {
//   friendsCount?: number;
//   followersCount?: number;
//   rewardPoints?: number;
//   totalCheckins?: number;
//   totalBadges?: number;
//   visitedPlaces?: number;
// }

// // Review type - alias for backward compatibility
// export { GraphQLReview as Review };

// // Comment type - alias for backward compatibility
// export { GraphQLComment as Comment };

// // Reward types (application-level, not GraphQL)
// export interface RedeemRewardResponse {
//   success: boolean;
//   message: string;
//   remainingPoints?: number;
// }

// export interface RedeemRewardVariables {
//   rewardId: string;
// }

// // Post types (for future use)
// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   author: User;
// }

// // Trip types (for future use)
// export interface TripStop {
//   date: string;
//   note?: string;
//   place?: Place;
// }

// export interface Trip {
//   id: string;
//   title: string;
//   timeline: TripStop[];
//   checkedPlaces: Place[];
// }

