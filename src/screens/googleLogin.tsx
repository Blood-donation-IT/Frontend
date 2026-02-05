import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
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
import { useTranslation } from "react-i18next";

const WEB_CLIENT_ID =
  "919528186068-dehjb980ti0jkdoie856nqqlnu75fqse.apps.googleusercontent.com";

const authInstance = getAuth();

export default function GoogleLogin() {
  const { colors } = useTheme();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

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

  if (!user) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: colors.backgroundMain },
        ]}
      >
        <Text style={[styles.header, { color: colors.text }]}>
          {t("welcome!")}
        </Text>
        <Text style={[styles.subHeader, { color: colors.textSecondary }]}>
          {t("sign_in_to_continue")}
        </Text>

        <View style={styles.btnContainer}>
          <Button
            title={loading ? t("signing_in") : t("sign_in_with_google")}
            onPress={onGoogleButtonPress}
            disabled={loading}
            color={colors.primary}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.backgroundMain },
      ]}
    >
      <Text style={[styles.header, { color: colors.text }]}>
        {t("profile")}
      </Text>

      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.backgroundCard,
            borderColor: colors.border,
          },
        ]}
      >
        {user.photoURL && (
          <Image source={{ uri: user.photoURL }} style={styles.avatar} />
        )}
        <Text style={[styles.name, { color: colors.text }]}>
          {user.displayName}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {user.email}
        </Text>
        <Text style={[styles.uid, { color: colors.textSecondary }]}>
          UID: {user.uid}
        </Text>
      </View>

      <View style={styles.btnContainer}>
        <Button title="Вийти" onPress={signOut} color={colors.danger} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
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
});
