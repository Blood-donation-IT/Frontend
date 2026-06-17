import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  Modal,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../Theme/ThemeContext";
import CustomHeader from "../../../components/CustomHeader";
import { useAuthStore } from "../../../stores/useAuthStore";
import { t } from "i18next";
import { UpdateUserPayload } from "../../../interfaces/user"; 

export default function EditProfileScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const updateUserAction = useAuthStore((state) => state.updateUserAction);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [bloodType, setBloodType] = useState<UpdateUserPayload["bloodType"]>(user?.blood_type);
  const { colors } = useTheme();

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Помилка", "Ім'я не може бути порожнім");
      return;
    }
    try {
      await updateUserAction({ name, bloodType: });
      Alert.alert("Успіх", "Профіль оновлено!");
      navigation.goBack();
    } catch (_e) {
      Alert.alert("Помилка", "Не вдалося зберегти зміни");
    }
  };



  const formatPhoneNumber = (text: string) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
    
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
    
    return cleaned ? `+${cleaned}` : '';
  };


  const [isBloodModalVisible, setBloodModalVisible] = useState(false);
  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];



  return (
    <>
      <CustomHeader title={t("edit_profile")} navigation={navigation} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
        <View
          style={[styles.container, { backgroundColor: colors.backgroundMain }]}
        >
          
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: user?.avatar }}
              style={[
                styles.avatar,
                {
                  backgroundColor: colors.backgroundCard,
                  borderColor: colors.text + "20",
                  borderWidth: 1,
                },
              ]}
            />
            <TouchableOpacity
              style={[
                styles.editIcon,
                { backgroundColor: colors.backgroundCard },
              ]}
            >
              <Ionicons name="pencil" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.formSection}>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.backgroundCard,
                  borderColor: colors.primary,
                },
              ]}
            >
              <Ionicons name="person-outline" size={20} color={colors.primary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={name}
                onChangeText={setName}
                placeholderTextColor={colors.text + "80"}
              />
            </View>
            {/* <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.backgroundCard,
                  borderColor: colors.primary,
                },
              ]}
            >
              <Ionicons name="mail-outline" size={20} color={colors.primary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={colors.text + "80"}
              />
            </View> */}
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: colors.backgroundCard,
                  borderColor: colors.primary,
                },
              ]}
            >
              <Ionicons name="call-outline" size={20} color={colors.primary} />
              <TextInput
                style={{color:colors.text}}
                keyboardType="phone-pad"
                maxLength={19}
                value={phone}
                onChangeText={(text) => setPhone(formatPhoneNumber(text))}
                placeholder="+38 (0__) ___-__-__"
              />
            </View>

            <TouchableOpacity 
              onPress={() => setBloodModalVisible(true)}
              style={[styles.inputWrapper, { backgroundColor: colors.backgroundCard, borderColor: colors.primary }]}
            >
              <Ionicons name="water" size={20} color="#E63946" /> 
              <Text style={[
                styles.input, 
                { color: (bloodType && bloodType !== 'unknown') ? colors.text : colors.text + "80" }
              ]}>
                {(bloodType && bloodType !== 'unknown') ? t(bloodType) : t("select_blood_type", "Select Blood Type")}
              </Text>
            </TouchableOpacity>
          </View>
          

          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: colors.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>{t("save")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal
        visible={isBloodModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setBloodModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setBloodModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.backgroundCard }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>{t("choose_blood_type")}</Text>
            
            <View style={styles.bloodGrid}>
              {bloodTypes.map((bt) => (
                <TouchableOpacity
                  key={bt}
                  onPress={() => {
                    setBloodType(bt);
                    setBloodModalVisible(false);
                  }}
                  style={[
                    styles.bloodCard,
                    bloodType === bt && { borderColor: '#E63946', backgroundColor: '#FFF5F5' }
                  ]}
                >
                  <Text style={[styles.bloodText, {color:colors.text}, bloodType === bt && { color: '#E63946' }]}>{t(`${bt}`)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:100,
    alignItems: "center",
    gap: "10%",
  },
  formSection: {
    width: "100%",
    gap: 15,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

    ...Platform.select({
      web: {
        alignSelf: 'center',
        width: '100%',
        maxWidth: 440,
      }
    })
  },
  modalContent: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  bloodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bloodCard: {
    width: '22%', // 4 в ряд
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  bloodText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
