import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { scheduleDateNotification } from "../../../services/localNotificationService";
import { useTheme } from "../../../Theme/ThemeContext";
import api from "../api/api";
import { useAuthStore } from "../../../stores/useAuthStore";
import CustomHeader from "../../../components/CustomHeader";
import { addDays, addMonths, format } from "date-fns";
import { da, uk } from "date-fns/locale";

import { Dimensions } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import AnimatedBar from "../../../components/AnimatedBar";

import { Calendar, DateData } from "react-native-calendars";
import i18n from "../../../i18n";

import UniversalMap from '../../../components/Map';

import { useWindowDimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTAINER_PADDING = 60; 
const GAP = 10; 
const ITEM_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING - (GAP * 3)) / 4;

export default function RegistrationScreen({ navigation, route }) {

  const { width } = useWindowDimensions();

  const { createDonationAction, user, donations, addDonation } = useAuthStore();

  const { t } = useTranslation();
  const [time, setTime] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'already_exists'>('success');
  const [isModalVisible, setModalVisible] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 49.8419,
    longitude: 24.0315,
  });
  const mapRef = useRef<MapView>(null);
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const day = route.params["day"];
  const times = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30" ];//,"13:00"
  const points = [
    { id: 1, nameUA: "Площа Ринок", title: t("main_square"), coords: { latitude: 49.8419, longitude: 24.0315 } },
    { id: 2, nameUA: "Оперний театр", title: t("opera_theater"), coords: { latitude: 49.8456, longitude: 24.0269 } },
    { id: 3, nameUA: "Університет", title: t("university"), coords: { latitude: 49.80439178581702 , longitude: 23.989689135563367 } },

  ];

  const locationForBackend = points.find(point => point.title === location)?.nameUA

  const { colors } = useTheme();

  const dates = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const date = addDays(new Date(), i);
      return {
        full: format(date, 'yyyy-MM-dd'),
        day: format(date, 'd'),
        month: format(date, 'MMM', { locale: uk }),
        weekday: format(date, 'EEEE', { locale: uk }),
      };
    });
  }, []);

  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const selectedIndex = times.indexOf(time);

  const [current, setCurrent] = useState<string>(route.params["day"] || format(new Date(), 'yyyy-MM-dd'));

  const mockDataByDate = {
    "2026-03-03": [20, 35, 30, 40, 33, 28, 48, 60, 40, 30 ],
    "2026-03-04": [40, 20, 60, 10, 25, 30, 15, 45, 10, 5 ],
    "2026-03-05": [10, 15, 20, 25, 80, 90, 70, 40, 20, 10],
    "2026-03-06": [50,5,15, 10, 40,55, 20, 25, 30, 35  ],
    "default": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };

  const extendedMockData = {
    "2026-03-05": {
      "University": {
        "8:00": [10, 20, 30, 40, 50, 60, 50, 40, 30, 20],
        "9:00": [5, 15, 25, 55, 15, 23, 32, 55, 45, 35],
      },
      "Opera Theater": {
        "8:00": [80, 70, 60, 50, 40, 30, 20, 10, 5, 2],
        "10:30": [20, 40, 60, 80, 100, 80, 60, 40, 20, 10],
      },
      "Main Square": {
        "12:00": [10, 56, 40, 30, 90, 90, 10, 10, 34, 12],
      }
    },
    "default": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };


  const registrationData = mockDataByDate[current] || mockDataByDate["default"];


  const handleDateSelect = (date) => {
    setCurrent(date.dateString);
  };

  const [viewDate, setViewDate] = useState(current);



  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getMockedAnalytics = async (date: string) => {
    await sleep(600);   
    setTime(null);
    
    const dayNumber = parseInt(date.split('-')[2]) || 1;

    const generatedData = Array.from({ length: 10 }).map((_, i) => {
      const val = (dayNumber + i * 3) % 6; 
      return val;
    });

    return {
      date: date,
      startHour: 8,
      intervalMinutes: 30,
      data: generatedData
    };
  };



  useEffect(() => {
    setSuggestions(points);
  }, []);

  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);


  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!location || !current) return;

      setLoading(true);
      try {
        const result = await getMockedAnalytics(current, "1"); 
        
        setApiData(result);
        
        const labels = result.data.map((_, i) => {
          const totalMinutes = result.startHour * 60 + i * result.intervalMinutes;
          const h = Math.floor(totalMinutes / 60);
          const m = totalMinutes % 60;
          return `${h}:${m === 0 ? '00' : m}`;
        });
        

      } catch (err) {
        console.error("Test Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [current, location]);



  const hourLabels = useMemo(() => {
    if (width < 425) {
      return ["8", "8:30", "9", "9:30", "10", "10:30", "11", "11:30", "12", "12:30"];//, "13"
    }

    // Логіка для API даних, якщо екран достатньо великий
    if (apiData) {
      const { startHour, intervalMinutes, data } = apiData;
      return data.map((_, i) => {
        const totalMins = startHour * 60 + i * intervalMinutes;
        const h = Math.floor(totalMins / 60);
        const m = totalMins % 60;
        return `${h}:${m === 0 ? '00' : m}`;
      });
    }

    return ["8", "8:30", "9", "9:30", "10", "10:30", "11", "11:30", "12", "12:30"];//, "13"
  }, [apiData, width]);

  const MAX_CHART_VALUE = 5;

  const dataForChart = useMemo(() => {
    if (apiData) return apiData.data;

    const dateData = extendedMockData[current];
    if (!dateData) return extendedMockData.default;
    const locationData = dateData[location];
    if (!locationData) return extendedMockData.default;
    return locationData[time] || extendedMockData.default;
  }, [current, location, time, apiData]);

  const isPastSlot = (slotTime: string) => {
    if (current !== todayStr) return false;
    const now = new Date();
    const [slotHour, slotMinute] = slotTime.split(":").map(Number);
    const slotDate = new Date(now);
    slotDate.setHours(slotHour, slotMinute, 0, 0);
    return slotDate <= now;
  };

  const isSlotFull = (index: number) => {
    const slotValue = dataForChart[index];
    return typeof slotValue === 'number' && slotValue >= MAX_CHART_VALUE;
  };

  const isSlotDisabled = (slotTime: string, index: number) => {
    return isSlotFull(index) || isPastSlot(slotTime);
  };

  const totalRegistered = dataForChart[selectedIndex]//registrationData.reduce((acc, val) => acc + val, 0);




  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!time) {
      newErrors.time = t("please_select_time");
    } else {
      const idx = times.indexOf(time);
      if (idx !== -1 && isSlotDisabled(time, idx)) {
        newErrors.time = t("please_select_time");
      }
    }
    if (!location.trim()) newErrors.location = t("location_required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleRegister = async () => {
    if (validate()) {
      try {
        if (donations.some(item => item.status === "pending")) {
          setAlertType('already_exists');
          setAlertVisible(true);
          return;
        }

        const triggerDate = buildDateFromDayAndTime(current, time);
        
        // const applicationData = {
        //   // user_id: user?.id, 
        //   blood_type: user?.blood_type,//"A+",
        //   slot_index: selectedIndex,
        //   application_time: triggerDate.toISOString(),
        //   application_day:   triggerDate.toISOString(),//"2026-04-23T12:49:08.442Z",
        //   location_id: locationForBackend,
        //   status: "pending"
        // };
        // console.log(applicationData)

        // await createDonationAction(applicationData);

        const newDonation = {
           application_day:  current,//"2026-04-28",
            application_id: "7453810883081281536",
            application_time: time,
            blood_type: user?.blood_type,
            created_at: "2026-04-25T07:59:01.325642",
            location_id: locationForBackend,
            slot_index: 4,
            status: "pending",
            updated_at: null,
        };
        addDonation(newDonation);

        // await scheduleDateNotification(
        //   "Запис на донацію",
        //   `Чекаємо на вас о ${triggerDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        //   triggerDate
        // );

        setAlertType('success');
        setAlertVisible(true);
      } catch (e) {
        console.log(e)
        setAlertType('error');
        setAlertVisible(true);
      }
    }
  };


  function buildDateFromDayAndTime(day: string, time: string): Date {
    const [year, month, dayOfMonth] = day.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    const date = new Date();
    date.setFullYear(year, month - 1, dayOfMonth);
    date.setHours(hours, minutes, 0, 0);

    return date;
  }



  const handleSelectPoint = (point) => {
    setSelectedLocation(point.coords);
    setLocation(point.title);
    setSuggestions([]);

   mapRef.current.animateToRegion({
    latitude: point.coords.latitude,
    longitude: point.coords.longitude
  });
    
  };

  const pad2 = (n: number) => String(n).padStart(2, "0");

  const addMonths = (ymd, delta) => {
    const [y, m, d] = ymd.split("-").map(Number);
    const date = new Date(y, m - 1 + delta, 1); // Тут можна сміливо ставити 1 число
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(d)}`;
  };
  
  const monthTitle = (ymd: string) => {
    const { i18n } = useTranslation();
    const d = new Date(ymd);
    return d.toLocaleString(i18n.language, { month: "long", year: "numeric" });
  };

  const onDayPress = (day: DateData) => {
    console.log(day)
    handleDateSelect(day)
    // if (redDates[day.dateString]) {
    //   navigation.navigate("Registration", { day: day.dateString });
    // }
  };

  useEffect(() => {
    const index = dates.findIndex(d => d.full === current);
    
    if (index !== -1 && flatListRef.current) {
      timeFlatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [current, dates]); 


  const flatListRef = useRef(null);


  const timeFlatListRef = useRef<FlatList>(null);

  const scrollOffset = useRef(0); // Створюємо реф для збереження поточної позиції

  const scroll = (direction: 'left' | 'right') => {
    const step = 150; // На скільки пікселів прокручувати за один клік
    const newOffset = direction === 'left' 
      ? Math.max(0, scrollOffset.current - step) 
      : scrollOffset.current + step;

    timeFlatListRef.current?.scrollToOffset({
      offset: newOffset,
      animated: true,
    });
    
    scrollOffset.current = newOffset; // Оновлюємо поточне значення
  };

  return (
    <>
      <CustomHeader title={t("registration_title")} navigation={navigation} />

        <KeyboardAwareScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: colors.backgroundMain },
          ]}
          extraScrollHeight={20}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
        >

          <TouchableOpacity
            style={[
              styles.input,
              { backgroundColor: colors.backgroundCard },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: location ? colors.text : "#E66A6A80" }}>
              {location || t("location")}
            </Text>
            <Ionicons name="location-outline" size={20} color="#E53935" style={styles.icon} />
          </TouchableOpacity>
          {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

      {/*  */}
      {/* Calendar */}
        <View style={[styles.calendarCard, { backgroundColor: colors.card,  }]}>{/* shadowColor: colors.shadow */}
          <View style={[styles.calendarHeader, { backgroundColor: colors.brand2 }]}>
            <TouchableOpacity 
              onPress={() => setViewDate(prev => addMonths(prev, -1))} 
              style={styles.arrowHit}
            >
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.calendarHeaderText}>{monthTitle(viewDate)}</Text>

            <TouchableOpacity 
              onPress={() => setViewDate(prev => addMonths(prev, 1))} 
              style={styles.arrowHit}
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>

          <Calendar
            // key={`${colors.backgroundCard}-${i18n.language}-${current}`}
            key={`calendar-${viewDate}-${colors.backgroundCard}`}
            monthFormat={"MMMM"}
            
            enableSwipeMonths={true}
            hideExtraDays={true}
            markedDates={{
              [current]: { selected: true }
            }}
            firstDay={1} 
            style={{ backgroundColor: colors.calendarSurface }}
            hideArrows
            renderHeader={() => null}
            current={viewDate}
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
              // if (!date) return <View style={styles.dayPill} />;

              // const dayOfWeek = new Date(date.dateString).getDay();
              // const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

              // const isDisabled = state === "disabled" || isWeekend;
              // const isSelected = date?.dateString == current

              if (!date) return <View style={styles.dayPill} />;

              // 1. Отримуємо сьогоднішню дату в форматі YYYY-MM-DD
              const todayString = new Date().toISOString().split('T')[0];

              // 2. Перевіряємо день тижня (вихідні)
              const dayOfWeek = new Date(date.dateString).getDay();
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

              // 3. ПЕРЕВІРКА НА МИНУЛИЙ ДЕНЬ: якщо дата менша за сьогоднішню
              const isPastDay = date.dateString < todayString;

              // 4. Комбінуємо всі правила відключення дня
              const isDisabled = state === "disabled" || isWeekend || isPastDay;
              const isSelected = date?.dateString === current;

              return (
                <TouchableOpacity
                  disabled={isDisabled}
                  
                  onPress={() => onDayPress(date)}
                  style={[
                    styles.dayPill,
                    {
                      backgroundColor: isSelected ? colors.brand : colors.pillBg,
                      opacity: isDisabled ? 0.35 : 1,

                      shadowColor:  "#FF7A8480",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.5,
                      shadowRadius: 6,
                      elevation: 8,
                    },
                  ]}
                  activeOpacity={0.85}
                >
              <Text style={[styles.dayText, { color: isSelected ? "#FFFFFF" : colors.dayText }]}>{date.day}</Text>
            </TouchableOpacity>
            );
            }}
          />
        </View>
      {/*  */}
      
      {/* <View style={{ paddingVertical: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5 ,backgroundColor: colors.backgroundMain}}>
        <TouchableOpacity onPress={() => {handlePrevDay()}}>
          <ChevronLeft size={20} color={colors.primary} />
        </TouchableOpacity>

        <FlatList
          horizontal
          ref={flatListRef}
          data={dates}
          keyExtractor={(item) => item.full}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: GAP, paddingHorizontal: 5 }}
          renderItem={({ item }) => {
            const isToday = item.full === todayStr;
            const isSelected = item.full === current;
            return (
              <TouchableOpacity
                onPress={() => {
                  handleDateSelect(item.full)
                  // setCurrent(item.full);
                  // setTime(null);
                }}
                style={[
                  styles.dateCard,
                  { width: ITEM_WIDTH },
                  // Якщо сьогодні — додаємо пунктир
                  isToday && { 
                    borderStyle: 'dashed', 
                    borderWidth: 2, 
                    borderColor: '#f07676' 
                  },
                  // Якщо вибрано — зафарбовуємо повністю (це перекриє пунктир візуально)
                  isSelected && { 
                    backgroundColor: '#f07676', 
                    borderStyle: 'solid', 
                    borderColor: '#f07676' 
                  }
                ]}
              >
                <Text style={[styles.dateText2, isSelected && { color: '#fff' }]}>
                  {item.day} {item.month}
                </Text>
                <Text style={[styles.weekdayText, isSelected && { color: '#fff' }]}>
                  {item.weekday}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <TouchableOpacity onPress={() => {handleNextDay()}}>
          <ChevronRight size={20} color={colors.primary} />
        </TouchableOpacity>
      </View> */}

      {/* <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.backgroundMain },
        ]}
        extraScrollHeight={20}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      > */}

        

        <Text style={styles.sectionTitle}>{t("time")}</Text>
        <View style={styles.sectionContainer}>
  {/* <Text style={styles.sectionTitle}>{t("time")}</Text> */}
  
  <View style={styles.rowWithArrows}>
    {/* Ліва стрілка */}
    <TouchableOpacity 
      onPress={() => scroll('left')} 
      style={styles.arrowButton}
    >
      <Text style={{ color: colors.text, fontSize:24 }}>{"‹"}</Text>
    </TouchableOpacity>

    <FlatList 
      ref={timeFlatListRef}
      data={times}
      onScroll={(e) => {
        scrollOffset.current = e.nativeEvent.contentOffset.x;
      }}
      scrollEventThrottle={16}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      contentContainerStyle={{ gap: 10, paddingHorizontal: 10, }}
      renderItem={({ item, index }) => {
        const isSelected = time === item;
        const disabledSlot = isSlotDisabled(item, index);
        return (
          <TouchableOpacity
            style={[
              styles.option,
              isSelected && styles.optionSelected,
              disabledSlot && styles.optionDisabled,
              errors.time && !time ? styles.optionError : null,
            ]}
            activeOpacity={disabledSlot ? 1 : 0.7}
            disabled={disabledSlot}
            onPress={() => {
              if (disabledSlot) return;
              setTime(item);
              setErrors({ ...errors, time: "" });
            }}
          >
            <Text style={{ color: isSelected ? "#fff" : disabledSlot ? "#999" : colors.text }}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />

    {/* Права стрілка */}
    <TouchableOpacity 
      onPress={() => scroll('right')} 
      style={styles.arrowButton}
    >
      <Text style={{ color: colors.text, fontSize:24 }}>{"›"}</Text>
    </TouchableOpacity>
  </View>
</View>
          {/* <View style={styles.optionsRow}>
            <FlatList 
              data={times}
              horizontal // Вмикаємо горизонтальний скрол
              showsHorizontalScrollIndicator={false} // Прибираємо смугу прокрутки
              keyExtractor={(item) => item}
              contentContainerStyle={{ alignSelf:"center",paddingRight: "38.5%", gap: "2.6%" }} // Відступи між елементами
              renderItem={({ item }) => {
                const isSelected = time === item;
                return (
                  <TouchableOpacity
                    style={[
                          styles.option,
                          time === item && styles.optionSelected,
                          errors.time && !time ? styles.optionError : null,
                        ]}
                    onPress={() => {
                      setTime(item);
                      setErrors({ ...errors, time: "" });
                    }}
                  >
                    <Text
                      style={{ color: time === item ? "#fff" : colors.text }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View> */}





          {/* {times.map((timen) => (
            <TouchableOpacity
              key={timen}
              style={[
                styles.option,
                time === timen && styles.optionSelected,
                errors.time && !time ? styles.optionError : null,
              ]}
              onPress={() => {
                setTime(timen);
                setErrors({ ...errors, time: "" });
              }}
            >
              <Text
                style={{ color: time === timen ? "#fff" : colors.text }}
              >
                {timen}
              </Text>
            </TouchableOpacity>
          ))} */}
        {/* </View> */}
        {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}

        <View style={styles.chartWrapper}>
          <Text style={styles.chartTitle}>{t("people_registered_day")}</Text>
          
          <View style={styles.mainChartArea}>
            {/* ЛІВА ЧАСТИНА: Вісь Y (числа) */}
            <View style={styles.yAxis}>
              {[5, 4, 3, 2, 1, 0].map((val) => (
                <Text key={val} style={styles.yLabel}>{val}</Text>
              ))}
            </View>

            <View style={styles.rightPart}>
          {/* Контейнер з суцільним нижнім бордером */}
          <View style={styles.gridContainer}>
            {/* Малюємо пунктир для рівнів 1,2,3,4 з урахуванням максимуму 5 */}
            {[1, 2, 3, 4, 5].map((val) => (
              <View key={val} style={[styles.gridLine, { bottom: `${(val / MAX_CHART_VALUE) * 100}%`}]} />
            ))}
          </View>

          {/* Стовпчики залишаються без змін */}
          <View style={styles.barsArea}>
            {/* {registrationData.map((val, idx) => (
              <View key={idx} style={styles.barColumn}>
                <View style={[styles.bar, { height: `${val+1}%`, backgroundColor: idx % 2 === 0 ? '#f07676' : '#ffabaa' }]} />
              </View>
            ))} */}
            {dataForChart.map((val, idx) => {
            const isSelectedBar = idx === selectedIndex;
            const chartValue = Math.min(val, MAX_CHART_VALUE);

            return (
              <AnimatedBar 
                key={idx}
                index={idx} 
                value={chartValue} 
                isSelected={isSelectedBar} 
              />
            );
          })}
          </View>
        </View>
      </View>

      {/* ПІДПИСИ ГОДИН (зміщені вправо, щоб бути під стовпчиками) */}
      <View style={styles.xAxis}>
        {hourLabels.map((hour) => (
          <Text key={hour} style={styles.xLabel}>{hour}</Text>
        ))}
      </View>

      <View style={styles.totalBadge}>
        <Text style={styles.totalText}>{t("total_registered_time")} <Text style={{fontWeight: 'bold'}}>{totalRegistered}</Text></Text>
      </View>
    </View>








        <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleRegister}>
          <Text style={styles.buttonText}>{t("register")}</Text>
        </TouchableOpacity>

      </KeyboardAwareScrollView>

      <Modal animationType="fade" transparent visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.overlay}>
            <View style={[
              styles.modalBox,
              { backgroundColor: colors.backgroundMain },
            ]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{t("select_location")}</Text>
              <TextInput
                style={[styles.modalInput, { color: colors.text }]}
                placeholder={t("enter_location_name")}
                placeholderTextColor={colors.text}
                value={location}
                onFocus={() => setSuggestions(points)}
                onChangeText={(text) => {
                  setLocation(text);
                  const filtered = points.filter((p) =>
                    p.title.toLowerCase().startsWith(text.toLowerCase())
                  );
                  setSuggestions(filtered);
                }}
              />
              {suggestions.length > 0 && (
                <View style={styles.suggestionsBox}>
                  {suggestions.map((p) => (
                    <TouchableOpacity
                      key={p.id}
                      onPress={() => handleSelectPoint(p)}
                      style={styles.suggestionItem}
                    >
                      <Text>{p.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <View style={styles.mapContainer}>
                <UniversalMap
                  ref={mapRef}
                  style={styles.map}
                  points={points}
                  selectedLocation={location}
                  onSelectPoint={handleSelectPoint}
                  onMapReady={Platform.OS !== 'web' ? () => {
                    mapRef.current?.fitToCoordinates(points.map((p) => p.coords), {
                      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                      animated: true,
                    });
                  } : undefined}
                />
              </View>
              <Text style={[styles.selectedText, { color: colors.text }]}>
                {location ? `${t("selected")}: ${location}` : t("tap_marker")}
              </Text>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.saveButtonText}>{t("save")}</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>{t("cancel")}</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      
      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {alertType === 'success' && t('modal_success_title')}
              {alertType === 'error' && t('modal_error_title')}
              {alertType === 'already_exists' && t('modal_already_title')}
            </Text>

            <Text style={styles.modalMessage}>
              {alertType === 'success' && t('creating_modal_success_message')}
              {alertType === 'error' && t('creating_modal_error_message')}
              {alertType === 'already_exists' && t('modal_already_message')}
            </Text>

            <TouchableOpacity 
              style={[
                styles.modalButton, 
                { 
                  backgroundColor: 
                    alertType === 'success' ? '#E57373' : 
                    alertType === 'already_exists' ? '#FFB74D' : '#666' 
                }
              ]} 
              onPress={() => {
                setAlertVisible(false);
                // Якщо успіх — повертаємося назад, в інших випадках просто закриваємо
                if (alertType === 'success') {
                  navigation.goBack();
                }
              }}
            >
              <Text style={styles.modalButtonText}>
                {alertType === 'success' && t('modal_button_go')}
                {alertType === 'error' && t('modal_button_close')}
                {alertType === 'already_exists' && t('modal_button_ok')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({

  calendarCard: {
    borderRadius: 20,
    overflow: "hidden", 
    shadowColor: "#FF7A84",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5, 
  },

  
  arrowHit: { 
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center" 
  },

  arrowText: { 
    color: "#FFFFFF", 
    fontSize: 26, 
    marginTop: -2 
  },

  calendarHeader: {
  height: 36,
  paddingHorizontal: 8,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
  calendarHeaderText: { 
    color: "#FFFFFF", 
    fontWeight: "800",
    fontSize: 14
  },
  dayPill: {
    width: 30,
    height: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden', 
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
  },


  chartTitle: { 
    color: '#f07676', 
    fontSize: 13, 
    marginBottom: 15, 
    fontWeight: '600' 
  },
  
  mainChartArea: {
    flexDirection: 'row',
    height: 150,
    width:"100%"
  },
  
  yAxis: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 10,
    gap:"8%",
    height: '100%',
    // paddingBottom: , // Щоб 0 стояв на лінії
  },
  yLabel: { fontSize: 12, color: '#999', textAlign: 'right' },

  rightPart: {
    borderColor:'#cfc4c4',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    flex: 1,
    position: 'relative',
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    borderColor:'#cfc4c4',
    borderBottomWidth: 1,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderColor: '#cfc4c4',
    borderStyle: 'dashed',
  },

  barsArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  },
  // barColumn: { flex: 1, alignItems: 'center' },
  // bar: { width: '80%', maxWidth: 16, borderTopLeftRadius: 200, borderTopRightRadius: 200 },

  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 21,
    marginTop: 8,
    paddingHorizontal: 5,
  },
  xLabel: { fontSize: 11, color: '#999', flex:1, textAlign: 'center' },
  
  totalBadge: {
    backgroundColor: '#fff1f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop:8,
    marginBottom:8,
  },
  totalText: { color: '#f07676', fontSize: 12 },



  dateCard: {
    height: 50,
    borderRadius: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  dateText2: {
    fontSize: 14, // Тепер можна трохи більше, бо місця більше
    fontWeight: 'bold',
    
  },
  weekdayText: {
    fontSize: 10,
    color: '#999',
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    justifyContent: 'center',
    alignItems: 'center',

    ...Platform.select({
    web: {
      alignSelf: 'center',
      width: '100%',
      maxWidth: 440,
    }
  })
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFF5F5', 
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 25,
    lineHeight: 22,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#fff",
    // paddingTop: 60,
  },
  dateBox: {
    display:"flex",
    borderWidth: 1,
    borderColor: "#E66A6A4D",
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    // marginTop: 20,
    marginLeft: 10,
    alignSelf: "flex-start",
    justifyContent:'center'
  },
  dateText: {
    color: "#E66A6A80",
    fontSize: 16,
    fontWeight: "500",
  },
  changeText: {
    color: "#E66A6A80",
    marginTop: 4,
    marginBottom: 16,
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E66A6A",
    marginTop: 20,
    // marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  
option: {
  paddingHorizontal: 15,
  paddingVertical: 8,
  borderRadius: 12,
  borderColor: "#E66A6A1A",
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
},
  // optionsRow: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   // gap: 8,
  //   // justifyContent: "center",
  //   alignItems: "center",
  // },
  // option: {
  //   alignItems:'center',
  //   width: '22%',           // 4 елементи (4 * 22% = 88%)
  //   margin: '1.5%',
  //   borderWidth: 1,
  //   borderColor: "#E66A6A1A",
  //   borderRadius: 15,
  //   paddingVertical: 8,
  //   paddingHorizontal: 16,
  //   marginBottom: 8,
  // },
  optionSelected: {
    backgroundColor: "#E66A6A",
    borderWidth: 2,
    borderColor: "#F5EDEB66",
  },
  optionDisabled: {
    backgroundColor: "#F5F5F5",
    borderColor: "#DDDDDD",
    opacity: 0.55,
  },
  optionError: {
    borderColor: "#FF0000",
  },
  optionText: {
    color: "#000000",
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E66A6A80",
    backgroundColor: "#F5EDEB66",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#E66A6A",
    width: "55%",
    borderRadius: 18,
    paddingVertical: 14,
    // marginTop: 100,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#FAFAFA",
    fontSize: 16,
    fontWeight: "600",
  },

  icon: {
    fontSize: 23,
    color: "#E66A6A80",
    position: "absolute",
    right: 12,
    top: "20%",
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    
    ...Platform.select({
      web: {
        alignSelf: 'center',
        width: '100%',
        maxWidth: 440,
      }
    })
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "90%",
  },
  // modalTitle: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#E66A6A",
  //   marginBottom: 10,
  // },

  customChartWrapper: {
    marginTop: 40,
    marginBottom: 20,
  },
  customChartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  customChartTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SF Pro Rounded',
    opacity: 0.8,
  },
  customChartDate: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'SF Pro Rounded',
    opacity: 0.8,
  },
  graphContainer: {
    width: 335,
    height: 132,
    borderRadius: 25,
    padding: 15,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  // gridContainer: {
  //   position: 'absolute',
  //   top: 15,
  //   left: 15,
  //   right: 15,
  //   bottom: 30,
  // },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 10,
    width: 20,
    marginRight: 5,
    textAlign: 'right',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 25,
    height: 80,
    gap: 4,
    zIndex: 2,
    marginBottom: 5,
  },
  barStyle: {
    width: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  axisContainer: {
    marginTop: 0,
    marginLeft: 25,
  },
  solidLine: {
    height: 1,
    width: '100%',
  },
  axisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingRight: 10,
  },
  axisText: {
    fontSize: 10,
    fontWeight: '500',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#E66A6A80",
    borderRadius: 15,
    padding: 12,
    backgroundColor: "#F5EDEB66",
  },
  mapContainer: {
    height: 280,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E66A6A80",
    marginBottom: 16,
    marginTop: 14,
  },
  map: { flex: 1 },
  saveButton: {
    backgroundColor: "#E66A6A",
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "600" },
  cancelText: {
    color: "#E66A6A",
    marginTop: 10,
    textAlign: "center",
  },
  selectedText: {
    textAlign: "center",
    color: "#444",
    marginBottom: 10,
  },
  suggestionsBox: {
    position:"absolute",
    top:110,
    width:"90%",
    maxHeight: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E66A6A80",
    marginBottom: 12,
    zIndex:10000
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E66A6A1A",
  },

  rowWithArrows: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    alignItems: "baseline"
  },
  arrowButton: {
    padding: 10,
    zIndex: 1, // Щоб стрілки були поверх скролу, якщо треба
    
  },
  sectionContainer: {
    marginVertical: 15,
  },
  // option: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 20,
  //   borderWidth: 1,
  //   borderColor: '#ddd',
  // },
  // optionSelected: {
  //   backgroundColor: '#f06060ff', // Твій колір
  //   borderColor: '#f06060ff',
  // },
});
