import React, { useEffect } from "react";
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
import { useAuthStore } from "../../../stores/useAuthStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, donations, fetchUserDonations } = useAuthStore();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();

  // useEffect(() => {
  //   fetchUserDonations();
  // }, []);

  const lastDonationDate = user?.last_donation ? new Date(user.last_donation) : null;

  // const formattedDate = lastDonationDate && !isNaN(lastDonationDate)

  const date = new Date("2026-02-14");

  const formattedDate = new Intl.DateTimeFormat(i18n.language === 'uk' ? 'uk-UA' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
  // Тимчасові дані для візуалу
  // const mockHistoryData = [
  //   donations?donations[0]:null,
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
  //   }
  // ];

  /*
  // для реальних даних:
  const formattedDate = user?.last_donation
    ? new Intl.DateTimeFormat(i18n.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(lastDonationDate)
    : null;
      }).format(new Date(user.last_donation))
    : null;
  */

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

  return (
    <ScrollView
      style={{ backgroundColor: colors.backgroundMain }} 
      contentContainerStyle={{ paddingBottom: 40 }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: colors.primary || "#F86E6E", 
            paddingTop: insets.top + 20, 
          },
        ]}
      >
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image
            source={require("../../../images/menu.png")}
            style={[styles.menuImg, { tintColor: "#ffffffff" }]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        
        <View style={styles.profileInfo}>
          <Image
            source={{ uri: user?.avatar || "https://via.placeholder.com/150" }}
            style={styles.avatar} 
          />
          <Text style={[styles.name,{color:colors.text}]}>{user?.name || "Blue Jack"}</Text>
          
          {/* <Text style={styles.lastDonation}>
            {t("last_donation")}: August 25, 2025
          </Text>
          ДАТА : */}
          <Text style={[styles.lastDonation,{color:colors.text}]}>
            {t("last_donation")}: {formattedDate || "N/A"}
          </Text>
         

          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: colors.primary || "#F86E6E" }]}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editButtonText}>{t("edit_profile") || "Edit Profile"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statBox, { borderColor: "#FFD1D1" },{backgroundColor:colors.backgroundCard2}]}>
             <Text style={styles.statLabel}>{t("donated") || "Donated"}</Text>
             {/* <Text style={styles.statValue}>03</Text> */}
             <Text style={[styles.statValue,{color:colors.text}]}>{user?.donations_count < 10 && user?.donations_count > 0 ? `0${user?.donations_count}` : user?.donations_count || "0"}</Text>
          </View>
          <View style={[styles.statBox, { borderColor: "#FFD1D1" },{backgroundColor:colors.backgroundCard2}]}>
             <Text style={styles.statLabel}>{t("blood_type") || "Blood Type"}</Text>
             <Text style={[styles.statValue,{color:colors.text}]}>{user?.blood_type == "unknown" ? "N/A" : t(user?.blood_type) || "N/A"}</Text>
          </View>
          <View style={[styles.statBox, { borderColor: "#FFD1D1" },{backgroundColor:colors.backgroundCard2}]}>
             <Text style={styles.statLabel}>{t("life_saved") || "Life Saved"}</Text>
             {/* <Text style={styles.statValue}>02</Text> */}
             <Text style={[styles.statValue,{color:colors.text}]}>{user?.lives_saved_count < 10 && user?.lives_saved_count > 0 ? `0${user?.lives_saved_count}` : user?.lives_saved_count || "0"}</Text>
          </View>
        </View>

        <View style={[styles.statusCard, { borderColor: "#FFD1D1" },{backgroundColor:colors.backgroundCard2}]}>
          <Text style={styles.statusLabel}>{t("donor_status") || "Donor Status"}</Text>
          {/* <Text style={styles.statusValue}>Honorary Donor of Ukraine</Text> */}
          <Text style={[styles.statusValue,{color:colors.text}]}>{t("honorary_donor_of_ukraine")}</Text>{/* user?.donor_status ||  */}
        </View>

        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={[styles.historyTitle,{color:colors.text}]}>{t("donation_history") || "Donation history"}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("DonationHistory")}>
              <Text style={{ color: colors.primary || "#F86E6E", fontWeight: '600' }}>{t("view_all")} ➔</Text>
            </TouchableOpacity>
          </View>

          {/* фейковий візуал донацій */}
          {donations.map((item, index) => {
            // if (!item) return
            const statusStyle = getStatusStyle(item.status);
            
            return (
              <View key={item.application_id || index} style={[styles.donationItem,{backgroundColor:colors.backgroundCard2}]}>
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
                  <Text style={styles.volumeText}>{item.status == "pending" ? null : "450 ml"}</Text>{/* item.amount */}
                </View>
                 
              </View>
            );
          })}

          {/* для реальних даних юзати замість mockDonations
          {donations && donations.length > 0 ? (
            donations.map((item, index) => {
              const statusStyle = getStatusStyle(item.status);
              const donationDate = item.application_day 
                ? new Intl.DateTimeFormat(i18n.language, { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(item.application_day))
                : "Unknown Date";

              return (
                <View key={item.id || index} style={styles.donationItem}>
                  <Text style={{ fontSize: 24, marginRight: 15 }}>🩸</Text>
                  
                  <View style={styles.donationInfo}>
                    <Text style={styles.donationType}>{item.blood_type || "Whole blood"}</Text>
                    <Text style={styles.donationDate}>{donationDate}</Text>
                    <Text style={styles.hospitalText}>• {item.hospital || "Saint Panteleimon Hospital"}</Text>
                  </View>

                  <View style={styles.donationResult}>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                      <Text style={[styles.donationStatus, { color: statusStyle.text }]}>
                        {item.status}
                      </Text>
                    </View>
                    <Text style={styles.volumeText}>{item.amount || "450 ml"}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#888888" }}>
              {t("no_donations_yet")}
            </Text>
          )}
          */}

          <View style={[styles.bottomSpacer,{backgroundColor:colors.backgroundMain}]} />

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  headerContainer: {
    height: 220, 
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
  },
  menuBtn: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  menuImg: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

  contentContainer: {
    paddingHorizontal: 20,
  },
  
  profileInfo: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -95, 
    backgroundColor: "#d2d2d2ff",
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  lastDonation: {
    fontSize: 12,
    color: "#888888",
    marginBottom: 20,
  },
  editButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 5,
    marginHorizontal: 7,
    alignItems: "center",
    borderWidth: 1, 
    backgroundColor: "#FFFFFF",
  },
  statLabel: {
    fontSize: 13,
    color: "#F86E6E", 
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 3,
  },

  statusCard: {
    borderRadius: 16,
    padding: 10,
    borderWidth: 1, 
    backgroundColor: "#FFFFFF",
    marginBottom: 30,
  },
  statusLabel: {
    
    fontSize: 14,
    color: "#F86E6E",
    marginBottom: 5,
  },
  statusValue: {
    // fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
  },

  historySection: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000000",
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
    // fontWeight: "bold",
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

  bottomSpacer: {
    height: 85, 
    backgroundColor: "#f9f9f9ff", 
    borderRadius: 16,
    marginTop: 5,
  }
});

export default ProfileScreen;