import React, { useRef, useState, useEffect } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  TouchableWithoutFeedback, 
  Animated, 
  TouchableOpacity,
  ScrollView,
  Image, 
  useWindowDimensions
} from "react-native";
// import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Animated, TouchableOpacity, Image } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from "../../../Theme/ThemeContext";
import { useAuthStore } from "../../../stores/useAuthStore";
import { t } from "i18next";



const BookScreen = () => {
  const { colors, isLight } = useTheme(); 
  
  const { width, height } = useWindowDimensions();
  

  const { user } = useAuthStore();

  const baseUrl = "https://blood-donation.com/user/profile";
  const [qrValue, setQrValue] = useState(baseUrl);

  useEffect(() => {
    const randomString = Math.random().toString(36).substring(7);
    setQrValue(`${baseUrl}?r=${randomString}`);
  }, []);

  // --- Анімація перевертання картки ---
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: flipped ? 0 : 180,
      useNativeDriver: true,
      friction: 8,
      tension: 10,
    }).start(() => setFlipped(!flipped));
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  // --- Анімація Bottom Sheet ---
  const sheetAnim = useRef(new Animated.Value(height)).current;
  const [sheetVisible, setSheetVisible] = useState(false);

  const openSheet = () => {
    setSheetVisible(true);
    Animated.spring(sheetAnim, {
      toValue: height * 0.15, // Піднімаємо до 85% екрану, щоб вмістити всі дані з картинки 2
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(sheetAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setSheetVisible(false));
  };

  // Кольори
  const bgBase = colors.backgroundMain;
  const spotPrimary = colors.primary; 
  const spotSecondary = isLight ? "#FFFBDF" : colors.backgroundCard; 

  const cardStyle = {
    backgroundColor: isLight ? "rgba(255, 255, 255, 0.55)" : "rgba(58, 58, 58, 0.7)" ,
    borderColor: isLight ? colors.primary : "transparent",
  };

  const cardTextColor = isLight ? colors.text : "#E0E0E0";
  const qrColor = "#000000"; 
  const qrBackgroundColor = "#FFFFFF"; 
  const placeholderColor = "#D9D9D9";

  return (
    <View style={[styles.container, { backgroundColor: bgBase }]}>
      {/* SVG Градієнтний фон */}
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="spot1" cx="85%" cy="15%" r="100%" fx="85%" fy="15%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotPrimary} stopOpacity={isLight ? 0.4 : 0.2} />
            <Stop offset="100%" stopColor={spotPrimary} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot2" cx="25%" cy="75%" r="100%" fx="20%" fy="75%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotPrimary} stopOpacity={isLight ? 0.3 : 0.15} />
            <Stop offset="100%" stopColor={spotPrimary} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot4" cx="80%" cy="85%" r="50%" fx="80%" fy="85%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotSecondary} stopOpacity={isLight ? 0.95 : 0.1} />
            <Stop offset="100%" stopColor={spotSecondary} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot5" cx="40%" cy="35%" r="30%" fx="40%" fy="35%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotSecondary} stopOpacity={isLight ? 0.9 : 0.05} />
            <Stop offset="100%" stopColor={spotSecondary} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot6" cx="60%" cy="40%" r="50%" fx="60%" fy="40%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotPrimary} stopOpacity={isLight ? 0.2 : 0.1} />
            <Stop offset="100%" stopColor={spotPrimary} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill={bgBase} />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot1)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot2)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot4)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot5)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot6)" />
      </Svg>

      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.cardContainer}>
          
          {/* Лицьова сторона картки */}
          <Animated.View 
            style={[
              styles.cardFace, 
              { 
                transform: [{ rotateY: frontInterpolate }],
                ...cardStyle 
              }
            ]}
          >
            <View style={styles.contentWrapper}>
              
              <View style={styles.rowTop}>
                <Text style={[styles.headerTitle, { color: cardTextColor }]}>{t("donor_book_title")}</Text>
                <Text style={[styles.headerSeries, { color: cardTextColor }]}>{t("series_no", { number: "0203" })}</Text>
              </View>

              <View style={styles.rowMiddle}>
                <View style={styles.photoContainer}>
                  <Image
                    source={{ uri: user?.avatar }}
                    style={[
                      styles.photoPlaceholder,
                      {
                        backgroundColor: colors.backgroundCard,
                        borderColor: colors.text + "20",
                        borderWidth: 1,
                      },
                    ]}
                  />
                </View>
                
                <View style={styles.detailsContainer}>
                  <View style={styles.infoBlock}>
                    <Text style={[styles.infoLabel, { color: cardTextColor }]}>{t("date_of_issue")}:</Text>
                    <Text style={[styles.infoValue, { color: cardTextColor, opacity: 0.8 }]}>28 June 2025</Text>
                  </View>
                  <View style={styles.infoBlock}>
                    <Text style={[styles.infoLabel, { color: cardTextColor }]}>{t("location_label")}:</Text>
                    <Text style={[styles.infoValue, { color: cardTextColor, opacity: 0.8 }]}>NNI JHP Lviv Region</Text>
                  </View>
                  <View style={styles.infoBlock}>
                    <Text style={[styles.infoLabel, { color: cardTextColor }]}>{t("type_blood")}:</Text>
                    <Text style={[styles.infoValue, { color: cardTextColor, opacity: 0.8 }]}>{t(user?.blood_type)}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.rowBottom}>
                <View>
                  {/* <Text style={[styles.nameText, { color: cardTextColor }]}>Blue</Text>
                  <Text style={[styles.nameText, { color: cardTextColor }]}>Jack</Text>
                  <Text style={[styles.nameText, { color: cardTextColor }]}>Bober</Text> */}
                  <Text style={[styles.nameText, { color: cardTextColor }]}>{user?.name}</Text>
                </View>
                
                {/* Кнопка "..." яка відкриває Bottom Sheet */}
                <TouchableOpacity onPress={openSheet} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                  <Text style={[styles.dots, { color: cardTextColor }]}>...</Text>
                </TouchableOpacity>
              </View>

            </View>
          </Animated.View>

          {/* Задня сторона картки */}
          <Animated.View 
            style={[
              styles.cardFace, 
              styles.cardBack, 
              { 
                transform: [{ rotateY: backInterpolate }],
                ...cardStyle 
              }
            ]}
          >
            <View style={styles.qrContainer}>
              
              <View style={[styles.qrCodeBox, { borderColor: qrColor, backgroundColor: qrBackgroundColor }]}>
                 <QRCode
                    value={qrValue} 
                    size={150} 
                    color={qrColor} 
                    backgroundColor={qrBackgroundColor} 
                 />
              </View>

              <Text style={[styles.qrText, { color: cardTextColor }]}>{t("scan_details")}</Text>
            </View>
          </Animated.View>

        </View>
      </TouchableWithoutFeedback>

      {/* --- BOTTOM SHEET --- */}
      {sheetVisible && (
        <TouchableWithoutFeedback onPress={closeSheet}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.bottomSheet,
                  { 
                    backgroundColor: colors.backgroundMain, 
                    transform: [{ translateY: sheetAnim }] 
                  }
                ]}
              >
                {/* Header модалки */}
                <View style={styles.sheetHeader}>
                  <View style={{ width: 40 }} /> 
                  <Text style={[styles.sheetTitle, { color: colors.text }]}>
                    {t("full_information")}
                  </Text>
                  <TouchableOpacity onPress={closeSheet} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                    <Text style={styles.closeBtn}>{t("done")}</Text>
                  </TouchableOpacity>
                </View>

                {/* Вміст, який можна скролити */}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "35%" }}>
                  {/* <View> */}
                  <Text style={[styles.sheetSeries, { color: colors.text }]}>{t("series_no", { number: "0203" })}</Text>

                  {/* Профіль (Фото + Ім'я) */}
                  <View style={[styles.profileCardSheet, { backgroundColor: colors.backgroundCard }]}>
                    <Image
                      source={{ uri: user?.avatar }}
                      style={[
                        styles.photoPlaceholderSheet,
                        {
                          backgroundColor: colors.backgroundCard,
                          borderColor: colors.text + "20",
                          borderWidth: 1,
                        },
                      ]}
                    />
                    <View style={styles.profileInfo}>
                    <Text style={[styles.profileName, { color: cardTextColor }]}>{user?.name}</Text>

                      {/* <Text style={[styles.profileName, { color: colors.text }]}>Blues</Text>
                      <Text style={[styles.profileName, { color: colors.text }]}>Jack</Text>
                      <Text style={[styles.profileName, { color: colors.text }]}>Boberovuch</Text> */}
                      <Text style={[styles.profileDobLabel, { color: colors.text }]}>{t("date_of_birth")}</Text>
                      <Text style={[styles.profileDob, { color: colors.text }]}>07.07.1999</Text>
                    </View>
                  </View>

                  {/* Інфо картки (кров, дата, локація) */}
                  <View style={[styles.infoBlockSheet, { backgroundColor: colors.backgroundCard }]}>
                    <Text style={[styles.infoLabelSheet, { color: colors.text }]}>Type Blood</Text>
                    <Text style={[styles.infoValueSheet, { color: colors.text }]}>{t(user?.blood_type)}</Text>
                  </View>

                  <View style={[styles.infoBlockSheet, { backgroundColor: colors.backgroundCard }]}>
                    <Text style={[styles.infoLabelSheet, { color: colors.text }]}>Date Of Issue</Text>
                    <Text style={[styles.infoValueSheet, { color: colors.text }]}>28 June 2025</Text>
                  </View>

                  <View style={[styles.infoBlockSheet, { backgroundColor: colors.backgroundCard }]}>
                    <Text style={[styles.infoLabelSheet, { color: colors.text }]}>Location</Text>
                    <Text style={[styles.infoValueSheet, { color: colors.text }]}>NNI JHP Lviv Region</Text>
                  </View>
                </ScrollView>
                {/* </View> */}

              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  // --- Стилі Картки та Головного Екрану ---
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom:"30%",
  },
  cardContainer: {
    width: 323,
    height: 478,
  },
  cardFace: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 45,
    borderWidth: 1,
    backfaceVisibility: 'hidden',
    padding: 25,
    paddingTop: 35,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  cardBack: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  rowMiddle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 10,
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  headerSeries: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 6,
    opacity: 0.9,
  },
  photoContainer: {
    width: "42%",
  },
  photoPlaceholder: {
    width: 125,
    height: 160,
    borderRadius: 20,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 110,
    height: 110,
    // borderRadius: 100,
  },
  detailsContainer: {
    width: "55%",
    justifyContent: 'flex-start',
    paddingTop: 0,
    paddingLeft: 10,
  },
  infoBlock: {
    marginBottom: 18,
  },
  infoLabel: {
    fontSize: 16, 
    fontWeight: "500",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
  },
  dots: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 5,
    opacity: 0.8,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeBox: {
    width: 200,
    height: 200,
    borderWidth: 5,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  qrText: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  },

  // --- Стилі Bottom Sheet ---
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    zIndex: 9999,
    elevation: 10,
  },
  bottomSheet: {
    height: "85%", // 85% екрану, щоб влізла вся Full Information
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  closeBtn: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444", // Червоний, як на макеті
  },
  sheetSeries: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  profileCardSheet: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FCA5A5", // Світло-червона рамка
    marginBottom: 20,
  },
  photoPlaceholderSheet: {
    width: 100,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
  },
  profileInfo: {
    justifyContent: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  profileDobLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 12,
  },
  profileDob: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoBlockSheet: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  infoLabelSheet: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  infoValueSheet: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookScreen;