import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import { useAuthStore } from "../../../stores/useAuthStore";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, donations, fetchUserDonations } = useAuthStore();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchUserDonations();
  }, []);

  const lastDonationDate = user?.last_donation ? new Date(user.last_donation) : null;

  const formattedDate = lastDonationDate && !isNaN(lastDonationDate)
    ? new Intl.DateTimeFormat(i18n.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(lastDonationDate)
    : null;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.backgroundMain },
      ]}
    >
      <TouchableOpacity
        style={styles.menuBtn}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image
          source={require("../../../images/menu.png")}
          style={[styles.menuImg, { tintColor: colors.text }]}
        />
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: user?.avatar }}
          style={[
            styles.avatar,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.text + "20",
              borderWidth: 1,
            },
          ]}
        />
        <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
        <TouchableOpacity
          style={[
            styles.editButton,
            {
              backgroundColor: colors.primary,
              borderColor: colors.primary + "40",
            },
          ]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>{t("edit_profile")}</Text>
        </TouchableOpacity>
        <Text
          style={[styles.lastDonation, { color: colors.text, opacity: 0.6 }]}
        >
          {t("last_donation")}: {formattedDate || "N/A"}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View
          style={[
            styles.statBox,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.primary + "33",
            },
          ]}
        >
          <Text style={[styles.statLabel, { color: colors.primary }]}>
            {t("donated")}
          </Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {user?.donations_count}
          </Text>
        </View>
        <View
          style={[
            styles.statBox,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.primary + "33",
            },
          ]}
        >
          <Text style={[styles.statLabel, { color: colors.primary }]}>
            {t("blood_type")}
          </Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {user?.blood_type || "N/A"}
          </Text>
        </View>
        <View
          style={[
            styles.statBox,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.primary + "33",
            },
          ]}
        >
          <Text style={[styles.statLabel, { color: colors.primary }]}>
            {t("life_saved")}
          </Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {user?.lives_saved_count}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.statusCard,
          {
            backgroundColor: colors.backgroundCard,
            borderColor: colors.primary + "50",
          },
        ]}
      >
        <Text style={[styles.statusLabel, { color: colors.primary }]}>
          {t("donor_status")}
        </Text>
        <Text style={[styles.statusValue, { color: colors.text }]}>
          {user?.donor_status || t("honorary_donor_of_ukraine")}
        </Text>
      </View>

      <View
        style={[
          styles.statusCard,
          {
            backgroundColor: colors.backgroundCard,
            borderColor: colors.primary + "50",
          },
        ]}
      >
        <Text
          style={[
            styles.statusLabel,
            { color: colors.primary, paddingBottom: 10 },
          ]}
        >
          {t("my_donations")}
        </Text>
        {donations.length > 0 ? (
          donations.map((item, index) => (
            <View
              key={item.id || index}
              style={[
                styles.donationItem,
                {
                  backgroundColor: colors.backgroundCard,
                  borderLeftColor: colors.primary,
                },
              ]}
            >
              <View>
                <Text style={[styles.donationDate, { color: colors.text }]}>
                  {new Date(item.application_day).toLocaleDateString()}
                </Text>
                <Text
                  style={[
                    styles.donationStatus,
                    { color: colors.text, opacity: 0.7 },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
              <Text style={[styles.donationType, { color: colors.primary }]}>
                {item.blood_type}
              </Text>
            </View>
          ))
        ) : (
          <Text
            style={[styles.emptyText, { color: colors.text, opacity: 0.5 }]}
          >
            {t("no_donations_yet")}
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  donationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  donationDate: {
    fontSize: 16,
    fontWeight: "600",
  },
  donationStatus: {
    fontSize: 14,
    marginTop: 2,
  },
  donationType: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
  container: {
    minHeight: "100%",
    paddingHorizontal: "5%",
    paddingVertical: 40,
    gap: 20,
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
    color: "#fff",
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
    fontWeight: "500",
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
    fontWeight: "500",
    fontSize: 12,
    marginBottom: 4,
  },
  statusValue: {
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ProfileScreen;
