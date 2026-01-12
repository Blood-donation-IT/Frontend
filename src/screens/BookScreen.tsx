import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Animated, TouchableOpacity } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { useTheme } from "../Theme/ThemeContext";

const { width, height } = Dimensions.get("window");

const BookScreen = () => {
  const { colors, isDark } = useTheme(); 

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
  const spotSecondary = isDark ? colors.backgroundCard : "#FFFBDF"; 

  const cardStyle = {
    backgroundColor: isDark ? "rgba(58, 58, 58, 0.7)" : "rgba(255, 255, 255, 0.55)",
    borderColor: isDark ? "transparent" : colors.primary,
  };

const textColor = isDark ? colors.backgroundMain : colors.backgroundCard;
const placeholderColor = "#D9D9D9";

  return (
    <View style={[styles.container, { backgroundColor: bgBase }]}>
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="spot1" cx="85%" cy="15%" r="100%" fx="85%" fy="15%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotPrimary} stopOpacity={isDark ? 0.2 : 0.4} />
            <Stop offset="100%" stopColor={spotPrimary} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot2" cx="25%" cy="75%" r="100%" fx="20%" fy="75%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotPrimary} stopOpacity={isDark ? 0.15 : 0.3} />
            <Stop offset="100%" stopColor={spotPrimary} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot4" cx="80%" cy="85%" r="50%" fx="80%" fy="85%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotSecondary} stopOpacity={isDark ? 0.1 : 0.95} />
            <Stop offset="100%" stopColor={spotSecondary} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot5" cx="40%" cy="35%" r="30%" fx="40%" fy="35%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotSecondary} stopOpacity={isDark ? 0.05 : 0.9} />
            <Stop offset="100%" stopColor={spotSecondary} stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot6" cx="60%" cy="40%" r="50%" fx="60%" fy="40%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor={spotPrimary} stopOpacity={isDark ? 0.1 : 0.2} />
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
                <Text style={[styles.headerTitle, { color: textColor }]}>Donor Book</Text>
                <Text style={[styles.headerSeries, { color: textColor }]}>Series №0203</Text>
              </View>

              <View style={styles.rowMiddle}>
                <View style={styles.photoContainer}>
                  <View style={[styles.photoPlaceholder, { backgroundColor: placeholderColor }]} />
                </View>
                
                <View style={styles.detailsContainer}>
                  <View style={styles.infoBlock}>
                    <Text style={[styles.infoLabel, { color: textColor }]}>Date Of Issue:</Text>
                    <Text style={[styles.infoValue, { color: textColor, opacity: 0.8 }]}>24 June 2025</Text>
                  </View>
                  <View style={styles.infoBlock}>
                    <Text style={[styles.infoLabel, { color: textColor }]}>Location:</Text>
                    <Text style={[styles.infoValue, { color: textColor, opacity: 0.8 }]}>NNI JHP Lviv Region</Text>
                  </View>
                  <View style={styles.infoBlock}>
                    <Text style={[styles.infoLabel, { color: textColor }]}>Type Blood:</Text>
                    <Text style={[styles.infoValue, { color: textColor, opacity: 0.8 }]}>A(II)Rh+</Text>
                  </View>
                </View>
              </View>

              <View style={styles.rowBottom}>
                <View>
                  <Text style={[styles.nameText, { color: textColor }]}>Blue</Text>
                  <Text style={[styles.nameText, { color: textColor }]}>Jack</Text>
                  <Text style={[styles.nameText, { color: textColor }]}>Bober</Text>
                </View>
                <TouchableOpacity>
                  <Text style={[styles.dots, { color: textColor }]}>...</Text>
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
              
              {/* QR-код побудований на Flexbox (без абсолютів) */}
              <View style={[styles.qrCodeBox, { borderColor: textColor, backgroundColor: cardStyle.backgroundColor }]}>
                 
                 {/* Верхній ряд: Лівий і Правий кути */}
                 <View style={styles.qrRow}>
                    <View style={[styles.qrCorner, { borderColor: textColor }]} />
                    <View style={[styles.qrCorner, { borderColor: textColor }]} />
                 </View>

                 {/* Середній ряд: Центр */}
                 <View style={styles.qrRowCenter}>
                    <View style={[styles.qrCenter, { backgroundColor: textColor }]} />
                 </View>

                 {/* Нижній ряд: Лівий кут */}
                 <View style={styles.qrRow}>
                    <View style={[styles.qrCorner, { borderColor: textColor }]} />
                    {/* Пустий View для балансу, щоб flex-space-between працював коректно, або просто залишити один елемент якщо flex-start */}
                    <View style={[styles.qrCorner, { opacity: 0 }]} /> 
                 </View>

              </View>
              
              <Text style={[styles.qrText, { color: textColor }]}>Scan for details</Text>
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
  
  // --- Rows ---
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

  // --- Text Styles ---
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
  
  // --- Middle Section Styles ---
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

  // --- Footer Styles ---
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

  // --- QR Code Styles (Flexbox) ---
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
    padding: 15, // Внутрішній відступ для кутів
    justifyContent: 'space-between', // Розподіляє ряди вертикально
  },
  qrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Розподіляє кути горизонтально
    width: '100%',
  },
  qrRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center', // Центрує квадрат
    alignItems: 'center',
    flex: 1, // Займає доступний простір по вертикалі
  },
  qrCorner: {
    width: 50,
    height: 50,
    borderWidth: 10,
  },
  qrCenter: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  qrText: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.7,
  }
});

export default BookScreen;

// import React, { useRef, useState } from "react";
// import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Animated, TouchableOpacity } from "react-native";
// import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

// const { width, height } = Dimensions.get("window");

// const BookScreen = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.topSection}>
//         <Text style={styles.title}>Donor Book</Text>
//         <Text style={styles.subtitle}>3 days left to receive the donor's book</Text>
//         <Text style={styles.paragraph}>
//           Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//         </Text>
//       </View>

//       <View style={styles.bottomSection}>
//         <Text style={styles.note}>
//           To receive the donor's book, you need to make 5 donations
//         </Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Get Donor Book</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   topSection: {
//     flex: 2,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 25,
//   },
//   bottomSection: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 25,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 50,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 50,
//     textAlign: "center",
//   },
//   paragraph: {
//     fontSize: 16,
//     textAlign: "left",
//     marginBottom: 50,
//     lineHeight: 22,
//   },
//   note: {
//     fontSize: 16,
//     textAlign: "center",
//     marginTop: 0,
//   },
//   button: {
//     backgroundColor: "#D96E6E",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 25,
//     marginTop: 0,

//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });

// export default BookScreen;