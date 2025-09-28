import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen() {

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

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity
        // onPress={() => handleSignUp()}
      >
        <Image 
          source={require('../images/notification.png')}
          style={styles.notificationImg}  
        />
      </TouchableOpacity>
      

      <View style={styles.calendarWrapper}>
        <Calendar
          current={'2024-08-01'}
          monthFormat={'MMMM'}
          enableSwipeMonths={true}
          hideExtraDays={true}
          markedDates={{
            '2024-08-05': { selected: true, selectedColor: '#E53935' },
            '2024-08-06': { selected: true, selectedColor: '#E53935' },
            '2024-08-07': { selected: true, selectedColor: '#E53935' },
            '2024-08-08': { selected: true, selectedColor: '#E53935' },
            '2024-08-09': { selected: true, selectedColor: '#E53935' },
            '2024-08-10': { selected: true, selectedColor: '#E53935' },
            '2024-08-11': { selected: true, selectedColor: '#E53935' },
            '2024-08-14': { selected: true, selectedColor: '#E53935' },
            '2024-08-19': { selected: true, selectedColor: '#E53935' },
            '2024-08-20': { selected: true, selectedColor: '#E53935' },
            '2024-08-21': { selected: true, selectedColor: '#E53935' },
            '2024-08-22': { selected: true, selectedColor: '#E53935' },
            '2024-08-23': { selected: true, selectedColor: '#E53935' },
            '2024-08-24': { selected: true, selectedColor: '#E53935' },
            '2024-08-29': { selected: true, selectedColor: '#E53935' },
          }}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#000',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            monthTextColor: '#000',
            selectedDayBackgroundColor: '#E53935',
            selectedDayTextColor: '#fff',
            todayTextColor: '#E53935',
            arrowColor: '#000',
          }}
        />
      </View>

      <View>
        <Text style={styles.heading}>
          Те що може зацікавити тебе 🤭👀
        </Text>

        <Text style={styles.paragraph}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. In expedita illum assumenda placeat possimus fuga eos nulla labore ea pariatur porro eum quasi a praesentium necessitatibus maxime numquam aut, ipsa aspernatur nemo? Quisquam vel accusantium praesentium dolor voluptate architecto! Rem, vel fuga sunt harum iusto voluptate culpa illo assumenda veniam mollitia, totam itaque nemo ex hic? Atque nihil error dicta eveniet voluptate, cupiditate quis. Corporis iusto laboriosam accusamus! Sapiente magnam odio at delectus corporis, error alias aperiam iusto hic sunt omnis eaque, impedit nam totam quaerat tenetur quas voluptas rem eveniet voluptatem consectetur! Veniam id quod doloribus fugit aut quia.
        </Text>
      </View>

      <View style={styles.bloodContainer}>
        <Text style={styles.bloodTitle}>
          Яка кров зараз найбільш потрібна? <Text style={{ color: "red" }}>🩸</Text>
        </Text>

        <View style={styles.bloodGrid}>
          {bloodData.map((item, index) => {
            
            const icon =
              item.status === "low"
                ? require("../images/drop_high.png")
                : require("../images/drop_low.png");

            const textColor = item.status === "low" ? "#FAFAFA" : "#2B2B2B";

            return (
              <View key={index} style={styles.bloodItem}>
                <Image source={icon} style={styles.bloodIcon} />
                <View style={styles.textOverlay}>
                  <Text style={[styles.bloodLabel, { color: textColor }]}>{item.type}</Text>
                </View>
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
    backgroundColor: "#fff",
    gap: 20,
    marginBottom:100,
  },

  calendarWrapper: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#A1A1A1",
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
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 0,
    marginBottom: 10,
    color: "#000",
  },

  paragraph: {
    fontFamily: "Inter",
    fontWeight: "500",
    lineHeight: 18,
    letterSpacing: 0,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  listText: {
    fontFamily: "Inter",
    fontWeight: "500",
    lineHeight: 18,
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
    marginBottom:80
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
    borderColor: "#E66A6A1A",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems:"center"
  },
  bloodItem: {
    width: "22%", 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bloodIcon: {
    position:"relative",
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 4,
  },
  bloodLabel: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter",
  },
  textOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

