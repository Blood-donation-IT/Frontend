import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Animated, TouchableOpacity } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const GetBookScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Donor Book</Text>
        <Text style={styles.subtitle}>3 days left to receive the donor's book</Text>
        <Text style={styles.paragraph}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
        <Text style={styles.note}>
          To receive the donor's book, you need to make 5 donations
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("BookScreen")}>
          <Text style={styles.buttonText}>Get Donor Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  bottomSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 50,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 50,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 50,
    lineHeight: 22,
  },
  note: {
    fontSize: 16,
    textAlign: "left",
    marginTop: 0,
  },
  button: {
    backgroundColor: "#D96E6E",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: -200,

  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default GetBookScreen;