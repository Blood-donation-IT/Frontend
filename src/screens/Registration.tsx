import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function RegistrationScreen({ route }) {
  const [bloodType, setBloodType] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 49.8419,
    longitude: 24.0315,
  });
  const mapRef = useRef<MapView>(null);


  const points = [
    {
      id: 1,
      title: "Площа Ринок",
      coords: { latitude: 49.8419, longitude: 24.0315 },
    },
    {
      id: 2,
      title: "Оперний театр",
      coords: { latitude: 49.8456, longitude: 24.0269 },
    },
    {
      id: 3,
      title: "Львівський університет",
      coords: { latitude: 49.8392, longitude: 24.0235 },
    },
  ];

  const [suggestions, setSuggestions] = useState(points);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const day = route.params["day"];
  const bloodTypes = ["0+", "0-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const times = ["8:00", "9:00", "10:30", "11:00", "11:30"];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!bloodType) newErrors.bloodType = "Please select your blood type";
    if (!time) newErrors.time = "Please select a time";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!age.trim()) newErrors.age = "Age is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      // TODO: відправити дані
    }
  };

  const handleSelectPoint = (point) => {
    setSelectedLocation(point.coords);
    setLocation(point.title);
  };

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        extraScrollHeight={20}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{day}</Text>
        </View>
        <Text style={styles.changeText}>Change</Text>

        <Text style={styles.sectionTitle}>Your Blood Type</Text>
        <View style={styles.optionsRow}>
          {bloodTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.option,
                bloodType === type && styles.optionSelected,
                errors.bloodType && !bloodType ? styles.optionError : null,
              ]}
              onPress={() => {
                setBloodType(type);
                setErrors({ ...errors, bloodType: "" });
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  bloodType === type && styles.optionTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.bloodType && (
          <Text style={styles.errorText}>{errors.bloodType}</Text>
        )}

        <Text style={styles.sectionTitle}>Time</Text>
        <View style={styles.optionsRow}>
          {times.map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.option,
                time === t && styles.optionSelected,
                errors.time && !time ? styles.optionError : null,
              ]}
              onPress={() => {
                setTime(t);
                setErrors({ ...errors, time: "" });
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  time === t && styles.optionTextSelected,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}

        <TouchableOpacity
          style={[
            styles.input,
            styles.inputWithIcon,
            errors.location ? styles.inputError : null,
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: location ? "#000" : "#E66A6A80" }}>
            {location || "Location"}
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

        <TextInput
          style={[styles.input, errors.name ? styles.inputError : null]}
          placeholder="Your Name"
          placeholderTextColor="#E66A6A80"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors({ ...errors, name: "" });
          }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          style={[styles.input, errors.age ? styles.inputError : null]}
          placeholder="Your Age"
          keyboardType="numeric"
          placeholderTextColor="#E66A6A80"
          value={age}
          onChangeText={(text) => {
            setAge(text);
            setErrors({ ...errors, age: "" });
          }}
        />
        {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <Modal animationType="fade" transparent visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.overlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Select a location</Text>

              <TextInput
                style={styles.modalInput}
                placeholder="Enter location name"
                placeholderTextColor="#E66A6A80"
                value={location}
                onFocus={() => setSuggestions(points)} // при фокусі показує всі варіанти
                onChangeText={(text) => {
                  setLocation(text);
                  // фільтруємо варіанти за текстом
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
                      onPress={() => {
                        setLocation(p.title);
                        setSelectedLocation(p.coords);
                        setSuggestions([]); // приховуємо список після вибору
                      }}
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
                  zoomEnabled
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
                      onPress={() => {
                        setSelectedLocation(point.coords);
                        setLocation(point.title);
                      }}
                      pinColor={point.title === location ? "#E66A6A" : "#E66A6A80"}
                    />
                  ))}
                </MapView>
              </View>

              <Text style={styles.selectedText}>
                {location ? `Selected: ${location}` : "Tap a marker to select"}
              </Text>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
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
    backgroundColor: "#fff",
  },
  dateBox: {
    borderWidth: 1,
    borderColor: "#E66A6A4D",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
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
    fontSize: 12,
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
    width:"55%",
    borderRadius: 18,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: "center",
    alignSelf:"center",
  },
  buttonText: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "600",
  },

  icon: {
    fontSize:23,
    color:"#E66A6A80",
    position: "absolute",
    right:12,
    top:"50%",
    // transform: [{ translateY: - }],
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  // container: { padding: 20, flexGrow: 1, backgroundColor: "#fff" },
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
    // marginBottom: 14,
  },
  mapContainer: {
    height: 180,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E66A6A80",
    marginBottom: 16,
    marginTop:14,
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
    // marginTop: 4,
    borderWidth: 1,
    borderColor: "#E66A6A80",
    marginBottom:12,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E66A6A1A",
  },
});
