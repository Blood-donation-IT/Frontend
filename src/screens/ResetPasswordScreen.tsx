import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../Theme/ThemeContext";
import ArrowLeft from "../images/arrow-left.png";
import Logo from "../images/logo.png";
import CreateNewPasswordScreen from "./Createpassword";
import { useTranslation } from "react-i18next";

export default function ResetPasswordScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const email = route.params?.email || "user@gmail.com";
  const { t } = useTranslation();

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [alertVisible, setAlertVisible] = useState(false);

  const handleChangeOtp = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const code = otp.join("");
    console.log("Entered OTP:", code);
    navigation.navigate("CreateNewPasswordScreen");
  };

  const handleSendAgain = () => {
    setAlertVisible(true);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.backgroundMain }]}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={ArrowLeft} style={[styles.backIcon, { tintColor: colors.secondary }]} />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <Text style={[styles.title, { color: colors.primary }]}>{t("reset_password")}</Text>

        <Text style={[styles.subtitle, { color: colors.text }]}>
          {t("enter_code_sent_to")} <Text style={{ color: colors.primary }}>{email}</Text>
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              style={[styles.otpInput, { borderColor: colors.primary, backgroundColor: colors.backgroundCard, color: colors.text }]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(val) => handleChangeOtp(val, idx)}
            />
          ))}
        </View>
        <Text style={[styles.otpText, { color: colors.text }]}>{t("enter_5_digit_code")}</Text>

        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleVerify}>
          <Text style={styles.buttonText}>{t("verify")}</Text>
        </TouchableOpacity>

        <Text style={[styles.footerText, { color: colors.text }]}>
          {t("didnt_receive_code")}{" "}
          <Text style={{ color: colors.primary, fontWeight: "bold" }} onPress={handleSendAgain}>
            {t("send_again")}
          </Text>
        </Text>

        <View style={styles.progressContainer}>
          <View style={[styles.progressLine, { backgroundColor: colors.text }]} />
          <View style={[styles.progressLine, { backgroundColor: colors.primary }]} />
          <View style={[styles.progressLine, { backgroundColor: colors.text }]} />
        </View>
      </ScrollView>

      <Modal transparent visible={alertVisible} animationType="fade">
        <View style={styles.alertOverlay}>
          <View style={[styles.alertBox, { backgroundColor: colors.backgroundCard, borderColor: colors.primary }]}>
            <Text style={[styles.alertTitle, { color: colors.text }]}>{t("success")}</Text>
            <Text style={[styles.alertMessage, { color: colors.text }]}>
              {t("code has been sent again to your email.")}
            </Text>
            <TouchableOpacity style={[styles.alertButton, { backgroundColor: colors.primary }]} onPress={() => setAlertVisible(false)}>
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
    paddingBottom: 40 
  },
  backButton: { 
    position: "absolute", 
    top: 50, 
    left: 24, 
    zIndex: 10 
  },
  backIcon: { 
    width: 48, 
    height: 48, 
    resizeMode: "contain" 
  },
  logoContainer: { 
    alignItems: "center", 
    marginBottom: 24 
  },
  logo: { 
    width: 120, 
    height: 120, 
    resizeMode: "contain" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 8, 
    alignSelf: "center" 
  },
  subtitle: { 
    fontSize: 14, 
    textAlign: "center", 
    marginBottom: 24 
  },
  otpContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 8 
  },
  otpInput: { 
    width: 50, 
    height: 50, 
    borderWidth: 1, 
    borderRadius: 12,
    textAlign: "center", 
    fontSize: 18 
  },
  otpText: { 
    fontSize: 12, 
    textAlign: "center", 
    marginBottom: 24 
  },
  button: { 
    height: 44, 
    borderRadius: 22, 
    alignItems: "center", 
    justifyContent: "center",
   width: "100%", 
   maxWidth: 250, 
   alignSelf: "center", 
   marginBottom: 24 
  },
  buttonText: { 
    fontWeight: "600", 
    fontSize: 16, 
    color: "#fff" 
  },
  footerText: { fontSize: 14, 
    textAlign: "center", 
    marginBottom: 16 
  },
  progressContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    marginTop: 16, 
    gap: 8 
  },
  progressLine: { width: 40, 
    height: 4, 
    borderRadius: 2 
  },
  alertOverlay: { flex: 1, 
    backgroundColor: "rgba(0,0,0,0.4)", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  alertBox: { width: "85%", 
    borderRadius: 16, 
    padding: 20, 
    borderWidth: 2 
  },
  alertTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    textAlign: "center", 
    marginBottom: 8 
  },
  alertMessage: { 
    fontSize: 14,
    textAlign: "center", 
    marginBottom: 20 
  },
  alertButton: { 
    height: 44, 
    borderRadius: 12, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  alertButtonText: {  
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
});
