import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SUPPORT_EMAIL = "support@advanceddonor.app";
const TELEGRAM_URL = "https://t.me/advanceddonor_support";

interface SupportRowProps {
  iconComponent: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  onPress: () => void;
  cardBg: string;
  titleColor: string;
  subtitleColor: string;
  loading?: boolean;
  isLight: boolean;
}

const SupportRow = ({
  iconComponent,
  iconBg,
  title,
  subtitle,
  onPress,
  cardBg,
  titleColor,
  subtitleColor,
  loading = false,
  isLight,
}: SupportRowProps) => (
  <TouchableOpacity
    style={[rowStyles.card, { backgroundColor: cardBg }]}
    onPress={onPress}
    activeOpacity={0.75}
  >
    <View style={[rowStyles.iconBadge, { backgroundColor: iconBg }]}>
      {iconComponent}
    </View>
    <View style={rowStyles.textBlock}>
      <Text style={[rowStyles.title, { color: titleColor }]}>{title}</Text>
      <Text style={[rowStyles.subtitle, { color: subtitleColor }]} numberOfLines={1}>
        {subtitle}
      </Text>
    </View>
    {loading ? (
      <ActivityIndicator size="small" color={subtitleColor} />
    ) : (
      <View style={[rowStyles.chevronBg, { backgroundColor: isLight ? "#f0f0f0" : "#252528" }]}>
        <Ionicons name="chevron-forward" size={16} color={isLight ? "#aaaaaa" : "#555555"} />
      </View>
    )}
  </TouchableOpacity>
);

const rowStyles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "400",
  },
  chevronBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

const FaqTipRow = ({
  text,
  accent,
  bgColor,
  textColor,
}: {
  text: string;
  accent: string;
  bgColor: string;
  textColor: string;
}) => (
  <View style={[tipStyles.row, { backgroundColor: bgColor }]}>
    <View style={[tipStyles.dot, { backgroundColor: accent }]} />
    <Text style={[tipStyles.text, { color: textColor }]}>{text}</Text>
  </View>
);

const tipStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    flexShrink: 0,
  },
  text: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
  },
});

const SupportScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const { isLight, colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [emailLoading, setEmailLoading] = useState(false);
  const [tgLoading, setTgLoading] = useState(false);

  const bgColor = isLight ? "#f4f4f7" : "#121214";
  const cardBg = isLight ? "#ffffff" : "#1B1B1F";
  const headerTextColor = isLight ? "#1a1a1a" : "#E0E0E0";
  const subtitleColor = isLight ? "#888888" : "#777777";
  const accent = colors.primary || "#E66A6A";
  const heroBg = isLight ? "#fff5f5" : "#1F1A1A";
  const tipBg = isLight ? "#f8f8f8" : "#1A1A1E";

  const openEmail = async () => {
    setEmailLoading(true);
    const url = `mailto:${SUPPORT_EMAIL}?subject=Support%20Request%20–%20Advanced%20Donor`;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          t("no_email_client") || "No Email Client",
          `${t("contact_directly") || "Please contact us directly at"} ${SUPPORT_EMAIL}`
        );
      }
    } catch {
      Alert.alert(t("error") || "Error", t("could_not_open_email") || "Could not open email client.");
    } finally {
      setEmailLoading(false);
    }
  };

  const openTelegram = async () => {
    setTgLoading(true);
    try {
      const canOpen = await Linking.canOpenURL(TELEGRAM_URL);
      if (canOpen) {
        await Linking.openURL(TELEGRAM_URL);
      } else {
        Alert.alert(
          t("telegram_not_found") || "Telegram Not Found",
          t("install_telegram") || "Please install Telegram to use this feature."
        );
      }
    } catch {
      Alert.alert(t("error") || "Error", t("could_not_open_telegram") || "Could not open Telegram.");
    } finally {
      setTgLoading(false);
    }
  };

  const TIPS = [
    t("support_tip_1") || "Include your registered email address and device model.",
    t("support_tip_2") || "Describe the issue with as much detail as possible.",
    t("support_tip_3") || "Attach a screenshot if the issue is visual.",
  ];

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
          {t("support") || "Support"}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.heroBanner, { backgroundColor: heroBg }]}>
          <View style={[styles.heroIconRing, { borderColor: accent + "44" }]}>
            <View style={[styles.heroIconCircle, { backgroundColor: accent + "22" }]}>
              <Ionicons name="headset" size={36} color={accent} />
            </View>
          </View>
          <Text style={[styles.heroHeading, { color: headerTextColor }]}>
            {t("support_hero_heading") || "How can we help?"}
          </Text>
          <Text style={[styles.heroSub, { color: subtitleColor }]}>
            {t("support_hero_sub") ||
              "Our team is here for you. Reach out via email or Telegram and we'll respond as quickly as possible."}
          </Text>
        </View>

        {/* Response Time Badge */}
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: isLight ? "#e8faf0" : "#0f2018" }]}>
            <Ionicons name="time-outline" size={14} color="#3DB87A" />
            <Text style={[styles.badgeText, { color: "#3DB87A" }]}>
              {t("avg_response") || "Avg. response time: under 4 hours"}
            </Text>
          </View>
        </View>

        {/* Channel Cards */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: accent }]}>
            {t("contact_channels") || "Contact Channels"}
          </Text>
          <View style={styles.channelList}>
            <SupportRow
              iconComponent={
                <Ionicons name="mail" size={24} color="#ffffff" />
              }
              iconBg="#C85858"
              title={t("email_support") || "Email Support"}
              subtitle={SUPPORT_EMAIL}
              onPress={openEmail}
              cardBg={cardBg}
              titleColor={headerTextColor}
              subtitleColor={subtitleColor}
              loading={emailLoading}
              isLight={isLight}
            />
            <SupportRow
              iconComponent={
                <MaterialCommunityIcons name="send" size={22} color="#ffffff" />
              }
              iconBg="#2AABEE"
              title={t("telegram_chat") || "Telegram Chat"}
              subtitle={t("telegram_sub") || "Fast replies, file sharing & more"}
              onPress={openTelegram}
              cardBg={cardBg}
              titleColor={headerTextColor}
              subtitleColor={subtitleColor}
              loading={tgLoading}
              isLight={isLight}
            />
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: accent }]}>
            {t("tips_for_faster") || "Tips for Faster Resolution"}
          </Text>
          <View style={[styles.tipsCard, { backgroundColor: cardBg }]}>
            {TIPS.map((tip, i) => (
              <FaqTipRow
                key={i}
                text={tip}
                accent={accent}
                bgColor={i % 2 === 0 ? tipBg : "transparent"}
                textColor={subtitleColor}
              />
            ))}
          </View>
        </View>

        {/* Hours Banner */}
        <View style={[styles.hoursBanner, { backgroundColor: isLight ? "#fff5f5" : "#1F1A1A" }]}>
          <Ionicons name="calendar-outline" size={18} color={accent} />
          <View style={styles.hoursText}>
            <Text style={[styles.hoursTitle, { color: headerTextColor }]}>
              {t("support_hours_title") || "Support Hours"}
            </Text>
            <Text style={[styles.hoursBody, { color: subtitleColor }]}>
              {t("support_hours_body") || "Monday – Friday, 9:00 AM – 6:00 PM (UTC+2)"}
            </Text>
          </View>
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
    gap: 20,
  },
  heroBanner: {
    alignItems: "center",
    paddingVertical: 36,
    paddingHorizontal: 28,
    gap: 12,
  },
  heroIconRing: {
    width: 96,
    height: 96,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  heroIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  heroHeading: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.3,
    textAlign: "center",
  },
  heroSub: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    maxWidth: 300,
  },
  badgeRow: {
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 16,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    paddingLeft: 4,
  },
  channelList: {
    gap: 10,
  },
  tipsCard: {
    borderRadius: 18,
    overflow: "hidden",
    gap: 2,
    padding: 8,
  },
  hoursBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 18,
  },
  hoursText: {
    flex: 1,
    gap: 3,
  },
  hoursTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  hoursBody: {
    fontSize: 13,
    lineHeight: 18,
  },
});

export default SupportScreen;