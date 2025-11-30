import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.menuBtn}>
        <Image source={require("../images/menu.png")} style={styles.menuImg} />
      </TouchableOpacity>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Somebody</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <Text style={styles.lastDonation}>Last Donation: September 11, 2001</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Donated</Text>
          <Text style={styles.statValue}>01</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Blood Type</Text>
          <Text style={styles.statValue}>A-</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Life Saved</Text>
          <Text style={styles.statValue}>02</Text>
        </View>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Donor Status</Text>
        <Text style={styles.statusValue}>Honorary Donor of Ukraine</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    paddingHorizontal: "5%",
    paddingVertical: 40,
    backgroundColor: "#fff",
    gap: 20,
  },
  menuBtn: {
    marginTop:20,
    alignSelf: "flex-end",
  },
  menuImg: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: "#E66A6A",
    borderColor:"#F5EDEB66",
    borderWidth:2,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  lastDonation: {
    color: "#636363",
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F5EDEB80",
    borderWidth: 3,
    borderColor: "#E66A6A33",
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#E66A6A",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  statusCard: {
    borderWidth: 1,
    borderColor: "#E66A6A50",
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#FFF7F7",
  },
  statusLabel: {
    fontSize: 12,
    color: "#E66A6A",
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 14,
    color: "#000",
  },
});

export default ProfileScreen;
