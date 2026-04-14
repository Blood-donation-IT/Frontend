import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Theme/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useTranslation } from "react-i18next";
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Circle,
  Text as SvgText,
} from "react-native-svg";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";
const screenWidth = Dimensions.get('window').width;
const { width, height } = Dimensions.get("window");

// --- 1. КОМПОНЕНТ ФОНУ ---
const BackgroundCircles = () => {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Svg height="100%" width="100%">
        <Defs>
          <RadialGradient id="grad1" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="#fe6464ff" stopOpacity="0.32" />
            <Stop offset="60%" stopColor="#f87e7eff" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#ff6161ff" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="grad2" cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor="#f25656ff" stopOpacity="0.3" />
            <Stop offset="60%" stopColor="rgba(255, 122, 122, 1)" stopOpacity="0.14" />
            <Stop offset="100%" stopColor="#e78484ff" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle cx={width} cy={height - 950} r={400} fill="url(#grad1)" />
        <Circle cx={0} cy={height * 0.45} r={350} fill="url(#grad2)" />
        <Circle cx={width - 50} cy={height - 250} r={300} fill="url(#grad1)" />
      </Svg>
    </View>
  );
};

export default function TestScreen() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();

  const allQuestions = [
    { id: 1,  type: "yesno" },
    { id: 2,  type: "yesno" },
    { id: 3,  type: "yesno" },
    { id: 4,  type: "have" },
    { id: 5,  type: "have" },
    { id: 6,  type: "have" },
    // { id: 7, text: "Ви не маєте захворювань крові або порушень згортання?", type: "have" },
    // { id: 8, text: "Ви не маєте онкологічних захворювань?", type: "have" },
    // { id: 9, text: "Ви не маєте гепатиту B, C або жовтяниці в анамнезі?", type: "have" },
    { id: 7, text: "Яка у вас група крові?", type: "blood" },
  ];

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [birthDate, setBirthDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [answers, setAnswers] = useState({});

  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const updateUserAction = useAuthStore((state) => state.updateUserAction);

  const totalSteps = allQuestions.length;
  const currentQ = allQuestions[currentIndex];
  const isCurrentAnswered = currentQ.type === "date" ? birthDate !== null : !!answers[currentQ.id];

  const checkIsAdult = (date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
    return age >= 18;
  };

  const changeQuestion = (direction, newIndex) => {
    const exitTo = direction === "next" ? -width : width;
    const enterFrom = direction === "next" ? width : -width;

    Animated.parallel([
      Animated.timing(slideAnim, { toValue: exitTo, duration: 200, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(() => {
      setCurrentIndex(newIndex);
      slideAnim.setValue(enterFrom);
      Animated.parallel([
        Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    });
  };


  const handleSaveInfo = async () => {
    try {
      const bloodQuestion = allQuestions.find(q => q.type === "blood");
      const selectedBloodType = answers[bloodQuestion?.id];

      await updateUserAction({
        blood_type: selectedBloodType
      });
      
    } catch (error) {
      console.log("Error updating blood type:", error);
    }
  }



  const handleNext = async () => {
    if (isCurrentAnswered) {
      if (currentIndex < totalSteps - 1) {
        changeQuestion("next", currentIndex + 1);
      } else {
        await handleSaveInfo()
        navigation.navigate("Home");
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      changeQuestion("prev", currentIndex - 1);
    }
  };

  const renderButton = (qid, value, label) => {
    const active = answers[qid] === value;
    return (
      <TouchableOpacity
        onPress={() => setAnswers({ ...answers, [qid]: value })}
        style={[
          styles.optionButton,
          {
            borderColor: "#DE7272",
            backgroundColor: active ? "#DE7272" : "transparent",
          },
        ]}
      >
        <Text style={[styles.optionText, { color: active ? "#FFFFFF" : "#DE7272" }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  // --- ЛОГІКА ДИНАМІЧНИХ СТИЛІВ ---
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSteps - 1
  const isMiddle = !isFirst && !isLast;
  const activeRed = "#ff0000ff";
  const defaultBorder = "#F7D4D4";

  const dynamicMainCardStyle = {
    borderBottomWidth: isMiddle ? 4 : 2,
    borderBottomColor: activeRed,
    borderLeftWidth: isFirst ? 4 : 1.5,
    borderLeftColor: isFirst ? activeRed : defaultBorder,
    borderRightWidth: isLast ? 4 : 1.5,
    borderRightColor: isLast ? activeRed : defaultBorder,
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? colors.backgroundMain : "#FCF8F8" }]}>
      <LanguageSwitcher/>

      <BackgroundCircles />
      

      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Svg height="45" width="180">
            <Defs>
              <LinearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="0%" stopColor="#000000ff" />
                <Stop offset="85%" stopColor="#DE7272" />
              </LinearGradient>
            </Defs>
            <SvgText
              fill="url(#textGrad)"
              fontSize="32"
              fontWeight="700"
              x="0"
              y="35"
            >
              Short Test
            </SvgText>
          </Svg>
          <Image 
            source={require('../../../images/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* ГРАДІЄНТНИЙ ПІДЗАГОЛОВОК */}
        <Svg height="60" width={screenWidth}>
          <Defs>
            <LinearGradient id="subGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#000000" />
              <Stop offset="85%" stopColor="#DE7272" />
            </LinearGradient>
          </Defs>
          <SvgText
            fill="url(#subGrad)"
            fontSize="16"
            fontWeight="400"
            textAnchor="middle"
            x={screenWidth / 2}
            y="20"
            opacity="0.8"
          >
            {t("necessary_for_donation")}
          </SvgText>
        </Svg>
      </View>

      <View style={styles.centerContent}>
        <View style={styles.carouselWrapper}>
          <TouchableOpacity
            onPress={handlePrev}
            disabled={currentIndex === 0}
            style={[styles.arrowButton, { opacity: currentIndex === 0 ? 0 : 1 }]}
          >
            <Text style={styles.arrowText}>{"‹"}</Text>
          </TouchableOpacity>

          <Animated.View style={[styles.cardStack, { transform: [{ translateX: slideAnim }], opacity: opacityAnim }]}>
            
            
            {!isLast && <View style={styles.layeredCard} />}
            
            {!isFirst && <View style={styles.layeredCard1} />}
            
            <View style={[styles.mainCard, dynamicMainCardStyle]}>
              <Text style={[styles.questionText, { color: "#DE7272" }]}>
                {/* {currentQ.type === "date" ? "Are you already 18 years old?" : `${t(currentQ.text)}`} */}
                {t("question_"+currentQ.id)}
              </Text>
            </View>
          </Animated.View>

          <TouchableOpacity
            onPress={handleNext}
            disabled={!isCurrentAnswered}
            style={[styles.arrowButton, { opacity: isCurrentAnswered ? 1 : 0.3 }]}
          >
            <Text style={styles.arrowText}>{currentIndex === totalSteps - 1 ? "✓" : "›"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          {allQuestions.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.progressDash,
                {
                  backgroundColor: idx <= currentIndex ? "#DE7272" : "#ffffffff",
                  width: idx === currentIndex ? 40 : 25,
                  height: 8,
                },
              ]}
            />
          ))}
        </View>

        <Animated.View style={[styles.answersContainer, { transform: [{ translateX: slideAnim }], opacity: opacityAnim }]}>
          {/* {currentQ.type === "date" && (
            <View style={{ alignItems: "center", width: "100%" }}>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: "#DE7272", fontSize: 16, fontWeight: "600" }}>
                  {birthDate ? birthDate.toLocaleDateString() : "Оберіть дату"}
                </Text>
              </TouchableOpacity>
              
              {showDatePicker && (
                Platform.OS === 'web' ? (
                  <View style={{ marginTop: 10, width: '100%' }}>
                    <input
                      type="date"
                      style={{
                        width: '100%',
                        height: 50,
                        padding: '0 15px',
                        borderRadius: '25px',
                        border: '3.5px solid #DE7272',
                        backgroundColor: "transparent",
                        color: isDark ? colors.text : "#333",
                        fontSize: '16px',
                        fontFamily: 'inherit',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                      onChange={(e) => {
                        if (e.target.value) {
                          const d = new Date(e.target.value);
                          setBirthDate(d);
                          setAnswers((prev) => ({ ...prev, [currentQ.id]: checkIsAdult(d) ? "yes" : "no" }));
                        }
                      }}
                      onBlur={() => setShowDatePicker(false)}
                      autoFocus
                    />
                  </View>
                ) : (
                  <DateTimePicker
                    value={birthDate || new Date(2000, 0, 1)}
                    mode="date"
                    display="spinner"
                    maximumDate={new Date()}
                    locale="uk-UA"
                    onChange={(event, date) => {
                      setShowDatePicker(false);
                      if (date) {
                        setBirthDate(date);
                        setAnswers((prev) => ({ ...prev, [currentQ.id]: checkIsAdult(date) ? "yes" : "no" }));
                      }
                    }}
                  />
                )
              )}
            </View>
          )} */}

          {currentQ.type === "yesno" && (
            <View style={styles.actionRow}>
              {renderButton(currentQ.id, "yes", t("yes") || "Yes")}
              {renderButton(currentQ.id, "no", t("no") || "No")}
            </View>
          )}

          {currentQ.type === "have" && (
            <View style={styles.actionRow}>
              {renderButton(currentQ.id, "have", t("have") || "Yes")}
              {renderButton(currentQ.id, "no", t("dont_have") || "No")}
            </View>
          )}

          {currentQ.type === "blood" && (
            <View style={{ width: "90%", alignItems: "center" }}>
              <View style={styles.bloodGrid}>
                {bloodTypes.map((bt) => {
                  const active = answers[currentQ.id] === bt;
                  return (
                    <TouchableOpacity
                      key={bt}
                      onPress={() => setAnswers({ ...answers, [currentQ.id]: bt })}
                      style={[
                        styles.bloodOption,
                        {
                          backgroundColor: active ? "#DE7272" : "transparent",
                          borderColor: "#DE7272",
                        },
                      ]}
                    >
                      <Text style={[styles.optionText, { color: active ? "#FFFFFF" : "#DE7272" }]}>{t(bt)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity
                onPress={() => setAnswers({ ...answers, [currentQ.id]: "unknown" })}
                style={[
                  styles.unknownOption,
                  {
                    backgroundColor: answers[currentQ.id] === "unknown" ? "#DE7272" : "transparent",
                    borderColor: "#DE7272",
                  },
                ]}
              >
                <Text style={[styles.optionText, { color: answers[currentQ.id] === "unknown" ? "#FFFFFF" : "#DE7272", fontSize: 16 }]}>
                  {t("blood_type_unknown")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </View>

      <View style={styles.waveContainer} pointerEvents="none">
        <Image source={require('../../../images/wave.png')} style={styles.waveImage} resizeMode="cover" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    position: "relative",
  },
  header: {
    paddingTop: 50,
    alignItems: "center",
    marginTop: 50,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 45,
    height: 35,
    marginLeft: -35,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -50,
  },
  carouselWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  arrowButton: {
    padding: 10,
    width: 50,
    alignItems: "center",
  },
  arrowText: {
    fontSize: 45,
    fontWeight: "300",
    color: "#DE7272",
  },
  cardStack: {
    flex: 1,
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  layeredCard: {
    position: "absolute",
    width: "98%",
    height: "98%",
    backgroundColor: "#fcf8f8ff",
    borderColor: "#f7ebebff",
    borderWidth: 1,
    borderRadius: 50,
    top: 7,
    left: "5%",
    opacity: 0.6,
  },
  layeredCard1: {
    position: "absolute",
    width: "98%",
    height: "98%",
    backgroundColor: "#FCF8F8",
    borderColor: "#f7ebebff",
    borderWidth: 1,
    borderRadius: 50,
    top: 7,
    right: "5%",
    opacity: 0.6,
  },
  mainCard: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    shadowColor: "#DE7272",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderTopWidth: 1.5,
    borderTopColor: "#F7D4D4",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  progressContainer: {
    flexDirection: "row",
    marginTop: 35,
    gap: 6,
    justifyContent: "center",
  },
  progressDash: {
    height: 6,
    borderRadius: 4,
    borderWidth: 0.3,
    borderRightColor: "#DE7272",
    borderBottomColor: "#DE7272",
    borderColor: "#ffffffff",
  },
  answersContainer: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 40,
    minHeight: 50,
  },
  actionRow: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    width: "100%",
  },
  optionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 3.5,
    alignItems: "center",
  },
  optionText: {
    fontWeight: "700",
    fontSize: 18,
  },
  dateInput: {
    width: "100%",
    borderWidth: 3.5,
    borderColor: "#DE7272",
    borderRadius: 25,
    padding: 14,
    alignItems: "center",
  },
  bloodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    width: "90%",
    marginBottom: 10,
  },
  bloodOption: {
    width: "23%",
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 3.5,
    alignItems: "center",
    justifyContent: "center",
  },
  unknownOption: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 3.5,
    alignItems: "center",
  },
  waveContainer: {
    width: "100%",
    height: 290,
  },
  waveImage: {
    width: "100%",
    height: "100%",
  },
});