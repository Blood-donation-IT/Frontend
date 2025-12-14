import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Theme/ThemeContext";
import GoogleLogin from "./googleLogin";

export default function LogInScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    navigation.navigate("Home");
  };

  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.backgroundMain },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: colors.text }]}>OneDrop</Text>

      <View style={styles.boxOfInputs}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder={t("email")}
          placeholderTextColor={colors.textSecondary}
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
              borderColor: colors.border,
              color: colors.text,
            },
          ]}
          placeholder={t("password")}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleLogIn}
      >
        <Text style={[styles.buttonText, { color: "#fff" }]}>
          {t("log_in")}
        </Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 20 }}>
        <GoogleLogin />
      </View>

      <View style={styles.goToSignUpButton}>
        <Text style={{ color: colors.textSecondary }}>
          {t("dont_have_account")}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            {" "}
            {t("sign_up")}
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
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 32,
    alignSelf: "center",
  },
  boxOfInputs: {
    marginBottom: 40,
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
  goToSignUpButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
