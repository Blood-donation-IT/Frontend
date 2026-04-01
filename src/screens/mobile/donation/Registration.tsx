import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import { useAuthStore } from "../../../stores/useAuthStore";
import CustomHeader from "../../../components/CustomHeader";

export default function RegistrationScreen({ navigation, route }) {
  const { createDonationAction, user } = useAuthStore();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [isModalVisible, setModalVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const day = route.params["day"];
  const times = ["8:00", "9:00", "10:30", "11:00", "11:30"];
  const points = [
    { id: 1, title: t("main_square") },
    { id: 2, title: t("opera_theater") },
    { id: 3, title: t("university") },
  ];

  useEffect(() => setSuggestions(points), []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!time) newErrors.time = t("please_select_time");
    if (!location.trim()) newErrors.location = t("location_required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildDateFromDayAndTime = (
    inputDay: string,
    inputTime: string,
  ): Date => {
    const [year, month, dayOfMonth] = inputDay.split("-").map(Number);
    const [hours, minutes] = inputTime.split(":").map(Number);
    const date = new Date();
    date.setFullYear(year, month - 1, dayOfMonth);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      const triggerDate = buildDateFromDayAndTime(day, time as string);
      await createDonationAction({
        user_id: user?.id,
        blood_type: user?.blood_type,
        application_time: triggerDate.toISOString(),
        application_day: triggerDate.toISOString(),
        location_id: "1",
        status: "pending",
      });
      setAlertType("success");
      setAlertVisible(true);
    } catch {
      setAlertType("error");
      setAlertVisible(true);
    }
  };

  return (
    <>
      <CustomHeader title={"Registration"} navigation={navigation} />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.backgroundMain },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.dateBox}>
          <Text style={[styles.dateText, { color: colors.primary }]}>
            {day}
          </Text>
        </View>
        <Text style={styles.sectionTitle}>{t("time")}</Text>
        <View style={styles.optionsRow}>
          {times.map((timen) => (
            <TouchableOpacity
              key={timen}
              style={[styles.option, time === timen && styles.optionSelected]}
              onPress={() => setTime(timen)}
            >
              <Text style={{ color: time === timen ? "#fff" : colors.text }}>
                {timen}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
        <TouchableOpacity
          style={[styles.input, { backgroundColor: colors.backgroundCard }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: location ? colors.text : "#E66A6A80" }}>
            {location || t("location")}
          </Text>
          <Ionicons
            name="location-outline"
            size={20}
            color="#E53935"
            style={styles.icon}
          />
        </TouchableOpacity>
        {errors.location && (
          <Text style={styles.errorText}>{errors.location}</Text>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>{t("register")}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <Modal animationType="fade" transparent visible={isModalVisible}>
        <View style={styles.overlay}>
          <View
            style={[
              styles.modalBox,
              { backgroundColor: colors.backgroundMain },
            ]}
          >
            <Text style={styles.modalTitle}>{t("select_location")}</Text>
            <TextInput
              style={[styles.modalInput, { color: colors.text }]}
              placeholder={t("enter_location_name")}
              placeholderTextColor={colors.text}
              value={location}
              onFocus={() => setSuggestions(points)}
              onChangeText={(text) => {
                setLocation(text);
                setSuggestions(
                  points.filter((p) =>
                    p.title.toLowerCase().startsWith(text.toLowerCase()),
                  ),
                );
              }}
            />
            {suggestions.length > 0 && (
              <View style={styles.suggestionsBox}>
                {suggestions.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    onPress={() => {
                      setLocation(p.title);
                      setSuggestions([]);
                    }}
                    style={styles.suggestionItem}
                  >
                    <Text>{p.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.saveButtonText}>{t("save")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {alertType === "success" ? "Вітаємо! 🎉" : "Помилка ⚠️"}
            </Text>
            <Text style={styles.modalMessage}>
              {alertType === "success"
                ? "Запис успішно зроблений!"
                : "Сталася помилка при створенні запису. Спробуйте ще раз."}
            </Text>
            <TouchableOpacity
              style={[
                styles.modalButton,
                {
                  backgroundColor: alertType === "success" ? "#E57373" : "#666",
                },
              ]}
              onPress={() => {
                setAlertVisible(false);
                if (alertType === "success") navigation.goBack();
              }}
            >
              <Text style={styles.modalButtonText}>
                {alertType === "success" ? "Перейти" : "Закрити"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    paddingTop: 60,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: "#E66A6A4D",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  dateText: {
    color: "#E66A6A80",
    fontSize: 16,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E66A6A",
    marginTop: 20,
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: "#E66A6A1A",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: "#E66A6A",
    borderWidth: 2,
    borderColor: "#F5EDEB66",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E66A6A80",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    width: "55%",
    borderRadius: 18,
    paddingVertical: 14,
    marginTop: 100,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    position: "absolute",
    right: 12,
    top: "50%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    borderRadius: 20,
    padding: 20,
    width: "90%",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E66A6A",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#E66A6A80",
    borderRadius: 15,
    padding: 12,
    backgroundColor: "#F5EDEB66",
  },
  suggestionsBox: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E66A6A80",
    marginTop: 8,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E66A6A1A",
  },
  saveButton: {
    backgroundColor: "#E66A6A",
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#FFF5F5",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 25,
    lineHeight: 22,
  },
  modalButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
