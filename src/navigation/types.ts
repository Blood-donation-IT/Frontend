import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Intro: undefined;
  SignIn: undefined;
  LogIn: undefined;
  Registration: undefined;
  DonorBook: undefined;
  DonorProfile: undefined;
  IntroSlider: undefined; 
  Home: undefined; 
};

export type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

export type IntroScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Intro'
>;