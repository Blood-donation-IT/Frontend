import React, { useEffect, useState } from "react"; 
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal, 
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "../../../components/CustomHeader";

const DonationHistoryScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, donations, fetchUserDonations } = useAuthStore();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();

  
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchUserDonations();
  }, []);

  // const mockHistoryData = [
  //   donations[0],
  //   {
  //     application_day: "2026-02-14",
  //     application_id: "7453810883081281536",
  //     application_time: "H%:00",
  //     blood_type: "O+",
  //     created_at: "2026-04-25T07:59:01.325642",
  //     location_id: "Saint Panteleimon Hospital",
  //     slot_index: 4,
  //     status: "Successfully",
  //     updated_at: null,
  //     amount: "450 ml",
  //   }
    
        
  //       // { id: 2, type: "Whole blood", date: "August 25, 2025", hospital: "Saint Panteleimon Hospital", status: "Successfully", amount: "450", unit: "ml" },
  //       // { id: 3, type: "Whole blood", date: "August 25, 2025", hospital: "Saint Panteleimon Hospital", status: "Successfully", amount: "450", unit: "ml" },
  //       // { id: 4, type: "Whole blood", date: "August 25, 2025", hospital: "Saint Panteleimon Hospital", status: "Successfully", amount: "450", unit: "ml" },
  //       // { id: 5, type: "Whole blood", date: "August 25, 2025", hospital: "Saint Panteleimon Hospital", status: "Canceled", amount: "450", unit: "ml" },
  //       // { id: 6, type: "Whole blood", date: "August 25, 2025", hospital: "Saint Panteleimon Hospital", status: "Successfully", amount: "450", unit: "ml" }
  // ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Successfully":
        return { bg: "#daffddff", text: "#19311aff" }; 
      case "Canceled":
        return { bg: "#fde3e8ff", text: "#9a1515ff" };
      case "Pending":
      default:
        return { bg: "#fdedd4ff", text: "#8b5400ff" }; 
    }
  };

  const date = new Date("2026-04-14");

  const formattedDate = new Intl.DateTimeFormat(i18n.language === 'uk' ? 'uk-UA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);

  
  const handleDonationPress = (item) => {
    if (item.status === "Canceled") {
      setModalVisible(true);
    } else {
      navigation.navigate("DetailedInformation", { donationData: item });
    }
  };

  return (
  <>
    <CustomHeader title={t("donation_history")} navigation={navigation} />
    
    <View style={[styles.mainContainer, { backgroundColor: colors.backgroundMain }]}>
      {/* <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../images/arrow-left.png")}
            style={styles.backImg}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("donation_history") || "Donation history"}</Text>
        <View style={{ width: 24 }} />
      </View> */}
      


      <ScrollView 
        contentContainerStyle={[styles.scrollContent,{paddingTop:50}]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topStatsRow}>
          <View style={[styles.topStatBadge, { backgroundColor: "#fde3e8ff" }]}>
            <Text style={[styles.topStatLabel, { color: "#f06060ff" }]}>{t("donated") || "Donated"}</Text>
            <Text style={[styles.topStatValue, { color: "#f06060ff" }]}>01</Text>
          </View>

          <View style={[styles.topStatBadge, { backgroundColor: "#daffddff" }]}>
            <Text style={[styles.topStatLabel, { color: "#2f5e31ff" }]}>{t("delivered") || "Delivered"}</Text>
            <Text style={[styles.topStatValue, { color: "#2f5e31ff" }]}>450 ml</Text>
          </View>

          <View style={[styles.topStatBadge, { backgroundColor: "#E3F2FD" }]}>
            <Text style={[styles.topStatLabel, { color: "#1d7bc8ff" }]}>{t("life_saved") || "Life Saved"}</Text>
            <Text style={[styles.topStatValue, { color: "#1d7bc8ff" }]}>02</Text>
          </View>
        </View>

        
          <View >
            <View style={styles.yearDividerContainer}>
              <View style={styles.yearLine} />
              <Text style={[styles.yearText,{color:colors.text}]}>{"2026"}</Text>
              <View style={styles.yearLine} />
            </View>
            
            {donations.map((item, index) => {
              const statusStyle = getStatusStyle(item.status);
              
              return (
                <TouchableOpacity 
                  key={item.application_id || index} 
                  style={[styles.donationItem,{backgroundColor:colors.backgroundCard2}]}
                  
                  onPress={() => handleDonationPress(item)}
                >
                  <Text style={{ fontSize: 24, marginRight: 15 }}>🩸</Text>
                  
                  <View style={styles.donationInfo}>
                    <Text style={[styles.donationType,{color:colors.text}]}>{t("whole_blood")}</Text>{/*item.type   */}
                    <Text style={styles.donationDate}>{item.application_day}</Text>{/*date*/}
                    <Text style={styles.hospitalText}>• {item.location_id}</Text>{/*hospital*/}
                  </View>

                  <View style={styles.donationResult}>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                      <Text style={[styles.donationStatus, { color: statusStyle.text }]}>
                        {t(`status_${item.status}`)}
                      </Text>
                    </View>
                    <Text style={styles.volumeText}>{item?.status == "pending" ? null : "450 ml"}</Text> {/*{} {item.unit}*/}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        

        <View style={[styles.nextDonationCard,{backgroundColor:colors.backgroundCard2}]}>
          <Text style={styles.nextDonationTitle}>{t("next_donation") || "Next donation"}</Text>
          <Text style={[styles.nextDonationText,{color:colors.text}]}>
            {t("next_donation_desc") || "You can donate blood no earlier than 60 days after your last donation."}
          </Text>
          <Text style={styles.nextDonationDate}>
            {t("available_from") || "Available from:"} <Text style={{fontWeight: 'bold'}}>{formattedDate}</Text>
          </Text>
        </View>

        <View style={styles.bottomSpacer} />

      </ScrollView>

      
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)} 
        >
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Text style={styles.modalIcon}>ℹ️</Text>
            </View>
            <Text style={styles.modalTitle}>
              {t("info_unavailable") || "Information Unavailable"}
            </Text>
            <Text style={styles.modalText}>
              {t("canceled_donation_msg") || "Detailed information is not available because this donation was canceled."}
            </Text>
            
            <TouchableOpacity 
              style={[styles.modalButton, { backgroundColor: colors.primary || "#F86E6E" }]} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>{t("ok") || "Got it"}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
    </>
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
  topStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  topStatBadge: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  topStatLabel: {
    fontSize: 12,
    fontWeight: "200",
    marginBottom: 4,
  },
  topStatValue: {
    fontSize: 17,
    fontWeight: "bold",
  },
  yearDividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },
  yearLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#d5d4d4ff",
  },
  yearText: {
    marginHorizontal: 15,
    fontSize: 18,
    color: "#000000",
    fontWeight: "300",
  },
  donationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ecececff",
    backgroundColor: "#FFFFFF",
  },
  donationInfo: {
    flex: 1,
  },
  donationType: {
    fontSize: 15,
    color: "#000000",
    marginBottom: 4,
  },
  donationDate: {
    fontSize: 12,
    color: "#888888",
    marginBottom: 2,
  },
  hospitalText: {
    fontSize: 12,
    color: "#888888",
  },
  donationResult: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8, 
    marginBottom: 6,
  },
  donationStatus: {
    fontSize: 11,
    fontWeight: "100",
  },
  volumeText: {
    fontSize: 12,
    color: "#888888",
  },
  nextDonationCard: {
    marginTop: 15,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFD1D1", 
    backgroundColor: "#FFF5F5", 
  },
  nextDonationTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#F86E6E",
    marginBottom: 6,
  },
  nextDonationText: {
    fontSize: 12,
    color: "#000000",
    lineHeight: 18,
    marginBottom: 10,
  },
  nextDonationDate: {
    fontSize: 12,
    color: "#F86E6E",
  },
  bottomSpacer: {
    height: 40, 
  },

  
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 25,
    alignItems: "center",
    width: "90%",
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    elevation: 5, 
  },
  modalIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF5F5",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  modalIcon: {
    fontSize: 28,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 20,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DonationHistoryScreen;