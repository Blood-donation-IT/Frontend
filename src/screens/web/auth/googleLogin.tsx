import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import { useTheme } from "../../../Theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useTranslation } from "react-i18next";

import { auth as webAuth } from "../../../utils/firebaseConfig";

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

export default function GoogleLogin() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const syncWithFirebase = useAuthStore((state) => state.syncWithFirebase);

  useEffect(() => {
    let subscriber: any;

    if (Platform.OS !== 'web') {
      const { GoogleSignin } = require("@react-native-google-signin/google-signin");
      const { getAuth, onAuthStateChanged } = require("@react-native-firebase/auth");
      
      GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });
      
      const authInstance = getAuth();
      subscriber = onAuthStateChanged(authInstance, (user: any) => {
        if (initializing) setInitializing(false);
      });
    } else {
      const { onAuthStateChanged } = require("firebase/auth");
      subscriber = onAuthStateChanged(webAuth, (user: any) => {
        if (initializing) setInitializing(false);
      });
    }

    return () => {
      if (subscriber) subscriber();
    };
  }, []);

  async function onGoogleButtonPress() {
    setLoading(true);
    try {
      if (Platform.OS === 'web') {
        const { GoogleAuthProvider, signInWithPopup } = require("firebase/auth");
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(webAuth, provider);
        
        // Отримуємо токен для синхронізації зі стором
        const idToken = await result.user.getIdToken();
        let user = await syncWithFirebase(result.user, idToken);
        user.is_new_user ? navigation.navigate("Test") : navigation.navigate("Home")

      } else {
        const { GoogleSignin } = require("@react-native-google-signin/google-signin");
        const { getAuth, GoogleAuthProvider, signInWithCredential } = require("@react-native-firebase/auth");

        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();
        
        const idToken = signInResult.idToken || signInResult?.data?.idToken;
        if (!idToken) throw new Error("No Google ID token");

        const authInstance = getAuth();
        const googleCredential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(authInstance, googleCredential);
        
        let user = await syncWithFirebase(signInResult.data?.user, idToken);
        user.is_new_user ? navigation.navigate("Test") : navigation.navigate("Home")

      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Помилка входу", error.message || "Щось пішло не так");
    } finally {
      setLoading(false);
    }
  }

  if (initializing) {
    return (
      <View style={[styles.container, { backgroundColor: colors.backgroundMain, justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#E66A6A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>{t("or_sign_in_with")}</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialButtonsRow}>
        <TouchableOpacity 
          style={[styles.socialButton, loading && { opacity: 0.6 }]} 
          onPress={onGoogleButtonPress}
          disabled={loading}
        >
          {loading ? (
             <ActivityIndicator size="small" color="#444" />
          ) : (
            <>
              <Image source={require("../../../images/google_icon.png")} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export async function signOut() {
  try {
    if (Platform.OS === 'web') {
      const { signOut: webSignOut } = require("firebase/auth");
      await webSignOut(webAuth);
    } else {
      const { getAuth, signOut: nativeSignOut } = require("@react-native-firebase/auth");
      const { GoogleSignin } = require("@react-native-google-signin/google-signin");
      await nativeSignOut(getAuth());
      await GoogleSignin.signOut();
    }
  } catch (error) {
    console.error(error);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 30,
    width: '100%',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E66A6A',
    opacity: 0.5,
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#8E8E93',
    fontSize: 14,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  socialButtonText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
});