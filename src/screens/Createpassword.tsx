import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../Theme/ThemeContext";
import ArrowLeft from "../images/arrow-left.png";
import Logo from "../images/logo.png";
import SliderIcon from "../images/Slider_ForgetScreen.png";

export default function CreateNewPasswordScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleContinue = () => {
    console.log("New Password:", newPassword, "Confirm Password:", confirmPassword, "Remember:", rememberPassword);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.backgroundMain }]} keyboardShouldPersistTaps="handled">
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={ArrowLeft} style={[styles.backIcon, { tintColor: colors.secondary }]} />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={[styles.title, { color: colors.primary }]}>Create New Password</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        Your new password must be different from previous used password
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.backgroundCard, borderColor: colors.primary, color: colors.text }]}
          placeholder="New Password"
          placeholderTextColor={colors.text}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.backgroundCard, borderColor: colors.primary, color: colors.text }]}
          placeholder="Confirm Password"
          placeholderTextColor={colors.text}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={styles.switchContainer}>
        <Switch
          value={rememberPassword}
          onValueChange={setRememberPassword}
          trackColor={{ false: "#ccc", true: colors.primary }}
          thumbColor={rememberPassword ? colors.primary : "#fff"}
        />
        <Text style={[styles.switchText, { color: colors.text }]}>Remember and save my password</Text>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <View style={[styles.progressLine, { backgroundColor: colors.text }]} />
        <View style={[styles.progressLine, { backgroundColor: colors.text }]} />
        <View style={[styles.progressLine, { backgroundColor: colors.primary }]} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "flex-start", paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  backButton: { marginBottom: 24 },
  backIcon: { width: 48, height: 48, resizeMode: "contain" },
  logoContainer: { alignItems: "center", marginBottom: 24 },
  logo: { width: 120, height: 120, resizeMode: "contain" },
  bottomTabs: { flexDirection: "row", justifyContent: "space-around", marginBottom: 24 },
  tabButton: { alignItems: "center", justifyContent: "center" },
  tabIcon: { width: 40, height: 40, resizeMode: "contain" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, alignSelf: "center" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 32 },
  inputContainer: { marginBottom: 24 },
  input: { height: 50, borderWidth: 1, borderRadius: 22, paddingHorizontal: 16, marginBottom: 12 },
  switchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 24, gap: 12 },
  switchText: { fontSize: 14 },
  button: { height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", width: "100%", maxWidth: 250, alignSelf: "center", marginBottom: 24 },
  buttonText: { fontWeight: "600", fontSize: 16, color: "#fff" },
  progressContainer: { flexDirection: "row", justifyContent: "center", marginTop: 16, gap: 8 },
  progressLine: { width: 40, height: 4, borderRadius: 2 },
});
