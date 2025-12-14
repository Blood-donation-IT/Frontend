import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from "../Theme/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme(); 

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

  const redDates = {
    "2024-08-05": { selected: true, selectedColor: "#E53935" },
    "2024-08-06": { selected: true, selectedColor: "#E53935" },
    "2024-08-07": { selected: true, selectedColor: "#E53935" },
    "2024-08-08": { selected: true, selectedColor: "#E53935" },
    "2024-08-09": { selected: true, selectedColor: "#E53935" },
    "2024-08-10": { selected: true, selectedColor: "#E53935" },
    "2024-08-11": { selected: true, selectedColor: "#E53935" },
    "2024-08-14": { selected: true, selectedColor: "#E53935" },
    "2024-08-19": { selected: true, selectedColor: "#E53935" },
    "2024-08-20": { selected: true, selectedColor: "#E53935" },
    "2024-08-21": { selected: true, selectedColor: "#E53935" },
    "2024-08-22": { selected: true, selectedColor: "#E53935" },
    "2024-08-23": { selected: true, selectedColor: "#E53935" },
    "2024-08-24": { selected: true, selectedColor: "#E53935" },
    "2024-08-29": { selected: true, selectedColor: "#E53935" },
  };

  const handleDayPress = (day) => {
    if (redDates[day.dateString]) {
      navigation.navigate("Registration", { day: day.dateString });
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.backgroundMain }]}>
      
      <TouchableOpacity>
        <Image
          source={require('../images/notification.png')}
          style={[styles.notificationImg, { tintColor: colors.text }]}
        />
      </TouchableOpacity>

     <View style={[styles.calendarWrapper, { backgroundColor: colors.backgroundCard, borderColor: colors.text }]}>
        <Calendar
          key={colors.backgroundCard} 
          current={"2024-08-01"}
          monthFormat={"MMMM"}
          enableSwipeMonths={true}
          hideExtraDays={true}
          markedDates={redDates}
          onDayPress={handleDayPress}
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

      <View>
        <Text style={[styles.heading, { color: colors.text }]}>
          Те що може зацікавити тебе 🤭👀
        </Text>

        <Text style={[styles.paragraph, { color: colors.text }]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </View>

      <View style={styles.bloodContainer}>
        <Text style={[styles.bloodTitle, { color: colors.text }]}>
          Яка кров зараз найбільш потрібна? <Text style={{ color: "red" }}>🩸</Text>
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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    paddingHorizontal: "5%",
    paddingVertical: 48,
    gap: 20,
    marginBottom: 100,
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
    alignSelf: "flex-end",
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  bloodContainer: {
    marginTop: 16,
    marginBottom: 80,
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
});
