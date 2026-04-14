import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import GoogleLogin from "./googleLogin";
import { useAuthStore } from "../../../stores/useAuthStore";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";
// import * as SecureStore from "expo-secure-store";
// import api from "../api/api";
// import { useAuthStore } from "../stores/useAuthStore";

export default function SignInScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");

  const registerAction = useAuthStore((state) => state.registerAction);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirm_password) {
      Alert.alert(t("error"), t("fill_all_fields"));
      return;
    }

    if (password !== confirm_password) {
      Alert.alert(t("error"), t("passwords_do_not_match"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(t("error"), t("invalid_email"));
      return;
    }

    try {
      const data = await registerAction({
        email,
        name,
        password,
        confirm_password,
      });
      if (data.access_token) {
        navigation.navigate("Test");
      }
    } catch (error) {
      Alert.alert("Помилка", "Реєстрація не вдалася", error);
    }
  };

  const logoSource = isDark
    ? require("../../../images/logo-white.png")
    : require("../../../images/logo.png");

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.backgroundMain },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <LanguageSwitcher />
      <Image source={logoSource} style={styles.logo} />

      <View style={styles.boxOfInputs}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.primary,
              color: colors.text,
            },
          ]}
          placeholder={t("your_name") || "Name"}
          placeholderTextColor={colors.primary}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.primary,
              color: colors.text,
            },
          ]}
          placeholder={t("email")}
          placeholderTextColor={colors.primary}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.primary,
              color: colors.text,
            },
          ]}
          placeholder={t("password")}
          placeholderTextColor={colors.primary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.primary,
              color: colors.text,
            },
          ]}
          placeholder={t("confirm_password") || "Confirm Password"}
          placeholderTextColor={colors.primary}
          secureTextEntry
          value={confirm_password}
          onChangeText={setConfirm_Password}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSignUp}
      >
        <Text style={[styles.buttonText, { color: "#fff" }]}>
          {t("sign_up")}
        </Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 20 }}>
        <GoogleLogin />
      </View>

      <View style={styles.goToLoginButton}>
        <Text style={{ color: colors.text }}>
          {t("already_have_account") || "Already have an account?"}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            {" "}
            {t("log_in")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 32,
  },
  boxOfInputs: {
    marginBottom: 30,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  button: {
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 160,
    marginBottom: 24,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  goToLoginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
