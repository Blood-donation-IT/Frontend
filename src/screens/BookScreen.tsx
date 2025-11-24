import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback, Animated, TouchableOpacity } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const BookScreen = () => {
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

  return (
    <View style={styles.container}>
      {/* SVG фон */}
      <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="spot1" cx="85%" cy="15%" r="100%" fx="85%" fy="15%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#EFC5C5" stopOpacity="1" />
            <Stop offset="100%" stopColor="#EFC5C5" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot2" cx="25%" cy="75%" r="100%" fx="20%" fy="75%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#F2D6D0" stopOpacity="1" />
            <Stop offset="100%" stopColor="#F2D6D0" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot4" cx="80%" cy="85%" r="50%" fx="80%" fy="85%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFBDF" stopOpacity="0.95" />
            <Stop offset="100%" stopColor="#FFFBDF" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot5" cx="40%" cy="35%" r="30%" fx="40%" fy="35%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFCE6" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#FFFCE6" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot6" cx="60%" cy="40%" r="50%" fx="60%" fy="40%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#F4E7E5" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#F4E7E5" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="spot7" cx="15%" cy="15%" r="50%" fx="15%" fy="15%" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FFFBDF" stopOpacity="0.95" />
            <Stop offset="100%" stopColor="#FFFBDF" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot1)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot2)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot4)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot5)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot6)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#spot7)" />
      </Svg>

      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.mainSection}>
          {/* Передня сторона */}
          <Animated.View style={[StyleSheet.absoluteFill, { backfaceVisibility: 'hidden', transform: [{ rotateY: frontInterpolate }] }]}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
              <View style={styles.row}>
                <View style={styles.box1}>
                  <Text style={{ fontSize: 20, fontWeight: "600"}}>Donor Book</Text>
                </View>
                <View style={styles.box2}>
                  <Text style={{ fontSize: 13, fontWeight: "600"}}>Series №0203</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.box3}>
                  <View style={styles.photoPlaceholder}></View>
                </View>
                <View style={styles.box4}>
                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Date Of Issue:</Text>
                    <Text style={styles.infoValue}>24 June 2025</Text>
                  </View>
                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Location:</Text>
                    <Text style={styles.infoValue}>NNI JHP Lviv Region</Text>
                  </View>
                  <View style={styles.infoBlock}>
                    <Text style={styles.infoLabel}>Type Blood:</Text>
                    <Text style={styles.infoValue}>A(II)Rh+</Text>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.box5}>
                  <View><Text style={styles.nameText}>Blue</Text></View>
                  <View><Text style={styles.nameText}>Jack</Text></View>
                  <View><Text style={styles.nameText}>Bober</Text></View>
                </View>
                <View style={styles.box6}>
                  <TouchableOpacity>
                    <Text style={styles.dots}>...</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Задня сторона */}
          <Animated.View style={[StyleSheet.absoluteFill, { backfaceVisibility: 'hidden', transform: [{ rotateY: backInterpolate }] }]}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center",  }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>тут має бути qr-код </Text>
              
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
  mainSection: {
    height: 500,
    width: 325,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderColor: "#E66A6A",
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // opacity: 0.5,
    // paddingTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 0,
    marginBottom: 50,
    alignItems: "center",
    flex: 1,
  },
  box: {
    flex: 1,
    height: "100%",
    backgroundColor: "#151211ff",
    borderRadius: 20,
    marginBottom: 0,
    marginHorizontal: 5,
  },
  box1: {},
  box2: {},
  box3: {},
  box4: {
    justifyContent: "flex-start",
    marginBottom: 90,
  },
  box5: {
    marginTop: 70,
  },
  box6: {
    marginTop: 90,
    alignItems: "flex-end",
  },
  photoPlaceholder: {
    width: 115,
    height: 150,
    backgroundColor: "#D9D9D9",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 110
  },
  // infoRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   width: "100%",
  //   marginBottom: 10,
  // },
  infoLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
    marginBottom: 0,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000",
    textAlign: "left",
    marginBottom: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  infoBlock: {
    marginBottom: 5,
  },
  dots: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    
  },
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