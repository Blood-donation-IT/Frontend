import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
    
        <TouchableOpacity
            // onPress={() => handleSignUp()}
        >
            <Image 
                source={require('../images/menu.png')}
                style={styles.menuImg}  
            />
        </TouchableOpacity>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
            <Text style={styles.name}>Lorem Lorem</Text>
            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
                    <Image 
                        source={require('../images/exclamation_mark.png')}
                        style={styles.imgOverlay}  
                    />
                
            </TouchableOpacity>
        </View>

        {/* Donor History */}
        <Text style={styles.cardTitle}>Donor History</Text>
        <View style={[styles.card, styles.firstCard]}>
            
            <Text style={styles.cardContent}>
            300 ml donated at Lorem Ipsum on Month 1
            </Text>
        </View>

        {/* Donor Status */}
        <Text style={styles.cardTitle}>Donor Status</Text>
        <View style={styles.card}>
            
            <Text style={styles.cardContent}>Regular Donor</Text>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  avatarContainer: {
    alignItems: "center",
    gap:10,
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  editButton: {
    position:"relative",
    borderWidth: 2,
    borderColor: "#E53935",
    borderRadius: 21.5,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  editButtonText: {
    color: "#000000",
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderColor: "#E66A6A1A",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardContent: {
    color: "#000000",
  },
  firstCard: {
    paddingBottom: 64, 
  },


  menuImg: {
    marginBottom:"10%",
    alignSelf:"flex-end",
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  imgOverlay: {
    width: 25,
    height: 30,
    position: 'absolute',
    top: -10,
    right: -4,
  },
});

export default ProfileScreen;
