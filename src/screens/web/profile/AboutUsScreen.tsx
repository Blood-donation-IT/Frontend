import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const APP_VERSION = "1.0.0";

const StatPill = ({
  value,
  label,
  accent,
  bg,
  textColor,
}: {
  value: string;
  label: string;
  accent: string;
  bg: string;
  textColor: string;
}) => (
  <View style={[statStyles.pill, { backgroundColor: bg }]}>
    <Text style={[statStyles.value, { color: accent }]}>{value}</Text>
    <Text style={[statStyles.label, { color: textColor }]}>{label}</Text>
  </View>
);

const statStyles = StyleSheet.create({
  pill: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    opacity: 0.75,
  },
});

const InfoCard = ({
  icon,
  iconBg,
  title,
  body,
  cardBg,
  titleColor,
  bodyColor,
  accentColor,
}: {
  icon: string;
  iconBg: string;
  title: string;
  body: string;
  cardBg: string;
  titleColor: string;
  bodyColor: string;
  accentColor: string;
}) => (
  <View style={[cardStyles.card, { backgroundColor: cardBg }]}>
    <View style={[cardStyles.iconBadge, { backgroundColor: iconBg }]}>
      <Ionicons name={icon as any} size={22} color={accentColor} />
    </View>
    <View style={cardStyles.cardContent}>
      <Text style={[cardStyles.cardTitle, { color: titleColor }]}>{title}</Text>
      <Text style={[cardStyles.cardBody, { color: bodyColor }]}>{body}</Text>
    </View>
  </View>
);

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardContent: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 21,
  },
});

const AboutUsScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const { isLight, colors } = useTheme();
  const insets = useSafeAreaInsets();

  const bgColor = isLight ? "#f4f4f7" : "#121214";
  const cardBg = isLight ? "#ffffff" : "#1B1B1F";
  const headerTextColor = isLight ? "#1a1a1a" : "#E0E0E0";
  const subtitleColor = isLight ? "#888888" : "#777777";
  const bodyColor = isLight ? "#555555" : "#999999";
  const accent = colors.primary || "#E66A6A";
  const pillBg = isLight ? "#f8f8f8" : "#1F1F23";
  const heroBg = isLight ? "#fff5f5" : "#1F1A1A";
  const iconBg = accent + "22";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: isLight ? "#ebebeb" : "#1F1F23" }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={isLight ? "#1a1a1a" : "#E0E0E0"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: headerTextColor }]}>
          {t("about_us") || "About Us"}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Branding Block */}
        <View style={[styles.heroBrand, { backgroundColor: heroBg }]}>
          <View style={[styles.logoCircle, { backgroundColor: accent }]}>
            <MaterialCommunityIcons name="water" size={44} color="#ffffff" />
          </View>
          <Text style={[styles.appName, { color: headerTextColor }]}>Advanced Donor</Text>
          <View style={[styles.versionChip, { backgroundColor: isLight ? "#ebebeb" : "#262629" }]}>
            <Text style={[styles.versionText, { color: subtitleColor }]}>
              v{APP_VERSION}
            </Text>
          </View>
          <Text style={[styles.heroTagline, { color: subtitleColor }]}>
            {t("about_tagline") ||
              "Connecting donors and saving lives — one drop at a time."}
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatPill
            value="12K+"
            label={t("stat_donors") || "Active Donors"}
            accent={accent}
            bg={pillBg}
            textColor={bodyColor}
          />
          <StatPill
            value="98%"
            label={t("stat_satisfaction") || "Satisfaction"}
            accent={accent}
            bg={pillBg}
            textColor={bodyColor}
          />
          <StatPill
            value="3K+"
            label={t("stat_lives") || "Lives Saved"}
            accent={accent}
            bg={pillBg}
            textColor={bodyColor}
          />
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          <InfoCard
            icon="heart"
            iconBg={iconBg}
            title={t("our_mission_title") || "Our Mission"}
            body={
              t("our_mission_body") ||
              "Advanced Donor was built to make blood donation accessible, organized, and impactful. We bridge the gap between donors and hospitals by providing real-time donation tracking, eligibility reminders, and a network of verified donation centers."
            }
            cardBg={cardBg}
            titleColor={headerTextColor}
            bodyColor={bodyColor}
            accentColor={accent}
          />

          <InfoCard
            icon="pulse"
            iconBg={iconBg}
            title={t("why_it_matters_title") || "Why It Matters"}
            body={
              t("why_it_matters_body") ||
              "Every 2 seconds, someone needs blood. A single donation can save up to 3 lives. Despite this critical need, many donation centers struggle with supply. By connecting willing donors with those in need, Advanced Donor is building a resilient, community-driven blood supply network."
            }
            cardBg={cardBg}
            titleColor={headerTextColor}
            bodyColor={bodyColor}
            accentColor={accent}
          />

          <InfoCard
            icon="shield-checkmark"
            iconBg={iconBg}
            title={t("safe_secure_title") || "Safe & Secure"}
            body={
              t("safe_secure_body") ||
              "Your privacy and health data are protected with industry-standard encryption. We never share personal information with third parties without explicit consent. Our platform adheres to all applicable health data regulations."
            }
            cardBg={cardBg}
            titleColor={headerTextColor}
            bodyColor={bodyColor}
            accentColor={accent}
          />
        </View>

        {/* Footer */}
        <View style={styles.footerBlock}>
          <Text style={[styles.footerCopy, { color: subtitleColor }]}>
            © {new Date().getFullYear()} Advanced Donor. {"\n"}
            {t("all_rights_reserved") || "All rights reserved."}
          </Text>
          <View style={styles.footerDivider} />
          <Text style={[styles.footerMadeWith, { color: subtitleColor }]}>
            Made with{" "}
            <Text style={{ color: accent }}>♥</Text>
            {" "}for donors everywhere
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  scrollContent: {
    paddingBottom: 52,
    gap: 16,
  },
  heroBrand: {
    alignItems: "center",
    paddingVertical: 36,
    paddingHorizontal: 24,
    gap: 10,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    shadowColor: "#E66A6A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  appName: {
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  versionChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  versionText: {
    fontSize: 12,
    fontWeight: "600",
  },
  heroTagline: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 4,
    maxWidth: 280,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  footerBlock: {
    alignItems: "center",
    paddingVertical: 8,
    gap: 8,
  },
  footerCopy: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  footerDivider: {
    width: 40,
    height: 1,
    backgroundColor: "#333",
    marginVertical: 4,
  },
  footerMadeWith: {
    fontSize: 12,
  },
});

export default AboutUsScreen;