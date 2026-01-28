import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Animated, TouchableOpacity } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from "../Theme/ThemeContext";

const { width, height } = Dimensions.get("window");

const BookScreen = () => {
  const { colors, isLight } = useTheme(); 

  const baseUrl = "https://blood-donation.com/user/profile";
  const [qrValue, setQrValue] = useState(baseUrl);

  useEffect(() => {
    const randomString = Math.random().toString(36).substring(7);
    setQrValue(`${baseUrl}?r=${randomString}`);
  }, []);

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
                <Text style={[styles.headerTitle, { color: cardTextColor }]}>Donor Book</Text>
                <Text style={[styles.headerSeries, { color: cardTextColor }]}>Series №0203</Text>
              </View>

              <View style={styles.rowMiddle}>
                <View style={styles.photoContainer}>
                  <View style={[styles.photoPlaceholder, { backgroundColor: placeholderColor }]} />
                </View>
                
                <View style={styles.detailsContainer}>
                  <View style={styles.infoBlock}>
                    <Text style={[styles.infoLabel, { color: cardTextColor }]}>Date Of Issue:</Text>
                    <Text style={[styles.infoValue, { color: cardTextColor, opacity: 0.8 }]}>24 June 2025</Text>
                  </View>
                  <View style={styles.infoBlock}>
                    <Text style={[styles.infoLabel, { color: cardTextColor }]}>Location:</Text>
                    <Text style={[styles.infoValue, { color: cardTextColor, opacity: 0.8 }]}>NNI JHP Lviv Region</Text>
                  </View>
                  <View style={styles.infoBlock}>
                    <Text style={[styles.infoLabel, { color: cardTextColor }]}>Type Blood:</Text>
                    <Text style={[styles.infoValue, { color: cardTextColor, opacity: 0.8 }]}>A(II)Rh+</Text>
                  </View>
                </View>
              </View>

              <View style={styles.rowBottom}>
                <View>
                  <Text style={[styles.nameText, { color: cardTextColor }]}>Blue</Text>
                  <Text style={[styles.nameText, { color: cardTextColor }]}>Jack</Text>
                  <Text style={[styles.nameText, { color: cardTextColor }]}>Bober</Text>
                </View>
                <TouchableOpacity>
                  <Text style={[styles.dots, { color: cardTextColor }]}>...</Text>
                </TouchableOpacity>
              </View>

            </View>
          </Animated.View>

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

              <Text style={[styles.qrText, { color: cardTextColor }]}>Scan for details</Text>
            </View>
          </Animated.View>

        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  }
});

export default BookScreen;