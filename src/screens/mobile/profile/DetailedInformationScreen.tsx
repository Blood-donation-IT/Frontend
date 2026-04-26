import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Application } from "../../../interfaces/application";

const DetailedInformationScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const { donationData } = (route?.params || {}) as { donationData?: Application };
 
  const DetailRow = ({ label, value, valueColor, isLast }) => (
    <View style={[styles.detailRow, !isLast && styles.rowBorder]}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, { color: valueColor || "#000000" }]}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={[styles.mainContainer, { backgroundColor: "#f9f9f9ff" }]}>
      
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../images/arrow-left.png")}
            style={styles.backImg}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("detailed_information") || "Detailed information"}</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        <View style={[styles.redCard, { backgroundColor: colors.primary || "#F86E6E" }]}>
          
          <View style={styles.dropIconContainer}>
            <Text style={styles.dropIcon}>🩸</Text>
          </View>

          <Text style={styles.cardTitle}>{"Whole Blood"}</Text>
          <Text style={styles.cardSubtitle}>
            {donationData?.application_day || "August 25, 2025"} • {donationData?.application_time}
          </Text>

          
          <View style={styles.pillsRow}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{donationData?.status == "Successfully" ? "450" : "  0  "}</Text>
                <Text style={styles.pillSubText}>ml</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{t(donationData?.blood_type)}</Text>
              <Text style={styles.pillSubText}>b type</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{donationData?.status == "pending" ? 0 : 2}</Text>
              <Text style={styles.pillSubText}>saved</Text>
            </View>
          </View>
        </View>

        
        <View style={styles.detailsContainer}>
          <DetailRow 
            label={t("date_and_time") || "Date and time"} 
            value={`${donationData?.application_day || "Aug 25, 2025"}\n ${donationData?.application_time}`} 
          />
          <DetailRow 
            label={t("place") || "Place"} 
            value={donationData?.location_id || "Saint Panteleimon Hospital"} 
          />
          <DetailRow 
            label={t("doctor") || "Doctor"} 
            value={donationData?.status == "pending" ? "-" : "Ivanenko O.V." }
          />
          <DetailRow 
            label={t("component") || "Component"} 
            value={donationData.type || "Whole blood"} 
            valueColor={colors.primary || "#F86E6E"} 
          />
          <DetailRow 
            label={t("volume") || "Volume"} 
            value={`${donationData?.status == "pending" ? "0 ml" : "450 ml" } `} //${donationData.unit || "ml"}
          />
          <DetailRow 
            label={t("well_being") || "Well-being"} 
            value={donationData?.status == "Successfully" ? "Okay ✓" : "-" }
            valueColor="#4CAF50" 
            isLast={true} 
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#f9f9f9ff",
  },
  backButton: {
    padding: 5,
  },
  backImg: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginTop: 40,
    tintColor: "#000000",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 40,
    paddingTop: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  
  redCard: {
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(248, 110, 110, 0.3)', 
  },
  dropIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  dropIcon: {
    fontSize: 30,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 20,
  },
  pillsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 7, 
    marginTop: -10,
  },
  pill: {
    backgroundColor: "rgba(255, 255, 255, 0.35)", 
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 18,
  },
  pillText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  
  detailsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ecececff",
    borderRightWidth: 2.5,
    borderRightColor: "#F86E6E",
    borderLeftColor: "#F86E6E",
    borderLeftWidth: 2.5,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0ff", 
  },
  detailLabel: {
    fontSize: 14,
    color: "#888888",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
  },
  pillSubText: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
    textAlign: "center",
    fontWeight: "300",
  },
});

export default DetailedInformationScreen;