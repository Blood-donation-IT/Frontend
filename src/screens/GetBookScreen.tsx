import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../Theme/ThemeContext";

const GetBookScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundMain }]}>
      <View style={styles.topSection}>
        <Text style={[styles.title, { color: colors.text }]}>Donor Book</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          3 days left to receive the donor's book
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </Text>
        <Text style={[styles.note, { color: colors.text }]}>
          To receive the donor's book, you need to make 5 donations
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("BookScreen")}
        >
          <Text style={[styles.buttonText, { color: colors.textCard || "#fff" }]}>
            Get Donor Book
          </Text>
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
    paddingHorizontal: 25,
  },
  topSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  note: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 0,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default GetBookScreen;