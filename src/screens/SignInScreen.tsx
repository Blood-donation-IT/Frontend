import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Theme/ThemeContext";

export default function SignUpScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (!name || !email || !year || !password || !confirmPassword) {
      Alert.alert(t("error"), t("fill_all_fields"));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t("error"), t("passwords_do_not_match"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(t("error"), t("invalid_email"));
      return;
    }

    navigation.navigate("LogIn");
  };

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
              color: colors.text,
              borderColor: colors.primary,
            },
          ]}
          placeholder={t("your_name")}
          placeholderTextColor={colors.primary}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundCard,
              color: colors.text,
              borderColor: colors.primary,
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
              color: colors.text,
              borderColor: colors.primary,
            },
          ]}
          placeholder={t("your_year")}
          placeholderTextColor={colors.primary}
          value={year}
          onChangeText={setYear}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundCard,
              color: colors.text,
              borderColor: colors.primary,
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
              color: colors.text,
              borderColor: colors.primary,
            },
          ]}
          placeholder={t("confirm_password")}
          placeholderTextColor={colors.primary}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSignUp}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>
            {t("sign_up")}
          </Text>
        </TouchableOpacity>

        <View style={styles.goToLogInButton}>
          <Text style={{ color: colors.text}}>
            {t("already_have_account")}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <Text style={{ color: colors.primary, fontWeight: "600" }}>
              {" "}
              {t("log_in")}
            </Text>
          </TouchableOpacity>
        </View>
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
    alignSelf: "center",
    marginBottom: 40,
  },
  boxOfInputs: {
    marginBottom: 40,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 20,
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
  goToLogInButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
