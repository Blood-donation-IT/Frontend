import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../Theme/ThemeContext";
import { useTranslation } from "react-i18next";

const GetBookScreen = ({ activateCallback }: { activateCallback?: () => void }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation();

  // Стан донацій (0) та днів (3)
  const [donations, setDonations] = useState(0); 
  const daysLeft = 1; 
  
  const maxDonations = 5;
  
  const remainingDonations = maxDonations - donations;
  
  const isReady = donations >= maxDonations;

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundMain }]}>
      <View style={styles.topSection}>
        <Text style={[styles.title, { color: colors.text }]}>{t("donors_book")}</Text>
        
        
        {isReady && (
          <Text style={[styles.subtitle, { color: colors.text }]}>
            {t("n_days_left", { count: daysLeft })}
          </Text>
        )}

        <Text style={[styles.paragraph, { color: colors.text }]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </Text>

        
        <Text style={[styles.note, { color: colors.text }]}>
          {isReady 
            ? t("donations_success") // Якщо 5/5
            : t("to_get_your_donor_book", { count: remainingDonations }) 
          }
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          
          style={[
            styles.button, 
            { backgroundColor: isReady ? colors.primary : "#d3d3d3ff" }
          ]}
          onPress={() => {
            if (!isReady) {
              // Логіка кліків: додаємо донацію
              setDonations(d => Math.min(d + 1, maxDonations));
              return;
            }
            // Якщо готово — переходимо на екран книги
            navigation.navigate("BookScreen");
          }}
        >
          <Text style={[styles.buttonText, { color: colors.textCard || "#fff" }]}>
            {isReady 
              ? t("get_donors_book") 
              : `${t("make_a_donation")} (${donations}/${maxDonations})`
            }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  topSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#E66A6A", 
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  note: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 0,
    fontWeight: "500"
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default GetBookScreen;