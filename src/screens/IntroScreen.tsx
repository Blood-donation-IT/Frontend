import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type IntroScreenProps = NativeStackScreenProps<RootStackParamList, 'Intro'>;

const donorImage = require('../images/donor-intro.png');

const IntroScreen: React.FC<IntroScreenProps> = ({navigation}) => {
  return (
    <LinearGradient colors={['#FFF6F6', '#FFFFFF']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF6F6" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Той самий крок,
            {'\n'}
            Що дарує надію
          </Text>

          <Image source={donorImage} style={styles.image} />

          <Text style={styles.subtitle}>Дякуємо, що долучаєтеся до нас</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6F4E37',
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginVertical: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E57373',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IntroScreen;