import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../Theme/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { useAdminStore } from "../../../stores/useAdminStore";

const { width, height } = Dimensions.get("window");

export default function AdminRegisteredScreen({ navigation }: any) {
  const { t } = useTranslation();
  const { colors, isLight } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [searchQuery, setSearchQuery] = useState("");

  
  const { entries, updateEntryStatus } = useAdminStore();

 
  const filteredUsers = entries.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
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

      <View style={[styles.topContainer, { paddingTop: insets.top + 10 }]}>
        
        
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

        
        <View style={styles.searchContainer}>
          <View style={[styles.searchInputWrapper, { backgroundColor: isLight ? "#FFFFFF" : "#1A1A1A" }]}>
            <Feather name="search" size={20} color="#ff4d4d" style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder={t("search") || "Search"}
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                <Feather name="x" size={20} color="#ff4d4d" />
              </TouchableOpacity>
            )}
          </View>
        </View>

      </View>

      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listContainer}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isAccepted = user.status === "accepted";
              const isDeclined = user.status === "declined";
              const isUnknown = user.bloodType === "Don't know";

              
              const nameParts = user.name.split(" ");
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
                  key={`${user.id}-${user.status}`} 
                  ref={(ref) => {
                    if (ref) swipeableRefs.set(user.id, ref);
                    else swipeableRefs.delete(user.id);
                  }}
                  renderRightActions={() => renderRightActions(user)}
                  onSwipeableWillOpen={() => handleSwipeOpen(user.id)}
                  onSwipeableWillClose={() => handleSwipeClose(user.id)}
                  friction={2}
                  overshootRight={false}
                >
                  <View style={[styles.card, { backgroundColor: cardBg }]}>
                    <View style={styles.cardLeft}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{user.initials}</Text>
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
                      <Text style={styles.timeText}>{user.time}</Text>
                      
                      <View style={[styles.bloodBadgeContainer, badgeBg]}>
                        <Text style={[styles.bloodBadgeText, badgeTextColor]}>
                          {user.bloodType}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Swipeable>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={{ color: "#888" }}>No users found matching "{searchQuery}"</Text>
            </View>
          )}
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
    zIndex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 30,
  },
  bellBtn: {
    padding: 5,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1.5,
    borderColor: "rgba(255, 77, 77, 0.4)", 
    shadowColor: "#ff4d4d",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  clearButton: {
    padding: 5,
  },
  
  scrollContent: {
    paddingHorizontal: 20,
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
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#9F9F9F",
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
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
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

  emptyState: {
    padding: 20,
    alignItems: "center",
  },
  bottomSpacer: {
    height: 120, 
  },
});