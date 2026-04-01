import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../Theme/ThemeContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useTranslation } from "react-i18next";

export default function TestScreen() {
  const navigation = useNavigation();
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const questions = [
    { id: 2, text: "Ваша вага 50+ кг?", type: "yesno" },
    {
      id: 3,
      text: "Ви загалом вважаєте свій стан здоров’я добрим?",
      type: "yesno",
    },
    {
      id: 4,
      text: "Ви не маєте хронічних захворювань у важкій формі?",
      type: "have",
    },
    {
      id: 5,
      text: "Ви не маєте хвороб серця або серцевої недостатності?",
      type: "have",
    },
    {
      id: 6,
      text: "Ви не маєте цукрового діабету (особливо інсулінозалежного)?",
      type: "have",
    },
    {
      id: 7,
      text: "Ви не маєте захворювань крові або порушень згортання?",
      type: "have",
    },
    { id: 8, text: "Ви не маєте онкологічних захворювань?", type: "have" },
    {
      id: 9,
      text: "Ви не маєте гепатиту B, C або жовтяниці в анамнезі?",
      type: "have",
    },
    { id: 10, text: "Яка у вас група крові?", type: "blood" },
  ];
  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showWarning, setShowWarning] = useState(false);
  const allAnswered =
    questions.every((q) => answers[q.id]) && birthDate !== null;
  useAuthStore((state) => state.updateUserAction);

  const checkIsAdult = (date: Date) => {
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
    return age >= 18;
  };

  const onDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
      setAnswers((prev) => ({
        ...prev,
        1: checkIsAdult(selectedDate) ? "yes" : "no",
      }));
    }
  };

  const handleFinishTest = async () => {
    if (!allAnswered) {
      setShowWarning(true);
      return;
    }
    navigation.navigate("Home");
  };

  const renderButton = (qid: number, value: string, label: string) => {
    const active = answers[qid] === value;
    return (
      <TouchableOpacity
        onPress={() => setAnswers({ ...answers, [qid]: value })}
        style={[
          styles.option,
          {
            borderColor: active
              ? colors.primary
              : isDark
                ? colors.text
                : colors.primary,
            backgroundColor: active ? colors.primary : "transparent",
          },
        ]}
      >
        <Text
          style={[
            styles.optionText,
            { color: active ? "#FFFFFF" : colors.text },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundMain }]}
    >
      <Text style={[styles.title, { color: colors.primary }]}>
        {t("short_test")}
      </Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        {t("necessary_for_donation")}
      </Text>
      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: isDark ? colors.text : colors.primary + "50",
            },
          ]}
        >
          <Text style={[styles.questionText, { color: colors.primary }]}>
            1. Коли ви народилися?
          </Text>
          <TouchableOpacity
            style={[styles.dateInput, { borderColor: colors.primary + "50" }]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {birthDate ? birthDate.toLocaleDateString() : "Оберіть дату"}
            </Text>
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate || new Date(2000, 0, 1)}
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            locale="uk-UA"
            onChange={onDateChange}
          />
        )}
        {questions.map((q) => (
          <View
            key={q.id}
            style={[
              styles.card,
              {
                backgroundColor: colors.backgroundCard,
                borderColor: isDark ? colors.text : colors.primary + "50",
              },
            ]}
          >
            <Text style={[styles.questionText, { color: colors.primary }]}>
              {q.id}. {t(q.text)}
            </Text>
            <View style={styles.optionsRow}>
              {q.type === "blood" ? (
                <View style={{ width: "100%", marginLeft: -20 }}>
                  <View style={styles.bloodGrid}>
                    {bloodTypes.map((bt) => {
                      const active = answers[q.id] === bt;
                      return (
                        <TouchableOpacity
                          key={bt}
                          onPress={() => setAnswers({ ...answers, [q.id]: bt })}
                          style={[
                            styles.bloodOption,
                            {
                              borderColor: active
                                ? colors.primary
                                : isDark
                                  ? colors.text
                                  : colors.primary + "50",
                              backgroundColor: active
                                ? colors.primary
                                : "transparent",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.optionText,
                              { color: active ? "#FFFFFF" : colors.text },
                            ]}
                          >
                            {bt}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      setAnswers({ ...answers, [q.id]: "unknown" })
                    }
                    style={[
                      styles.unknownOption,
                      {
                        borderColor:
                          answers[q.id] === "unknown"
                            ? colors.primary
                            : isDark
                              ? colors.text
                              : colors.primary + "50",
                        backgroundColor:
                          answers[q.id] === "unknown"
                            ? colors.primary
                            : "transparent",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color:
                            answers[q.id] === "unknown"
                              ? "#FFFFFF"
                              : colors.text,
                        },
                      ]}
                    >
                      Я не знаю свою групу крові
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : q.type === "yesno" ? (
                <>
                  {renderButton(q.id, "yes", t("yes"))}
                  {renderButton(q.id, "no", t("no"))}
                </>
              ) : (
                <>
                  {renderButton(q.id, "have", t("have"))}
                  {renderButton(q.id, "no", t("dont_have"))}
                </>
              )}
            </View>
          </View>
        ))}
        {showWarning && !allAnswered && (
          <Text style={styles.warningText}>{t("answer_All_questions")}</Text>
        )}
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: allAnswered
                ? colors.primary
                : isDark
                  ? "#555"
                  : "#D1D1D1",
            },
          ]}
          onPress={handleFinishTest}
        >
          <Text style={styles.continueText}>{t("continue")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.6,
  },
  list: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  questionText: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 15,
    marginLeft: 20,
  },
  option: {
    minWidth: 80,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
  },
  optionText: {
    fontWeight: "500",
  },
  dateInput: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  continueButton: {
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  warningText: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 13,
  },
  bloodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  bloodOption: {
    width: "21%",
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
  },
  unknownOption: {
    marginTop: 15,
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
  },
});
