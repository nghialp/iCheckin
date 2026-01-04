export interface Reward {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  requiredPoints: number;
  inStock: boolean;
  partner: string;
}

export interface UserReward {
  id: string;
  name: string;
  rewardPoints: number;
}

export interface Query {
  me: UserReward;
  rewards: Reward[];
}

// Reward types (application-level, not GraphQL)
export interface RedeemRewardResponse {
  success: boolean;
  message: string;
  remainingPoints?: number;
}

export interface RedeemRewardVariables {
  rewardId: string;
}

export interface RedeemResponse {
  success: boolean;
  message: string;
}

export interface Mutation {
  redeemReward: (rewardId: string) => RedeemResponse;
}