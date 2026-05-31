import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { useAdminStore } from "../../../stores/useAdminStore";

const { width, height } = Dimensions.get("window");

const getCurrentDate = () => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

export default function AdminHomeScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { colors, isLight } = useTheme();
  const insets = useSafeAreaInsets();
  
  
  const { entries, updateEntryStatus } = useAdminStore();

  const swipeableRefs = useRef(new Map()).current;
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  const handleSwipeOpen = (id: string) => {
    if (openRowId && openRowId !== id) {
      const prevRef = swipeableRefs.get(openRowId);
      if (prevRef) prevRef.close();
    }
    setOpenRowId(id);
  };

  const handleSwipeClose = (id: string) => {
    if (openRowId === id) setOpenRowId(null);
  };

  const handleStatusChange = (id: string, newStatus: 'pending' | 'accepted' | 'declined') => {
    updateEntryStatus(id, newStatus);

    const ref = swipeableRefs.get(id);
    if (ref) ref.close();
  };

  const renderRightActions = (entry: any) => {
    const containerWidth = entry.status === "pending" ? 110 : 60;

    if (entry.status === "pending") {
      return (
        <View style={[styles.swipeActionsContainer, { width: containerWidth }]}>
          <TouchableOpacity 
            style={[styles.swipeBtn, styles.acceptBtn]}
            onPress={() => handleStatusChange(entry.id, "accepted")}
          >
            <Feather name="check" size={24} color="#4CAE4C" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.swipeBtn, styles.declineBtn]}
            onPress={() => handleStatusChange(entry.id, "declined")}
          >
            <Feather name="x" size={24} color="#E66A6A" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[styles.swipeActionsContainer, { width: containerWidth }]}>
          <TouchableOpacity 
            style={[styles.swipeBtn, styles.declineBtn]} 
            onPress={() => handleStatusChange(entry.id, "pending")}
          >
            <Feather name="x" size={24} color="#E66A6A" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundMain || "#FFFBFB" }]}>
      
      {/* фон */}
      <View style={styles.backgroundLayer}>
        <View style={[styles.blob, styles.blob1]} />
        <View style={[styles.blob, styles.blob2]} />
        <View style={[styles.blob, styles.blob3]} />
        <View style={[styles.blob, styles.blob4]} />
      </View>

      <View style={[styles.topContainer, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerRow}>
          <Image 
            source={
              isLight
              ? require("../../../images/logo.png") 
              : require("../../../images/logo-white.png")
            }
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")} style={styles.bellBtn}>
            <Feather name="bell" size={24} color="#ff4d4d" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          {Platform.OS === 'web' ? (
            <Text style={[styles.pageTitle, {
              backgroundImage: 'linear-gradient(90deg, #000000 0%, #e35959ff 35%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            } as any]}>
              {t("donation_entries") || "Donation Entries"}
            </Text>
          ) : (
            <Text style={[styles.pageTitle, { color: "#E66A6A" }]}>
              {t("donation_entries") || "Donation Entries"}
            </Text>
          )}
          
          <Text style={[styles.dateText, { color: "#888" }]}>
            {getCurrentDate()}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statBlock, styles.statRed]}>
          <Text style={styles.statLabelLight}>{t("today") || "Today"}</Text>
          <Text style={styles.statNumberLight}>{entries.length}</Text>
          <Text style={styles.statSubLabelLight}>{t("registered") || "Registered"}</Text>
        </View>
        
        <View style={styles.statsRow}>
          <View style={[styles.statBlock, styles.statGreen, { flex: 1, marginRight: 10 }]}>
            <Text style={[styles.statLabelDark, { color: "#4CAE4C" }]}>{t("now") || "Now"}</Text>
            <Text style={[styles.statNumberDark, { color: "#4CAE4C" }]}>5</Text>
            <Text style={[styles.statSubLabelDark, { color: "#4CAE4C" }]}>{t("waiting") || "Waiting"}</Text>
          </View>

          <View style={[styles.statBlock, styles.statYellow, { flex: 1, marginLeft: 10 }]}>
            <Text style={[styles.statLabelDark, { color: "#D98A3A" }]}>{t("in_the_room") || "In the Room"}</Text>
            <Text style={[styles.statNumberDark, { color: "#D98A3A" }]}>4</Text>
            <Text style={[styles.statSubLabelDark, { color: "#D98A3A" }]}>{t("donating") || "Donating"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      
      <View style={styles.listHeader}>
          <Text style={[styles.listTitle, { color: colors.text }]}>
            {t("list_of_registered") || "List of registered"}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("RegisteredTab")}>
            <Text style={styles.seeAllText}>All {entries.length} →</Text>
          </TouchableOpacity>
        </View>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {entries.map((entry) => {
            const isAccepted = entry.status === "accepted";
            const isDeclined = entry.status === "declined";
            const isUnknown = entry.bloodType === "Don't know";

            const nameParts = entry.name.split(" ");
            const patronymic = nameParts.pop();
            const mainName = nameParts.join(" ");

            let cardBg = isLight ? "#FFFFFF" : "#1A1A1A";
            let badgeBg = isUnknown ? styles.badgeUnknownBg : styles.badgeKnownBg;
            let badgeTextColor = isUnknown ? styles.badgeUnknownText : styles.badgeKnownText;

            if (isAccepted) {
              cardBg = isLight ? "#dfdcdcff" : "#2A2A2A"; 
              badgeBg = { backgroundColor: "#f6f3f3ff" };
              badgeTextColor = { color: "#9F9F9F" };
            } else if (isDeclined) {
              cardBg = isLight ? "#f8cacaff" : "#4A1A1A"; 
              badgeBg = { backgroundColor: "#f6f3f3ff" };
              badgeTextColor = { color: "#9F9F9F" };
            }

            return (
              <Swipeable 
                key={`${entry.id}-${entry.status}`} 
                ref={(ref) => {
                  if (ref) swipeableRefs.set(entry.id, ref);
                  else swipeableRefs.delete(entry.id);
                }}
                renderRightActions={() => renderRightActions(entry)}
                onSwipeableWillOpen={() => handleSwipeOpen(entry.id)}
                onSwipeableWillClose={() => handleSwipeClose(entry.id)}
                friction={2}
                overshootRight={false}
              > 
                <View style={[styles.card, { backgroundColor: cardBg }]}>
                  <View style={styles.cardLeft}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{entry.initials}</Text>
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={[styles.donorNameMain, { color: colors.text }]} numberOfLines={1}>
                        {mainName}
                      </Text>
                      <Text style={[styles.donorNameSub, { color: colors.text }]} numberOfLines={1}>
                        {patronymic}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardRight}>
                    <Text style={styles.timeText}>{entry.time}</Text>
                    <View style={[styles.bloodBadgeContainer, badgeBg]}>
                      <Text style={[styles.bloodBadgeText, badgeTextColor]}>
                        {entry.bloodType}
                      </Text>
                    </View>
                  </View>
                </View>
              </Swipeable>
            );
          })}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  backgroundLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    overflow: "hidden",
    
    backgroundColor: "#FFFBFB",
  },
  blob: {
    position: "absolute",
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: "#ff8c8c", 
    opacity: 0.35, 

    // CSS-блюр для веб-версії
    ...(Platform.OS === 'web' ? {
      filter: 'blur(70px)',
    } : {
      // IOS/Android
      shadowColor: "#ff4d4d",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 50,
    }),
  },
  blob1: { top: -30, left: -150 },
  blob2: { top: 200, right: -90 },
  blob3: { bottom: 240, left: -200 },
  blob4: { bottom: 0, right: -20 },
  topContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    width: 50,
    height: 30,
  },
  bellBtn: {
    padding: 5,
  },
  titleSection: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  statBlock: {
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
  },
  statRed: {
    backgroundColor: "#E66A6A",
    alignItems: "flex-start",
  },
  statGreen: {
    backgroundColor: "#EAF7E8",
  },
  statYellow: {
    backgroundColor: "#FFF3E0",
  },
  statLabelLight: {
    color: "#FFFFFF",
    fontSize: 16,
    opacity: 0.9,
  },
  statNumberLight: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 5,
  },
  statSubLabelLight: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.9,
  },
  statLabelDark: {
    fontSize: 14,
    fontWeight: "600",
  },
  statNumberDark: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 5,
  },
  statSubLabelDark: {
    fontSize: 12,
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 77, 77, 0.2)",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#E66A6A",
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    gap: 7,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#EDF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#406DE8",
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 18,
  },
  cardInfo: {
    flex: 1,
  },
  donorNameMain: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 2,
  },
  donorNameSub: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 15,
  },
  cardRight: {
    alignItems: "flex-end",
    minWidth: 80,
  },
  timeText: {
    fontFamily: "Inter",
    color: "#9F9F9F",
    fontSize: 12,
    marginBottom: 8,
  },
  bloodBadgeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeKnownBg: { backgroundColor: "#EAF7E8" },
  badgeUnknownBg: { backgroundColor: "#FFF0F0" },
  bloodBadgeText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "bold",
  },
  badgeKnownText: { color: "#50A53B" },
  badgeUnknownText: { color: "#ff4d4d" },
  swipeActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    gap: 8,
  },
  swipeBtn: {
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
  },
  acceptBtn: {
    borderColor: "#4CAE4C",
    backgroundColor: "#F0FFF0",
  },
  declineBtn: {
    borderColor: "#E66A6A",
    backgroundColor: "#FFF0F0",
  },
  bottomSpacer: {
    height: 120, 
  },
});