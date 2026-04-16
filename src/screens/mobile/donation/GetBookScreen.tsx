import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Theme/ThemeContext";
import { useTranslation } from "react-i18next";

const GetBookScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [donations, setDonations] = useState(0);
  const maxDonations = 5;
  const remainingDonations = maxDonations - donations;
  const isReady = donations >= maxDonations;

  const progressColor = isReady ? "#10B981" : "#EF4444"; // Зелений або Червоний

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.backgroundMain },
      ]}
    >
      <Text style={[styles.mainTitle, { color: colors.text }]}>
        {t("donor_id_title", "Donor ID")}
      </Text>

      {/* Круговий прогрес */}
      <View style={styles.progressSection}>
        <View style={[styles.progressCircle, { borderColor: progressColor }]}>
          <Text style={[styles.progressValue, { color: colors.text }]}>
            {donations}/{maxDonations}
          </Text>
          <Text style={[styles.progressLabel, { color: "#888" }]}>
            {t("donations_label", "donations")}
          </Text>
        </View>

        <Text style={[styles.statusTitle, { color: colors.text }]}>
          {isReady ? t("completed", "Completed") : t("days_left", "3 days left")}
        </Text>
        <Text style={[styles.statusSubtitle, { color: colors.text }]}>
          {isReady
            ? t("now_you_have_book", "now you have a donor book")
            : t("to_receive_book", "to receive the donor's book")}
        </Text>
      </View>

      {/* Інформаційні картки */}
      <View style={styles.infoSection}>
        <View style={[styles.infoCard, { backgroundColor: colors.backgroundCard, borderColor: "#FCA5A5" }]}>
          <Text style={styles.cardTitle}>
            {t("what_is_donor_book", "What is donor book?")}
          </Text>
          <Text style={[styles.cardText, { color: colors.text }]}>
            {t(
              "donor_book_desc",
              "A donor card is an official document confirming your status as a blood donor. It entitles you to benefits, free examinations, and priority medical care."
            )}
          </Text>
        </View>

        {!isReady && (
          <View style={[styles.infoCard, { backgroundColor: colors.backgroundCard, borderColor: "#D1D5DB" }]}>
            <Text style={[styles.cardText, { color: colors.text }]}>
              {t("to_receive_need_5", "To receive the book, you need to make")} <Text style={styles.highlightText}>5 donations</Text>.
            </Text>
            <Text style={[styles.cardText, { color: colors.text, marginTop: 10 }]}>
              {t("already_donated", "You have already donated blood")} <Text style={styles.boldText}>{donations}</Text> {t("times", "times")} - {t("only", "only")} <Text style={styles.highlightText}>{remainingDonations} {t("donations_left", "donations left!")}</Text>
            </Text>
          </View>
        )}
      </View>

      {/* Кнопка */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isReady ? "#EF4444" : "#D1D5DB" },
          ]}
          onPress={() => {
            if (!isReady) {
              setDonations((d) => Math.min(d + 1, maxDonations));
            } else {
              navigation.navigate("BookScreen");
            }
          }}
        >
          <Text style={[styles.buttonText, { color: isReady ? "#FFF" : "#6B7280" }]}>
            {t("get_donor_id", "Get Donor ID")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  progressSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  progressCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  progressValue: {
    fontSize: 32,
    fontWeight: "bold",
  },
  progressLabel: {
    fontSize: 14,
    marginTop: -4,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  infoSection: {
    width: "100%",
    marginBottom: 40,
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EF4444",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
  highlightText: {
    color: "#EF4444",
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
  },
  bottomSection: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GetBookScreen;