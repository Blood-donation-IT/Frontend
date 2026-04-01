import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  NativeModules,
} from "react-native";
import { useTheme } from "../../../Theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useTranslation } from "react-i18next";

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

function getFirebaseAuthApi() {
  if (!NativeModules?.RNFBAppModule) {
    return null;
  }
  try {
    return require("@react-native-firebase/auth");
  } catch (_error) {
    return null;
  }
}

function getGoogleSigninApi() {
  if (!NativeModules?.RNGoogleSignin) {
    return null;
  }
  try {
    return require("@react-native-google-signin/google-signin");
  } catch (_error) {
    return null;
  }
}

export default function GoogleLogin() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const syncWithFirebase = useAuthStore((state) => state.syncWithFirebase);
  const { t } = useTranslation();

  useEffect(() => {
    const firebaseAuth = getFirebaseAuthApi();
    const googleApi = getGoogleSigninApi();

    if (!firebaseAuth || !googleApi) {
      setIsSupported(false);
      setInitializing(false);
      return;
    }

    googleApi.GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });
    const authInstance = firebaseAuth.getAuth();
    const subscriber = firebaseAuth.onAuthStateChanged(authInstance, () => {
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  async function onGoogleButtonPress() {
    const firebaseAuth = getFirebaseAuthApi();
    const googleApi = getGoogleSigninApi();
    if (!firebaseAuth || !googleApi) {
      Alert.alert("Недоступно", "Google login requires a native build.");
      return;
    }

    const { GoogleSignin, statusCodes } = googleApi;
    const authInstance = firebaseAuth.getAuth();

    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult.idToken || signInResult?.data?.idToken;
      if (!idToken) throw new Error("No Google ID token");
      const googleCredential =
        firebaseAuth.GoogleAuthProvider.credential(idToken);
      await firebaseAuth.signInWithCredential(authInstance, googleCredential);
      await syncWithFirebase(
        signInResult.data?.user,
        signInResult.data?.idToken,
      );
      navigation.navigate("Test");
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
        style={[styles.container, { backgroundColor: colors.backgroundMain }]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
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
          style={styles.socialButton}
          onPress={onGoogleButtonPress}
          disabled={loading || !isSupported}
        >
          <Image
            source={require("../../../images/google_icon.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export async function signOut() {
  const firebaseAuth = getFirebaseAuthApi();
  const googleApi = getGoogleSigninApi();
  if (!firebaseAuth || !googleApi) return;

  const authInstance = firebaseAuth.getAuth();
  try {
    await firebaseAuth.signOut(authInstance);
    await googleApi.GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 30,
    width: "100%",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E66A6A",
    opacity: 0.5,
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#8E8E93",
    fontSize: 14,
  },
  socialButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  socialButtonText: {
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
});
