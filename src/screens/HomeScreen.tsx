import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useTheme } from "../Theme/ThemeContext";
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { format, addMonths, startOfYear, endOfYear, eachDayOfInterval, isSameDay } from 'date-fns'; 
import { uk, enUS } from 'date-fns/locale';

type DonationItem = {
  id: string;
  date: string;
  time: string;
  vol: string;
  nurse: string;
  addr: string;
};

type ActionItem = {
  id: string;
  title: string;
  icon: any;
  onPress: () => void;
};

export default function HomeScreen({ navigation }) {
  const { colors, theme, isLight, isDark: contextIsDark } = useTheme();

  const { i18n } = useTranslation();
  
  const isDark = contextIsDark || theme === 'dark' || colors.text === '#FFFFFF' || colors.text === '#E0E0E0';
  const dateFnsLocale = i18n.language === 'uk' ? uk : enUS;


  const todayName = format(new Date(), 'EEEE', { locale: dateFnsLocale });
  const formattedDayBadge = `< ${todayName.toLowerCase()}`;

  const redDates = useMemo(() => {
    const dates = {};
    const today = new Date();
    const currentYear = today.getFullYear();
    
    for (let year = currentYear; year <= currentYear + 1; year++) {
      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let day = 3; day <= daysInMonth; day += 3) {
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          dates[dateString] = { 
            selected: true, 
            selectedColor: "#E53935" 
          };
        }
      }
    }
    return dates;
  }, []);

  const bloodData = [
    { type: "0+", status: "low" },
    { type: "A+", status: "high" },
    { type: "B+", status: "low" },
    { type: "AB+", status: "high" },
    { type: "0-", status: "low" },
    { type: "A-", status: "low" },
    { type: "B-", status: "high" },
    { type: "AB-", status: "low" },
  ];
const pad2 = (n: number) => String(n).padStart(2, "0");

const addMonths = (ymd: string, delta: number) => {
  const [y, m] = ymd.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-01`;
};

const monthTitle = (ymd: string) => {
  const { i18n } = useTranslation();
  const d = new Date(ymd);
  return d.toLocaleString(i18n.language, { month: "long", year: "numeric" });
};

  const [current, setCurrent] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  const marked = useMemo(() => {
    return {
      "2026-08-10": { selected: true, selectedColor: colors.brand },
      "2026-08-17": { selected: true, selectedColor: colors.brand },
      "2026-08-20": { selected: true, selectedColor: colors.brand },
      "2026-08-22": { selected: true, selectedColor: colors.brand },
      "2026-08-26": { selected: true, selectedColor: colors.brand },
      "2026-08-31": { selected: true, selectedColor: colors.brand },
    } as Record<string, any>;
  }, [colors.brand]);

  const onDayPress = (day: DateData) => {
    if (redDates[day.dateString]) {
      navigation.navigate("Registration", { day: day.dateString });
    }
  };

  const logoSource = isLight ? require("../images/logo-white.png") : require("../images/logo.png");

  const donations: DonationItem[] = [
    { id: "1", date: "05.01.26", time: "9:15", vol: "450ml", nurse: "Ivan Melko", addr: "Universytetska\nst." },
    { id: "2", date: "02.10.25", time: "12:35", vol: "150ml", nurse: "Ilon Mask", addr: "Universytetska\nst." },
    { id: "3", date: "10.08.25", time: "11:15", vol: "300ml", nurse: "Sara Pot", addr: "Universytetska\nst." },
    { id: "4", date: "20.06.25", time: "12:15", vol: "250ml", nurse: "Ron Wizli", addr: "Universytetska\nst." },
  ];

  const actions: ActionItem[] = [
    {
      id: "a1",
      title: "Find Donors",
      icon: require("../images/search.png"),
      onPress: () => navigation.navigate("FindDonors"),
    },
    {
      id: "a2",
      title: "Hospitals Nearby",
      icon: require("../images/location.png"),
      onPress: () => navigation.navigate("HospitalsNearby"),
    },
  ];

  const renderDonation: ListRenderItem<DonationItem> = ({ item, index }) => {
    const active = index === 0;
    const capColor = active ? "#EA6A6A" : "#F3AEAE";

    return (
      <View style={[styles.hCard, active && styles.hCardShadow]}>
        <View style={[styles.hCapTop, { backgroundColor: capColor }]}>
          <Text style={styles.hCapText}>{item.date}</Text>
        </View>

        <View style={styles.hMidWhite}>
          <Text style={styles.hMain}>
            {item.time} - {item.vol}
          </Text>
          <Text style={styles.hSub}>Nurse: {item.nurse}</Text>
        </View>

        <View style={[styles.hCapBottom, { backgroundColor: capColor }]}>
          <Text style={styles.hBottomText}>{item.addr}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.pageBg }]}>
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.pageBg }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Image source={logoSource} style={styles.logo} />
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}
            style={[styles.headerIconBtn, { backgroundColor: colors.card }]}
            activeOpacity={0.85}
          >
            <Image
              source={require("../images/notification.png")}
              style={[styles.headerIcon, { tintColor: colors.text }]}
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.hello, { color: colors.text }]}>
          Hello, <Text style={{ color: colors.brand, fontWeight: "800" }}>Anton</Text> 👋
        </Text>

        {/* Calendar */}
        <View style={[styles.calendarCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
          <View style={[styles.calendarHeader, { backgroundColor: colors.brand2 }]}>
            <TouchableOpacity onPress={() => setCurrent((c) => addMonths(c, -1))} style={styles.arrowHit}>
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.calendarHeaderText}>{monthTitle(current)}</Text>

            <TouchableOpacity onPress={() => setCurrent((c) => addMonths(c, 1))} style={styles.arrowHit}>
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>

          <Calendar
            key={`${colors.backgroundCard}-${i18n.language}-${current}`}
            monthFormat={"MMMM"}
            enableSwipeMonths={true}
            hideExtraDays={true}
            markedDates={redDates}
            firstDay={1} 
            style={{ backgroundColor: colors.calendarSurface }}
            hideArrows
            renderHeader={() => null}
            current={current}
            onDayPress={onDayPress}
            theme={{
              backgroundColor: colors.calendarSurface,
              calendarBackground: colors.calendarSurface,
              textSectionTitleColor: colors.calendarDow,
              dayTextColor: colors.dayText,
              todayTextColor: colors.brand,
              selectedDayBackgroundColor: colors.brand,
              selectedDayTextColor: "#FFFFFF",
              textDisabledColor: colors.disabledText,
              textDayFontSize: 14,
            }}
            dayComponent={({ date, state, marking }) => {
              if (!date) return <View style={styles.dayPill} />;

              const isDisabled = state === "disabled";
              const selected = !!marking?.selected;

              return (
                <TouchableOpacity
                  disabled={isDisabled}
                  onPress={() => navigation.navigate("Registration", { day: date.dateString })}
                  style={[
                    styles.dayPill,
                    {
                      backgroundColor: selected ? colors.brand : colors.pillBg,
                      opacity: isDisabled ? 0.35 : 1,
                    },
                  ]}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.dayText, { color: selected ? "#FFFFFF" : colors.dayText }]}>{date.day}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* History */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Your History of Donation</Text>
        <FlatList
          data={donations}
          keyExtractor={(it) => it.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.historyList}
          renderItem={renderDonation}
        />

        {/* Qcolorsck Actions */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          {actions.map((a) => (
            <TouchableOpacity
              key={a.id}
              onPress={a.onPress}
              style={[styles.actionCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
              activeOpacity={0.9}
            >
              <View style={[styles.actionIconWrap, { backgroundColor: colors.softCard }]}>
                <Image source={a.icon} style={styles.actionIcon} />
              </View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>{a.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Informatively */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 14 }]}>Informatively</Text>

        <View style={{ gap: 12, marginTop: 10 }}>
          {/* CARD 1 */}
          <View style={[styles.infoCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
            <View style={styles.infoRow}>
              <Image source={require("../images/info.png")} style={styles.infoDrop} />

              <View style={{ flex: 1 }}>
                <Text style={[styles.infoTitle, { color: colors.text }]}>Група крові A (II)</Text>

                <Text style={[styles.infoText, { color: colors.text }]}>
                  1. Може приймати кров від:{"\n"}групи A (сумісний), групи O (сумісний)
                </Text>

                <Text style={[styles.infoText, { color: colors.text, marginTop: 6 }]}>
                  2. Можна здавати кров на:{"\n"}групу A, групу AB
                </Text>
              </View>
            </View>

            <Text style={[styles.infoProgress, { color: colors.brand }]}>50 of 100%</Text>
          </View>

          {/* CARD 2 */}
          <View style={[styles.infoCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
            <Text style={[styles.infoTitleCenter, { color: colors.brand }]}>Що можна їсти перед донацією</Text>
            <Text style={[styles.infoSubtitle, { color: colors.subText }]}>Вуглеводи</Text>

            <Image source={require("../images/info2.png")} style={styles.infoFood} />

            <View style={styles.foodRow}>
              <Text style={[styles.foodText, { color: colors.text }]}>
                ПЕРЛОВА{"\n"}АМАРАНТ{"\n"}КУКУРУДЗЯНА
              </Text>

              <Text style={[styles.foodText, { color: colors.text }]}>
                БУЛГУР{"\n"}МАННА{"\n"}ПШОНЯНА
              </Text>
            </View>

            <Text style={[styles.foodBottom, { color: colors.text }]}>
              БУДЬ-ЯКІ ВИДИ ПАСТИ (ОКРІМ ЯЄЧНОЇ ЛОКШИНИ)
            </Text>
          </View>
        </View>

        <View style={{ height: 12 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  container: {
    paddingTop: 48,
    paddingHorizontal: "6%",
    paddingBottom: 180,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: { width: 36, height: 36, resizeMode: "contain" },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcon: { width: 20, height: 20, resizeMode: "contain" },

  hello: { fontSize: 28, fontWeight: "900", marginBottom: 12 },

  calendarCard: {
    borderRadius: 20,
    overflow: "hidden",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    marginBottom: 16,
  },
  calendarHeader: {
    height: 46,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  calendarHeaderText: { color: "#FFFFFF", fontWeight: "900", fontSize: 16 },
  arrowHit: { width: 36, height: 36, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  arrowText: { color: "#FFFFFF", fontSize: 26, marginTop: -2 },

  dayPill: {
    width: 38,
    height: 30,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  dayText: { 
    fontSize: 13, 
    fontWeight: "800" 
  },

  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "900",
    marginTop: 8 
    },

  historyList: { 
    paddingVertical: 10, 
    paddingLeft: 6 
  },

  hCard: {
    width: 170,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginRight: 16,
  },
  hCardShadow: {
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  hCapTop: {
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 18,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  hCapText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  hMidWhite: { backgroundColor: "#FFFFFF", paddingHorizontal: 18, paddingVertical: 14 },
  hMain: { color: "#111", fontSize: 18, fontWeight: "900", marginBottom: 4 },
  hSub: { color: "#111", fontSize: 13, fontStyle: "italic", fontWeight: "500" },
  hCapBottom: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  hBottomText: { color: "#fff", fontWeight: "800", fontSize: 15, textAlign: "center", lineHeight: 18 },

  actionsRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  actionCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 14,
    alignItems: "center",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  // ✅ ЗБІЛЬШЕНІ ІКОНКИ
  actionIconWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  actionIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  actionTitle: { fontSize: 13, fontWeight: "900" },

  // ✅ INFO cards
  infoCard: {
    borderRadius: 22,
    padding: 16,
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  infoRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  infoDrop: {
    width: 70,
    height: 90,
    resizeMode: "contain",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
  },
  infoProgress: {
    marginTop: 10,
    fontWeight: "800",
  },

  infoTitleCenter: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "900",
  },
  infoSubtitle: {
    textAlign: "center",
    fontSize: 13,
    marginBottom: 10,
  },
  infoFood: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    marginVertical: 10,
  },
  foodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodText: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 20,
  },
  foodBottom: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "700",
  },
});