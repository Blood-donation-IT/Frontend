import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Theme/ThemeContext";
import ArrowLeft from "../../../images/arrow-left.png";
import Logo from "../../../images/logo.png";
import { useTranslation } from "react-i18next";

export default function CreateNewPasswordScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.backgroundMain },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={ArrowLeft}
          style={[styles.backIcon, { tintColor: colors.secondary }]}
        />
      </TouchableOpacity>
      <Image source={Logo} style={styles.logo} />
      <Text style={[styles.title, { color: colors.primary }]}>
        {t("create_new_password")}
      </Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        {t("your_new_password_must_be_different")}
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.backgroundCard,
            borderColor: colors.primary,
            color: colors.text,
          },
        ]}
        placeholder={t("new_password")}
        placeholderTextColor={colors.text}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
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
        placeholder={t("confirm_new_password")}
        placeholderTextColor={colors.text}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.switchRow} activeOpacity={1}>
        <Switch
          value={rememberPassword}
          onValueChange={setRememberPassword}
          trackColor={{ false: "#ccc", true: colors.primary }}
          thumbColor={rememberPassword ? colors.primary : "#fff"}
        />
        <Text style={[styles.switchText, { color: colors.text }]}>
          {t("remember_and_save_my_password")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        <Text style={styles.buttonText}>{t("continue")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  backIcon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  switchText: {
    fontSize: 14,
  },
  button: {
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 250,
    alignSelf: "center",
    marginBottom: 24,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
});
