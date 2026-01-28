import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import { useTheme } from "../Theme/ThemeContext";

const NotificationScreen = () => {
  const navigation = useNavigation();

  const { colors } = useTheme();

  return (
    <View style={[styles.container,{backgroundColor:colors.backgroundMain}]}>

      <CustomHeader title={"Notifications"} navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* TODAY */}
        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Don’t Forget!</Text>
            <Text style={styles.cardText}>You have registered to donation on 10:00 in Monday</Text>
            <Text style={styles.time}>8:00</Text>
          </View>
          
        </View>

        {/* YESTERDAY */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Yesterday</Text>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>You have registered to donation on 10:00 in Monday</Text>
            <Text style={styles.time}>16:20</Text>
          </View>
          
        </View>

        {/* WEEK AGO */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Week ago</Text>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Account Setup Successful</Text>
            <Text style={styles.time}>14:40</Text>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
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