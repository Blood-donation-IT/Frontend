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
import api from "../api/api";
import { useAuthStore } from "../stores/useAuthStore";
import CustomHeader from "../components/CustomHeader";



export default function RegistrationScreen({ navigation, route }) {

  const { createDonationAction, user } = useAuthStore();

  const { t } = useTranslation();
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 49.8419,
    longitude: 24.0315,
  });
  const mapRef = useRef<MapView>(null);
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const day = route.params["day"];
  const times = ["8:00", "9:00", "10:30", "11:00", "11:30"];
  const points = [
    { id: 1, title: t("main_square"), coords: { latitude: 49.8419, longitude: 24.0315 } },
    { id: 2, title: t("opera_theater"), coords: { latitude: 49.8456, longitude: 24.0269 } },
    { id: 3, title: t("university"), coords: { latitude: 49.80439178581702 , longitude: 23.989689135563367 } },

  ];

  const { colors } = useTheme();

  const registrationData = [
    20, 35, 30, 40, 33, 28, 48, 60, 40, 30, 20, 15, 23, 19, 20, 9, 6
  ];
  useEffect(() => {
    setSuggestions(points);
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!time) newErrors.time = t("please_select_time");
    if (!location.trim()) newErrors.location = t("location_required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleRegister = async () => {
    if (validate()) {
      try {
        const triggerDate = buildDateFromDayAndTime(day, time);
        
        const applicationData = {
          user_id: user?.id, 
          blood_type: user?.blood_type, 
          application_time: triggerDate.toISOString(), 
          application_day: triggerDate.toISOString(),  
          location_id: "1", // Це потім теж можна буде вибрати зі списку центрів
          status: "pending"
        };

        await createDonationAction(applicationData);

        await scheduleDateNotification(
          "Запис на донацію",
          `Чекаємо на вас о ${triggerDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          triggerDate
        );

        setAlertType('success');
        setAlertVisible(true);
      } catch (e) {
        setAlertType('error');
        setAlertVisible(true);
      }
    }
  };


  function buildDateFromDayAndTime(day: string, time: string): Date {
    const [year, month, dayOfMonth] = day.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    const date = new Date();
    date.setFullYear(year, month - 1, dayOfMonth);
    date.setHours(hours, minutes, 0, 0);

    return date;
  }



  const handleSelectPoint = (point) => {
    setSelectedLocation(point.coords);
    setLocation(point.title);
    setSuggestions([]);
  };

  return (
    <>
      <CustomHeader title={"Registration"} navigation={navigation} />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.backgroundMain },
        ]}
        extraScrollHeight={20}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.dateBox}>
          <Text style={[styles.dateText, { color: colors.primary }]}>{day}</Text>
        </View>
        
        <Text style={styles.changeText}>{t("change")}</Text>

        <Text style={styles.sectionTitle}>{t("time")}</Text>
        <View style={styles.optionsRow}>
          {times.map((timen) => (
            <TouchableOpacity
              key={timen}
              style={[
                styles.option,
                time === timen && styles.optionSelected,
                errors.time && !time ? styles.optionError : null,
              ]}
              onPress={() => {
                setTime(timen);
                setErrors({ ...errors, time: "" });
              }}
            >
              <Text
                style={{ color: time === timen ? "#fff" : colors.text }}
              >
                {timen}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}

        <TouchableOpacity
          style={[
            styles.input,
            { backgroundColor: colors.backgroundCard },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: location ? colors.text : "#E66A6A80" }}>
            {location || t("location")}
          </Text>
          <Ionicons name="location-outline" size={20} color="#E53935" style={styles.icon} />
        </TouchableOpacity>
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleRegister}>
          <Text style={styles.buttonText}>{t("register")}</Text>
        </TouchableOpacity>

        <View style={styles.customChartWrapper}>
          <View style={styles.customChartHeader}>
            <Text style={[styles.customChartTitle, { color: colors.text }]}>People registered for this day</Text>
            <Text style={[styles.customChartDate, { color: colors.text }]}>{day}</Text>
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

      <Modal animationType="fade" transparent visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.overlay}>
            <View style={[
              styles.modalBox,
              { backgroundColor: colors.backgroundMain },
            ]}>
              <Text style={styles.modalTitle}>{t("select_location")}</Text>
              <TextInput
                style={[styles.modalInput, { color: colors.text }]}
                placeholder={t("enter_location_name")}
                placeholderTextColor={colors.text}
                value={location}
                onFocus={() => setSuggestions(points)}
                onChangeText={(text) => {
                  setLocation(text);
                  const filtered = points.filter((p) =>
                    p.title.toLowerCase().startsWith(text.toLowerCase())
                  );
                  setSuggestions(filtered);
                }}
              />
              {suggestions.length > 0 && (
                <View style={styles.suggestionsBox}>
                  {suggestions.map((p) => (
                    <TouchableOpacity
                      key={p.id}
                      onPress={() => handleSelectPoint(p)}
                      style={styles.suggestionItem}
                    >
                      <Text>{p.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <View style={styles.mapContainer}>
                <MapView
                  ref={mapRef}
                  style={styles.map}
                  scrollEnabled
                  zoomEnabled={true}
                  rotateEnabled={false}
                  pitchEnabled={false}
                  onMapReady={() => {
                    mapRef.current?.fitToCoordinates(points.map((p) => p.coords), {
                      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                      animated: true,
                    });
                  }}
                >
                  {points.map((point) => (
                    <Marker
                      key={point.id}
                      coordinate={point.coords}
                      title={point.title}
                      onPress={() => handleSelectPoint(point)}
                      pinColor={point.title === location ? "#E66A6A" : "#E66A6A80"}
                    />
                  ))}
                </MapView>
              </View>
              <Text style={[styles.selectedText, { color: colors.text }]}>
                {location ? `${t("selected")}: ${location}` : t("tap_marker")}
              </Text>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.saveButtonText}>{t("save")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>{t("cancel")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
        {alertType === 'success' ? 'Вітаємо! 🎉' : 'Помилка ⚠️'}
      </Text>
      
      <Text style={styles.modalMessage}>
        {alertType === 'success' 
          ? 'Запис успішно зроблений!' 
          : 'Сталася помилка при створенні запису. Спробуйте ще раз.'}
      </Text>

      <TouchableOpacity 
        style={[
          styles.modalButton, 
          { backgroundColor: alertType === 'success' ? '#E57373' : '#666' }
        ]} 
        onPress={() => {
          setAlertVisible(false);
          if (alertType === 'success') {
            navigation.goBack();
          }
        }}
      >
        <Text style={styles.modalButtonText}>
          {alertType === 'success' ? 'Перейти' : 'Закрити'}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFF5F5', 
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 25,
    lineHeight: 22,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  dateBox: {
    display:"flex",
    borderWidth: 1,
    borderColor: "#E66A6A4D",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 20,
    marginLeft: 10,
    alignSelf: "flex-start",
    justifyContent:'center'
  },
  dateText: {
    color: "#E66A6A80",
    fontSize: 16,
    fontWeight: "500",
  },
  changeText: {
    color: "#E66A6A80",
    marginTop: 4,
    marginBottom: 16,
    marginLeft: 10,
    fontSize: 12,
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
  optionError: {
    borderColor: "#FF0000",
  },
  optionText: {
    color: "#000000",
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E66A6A80",
    backgroundColor: "#F5EDEB66",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#E66A6A",
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
    fontSize: 23,
    color: "#E66A6A80",
    position: "absolute",
    right: 12,
    top: "50%",
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
  },
  // modalTitle: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#E66A6A",
  //   marginBottom: 10,
  // },

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
  modalInput: {
    borderWidth: 1,
    borderColor: "#E66A6A80",
    borderRadius: 15,
    padding: 12,
    backgroundColor: "#F5EDEB66",
  },
  mapContainer: {
    height: 180,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E66A6A80",
    marginBottom: 16,
    marginTop: 14,
  },
  map: { flex: 1 },
  saveButton: {
    backgroundColor: "#E66A6A",
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "600" },
  cancelText: {
    color: "#E66A6A",
    marginTop: 10,
    textAlign: "center",
  },
  selectedText: {
    textAlign: "center",
    color: "#444",
    marginBottom: 10,
  },
  suggestionsBox: {
    maxHeight: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E66A6A80",
    marginBottom: 12,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E66A6A1A",
  },
});
