import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Theme/ThemeContext";

const ProfileScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.backgroundMain }]}>
      <TouchableOpacity 
        style={styles.menuBtn}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image 
          source={require("../images/menu.png")} 
          style={[styles.menuImg, { tintColor: colors.text }]} 
        />
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        {/* Аватар тепер має колір картки та рамку */}
        <View style={[styles.avatar, { backgroundColor: colors.backgroundCard, borderColor: colors.text + '20', borderWidth: 1 }]} />
        
        <Text style={[styles.name, { color: colors.text }]}>Somebody</Text>
        
        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: colors.primary, borderColor: colors.primary + '40' }]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>{t("edit_profile")}</Text>
        </TouchableOpacity>
        
        <Text style={[styles.lastDonation, { color: colors.text, opacity: 0.6 }]}>
          {t("last_donation")}: September 11, 2001
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: colors.backgroundCard, borderColor: colors.primary + '33' }]}>
          <Text style={[styles.statLabel, { color: colors.primary }]}>{t("donated")}</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>01</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.backgroundCard, borderColor: colors.primary + '33' }]}>
          <Text style={[styles.statLabel, { color: colors.primary }]}>{t("blood_type")}</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>A-</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.backgroundCard, borderColor: colors.primary + '33' }]}>
          <Text style={[styles.statLabel, { color: colors.primary }]}>{t("life_saved")}</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>02</Text>
        </View>
      </View>

      <View style={[styles.statusCard, { backgroundColor: colors.backgroundCard, borderColor: colors.primary + '50' }]}>
        <Text style={[styles.statusLabel, { color: colors.primary }]}>{t("donor_status")}</Text>
        <Text style={[styles.statusValue, { color: colors.text }]}>Honorary Donor of Ukraine</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    paddingHorizontal: "5%",
    paddingVertical: 40,
    gap: 20,
    // backgroundColor видалено звідси, бо тепер він динамічний
  },
  menuBtn: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  menuImg: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    // колір background перенесено в inline styles
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  editButton: {
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  editButtonText: {
    color: "#fff", // Текст на кнопці зазвичай залишається білим
    fontWeight: "600",
    fontSize: 14,
  },
  lastDonation: {
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
    alignItems: "center",
  },
  statLabel: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },
  statusLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 14,
  },
});

export default ProfileScreen;