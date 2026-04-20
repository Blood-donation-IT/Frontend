import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "../../../Theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useAuthStore } from "../../../stores/useAuthStore";
export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const { user } = useAuthStore();
  
  const [isAppointmentExpanded, setIsAppointmentExpanded] = useState(true);

  const markedDates = useMemo(() => {
    return {
      "2026-08-10": { selected: true, marked: true, dotColor: "#ff4d4d", selectedColor: "transparent", selectedTextColor: "#000", customStyles: { container: { borderWidth: 1, borderColor: "#ff4d4d", borderStyle: "dashed" } } },
      "2026-08-16": { selected: true, selectedColor: "#ff4d4d" },
      "2026-08-17": { selected: true, selectedColor: "#ff4d4d" },
      "2026-08-19": { selected: true, selectedColor: "#ff4d4d" },
      "2026-08-20": { selected: true, selectedColor: "#ff4d4d" },
      "2026-08-22": { selected: true, selectedColor: "#ff6b81", customStyles: { container: { borderRadius: 50 } } },
      "2026-08-30": { selected: true, selectedColor: "#8c52ff" },
    };
  }, []);

  const onDayPress = () => {
    navigation.navigate("Registration", { day: format(new Date(), "yyyy-MM-dd") });//day.dateString
  };

  const QuickActionBtn = ({ icon, title, color, onPress }) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={[styles.iconWrapper, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={styles.logoRow}>
              {/* <MaterialCommunityIcons name="water" size={24} color="#ff4d4d" /> */}
              <Image 
                source={require("../../../images/logo.png")} // Шлях до твого файлу
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Hello, <Text style={styles.boldText}>{user?.name}</Text> 👋
            </Text>
            <Text style={styles.subtitle}>
              Your Blood <Text style={{ color: "#ff4d4d" }}>Saves Lives!</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")} style={styles.bellBtn}>
            <Feather name="bell" size={24} color="#ff4d4d" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Appointment Banner */}
        <TouchableOpacity 
          style={styles.appointmentBanner}
          activeOpacity={0.8}
          onPress={() => setIsAppointmentExpanded(!isAppointmentExpanded)}
        >
          {isAppointmentExpanded ? (
            <View>
              <View style={styles.appointmentHeaderRow}>
                <View style={styles.row}>
                  <Ionicons name="calendar-outline" size={16} color="#fff" />
                  <Text style={styles.appointmentLabel}> Your Appointment</Text>
                </View>
                <Feather name="chevron-down" size={20} color="#fff" />
              </View>
              <Text style={styles.appointmentDate}>30 August</Text>
              <View style={styles.appointmentTimeRow}>
                <Feather name="clock" size={14} color="#fff" />
                <Text style={styles.appointmentTime}> 12:00 pm</Text>
              </View>
              <Text style={styles.appointmentLocation}>
                • Universytetska Street, 35
              </Text>
            </View>
          ) : (
            <View style={styles.appointmentCollapsed}>
              <View style={styles.row}>
                <Ionicons name="calendar-outline" size={20} color="#fff" />
                <Text style={styles.appointmentDateCollapsed}> 30 August</Text>
              </View>
              <View style={styles.row}>
                <Feather name="clock" size={16} color="#fff" />
                <Text style={styles.appointmentTimeCollapsed}> 12:00 pm</Text>
                <Feather name="chevron-right" size={20} color="#fff" style={{ marginLeft: 8 }} />
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Calendar */}
        {/* <View style={styles.calendarWrapper}>
          <Calendar
            markedDates={markedDates}
            onDayPress={onDayPress}
            markingType={'custom'}
            hideExtraDays
            firstDay={1}
            theme={{
              calendarBackground: "#fff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#ff4d4d",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#ff4d4d",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              arrowColor: "#fff",
              monthTextColor: "#fff",
              textDayFontWeight: "500",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "500",
              textDayFontSize: 14,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
              "stylesheet.calendar.header": {
                header: {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginTop: 6,
                  alignItems: "center",
                  backgroundColor: "#ff6b81",
                  borderRadius: 12,
                  paddingVertical: 8,
                  marginBottom: 10,
                }
              }
            }}
          />
        </View> */}

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Actions
          </Text>
          <View style={styles.actionsGrid}>
            <QuickActionBtn
              icon="magnify"
              title="Find Donors"
              color="#ff4d4d"
              onPress={() => {}}
            />
            <QuickActionBtn
              icon="map-marker-outline"
              title="Hospitals Nearby"
              color="#ff8c00"
              onPress={() => {}}
            />
            <QuickActionBtn
              icon="pulse"
              title="Activity"
              color="#ff4d4d"
              onPress={() => {}}
            />
            <QuickActionBtn
              icon="camera-outline"
              title="Blog"
              color="#8c52ff"
              onPress={() => {}}
            />
          </View>
        </View>

      </ScrollView>

      {/* Флекс-контейнер для кнопки без абсолютного позиціонування */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          onPress={() => onDayPress()}
          style={styles.donateFab}
        >
          <Text style={styles.donateFabText}>Donate Now +</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    padding:8,
    width: 40,
    height: 25,
    resizeMode: "contain",
    // alignSelf: "center",
    marginBottom: 24,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF5F5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20, 
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logoRow: {
    paddingTop:8,
    marginBottom: 8,
  },
  greeting: {
    fontSize: 22,
  },
  boldText: {
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontWeight: "500",
  },
  bellBtn: {
    padding: 8,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff4d4d",
    borderWidth: 1,
    borderColor: "#FFF5F5",
  },
  appointmentBanner: {
    backgroundColor: "#ff6b81",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#ff6b81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  appointmentHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  appointmentLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  appointmentDate: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  appointmentTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  appointmentTime: {
    color: "#fff",
    fontSize: 14,
  },
  appointmentLocation: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
  },
  appointmentCollapsed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appointmentDateCollapsed: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  appointmentTimeCollapsed: {
    color: "#fff",
    fontSize: 14,
  },
  calendarWrapper: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  
  /* Нові стилі для флекс-кнопки */
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 150, // Відступ від нижнього меню навігації
    // paddingTop: 10,
    alignItems: "flex-end", // Притискає кнопку вправо
  },
  donateFab: {
    backgroundColor: "#ff6b81",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: "#ff6b81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  donateFabText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});