import "intl-pluralrules";
import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { format, differenceInCalendarDays } from "date-fns";
import { uk, enUS } from "date-fns/locale";
import { useNotificationStore } from "../../../stores/useNotificationStore";
import { useTheme } from "../../../Theme/ThemeContext";

import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

import { NotificationType } from '../../../interfaces/notification';
import CustomHeader from "../../../components/CustomHeader";

const getNotificationMetadata = (type: NotificationType) => {
  switch (type) {
    case NotificationType.DONATION_REMINDER:
      return { 
        icon: <MaterialCommunityIcons name="clock-outline" size={24} color="#E04646" />, 
        color: '#E04646', 
        bgColor: '#FFEEEE',
        tagText: 'Reminder' 
      };
    case NotificationType.DONATION_UPDATE:
    case NotificationType.SYSTEM_MESSAGE:
      return { 
        icon: <AntDesign name="calendar" size={24} color="#4A90E2" />, 
        color: '#4A90E2', 
        bgColor: '#EEF6FF',
        tagText: 'Appointment' 
      };
    case NotificationType.ACCOUNT_UPDATE:
      return { 
        icon: <FontAwesome name="check-circle" size={24} color="#2DB46C" />, 
        color: '#2DB46C', 
        bgColor: '#E6FFF2',
        tagText: 'System' 
      };
    default:
      return { 
        icon: <MaterialCommunityIcons name="bell-outline" size={24} color="#777" />, 
        color: '#777', 
        bgColor: '#F0F0F0',
        tagText: 'Other' 
      };
  }
};

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language === "uk" ? uk : enUS;

  const { notifications, fetchNotifications, markAsRead, loading } = useNotificationStore();

  useEffect(() => {
    const loadAndMark = async () => {
      await fetchNotifications();
      const currentNotifications = useNotificationStore.getState().notifications;
      const unreadIds = currentNotifications
        .filter(n => !n.is_read)
        .map(n => n.notification_id);

      if (unreadIds.length > 0) {
        await markAsRead(unreadIds);
      }
    };
    loadAndMark();
  }, []);

  const groupedNotifications = useMemo(() => {
    if (!notifications.length) return {};

    const sorted = [...notifications].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const groups = {};
    sorted.forEach((item) => {
      const dateObj = new Date(item.created_at);
      const diff = differenceInCalendarDays(new Date(), dateObj);
      
      let title = "";
      if (diff === 0) title = 'TODAY';
      else if (diff === 1) title = 'YESTERDAY';
      else if (diff < 7) title = 'WEEK AGO';
      else title = 'OLDER';

      if (!groups[title]) groups[title] = [];
      groups[title].push(item);
    });
    return groups;
  }, [notifications]);

  const sectionTitles = Object.keys(groupedNotifications);

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundMain }]}>
      <StatusBar barStyle="dark-content" />
            
      <CustomHeader title={t("notifications")} navigation={navigation} />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchNotifications} tintColor="#E04646" />
        }
      >
        {notifications.length === 0 && !loading ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              {t("no_notifications_yet", "You have no notifications yet.")}
            </Text>
          </View>
        ) : (
          sectionTitles.map((sectionTitle) => (
            <View key={sectionTitle}>
              <Text style={styles.sectionTitle}>{sectionTitle}</Text>
              
              {groupedNotifications[sectionTitle].map((item) => {
                const dateObj = new Date(item.created_at);
                const timeStr = format(dateObj, "HH:mm", { locale: currentLocale });
                
                const metadata = getNotificationMetadata(item.type);

                return (
                  <TouchableOpacity 
                    key={item.notification_id} 
                    style={[
                        styles.card, 
                        item.is_read ? styles.readCard : styles.unreadCard
                    ]}
                    activeOpacity={0.7}
                  >
                    {!item.is_read && <View style={styles.unreadBadge} />}

                    <View style={[styles.iconContainer, { backgroundColor: metadata.bgColor }]}>
                      {metadata.icon}
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.message, { color: colors.text + '99' }]} numberOfLines={2}>
                        {item.message}
                      </Text>
                      
                      <View style={styles.bottomRow}>
                        <Text style={styles.time}>{timeStr}</Text>
                        
                        <View style={[styles.tag, { backgroundColor: metadata.bgColor }]}>
                          <Text style={[styles.tagText, { color: metadata.color }]}>
                            {metadata.tagText}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
  },
  placeholder: {
    width: 36,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#E04646", 
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    flexDirection: 'row',
    width: "100%",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  unreadCard: {
    shadowColor: "#FFCACA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  readCard: {
    backgroundColor: "#FDFDFD",
    opacity: 0.9,
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  unreadBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E04646',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 19,
    marginBottom: 2,
    paddingRight: 16,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -2,
  },
  time: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  tag: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "700",
  },
});

export default NotificationScreen;