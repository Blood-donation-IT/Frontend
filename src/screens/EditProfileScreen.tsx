import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../Theme/ThemeContext";

export default function EditProfileScreen() {
  const [name, setName] = useState("Blue Jack");
  const [email, setEmail] = useState("gmail@com");
  const [phoneNumber, setPhoneNumber] = useState("+380 00 000 00 00");

  const { colors, isDark } = useTheme();

  const placeholderColor = "#d9d9d9";

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundMain }]}>
        <View style={styles.topSection}>
            <Text style={[styles.title, { color: colors.primary }]}>Edit Profile</Text>

            <View style={styles.avatarWrapper}>
                <View style={[styles.avatar, { backgroundColor: placeholderColor }]} />
                <TouchableOpacity style={[styles.editIcon, { backgroundColor: colors.backgroundCard }]}>
                  <Ionicons name="pencil" size={16} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.formSection}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.backgroundCard, borderColor: colors.primary }]}>
                <Ionicons name="person-outline" size={20} color={colors.primary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor={colors.text + "80"}
                />
            </View>

            <View style={[styles.inputWrapper, { backgroundColor: colors.backgroundCard, borderColor: colors.primary }]}>
                <Ionicons name="mail-outline" size={20} color={colors.primary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={colors.text + "80"}
                />
            </View>
            
            <View style={[styles.inputWrapper, { backgroundColor: colors.backgroundCard, borderColor: colors.primary }]}>
                <Ionicons name="call-outline" size={20} color={colors.primary} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholderTextColor={colors.text + "80"}
                />
            </View>
        </View>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between", 
  },
  topSection: {
    alignItems: "center",
    width: "100%",
  },
  formSection: {
    width: "100%",
    gap: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
  avatarWrapper: {
    marginTop: 40,
    position: "relative",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  editIcon: {
    position: "absolute",
    right: 4,
    top: 4,
    width: 26,
    height: 26,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  inputWrapper: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  saveBtn: {
    marginBottom: 40, 
    paddingVertical: 14,
    paddingHorizontal: 70,
    borderRadius: 25,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});