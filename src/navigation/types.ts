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
  Settings: undefined;
  BookScreen: undefined;
  EditProfile: undefined;
  DonationHistory: undefined;
  DetailedInformation: undefined;
};

export type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export type IntroScreenProps = NativeStackScreenProps<RootStackParamList, 'Intro'>;
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type LogInScreenProps = NativeStackScreenProps<RootStackParamList, 'LogIn'>;
export type RegistrationProps = NativeStackScreenProps<RootStackParamList, 'Registration'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;
export type BookScreenProps = NativeStackScreenProps<RootStackParamList, 'BookScreen'>;
export type EditProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
export type DonationHistoryScreenProps = NativeStackScreenProps<RootStackParamList, 'DonationHistory'>;
export type DetailedInformationScreenProps = NativeStackScreenProps<RootStackParamList, 'DetailedInformation'>;
