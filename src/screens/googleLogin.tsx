import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';

import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider, signOut as firebaseSignOut } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const WEB_CLIENT_ID = '919528186068-dehjb980ti0jkdoie856nqqlnu75fqse.apps.googleusercontent.com'; 

const authInstance = getAuth();

export default function googleLogin() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  function authStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID, 
    });

    const subscriber = onAuthStateChanged(authInstance, authStateChanged);
    return subscriber; 
  }, []);

  async function onGoogleButtonPress() {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      const signInResult = await GoogleSignin.signIn();
      
      let idToken = signInResult.idToken;
      if (!idToken && signInResult.data) {
        idToken = signInResult.data.idToken;
      }

      if (!idToken) {
        throw new Error('Google Sign-In failed: No ID token found');
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);
      
      await signInWithCredential(authInstance, googleCredential);
      

    } catch (error: any) {
      console.error(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else {
        Alert.alert('Помилка входу', error.message || 'Щось пішло не так');
      }
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await firebaseSignOut(authInstance);
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Вітаємо!</Text>
        <Text style={styles.subHeader}>Увійдіть, щоб продовжити</Text>
        <View style={styles.btnContainer}>
             <Button 
                title={loading ? "Вхід..." : "Увійти через Google"} 
                onPress={onGoogleButtonPress}
                disabled={loading}
             />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Профіль</Text>
      
      <View style={styles.card}>
        {user.photoURL && (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        )}
        <Text style={styles.name}>{user.displayName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.uid}>UID: {user.uid}</Text>
      </View>

      <View style={styles.btnContainer}>
        <Button title="Вийти" onPress={signOut} color="#FF5252" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  uid: {
    fontSize: 10,
    color: '#999',
  },
  btnContainer: {
    width: '100%',
    maxWidth: 200,
  }
});