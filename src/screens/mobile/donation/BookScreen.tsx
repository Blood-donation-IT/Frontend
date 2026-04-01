import React from "react";
import { StyleSheet, View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../../../Theme/ThemeContext";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useTranslation } from "react-i18next";

const BookScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const qrValue = `https://blood-donation.com/user/${user?.id || "guest"}`;

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundMain }]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.backgroundCard,
            borderColor: colors.primary,
          },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>
          {t("donors_book")}
        </Text>
        <Text style={[styles.text, { color: colors.text }]}>
          {user?.name || "User"}
        </Text>
        <Text style={[styles.text, { color: colors.text }]}>
          {t("blood_type")}: {user?.blood_type || "N/A"}
        </Text>
        <View style={styles.qrWrap}>
          <QRCode value={qrValue} size={170} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderWidth: 1,
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 18,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
  qrWrap: {
    marginTop: 18,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
});

export default BookScreen;
