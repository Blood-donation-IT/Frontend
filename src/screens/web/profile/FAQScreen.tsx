import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQ_DATA = [
  {
    id: "1",
    question: "How often can I donate blood?",
    answer:
      "Whole blood donors can give every 56 days (8 weeks). Platelet donors can give every 7 days, up to 24 times per year. Double red cell donors must wait 112 days between donations. Always confirm with your donation center for personalized guidance.",
  },
  {
    id: "2",
    question: "Is blood donation safe?",
    answer:
      "Yes. Donating blood is completely safe. A new, sterile needle is used for each donor and discarded afterward. You cannot get any infection from donating blood. The process is supervised by trained medical staff throughout.",
  },
  {
    id: "3",
    question: "How should I prepare before donating?",
    answer:
      "Drink plenty of water and eat a healthy, iron-rich meal before your appointment. Avoid fatty foods, alcohol, and smoking for at least 24 hours prior. Wear comfortable clothing with sleeves that roll up easily. Bring a valid photo ID.",
  },
  {
    id: "4",
    question: "Who can donate blood?",
    answer:
      "Most healthy adults aged 18–65 who weigh at least 50 kg (110 lbs) are eligible. You must not have donated blood in the past 56 days and must be free of infectious diseases. Certain medications and travel history may temporarily defer eligibility.",
  },
  {
    id: "5",
    question: "How long does the donation process take?",
    answer:
      "The actual blood draw takes only 8–10 minutes. Including registration, health screening, and a brief rest period with refreshments, the entire visit typically takes 45–60 minutes. Platelet donation takes longer — approximately 1.5 to 2.5 hours.",
  },
  {
    id: "6",
    question: "Will I feel weak after donating?",
    answer:
      "Most people feel perfectly fine after donating. Some may experience mild lightheadedness. To minimize this, stay hydrated, avoid heavy exercise for the rest of the day, and enjoy the snacks provided at the donation center. Your body replenishes the donated blood volume within 24 hours.",
  },
];

const AccordionItem = ({
  item,
  isOpen,
  onToggle,
  colors,
  isLight,
}: {
  item: (typeof FAQ_DATA)[0];
  isOpen: boolean;
  onToggle: () => void;
  colors: any;
  isLight: boolean;
}) => {
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  const handleToggle = () => {
    LayoutAnimation.configureNext({
      duration: 260,
      create: { type: "easeInEaseOut", property: "opacity" },
      update: { type: "spring", springDamping: 0.82 },
    });
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 240,
      useNativeDriver: true,
    }).start();
    onToggle();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const cardBg = isLight ? "#ffffff" : "#1B1B1F";
  const borderColor = isLight ? "#f0f0f0" : "#2a2829";
  const questionColor = isLight ? "#1a1a1a" : "#E0E0E0";
  const answerColor = isLight ? "#555555" : "#999999";
  const accentColor = colors.primary || "#E66A6A";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handleToggle}
      style={[
        styles.accordionCard,
        {
          backgroundColor: cardBg,
          borderColor: isOpen ? accentColor + "44" : borderColor,
          borderWidth: isOpen ? 1.5 : 1,
        },
      ]}
    >
      <View style={styles.accordionHeader}>
        <View style={[styles.questionNumberBadge, { backgroundColor: accentColor + "20" }]}>
          <Text style={[styles.questionNumber, { color: accentColor }]}>{item.id}</Text>
        </View>
        <Text style={[styles.questionText, { color: questionColor }]}>{item.question}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons
            name="chevron-down"
            size={18}
            color={isOpen ? accentColor : answerColor}
          />
        </Animated.View>
      </View>
      {isOpen && (
        <View style={[styles.answerContainer, { borderTopColor: borderColor }]}>
          <Text style={[styles.answerText, { color: answerColor }]}>{item.answer}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const FAQScreen = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const { isLight, colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [openId, setOpenId] = useState<string | null>(null);

  const bgColor = isLight ? "#f4f4f7" : "#121214";
  const headerTextColor = isLight ? "#1a1a1a" : "#E0E0E0";
  const subtitleColor = isLight ? "#888888" : "#666666";

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
          {t("faq") || "FAQ"}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroBanner}>
          <View style={[styles.heroIconCircle, { backgroundColor: (colors.primary || "#E66A6A") + "22" }]}>
            <Ionicons name="help-circle" size={38} color={colors.primary || "#E66A6A"} />
          </View>
          <Text style={[styles.heroTitle, { color: headerTextColor }]}>
            {t("faq_hero_title") || "Frequently Asked Questions"}
          </Text>
          <Text style={[styles.heroSubtitle, { color: subtitleColor }]}>
            {t("faq_hero_subtitle") || "Everything you need to know about blood donation"}
          </Text>
        </View>

        <View style={styles.listContainer}>
          {FAQ_DATA.map((item) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              colors={colors}
              isLight={isLight}
            />
          ))}
        </View>

        <View style={[styles.footerBanner, { backgroundColor: isLight ? "#fff0f0" : "#1F1A1A" }]}>
          <Ionicons name="heart" size={16} color={colors.primary || "#E66A6A"} />
          <Text style={[styles.footerText, { color: subtitleColor }]}>
            {t("faq_footer") || "Still have questions? Visit our Support section."}
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
    paddingBottom: 48,
  },
  heroBanner: {
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 32,
  },
  heroIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  heroSubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  accordionCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 2,
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  questionNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  questionNumber: {
    fontSize: 12,
    fontWeight: "700",
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 21,
  },
  answerContainer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 22,
  },
  footerBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 14,
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});

export default FAQScreen;