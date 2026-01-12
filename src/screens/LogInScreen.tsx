import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Theme/ThemeContext";
import GoogleLogin from "./googleLogin";

export default function LogInScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme(); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    navigation.navigate("Home");
  };

  const logoSource = isDark 
    ? require('../images/logo-white.png') 
    : require('../images/logo.png');

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.backgroundMain },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Image 
        source={logoSource} 
        style={styles.logo} 
      />

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
       <TouchableOpacity onPress={() => navigation.navigate("ForgetScreen")}>
          <Text style={{ color: colors.primary, fontWeight: "bold", marginBottom: 16, alignSelf: "flex-end" }}>
         Forgot Password?
          </Text>
        </TouchableOpacity>
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
        <Text style={{ color: colors.text }}>
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
  logo: {
    width: 120,   
    height: 40,   
    resizeMode: 'contain',
    alignSelf: "center", 
    marginBottom: 32,   
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