import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Theme/ThemeContext";
import ArrowLeft from "../images/arrow-left.png";
import Logo from "../images/logo.png";
import SliderIcon from "../images/Slider_ForgetScreen.png";
import LogInScreen from "./LogInScreen";

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const isFocused = useIsFocused(); 

  const [email, setEmail] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMessage, setAlertMessage] = useState("");
  

const handleResetPassword = () => {
  if (!email) {
    setAlertType("error");
    setAlertMessage(t("Incorrect Email"));
    setAlertVisible(true);
    return;
  }
  navigation.navigate("ResetPasswordScreen", { email });
};


  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.backgroundMain },
        ]}
        keyboardShouldPersistTaps="handled"
      >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("LogIn")}>
        <Image source={ArrowLeft} style={[styles.backIcon, { tintColor: colors.secondary }]} />
      </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          {t("Forget Password")}
        </Text>

        <Text style={[styles.subtitle, { color: colors.text }]}>
          {t(
            "Enter the email associated with your account and we’ll send an email with the code to reset your password."
          )}
        </Text>

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
            placeholder={t("email")}
            placeholderTextColor={colors.text}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleResetPassword}
        >
          <Text style={styles.buttonText}>{t("Send Email")}</Text>
        </TouchableOpacity>

       <View style={styles.bottomTabs}>
   <View style={styles.progressContainer}>
          <View style={[styles.progressLine, { backgroundColor: colors.primary }]} />
          <View style={[styles.progressLine, { backgroundColor: colors.text }]} />
          <View style={[styles.progressLine, { backgroundColor: colors.text }]} />
        </View>
</View>
      </ScrollView>

      <Modal transparent visible={alertVisible} animationType="fade">
        <View style={styles.alertOverlay}>
          <View
            style={[
              styles.alertBox,
              {
                backgroundColor: colors.backgroundCard,
                borderColor:
                  alertType === "success"
                    ? colors.primary
                    : colors.secondary || "White",
              },
            ]}
          >
            <Text style={[styles.alertTitle, { color: colors.text }]}>
              {alertType === "success" ? t("success") : t("error")}
            </Text>

            <Text style={[styles.alertMessage, { color: colors.text }]}>
              {alertMessage}
            </Text>

            <TouchableOpacity
              style={[styles.alertButton, { backgroundColor: colors.primary }]}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40, 
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 24,
    zIndex: 10,
  },

  backIcon: { width: 48, height: 48, resizeMode: "contain" },

  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
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
    paddingHorizontal: 10,
  },

  boxOfInputs: {
    marginBottom: 24,
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
    width: "100%",
    maxWidth: 250,
    marginBottom: 24,
  },

  buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },

  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  tabIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },

  alertOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  alertBox: {
    width: "85%",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
  },

  alertTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },

  alertMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },

  alertButton: {
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  alertButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  progressContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: 16, 
    gap: 8 
  },
   progressLine: { 
    width: 40, 
    height: 4, 
    borderRadius: 2 
  },
});
