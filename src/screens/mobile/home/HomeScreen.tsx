import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image
} from "react-native";
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

  // Компонент для кнопок Quick Actions з підтримкою теми
  // const markedDates = useMemo(() => {
  //   return {
  //     "2026-08-10": { selected: true, marked: true, dotColor: "#ff4d4d", selectedColor: "transparent", selectedTextColor: "#000", customStyles: { container: { borderWidth: 1, borderColor: "#ff4d4d", borderStyle: "dashed" } } },
  //     "2026-08-16": { selected: true, selectedColor: "#ff4d4d" },
  //     "2026-08-17": { selected: true, selectedColor: "#ff4d4d" },
  //     "2026-08-19": { selected: true, selectedColor: "#ff4d4d" },
  //     "2026-08-20": { selected: true, selectedColor: "#ff4d4d" },
  //     "2026-08-22": { selected: true, selectedColor: "#ff6b81", customStyles: { container: { borderRadius: 50 } } },
  //     "2026-08-30": { selected: true, selectedColor: "#8c52ff" },
  //   };
  // }, []);

  const onDayPress = () => {
    navigation.navigate("Registration", { day: format(new Date(), "yyyy-MM-dd") });//day.dateString
  };

  const QuickActionBtn = ({ icon, title, color, onPress }) => (
    <TouchableOpacity 
      style={[
        styles.actionCard, 
        { 
          backgroundColor: colors.backgroundCard,
          borderColor: colors.border || 'transparent',
          borderWidth: colors.border ? 1 : 0
        }
      ]} 
      onPress={onPress}
    >
      <View style={[styles.iconWrapper, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons name={icon} size={28} color={color} />
      </View>
      <Text style={[styles.actionText, { color: colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.backgroundMain }]}>
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
              {t("hello", "Hello")}, <Text style={styles.boldText}>{user?.name}</Text> 👋
            </Text>
            <Text style={[styles.subtitle, { color: colors.text, opacity: 0.7 }]}>
              {t("your_blood", "Your Blood")} <Text style={{ color: "#ff4d4d" }}>{t("saves_lives", "Saves Lives!")}</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")} style={styles.bellBtn}>
            <Feather name="bell" size={24} color="#ff4d4d" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Appointment Banner (Залишається яскравим незалежно від теми) */}
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
                  <Text style={styles.appointmentLabel}> {t("your_appointment", "Your Appointment")}</Text>
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

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("quick_actions", "Quick Actions")}
          </Text>
          <View style={styles.actionsGrid}>
            <QuickActionBtn
              icon="magnify"
              title={t("find_donors", "Find Donors")}
              color="#ff4d4d"
              onPress={() => {}}
            />
            <QuickActionBtn
              icon="map-marker-outline"
              title={t("hospitals_nearby", "Hospitals Nearby")}
              color="#ff8c00"
              onPress={() => {}}
            />
            <QuickActionBtn
              icon="pulse"
              title={t("activity", "Activity")}
              color="#ff4d4d"
              onPress={() => {}}
            />
            <QuickActionBtn
              icon="camera-outline"
              title={t("blog", "Blog")}
              color="#8c52ff"
              onPress={() => {}}
            />
          </View>
        </View>

      </ScrollView>

      <TouchableOpacity style={styles.donateFab} onPress={() => onDayPress()}>
        <Text style={styles.donateFabText}>{t("donate_now", "Donate Now")} +</Text>
      </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40, 
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
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
    borderColor: "transparent",
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
  quickActionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
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
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    position: 'absolute',
    bottom: 150, // Збільшіть або зменшіть це значення, щоб ідеально відрегулювати висоту над меню
    right: 20,
    backgroundColor: "#ff6b81",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: "#ff6b81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 999, 
  },
  donateFabText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});