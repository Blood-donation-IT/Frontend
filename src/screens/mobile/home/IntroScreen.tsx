import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { useTheme } from "../../../Theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";

type IntroScreenProps = NativeStackScreenProps<RootStackParamList, "Intro">;
const donorImage = require("../../../images/donor-intro.png");

const IntroScreen: React.FC<IntroScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <LinearGradient
      colors={[colors.backgroundMain, colors.backgroundCard]}
      style={styles.container}
    >
      <LanguageSwitcher />
      <StatusBar barStyle="dark-content" backgroundColor="#FFF6F6" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Text style={styles.title}>
            {t("the_step")}
            {"\n"}
            {t("that_gives_hope")}
          </Text>
          <Image source={donorImage} style={styles.image} />
          <Text style={styles.subtitle}>{t("thank_you_for_joining_us")}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LogIn")}
          >
            <Text style={styles.buttonText}>{t("get_started")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6F4E37",
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginVertical: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#E57373",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default IntroScreen;
