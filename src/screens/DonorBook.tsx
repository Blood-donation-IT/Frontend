import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function DonorBook() {
  const navigation = useNavigation();
  const [donations, setDonations] = useState(5);
  const requiredDonations = 5;
  const [message, setMessage] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));

  const handlePress = () => {
    if (donations < requiredDonations) {
      setMessage("Ви ще не зробили достатньо донацій!");
      fadeInOut();
    } else {
      setMessage("Donor's book unlocked.");
      fadeInOut();
      navigation.navigate("DonorProfile"); 
    }
  };

  const fadeInOut = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const remaining = requiredDonations - donations;
  const isUnlocked = donations >= requiredDonations;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donor Book</Text>

      <Text style={styles.subtitle}>
        3 days left to receive the donor's book
      </Text>

      <View style={styles.textBlock}>
        <Text style={styles.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Text>
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.donations}>
          To receive the donor's book, you need to make {remaining > 0 ? remaining : 0} donations
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isUnlocked ? "#E66A6A" : "gray" },
          ]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Get Donor Book</Text>
        </TouchableOpacity>
      </View>

      {message ? (
        <Animated.View style={[styles.messageBox, { opacity: fadeAnim }]}>
          <Text style={styles.messageText}>{message}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 73,
    paddingHorizontal: 21,
  },
  title: {
    width: 103,
    height: 22,
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 22,
    color: "#000",
    textAlign: "center",
    marginBottom: 55,
    marginLeft: 128,
  },
  subtitle: {
    width: 318,
    height: 25,
    fontFamily: "Nunito Sans",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 25,
    color: "#555555",
    marginBottom: 34,
  },
  textBlock: {
    marginBottom: 34,
  },
  text: {
    width: 333,
    height: 138,
    fontFamily: "Nunito Sans",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    color: "#000",
  },
  donations: {
    width: 333,
    height: 46,
    fontFamily: "Nunito Sans",
    fontWeight: "500",
    fontSize: 17,
    lineHeight: 22,
    color: "#000",
    marginBottom: 15,
  },
  button: {
    width: 179,
    height: 45,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  messageBox: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 40, 
  },
  messageText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
});
