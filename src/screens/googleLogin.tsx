import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from "@react-native-firebase/auth";

import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useTheme } from "../Theme/ThemeContext";
import { t } from "i18next";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../stores/useAuthStore";

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

const authInstance = getAuth();

export default function GoogleLogin() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const syncWithFirebase = useAuthStore((state) => state.syncWithFirebase);

  function authStateChanged(user: any) {
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
      let idToken = signInResult.idToken || signInResult?.data?.idToken;

      if (!idToken) {
        throw new Error("No Google ID token");
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(authInstance, googleCredential);
      console.log(signInResult.data)
      await syncWithFirebase(signInResult.data?.user,signInResult.data?.idToken);
      navigation.navigate("Test")
      // navigation.navigate("Home")

    } catch (error: any) {
      if (
        error.code !== statusCodes.SIGN_IN_CANCELLED &&
        error.code !== statusCodes.IN_PROGRESS
      ) {
        Alert.alert("Помилка входу", error.message || "Щось пішло не так");
      }
    } finally {
      setLoading(false);
    }
  }

  

  if (initializing) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.backgroundMain },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (true) {!user
    return (
      <View style={styles.container}>
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>{t("or_sign_in_with")}</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialButtonsRow}>
          <TouchableOpacity style={styles.socialButton} onPress={onGoogleButtonPress}>
            <Image source={require("../images/google_icon.png")} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.socialButton}>
            <Image source={require("../images/apple_icon.png")} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 30,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
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
    fontWeight: "600",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    marginBottom: 10,
  },
  uid: {
    fontSize: 10,
  },
  btnContainer: {
    width: "100%",
    maxWidth: 220,
  },
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
// });
});

export async function signOut() {
    try {
      await firebaseSignOut(authInstance);
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }