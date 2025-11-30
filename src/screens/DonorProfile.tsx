import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from "react-native";

export default function DonorProfile() {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: flipped ? 0 : 180,
      duration: 500,
      useNativeDriver: true,
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
    <View style={styles.screen}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View>
          {/* Передня сторона картки */}
          <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
            <Text style={styles.cardSeries}>Series №0203</Text>
            <Text style={styles.cardTitle}>Donor Book</Text>

            <View style={styles.cardHeader}>
              <View style={styles.topSquare} />
              <View style={styles.headerText}>
                <Text style={styles.nameText}>Blue</Text>
                <Text style={styles.nameText}>Jack</Text>
                <Text style={styles.nameText}>Bober</Text>

                <View style={styles.cardInfo}>
                  <Text style={styles.infoLabel}>Date Of Issue:</Text>
                  <Text style={styles.infoText}>24 June 2025</Text>

                  <Text style={styles.infoLabel}>Location:</Text>
                  <Text style={styles.infoText}>NNI JHP Lviv Region</Text>

                  <Text style={styles.infoLabel}>Type Blood:</Text>
                  <Text style={styles.infoText}>A(II)Rh+</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Задня сторона картки */}
          <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
            {/* Пусто – тут можна вставити QR-код */}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9F7F7",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 137,
  },
  card: {
    width: 323,
    height: 478,
    borderRadius: 40,
    backgroundColor: "#FFFFFFB2",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    padding: 20,
    justifyContent: "flex-start",
    backfaceVisibility: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
  },
  cardBack: {
    backgroundColor: "#FFFFFFB2",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  topSquare: {
    width: 111,
    height: 141,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    marginRight: 15,
  },
  headerText: {
    flex: 1,
    justifyContent: "flex-start",
  },
  nameText: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  infoLabel: {
    fontFamily: "Nunito Sans",
    fontWeight: "500",
    fontSize: 14,
  },
  cardInfo: {
    marginTop: 10,
  },
  cardSeries: {
    fontSize: 12,
    position: "absolute",
    top: 20,
    right: 20,
  },
});
