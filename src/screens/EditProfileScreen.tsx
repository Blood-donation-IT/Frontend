import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen() {
  const [name, setName] = useState("Blue Jack");
  const [email, setEmail] = useState("gmail@com");

  return (
    <View style={styles.container}>
        <View>
            <Text style={styles.title}>Edit Profile</Text>

            <View style={styles.avatarWrapper}>
                <View style={styles.avatar} />
                <TouchableOpacity style={styles.editIcon}>
                <Ionicons name="pencil" size={16} color="#E66A6A" />
                </TouchableOpacity>
            </View>
        </View>

        <View>
            <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#E66A6A" />
                <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                />
            </View>

            <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="#E66A6A" />
                <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                />
            </View>
        </View>

        <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 20,
    alignItems: "center",
    gap:"10%"
    // justifyContent:"space-around"
  },

  backBtn: {
    position: "absolute",
    left: 20,
    top: 20,
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
    backgroundColor: "#d9d9d9",
    borderRadius: 100,
  },

  editIcon: {
    position: "absolute",
    right: 4,
    top: 4,
    width: 26,
    height: 26,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  inputWrapper: {
    width: "100%",
    height: 45,
    backgroundColor: "#fff5f5",
    borderWidth: 1,
    borderColor: "#e49898",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 50,
    marginTop: 15,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },

  saveBtn: {
    marginTop: 50,
    backgroundColor: "#e66a6a",
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
