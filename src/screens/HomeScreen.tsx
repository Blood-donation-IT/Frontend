import React, { useMemo } from 'react'; // Додав useMemo
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTheme } from "../Theme/ThemeContext";
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { format, addMonths, startOfYear, endOfYear, eachDayOfInterval, isSameDay } from 'date-fns'; 
import { uk, enUS } from 'date-fns/locale';

export default function HomeScreen({ navigation }) {
  const { colors, theme, isDark: contextIsDark } = useTheme();

  const { i18n } = useTranslation();
  
  const isDark = contextIsDark || theme === 'dark' || colors.text === '#FFFFFF' || colors.text === '#E0E0E0';
  const dateFnsLocale = i18n.language === 'uk' ? uk : enUS;

  const logoSource = isDark 
    ? require('../images/logo-white.png') 
    : require('../images/logo.png');

  const todayName = format(new Date(), 'EEEE', { locale: dateFnsLocale });
  const formattedDayBadge = `< ${todayName.toLowerCase()}`;

  const redDates = useMemo(() => {
    const dates = {};
    const today = new Date();
    const currentYear = today.getFullYear();
    
    for (let year = currentYear; year <= currentYear + 1; year++) {
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let day = 3; day <= daysInMonth; day += 3) {
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          dates[dateString] = { 
            selected: true, 
            selectedColor: "#E53935" 
          };
        }
      }
    }
    return dates;
  }, []);

  const bloodData = [
    { type: "0+", status: "low" },
    { type: "A+", status: "high" },
    { type: "B+", status: "low" },
    { type: "AB+", status: "high" },
    { type: "0-", status: "low" },
    { type: "A-", status: "low" },
    { type: "B-", status: "high" },
    { type: "AB-", status: "low" },
  ];

  const chartData = [5, 8, 15, 25, 40, 60, 80, 60, 50, 45, 60, 70, 50, 40, 30, 25, 20, 15, 15, 10, 5, 0, 5, 0];
  const chartLabels = ["6", "9", "12", "15", "18", "21"];


  const handleDayPress = (day) => {
    if (redDates[day.dateString]) {
      navigation.navigate("Registration", { day: day.dateString });
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.backgroundMain }]}>
      <View style={styles.headerRow}>
        <Image 
          source={logoSource} 
          style={styles.logo} 
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Image
            source={require('../images/notification.png')}
            style={[styles.notificationImg, { tintColor: colors.text }]}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.calendarWrapper, { backgroundColor: colors.backgroundCard, borderColor: colors.text }]}>
        <Calendar
          // key={`${i18n.language}-${colors.backgroundCard}`}
          key={`${colors.backgroundCard}-${i18n.language}`}
          current={format(new Date(), 'yyyy-MM-dd')}
          monthFormat={"MMMM"}
          enableSwipeMonths={true}
          hideExtraDays={true}
          markedDates={redDates}
          onDayPress={handleDayPress}
          firstDay={1} 
          theme={{
            backgroundColor: colors.backgroundMain,
            calendarBackground: colors.backgroundCard,
            textSectionTitleColor: colors.text,
            dayTextColor: colors.text,
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            monthTextColor: colors.text,
            selectedDayBackgroundColor: "#E53935",
            selectedDayTextColor: "#E0E0E0",
            todayTextColor: "#E53935",
            arrowColor: colors.text,
          }}
        />
      </View>


      <View style={styles.bloodContainer}>
        <Text style={[styles.bloodTitle, { color: colors.text }]}>
          {t('which_blood_types_are_needed_most')} <Text style={{ color: "red" }}>🩸</Text>
        </Text>
        <View style={[styles.bloodGrid, { borderColor: colors.text + '1A' }]}>
          {bloodData.map((item, index) => {
            const icon = item.status === "low"
              ? require("../images/drop_high.png")
              : require("../images/drop_low.png");
            return (
              <View key={index} style={styles.bloodItem}>
                <Image source={icon} style={styles.bloodIcon} />
                <Text style={[styles.bloodLabel, { color: colors.text }]}>{item.type}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.chartSection}>
        <View style={styles.chartHeaderRow}>
          <Text style={[styles.chartTitle, { color: colors.text }]}>{t('rush_of_people')}</Text>
          <View style={[styles.dayBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.dayBadgeText}>{formattedDayBadge}</Text>
          </View>
        </View>

        <View style={[styles.chartContainer, { backgroundColor: colors.backgroundCard, borderColor: colors.text + '1A'}]}>
          <View style={[styles.dashedLine, { borderColor: colors.text }]} />
          <View style={styles.barsContainer}>
            {chartData.map((height, index) => (
              <View key={index} style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${height}%`,
                      backgroundColor: colors.primary
                    }
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={[styles.bottomAxisLine, { backgroundColor: colors.text }]} />
          <View style={styles.labelsContainer}>
            {chartLabels.map((label, index) => (
              <Text key={index} style={[styles.chartLabelText, { color: colors.text }]}>{label}</Text>
            ))}
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    paddingHorizontal: "5%",
    paddingVertical: 48,
    gap: 20,
    marginBottom: 50,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  logo: {
    width: 50,   
    height: 50,    
    resizeMode: 'contain',
  },
  calendarWrapper: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  heading: {
    fontFamily: "SF Pro Rounded",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 0,
    marginBottom: 10,
  },
  paragraph: {
    fontFamily: "Inter",
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0,
  },
  notificationImg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  bloodContainer: {
    marginTop: 16,
    marginBottom: 10,
  },
  bloodTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    fontFamily: "SF Pro Rounded",
  },
  bloodGrid: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bloodItem: {
    width: "22%",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100, 
    zIndex: 1, 
    marginBottom: 5,
  },
  bloodIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 4,
  },
  bloodLabel: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter",
    textAlign: 'center',
  },
  textOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  chartSection: {
    marginBottom: 80,
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "SF Pro Rounded",
  },
  dayBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  dayBadgeText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  chartContainer: {
    borderRadius: 20,
    borderWidth: 3,
    paddingVertical: 20,
    paddingHorizontal: 15,
    height: 200, 
    justifyContent: 'flex-end',
  },
  
  graphBody: {
    height: 100,
    marginBottom: 5,
  },
  gridLayer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    zIndex: 0,
    paddingTop: 10,
  },
  barsLayer: {
    height: '100%',
    marginTop: -100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 25,
    zIndex: 1, 
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  gridLabel: {
    fontSize: 10,
    fontFamily: 'Inter',
    width: 20,
    marginRight: 5,
    opacity: 0.6,
  },
  dashedLine: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    opacity: 0.2,
    marginTop: 40,
    marginBottom: -60, 
    zIndex: 0, 
  },
  barWrapper: {
    width: '3%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 2,
  },
  bottomAxisLine: {
    width: '100%',
    height: 1,
    opacity: 0.1,
    marginBottom: 8, 
    marginLeft: 10, 
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25, 
  },
  chartLabelText: {
    fontSize: 10,
    fontFamily: "Inter",
  },
});