import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import { useTranslation } from "react-i18next";
import { scheduleDateNotification } from "../services/localNotificationService";
import { useTheme } from "../Theme/ThemeContext";

export default function RegistrationScreen({ route }: any) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const day: string = route.params.day;

  const [bloodType, setBloodType] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const mapRef = useRef<MapView>(null);

  const points = [
    { id: 1, title: t("main_square"), coords: { latitude: 49.8419, longitude: 24.0315 } },
    { id: 2, title: t("opera_theater"), coords: { latitude: 49.8456, longitude: 24.0269 } },
    { id: 3, title: t("university"), coords: { latitude: 49.8392, longitude: 24.0235 } },
  ];

  const bloodTypes = ["0+", "0-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const times = ["8:00", "9:00", "10:30", "11:00", "11:30"];

  const registrationData = [
    20, 35, 30, 40, 33, 28, 48, 60, 40, 30, 20, 15, 23, 19, 20, 9, 6
  ];

  useEffect(() => {
    setSuggestions(points);
  }, []);

  const validate = () => {
    const e: any = {};
    if (!bloodType) e.bloodType = t("please_select_blood");
    if (!time) e.time = t("please_select_time");
    if (!location) e.location = t("location_required");
    if (!name) e.name = t("name_required");
    if (!age) e.age = t("age_required");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildDateFromDayAndTime = (day: string, time: string) => {
    const [y, m, d] = day.split("-").map(Number);
    const [h, min] = time.split(":").map(Number);
    const date = new Date();
    date.setFullYear(y, m - 1, d);
    date.setHours(h, min, 0, 0);
    return date;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    const triggerDate = buildDateFromDayAndTime(day, time!);
    await scheduleDateNotification(
      t("notification_title"),
      `${t("notification_time")} ${triggerDate.toLocaleTimeString()}`,
      triggerDate
    );
  };

  const handleSelectPoint = (p: any) => {
    setLocation(p.title);
    setSuggestions([]);
    setModalVisible(false);
  };

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.backgroundMain },
        ]}
      >
        <Text style={[styles.dateText, { color: colors.text }]}>{day}</Text>

        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          {t("your_blood_type")}
        </Text>

        <View style={styles.optionsRow}>
          {bloodTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.option,
                bloodType === type && { backgroundColor: colors.primary },
              ]}
              onPress={() => setBloodType(type)}
            >
              <Text
                style={{
                  color: bloodType === type ? "#fff" : colors.text,
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.primary }]}>
          {t("time")}
        </Text>

        <View style={styles.optionsRow}>
          {times.map((timen) => (
            <TouchableOpacity
              key={timen}
              style={[
                styles.option,
                time === timen && { backgroundColor: colors.primary },
              ]}
              onPress={() => setTime(timen)}
            >
              <Text style={{ color: time === timen ? "#fff" : colors.text }}>
                {timen}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.input,
            { backgroundColor: colors.backgroundCard },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: location ? colors.text : colors.primary }}>
            {location || t("location")}
          </Text>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { backgroundColor: colors.backgroundCard, color: colors.text }]}
          placeholder={t("your_name")}
          placeholderTextColor={colors.text}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.backgroundCard, color: colors.text }]}
          placeholder={t("your_age")}
          keyboardType="numeric"
          placeholderTextColor={colors.text}
          value={age}
          onChangeText={setAge}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleRegister}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            {t("register")}
          </Text>
        </TouchableOpacity>

        <View style={styles.customChartWrapper}>
          <View style={styles.customChartHeader}>
            <Text style={[styles.customChartTitle, {color: colors.text}]}>People registered for this day</Text>
            <Text style={[styles.customChartDate, {color: colors.text}]}>{day}</Text>
          </View>

          <View style={[styles.graphContainer, { backgroundColor: colors.backgroundCard }]}>
              
              <View style={styles.gridContainer}>
                  <View style={styles.gridRow}>
                      <Text style={[styles.gridLabel, { color: colors.text }]}>70</Text>
                      <View style={[styles.dashedLine, { borderColor: colors.text, opacity: 0.3 }]} />
                  </View>
                  <View style={[styles.gridRow, { marginTop: 25 }]}>
                      <Text style={[styles.gridLabel, { color: colors.text }]}>35</Text>
                      <View style={[styles.dashedLine, { borderColor: colors.text, opacity: 0.3 }]} />
                  </View>
              </View>

              <View style={styles.barsContainer}>
                  {registrationData.map((val, index) => (
                      <View 
                          key={index} 
                          style={[
                              styles.barStyle, 
                              { 
                                  height: val,
                                  backgroundColor: colors.primary 
                              }
                          ]} 
                      />
                  ))}
              </View>

              <View style={styles.axisContainer}>
                   <View style={[styles.solidLine, { backgroundColor: colors.text, opacity: 0.5 }]} />
                   <View style={styles.axisLabels}>
                       {["9", "10", "11", "12", "13"].map((label) => (
                         <Text key={label} style={[styles.axisText, { color: colors.text }]}>{label}</Text>
                       ))}
                   </View>
              </View>
          </View>
        </View>

      </KeyboardAwareScrollView>

      <Modal transparent animationType="fade" visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.overlay}>
            <View
              style={[
                styles.modalBox,
                { backgroundColor: colors.backgroundMain },
              ]}
            >
              <Text style={{ color: colors.text, marginBottom: 10 }}>
                {t("select_location")}
              </Text>

              {points.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={styles.suggestionItem}
                  onPress={() => handleSelectPoint(p)}
                >
                  <Text style={{ color: colors.text }}>{p.title}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: colors.primary, marginTop: 10 }}>
                  {t("cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    paddingBottom: 50, 
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  input: {
    marginTop: 12,
    padding: 14,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    borderRadius: 20,
    padding: 20,
  },
  suggestionItem: {
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  
  customChartWrapper: {
    marginTop: 40,
    marginBottom: 20,
  },
  customChartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  customChartTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SF Pro Rounded',
    opacity: 0.8,
  },
  customChartDate: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SF Pro Rounded',
    opacity: 0.8,
  },
  graphContainer: {
    width: 335,
    height: 132,
    borderRadius: 25,
    padding: 15,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  gridContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 30,
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 10,
    width: 20,
    marginRight: 5,
    textAlign: 'right',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 25,
    height: 80,
    gap: 4,
    zIndex: 2,
    marginBottom: 5,
  },
  barStyle: {
    width: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  axisContainer: {
    marginTop: 0,
    marginLeft: 25,
  },
  solidLine: {
    height: 1,
    width: '100%',
  },
  axisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingRight: 10, 
  },
  axisText: {
    fontSize: 10,
    fontWeight: '500',
  },
});