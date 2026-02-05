import "intl-pluralrules"; // Для правильної роботи чисел на Android
import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { format, differenceInCalendarDays } from "date-fns";
import { uk, enUS } from "date-fns/locale";

const createDateWithOffset = (daysOffset, hours, minutes) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
};


const getDeclinedDayName = (date, language) => {
  if (language === 'uk') {
    const dayIndex = date.getDay(); 
    const days = [
      "Неділю",   
      "Понеділок",
      "Вівторок", 
      "Середу",   
      "Четвер",   
      "П'ятницю", 
      "Суботу"    
    ];
    return days[dayIndex];
  }
  
  return format(date, "EEEE", { locale: enUS });
};

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  
  // Цей locale потрібен для інших форматів дат
  const currentLocale = i18n.language === "uk" ? uk : enUS;

  
  const notifications = [
    { id: "1", titleKey: "donation_reminder_title", messageKey: "donation_reminder", date: createDateWithOffset(0, 10, 0) },
    { id: "2", titleKey: null, messageKey: "donation_reminder", date: createDateWithOffset(-15, 16, 20) }, 
    { id: "3", titleKey: "account_setup_success", messageKey: null, date: createDateWithOffset(-365, 14, 40) },
    
  ];

  const groupedNotifications = useMemo(() => {
    
    const sorted = [...notifications].sort((a, b) => a.date.getTime() - b.date.getTime());

    const groups = {};
    
    sorted.forEach((item) => {
      const diff = differenceInCalendarDays(new Date(), item.date);
      let title = "";

      if (diff === 0) title = t("today");
      else if (diff === 1) title = t("yesterday");
      else if (diff < 7) {
        title = t("daysAgo", { count: diff }); 
      } else if (diff < 365) {
        const weeks = Math.floor(diff / 7);
        title = t("weeksAgo", { count: weeks }); 
      } else {
        const years = Math.floor(diff / 365);
        title = t("yearsAgo", { count: years });
      }

      if (!groups[title]) groups[title] = [];
      groups[title].push(item);
    });

    return groups;
  }, [i18n.language, notifications, t]);

  const sectionTitles = Object.keys(groupedNotifications).reverse();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("notifications")}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {sectionTitles.map((sectionTitle) => (
          <View key={sectionTitle}>
            <Text style={[
              styles.sectionTitle, 
              sectionTitle === t("today") ? { color: "#d76565" } : { color: "#000" }
            ]}>
              {sectionTitle}
            </Text>

            {groupedNotifications[sectionTitle].map((item) => {
              // Отримуємо правильну назву дня
              const dayName = getDeclinedDayName(item.date, i18n.language);
              const timeStr = format(item.date, "HH:mm");

              return (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardContent}>
                    {item.titleKey && <Text style={styles.cardText}>{t(item.titleKey)}</Text>}
                    {item.messageKey && (
                      <Text style={styles.cardText}>
                        {t(item.messageKey, { time: timeStr, day: dayName })}
                      </Text>
                    )}
                    <Text style={styles.time}>{timeStr}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 60,
    paddingBottom: 10,
    marginLeft: -20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 0,
    marginBottom: 10,
    color: "#d76565",
  },
  card: {
    width: "100%",
    backgroundColor: "#faf5f5ff",
    borderRadius: 14,
    padding: 15,
    borderWidth: 1.5,
    borderColor: "#edd0d0ff",
    marginBottom: 20,
  },
  cardContent: {
    marginBottom: -10,
  },
  cardText: {
    fontSize: 15,
    color: "#000000ff",
    fontWeight: "600",
  },
  time: {
    fontSize: 13,
    color: "#777",
    textAlign: "right",
  },
});