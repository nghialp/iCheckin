export type RootStackParamList = {
  // Auth screens
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  EmailSent: undefined;
  ChangePassword: { token: string };

  // App screens
  Home: undefined;
  Map: undefined;
  LocationDetail: { placeId?: string; placeName?: string };
  Rewards: undefined;
  Profile: undefined;
  Setting: undefined;
  CheckIn: { placeId?: string };
  Search: undefined;
  CheckInDetail: { placeId: string };
};
