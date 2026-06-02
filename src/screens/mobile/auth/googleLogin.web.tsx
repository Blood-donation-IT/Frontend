import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useTranslation } from "react-i18next";

export default function GoogleLogin() {
  const { t } = useTranslation();

  const onGoogleButtonPress = () => {
    Alert.alert("Google",);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>{t("or_sign_in_with")}</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialButtonsRow}>
        <TouchableOpacity style={styles.socialButton} onPress={onGoogleButtonPress}>
          <Image source={require("../../../images/google_icon.png")} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export async function signOut() {}

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
