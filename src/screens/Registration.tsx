import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet 
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RegistrationScreen({ route }) {
  const [bloodType, setBloodType] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

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
      // тут треба кинути запит йоу
    }
  };

  return (
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
            style={[styles.option, bloodType === type && styles.optionSelected, errors.bloodType && !bloodType ? styles.optionError : null]}
            onPress={() => {
              setBloodType(type);
              setErrors({ ...errors, bloodType: "" });
            }}
          >
            <Text style={[styles.optionText, bloodType === type && styles.optionTextSelected]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.bloodType && <Text style={styles.errorText}>{errors.bloodType}</Text>}

      <Text style={styles.sectionTitle}>Time</Text>
      <View style={styles.optionsRow}>
        {times.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.option, time === t && styles.optionSelected, errors.time && !time ? styles.optionError : null]}
            onPress={() => {
              setTime(t);
              setErrors({ ...errors, time: "" });
            }}
          >
            <Text style={[styles.optionText, time === t && styles.optionTextSelected]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input,styles.inputWithIcon, errors.location ? styles.inputError : null]}
          placeholder="Location"
          placeholderTextColor="#E66A6A80"
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            setErrors({ ...errors, location: "" });
          }}
        />
        <Ionicons
          name="location-outline"
          size={20}
          color="#E53935"
          style={styles.icon}
        />
      </View>
      {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

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
    transform: [{ translateY: -6 }],
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  
});
