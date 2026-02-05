import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

export default function TestScreen() {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const questions = [
    { id: 1, textKey: "question_1", type: "yesno" },
    { id: 2, textKey: "question_2", type: "yesno" },
    { id: 3, textKey: "question_3", type: "yesno" },
    { id: 4, textKey: "question_4", type: "yesno" },
    { id: 5, textKey: "question_5", type: "have" },
    { id: 6, textKey: "question_6", type: "have" },
    { id: 7, textKey: "question_7", type: "have" },
    { id: 8, textKey: "question_8", type: "have" },
    { id: 9, textKey: "question_9", type: "have" },
    { id: 10, textKey: "question_10", type: "have" },
  ];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const allAnswered = questions.every((q) => answers[q.id]);
  const [showWarning, setShowWarning] = useState(false);

  const renderButton = (qid: number, value: string, label: string) => {
    const active = answers[qid] === value;
    return (
      <TouchableOpacity
        onPress={() => setAnswers({ ...answers, [qid]: value })}
        style={[styles.option, active && styles.optionActive]}
      >
        <Text style={[styles.optionText, active && styles.optionTextActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("short_test")}</Text>
      <Text style={styles.subtitle}>{t("necessary_for_donation")}</Text>

      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {questions.map((q) => (
          <View key={q.id} style={styles.card}>
            <Text style={styles.questionText}>
              {q.id}. {t(q.textKey)}
            </Text>

            <View style={styles.optionsRow}>
              {q.type === "yesno" ? (
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
          <Text style={styles.warningText}>
            {t("answer_All_questions")}
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.continueButton,
            allAnswered && styles.continueButtonActive,
          ]}
          onPress={() => {
            if (!allAnswered) {
              setShowWarning(true);
              return;
            }
            navigation.navigate("Home");
          }}
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
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#E0706A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: "#F1C6C3",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },
  questionText: {
    color: "#E0706A",
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
    borderColor: "#F1C6C3",
    alignItems: "center",
  },
  optionActive: {
    backgroundColor: "#E0706A",
  },
  optionText: {
    color: "#333",
  },
  optionTextActive: {
    color: "#fff",
  },
  continueButton: {
    backgroundColor: "#D1D1D1",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  continueButtonActive: {
    backgroundColor: "#E0706A",
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  warningText: {
    textAlign: "center",
    color: "#E0706A",
    marginBottom: 8,
    fontSize: 13,
  },
});