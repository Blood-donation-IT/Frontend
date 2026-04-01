import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Entypo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../Theme/ThemeContext";
import { useAuthStore } from "../../../stores/useAuthStore";

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, "Splash">;
const { width } = Dimensions.get("window");

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const waveTop = useRef(new Animated.Value(-width)).current;
  const waveMid = useRef(new Animated.Value(width)).current;
  const waveBot = useRef(new Animated.Value(-width)).current;
  const { checkAuth } = useAuthStore();
  const { colors, isLight } = useTheme();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(waveBot, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(waveMid, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(waveTop, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const bootstrap = async () => {
      const startTime = Date.now();
      await checkAuth();
      const isAuth = useAuthStore.getState().isAuth;
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, 2500 - elapsed);
      setTimeout(
        () => navigation.replace(isAuth ? "Home" : "Intro"),
        remainingTime,
      );
    };
    bootstrap();
  }, []);

  const darkMode = !isLight;
  return (
    <LinearGradient
      colors={darkMode ? ["#1E1E1E", "#3A3A3A"] : ["#FFF6F6", "#F5EDEB"]}
      style={styles.container}
    >
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />
      <SafeAreaView style={styles.topSection}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            Advanced donor
          </Text>
          <Icon name="drop" size={27} color="#E66A6A" style={styles.icon} />
        </View>
      </SafeAreaView>
      <Animated.Image
        source={require("../../../images/wave_top.png")}
        style={[styles.waveTop, { transform: [{ translateX: waveTop }] }]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("../../../images/wave_middle.png")}
        style={[styles.waveMid, { transform: [{ translateX: waveMid }] }]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require("../../../images/wave_bottom.png")}
        style={[styles.waveBot, { transform: [{ translateX: waveBot }] }]}
        resizeMode="cover"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 22,
  },
  icon: {
    marginLeft: 10,
  },
  waveTop: {
    width: 440,
    height: 278,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  waveMid: {
    width: 437,
    height: 216,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  waveBot: {
    width: 436,
    height: 198,
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
});

export default SplashScreen;
