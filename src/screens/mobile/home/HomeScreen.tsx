import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useTheme } from "../../../Theme/ThemeContext";
import { useTranslation } from "react-i18next";

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const markedDates = useMemo(() => {
    const dates = {};
    const today = new Date();
    for (let i = 0; i < 30; i += 3) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      dates[key] = { selected: true, selectedColor: colors.primary };
    }
    return dates;
  }, [colors.primary]);

  const onDayPress = (day: DateData) => {
    if (markedDates[day.dateString]) {
      navigation.navigate("Registration", { day: day.dateString });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.backgroundMain },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Advanced donor
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Text style={{ color: colors.primary }}>{t("notifications")}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.card, { backgroundColor: colors.backgroundCard }]}>
        <Calendar
          markedDates={markedDates}
          onDayPress={onDayPress}
          hideExtraDays
          firstDay={1}
          theme={{
            calendarBackground: colors.backgroundCard,
            dayTextColor: colors.text,
            textSectionTitleColor: colors.text,
            monthTextColor: colors.text,
            todayTextColor: colors.primary,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: "#fff",
          }}
        />
      </View>

      <View style={[styles.card, { backgroundColor: colors.backgroundCard }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("quick_actions")}
        </Text>
        <TouchableOpacity
          style={[styles.actionBtn, { borderColor: colors.primary }]}
          onPress={() => navigation.navigate("GetDonorBook")}
        >
          <Text style={{ color: colors.primary }}>{t("donors_book")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    paddingBottom: 120,
  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
  },
  card: {
    borderRadius: 18,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  actionBtn: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
});
