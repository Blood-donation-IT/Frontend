import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../Theme/ThemeContext";
import CustomHeader from "../components/CustomHeader";
import { useAuthStore } from "../stores/useAuthStore";
import { t } from "i18next";

export default function EditProfileScreen({navigation}) {

  const user = useAuthStore((state) => state.user);
  
  const updateUserAction = useAuthStore(state => state.updateUserAction);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       let res = await AsyncStorage.getItem("user")
  //       let resUser = JSON.parse(res)
  //       setName(resUser.displayName);
  //       setEmail(resUser.email)
  //       setPhotoURL(resUser.photoURL)
  //       // const response = await api.get('/user/profile'); 
  //       // setUser(response.data);
  //     } catch (error) {
  //       console.error("Помилка завантаження профілю:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Помилка", "Ім'я не може бути порожнім");
      return;
    }

    try {
      await updateUserAction({
        name,
        email,
        phone,
        avatar,
      });
      
      Alert.alert("Успіх", "Профіль оновлено!");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Помилка", "Не вдалося зберегти зміни");
    }
  };

  const { colors, isDark } = useTheme();

  const placeholderColor = "#d9d9d9";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}> 
     <View style={[styles.container, { backgroundColor: colors.backgroundMain }]}>
      <CustomHeader title={t("edit_profile")} navigation={navigation} />
        <View>
          <View style={styles.avatarWrapper}>
        <Image source={{ uri: user?.avatar }} style={[styles.avatar, { backgroundColor: colors.backgroundCard, borderColor: colors.text + '20', borderWidth: 1 }]}/>
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
                  placeholderTextColor={colors.text + "80"}
                  value={phone}
                  onChangeText={setPhone}
                />
            </View>
        </View>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={styles.saveText}>{t("save")}</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 5,
    paddingBottom: 10,
    marginLeft: -20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    marginLeft: -10,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    gap:"10%"
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